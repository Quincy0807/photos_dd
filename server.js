import "babel-polyfill"
import koa from "koa"
import home_controller from "./transform/controllers"

const mongo = require('koa-mongo')
const convert = require('koa-convert')
const router = require('koa-router')()
let app = new koa()

for(let item of home_controller){
  router[item.method](item.url, item.handler)
}

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
