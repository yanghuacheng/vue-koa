const websockrou = require('koa-route');
var fs =require('fs');
function all(app){
	fs.readdir('./websockrouter', function(err,file){
		for(var i in file){
			if(file[i] != 'int.js'){
				require('./' + file[i].replace('.js',''))(app,websockrou);
			}
		}
	})
};
module.exports = all;