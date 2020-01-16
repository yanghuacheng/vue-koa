var milt = require('../lib/upload'); 
var path = require('path'); 
module.exports = async function(ctx, url) {
	// var par = ctx.request.query//get请求参数
	// var body = ctx.request.body//post请求参数
	if(ctx.request.method == 'POST' ){
		const files = ctx.request.files;
		ctx.upload(files,'./static/upload','b');
		ctx.response.body = '上传成功';
	};
};
