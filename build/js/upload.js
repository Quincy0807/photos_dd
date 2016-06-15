require('../../public/css/uikit.min.css')
require('../../public/css/form-file.min.css')

import Vue from 'vue'
new Vue({
    el: '#body',
    components: {
        photoSubmit: require('../vue/photos-form-component.vue')
    }

})
