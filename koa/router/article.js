const md5 = require('md5');
const base = require('../lib/base64');
const fs = require('fs');
const path = require('path');

function index(router) {
	
	// 文章管理
	router.post('/setdata', async (ctx) => {
		var param = ctx.request.body;
		var type = ctx.request.query.type;
		if (type == 'add') {
			param['createdtime'] = Date.now();
			param['uploadtime'] = Date.now();
			var pathdir = await base(param.img, 'static/images/');
			param.img = '/images/' + pathdir.name;
			var datas = await ctx.db.add({
				dbname: "wenzhang",
				field: param
			});
			// console.log(datas)
			ctx.response.body = {
				data: {
					success: datas.affectedRows ? true : false,
					info: datas.affectedRows ? 'ok' : 'error',
					// list: datas
				},

			};
		} else {
			var artid = param.artid;
			delete param['artid'];
			param['uploadtime'] = Date.now();
			var deldata = await ctx.db.get({
				dbname: "wenzhang",
				field: "img",
				where: {artid}
			});
			if(param.img.indexOf('base64') != -1){
				var pathdir = await base(param.img, 'static/images/');
				param.img = '/images/' + pathdir.name;
			};
			var datas = await ctx.db.set({
				dbname: "wenzhang",
				field: param,
				where: {
					artid
				}
			});
			if(datas.affectedRows){
				if(param.img.indexOf('base64') != -1){
					fs.unlinkSync(path.resolve(__dirname, '../static/' + deldata[0].img));
				}
			}
			ctx.response.body = {
				data:{
					success: datas.affectedRows ? true : false,
					info: datas.affectedRows ? 'ok' : 'error',
				}
			};
		}

	});
	router.get('/getdata', async (ctx) => {
		var type = ctx.request.query.id;
		var datas = await ctx.db.get({
			dbname: "wenzhang",
			field: "*",
			where: type ? {
				artid: type
			} : {}
		});
		ctx.response.body = {
			data: {
				success: true,
				info: 'ok',
				list: datas
			}
		};
	});
	router.post('/deldata', async (ctx) => {
		var type = ctx.request.body;

		var deldata = await ctx.db.get({
			dbname: "wenzhang",
			field: "img",
			where: type
		});
		var datas = await ctx.db.del({
			dbname: "wenzhang",
			where: type
		});
		if (datas.affectedRows) {
			fs.unlinkSync(path.resolve(__dirname, '../static/' + deldata[0].img));
		}
		ctx.response.body = {
			data: {
				success: datas.affectedRows ? true : false,
				info: datas.affectedRows ? 'ok' : 'error',
			}
		};
	});
}
module.exports = index;
