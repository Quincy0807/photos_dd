<style lang='sass' src='../sass/upload.scss'></style>

<template lang="jade">
  .uk-container.uk-text-center
    form.uk-hidden(v-el:hidden-form)
      input.uk-hidden(type='file', multiple='multiple', v-el:hidden-input, @change='selectMultipleFiles')
    form.uk-margin-top.uk-form#form(v-el:form, name='images', action='upload', method='post', enctype='multipart/form-data', @drop.stop.prevent='dndFiles')
      .uk-grid(data-uk-margin)
        <detail-photo v-for='item in detailData' :detail-data='item' :index-tag='$index' track-by='$index'></detail-photo>
      fieldset(data-uk-margin)
        .uk-form-file
          span
            span.select-button(@click.stop.prevent= 'uploadFiles')
              b select files
            | &nbsp;or&nbsp;
            b drag files
            template(v-if='detailData.length > 0')
              | &nbsp;or&nbsp;
              input(type='submit', value='submit' )
</template>

<script>
  import {fileReaderWithPromise, angleToInt} from '../js/utility'

  export default {
    data(){
      return {
        newPhoto: 'new BK-photo',
        detailData: [],
        files: [],
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
    }
  }
</script>
