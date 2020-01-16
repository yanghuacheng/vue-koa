// 数据库增删改查api
const mysql = require('mysql');
const config = require('../config/mysql_config');
const pool = mysql.createConnection(config);
var ors = pool.connect();
const get = (obj)=>{
	var arr = obj.field ? obj.field : [];
	var dbname = obj.dbname;
	var obj1 = obj.where ? obj.where : {};
	var str = '';
	if(arr.length && typeof(arr) == "array"){
		for(var i in arr){
			if(i<arr.length - 1){
				str += arr[i] + ','
			}else{
				str += arr[i]
			}
		}
	}else{
		str = arr;
	};
	if(!str){str = "*"};
	var oris = 'where ';
	var idx = 0;
	for(var o in obj1){
		var sde = '';
		if(typeof(obj1[o]) == 'Array'){
			for(var ok in obj1[o]){
				if(ok<obj1[o].length - 1){
					sde += obj1[o][ok] + ','
				}else{
					sde += obj1[o][ok]
				}
			};
		}else{
			sde = obj1[o];
		};
		if(idx == 0){
			oris = oris + o + '=' + '"' + sde + '"';
		}else{
			oris = oris + ' and ' + o + '=' + '"' + sde + '"';
		}
		idx ++;
	};
	if(oris == 'where '){oris = ''};
	var ascall = 'order by ';
	var asc = obj.sort ? ascall + obj.sort : '';
	var sql = `SELECT ${str} FROM ${dbname} ${oris} ${asc}`;
	// return sql
	return new Promise((resolve, reject) => {
		pool.query(sql,(err, fields) => {
			if (err) {
				reject(err)
			} else {
				resolve(fields)
			}
		})
		// pool.end();	
	})
	// return sql;
};
const set = (obj)=>{
	var arr = obj.field ? obj.field : {};
	var dbname = obj.dbname;
	var obj1 = obj.where ? obj.where : {};
	var str = '';
	if(typeof(arr) == "object"){
		for(var i in arr){
			str += i + '=' + "'" +arr[i] + "'" +','
		}
		if(str.length) str = str.substr(0,str.length - 1);
	}else{
		str = arr;
	};
	if(!str){str = ""};
	var oris = 'where ';
	var idx = 0;
	for(var o in obj1){
		var sde = '';
		if(typeof(obj1[o]) == 'Array'){
			for(var ok in obj1[o]){
				if(ok<obj1[o].length - 1){
					sde += obj1[o][ok] + ','
				}else{
					sde += obj1[o][ok]
				}
			};
		}else{
			sde = obj1[o];
		};
		if(idx == 0){
			oris = oris + o + ' in ("' + sde + '")';
		}else{
			oris = oris + ' and ' + o + ' in ("' + sde + '")';
		}
		idx ++;
	};
	if(oris == 'where '){oris = ''};
	var sql = `update ${dbname} set ${str} ${oris}`;
	// return sql
	return new Promise((resolve, reject) => {
		pool.query(sql,(err, fields) => {
			if (err) {
				reject(err)
			} else {
				resolve(fields)
			}
		})
	})
};
const del = (obj)=>{
	var dbname = obj.dbname;
	var obj1 = obj.where ? obj.where : {};
	var oris = 'where ';
	var idx = 0;
	for(var o in obj1){
		var sde = '';
		if(typeof(obj1[o]) == 'Array'){
			for(var ok in obj1[o]){
				if(ok<obj1[o].length - 1){
					sde += obj1[o][ok] + ','
				}else{
					sde += obj1[o][ok]
				}
			};
		}else{
			sde = obj1[o];
		};
		if(idx == 0){
			oris = oris + o + ' in ("' + sde + '")';
		}else{
			oris = oris + ' and ' + o + ' in ("' + sde + '")';
		}
		idx ++;
	};
	if(oris == 'where '){oris = ''};
	var sql = `delete from ${dbname} ${oris}`;
	return new Promise((resolve, reject) => {
		pool.query(sql,(err, fields) => {
			if (err) {
				reject(err)
			} else {
				resolve(fields)
			}
		})
	})
};
const add = (obj)=>{
	var dbname = obj.dbname;
	var obj1 = obj.field ? obj.field : {};
	var idx = 0;
	var sde = '';
	var sde1 = '';
	for(var o in obj1){
		sde = sde + o + ',';
		if(typeof(obj1[o]) == 'string'){
			sde1 = sde1 + "'" +obj1[o] + "'" + ',';
		}else{
			sde1 = sde1 + obj1[o]+',';
		}
		
	};
	if(sde) sde = sde.substr(0,sde.length - 1);
	if(sde1) sde1 = sde1.substr(0,sde1.length - 1);
	var sql = `insert into ${dbname} (${sde}) values (${sde1})`;
	// return sql;
	return new Promise((resolve, reject) => {
		pool.query(sql,(err, fields) => {
			if (err) {
				reject(err)
			} else {
				resolve(fields)
			}
		})
	})
};
const query = (sql, val) => {
	return new Promise((resolve, reject) => {
		pool.query(sql, val, (err, fields) => {
			if (err) {
				reject(err)
			} else {
				resolve(fields)
			}
		})
		// pool.end();	
	})

}
module.exports = {
	query,
	get,
	set,
	del,
	add
};
