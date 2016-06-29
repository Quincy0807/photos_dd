const bk_photos_controller = [{
  method: 'get',
  url: '/photos',
  async handler(ctx, next){
    ctx.body = 'test'
  }
}]


export default bk_photos_controller
