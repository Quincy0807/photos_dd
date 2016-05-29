const multipart = require('co-multipart')

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
}
,{
  method: "post",
  url: "/upload",
  async handler(ctx, next){
    // const files = await multipart(ctx)
  }
}]


export default home_controller
