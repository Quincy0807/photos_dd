require('../../public/css/uikit.min.css')
require('../sass/photos.scss')

import Vue from 'vue'
Vue.use(require('vue-infinite-scroll'))

new Vue({
    el: "#photos",
    data: {
        overlay: true,
        photos: [],
        offset: 0,
        limit: 15,
        disable_infinite_scrolling: true,
        all_loaded: false
    },
    methods: {
        fetchPhotos() {
            this.all_loaded = false
            let offset = this.offset,
                limit = this.limit
            let photos = this.photos
            this.overlay = true
            $.get('/photos', {
                offset,
                limit
            }, res => {
                if (res.length != 0) {
                    photos.splice(photos.length, 0, ...res)
                    this.offset += res.length
                    if (res.length < this.limit) {
                        this.all_loaded = true
                    }
                } else {
                    this.all_loaded = true
                }
                if (this.offset <= this.limit) {
                    this.disable_infinite_scrolling = false
                }
                this.overlay = false
            })
        }
    },
    ready() {
        this.fetchPhotos()
    },

})
