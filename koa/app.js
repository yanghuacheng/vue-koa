// 导入koa，和koa 1.x不同，在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');
const https = require('http');
const path = require('path');
const KoaStatic = require('koa-static');
const views = require('koa-views');
const router = require('koa-router')();
const websockrou = require('koa-route')
const ejs = require('ejs');
const rou = require('./router/int');
const rou2 = require('./websockrouter/int');
const websockify = require('koa-websocket');
const run = require('./controll/int');
const bodyParser = require('koa-bodyparser');
const request = require('request');
const json = require('koa-json');
const logger = require('koa-logger')
var body = require('koa-body');
const ueditor = require('./lib/ueditor/index');
const ueditor1 = require('koa2-ueditor');
// 设置跨域
var cors = require('koa-cors');
const jsonp = require('koa-jsonp');


// 创建一个Koa对象表示web app本身:
const app = websockify(new Koa());
app.use(body({ multipart: true }));
// app.use(jsonp())
app.use(cors());
app.context.db = require('./lib/query'); //请查看readme文件操作
app.context.upload = require('./lib/upload'); //上传文件
app.context.root = __dirname; //请查看readme文件操作
app.context.res2 = request; //请查看readme文件操作
// app.use(json())
// app.use(logger())
app.use(bodyParser({
  enableTypes:['json', 'form', 'text']
}));

var ctxs = [],runarr=[],runarr1=[];
/* 实现简单的接发消息 */
app.ws.use((ctx, next) => {
	return next(ctx)
});
app.ws.use(websockrou.all('/', function(ctx) {
	
	ctxs.push(ctx);
	var nowid =ctx.request.query.strid;
	ctx.websocket.on('message', function(message) {
		let idx = ctxs.indexOf(ctx);
		for(let i in ctxs){
			if(i == idx) continue;
			var o = ctxs[i].request.query;
			ctxs[i].websocket.send(JSON.stringify({id:nowid,message}));
		};
	});
	ctx.websocket.on("close", (message) => {
		let index = ctxs.indexOf(ctx);
		ctxs.splice(index, 1);
	});
}));
app.ws.use(websockrou.all('/run', function(ctx) {
	runarr.push(ctx);
	runarr1.push(ctx.request.query.strid);
	for(let i in runarr){
		runarr[i].websocket.send(JSON.stringify({lst:runarr1,now:ctx.request.query.strid}));
	};
	ctx.websocket.on("close", (message) => {
		let index = runarr.indexOf(ctx);
		let clo = runarr1[index];
		runarr.splice(index, 1);
		runarr1.splice(index, 1);
		for(let i in runarr){
			runarr[i].websocket.send(JSON.stringify({lst:runarr1,clo}));
		};
	});
}))
// 配置session
const Koa_Session = require('koa-session');
const session_signed_key = ["some secret hurr"]; // 这个是配合signed属性的签名key
const session_config = {
	key: 'koa:sess',
	/**  cookie的key。 (默认是 koa:sess) */
	maxAge: 4000,
	/**  session 过期时间，以毫秒ms为单位计算 。*/
	autoCommit: true,
	/** 自动提交到响应头。(默认是 true) */
	overwrite: true,
	/** 是否允许重写 。(默认是 true) */
	httpOnly: true,
	/** 是否设置HttpOnly，如果在Cookie中设置了"HttpOnly"属性，那么通过程序(JS脚本、Applet等)将无法读取到Cookie信息，这样能有效的防止XSS攻击。  (默认 true) */
	signed: true,
	/** 是否签名。(默认是 true) */
	rolling: true,
	/** 是否每次响应时刷新Session的有效期。(默认是 false) */
	renew: false,
	/** 是否在Session快过期时刷新Session的有效期。(默认是 false) */
};
const session = Koa_Session(session_config, app)
app.keys = session_signed_key;
app.use(session);
// 静态文件处理


// 配置编辑器上传图片接口
router.all('/controller', 
    ueditor('static')
	// ueditor1('static')
)
app.use(KoaStatic(path.join(__dirname, './static')));
// 模版引擎处理
app.use(views(__dirname + '/views', {
	// extension: 'ejs',
	map: {
		html: 'ejs'
	}
}));

// 自定义路由
rou(router);
// websockiet
rou2(app); //websockiet路由
// 默认
run(app);
app.use(router.routes());
app.use(router.allowedMethods());
// 对于任何请求，app将调用该异步函数处理请求：
app.use(async (ctx, next) => {
	try {
		await next();
	} catch (err) {
		ctx.response.status = err.statusCode || err.status || 500;
		ctx.response.body = {
			message: err.message
		};
	}
});
app.use(async (ctx, next) => {
	var nowUrl = ctx.request.url.split('?')[0];
	if (nowUrl == '/') ctx.response.redirect('/index');
	await next();
});
// 在端口8848监听:
app.listen(3000);
// console.log('app started at port 3000...');
