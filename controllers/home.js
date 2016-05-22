var home_controller = [{
  method: "get",
  url: "/test",
  async handler(ctx, next) {
    ctx.body = 'ganbbate!!'
  }
}]


export default home_controller
