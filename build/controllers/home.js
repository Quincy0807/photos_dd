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
    let index = 0
    for (let fieldKey in fields['']){
      if(fieldKey != 'photo-0'){
        const fieldValue = fields[''][fieldKey]
        const filename = `${fieldValue.dateTime.split(/[:\s]/).join('')}_${new Date().getTime()}`
        files[index].pipe(fs.createWriteStream(path.join('images', filename)))
        ctx.mongo.db('photos_dd').collection('photo_details').insert(Object.assign(fieldValue, {filename}))
        index += 1
      }
    }
    ctx.body = `ok`
  }
}]


export default home_controller
