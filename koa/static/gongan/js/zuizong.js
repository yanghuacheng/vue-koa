
//无人机显示界面

var fangda = false;

// $('.newzuizong').hide();
$('.anniu li').click(function(){
	var idxs = $(this).index();
	// 视频放大
	if(idxs == 0){
        $('.anniu li').eq(0).find('img').eq(0).hide();
        $('.anniu li').eq(0).find('img').eq(1).show();
	    $('.anniu li:nth-child(1) button').addClass("active");
		$('.bigvideo').show();
		bigplayVideo(nowUrl);
		fangda = true;
		if($('#playercontainer').html()){
		$('#playercontainer *').remove();
		};
	}else if(idxs == 2){//刷新
		playVideo(nowUrl);
		if(fangda){
			$('#playercontainer *').remove();
		}
	}else if(idxs == 1){//追踪
	$('.anniu li').eq(1).find('img').eq(0).hide();
	$('.anniu li').eq(1).find('img').eq(1).show();
		logIn();
		$('.anniu li:nth-child(2) button').addClass("active");
		// $('.pushbox').hide();
		// $('.left').hide();
		// // $('.qipao').hide();
		// $('.newzuizong').show();
		// $('.newfly').hide();
		// $('.flyul').addClass('zuizong');
		// $('.newfly').addClass('zuizong');
		// $('.leftyybg').hide();
		// $('.tuli').addClass('active');
		// // $('.jinggao').hide();
		// $('.gjtoday').hide();
		// $(".flyul li ").removeClass("active");
		
	}
})

// 大视频关闭按钮
$('.bigvideo>span').click(function(){
	$('.anniu li').eq(0).find('img').eq(1).hide();
	$('.anniu li').eq(0).find('img').eq(0).show();
	
	
	$('.anniu li:nth-child(1) button').removeClass("active");
	$('.bigvideo').hide();
	fangda = false;
	playVideo(nowUrl);
	
})

$('.bigvideo').height($('.bigvideo').width()/1.6);
// 管理按钮
$('.guanli').hide();
$(".gulibt").click(function() {
	var tset = $(this).html();
	$('.guanli').show();
	$('.tuceng').hide();
	$('.flyul li').removeClass("active");
	$('.flyul li').attr('type',0);
	$('.newfly').hide();

});

$("#qxbtm").click(function() {
	$('.guanli').hide();
});



//无人机 图层管理 主页 按钮点击
$('.newfly').hide();
$('.tuceng').hide();
$(".flyul li ").click(function() {
	$(this).addClass("active").siblings().removeClass("active")
	if($(this).index() == 0) {
		$(".flyul li ").attr('type',0);
		$('.newfly').hide();
		$('.tuceng').hide();
		$('.left').show();
		$('.newzuizong').hide();
		$('.newfly').hide();
		$('.leftyybg').show();
		$('.flyul').removeClass('zuizong');
		$('.newfly').removeClass('zuizong');
	}else if($(this).index() == 1){
		$(".flyul li ").eq(2).attr('type',0);
		$('.tuceng').hide();
		$('.flyradio').find('span').attr('class','');
		if(!$(this).attr('type')){
			$(this).attr('type',0)
		};
		var typs = $(this).attr('type');
		if(typs%2 == 0){
			$('.newfly').show();
			$('.guanli').hide();
		}else{
			$('.newfly').hide();
			$(this).removeClass("active");
		};
		typs++;
		$(this).attr('type',typs);
	}else{
		$(".flyul li ").eq(1).attr('type',0);
		$('.newfly').hide();
		if(!$(this).attr('type')){
			$(this).attr('type',0)
		};
		var typs = $(this).attr('type');
		if(typs%2 == 0){
			$('.tuceng').show();
			$('.guanli').hide();
		}else{
			$('.tuceng').hide();
			$(this).removeClass("active");
		};
		typs++;
		$(this).attr('type',typs);
	}
});
$(".flyul li ").eq(0).click();

// 无人机关闭
$('.newfly-top img').click(function(){
	$('.newfly').hide();
	$('.flyul li').removeClass("active");
	$('.flyul li').attr('type',0);
})


// 图层管理关闭
$('.tuceng-top img').click(function() {
	$('.tuceng').hide();
	$('.flyul li').removeClass("active");
	$('.flyul li').attr('type',0);
})

//警情按钮选择
$(".left-titles button").click(function() {
	$(this).addClass("active").siblings().removeClass("active")
	if($(this).index() == 1){
		$('#eacthr').css('opacity',1);
		$('#eacthrlst').hide();
	}else{
		$('#eacthr').css('opacity',0)
		$('#eacthrlst').show();
	}
});
$(".left-titles button").eq(0).click();
	  
  // 视频功能按钮
