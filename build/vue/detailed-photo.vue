<style src='../sass/upload.scss'></style>

<template lang="jade">
  .uk-width-medium-1-3(:class= "show ? '' : 'no-show' ")
    .uk-panel.uk-panel-box
      span.uk-panel-badge.uk-badge.uk-badge-danger(@click='removeComponent') x
      h3.uk-panel-title {{detailData.dateTimeValue}}
      fieldset
        .uk-form-row
          img(:src = 'detailData.previewSrc', width= '150', height= '150')
          input.uk-hidden(type='file', :id= "this.componentDomain() + '-input-file'", :name="'[' + this.componentDomain()+ '][photo]'", @change='photoExtraction')
        .uk-form-row
          label Latitude
            input(type='text', :name="'[' + this.componentDomain()+ '][latitude]'", v-model='detailData.latitudeValue')
            select(:name= "'['+ this.componentDomain() + '][latitudeRef]'", v-model='detailData.latitudeRef')
              option(v-for= 'option of latitudeRefs', :vaule= 'option', :selected= 'option == detailData.latitudeRef') {{option}}
        .uk-form-row
          label Longitude
            input(type='text', :name="'[' + this.componentDomain()+ '][longitude]'", v-model='detailData.longitudeValue')
            select(:name= "'['+ this.componentDomain() + '][longitudeRef]'", v-model='detailData.longitudeRef')
              option(v-for= 'option of longitudeRefs', :vaule= 'option', :selected= 'option == detailData.longitudeRef') {{option}}
        .uk-form-row
          label Altitude
            input(type='text', :name= "'[' + this.componentDomain()+ '][altitude]'", v-model= "detailData.altitudeValue")
        .uk-form-row
          label DateTime
            input(:id="this.componentDomain()+ '-flatpickr'", type='text', :name="'['+ this.componentDomain()+'][dateTime]'", v-model='detailData.dateTimeValue' data-enabletime='true', data-dateFormat='Y:m:d', data-timeFormat='H:i' data-time_24hr='true' data-defaultDate="{{ valideDateFormateForJSDate }}")
</template>

<script>
const flatpickr = require('flatpickr')
require('../../public/css/flatpickr.min.css')
require('../../public/css/flatpickr.material_green.min.css')


export default {
  data(){
    return {
    latitudeRefs: ['N', 'S'],
    longitudeRefs: ['W', 'E'],
    show: false,
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
    removeComponent(){
      this.$dispatch('removeItem', this.indexTag)
    },
    photoExtraction(){
      this.show = true
      this.$dispatch('extractPhotoInfo', document.getElementById(`${this.componentDomain()}-input-file`).files[0])
    },
  }
}
</script>
