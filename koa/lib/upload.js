var fs = require('fs');
var path = require('path');
// 表单文件处理
module.exports = function(files,dir,name) {
		if(!files || !files.length) return;
		// dir = path.resolve(__dirname, '../' +　dir);
		// console.log(dir)
		// console.log(fs.existsSync(dir))
		// return;
		if(!fs.existsSync(dir)) fs.mkdirSync(dir,{recursive:true});
		
		var size = files[0].size,type='';
		var names = files[0].name,title='',url='';
		for(var i in files){
			var file = files[i];
			if(typeof(file) == 'object'){
				var reader = fs.createReadStream(file.path)
				// 创建写入流 3. 指定图片路径文件名
				var namess = path.join(dir,name?name + '.' +file.name.split('.')[file.name.split('.').length - 1]:Date.now()+ '.' +file.name.split('.')[file.name.split('.').length - 1]);
				var stream = fs.createWriteStream(namess);
				// 用管道将读出流 "倒给" 输入流
				title = name?name + '.' +file.name.split('.')[file.name.split('.').length - 1]:Date.now()+ '.' +file.name.split('.')[file.name.split('.').length - 1];
				type = file.name.split('.')[file.name.split('.').length - 1];
				reader.pipe(stream);
			}
		}
		return {state: 'SUCCESS',original:names,originalname:names,type,title,size}
};