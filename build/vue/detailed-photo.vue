<template lang="jade">
  .uk-width-medium-1-3(:class= "detailData.show ? '' : 'no-show' ")
    .uk-panel.uk-panel-box
      span.uk-panel-badge.uk-badge.uk-badge-danger(@click='removeComponent') x
      h3.uk-panel-title {{detailData.dateTimeValue}}
      fieldset
        .uk-form-row
          img(:src = 'detailData.previewSrc', width= '150', height= '150')
        .uk-form-row
          label
            span.label-text Latitude:
            input(type='text', :name="'[' + this.componentDomain()+ '][latitude]'", v-model='detailData.latitudeValue')
            select(:name= "'['+ this.componentDomain() + '][latitudeRef]'", v-model='detailData.latitudeRef')
              option(v-for= 'option of latitudeRefs', :vaule= 'option', :selected= 'option == detailData.latitudeRef') {{option}}
        .uk-form-row
          label
            span.label-text Longitude:
            input(type='text', :name="'[' + this.componentDomain()+ '][longitude]'", v-model='detailData.longitudeValue')
            select(:name= "'['+ this.componentDomain() + '][longitudeRef]'", v-model='detailData.longitudeRef')
              option(v-for= 'option of longitudeRefs', :vaule= 'option', :selected= 'option == detailData.longitudeRef') {{option}}
        .uk-form-row
          label
            span.label-text Altitude:
            input(type='text', :name= "'[' + this.componentDomain()+ '][altitude]'", v-model= "detailData.altitudeValue")
        .uk-form-row
          label
            span.label-text DateTime:
            input(:id='new Date().getTime()', v-el:date-time, type='text', :name="'['+ this.componentDomain()+'][dateTime]'", v-model='detailData.dateTimeValue' data-enabletime='true', data-dateFormat='Y:m:d', data-timeFormat='H:i' data-time_24hr='true' data-defaultDate="{{ valideDateFormateForJSDate }}")
</template>

<script>
require('../../public/css/flatpickr.material_green.min.css')
const flatpickr = require('flatpickr')

export default {
  data(){
    return {
    latitudeRefs: ['N', 'S'],
    longitudeRefs: ['W', 'E'],
    }
  },
  ready(){
    flatpickr(`#${this.$els.dateTime.id}`)
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
  }
}
</script>
