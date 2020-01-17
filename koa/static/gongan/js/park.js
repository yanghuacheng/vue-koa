$(function () {
	//启动监听服务
	Websocket();
});

/** websocket通讯 */
function Websocket() {
	var sock = new SockJS(config.peoplePath);
	var stomp = Stomp.over(sock);
	var data = '';
	stomp.connect({}, function (frame) {
		stomp.subscribe(config.peoplePathHt, handleNotification);
		// stomp.subscribe('/queue/shangtang/thenumberof/message', carta);
		stomp.subscribe('/queue/nanshan/policesentimentjob/message', Early);
	});
};
var slidesAll = 10;
var slidesToShowNum = 3;
var slidesval = 0;
var sliderHtml = '';
var sliderIndex = 0;
var shangtangStatistics = [0, 0, 0, 0];
var jingarr = [];
var buttonObj = {};
var jiansuoimg = '';
var initzuizong = {};
var zhuizsty = false;
$('.clleft').hide();
$('.clright').hide();
$('.jinggao').hide();
$('.pushbox').hide();
$('.gun-ami ul').html('');
var cameralst = [];
// 商汤告警信息推送接口
function handleNotification(message,types) {
	// alert(123)
	//打印日志
	// if(types){
	// 	
	// };
	var data ;
	if(typeof(message.body) == 'string'){
		data = JSON.parse(message.body);
	}else{
		data = message.body;
	};
	if(typeof(data.object) == 'string'){
		data.object = JSON.parse(data.object);
	};
	// data = message.body

	ljfunc(data.object.camera);
	
	cameralst.push(data.object.camera);
	var capturedTime = !data.object.capturedTime ? new Date().getTime() : data.object.capturedTime;
	buttonObj = data;
	function getTimes(capturedTime) {
		var date = new Date(capturedTime);
		
		var Y = date.getFullYear();
		var M = (date.getMonth() + 1) < 0 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1);
		var D = date.getDate();
		var h = date.getHours();
		var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
		var times = Y + '-' + M + '-' + D + ' ' + h + ':' + m;
		return times;
	}
	sliderIndex++;
	// console.log(data.object.faceinfo)
	var objectImageUrl = data.object.faceInfo.image.url = '' ? 'images/left.jpg' : data.object.faceInfo.image.url;
	var objectCameraPosition = data.object.camera.name;
	var objectCameraId = !data.object.camera.cameraId ? '44030504051310048111' : data.object.camera.cameraId;
	var bigImageUrl = data.object.image.url;
	var objectSlice = objectCameraPosition.length > 8 ? objectCameraPosition.slice(0 - 8) + '...' : objectCameraPosition;
	var newtim = getTimes(capturedTime);
	if(types){
		newtim = capturedTime;
	};
	for (var os in data.object.target) {
		var objectTargetUrl = data.object.target[os].url = '' ? 'images/right.jpg' : data.object.target[os].url;
		var shuurl = `
			<img src="`+objectImageUrl+`" alt="1" class="zuoimg" >
			<img src="`+objectTargetUrl+`" alt="2" class="youimg">
		`;
		if(!objectTargetUrl || !objectImageUrl){
			if(objectTargetUrl){
				shuurl = `<img src="`+objectTargetUrl+`" alt="1" class="zuoimg" style="float:none;margin:0 auto" />`;
			};
			if(objectImageUrl){
				shuurl = `<img src="`+objectImageUrl+`" alt="1" class="zuoimg" style="float:none;margin:0 auto" />`;
			};
		};
		var objectScore = data.object.target[os].score = '' ? '0.5' : data.object.target[os].score;
		var daaa = `<li class="" id="`+objectCameraId+`" bigurl="`+bigImageUrl+`">
			<time time="`+capturedTime+`">`+newtim+`</time>
			<div>
				`+shuurl+`
			</div>
			<p>
				相似度:<span id="xiangsi">`+parseInt(objectScore * 100)+`%</span>
			</p>
			<span class="diian" title="`+objectCameraPosition+`">
				`+objectSlice+`
			</span>
		</li>`;
		if(types){
			$('.gun-ami ul').append(daaa);
		}else{
			$('.gun-ami ul').prepend(daaa);
			var todaylg = Number($('.gjtoday span').text());
			todaylg ++;
			$('.gjtoday span').text(todaylg);
		}
		
	};
	// 动画
	amigs();
	$('.gun-ami ul li').unbind('click');
	$('.gun-ami ul li').click(function(){
		$(this).addClass('active').siblings().removeClass('active');
		// var carid = $(this).attr('id');
		// playVideo(carid);
		var lefti = $(this).find('.zuoimg').attr('src');//抓拍图
		jiansuoimg = lefti;
		var righti = $(this).find('.youimg').attr('src');//比对图
		var bigi = $(this).attr('bigurl');//大图
		var xiangs = $(this).find('#xiangsi').text();//相似度
		var dizis = $(this).find('.diian').attr('title');//相机名称
		var nowcarid = $(this).attr('id');//相机名称
		var zhuatime = $(this).find('time').text();//抓拍时间
		var timeaa = $(this).find('time').attr('time');//抓拍时间
		if(!timeaa){
			timeaa = 1574296382;
		};
		// console.log(lefti,righti,bigi,xiangs,dizis,nowcarid)
		$('.zuopai img').attr('src',lefti);
		$('.bidui img').attr('src',righti);
		$('.corenow').html(xiangs + '<img src="right/圈1.png" class="amiam"><img src="right/圈2.png" class="amiam_2">');
		$('.zhuatime').html(zhuatime);
		$('#position').html(dizis);
		$('.bigimg img').attr('src',bigi);
		
		initzuizong.data={};
		initzuizong.data.list = [
			{
				"cameraIdx":61,
				"captureTime":zhuatime,
				"time":timeaa,
				"facePosition":{
					"start":{
						"x":905,
						"y":255
					},
					"width":1920,
					"end":{
						"x":985,
						"y":326
					},
					"height":1080
				},
				"score":parseInt(xiangs.replace('%',''))/100,
				"videoName":dizis,
				"imageUrl":righti,
			}
		];
		// console.log(initzuizong)
		playVideo('rtmp://190.32.33.80:9935/live/' + nowcarid);
		if(!cameralst[$(this).index()]) return;
		ljfunc(cameralst[$(this).index()]);
	});
	// 最新告警

	if(!types){
		$('.jinggao').show();
		var newobjectTargetUrl = data.object.target[data.object.target.length -1].url = '' ? 'images/right.jpg' : data.object.target[os].url;
		var newobjectScore = data.object.target[data.object.target.length -1].score = '' ? '0.5' : data.object.target[os].score;
		$('.lstimg img').eq(0).attr('src',objectImageUrl);
		$('.lstimg img').eq(1).attr('src',newobjectTargetUrl);
		$('.jgcont .time time').html(newtim);
		$('.jgcont .dizhi1').html(objectSlice);
		$('.jgcont .time span').html(parseInt(newobjectScore * 100)+'%');
		// $('.gun-ami ul li').eq(0).click();
	};	
};
var noday = function(star){
	var now = new Date();
	var year = (now.getYear() < 1900) ? (1900 + now.getYear()) : now.getYear() 
	var month = now.getMonth() + 1 <10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
	var date = now.getDate()<10 ? '0' + now.getDate():now.getDate();
	var hour = now.getHours()<10?'0'+now.getHours():now.getHours();
	var minute = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes();
	var second = now.getSeconds();
	if(star) return year+'-'+month+'-'+date+ ' 00:00:00';
	return year+'-'+month+'-'+date+ ' ' +hour+ ':' +minute+ ':' +second;
}
// console.log(noday(1),noday())
// 请求当天告警列表 length为ture时获取条数否者获取数据列表
function nowtoday(length){
	$.ajax({
		url:'http://190.32.33.80:9092/videowarning/list?startTime='+noday(1)+'&endTime='+noday()+'&currentPage=1&pageSize=1000',
		contentType: "application/json",  //推荐写这个
		dataType: "json",
		success:function(data){
			// console.log(data)
			var lsts = data.data;
			
			// if(length){
			// 	var lgt = lsts.length;
			// 	$('.gjtoday >span').text(lgt);
			// 	return;
			// };
			$('.gun-ami ul').html('');
			cameralst = [];
			$('.gjtoday >span').text(lsts.length);
			
			for(var i in lsts){
				var o = lsts[i];
				if(o.faceinfo){
					o.faceInfo = o.faceinfo;
				};
				if(!o.target){
					o.target = [{}];
				};
				if(o.capturedtime){
					o.capturedTime = o.capturedtime;
				};
				var newobjs =  {
					body:{
						object:	o
					}
				};
				handleNotification(newobjs,true);
			};
			$('.gun-ami ul li').eq(0).click();
		}
	});
}
// 今日告警条数
nowtoday(true)

