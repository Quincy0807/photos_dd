require('../../public/css/uikit.min.css')
require('../../public/css/form-file.min.css')

import Vue from 'vue'
Vue.component('photo-submit', require('../vue/photos-form-component.vue'))
new Vue({
  el: '#body'
})
