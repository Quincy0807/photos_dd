require('../../public/css/uikit.min.css')
require('../../public/css/form-file.min.css')
require('../sass/upload.scss')

import Vue from 'vue'
import {fileReaderWithPromise, angleToInt} from './utility'

Vue.component('detail-photo', require('../vue/detailed-photo.vue'))


new Vue({
  el: "#form",
  data: {
    newPhoto: 'new BK-photo',
    detailData: [],
  },
  computed: {
  },
  methods: {
    uploadNewImage(event){
      this.detailData.push({show: false})
    },
    submit(){
    },
  },
  events: {
    extractPhotoInfo(fileToUpload, callback){
      let promise = fileReaderWithPromise(fileToUpload, 'readAsArrayBuffer', 'onloadend')
      let temp = {show: true}
      promise.then((fileReader) => {
        let exif = EXIF.readFromBinaryFile(fileReader.result)
        temp.latitudeValue = angleToInt(...exif.GPSLatitude)
        temp.latitudeRef = exif.GPSLatitudeRef
        temp.longitudeValue = angleToInt(...exif.GPSLongitude)
        temp.longitudeRef = exif.GPSLongitudeRef
        temp.altitudeValue = exif.GPSAltitude
        temp.altitudeRef = exif.GPSAltitudeRef
        temp.dateTimeValue = exif.DateTime.match(/(((\d+):?)+\s+((\d+):?){2}):/)[1]
        return fileReaderWithPromise(fileToUpload)
      }).then( (fileReader) => {
        temp.previewSrc = fileReader.result
        this.detailData.splice(-1, 1, temp)
        callback()
      })
    },
    removeItem(itemIndex){
      this.detailData.splice(itemIndex, 1)
    }
  },
})