// 默认请求告警信息
$.ajax({
	url:'http://190.32.33.80:9092/videowarning/list?currentPage=1&pageSize=1',
	contentType: "application/json",  //推荐写这个
	dataType: "json",
	success:function(data){
		var lst = data.data[0];
		// var lst = data.data;
		// console.log(lst)
		if(lst.faceinfo){
			lst.faceInfo = lst.faceinfo;
		};
		
		if(!lst.target){
			lst.target = [{}];
		}
		if(lst.capturedtime){
			lst.capturedTime = lst.capturedtime;
		}
		var newobjs =  {
			body:{
				object:	lst
			}
		}
		// console.log(newobjs)
		handleNotification(newobjs,true);
		// console.log($('.gun-ami ul li').length)
		$('.gun-ami ul li').eq(0).click();
		// console.log(initzuizong,123)
	}
});

// 最新告警点击查看
$('.annius button').click(function(){
	if($(this).index() == 0){
		$('.gun-ami ul li').eq(0).click();
	}else{
		jiansuoimg = $('.gun-ami ul li').eq(0).find('.zuoimg').attr('src');
		var xiangs = $('.gun-ami ul li').eq(0).find('#xiangsi').text();//相似度
		var zhuatime = $('.gun-ami ul li').eq(0).find('time').text();//抓拍时间
		var timeaa = $('.gun-ami ul li').eq(0).find('time').attr('time');//抓拍时间
		var dizis = $('.gun-ami ul li').eq(0).find('.diian').attr('title');//相机名称
		var righti = $('.gun-ami ul li').eq(0).find('.youimg').attr('src');//比对图
		if(!timeaa){
			timeaa = 1574296382;
		};
		initzuizong.data={};
		initzuizong.data.list = [
			{
				"cameraIdx":61,
				"captureTime":zhuatime,
				"time":timeaa,
				"facePosition":{
					"start":{
						"x":905,
						"y":255
					},
					"width":1920,
					"end":{
						"x":985,
						"y":326
					},
					"height":1080
				},
				"score":parseInt(xiangs.replace('%',''))/100,
				"videoName":dizis,
				"imageUrl":righti,
			}
		];
		logIn();
	}
});
amigs()
function amigs(){
	var mrlen = parseInt($('.gun-ami ul li').css('margin-right'));
	var liw = $('.gun-ami ul li').width() + mrlen;
	var lilen = $('.gun-ami ul li').length;
	var ulzong = lilen * liw;
	$('.gun-ami ul').width(ulzong -mrlen + 2* lilen);
	$('.gun-ami>div').stop().animate({scrollLeft:0});
	var chaoc = $('.pushbox').width()*.9 - 20;
	if($('.gun-ami ul').width()>=chaoc){
		$('.clleft').show();
		$(".gun-ami>div").scroll(function(){
			$('.clleft').show();
		    var divHeight = $(this).width();
		    var nScrollHeight = $(this)[0].scrollWidth;
		    var nScrollTop = $(this)[0].scrollLeft;console.log($(this)[0].scrollLeft)
			if($(this)[0].scrollLeft == 0){
				$('.clright').hide();
			};
			if($(this)[0].scrollLeft>0){
					$('.clright').show();
			};
		    if(nScrollTop + divHeight+20 >= nScrollHeight) {
		      $('.clleft').hide();
		    };
		  });

		
	}
};
// 底部推送左按钮
$('.clleft').hover(function(){
	$(this).attr('src','./right/jt_lanzuo.png');
},function(){
	$(this).attr('src','./right/jt_baizuo.png');
})
$('.clright').hover(function(){
	$(this).attr('src','./right/jt_lanyou.png');
},function(){
	$(this).attr('src','./right/jt_baiyou.png');
})
$('.clleft').click(function(){
	var nowscro = $('.gun-ami>div').scrollLeft();
	var mrlen = parseInt($('.gun-ami ul li').css('margin-right'));
	var liw = $('.gun-ami ul li').width() + mrlen;
	$('.gun-ami>div').animate({scrollLeft:liw + nowscro + 2});
});
// 底部推送右按钮
$('.clright').click(function(){
	var nowscro = $('.gun-ami>div').scrollLeft();
	var mrlen = parseInt($('.gun-ami ul li').css('margin-right'));
	var liw = $('.gun-ami ul li').width() + mrlen;
	$('.gun-ami>div').animate({scrollLeft:nowscro - (liw + 2)});
});

