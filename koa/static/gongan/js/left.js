

function echartsData(data, color, dataId, op, pos, ry, length, zong, x, ty,lengths,style,more) {
	var nowwid = $(window).width();
	function runfuc(){
		var bili = $(window).width() / 1920;
		x = parseInt(x)*bili + 'px';
		ty[0] = ty[0] * bili;
		if(style){
			for(var is in style){
				var o = style[is].width;
				style[is].width = o * bili *1;
			}
		}
		var zongrenshu = 0;
		for(var os in data){
			var val = Number(data[os].value);
			if(val != -999){
				zongrenshu += data[os].value;
			};
		};
		var newlength = lengths?lengths:3;
		var datalst = {
			// selectedMode:false,
			orient: 'vertical',
			icon: "circle",
			itemWidth: 6,
			itemHeight: 6,
			itemGap: 20,
			x: x ? x : '130px',
			y: ry ? ry : '35px',
			itemGap: 12, //图例每项之间的间隔。
			data: data,
			formatter: function (name) { // 自定义图标文字
				var total = 0;
				var target;
				for (var i = 0, l = data.length; i < l; i++) {
					total += data[i].value;
					if (data[i].name == name) {
						target = data[i].value;
					}
				}
				if(name.length>newlength){
					name = name.substr(0,newlength) + '...';
				};
				var arr = [
				        '{a1|'+name+'}'+
				        '{a2|'+target+'人}'
				    ];
					
					if(more){
						var disan = '';
						if(total == 0){
							disan = 0;
						}else{
							disan = parseInt(Number(target)/Number(total) *100)
						};
						arr = [
						        '{a1|'+name+'}'+
						        '{a2|'+target+'人}'+
								'{a3|'+disan+'%}'
						 ];
					}
					return arr.join('\n');
			},
			textStyle: {
				rich:{
					'a1':{
						color:style?style[0]?style[0].color?style[0].color:'#fff':'#fff':'#fff',
						width:style?style[0]?style[0].width?style[0].width:180:180:180,
						align:style?style[0]?style[0].align?style[0].align:'left':'left':'left'
					},
					'a2':{
						color:style?style[1]?style[1].color?style[1].color:'#fff':'#fff':'#fff',
						width:style?style[1]?style[1].width?style[1].width:80:80:80,
						align:style?style[1]?style[1].align?style[1].align:'right':'right':'right'
					},
					'a3':{
						color:style?style[2]?style[2].color?style[2].color:'#fff':'#fff':'#fff',
						width:style?style[2]?style[2].width?style[2].width:80:80:80,
						align:style?style[2]?style[2].align?style[2].align:'right':'right':'right'
					}
				}
			}
		}
		
		if (length) { datalst = false }
		var myChart = echarts.init(dataId);
		myChart.clear();
		var app = {};
		var option = null;
		op = op ? op : {};
		option = {
			color: color,
			title: {
				zlevel: 0,
				text: [
					'{value|' + (zongrenshu || 0) + '}',
					'{name|' + (op.titleText) + '}',
				].join('\n'),
				rich: {
					value: {
						color: '#fff',
						fontSize: 25,
						fontWeight: 'bold',
						lineHeight: 22,
					},
					name: {
						color: '#fff',
						fontSize: 25,
						lineHeight: 20
					},
				},
				top: ty ? ty[1] ? ty[1] : 'center' : 'center',
				left: ty ? ty[0] ? ty[0] : '65' : '65',
				textAlign: 'center',
				textStyle: {
					rich: {
						value: {
							color: '#fff',
							fontSize: 12,
							fontWeight: 'bold',
							lineHeight: 20,
						},
						name: {
							color: '#008ADB',
							fontSize: 14,
							lineHeight: 20
						},
					},
				},
			},
			legend: datalst,
			tooltip:{
				show:false,
			},
			series: [{
				name: '',
				zlevel: 10,
				type: 'pie',
				radius: op.widthPercent || ['60%', '70%'],
				center: pos ? pos.length ? pos : ['27%', '50%'] : ['27%', '50%'],
				avoidLabelOverlap: false,
				hoverOffset: 3,
				label: {
					normal: {
						show: false,
						position: 'center',
						backgroundColor: 'rgba(7,24,40)',
						// 自定义中间标题
						formatter: function(val){
							var name = val.data.name.length<=3?val.data.name:val.data.name.substr(0,3) + '...';
							if(val.data.value<0){
								val.data.value = 0
							};
							var val1 = val.data.value
							var val = parseInt(val.data.value/zongrenshu*1000)/10;
							if(!zongrenshu || !val1){
								val = 0 ;
							};
							return [
								'{value|'+ val +'% }',
								'{name|'+name+'}'
							].join('\n')
						},
						rich: {
							value: {
								color: '#fff',
								fontSize: 12,
								width:50,
								fontWeight: 'bold',
								lineHeight: 22,
							},
							name: {
								color: '#008ADB',
								fontSize: 14,
								lineHeight: 22
							}
						},
					},
					emphasis: {
						show: true,
						textStyle: {
							fontSize: '30',
							fontWeight: 'bold',
							
						}
					}
				},
				labelLine: {
					normal: {
						show: true
					}
				},
				data: data,
			}]
		};
		if (option && typeof option === "object") {
			myChart.setOption(option, true);
			
			// myChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: 0  });
			// var i = 0;
			// var T = setInterval(function(){
			// 	for (var op in data){
			// 		myChart.dispatchAction({type: 'downplay', seriesIndex: 0, dataIndex: op  });
			// 	}
			// 	myChart.dispatchAction({type: 'highlight', seriesIndex: 0, dataIndex: i  });
			// 	i++;
			// 	if(i>=data.length){
			// 		i = 0;
			// 	};
			// },3000)
			// myChart.on('mouseover',function(){
			// 	console.log(1)
			// })
			myChart.on('legendselectchanged', function(params) {
				var option = this.getOption();
				option.legend[0].selected[params.name] = true;
				// console.log(params,option)
				myChart.setOption(option, true);
			});
			return myChart;
		}
	}
	var myChart = runfuc();
	window.onresize = function(){
		// console.log(123)
		// myChart.resize();
		runfuc();
		var bili = $(window).width() / 1920;
		$('html').css('font-size', 16 * bili + 'px');
	};
	// window.onresize();
}
var businessId = document.getElementById("businessData");
var shangtangStatisticId = document.getElementById("shangtangStatistic");
var myCharts = document.getElementById('sanjiao');
var ditie = document.getElementById("ditie");
var jqtongji = document.getElementById("jqtongji");


