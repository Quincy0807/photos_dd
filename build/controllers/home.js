import busboy from 'async-busboy'
const fs = require('fs')
const path = require('path')
const config = require('config')

var home_controller = [{
    method: "get",
    url: "/",
    async handler(ctx, next) {
        await ctx.render('index')
    }
}, {
    method: "get",
    url: "/upload",
    async handler(ctx, next) {
        await ctx.render('upload')
    }
}, {
    method: "post",
    url: "/upload",
    async handler(ctx, next) {
        const {
            files,
            fields
        } = await busboy(ctx.req)
        let index = 0
        for (let fieldKey in fields['']) {
            const fieldValue = fields[''][fieldKey]
            const filename = `${fieldValue.dateTime.split(/[:\s]/).join('')}_${new Date().getTime()}`
            files[index].pipe(fs.createWriteStream(path.join('images', filename)))
            ctx.mongo.db('photos_dd').collection(config.get("collection")).insert(Object.assign(fieldValue, {
                filename
            }))
            index += 1
        }
        ctx.body = `Upload Successfully!`
    }
}]


export default home_controller