// 底部推送关闭按钮
$('.push-top img').click(function(){
	$('.pushbox').hide();
})

//今日告警点击
$('.gjtoday').click(function(){
	if($('.gjtoday span').text() == 0){alertmodel('暂无告警'); return;}
	$('.pushbox').show();
	$('.Toolbar').hide();
	$('.cengliang').hide(); //测量
	$('.manyou').hide(); //漫游
	$('.plot').hide(); //标点
	$('.setboxs').hide(); //设置
	$('.Toolbarlogo img').removeClass("active");
	// nowtoday(true);
	// nowtoday();
})
// 最新告警关闭按钮
$('.jinggao>p').click(function(){
	$('.jinggao').hide();
})
// 默认请求接警信息
$.ajax({
	url:'http://190.32.33.80:9092/receivingalarminformation/list',
	// url:'./json/警情.json',
	contentType: "application/json",  //推荐写这个
	dataType: "json",
	data:{
		currentPage:1,
		pageSize:10
	},
	success:function(data){
		// console.log(data)
		Early(data.data,true)
	},
	error:function(){
		// ljfunc()
	}
})
var jingliarr = [{
	value: 0,
	name: '刑事'
},
{
	value: 0,
	name: '交通'
},
{
	value: 0,
	name: '消防'
},
{
	value: 0,
	name: '求助'
},
{
	value: 0,
	name: '治安'
},
{
	value: 0,
	name: '其他'
},
{
	value: 0,
	name: '举报'
},
{
	value: 0,
	name: '无效'
}
];
echartsData(jingliarr, ['#ff1b52', '#ff794d', '#f2a809', '#a5c7ff','#00a2ff', '#42ca83', '#a5b9db', '#00d7e9'], jqtongji, {
		"titleText": '类型',
		'widthPercent': ['40%', '47%']
	}, ["28%", "50%"], '65px', '', '', '170px', [80, 135],3,[
		{
			width:25,
			color:'#00c0ff'
		},
		{
			width:55,
			align:'center',
			color:'#00c0ff'
		},{
			width:35,
			align:'center',
			color:'#fff'
		}
	],true);