var nowsrcs= '';
$('.anniu li').hover(function(){
	nowsrcs = $(this).find('img').eq(0).attr('src');
	var sibsrc = $(this).find('img').eq(1).attr('src');
	$(this).find('img').eq(0).attr('src',sibsrc)
},function(){
	$(this).find('img').eq(0).attr('src',nowsrcs)
});	  

// SenseFace 登陆接口.MD
function logIn() {
	// 商汤登录
	$.ajax({
		url:'http://190.35.205.217:10219/authorize/oauth2/token',
		type:'post',
		data:{
			grant_type:'password',
			username:'xiaoan',
			password:'xiaoan2019'
		},
		dataType: "json",
		success:function(data){
			getdatazui(data);
			console.log(initzuizong)
			if(initzuizong.data){
				// alert(123)
				tracking(initzuizong,true)
			};
		},
		error:function(err){
			// alertmodel('验证登录信息失败');
		}
	});
}

// 嫌疑人历史轨迹
function getdatazui(token) {
	// if(!jiansuoimg){alertmodel('暂无追踪数据');return;}
	$.ajax({
		type: 'post',
		url: 'http://190.32.33.80:9092/camera/retrieval?accessToken='+token.data.access_token+'',
		contentType: "application/json", //推荐写这个
		dataType: "json",
		headers:{token:token.data.access_token},
		data:JSON.stringify({
			imageUrl:jiansuoimg,
			threshold:0.95,
			thresholdCapture:0.65
		}),
		success: function(res) {
			if (res.success) {
				tracking(res)
			}
		},error:function(err){
			
		}
	})
}
// 追踪关闭按钮
$('.newzuizong-top img').click(function(){
	// debugger
	// $('.newzuizong').hide();
	// // $('.flyul').removeClass('active');
	// $('.leftyybg').show();
	// $('.tuli').removeClass('active');
	// $('.left').show();
	$('.left').show();
	// $('.pushbox').show();
	$('.newzuizong').hide();
	$('.newfly').hide();
	$('.leftyybg').show();
	$('.flyul').removeClass('zuizong');
	$('.newfly').removeClass('zuizong');
	$('.anniu li:nth-child(2) button').removeClass("active");
    $('.anniu li').eq(1).find('img').eq(1).hide();
	$('.anniu li').eq(1).find('img').eq(0).show();
	zuizhongHid();//隐藏追踪三维场景
	
})

function timestampToTime(data) {
	 var now = new Date(Number(data));
	var year = (now.getYear() < 1900) ? (1900 + now.getYear()) : now.getYear() 
	var month = now.getMonth() + 1 <10 ? '0' + (now.getMonth() + 1) : now.getMonth() + 1;
	var date = now.getDate()<10 ? '0' + now.getDate():now.getDate();
	var hour = now.getHours()<10?'0'+now.getHours():now.getHours();
	var minute = now.getMinutes()<10?'0'+now.getMinutes():now.getMinutes();
	var second = now.getSeconds();
	return [year ,month,date,hour,minute,second	];
}
//追踪数据处理
function tracking(data,type) {
	var list = data.data.list;
	// console.log(list)
	$('.pushbox').hide();
	$('.left').hide();
	// $('.Toolbarlogo img').removeClass('active')
	// $('.qipao').hide();
	$('.newzuizong').show();
	$('.flyul').addClass('zuizong');
	$('.leftyybg').hide();
	$('.tuli').addClass('active');
	// $('.jinggao').hide();
	// $('.gjtoday').hide();

	zhuizsty = true;
	var lists = [];
	for(var lst in list){
		if(lst<20){
			lists.push(list[lst]);
		}
	};
	if(lists.length){
		$('.luxian').html('');
	};
	var zongtiao = 0;
	for (var i in lists) {
		// console.log(lists[i])
		var idxst = i.length<2 ? '0' + i : i;
		var ntime = timestampToTime(lists[i].time)[1]+`月`+timestampToTime(lists[i].time)[2]+`日&nbsp;`+timestampToTime(lists[i].time)[3]+`:`+timestampToTime(lists[i].time)[4];
		if(type){
			ntime = lists[i].time;
		};
		var strsd = `<ul>
					<li>`+idxst+`</li>
					<li>
						<div class="xyrkuan">
							<p><img width="100%" height="100%" src="`+lists[i].imageUrl+`" /></p>
							<p><img width="100%" height="100%" src="`+jiansuoimg+`" /></p>
							<p>`+ntime+`</p>
							<p>` + lists[i].videoName + `</p>
							<p class="infoNume" id="score">`+ parseInt(lists[i].score*100) +`%</p>
						</div>
					</li>
				</ul>`;
		$('.luxian').append(strsd);
		zongtiao = i;
	};
	$('.newzuizong-top p').html(Number(zongtiao) + 1);
	if(!lists.length) {
		var titlestr = `
			<ul class="active">
				<li><img src="right/感叹号.png" />暂无数据更新</li>
			</ul>
		`;
		$('.luxian').append(titlestr);
		return;
	}
	if(type) return;
	getdatareq(lists);
}

