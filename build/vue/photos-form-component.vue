<style lang='sass' src='../sass/upload.scss'></style>

<template lang="jade">
  .uk-container.uk-text-center.uk-overlay
    form.uk-hidden(v-el:hidden-form)
      input.uk-hidden(type='file', multiple='multiple', v-el:hidden-input, @change='selectMultipleFiles')
    form.uk-margin-top.uk-form#form(v-el:form, name='images', action='upload', method='post', enctype='multipart/form-data', @drop.stop.prevent='dndFiles')
      .uk-grid.uk-margin-small
        <detail-photo v-for='item in detailData' :detail-data='item' :index-tag='$index' track-by='$index'></detail-photo>
      template(v-if='detailData.length == 0')
        .initial-hint-container.uk-vertical-align
          .uk-vertical-align-middle
            partial(name='select_or_upload')
      template(v-else)
        partial(name='select_or_upload')
  .uk-overlay-panel.uk-overlay-background.uk-animation-slide-bottom(:class="overlay ? '' : 'uk-hidden'")
    .uk-vertical-align
      .uk-vertical-align-middle
        i.uk-icon-spinner.uk-icon-spin.uk-icon-large
</template>

<script>
  require('../../public/css/uikit.min.css')
  import {fileReaderWithPromise, angleToInt} from '../js/utility'

  export default {
    data(){
      return {
        newPhoto: 'new BK-photo',
        detailData: [],
        files: [],
        overlay: false,
      }
    },
    computed: {
    },
    methods: {
      uploadFiles(){
        this.$els.hiddenInput.click()
      },
      selectMultipleFiles(event){
        const target = event.target
        this.processFiles(target.files)
        this.$els.hiddenForm.reset()
      },
      submit(){
        this.overlay = true
        const dataToSubmit = new FormData(this.$els.form)
        for(const file of this.files){
          dataToSubmit.append(file.name, file)
        }
        $.ajax({
          type: 'post',
          url: '/upload',
          data: dataToSubmit,
          processData: false,
          contentType: false,
          success: (response) => {
            this.overlay = false
            this.detailData = []
            this.files = []
            window.alert(response)
          }
        })
      },
      extractPhotoInfo(fileToUpload, index){
        let promise = fileReaderWithPromise(fileToUpload, 'readAsArrayBuffer', 'onloadend')
        let temp = {show: true}
        const detailData =this.detailData
        promise.then((fileReader) => {
          let exif = EXIF.readFromBinaryFile(fileReader.result)
          temp.latitudeValue = exif.GPSLatitude ? angleToInt(...exif.GPSLatitude) : 0
          temp.latitudeRef = exif.GPSLatitudeRef ? exif.GPSLatitudeRef : ''
          temp.longitudeValue = exif.GPSLongitude ? angleToInt(...exif.GPSLongitude) : 0
          temp.longitudeRef = exif.GPSLongitudeRef ? exif.GPSLongitudeRef : ''
          temp.altitudeValue = exif.GPSAltitude ? exif.GPSAltitude : 0
          temp.altitudeRef = exif.GPSAltitudeRef ? exif.GPSAltitudeRef : ''
          temp.dateTimeValue = exif.DateTime ? exif.DateTime.match(/(((\d+):?)+\s+((\d+):?){2}):/)[1] : undefined
          return fileReaderWithPromise(fileToUpload)
        }).then( (fileReader) => {
          temp.previewSrc = fileReader.result
          detailData.splice(index, 1, temp)
        })
      },
      processFiles(files){
        for(const file of files){
          const elementSize = this.detailData.push({
            show: false,
          })
          this.files.push(file)
          this.extractPhotoInfo(file, elementSize - 1)
        }
      },
      dndFiles(event){
        this.processFiles(event.dataTransfer.files)
      }
    },
    ready(){
      for(const eventType of ['drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave']){
        this.$els.form.addEventListener(eventType, (event)=>{
          event.preventDefault()
          event.stopPropagation()
        })
      }
    },
    events: {
      removeItem(itemIndex){
        this.files.splice(itemIndex, 1)
        this.detailData.splice(itemIndex, 1)
      }
    },
    components: {
      detailPhoto: require('./detailed-photo.vue'),
    },
    partials:{
      select_or_upload: `
      <fieldset class="uk-margin-top uk-margin-bottom">
        <span>
          <span class='select-button' @click.stop.prevent='uploadFiles'>
            <b>select files</b>
          </span>
          &nbsp; or &nbsp; <b>drag files</b>
          <template v-if='detailData.length > 0'>
            &nbsp; or &nbsp;
            <input type='submit' value='submit' @click.stop.prevent='submit'/>
          </template>
        <span>
      </fieldset>`
    }
  }
</script>
