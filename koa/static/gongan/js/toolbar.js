// 工具栏logo点击事件
$('.Toolbar').hide();
$('.Toolbarlogo img').click(function () {
	if (!$(this).attr('type')) {
		$(this).attr('type', 0)
	};
	var num = $(this).attr('type');
	if (num % 2 == 0) {
		$(this).addClass("active");
		$('.Toolbar').show();
		$('.cengliang').hide(); //测量
		$('.manyou').hide(); //漫游
		$('.plot').hide(); //标点
		$('.setboxs').hide(); //设置
		$('.pushbox').hide();//底部推送
	} else {
		$(this).removeClass("active");
		$('.Toolbar').hide();
	}
	num++;
	$(this).attr('type', num);
	console.log(num);
})
// 工具栏导航条点击事件
var bihu = false, celiang = false, setzhi = false;
$('.Toolbarnav ul li').click(function () {
	$(this).addClass("active").siblings().removeClass("active")
	var select = $(this).index();
	window.toolUse.basGraphic.destroy()
	window.toolUse.measureTools.destroy()
	window.toolUse.removeFromDevmap()
	
	if (select == 0) { //相机复位
		window.toolUse.basGraphic.homeWay(
			window.toolUse.homeLng,
			window.toolUse.homeLat,
			window.toolUse.heading,
			window.toolUse.pitch,
			window.toolUse.roll,
		)
	}
	if (select == 1) //地图标绘
	{
		// console.log("进入地图标绘")
		window.toolUse.drawPoint()
		$('.plot').show();
		if (!bihu) {
			$('.tab-item span').eq(0).click();
			$('.selimg dd').eq(1).click();
			bihu = true;
		};

	} else {
		$('.plot').hide();
	}
	if (select == 2) //测量
	{
		window.toolUse.basGraphic.measuring(0)
		// window.toolUse.measureTools.measurePolyLine(function (data) {
		// 	console.log(data);
		// }) //测距离
		window.toolUse.measureTools.measureHeight(function(data){
			$(".shupingjuli").text(data.sp)
			$(".liangdianjuli").text(data.zx)
		})
		$('.cengliang').show();
		if (!celiang) {
			$(".cengliang ul:nth-of-type(1) li").eq(0).click();
		}
		celiang = true;
	} else {
		$('.cengliang').hide();
	}
	if (select == 3) //漫游
	{
		$('.manyou').show();
		window.toolUse.basGraphic.pointsRoaming()
	} else {
		$('.manyou').hide();
	}
	if (select == 4) //顶视图
	{
		window.toolUse.basGraphic.topView()
	}
	if (select == 5) //设置
	{
		$('.setboxs').show();
		if (!setzhi) {
			$('.setsel ul li').eq(0).click();
		};
		setzhi = true;
	} else {
		$('.setboxs').hide();
	}
})

//测量选择按钮
$('.cengliang ul:nth-of-type(1) li ').click(function () {
	var select = $(this).index();
	$(this).addClass("active").siblings().removeClass("active")
	if (select == 0) {
		//距离测量
		$('.cengliang ul:nth-of-type(2)').show();
		$('.cengliang ul:nth-of-type(3)').hide();
		window.toolUse.basGraphic.measuring(0)
		// window.toolUse.measureTools.measurePolyLine(function (data) {
		// 	$(".shupingjuli").text(data)
		// 	$(".liangdianjuli").text(data)

		// }) //测距离
		window.toolUse.measureTools.measureHeight(function(data){
			$(".shupingjuli").text(data.sp)
			$(".liangdianjuli").text(data.zx)
		})
	} else {
		//面积测量
		$('.cengliang ul:nth-of-type(3)').show();
		$('.cengliang ul:nth-of-type(2)').hide();
		// window.toolUse.basGraphic.measuring(1)
		window.toolUse.basGraphic.destroy()
		window.toolUse.measureTools.measurePolygon(function (data) {
			$(".mianji").text(data)
		}) //测面积
	}
})
//清理测绘点
$('#clearmeasuring').click(function () {
	window.toolUse.basGraphic.destroy()
})
//测量关闭
$('.cengliang-top img').click(function () {
	$('.cengliang').hide();
	$('.Toolbarnav ul li').removeClass("active");

})
// 漫游提示关闭
$('.manyou img').click(function () {
	$('.manyou').hide();
	$('.Toolbarnav ul li').removeClass("active");

})



