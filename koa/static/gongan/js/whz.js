//whz操作方法

var j_getData = new J_getData();
    function whzInit(self){
         //主体单位信息方法
        //  self.contentType = 'contentType: "application/json"',
         self.getMainunitData = function (type) {
            self.getdata("http://190.32.33.80:9092/mainunit/list?currentPage=1&pageSize=25",(data)=>{
                // console.log("主体信息：",data);
                if(data){
                    if(!type) self.mainunit = data;
                    // console.log(self.mainunit)
                     self.zhuti = data.data;
                     $('.zeren').text(data.data.length);
                }
            })
        },
        // 添加信息方法
        self.addMainunitData = function(id){
                var isfu = false;
                for(var i in self.mainunit.data){
                    var o = self.mainunit.data[i];
                    if(self.zhutiobj.unit_name == o.unit_name){
                        isfu = true;
                        break;
                    }
                };
                if(isfu){
                    self.zhutiobj.unit_name = '';
                    alertmodel('已存在主体单位，请重新输入');
                    return;
                };
                _getData.postData("http://190.32.33.80:9092/mainunit/", self.zhutiobj, function (data) {
                    // console.log("添加主体信息11", data);
                    if (data) {
                        // alertmodel("添加成功！");
                        self.getMainunitData();
                        self.zhutiobj={
                            'unit_name':''
                        };
                        self.bianji = false;
                        self.delsa = false;
                        self.tianjia = false;
                    } else {
                        alertmodel("添加失败！");
                    }
                })
        },
         // 修改主体单位信息方法
        self.upMainunitData = function(obj,idxs){
//             var isfu = false;
//             for(var i in self.mainunit.data){
//                 var o = self.mainunit.data[i];
//                 if(i == idxs){
//                     continue;
//                 };
//                 if(o.unit_name == obj.unit_name){
//                     console.log(i,idxs)
//                     isfu = true;
//                     self.getMainunitData();
//                     break;
//                 }
//             };
//             if(isfu){
//                 alertmodel('已存在主体单位，请重新输入');
//                 return;
//             };
            $.ajax({
                type: "put",
                url: 'http://190.32.33.80:9092/mainunit/',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(obj),
                success: function (data) {
                    self.getMainunitData();
                    self.bianji = false;
                    self.delsa = false;
                },
                error: function (err) {
                    console.log(err);
                }
            })

        },
        // 删除主体单位信息方法
        self.delMainunitData = function(id){
            self.delData("http://190.32.33.80:9092/mainunit/"+ id +"/",{}, (data)=>{
                // console.log("删除主体信息：",data);
                self.getMainunitData();
                self.bianji = false;
                self.delsa = false;
                self.tianjia = false;
            })
        },
      
        // 添加警力信息
        self.addPoliceinfo = function (){
            var isfu = false;
            for(var i in self.mainunit.data){
                var o = self.mainunit.data[i];
                if(o.police_information_name == self.jingobj.police_information_name){
                    isfu = true;
                    break;
                }
            };
            if(isfu){
                self.jingobj.police_information_name = '';
                alertmodel('已存在主体单位，请重新输入');
                return;
            };
            self.jingobj.core_type = self.nowid;
            $.ajax({
                type: "POST",
                url: 'http://190.32.33.80:9092/policeinformation/',
                contentType: "application/json",
                dataType: "json",
                data: JSON.stringify(self.jingobj),
                success: function (data) {
                    self.getPoliceinfo(self.nowid,true)
                    self.jingobj = {
                        "police_number_of": 0,
					    'police_information_name':''
                    };
                    self.tianjia = false;
                    self.bianji = false;
                    self.delsa = false;
                },
                error: function (err) {
                    console.log(err);
                    // req(false);

                }
            })
        },
         // 警力信息
         self.getPoliceinfo = function (id,clik){
            self.getdata("http://190.32.33.80:9092/policeinformation/list?core_type="+ id+"&currentPage=1&pageSize=25",  (data)=>{
                // console.log("警力信息：",data);
                if(data){
                     if(clik){
                         self.mainunit = data;
                        //  console.log(data)
                     };
                     var listarr = [];
                     var zongshu = 0;
                     if(id == 1){
						 // alert(123)
                        self.hexin = data.data;
						
                        var colorLst = ['#00a2ff','#00d7e9','#42ca83','#f74a74','#756dd5','#ff9f7f','#0078fc','#fff'];
                        for(var i in data.data){
                            var io = data.data[i];
							listarr.push({
								name:io.police_information_name,
								value:io.police_number_of,
								
							})
                           zongshu = zongshu + io.police_number_of;
                        };  
                        echartsData(listarr, ['#00a2ff', '#00d7e9', '#42ca83', '#f74a74', '#756dd5', '#ff9f7f', '#37a2da', '#a5c7ff', '#42CA83', '#FF9F7F'], myCharts, {
                        	"titleText": '总人数',
                        	'widthPercent': ['60%', '75%']
                        }, ["18%", "50%"], '15px', '', '', '120px', [51, 40],3,[
                        	{
                        		width:38,
                        		color:'#00c0ff'
                        	},
                        	{
                        		width:35,
                        		align:'center',
                        		color:'#fff'
                        	},{}
                        ]);
						$('.hxqjl p').text(zongshu);
                        // $('.zongshaa').text(zongshu);
                     }else{
                        //  return
                         self.liandong = data.data;
						 
                         for(var i in data.data){
                            var io = data.data[i];
							listarr.push({
								name:io.police_information_name,
								value:io.police_number_of
							});
							zongshu = zongshu + io.police_number_of;
                        };
                       
						echartsData(listarr, ['#00a2ff', '#00d7e9', '#42ca83', '#f74a74', '#756dd5', '#ff9f7f', '#37a2da', '#a5c7ff', '#42CA83', '#FF9F7F'], shangtangStatisticId, {
							"titleText": '总人数',
							'widthPercent': ['60%', '75%']
						}, ["18%", "50%"], '15px', '', '', '120px', [51, 40],3,[
							{
								width:38,
								color:'#00c0ff'
							},
							{
								width:35,
								align:'center',
								color:'#fff'
							},{}
						]);
						$('.ldkl p').text(zongshu);
                        // $('.zongshaa1').text(zongshu);
                     };
                     
                     
                }
            })
    
        },
          // 修改警力信息
          self.upPoliceinfo = function (obj,idxs){
//             var isfu = false;
//             for(var i in self.mainunit.data){
//                 var o = self.mainunit.data[i];
//                 if(o.police_information_name == obj.police_information_name && i != idxs){
//                     isfu = true;
//                     break;
//                 }
//             };
//             if(isfu){
//                 alertmodel('已存在主体单位，请重新输入');
//                 self.getPoliceinfo(self.nowid,true);
//                 return;
//             };
            $.ajax({
                url:'http://190.32.33.80:9092/policeinformation/',
                contentType: "application/json",
                dataType: "json",
                type:'put',
                data:JSON.stringify(obj),
                success:function(data){
                    
                    if(data.msg == '操作失败！') {alertmodel(data.msg); return;}
                    self.getPoliceinfo(self.nowid,true);
                    self.bianji = false;
                    self.delsa = false;
                }
            })
        },
        self.dels = function(id){
            $.ajax({
                url:'http://190.32.33.80:9092/policeinformation/'+ id,
                contentType: "application/json",
                dataType: "json",
                type:'DELETE',
                success:function(data){
                    self.getPoliceinfo(self.nowid,true);
                    self.bianji = false;
                    self.delsa = false;
                }
            })
        },
        // get请求
        self.getdata = function(url,req) {
            $.ajax({
                type: "GET",
                url: url,
                contentType: self.contentType,  //推荐写这个
                dataType: self.dataType,
                success: function (data) {
                    req(data);
                },
                error: function (err) {
                    
                }
            })
        },
        // post请求
        self.postData = function (url, parm,req) {
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
                    // req(false);

                }
            })
        },
        // put请求
        self.putData = function(url,parm,req) {
            //json序列化
            parm = JSON.stringify(parm);
            $.ajax({
                type: "PUT",
                url: url,
                contentType: self.contentType,
                dataType: self.dataType,
                data: parm,
                success: function (data) {
                    req(data);

                },
                error: function (err) {
                    console.log(err);
                    // req(false);

                }
            })
        },
        //删除
        self.delData = function(url, parm,req) {
            //json序列化
            parm = JSON.stringify(parm);
            $.ajax({
                type: "DELETE",
                url: url,
                contentType: self.contentType,
                dataType: self.dataType,
                data: parm,
                success: function (data) {
                    req(data);
                },
                error: function (err) {
                    console.log(err);
                    // req(false);
                    
                }
            })
        }
    }