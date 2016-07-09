const config = require('config')


const bk_photos_controller = [{
    method: 'get',
    url: '/photos_list',
    async handler(ctx, next) {
        await ctx.render('photos_list')
    }
}, {
    method: 'get',
    url: '/photos',
    async handler(ctx, next) {
        let offset = ctx.query.offset * 1
        let limit = ctx.query.limit * 1
        ctx.body = await ctx.mongo.db('photos_dd').collection(config.get("collection")).find().skip(offset).limit(limit).toArray()
    }
}]


export default bk_photos_controller