echartsData([{
	value: 10,
	name: '欢乐谷'
},
{
	value: 6,
	name: '民俗村'
},
{
	value: 8,
	name: '纯水岸'
},
{
	value: 8,
	name: '纯水'
},
{
	value: 2,
	name: '纯水村'
},
{
	value: 2,
	name: '纯岸3'
},
{
	value: 2,
	name: '香山里'
},
{
	value: 4,
	name: '香里'
}
], ['#007AFF', '#00D2E4', '#42CA83', '#FF9F7F'], shangtangStatisticId, {
	"titleText": '总人数',
	'widthPercent': ['60%', '75%']
}, ["18%", "50%"], '15px', '', '', '120px', [51, 40],3,[
	{
		width:35,
		color:'#00c0ff'
	},
	{
		width:35,
		align:'center',
		color:'#fff'
	},{}
]);
echartsData([{
	value: 10,
	name: '欢乐谷'
},
{
	value: 6,
	name: '民俗村'
},
{
	value: 8,
	name: '纯水岸'
},
{
	value: 8,
	name: '纯水'
},
{
	value: 2,
	name: '纯水村'
},
{
	value: 2,
	name: '纯岸3'
},
{
	value: 2,
	name: '香山里'
},
{
	value: 4,
	name: '香里'
}
], ['#007AFF', '#00D2E4', '#42CA83', '#FF9F7F'], myCharts, {
	"titleText": '总人数',
	'widthPercent': ['60%', '75%']
}, ["18%", "50%"], '15px', '', '', '120px', [51, 40],3,[
	{
		width:35,
		color:'#00c0ff'
	},
	{
		width:35,
		align:'center',
		color:'#fff'
	},{}
]);

// echartsData(jingliarr, ['#235af2', '#f2a809', '#00a4e9', '#fd2323', '#15dbbd', '#f227c9', '#1cc514', '#7f47ff'], asdasd, {
// 	"titleText": '类别',
// 	'titleValue': '警情',
// 	'widthPercent': ['47%', '85%']

