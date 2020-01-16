// ctx.db.query('INSERT INTO crm_access(uid,cid) VALUES(1,2)').then((val) => {//sql语句操作
	// 	console.log(val)
	// },[])
	// console.log(ctx.db.get('crm_access',['id','name'],{id:[1,3]}))
	// console.log(ctx.db.get({
	// 	dbname:'crm_access',//数据表名
	// 	field:"*",//过滤参数 字符串1,2 数组[1,2]
	// 	where:{id:'1,2,4',uid:'8'},//条件
	// 	sort:"id asc"
	// }))
	// return
	// 查询数据
	// ctx.db.get({
	// 	dbname:'crm_access',//数据表名
	// 	field:"*",//过滤参数 字符串1,2 数组[1,2]
	// 	where:{id:'1,2,4',uid:'8'},//条件
	// 	sort:"id desc"
	// }).then((val)=>{
	// 	console.log(typeof(val))
	// 	console.log(val)
	// 	// for()
	// })
	// 修改数据
	// ctx.db.set({
	// 	dbname:'crm_access',//数据表名
	// 	field:"uid=5",//更新参数 对象{uid:5} 
	// 	where:{id:'4,6,7,8,9'},//条件
	// }).then((val)=>{
	// 	console.log(val)
	// })
	//删除数据
	// ctx.db.del({
	// 	dbname:'crm_access',//数据表名
	// 	where:{uid:'1'},//条件
	// }).then((val)=>{
	// 	console.log(val)
	// })
	添加数据
	ctx.db.add({
		dbname:'crm_access',//数据表名
		field:{uid:'1',cid:5},//添加参数
	}).then((val)=>{
		console.log(val)
	})