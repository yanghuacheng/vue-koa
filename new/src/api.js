import axio from 'axios'
import echarts from 'echarts'
import $ from 'jquery'
// 参数过滤函数
function filterNull (o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key]
        }
        if (toType(o[key]) === 'string') {
            o[key] = o[key].trim()
        } else if (toType(o[key]) === 'object') {
            o[key] = filterNull(o[key])
        } else if (toType(o[key]) === 'array') {
            o[key] = filterNull(o[key])
        }
    }
    return o
};
var MyPlugin = {};
MyPlugin.install = function (Vue, options) {
  // 1. 添加全局方法或属性
  Vue.myGlobalMethod = function () {
    // 逻辑...
  }

  // 2. 添加全局资源
  Vue.directive('my-directive', {
    bind (el, binding, vnode, oldVnode) {
      // 逻辑...
    }
  })

  // 3. 注入组件选项
  Vue.mixin({
    created: function () {
      // 逻辑...
    }
  })
  Vue.prototype.getweb = function(obj){
    var _this = obj;
    _this.apiaxio('POST', _this.rootpath + '/flst', {}, function(data) {
      _this.$root.flst = data.data.list;
    })
    var CreateWebSocket = (function() {
      return function(urlValue) {
        if (window.WebSocket) return new WebSocket(urlValue);
        if (window.MozWebSocket) return new MozWebSocket(urlValue);
        return false;
      };
    })();
    var webSocket = CreateWebSocket('ws://localhost:3000/run?strid=' + $cookies.get('nowinfo').id);
    webSocket.onmessage = function(msg) {
      console.log('服务端说:' + msg.data);
      var data = JSON.parse(msg.data);
      _this.$root.runflst = data.lst;
    };
    var weick = $cookies.get('weidu');
    _this.$root.weidu = $cookies.get('weidu') && $cookies.get('weidu') != 'null' ? JSON.parse($cookies.get('weidu')):[];
    /* 实例化 WebSocket 连接对象, 地址为 ws 协议 */
    var webSocket1 = CreateWebSocket('ws://localhost:3000?strid=' + $cookies.get('nowinfo').id);
    _this.$root.websock = webSocket1;
    /* 接收到服务端的消息时 */
    webSocket1.onmessage = function(msg) {
      // console.log(JSON.parse(msg.data))
      _this.$root.weidu.push(JSON.parse(msg.data));
      // console.log(_this.$root.weidu)
      var val = JSON.stringify(_this.$root.weidu);
      $cookies.set('weidu', val, { expireTimes: 10 });
      // console.log(JSON.parse($cookies.get('weidu')))
    };
    // console.log(_this.$root.websock)
    /* 关闭时 */
    webSocket1.onclose = function() {
      console.log('关闭连接');
    };

    return true;
  };
  Vue.prototype.echarts = function echartsData(obj) {//data, color, dataId, op, pos, ry, length, zong, x, ty,lengths,style,more
  	var zongrenshu = 0;
  	for(var os in obj.data){
  		var val = Number(obj.data[os].value);
  		if(val != -999){
  			zongrenshu += obj.data[os].value;
  		};
  	};
  	var newlength = obj.lengths?obj.lengths:3;
  	var datalst = {
  		// selectedMode:false,
  		orient: 'vertical',
  		icon: "circle",
  		itemWidth: 6,
  		itemHeight: 6,
  		itemGap: 20,
  		x: obj.x ? obj.x : '130px',
  		y: obj.ry ? obj.ry : '35px',
  		itemGap: 12, //图例每项之间的间隔。
  		data: obj.data,
  		formatter: function (name) { // 自定义图标文字
  			var total = 0;
  			var target;
  			for (var i = 0, l = obj.data.length; i < l; i++) {
  				total += vdata[i].value;
  				if (obj.data[i].name == name) {
  					target = obj.data[i].value;
  				}
  			}
  			if(name.length>newlength){
  				name = name.substr(0,newlength) + '...';
  			};
  			var arr = [
  			        '{a1|'+name+'}'+
  			        '{a2|'+target+'人}'
  			    ];
  				if(obj.more){
  					arr = [
  					        '{a1|'+name+'}'+
  					        '{a2|'+target+'人}'+
  							'{a3|'+parseInt(Number(target)/Number(total) *100)+'%}'
  					 ];
  				}
  				return arr.join('\n');
  		},
  		textStyle: {
  			rich:{
  				'a1':{
  					color:obj.style?obj.style[0]?obj.style[0].color?obj.style[0].color:'#fff':'#fff':'#fff',
  					width:obj.style?obj.style[0]?obj.style[0].width?obj.style[0].width:180:180:180,
  					align:obj.style?obj.style[0]?obj.style[0].align?obj.style[0].align:'left':'left':'left'
  				},
  				'a2':{
  					color:obj.style?obj.style[1]?obj.style[1].color?obj.style[1].color:'#fff':'#fff':'#fff',
  					width:obj.style?obj.style[1]?obj.style[1].width?obj.style[1].width:80:80:80,
  					align:obj.style?obj.style[1]?obj.style[1].align?obj.style[1].align:'left':'left':'left'
  				},
  				'a3':{
  					color:obj.style?obj.style[2]?obj.style[2].color?obj.style[2].color:'#fff':'#fff':'#fff',
  					width:obj.style?obj.style[2]?obj.style[2].width?obj.style[2].width:80:80:80,
  					align:obj.style?obj.style[2]?obj.style[2].align?obj.style[2].align:'left':'left':'left'
  				}
  			}
  		}
  	}

  	if (obj.length) { datalst = false }
  	var myChart = echarts.init(obj.dataId);
  	var app = {};
  	var option = null;
  	op = obj.op ? obj.op : {};
  	option = {
  		color: obj.color,
  		title: {
  			zlevel: 0,
  			text: [
  				'{value|' + (op.titleValue || 0) + '}',
  				'{name|' + (op.titleText) + '}',
  			].join('\n'),
  			rich: {
  				value: {
  					color: '#fff',
  					fontSize: 13,
  					fontWeight: 'bold',
  					lineHeight: 22,
  				},
  				name: {
  					color: '#fff',
  					fontSize: 13,
  					lineHeight: 20
  				},
  			},
  			top: obj.ty ? obj.ty[1] ? obj.ty[1] : 'center' : 'center',
  			left: obj.ty ? obj.ty[0] ? obj.ty[0] : '65' : '65',
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
  						fontSize: 12,
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
  			radius: obj.op.widthPercent || ['60%', '70%'],
  			center: obj.pos ? obj.pos.length ? obj.pos : ['27%', '50%'] : ['27%', '50%'],
  			avoidLabelOverlap: false,
  			hoverOffset: 3,
  			label: {
  				normal: {
  					show: false,
  					position: 'center',
  					backgroundColor: 'rgba(7,24,40)',
  					// 自定义中间标题
  					formatter: function(val){
  						// console.log(parseInt(val.data.value/zongrenshu*100))
  						var name = val.data.name.length<=3?val.data.name:val.data.name.substr(0,3) + '...';
  						// console.log(val.data.value,zongrenshu,1)
  						if(val.data.value<0){
  							val.data.value = 0
  						}
  						var val = parseInt(val.data.value/zongrenshu*1000)/10 < 10 ? ' '+parseInt(val.data.value/zongrenshu*1000)/10 : parseInt(val.data.value/zongrenshu*1000)/10 ;
  						return [
  							'{value|'+ val +'% }',
  							'{name|'+name+'}'
  						].join('\n')
  					},
  					rich: {
  						value: {
  							color: '#fff',
  							fontSize: 18,
  							fontWeight: 'bold',
  							lineHeight: 22,
  						},
  						name: {
  							color: '#008ADB',
  							fontSize: 16,
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
  			data: obj.data,
  		}]
  	};
  	if (option && typeof option === "object") {
  		myChart.setOption(option, true);
  		myChart.on('legendselectchanged',function(res){
  			console.log(res)
  		})

  	}
  }
  Vue.prototype.showmsg = function (title, type) {
  	$('.showmsg').remove();
  	if (!title) {
  		title = '操作成功';
  	};
  	$('#app').append('<div class="showmsg">' + title + '</div>');
  	$('.showmsg').height('40').css('position', 'fixed').css('left', '50%').css('top', '-50px').css('transform', 'translateX(-50%)').css('-webkit-transform', 'translateX(-50%)');
  	$('.showmsg').css('z-index',100000).css('background', '#f0f9eb').css('color', '#2fa1fa').css('border', '1px solid #e1f3d8').css('line-height', '40px').css('padding', '0 50px').css('border-radius', '.05rem');
  	if (type) {
  		$('.showmsg').css('background', '#fef0f0').css('border', '1px solid #fde2e2').css('color', 'red');
  	};
  	$('.showmsg').animate({ 'top': '100px' }, 500);
  	setTimeout(function () {
  		$('.showmsg').animate({ 'top': '-50px', 'opacity': 0 }, 300);
  	}, 2500);
  };
  Vue.prototype.static = '../../static/';
  Vue.prototype.rootpath = 'http://localhost:3000';
  // 4. 添加实例方法
  Vue.prototype.apiaxio = function(method, url, params, success, failure) {//参数1
      if (!params) {
          params = {}
      };
      axio({
          method: method,
          url: url,
          data: method === 'POST' || method === 'post' || method === 'PUT' || method === 'put' ? params : null,
          params: method === 'GET' || method === 'get' || method === 'DELETE' || method === 'delete' ? params : null,
          baseURL: '/',
          withCredentials: false
      })
      .then(function (res) {
              success(res.data)
      })
      .catch(function (err) {
          let res = err.response
          if(failure){
            failure(err)
          }
          if (err) {
              window.console.log('api error, HTTP CODE: ' + res)
          }
      })
  }

}
export default MyPlugin;
