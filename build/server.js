import "babel-polyfill"
import koa from "koa"
import home_controller from "./controllers/home.js"
import photo_controller from "./controllers/bk_photos.js"

const mongo = require('koa-mongo')
const convert = require('koa-convert')
const router = require('koa-router')()
const mount = require('koa-mount')
const views = require('koa-views')
const serve = require('koa-static')

let app = new koa()

for (let controller of[home_controller, photo_controller]) {
    for (let item of controller) {
        router[item.method](item.url, item.handler)
    }
}

app.use(mount('/public', convert(serve('public/js'))))
app.use(convert(serve('js')))
app.use(convert(serve('images')))

app.use(views("./views", {
    extension: 'jade',
    map: {
        html: 'underscore',
        jade: 'jade'
    }
}))

app.use(convert(mongo({
    host: '52.11.71.140',
    port: 27017,
    user: 'quincy',
    pass: 'dd422',
    db: 'photos_dd',
})))

app.use(router.routes())
app.use(router.allowedMethods())

app.listen(3000)