// 治安警情
//警情信息推送
function Early(message,type) {
	// console.log(message,type)
	var datas;
	if(!type){
		// datas = message.body;
		if(typeof(message.body) == 'string'){
			datas = JSON.parse(message.body).object;
		}
		if(typeof(datas) == 'string'){
			datas = JSON.parse(datas);
		}
		$('#jingqing').html('');
	}else{
		datas = message;
	};
	
	// 测试代码
	// datas = datas.object;
	// console.log(datas)
	
	// console.log(datas)
	var nowtime;
	var arrss = ['刑事', '交通', '消防', '求助', '治安', '其他', '举报', '无效'];
	// console.log(datas.length)
	for (var i in datas) {
		// if(i == 2) console.log(datas[i]);
		var o = datas[i];
		var other = false;
		var datatype = '';
		nowtime = o.hzsj;
		for (var k in jingliarr) {
			var ks = jingliarr[k];
			if (o.cfbjyyms.indexOf(ks.name) !== -1) {
				jingliarr[k].value = jingliarr[k].value + 1;
				other = true;
				datatype = ks.name;
			}
		};
		if (!other) {
			jingliarr[4].value = jingliarr[4].value + 1;
			datatype = jingliarr[4].name;
		};
		// console.log(timestampToTime(o.hzsj.time))
		if(type){
			nowtime = timestampToTime(o.hzsj.time)[0]+ '-' + timestampToTime(o.hzsj.time)[1] + '-' + timestampToTime(o.hzsj.time)[2] + ' ' + timestampToTime(o.hzsj.time)[3] + ':' +timestampToTime(o.hzsj.time)[4];
			o.hzsj= nowtime;
		};
		var actives = '';
		var str = `<li>
					<dl class="`+actives+`">
						<dd><span></span>`+ datatype + `</dd>
						<dd data="`+o.jjyxm+`">`+ o.jjdztms + `</dd>
						<dd data="`+o.yhdz+`">`+ o.yhdz + `</dd>
						<dd data="`+nowtime+`">`+ nowtime + `</dd>
					</dl>
				</li>`;
		$('#jingqing').append(str);
		// console.log(i)
		jingarr.push(o);
	};
	// 显示最新二十条
	for (var ls = 0; ls < $('#jingqing li').length; ls++) {
		if (ls > 19) {
			$('#jingqing li')[ls].remove();
			// jingarr.splice(ls, 1);
		}
	};
	$('#jingqing li').unbind('click');
	$('#jingqing li').hover(function () {
		var index = $(this).index();
		
		var obj = jingarr[index];
		console.log(index,obj)
		$('.q-time span').html($(this).find('dd').eq(3).attr('data'));//报警时间
		$('.q-di span').html($(this).find('dd').eq(2).attr('data'));//报警名称
		$('.q-ren span').html($(this).find('dd').eq(1).attr('data'));//接警员
		// $('.q-masc span').html(obj.bjfsdmms);//报警方式描述
	})
	// $('#jingqing li').eq(0).click();
	// console.log(jingliarr)
	echartsData(jingliarr, ['#ff1b52', '#ff794d', '#f2a809', '#a5c7ff','#00a2ff', '#42ca83', '#a5b9db', '#00d7e9'], jqtongji, {
			"titleText": '类型',
			'widthPercent': ['40%', '47%']
		}, ["28%", "50%"], '65px', '', '', '170px', [80, 135],3,[
			{
				width:25,
				color:'#00c0ff'
			},
			{
				width:55,
				align:'center',
				color:'#00c0ff'
			},{
				width:35,
				align:'center',
				color:'#fff'
			}
		],true);
};
// setInterval(function(){
// 	$.ajax({
// 		url:'./json/警情.json',
// 		success:function(data){
// 			Early(data)
// 		}
// 	})
// 	Early()
// },1000)
// 相机列表实时人数
var tuisong = 0;
var tuisongtype = true;
setInterval(function(){
	tuisong++;
	if(tuisong%5 == 0){
		tuisongtype = true
	}else{
		tuisongtype =false;
	}
},1000);
// 相机列表
$.ajax({
	url: 'http://190.32.33.80:9092/camera/list',
	// url: './json/demo.json',
	contentType: "application/json",  //推荐写这个
	dataType: "json",
	data:{
		"currentPage": "1",
		"pageSize": "8"
	},
	success: function (res) {
		// console.log(res)
		getlist(res);
	}
})

