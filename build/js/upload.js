new Vue({
  el: "#form",
  data: {
    newPhoto: 'new BK-photo',
    showDetail: false,
    latitudeRefs: ['N', 'S'],
    longitudeRefs: ['E','W'],
  },
  computed: {
    capturedDate: {
      getter: ()=>{
        this.dateTimeValue.match(/[\d:]+/g)[0]
      }
    },
    capturedTime: {
      getter: ()=>{
        this.dateTimeValue.match(/[\d:]+/g)[1]
      }
    }
  },
  methods: {
    extractInfo(event){
      let file = event.target.files[0]
      let promise = FileReaderWithPromise(file, 'readAsArrayBuffer', 'onloadend')
      promise.then((fileReader) => {
        let exif = EXIF.readFromBinaryFile(fileReader.result)
        this.latitudeValue = angleToInt(...exif.GPSLatitude)
        this.latitudeRef = exif.GPSLatitudeRef
        this.longitudeValue = angleToInt(...exif.GPSLongitude)
        this.longitudeRef = exif.GPSLongitudeRef
        this.altitudeValue = exif.GPSAltitude
        this.altitudeRef = exif.GPSAltitudeRef
        this.dateTimeValue = exif.DateTime
        this.showDetail= true
      })
      event.target.value = null
    }
  }
})
