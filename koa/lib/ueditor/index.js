 // 处理富文本上传
var config = require('./config');
var upload = require('../upload');
var path = require('path');
var getdata = require('../getdata');
// 
var getdate = function(){
	const date = new Date();
	const map = {
	    t: date.getTime(), // 时间戳
	    y: date.getFullYear(), // 年
	    m: date.getMonth() + 1, // 月
	    d: date.getDate(), // 日
	    h: date.getHours(), // 时
	    i: date.getMinutes(), // 分
	    s: date.getSeconds(), // 秒
	};
	return map;
}
module.exports = (dir)=>{
	var newdir = '' + getdate().y + getdate().m + getdate().d;
	dir = path.resolve(__dirname, '../../' +　dir + '/images/' + newdir);
	return async (ctx, next) =>{
		let result = {}
		let {action, start = 0, callback} = ctx.query
		start = parseInt(start);
		// console.log(ctx.query)
		if(action === 'config'){
			result = config;
		}else if(action === config.scrawlActionName){//涂鸦类型图片
			
		}else if(action === config.catcherActionName){//抓取远程图片
			var urllst = ctx.request.body;
			console.log(urllst)
			// var data = getdata();
		}else if(action === 'uploadimage' || config.videoActionName){//表单上传
			var files = ctx.request.files['upfile'];
			var obj = upload([files],dir);
			Object.assign(obj, {url:'/images/' + newdir + '/' + obj.title});
			result = obj;
		}else{
			result = {state: 'FAIL'}
		};
		// console.log([callback])
		ctx.body = callback ? [callback] + '(' + JSON.stringify(result) + ')' : JSON.stringify(result)
	}
}