var home_controller = [{
  method: "get",
  url: "/test",
  handler: async(ctx, next) => {
    ctx.body = 'ganbbate!!'
  }
}]


export default home_controller