// 地图标绘
$('.selimg').hide();
$('.huixian').hide();
// $('.plot').hide();

// 地图标绘 tab切换
$('.tab-item span').click(function () {
	$(this).addClass('active').siblings().removeClass('active');
	var idx = $(this).index();
	window.toolUse.basGraphic.destroy()
	if (idx == 0) { //标记图标显示
		$('.huixian').hide();
		// console.log('ddfffffd')
		window.toolUse.drawPoint()
	} else if (idx == 1) { //区域标识
		$('.huixian').eq(1).show();
		$('.huixian').eq(0).hide();
		// drawPolygon
		// console.log("区域标识")
		window.toolUse.drawPolygon()


	} else { //路线规划
		$('.huixian').eq(0).show();
		$('.huixian').eq(1).hide();
		window.toolUse.basGraphic.destroy()
		window.toolUse.drawLineString(line_type, line_color)
	}
});
//路线规划连线下拉框绑定
$('.lianxian select').change(function () {

	var idx = $('.lianxian select').index($(this));
	// console.log()
	var selectxian = $(this).val();
	var selecttext = $(this).text();
	// console.log(selectxian);
	if (idx == 0) { //线型

	} else if (idx == 1) { //背景

	} else { //效果

	}
})

let line_type = "1"
let line_color = 0

//区域标识绘线下拉框绑定
$('.huixian select').change(function () {
	window.toolUse.basGraphic.destroy()
	var idx = $('.lianxian select').index($(this));
	// console.log()
	var selectxian = $(this).val();
	// console.log(selectxian);

	// let 
	if (idx == 0) { //宽度 线型
		line_type = selectxian
		window.toolUse.drawLineString(line_type, line_color)
	} else if (idx == 1) { //画线选的颜色
		line_color = parseInt(selectxian)
		window.toolUse.drawLineString(line_type, line_color)
	} else if (idx == -1) { //画面
		window.toolUse.drawPolygon(parseInt(selectxian))
	}
	// if(window.toolUse.statu){
	// Window.toolUse.basGraphic.polygonColor = selectxian
	// }
	// alert(idx)

	// console.log("ffffffffff测试")
})
// $(".huixian .polygonColor").change(function(){
// 	var data= $(this).val();
// 	alert(data)
// })

// 标记图标点击
$('.tubiao p').click(function () {

	$('.selimg').show();
});
// 返回点击
$('.selimg >button').click(function () {
	console.log("aaa");
	$('.selimg').hide();
});
//标记图标选择
$('.selimg dd').click(function () {
	var nowsrc = $(this).find('img').attr('src');
	if (!nowsrc) return;
	$(this).addClass('active').siblings().removeClass('active');
	$('.tubiao p img').attr('src', nowsrc);
	let url = "url(" + nowsrc + ")"
	if (window.toolUse.statu) {
		window.toolUse.basGraphic.point_type = url

		$('.fllowPoint').css("background-image", url)
	} else {
		window.toolUse.drawPoint(url)
	}
	// console.log("ffffffffff测试")
	// console.log(nowsrc)
});


// 地图标绘关闭按钮
$('.plot>h5 img').click(function () {
	$('.plot').hide();
	$('.Toolbarnav ul li').removeClass("active");
})
// 设置关闭按钮
$('.setboxs>h5 img').click(function () {
	$('.setboxs').hide();
	$('.Toolbarnav ul li').removeClass("active");
})

// 图层管理

