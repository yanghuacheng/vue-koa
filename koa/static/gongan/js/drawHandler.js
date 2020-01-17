

//超图类
class BaseGraphic {
  /**
   * 几何图形超类
   * @param {*} viewer{Cesium.Viewer} 
   * @param {*} options 
   * @param {*} name 
   */
  constructor(viewer) {
    this.viewer = viewer
    this.handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
    this.selectedHandler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
    this.polygonColor = 0 //区域标识颜色
    this.point_type = "../gongju/biaoshix.png" //默认
    this.line_type = 0 //线型
    this.fly = false // 是否漫游状态
    this.init()
  }
  //初始化，一些默认参数
  init() {
    console.log('初始化参数');
    //测量插件
    this.viewer.extend(Cesium.xbsjMeasurementMixin);
    this.polylineMeasurement = viewer.xbsjMeasurement.createPolylineMeasurement()
    //获取经纬度测试
    // this.pointMeasurement = viewer.xbsjMeasurement.createPointMeasurement();
    // //console.log(this.polylineMeasurement)
    // this.pointMeasurement.start(); 
   

  }
  //统一关闭
  destroy() {
    let self = this
    this.handler.destroy()
    $('.fllowPoint').hide()
    this.polylineMeasurement.clearResults();
    this.polylineMeasurement.end();
    if (devMap.containsKey("roming")) {
      let _arr = devMap.get("roming");
      _arr.forEach(function (item) {
        self.viewer.entities.remove(item);
      })
    }
    if (self.fly) {
      self.viewer.clock.shouldAnimate = false;
      self.fly = false
    }
    self.polylineMeasurement.end()
  }
  //测量
  measuring(type) {
    //     SPACE_AREA: 3
    // SPACE_DISTANCE: 1
    // TRIANGLE_DISTANCE
    let self = this
    //测距离
    if (type == 0) {
      console.log("类型", Cesium.XbsjPolylineInteractionMode)
      self.polylineMeasurement.setMode(Cesium.XbsjPolylineInteractionMode.TRIANGLE_DISTANCE); //传入类型
      self.polylineMeasurement.start()
    }
    //测面积
    if (type == 1) {
      // debugger
      self.polylineMeasurement.setMode(Cesium.XbsjPolylineInteractionMode.SPACE_AREA);
      self.polylineMeasurement.start();
    }
  }

