const md5 = require('md5');
const base = require('../lib/base64');
const fs = require('fs');
const path = require('path');

function index(router) {
	
	// 产品管理
	router.post('/prosetdata', async (ctx) => {
		var param = ctx.request.body;
		var type = ctx.request.query.type;
		if (type == 'add') {
			param['createdtime'] = Date.now();
			var pathdir = await base(param.img, 'static/proimages/');
			param.img = '/proimages/' + pathdir.name;
			var datas = await ctx.db.add({
				dbname: "prolst",
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
			var artid = param.proid;
			delete param['proid'];
			var deldata = await ctx.db.get({
				dbname: "prolst",
				field: "img",
				where: {proid}
			});
			if(param.img.indexOf('base64') != -1){
				var pathdir = await base(param.img, 'static/proimages/');
				param.img = '/proimages/' + pathdir.name;
			};
			var datas = await ctx.db.set({
				dbname: "prolst",
				field: param,
				where: {
					proid
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
	router.get('/progetdata', async (ctx) => {
		var type = ctx.request.query.id;
		var datas = await ctx.db.get({
			dbname: "prolst",
			field: "*",
			where: type ? {
				proid: type
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
	router.post('/prodeldata', async (ctx) => {
		var type = ctx.request.body;

		var deldata = await ctx.db.get({
			dbname: "prolst",
			field: "img",
			where: type
		});
		var datas = await ctx.db.del({
			dbname: "prolst",
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