// 地铁口列表
var datlst = [],
	zongren = 0;
var zhongdiandata = [],
	colorlst = ['#007aff', '#00d7e9', '#42ca83', '#ff9f7f', '#f74a74', '#756dd5', '#36a0d7', '#ffffff'];
	echartsData([{value:-999,name:'列表未设置'}],colorlst , ditie, {
		"titleText": '未定义',
		'titleValue': '总人数',
		'widthPercent': ['35%', '45%']
	}, ["20%", "45%"], '10px', '', '', '120px', [55, 78],9,[{
					color:'#a2d0f0',
					width:80
				},{
					color:'#fff'
				}]);
// 地铁口列表
function getlist(message) {
	if (message.msg !== 'success') return;
	var msdata = message.data;
	var list = msdata.items;
	datlst = msdata.items;
	console.log(list)
	for (var i in list) {
			var sttr = '<li id="' + list[i].id + '">\
							<small style="background:' + colorlst[i] + '"></small>\
							<b>' +
				list[i].name + '</b>\
							<span style="color:#00ddef">-999</span>\
						</li>';

			zhongdiandata.push({
				value: -999,
				name: list[i].name.length>10?list[i].name.substr(0,10):list[i].name
			});
	};
	// console.log(zhongdiandata)
	if(!zhongdiandata.length) return;
	echartsData(zhongdiandata,colorlst , ditie, {
		"titleText": '地点',
		'titleValue': '总人数',
		'widthPercent': ['35%', '45%']
	}, ["20%", "45%"], '10px', '', '', '120px', [55, 78],9,[{
					color:'#a2d0f0',
					width:80
				},{
					color:'#fff'
				}]);
		for(var i in zhongdiandata){
			var carid = list[i].id;
			getCar(carid,i);
		}
		var T = setInterval(function () {
			for(var i in zhongdiandata){
				var carid = list[i].id;
				getCar(carid,i);
			}
		}, 1000 * 60);
};
// 相机实时总人数获取 
function getCar(id,idx) {
	$.ajax({
		url: 'http://190.32.33.80:9092/camera/',
		data: {
			"cameraId": id
		},
		contentType: "application/json",
		dataType: "json",
		success: function (data) {
			if (data.status == 200) {
				var count = data.data.peopleCount?data.data.peopleCount :0;
				zhongdiandata[idx].value = Number(count);
				// console.log(count)
				echartsData(zhongdiandata,colorlst , ditie, {
					"titleText": '地点',
					'titleValue': '总人数',
					'widthPercent': ['35%', '45%']
				}, ["20%", "45%"], '10px', '', '', '120px', [55, 78],9,[{
								color:'#a2d0f0',
								width:80
							},{
								color:'#fff'
							}]);
			}
		}
	})
}


// function carta(data){
// 	console.log(data)
// 	if(!tuisongtype) return;
// 	data = JSON.parse(JSON.parse(data.body).object);
// 	for(var hs in datlst){
// 		var os = datlst[hs];
// 		if(data.cameraId == os.id){
// 			getCar(data,hs)
// 		}
// 	}
// }

//监听窗口关闭
window.onbeforeunload = function (event) {
	if (stomp) {
		stomp.disconnect();
	}
	console.log("关闭WebSocket连接！");
}


	