// }, ["48%", "24%"], '140px', '', '', '5px', [63, 35]);
// // var option = {
// // 	backgroundColor: '',
// // 	textStyle: {
// // 		color: 'rgba(0,0,0,0)'
// // 	},
// // 	series: [{
// // 		name: '访问来源',
// // 		type: 'pie',
// // 		radius: '100%',
// // 		data: [{
// // 			value: 400 * .15,
// // 			name: '搜索引擎',
// // 			itemStyle: {
// // 				normal: {
// // 					color: '#00a2ff'
// // 				}
// // 			}
// // 		},
// // 		{
// // 			value: 400 * .14,
// // 			name: '直接访问',
// // 			itemStyle: {
// // 				normal: {
// // 					color: '#00d7e9'
// // 				}
// // 			}
// // 		},
// // 		{
// // 			value: 400 * .13,
// // 			name: '邮件营销',
// // 			itemStyle: {
// // 				normal: {
// // 					color: '#42ca83'
// // 				}
// // 			}

// // 		},
// // 		{
// // 			value: 400 * .12,
// // 			name: '联盟广告',
// // 			itemStyle: {
// // 				normal: {
// // 					color: '#f74a74'
// // 				}
// // 			}

// // 		},
// // 		{
// // 			value: 400 * .11,
// // 			name: '联盟广告',
// // 			itemStyle: {
// // 				normal: {
// // 					color: '#756dd5'
// // 				}
// // 			}
// // 		},
// // 		{
// // 			value: 400 * .1,
// // 			name: '联盟广告',
// // 			itemStyle: {
// // 				normal: {
// // 					color: '#ff9f7f'
// // 				}
// // 			}
// // 		},
// // 		{
// // 			value: 400 * .09,
// // 			name: '联盟广告',
// // 			itemStyle: {
// // 				normal: {
// // 					color: '#0078fc'
// // 				}
// // 			}
// // 		},
// // 		{
// // 			value: 400 * .08,
// // 			name: '视频广告',
// // 			itemStyle: {
// // 				normal: {
// // 					color: '#fff'
// // 				}
// // 			}
// // 		}
// // 		],
// // 		roseType: 'angle',

// // 		itemStyle: {
// // 			emphasis: {
// // 				shadowBlur: 200,
// // 				shadowColor: 'rgba(0, 0, 0, 0.5)'
// // 			}
// // 		},
// // 		label: {
// // 			normal: {
// // 				textStyle: {
// // 					color: 'rgba(255, 255, 255, 0.3)'
// // 				}
// // 			}
// // 		},
// // 		labelLine: {
// // 			normal: {
// // 				lineStyle: {
// // 					color: 'rgba(0,0,0,0)'
// // 				}
// // 			}
// // 		}

// // 	}]
// // }
// // myCharts.setOption(option);
// function setcof(a, color) {
// 	var option = {
// 		backgroundColor: '',
// 		textStyle: {
// 			color: 'rgba(0,0,0,0)'
// 		},
// 		series: [{
// 			name: '访问来源',
// 			type: 'pie',
// 			radius: '55%',
// 			center: ['20%', '50%'],
// 			data: [{
// 				value: 1000 * a,
// 				name: '',
// 				itemStyle: {
// 					normal: {
// 						color: color
// 					}
// 				}
// 			},
// 			{
// 				value: 1000 * (1 - a),
// 				name: '',
// 				itemStyle: {
// 					normal: {
// 						color: 'rgba(0,0,0,0)'
// 					}
// 				}
// 			}
// 			],
// 			itemStyle: {
// 				emphasis: {
// 					shadowBlur: 200,
// 					shadowColor: 'rgba(0, 0, 0, 0.5)'
// 				}
// 			},
// 			label: {
// 				normal: {
// 					textStyle: {
// 						color: 'rgba(255, 255, 255, 0.3)'
// 					}
// 				}
// 			},
// 			labelLine: {
// 				normal: {
// 					lineStyle: {
// 						color: 'rgba(0,0,0,0)'
// 					}
// 				}
// 			}

// 		}]
// 	}
// 	return option;
// }



