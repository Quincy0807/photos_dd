import "babel-polyfill"
import koa from "koa"
import koaRouter from "koa-router"


var mongo = require('koa-mongo')
var convert = require('koa-convert')

let app = new koa()
let router = koaRouter()


app.use(convert(mongo({
  host: '52.11.71.140',
  port: 27017,
  user:'quincy',
  pass:'dd422',
  db:'photos_dd',
})))


app.use(async (ctx, next) => {
  //ctx.body = await ctx.mongo.db('photos_dd').collection('test').findOne()
  ctx.body = 'test!!'
})



app.listen(3000)
