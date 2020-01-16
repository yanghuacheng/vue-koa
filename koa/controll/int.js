var fs = require('fs');
var Pth = require('path');
var arr = [];
var rootpath = Pth.resolve(__dirname, '../views/');

function all(app) {
	function fordir(path) {
		var file = fs.readdirSync(path);
		for (var i in file) {
			var rootp = path + file[i];
			var dir = fs.statSync(rootp).isDirectory();
			if (dir) {
				if(file[i] == 'public') continue;
				fs.mkdirSync(rootp.replace('views', 'controll'), {
					recursive: true
				});
				fordir(rootp + '/');
			} else {
				arr.push({
					newpath: path.replace('views', 'controll'),
					newpathname: file[i].replace('.html', '.js')
				});
				var isor = fs.existsSync(path.replace('views', 'controll') + '/' + file[i].replace('.html', '.js'));
				if (!isor) {
					fs.writeFileSync(path.replace('views', 'controll') + '/' + file[i].replace('.html', '.js'),
						`module.exports = async function(ctx, url) {await ctx.render(url.substr(1,url.length - 1))};`);
				}
			}
		}
	};
	fordir(rootpath + '/');
	app.use(async (ctx, next) => {
		var nowUrl = ctx.request.url.split('?')[0].replace('.html','');
		for (var i in arr) {
			var o = arr[i];
			var patha = o.newpath.split('controll')[1];
			var pathc = o.newpathname.replace('.js', '');
			try {
				await require(Pth.resolve(__dirname, '../controll/') + nowUrl)(ctx, nowUrl);
			} catch (err) {
				err.msg = Pth.resolve(__dirname, '../controll/' + nowUrl) + ' 模块错误'
				ctx.response.body = err;
			}
		}
		await next();
	});
};
module.exports = all;
