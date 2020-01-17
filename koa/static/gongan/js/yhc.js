$('#sanjiao').show();
$('#shangtangStatistic').hide();
// 核心联动警力切换
$(".poptitle span").click(function () {
	$(this).addClass("active").siblings().removeClass("active")
	var indsx = $(this).index();
	if (indsx == 0) {
		$('.zongshaa').show().siblings('.zongshaa1').hide();
		$('#sanjiao').show();
		$('#shangtangStatistic').hide();
		$('.population-top>span').eq(0).html('核心警力')
	} else {
		$('.zongshaa1').show().siblings('.zongshaa').hide();
		$('#sanjiao').hide();
		$('#shangtangStatistic').show();
		$('.population-top>span').eq(0).html('联动警力');
	}
});
$(".poptitle span").eq(0).click();
var liandong = [],zhuti=[],hexin=[];
var zhutiStatus = false
var vm = new Vue({
	el: "#ddddd",
	data: function () {
		return {
			name: '',
			password: '',
			mainunit: {
				data: [
					{
						"id": 1,
						"extension": "",
						"unit_name": "test"
					},
					{
					"id": 1,
					"extension": "",
					"unit_name": "test1"
					},
					{
					"id": 1,
					"extension": "",
					"unit_name": "test1"
					},
					{
					"id": 1,
					"extension": "",
					"unit_name": "test1"
					},
					{
					"id": 1,
					"extension": "",
					"unit_name": "test1"
					},
					{
					"id": 1,
					"extension": "",
					"unit_name": "test1"
					},
					{
					"id": 1,
					"extension": "",
					"unit_name": "test1"
					},
					{
					"id": 1,
					"extension": "",
					"unit_name": "test1"
					},
					{
					"id": 1,
					"extension": "",
					"unit_name": "test1"
					},
					{
					"id": 1,
					"extension": "",
					"unit_name": "test1"
					},
					{
					"id": 1,
					"extension": "",
					"unit_name": "test1"
					}
					
				]
			},//主体单位
			liandong: [],
			zhuti: [
				{
					"id": 1,
					"extension": "1dasdasd",
					"police_number_of": 50,
					"unit_name": "test",
					"x_point":'',
					"y_point":'',
					"z_point":''
				},
				{
				"id": 1,
				"extension": "2asdasd",
				"police_number_of": 50,
				"unit_name": "test1",
				"x_point":'',
				"y_point":'',
				"z_point":''
				},
				
			],
			hexin: [],
			nowid: 2,
			setidx: -1,
			tianjia: false,
			delsa: false,
			bianji: false,
			fanx: false,
			click: false,
			jingobj: {
				"police_number_of": 0,
				'police_information_name': ''
			},
			zhutiobj: {
				'unit_name': ''
			},
			setbox:false
		}
	},
	beforeCreate() {
		//初始化
		whzInit(this);
	},
	created: function () {//创建完成时粗发函数
		//在这开始可以调用函数
		this.getMainunitData();//获取主体单位数据
		// 联动
		this.getPoliceinfo(0);
		// 核心
		this.getPoliceinfo(1);
		// alert(123)
	},
	methods: {//方法
		serar: function (id) {
			this.mainunit.data = [];
			if (id > 1) {
				this.getMainunitData(); return;
			};
			this.getPoliceinfo(id, true);
		},
		psoi: function (id, obj, status) {
			
			let self = this
			// console.log("LLLLLL", obj)
			if (id == 0) {//联动警力标记
				console.log("联动警力",obj)
				_jingli(obj,status);
			} else if (id == 1) {//核心警力标记
				console.log("核心圈警力",obj);
				_jingli(obj,status);
				
			} else {//主体单位
				if (status) {
					if(!zhutiStatus) return
					if(obj.x_point==""&&obj.z_point=="") return
					//定并显示标注点
					// showAndHid("zhuti",zhuti,false);
					if(devMap.containsKey("zhuti")){
						let _divs = devMap.get("zhuti");
						_divs.forEach(function(item){
							if(item.x_point == obj.x_point && item.y_point == obj.y_point && item.z_point == obj.z_point){
								xakj.universalLabelPoint(obj.x_point, obj.y_point, obj.z_point, item.div);
								$(item.div).show()
							}
						})
					}else{
						let div = createDiv(obj);
						xakj.universalLabelPoint(obj.x_point, obj.y_point, obj.z_point, div);
						$(div).show();
						let _arr = []
						if(devMap.containsKey("zhuti")){
							_arr = devMap.get("zhuti");
						}
						_arr.push({
							"div": div,
							"x_point": obj.x_point,
							"y_point": obj.y_point,
							"z_point": obj.z_point

						});
						devMap.put("zhuti",_arr)
					}
					
					viewer.camera.flyTo({
						destination: Cesium.Cartesian3.fromDegrees(obj.x_point, obj.y_point, 130),
						orientation: {
							heading: 0,
							pitch: Cesium.Math.toRadians(-90),
							roll: Cesium.Math.toRadians(-90)
						}
					})

				} else {
					xakj.addJingliPoint(0, { title: obj.unit_name, policeForce: null }, function (data) {
						// alert(data);
						//标点结束，修改数据库信息 {lon:lon,lat:lat,height:height,_div:_div}
						let _arr = []
						if(devMap.containsKey("zhuti")){
							_arr = devMap.get('zhuti')
						}
						_arr.push({
							"div": data._div,
							"x_point": data.lon,
							"y_point": data.lat,
							"z_point": data.height
						})
						devMap.put("zhuti",_arr)
						self.upMainunitData({
							"extension": obj.extension,
							"id": obj.id,
							"unit_name": obj.unit_name,
							"x_point": data.lon,
							"y_point": data.lat,
							"z_point": data.height
						})
					})
				}

			}
			function _jingli(obj,status){
				if(status){
					let div = createDiv(obj,true);
					xakj.universalLabelPoint(obj.x_point, obj.y_point, obj.z_point, div);
					$(div).show();
					viewer.camera.flyTo({
						destination: Cesium.Cartesian3.fromDegrees(obj.x_point, obj.y_point, 130),
						orientation: {
							heading: 0,
							pitch: Cesium.Math.toRadians(-90),
							roll: Cesium.Math.toRadians(-90)
						}
					})
				}else{
					xakj.addJingliPoint(1, { title: obj.police_information_name, policeForce: obj.police_number_of }, function (data) {
						//标点结束，修改数据库信息
						self.upPoliceinfo({
							"core_type": obj.core_type,
							"extension": obj.extension,
							"id": obj.id,
							"police_information_name": obj.police_information_name,
							"police_number_of": obj.police_number_of,
							"x_point": data.lon,
							"y_point": data.lat,
							"z_point": data.height
						  })
						
					})
				}
			}
			
			
			function createDiv(obj,type) {
				let _div = document.createElement('div');
				_div.className = 'jingli';
				if(type){
					$(_div).html(
						'<div>' +
						'<span class="jingli-adr">'+ obj.unit_name +'</span>' +
						'<span class="jingli-man">'+ obj.police_number_of +'<span>人</span></span>' +
						'</div>'
					);
				}else{
					$(_div).html(
						'<div>' +
						'<span class="jingli-adr">'+ obj.unit_name +'</span>' +
						'</div>'
					);
				}
				return _div;
			}
		}


	},
	mounted: function () {//加载完成时
		var _this = this;
		$(document).click(function(e){
			var target = $(e.target);
			var isd = _this.setidx;
			if (target.closest('.settarget').length) {
				_this.setbox = true;
				var nowli = $(target.closest('.settarget')).parents('li');
				nowpos = nowli.position().top + 27;
				$('.setbdl').css('top',nowpos + 'px');
				_this.setidx = $(target.closest('.settarget')).attr('idx');
				isd = _this.setidx; 
			};
			if(target.closest('.nowid2').length == 0){
				if(_this.nowid == 2 && _this.tianjia){
					_this.addMainunitData(_this.nowid);
				}
			};
			if(target.closest('.nowids').length == 0){
				if(_this.nowid != 2 && _this.tianjia){
					_this.addPoliceinfo(_this.nowid);
				}
			};
			if(isd<0) return;
			$('.setb ul li').eq(isd);
			if (target.closest('.select').length == 0 && target.parent().attr('class') != 'setbdl') {
				if(_this.bianji){
					if(_this.nowid == 2){
						_this.upMainunitData(_this.mainunit.data[_this.setidx],_this.setidx)
					}else{
						_this.upPoliceinfo(_this.mainunit.data[_this.setidx],_this.setidx)
					}
				};
				_this.delsa = false;
				_this.bianji = false;
				if(target.closest('.settarget').length == 0){
					_this.setbox = false;
				};
			};
			
		});
		var _self = this;
		document.onkeydown = function(e) {
			var key = window.event.keyCode;
			if (key == 13) {
				var isd = _self.setidx;
				if(isd >= 0 && _self.bianji) {
					if(_self.nowid == 2){
						_self.upMainunitData(_self.mainunit.data[isd],isd);
					}else{
						_self.upPoliceinfo(_self.mainunit.data[isd],isd);
					}
				};
			}
		};
		document.onkeydown = function(e) {
			var key = window.event.keyCode;
			if (key == 13) {
				var isd = _self.setidx;
				if(isd >= 0 && _self.bianji) {
					if(_self.nowid == 2){
						_self.upMainunitData(_self.mainunit.data[isd],isd);
					}else{
						_self.upPoliceinfo(_self.mainunit.data[isd],isd);
					}
				};
			}
		};
		var nowsc = $('.guanli ul').scrollTop();
		$('.guanli ul').scroll(function(){
			var top = parseInt($('.setbdl').css('top'));
			var add = nowsc-$(this).scrollTop();
			$('.setbdl').css('top',top + add + 'px');
			nowsc = $(this).scrollTop();
		});
	},
	computed: {//计算属性

	},
	updated: function () {
		// leftInit();
		// cameraList();
		// del();
	},
	watch: {//监听属性
		hexin() {
			var zongshus = 0;
			for(var i in this.hexin){
				var o = this.hexin[i];
				zongshus += o.police_number_of;
			};
			for(var i in this.liandong){
				var o = this.liandong[i];
				zongshus += o.police_number_of;
			};
			console.log(zongshus)
			$('.jngli').text(zongshus);
			hexin=this.hexin;
		},
		liandong() {
			var zongshus = 0;
			for(var i in this.hexin){
				var o = this.hexin[i];
				zongshus += o.police_number_of;
			};
			for(var i in this.liandong){
				var o = this.liandong[i];
				zongshus += o.police_number_of;
			};
			$('.jngli').text(zongshus);
			liandong = this.liandong;
		},
		zhuti(){
			zhuti = this.zhuti;
		}
	}
})