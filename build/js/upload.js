Vue.component('detail-photo',{
  data(){
    return {
    latitudeRefs: ['N', 'S'],
    longitudeRefs: ['W', 'E'],
  }
},
  ready(){
    flatpickr(`#${this.componentDomain()}-flatpickr`)
  },
  computed: {
    valideDateFormateForJSDate(){
      if (this.detailData.dateTimeValue == undefined){
        return
      }
      let date = this.detailData.dateTimeValue.split(/\s+/)[0]
      let time = this.detailData.dateTimeValue.split(/\s+/)[1]
      return `${date.replace(/:/g, '-')} ${time}`
    },
  },
  props: ['detailData', 'indexTag'],
  methods: {
    componentDomain(){
      return `photo-${this.indexTag}`
    },
    photoExtraction(){
      this.$dispatch('extractPhotoInfo', document.getElementById(`${this.componentDomain()}-input-file`).files[0])
    },
  },
  template: `<fieldset>
              <div class='uk-form-row'>
                <img :src = 'detailData.previewSrc' width='150' height='150'/>
                <input :id= "this.componentDomain() + '-input-file'" class = 'uk-hidden' type = 'file' :name = "'[' + this.componentDomain() + '][photo]'" @change= 'photoExtraction'>
              </div>
              <div class='uk-form-row'>
                <label>
                  Latitude
                  <input type＝'text' :name= "'[' + this.componentDomain() + '][latitude]'" v-model = "detailData.latitudeValue">
                  <select :name="'[' + this.componentDomain() + '][latitudeRef]'"  v-model='detailData.latitudeRef'>
                    <option v-for= 'option of latitudeRefs' :value='option' :selected='option == detailData.latitudeRef'> {{option}}
                    </option>
                  </select>
                </label>
              </div>
              <div class='uk-form-row'>
        			  <label>
        			    Longitude
        			    <input type＝'text' :name= "'[' + this.componentDomain() + '][longitude]'" v-model = "detailData.longitudeValue">
        			    <select :name="'[' + this.componentDomain() + '][longitudeRef]'" v-model='detailData.longitudeRef'>
        			      <option v-for= 'option of longitudeRefs' :value='option' :selected='option == detailData.longitudeRef'> {{option}}
                    </option>
                  </select>
                </label>
              </div>
        			<div class='uk-form-row'>
      			   <label>
      			      Altitude
      			      <input type＝'text' :name= "'[' + this.componentDomain() + '][altitude]'" v-model = "detailData.altitudeValue">
                </label>
              </div>
        			<div class='uk-form-row'>
        			  <label>
        			    DateTime
        			    <input :id=" this.componentDomain() + '-flatpickr'" type＝'text' :name= "'[' + this.componentDomain() + '][dateTime]'" v-model='detailData.dateTimeValue' data-enabletime='true', data-dateFormat='Y:m:d', data-timeFormat='H:i' data-time_24hr='true' data-defaultDate="{{ valideDateFormateForJSDate }}">
                </label>
              </div>
            </fieldset>`,
})

new Vue({
  el: "#form",
  data: {
    newPhoto: 'new BK-photo',
    detailData: [createUniqObject()],
    totalCount: 0,
  },
  computed: {
  },
  methods: {
    uploadNewImage(event){
      document.getElementById(`photo-0-input-file`).click()
    },
    submit(){
      // fetch('/upload', {
        // method: 'POST',
        // headers: {
          // "Content-Type": 'multipart/form-data'
        // },
        // body: this.detailData[0],
      // }).then(response => {
        // console.log(response)
      // })
    },
  },
  events: {
    extractPhotoInfo(fileToUpload){
      let promise = FileReaderWithPromise(fileToUpload, 'readAsArrayBuffer', 'onloadend')
      let temp = { uuid: this.detailData[0].uuid }
      promise.then((fileReader) => {
        let exif = EXIF.readFromBinaryFile(fileReader.result)
        temp.latitudeValue = angleToInt(...exif.GPSLatitude)
        temp.latitudeRef = exif.GPSLatitudeRef
        temp.longitudeValue = angleToInt(...exif.GPSLongitude)
        temp.longitudeRef = exif.GPSLongitudeRef
        temp.altitudeValue = exif.GPSAltitude
        temp.altitudeRef = exif.GPSAltitudeRef
        temp.dateTimeValue = exif.DateTime.match(/(((\d+):?)+\s+((\d+):?){2}):/)[1]
        return FileReaderWithPromise(fileToUpload)
      }).then( (fileReader) => {
        temp.previewSrc = fileReader.result
        this.totalCount += 1
        this.detailData.splice(0, 1)
        this.detailData = [createUniqObject(), temp, ...this.detailData]
      })
    },
  },
})
