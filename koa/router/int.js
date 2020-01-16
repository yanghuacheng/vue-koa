var fs =require('fs');
function all(router){
	fs.readdir('./router', function(err,file){
		for(var i in file){
			if(file[i] != 'int.js'){
				require('./' + file[i].replace('.js',''))(router);
			}
		}
	})
};
module.exports = all;