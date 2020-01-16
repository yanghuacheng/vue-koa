const md5 = require('md5');
const fs = require('fs');
const path = require('path');

function index(router) {
	// 登录
	router.post('/login', async (ctx) => {
		var param = ctx.request.body;
		var data = await ctx.db.get({
			dbname: "user",
			field: "*",
			where: param
		});
		// console.log(data)
		ctx.response.body = {
			data: {
				success: data.length ? true : false,
				info: data.length ? '验证通过' : '用户名或密码不正确,请重新输入',
				lst: data
			}
		};
	});
	//注册
	router.post('/registe', async (ctx) => {
		var param = ctx.request.body;
		var data = await ctx.db.get({
			dbname: "user",
			field: 'username',
			where: {
				username: param.username
			}
		});
		if (!data.length) {
			param.time = Date.now();
			var datas = await ctx.db.add({
				dbname: "user",
				field: param
			});
		};
		ctx.response.body = {
			data: {
				success: !data.length ? true : false,
				info: !data.length ? '注册成功' : '用户名已存在!'
			}
		};
	});
	// 获取用户列表
	router.post('/flst', async (ctx) => {
		var param = ctx.request.body;
		var data = await ctx.db.get({
			dbname: "user",
			field: "*"
		});
		ctx.response.body = {
			data: {
				success: true,
				info: 'ok',
				list: data
			}
		};
	});
	
}
module.exports = index;
