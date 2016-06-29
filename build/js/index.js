import Vue from 'vue'

require('../../public/css/uikit.min.css')
require('../sass/index.scss')
new Vue({
  el: "#buttons",
  data: {
    allPhotos: "Check Daily Breakfast",
    withMap: "Check Locations"
  }
})