  /**
   * 标点
   * @param {*}point_type 图标类型（图片）
   * @param {Function} callback 回调函数
   */
  drawPoint(callback) {

    // this.point_type = "../images/tools/point1.png" //默认用这个，可以随时修改

    var self = this;
    // Object.defineProperty(self.point_type,{
    //   set:function(){
    //     $('.fllowPoint').css("background-image",self.point_type)
    //   }
    // })
    self.handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas)
    //存储坐标
    let positions = []
    //显示跟着鼠标走的图标
    $('.fllowPoint').show()
    $('.fllowPoint').css("background-image", self.point_type)
    //鼠标移动
    self.handler.setInputAction(function (movement) {

      $('.fllowPoint').css('left', movement.endPosition.x - ($('.fllowPoint').width()) / 2 + 'px')
      $('.fllowPoint').css('top', movement.endPosition.y - $('.fllowPoint').height() - 1 + 'px')
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    let _point = null
    //左键点击，添加一个标注点
    self.handler.setInputAction(function (movement) {

      self.viewer.scene.globe.depthTestAgainstTerrain = true;
      if (self.viewer.scene.mode !== Cesium.SceneMode.MORPHING) {

        var cartesian = self.viewer.scene.pickPosition(movement.position);
        if (Cesium.defined(cartesian)) {
          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          var lng = Cesium.Math.toDegrees(cartographic.longitude);
          var lat = Cesium.Math.toDegrees(cartographic.latitude);
          var height = cartographic.height;//模型高度  
          _point = self.viewer.entities.add(new Cesium.Entity({
            name: "",
            description: '',
            deviceType: "points",
            position: Cesium.Cartesian3.fromDegrees(lng, lat, height),
            billboard: {
              image: $('.fllowPoint').css("background-image").replace('url("', '').replace('")', ''), //直接获取当前连接
              verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
              show: true,
              scale: 1.0,
            }
          }));

          //添加完后立刻显示输入界面
          //创建div
          let ohtml = document.createElement('div');
          ohtml.className = 'showText';

          let span = document.createElement("span");
          span.innerText = "请输入备注"
          span.setAttribute("ondblclick", "showElement(this);")
          ohtml.append(span);
          $(document.body).append(ohtml);
          $(ohtml).show();
          $(ohtml).css('left', movement.position.x + 'px')
          $(ohtml).css('top', movement.position.y + 'px')

          // let elemnt = $(ohtml).children('span');
          // console.log("拿到对象", span)
          showElement(span);

          postRender(lng, lat, height, ohtml)
          self.handler.destroy()
          $('.fllowPoint').hide()
          // console.log("标点数据格式：",_point)
          let _cb = {
            div: ohtml,
            point: _point,
            updata: { //返回的参数
              point_line_surface_type: 1,
              datas: [
                {
                  "icon_id": 6,
                  "note": "测试数据备注",
                  "point_line_surface_type": 1,
                  "sort": 0,
                  "x_pont": lng,
                  "y_pont": lat,
                  "z_pont": height

                }
              ]
            }
          }
          callback(_cb)

        }
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

    //右键点击，退出
    self.handler.setInputAction(function (movement) {
      self.handler.destroy()
      $('.fllowPoint').hide()

      // callback(_point)
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

  }

  /**
   * 画面
   * @param {*} callback 回调函数 
   */
  drawPolygon(callback) {
    let self = this;
    self.handler.destroy();
    let _polygon = null
    //可选 红、紫、青、蓝、绿、橙，默认红
    let colors = [
      Cesium.Color.fromCssColorString("#FF0000").withAlpha(0.2), //#FF0000
      Cesium.Color.fromCssColorString("#800080").withAlpha(0.2), //#800080
      Cesium.Color.fromCssColorString("#008080").withAlpha(0.2), // #008080
      Cesium.Color.fromCssColorString("#87CEEB").withAlpha(0.2), // #87CEEB
      Cesium.Color.fromCssColorString("#7CFC00").withAlpha(0.2), //#7CFC00
      Cesium.Color.fromCssColorString("#FF8C00").withAlpha(0.2), //#FF8C00
    ]

    var PolygonPrimitive = (function () {
      function _(positions) {
        // console.log("点位数据格式：",positions)
        this.options = {
          name: '多边形',
          polygon: {
            // height: 10,
            hierarchy: positions,
            // perPositionHeight: true,
            // clampToGround: true,
            // classificationType: Cesium.ClassificationType.BOTH,
            material: colors[self.polygonColor]
            // material: Cesium.Color.fromCssColorString('#67ADDF').withAlpha(0.1)

          }
        };
        this.hierarchy = positions;
        // console.log("6666",this.hierarchy)
        this._init();
      }

      _.prototype._init = function () {
        var _self = this;
        var _update = function () {
          return _self.hierarchy;
        };
        //实时更新polygon.hierarchy
        this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update, false);
        _polygon = self.viewer.entities.add(this.options);
      };
      return _;
    })();

    self.handler = new Cesium.ScreenSpaceEventHandler(self.viewer.scene.canvas);
    var positions = [];
    var poly = undefined;
    self.viewer.scene.globe.depthTestAgainstTerrain = true;
    //鼠标单击画点
    self.handler.setInputAction(function (movement) {
      var cartesian = self.viewer.scene.pickPosition(movement.position);
      // var cartesian = self.viewer.scene.camera.pickEllipsoid(movement.position, self.viewer.scene.globe.ellipsoid);
      if (positions.length == 0) {
        positions.push(cartesian.clone());
      }
      positions.push(cartesian);
      // console.log(positions);
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //鼠标移动
    self.handler.setInputAction(function (movement) {
      var cartesian = self.viewer.scene.pickPosition(movement.endPosition);
      // var cartesian = self.viewer.scene.camera.pickEllipsoid(movement.endPosition, self.viewer.scene.globe.ellipsoid);
      if (positions.length >= 2) {
        if (!Cesium.defined(poly)) {
          poly = new PolygonPrimitive(positions);
        } else {
          if (cartesian != undefined) {
            positions.pop();
            cartesian.y += (1 + Math.random());
            positions.push(cartesian);
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    //鼠标右键单击结束绘制
    self.handler.setInputAction(function (movement) {
      self.handler.destroy();

      //拿到中心点
      var centerpoint = Cesium.BoundingSphere.fromPoints(positions).center;
      let element = creatTipDiv();

      if (Cesium.defined(centerpoint)) {
        let _gp = c(centerpoint)

        showElement(element.span);
        postRender(_gp.lng, _gp.lat, _gp.height, element.div)
      }
      //构造上传到服务器的点位数据
      let updatas = []
      positions.forEach((item, idx) => {
        let _up = c(item)
        updatas.push({
          "color": "#FF0000",
          "note": "面的备注",
          "point_line_surface_type": 3,
          "alpha": 0.2,
          "sort": idx,
          "x_pont": _up.lng,
          "y_pont": _up.lat,
          "z_pont": _up.height
        })
      })
      function c(p) {
        var cartographic = Cesium.Cartographic.fromCartesian(p);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var height = cartographic.height;//模型高度
        return { lng: lng, lat: lat, height: height }
      }

      //回调
      callback(_polygon, {
        "point_line_surface_type": 3,
        datas: updatas
      })
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);


  }

  /**
   * 画线
   */
  drawLineString(type, color, callback) {

    let pts = [];
    var self = this;
    let _line = null
    let updatas = [] //收集上传到后端的点位数据
    let idx = 0
    self.handler.destroy()
    var PolyLinePrimitive = (function () {
      let _options = {}
      //实线
      if (type == '1') {
        _options = {
          polyline: {
            show: true,
            positions: [],
            clampToGround: true,
            material: color,
            width: 3
          }
        };
        //虚线
      } else if (type == "2") {
        _options = {
          polyline: {
            positions: [],
            width: 5,
            arcType: Cesium.ArcType.GEODESIC,
            clampToGround: true,
            // heightReference: Cesium.HeightReference.clampToGround,
            // material:new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED) //带箭头的实线
            material: new Cesium.PolylineDashMaterialProperty({
              color: color,
              gapColor: Cesium.Color.WHITE.withAlpha(0.0),
              dashLength: 30.0,
              dashPattern: 255.0,
            })
          }
        }
      }
      //箭头
      else if (type == "3") {
        _options = {
          polyline: {
            positions: [],
            width: 15,
            // arcType: Cesium.ArcType.NONE,
            clampToGround: true,
            material: new Cesium.ImageMaterialProperty({
              image:"../images/line_jt.png", //fangxiang
              transparent:false, 
              repeat:new Cesium.Cartesian2(24.0,1.0),
              color:color
            })
          }
        }
      }
      function _(positions) {
        this.options = _options;
        this.positions = positions;
        this._init();
      }

      _.prototype._init = function () {
        var _self = this;
        var _update = function () {
          return _self.positions;
        };
        //实时更新polyline.positions
        this.options.polyline.positions = new Cesium.CallbackProperty(_update, false);
        _line = self.viewer.entities.add(this.options);
      };
      return _;
    })();

    self.handler = new Cesium.ScreenSpaceEventHandler(self.viewer.scene.canvas);
    var positions = [];
    var poly = undefined;
    //鼠标左键单击画点
    self.handler.setInputAction(function (movement) {
      // var cartesian = self.viewer.scene.camera.pickEllipsoid(movement.position, self.viewer.scene.globe.ellipsoid);
      var cartesian = self.viewer.scene.pickPosition(movement.position);
      if (positions.length == 0) {
        positions.push(cartesian.clone());
      }
      positions.push(cartesian);
      //左键点击时添加标注点
      let pt = addTitlePoint(movement, self.viewer);
      pts.push(pt.pt)

      //收集线的点位数据
      updatas.push({
        "color": "#FF00FF", // 后期改动态
        "icon_id": 6,
        "line_type": 0,
        "alpha": 0.7,
        "note": "请输入备注",
        "point_line_surface_type": 2,
        "sort": idx,
        "x_pont": pt.point.lng,
        "y_pont": pt.point.lat,
        "z_pont": pt.point.height
      })
      idx += 1;

    }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    //鼠标移动
    self.handler.setInputAction(function (movement) {
      var cartesian = self.viewer.scene.pickPosition(movement.endPosition);
      // var cartesian = self.viewer.scene.camera.pickEllipsoid(movement.endPosition, self.viewer.scene.globe.ellipsoid);
      if (positions.length >= 2) {
        if (!Cesium.defined(poly)) {
          poly = new PolyLinePrimitive(positions);
        } else {
          if (cartesian != undefined) {
            positions.pop();
            cartesian.y += (1 + Math.random());
            positions.push(cartesian);
          }
        }
      }
    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    //单击鼠标右键结束画线
    self.handler.setInputAction(function (movement) {
      self.handler.destroy();
      let pt = addTitlePoint(movement, self.viewer)
      pts.push(pt.pt);
      updatas.push({
        "color": "#FF00FF", // 后期改动态
        "icon_id": 6,
        "line_type": 0,
        "alpha": 0.7,
        "note": "请输入备注",
        "point_line_surface_type": 2,
        "sort": idx,
        "x_pont": pt.point.lng,
        "y_pont": pt.point.lat,
        "z_pont": pt.point.height
      })
      idx += 1;
      // console.log("线的返回数据格式：",positions)

      callback(_line, pts, {
        "point_line_surface_type": 2,
        "datas": updatas
      });
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);


  }
  /**
   * 任意两点漫游
   * @param {*} callback 
   */
  pointsRoaming(callback) {

    let self = this
    let _points = []
    let start = null
    let pointArr = []
    self.destroy()



    let src = "./gongju/start.png";
    $('.fllowPoint').css("background-image", "url(" + src + ")")
    $('.fllowPoint').show()
    self.handler = new Cesium.ScreenSpaceEventHandler(self.viewer.scene.canvas);
    self.handler.setInputAction(function (movement) {
      self.viewer.scene.globe.depthTestAgainstTerrain = true;
      if (self.viewer.scene.mode !== Cesium.SceneMode.MORPHING) {

        var cartesian = self.viewer.scene.pickPosition(movement.position);
        if (Cesium.defined(cartesian)) {
          var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
          var lng = Cesium.Math.toDegrees(cartographic.longitude);
          var lat = Cesium.Math.toDegrees(cartographic.latitude);
          var height = cartographic.height;//模型高度 
        }
        _points.push({ longitude: lng, latitude: lat, height: height + 30 })
        //如果够两点，那就开始漫游
        if (_points.length >= 2) {
          src = "./gongju/end.png";
          // roming(_points, self.viewer)
          self.fly = true
          roming(_points, viewer)
        }

        start = self.viewer.entities.add(new Cesium.Entity({
          name: "漫游",
          description: '',
          deviceType: "Roaming",
          position: Cesium.Cartesian3.fromDegrees(lng, lat, height),
          billboard: {
            //图片地址可以随意更改
            image: src,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            show: true,
            scale: 1.0,
          }
        }));
        pointArr.push(start)
        $('.fllowPoint').css("background-image", "url('./gongju/end.png')")


      }
      if (_points.length >= 2) {
        self.handler.destroy()
        $('.fllowPoint').hide()
        devMap.put('roming', pointArr)
      }
    }, Cesium.ScreenSpaceEventType.LEFT_CLICK)
    self.handler.setInputAction(function (movement) {
      $('.fllowPoint').css('left', movement.endPosition.x - ($('.fllowPoint').width()) / 2 + 'px')
      $('.fllowPoint').css('top', movement.endPosition.y - $('.fllowPoint').height() - 1 + 'px')

    }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
    //右键取消
    self.handler.setInputAction(function (movement) {
      self.handler.destroy()
      _points = [];
      $('.fllowPoint').hide()
      self.viewer.entities.remove(start)
    }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
  }
  //回到原处
  homeWay(homeLng, homeLat, heading, pitch, roll) {
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(homeLng, homeLat, 130),
      orientation: {
        heading: heading,
        pitch: pitch,
        roll: roll
      }
    });
  }
  //顶视图
  topView() {
    this.viewer.camera.flyTo({
      destination: Cesium.Cartesian3.fromDegrees(113.969759, 22.537835, 1500),
      orientation: {
        heading: 0,
        pitch: Cesium.Math.toRadians(-90),
        roll: 0
      }
    });
  }
  /**
   * 改变光照亮度
   * @param {*} val 
   * @param {*} tileset 
   */
  changeLinghting(val, tileset) {

    let color = "vec4(" + val + "," + val + "," + val + ",1)";
    for (var i = 0; i < tileset.length; i++) {
      tileset[i].style = new Cesium.Cesium3DTileStyle({
        color: color,
      });
    }
  }

}


//创建双击输入框
function showElement(element) {

  var oldhtml = element.innerHTML;
  var newobj = document.createElement('input');
  newobj.type = 'text';
  newobj.value = oldhtml;
  //为新增元素添加光标离开事件
  newobj.onblur = function () {
    element.innerHTML = newobj.value == oldhtml ? oldhtml : newobj.value;
    element.setAttribute("ondblclick", "showElement(this);");
  }
  $(document).keydown(function (e) {
    if (e.keyCode == 13) {
      element.innerHTML = newobj.value == oldhtml ? oldhtml : newobj.value;
      element.setAttribute("ondblclick", "showElement(this);");
    }
  })
  //设置该标签的子节点为空
  element.innerHTML = '';
  //添加该标签的子节点，input对象
  element.appendChild(newobj);
  //设置选择文本的内容或设置光标位置（两个参数：start,end；start为开始位置，end为结束位置；如果开始位置和结束位置相同则就是光标位置）
  // newobj.setSelectionRange(0, oldhtml.length);
  //设置获得光标
  newobj.focus();

  //设置父节点的双击事件为空
  newobj.parentNode.setAttribute("ondblclick", "");

}
//在场景中创建标注点
function postRender(lng, lat, height, div) {
  var ellipsoid = viewer.scene.globe.ellipsoid;
  var cartographic = Cesium.Cartographic.fromDegrees(lng, lat, height);
  var cartesian3 = ellipsoid.cartographicToCartesian(cartographic);
  let obj = {
    position: cartesian3,
    // destination: destination,
    content: div
  }
  //改变弹窗的坐标
  function changePopup(c) {
    // console.log(div.style.width);
    div.style.left = c.x - $(div).width() / 2 + 'px';
    div.style.top = c.y - $(div).height() - $('.fllowPoint').height() - 15 + 'px';
  }
  let c = new Cesium.Cartesian2(obj.position.x, obj.position.y);
  changePopup(c);

  //这个removeHandler在关闭气泡弹窗后一定要删除，不然很耗内存
  let removeHandler = viewer.scene.postRender.addEventListener(function () {
    // console.log('监听生命监测');
    let changeC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, cartesian3);
    if (c && changeC && c.x && changeC.x && c.y && changeC.y) {
      if ((c.x != changeC.x) || (c.y != changeC.y)) {
        changePopup(changeC);
        c = changeC;
      }
    }
    // 如果标注点隐藏
    if (div.style.display === "none") {
      removeHandler.call();
    }
  })
}

//计算经纬度以及高度
function getPosition(movement, viewer) {
  var cartesian = viewer.scene.pickPosition(movement.position);
  if (Cesium.defined(cartesian)) {
    var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    var lng = Cesium.Math.toDegrees(cartographic.longitude);
    var lat = Cesium.Math.toDegrees(cartographic.latitude);
    var height = cartographic.height;//模型高度  
    return {
      lng: lng,
      lat: lat,
      height: height
    }
  }
  return false;
}

//创建提示div
function creatTipDiv() {
  let ohtml = document.createElement('div');
  ohtml.className = 'showText';

  let span = document.createElement("span");
  span.innerText = "请输入备注"
  span.setAttribute("ondblclick", "showElement(this);")
  ohtml.append(span);
  $(document.body).append(ohtml);
  $(ohtml).show();
  return {
    div: ohtml,
    span: span
  };

}

//标点
function addTitlePoint(movement, viewer) {
  let pt = null
  viewer.scene.globe.depthTestAgainstTerrain = true;
  if (self.viewer.scene.mode !== Cesium.SceneMode.MORPHING) {

    var cartesian = viewer.scene.pickPosition(movement.position);
    if (Cesium.defined(cartesian)) {
      var cartographic = Cesium.Cartographic.fromCartesian(cartesian);
      var lng = Cesium.Math.toDegrees(cartographic.longitude);
      var lat = Cesium.Math.toDegrees(cartographic.latitude);
      var height = cartographic.height;//模型高度  
      pt = viewer.entities.add(new Cesium.Entity({
        name: "",
        description: '',
        deviceType: "points",
        position: Cesium.Cartesian3.fromDegrees(lng, lat, height),
        billboard: {
          //图片地址可以随意更改
          image: $('.fllowPoint').css("background-image").replace('url("', '').replace('")', ''), //直接获取当前连接
          verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
          show: true,
          scale: 1.0,
        }
      }));

      //添加完后立刻显示输入界面
      //创建div
      let ohtml = document.createElement('div');
      ohtml.className = 'showText';

      let span = document.createElement("span");
      span.innerText = "请输入备注"
      span.setAttribute("ondblclick", "showElement(this);")
      ohtml.append(span);
      $(document.body).append(ohtml);
      $(ohtml).show();
      $(ohtml).css('left', movement.position.x + 20 + 'px')
      $(ohtml).css('top', movement.position.y - 38 + 'px')

      // let elemnt = $(ohtml).children('span');
      // console.log("拿到对象", span)
      showElement(span);

      postRender(lng, lat, height, ohtml)
      // self.handler.destroy()
      // $('.fllowPoint').hide()

    }
  }
  return { pt: pt, point: { lng: lng, lat: lat, height: height } }
}

/**
 * 两点间漫游
 * @param {*} poins 
 */

function roming(poins, viewer) {

  /** 相机视角飞行 开始 **/
  // var marks = [
  //     { lng: 114.112032, lat: 22.548268, height: 23.077, flytime: 20 },
  //     { lng: 114.112319, lat: 22.548545, height: 23.065, flytime: 20 },
  //     { lng: 114.112626, lat: 22.549013, height: 23.081, flytime: 20 },
  //     { lng: 114.112767, lat: 22.549318, height: 23.098, flytime: 20 },
  //     { lng: 114.112941, lat: 22.549613, height: 23.098, flytime: 20 },
  //     { lng: 114.113134, lat: 22.549852, height: 23.098, flytime: 20 },
  //     { lng: 114.113273, lat: 22.549995, height: 23.098, flytime: 20 }
  // ];// 地标集合 根据地标顺序来进行漫游
  var marks = [
    { lng: poins[0].longitude, lat: poins[0].latitude, height: poins[0].height, flytime: 10 },
    { lng: poins[1].longitude, lat: poins[1].latitude, height: poins[1].height, flytime: 50 }
  ];
  var marksIndex = 1;
  var pitchValue = -20;

  // viewer.scene.camera.flyTo({
  //     destination: Cesium.Cartesian3.fromDegrees(marks[0].lng,marks[0].lat, marks[0].height),  //定位坐标点，建议使用谷歌地球坐标位置无偏差
  //     duration:7   //定位的时间间隔
  // });

  // setTimeout(function(){
  //      flyExtent();
  // },7000);

  flyExtent(marks)
  function flyExtent(marks) {
    // 相机看点的角度，如果大于0那么则是从地底往上看，所以要为负值
    var pitch = Cesium.Math.toRadians(pitchValue);
    // 时间间隔2秒钟
    setExtentTime(marks[marksIndex].flytime);
    var Exection = function TimeExecution() {
      var preIndex = marksIndex - 1;
      if (marksIndex == 0) {
        preIndex = marks.length - 1;
      }
      var heading = bearing(marks[preIndex].lat, marks[preIndex].lng, marks[marksIndex].lat, marks[marksIndex].lng);
      heading = Cesium.Math.toRadians(heading);
      // 当前已经过去的时间，单位s
      var delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
      var originLat = marksIndex == 0 ? marks[marks.length - 1].lat : marks[marksIndex - 1].lat;
      var originLng = marksIndex == 0 ? marks[marks.length - 1].lng : marks[marksIndex - 1].lng;
      var endPosition = Cesium.Cartesian3.fromDegrees(
        (originLng + (marks[marksIndex].lng - originLng) / marks[marksIndex].flytime * delTime),
        (originLat + (marks[marksIndex].lat - originLat) / marks[marksIndex].flytime * delTime),
        marks[marksIndex].height
      );
      viewer.scene.camera.setView({
        destination: endPosition,
        orientation: {
          heading: heading,
          pitch: pitch,
        }
      });
      if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
        viewer.clock.onTick.removeEventListener(Exection);
        changeCameraHeading(marks);
      }
    };
    viewer.clock.onTick.addEventListener(Exection);
  }
  // 相机原地定点转向
  function changeCameraHeading(marks) {
    var nextIndex = marksIndex + 1;
    if (marksIndex == marks.length - 1) {
      nextIndex = 0;
    }
    // 计算两点之间的方向
    var heading = bearing(marks[marksIndex].lat, marks[marksIndex].lng, marks[nextIndex].lat, marks[nextIndex].lng);
    // 相机看点的角度，如果大于0那么则是从地底往上看，所以要为负值
    var pitch = Cesium.Math.toRadians(pitchValue);
    // 给定飞行一周所需时间，比如10s, 那么每秒转动度数
    var angle = (heading - Cesium.Math.toDegrees(viewer.camera.heading)) / 2;
    // 时间间隔2秒钟
    setExtentTime(2);
    // 相机的当前heading
    var initialHeading = viewer.camera.heading;
    var Exection = function TimeExecution() {
      // 当前已经过去的时间，单位s
      var delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
      var heading = Cesium.Math.toRadians(delTime * angle) + initialHeading;
      viewer.scene.camera.setView({
        orientation: {
          heading: heading,
          pitch: pitch,
        }
      });
      if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
        viewer.clock.onTick.removeEventListener(Exection);
        marksIndex = ++marksIndex >= marks.length ? 0 : marksIndex;
        flyExtent();
      }
    };
    //停止漫游
    viewer.clock.shouldAnimate = false;
    // viewer.clock.onTick.addEventListener(Exection);
  }
  // 设置飞行的时间到viewer的时钟里
  function setExtentTime(time) {
    var startTime = Cesium.JulianDate.fromDate(new Date());
    var stopTime = Cesium.JulianDate.addSeconds(startTime, time, new Cesium.JulianDate());
    viewer.clock.startTime = startTime.clone();  // 开始时间
    viewer.clock.stopTime = stopTime.clone();     // 结速时间
    viewer.clock.currentTime = startTime.clone(); // 当前时间
    viewer.clock.clockRange = Cesium.ClockRange.CLAMPED; // 行为方式
    viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK; // 时钟设置为当前系统时间; 忽略所有其他设置。

  }
  /** 相机视角飞行 结束 **/

  /** 飞行时 camera的方向调整(heading) 开始 **/
  // Converts from degrees to radians.
  function toRadians(degrees) {
    return degrees * Math.PI / 180;
  }

  // Converts from radians to degrees.
  function toDegrees(radians) {
    return radians * 180 / Math.PI;
  }

  function bearing(startLat, startLng, destLat, destLng) {
    startLat = toRadians(startLat);
    startLng = toRadians(startLng);
    destLat = toRadians(destLat);
    destLng = toRadians(destLng);

    let y = Math.sin(destLng - startLng) * Math.cos(destLat);
    let x = Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = Math.atan2(y, x);
    let brngDgr = toDegrees(brng);
    return (brngDgr + 360) % 360;
  }
  /** 飞行时 camera的方向调整(heading) 结束 **/
}

var basGraphic = new BaseGraphic(viewer);
window.basGraphic = basGraphic

