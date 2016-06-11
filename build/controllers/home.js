import busboy from 'async-busboy'
const fs = require('fs')
const path = require('path')

let test_time = '2016-04-22'

var home_controller = [{
  method: "get",
  url: "/",
  async handler(ctx, next) {
    await ctx.render('index')
  }
},{
  method: "get",
  url: "/upload",
  async handler(ctx, next){
    await ctx.render('upload')
  }
},{
  method: "post",
  url: "/upload",
  async handler(ctx, next){
    const {files, fields} = await busboy(ctx.req)
    // const filename = `${fields.dateTime.split(/[:\s]/).join('')}_${new Date().getTime()}`
    // for(let file of files){
    //   file.pipe(fs.createWriteStream(path.join('images', filename)))
    // }
    // ctx.mongo.db('photos_dd').collection('photo_details').insert(Object.assign(fields, {filename}))
    // ctx.body = `${filename}`
    ctx.body = `$`
    console.log(fields)
    console.log(files)
  }
}]


export default home_controller
