 function index(app,websockrou){
	app.ws.use(websockrou.all('/s', function (ctx) {
	    ctx.websocket.on('message', function (message) {
	        // 返回给前端的数据
	        ctx.websocket.send(message)
	    })
	}))
}
module.exports = index;