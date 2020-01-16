const fs = require('fs')
const path = require('path')
const resizeImg = require('resize-img');
var gm = require('gm').subClass({
	imageMagick: true
}) // 注意使用的区别
//也可以使用gm处理图片裁剪 缩略 以及水印等 参考 https://www.jb51.net/article/152634.htm

// base64格式文件处理
module.exports = async function(files, dir, name, obj, max) {

	var jie = files.split(':')[1].split(';')[0].split('/')[1];
	var base = files.replace(/^data:image\/\w+;base64,/, "");
	// console.log(base)
	let data = Buffer.from(base, 'base64');
	let size = data.length / 1024;
	if (max) {
		if (max * 1024 * 1024 < size) return false;
	};
	let small_size = 0;
	if (!name) {
		name = Date.now();
	};
	var nowdir = path.resolve(__dirname, '../' + dir);
	if(!fs.existsSync(nowdir)) fs.mkdirSync(nowdir,{recursive:true});
	var nowpath = path.resolve(__dirname, '../' + dir + '/' + name + '.' + jie);
	var end = fs.writeFileSync(nowpath, data);
	// var sm = await resizeImg(fs.readFileSync(path.resolve(__dirname, '../' + dir + '/' + name + '.' + jie)), obj ? obj :
	// 	{
	// 		width: 100
	// 	})
	// small_size = sm.length / 1024;
	// fs.writeFileSync(path.resolve(__dirname, '../' + dir + '/' + name + '-small.' + jie), sm);
	// gm(nowpath)
	// 	.size(function(err, size) {
	// 		console.log(size)
	// 		if (!err)
	// 			console.log(size.width > size.height ? 'wider' : 'taller than you');
	// 	});
	// gm("img.png").resize(width)//保持宽高比
	// gm("img.png").resize(null, height)//保持宽高比
	// gm("img.png").resize(width, height, '!')//参数'!'用于忽略宽高比
	// gm("img.png").rotate(color, degrees)//旋转
	// gm("img.png").rotate('green', 45)//颜色填充
	// gm("img.png").crop(width, height, x, y)//裁剪
	// gm("img.png").drawText(10, 50, "from scratch")//水印




	return {
		path: path.resolve(__dirname, '../' + dir + '/'),
		name: name + '.' + jie,
		smallname: name + '-small.' + jie,
		size,
		// small_size
	};

}
