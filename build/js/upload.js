new Vue({
  el: "#form",
  data: {
    newPhoto: 'new BK-photo',
    showDetail: false,
    latitudeRefs: ['N', 'S'],
    longitudeRefs: ['E','W'],
    latitudeValue: "",
    latitudeRef: "",
    longitudeValue: "",
    longitudeRef: "",
    altitudeValue: "",
    dateTimeValue: "",
  },
  computed: {
    valideDateFormateForJSDate(){
      let date = this.dateTimeValue.split(/\s+/)[0]
      let time = this.dateTimeValue.split(/\s+/)[1]
      return `${date.replace(/:/g, '-')} ${time}`
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
        this.dateTimeValue = exif.DateTime.match(/(((\d+):?)+\s+((\d+):?){2}):/)[1]
        this.showDetail= true
      })
      event.target.value = null
    },
    showCalendar(event){
      let input = event.target
      if(!input.dataset.initCalendar){
        input.dataset.initCalendar = true
        flatpickr('.flatpickr').calendars[0].open()
      }
    }
  }
})
