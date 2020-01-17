function J_getData() {
    this.contentType = "application/json";//默认
    this.dataType = "json";//请求参数类型，默认json
    var self = this;
    this.getData = function (url, req) {
        $.ajax({
            type: "GET",
            url: url,
            contentType: self.contentType,  //推荐写这个
            dataType: self.dataType,
            success: function (data) {
				req(data);

				
            },
            error: function (err) {
				console.log(err);
                req(false);
            }
        })
    }
    this.postData = function (url, parm, req) {
		//json序列化
		parm = JSON.stringify(parm);
        $.ajax({
            type: "POST",
            url: url,
            contentType: self.contentType,
            dataType: self.dataType,
            data: parm,
            success: function (data) {
                req(data);
            },
            error: function (err) {
				console.log(err);
                req(false);
            }
        })
    }
	this.putData = function (url, parm, req) {
		//json序列化
		parm = JSON.stringify(parm);
	    $.ajax({
	        type: "put",
	        url: url,
	        contentType: self.contentType,
	        dataType: self.dataType,
	        data: parm,
	        success: function (data) {
				
	            req(data);
	        },
	        error: function (err) {
				console.log(err);
	            req(false);
	        }
	    })
	}
	this.delData = function (url, req) {
		//json序列化
		// parm = JSON.stringify(parm);
	    $.ajax({
	        type: "DELETE",
	        url: url,
	        contentType: self.contentType,
	        dataType: self.dataType,
	        // data: parm,
	        success: function (data) {
				
	            req(data);
	        },
	        error: function (err) {
				console.log(err);
	            req(false);
	        }
	    })
	}
}
	



var _getData = new J_getData();
//测试请求
// 新增警力信息
function addPoliceinformation()
{
	let data = {
		
			"core_type":0,
			"police_information_name":"欢乐谷",
			"police_number_of": 0 ,
	}
	
	_getData.postData("http://190.32.33.80:9092/policeinformation/",data,function(data){
		console.log("打印",data);
	})
}
// addPoliceinformation();

// //警力信息列表
// function getPoliceinformation(){
// 	// http://127.0.0.1:9092/policeinformation/list?core_type=1&Page=1&pageSize=12
// 	_getData.getData("http://190.32.33.80:9092/policeinformation/list",function(data){
// 		console.log("警力信息列表",data);
// 	})
// }
// // getPoliceinformation();

// //http://190.32.33.80:9092/policeinformation/
// // 修改警力信息
// function xugaiPoliceinformation(){
// 	let data = {
// 		"core_type": 1,
// 		"id": 2,
// 		"police_information_name": "修改测试1",
// 		"police_number_of": 0
// 	};
// 	_getData.putData("http://190.32.33.80:9092/policeinformation/",data,function(data){
// 		console.log("修改警力信息",data);
// 	})
// }
// // xugaiPoliceinformation();

// function del(){
// 	_getData.otherData("http://190.32.33.80:9092/policeinformation/2/",function(data){
// 		console.log("删除警力信息",data);
// 	})
// }
// // del();