$('.tuceng ul input').click(function () {
	var idx = $('.tuceng ul input').index($(this));
	if (!$(this).attr('types')) {
		$(this).attr('types', 0)
	};
	var num = $(this).attr('types');
	if (idx == 0) {//视频监控
		let _show = true;
		if (num % 2 != 0) { //图层开启
			_show = true
		} else { //图层关闭
			_show = false
		}
		if (devMap.containsKey("cameraLabel")) {
			let arr = devMap.get("cameraLabel")
			arr.forEach(item => {
				item.show = _show
			});
		}
	} else if (idx == 1) {//责任单位
		if (num % 2 == 0) { //图层开启
			showAndHid("zhuti",zhuti,false);
			zhutiStatus = true

		} else { //图层关闭
			// debugger
			// $('.jingli').hide();
			// if (devMap.containsKey("zhuti")) {
			// 	let divs = devMap.get("zhuti");
			// 	divs.forEach(function (item) {

			// 		$(item.div).hide()
			// 	})
			// }
			jusHide("zhuti");
			zhutiStatus = false
		}
	} else {//警力部署
		if (num % 2 == 0) { //图层开启
			// liandong = [],zhuti=[],hexin=[];
			console.log("联动",liandong)
			showAndHid("liandong",liandong,true);
			showAndHid("hexin",hexin,true);
		} else { //图层关闭
			jusHide("liandong")
			jusHide("hexin")
		}

	}

	num++;
	$(this).attr('types', num);
})
function jusHide(key){
	if (devMap.containsKey(key)) {
		let divs = devMap.get(key);
		divs.forEach(function (item) {

			$(item.div).hide()
		})
	}
}
function showAndHid(key,data,type){
	// debugger
			//先从存储中读取图层
			if (devMap.containsKey(key)) {
				
				//如果有，就将其取出来
				let divs = devMap.get(key);
				divs.forEach(function (item) {
					xakj.universalLabelPoint(item.x_point, item.y_point, item.z_point, item.div);
					$(item.div).show()
				})
			} else {
				//没有就创建
				if (data.length > 0) {
					// debugger
					var div_Arr = [];
					data.forEach(function (item) {
						if (item.x_point != "") {
							let div = createDiv(item,type);
							xakj.universalLabelPoint(item.x_point, item.y_point, item.z_point, div);
							$(div).show();
							div_Arr.push({
								"div": div,
								"x_point": item.x_point,
								"y_point": item.y_point,
								"z_point": item.z_point

							});
						}
			
					})
					devMap.put(key, div_Arr);
				}
			}
}




//初始位置选择
$('.setsel ul li').click(function () {
	$(this).addClass('active').siblings().removeClass('active');
	var idx = $(this).index();
	if (idx == 0) { //位置0
		window.toolUse.homeLng = 113.97025613534363
		window.toolUse.homeLat = 22.541192996412686
		window.toolUse.heading = 3.279304500963121
		window.toolUse.pitch = -0.25239072362282485
		window.toolUse.roll = 6.283185307179583
	} else if (idx == 1) { //位置1
		window.toolUse.homeLng = 113.966843
		window.toolUse.homeLat = 22.534619
		window.toolUse.heading = Cesium.Math.toRadians(400)
		window.toolUse.pitch = -0.25239072362282485
		window.toolUse.roll = 6.283185307179583
	} else { //位置2
		window.toolUse.homeLng = 113.972280
		window.toolUse.homeLat = 22.536998
		window.toolUse.heading = Cesium.Math.toRadians(180)
		window.toolUse.pitch = -0.25239072362282485
		window.toolUse.roll = 6.283185307179583
	}
	window.toolUse.basGraphic.homeWay(
		window.toolUse.homeLng,
		window.toolUse.homeLat,
		window.toolUse.heading,
		window.toolUse.pitch,
		window.toolUse.roll,
	)
})

$("#clearmeasuring").click(function () {
	window.toolUse.measureTools.destroy();
})

// 灯光强度移入
function theLight(num) {
	console.log(num)
	window.toolUse.basGraphic.changeLinghting(num, models)
}
function createDiv(obj, type) {
	let _div = document.createElement('div');
	_div.className = 'jingli';
	if (type) {
		$(_div).html(
			'<div>' +
			'<span class="jingli-adr">' + obj.police_information_name + '</span>' +
			'<span class="jingli-man">' + obj.police_number_of + '<span>人</span></span>' +
			'</div>'
		);
	} else {
		$(_div).html(
			'<div>' +
			'<span class="jingli-adr">' + obj.unit_name + '</span>' +
			'</div>'
		);
	}
	return _div;
}
