

/**
 * @author lijiang
 * time 2019-10-21 17:42:57
 * 面向对象的写法
 */

//初始化
/**
 * 
 * @param {*} container 容器
 * @param {*} data 数据
 */
function xakjGis(container, data) {

    //需要一个token
    var defaultAccessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZTYxNzdhMi0yM2FlLTQyZTEtOTJlZi04MzU4MmE2OWYzNGEiLCJpZCI6MTEyNzYsInNjb3BlcyI6WyJhc2wiLCJhc3IiLCJhc3ciLCJnYyJdLCJpYXQiOjE1NzA3NzkwNTh9.qJaFtnudc3aM__GWeIMbTew2VByAuJTEhmD-UKewWJs"
    if (data.defaultAccessToken && data.defaultAccessToken != '') {
        defaultAccessToken = data.defaultAccessToken;
    }
    Cesium.Ion.defaultAccessToken = defaultAccessToken;



    //初始化地图参数，如果没有则默认falsh
    var args = [
        "geocoder",
        "homeButton",
        "sceneModePicker",
        "baseLayerPicker",
        "navigationHelpButton",
        "timeline",
        "fullscreenButton",
        "vrButton",
        "animation",
        "infoBox",
        "selectionIndicator"];
    for (var i = 0; i < args.length; i++) {
        if (!data[args[i]]) {
            data[args[i]] = false;
        }
    }
    if (!data.globalImagery) {

        data["imageryProvider"] = new Cesium.SingleTileImageryProvider({ url: "./libs/Build/Cesium/Assets/Textures/GlobalBkLayer.jpg" });

        // var tms = Cesium.createTileMapServiceImageryProvider({
        //     url : '/tms',
        //     fileExtension: 'jpg'
        //  });
        // viewer.scene.imageryLayers.addImageryProvider(tms);

    }
    data["clampToGround"] = true;
    data["shouldAnimate"] = true;

    //创建viewer
    this.viewer = new Cesium.Viewer(container, data); //cesium初始化的时候 data中的参数不存在 也没事。
    var viewer = this.viewer;






    // this.viewer = new Cesium.Viewer(container,{
    //     "geocoder":false,
    //     "homeButton":false,
    //     "sceneModePicker":false,
    //     "baseLayerPicker":false,
    //     "navigationHelpButton":false,
    //     "animation":false,
    //     "timeline":false,
    //     "fullscreenButton":false,
    //     "vrButton":false,
    //     "infoBox":false,
    //     "shouldAnimate":true,
    //     "selectionIndicator":false,
    //     //  "clampToGround": true,
    //     imageryProvider: new Cesium.createTileMapServiceImageryProvider({
    //               url: "/tms",
    //               fileExtension:'jpg'
    //     }), baseLayerPicker: false
    //   });
    //   var viewer = this.viewer;



    //取消logo
    viewer._cesiumWidget._creditContainer.style.display = 'none';
    viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
    viewer.scene.globe.depthTestAgainstTerrain = true;//打开深度检测
    viewer.scene.globe.enableLighting = false;//开启全照明

    //限制相机进入地下
    viewer.clock.onTick.addEventListener(function () {
        if (viewer.camera.pitch > 0) {
            viewer.scene.screenSpaceCameraController.enableTilt = false;
        }
    });
    var mousePosition, startMousePosition;
    var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);
    handler.setInputAction(function (movement) {
        mousePosition = startMousePosition = Cesium.Cartesian3.clone(movement.position);
        handler.setInputAction(function (movement) {
            mousePosition = movement.endPosition;
            var y = mousePosition.y - startMousePosition.y;
            if (y > 100) {
                viewer.scene.screenSpaceCameraController.enableTilt = true;
            }
        }, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
    }, Cesium.ScreenSpaceEventType.MIDDLE_DOWN);



    var img, label;
    //取消双击选中事件。(这个作用不大)
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
    //是否添加全球光照，scene(场景)中的光照将会随着每天时间的变化而变化
    if (data.globeLight && data.globeLight == true) {
        viewer.scene.globe.enableLighting = true;
    }
    //是否关闭大气效果
    if (data.showGroundAtmosphere && data.showGroundAtmosphere == true) {
        viewer.scene.globe.showGroundAtmosphere = true;
    } else {
        viewer.scene.globe.showGroundAtmosphere = false;
    }
    //地图开发者密钥
    if (!data.defaultKey || data.defaultKey == '') {
        data.defaultKey = '19b72f6cde5c8b49cf21ea2bb4c5b21e';
    }
    //天地图影像
    if (data.globalImagery && data.globalImagery == "天地图") {
        viewer.imageryLayers.remove(viewer.imageryLayers.get(0));//可以先清除默认的第一个影像 bing地图影像。 当然不作处理也行
        var url = "http://t0.tianditu.com/img_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=img&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default&format=tiles" + "&tk=" + data.defaultKey;
        img = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
            url: url,
            layer: "tdtBasicLayer",
            style: "default",
            format: "image/jpeg",
            maximumLevel: 18, //天地图的最大缩放级别
            tileMatrixSetID: "GoogleMapsCompatible",
            show: false
        }));
    }
    //谷歌影像
    else if (data.globalImagery && data.globalImagery == "谷歌") {
        viewer.imageryLayers.remove(viewer.imageryLayers.get(0));//可以先清除默认的第一个影像 bing地图影像。 当然不作处理也行
        img = viewer.imageryLayers.addImageryProvider(
            new Cesium.UrlTemplateImageryProvider({
                url: "http://mt1.google.cn/vt/lyrs=s&hl=zh-CN&x={x}&y={y}&z={z}&s=Gali"
                , baseLayerPicker: false
            })
        );
    }
    //arcGis影像
    else if (data.globalImagery && data.globalImagery == "arcGis") {
        viewer.imageryLayers.remove(viewer.imageryLayers.get(0));//可以先清除默认的第一个影像 bing地图影像。 当然不作处理也行
        img = viewer.imageryLayers.addImageryProvider(
            new Cesium.ArcGisMapServerImageryProvider({
                url: 'https://services.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer'
                , baseLayerPicker: false
            })
        );
    }
    //高德影像
    else if (data.globalImagery && data.globalImagery == "高德") {
        viewer.imageryLayers.remove(viewer.imageryLayers.get(0));//可以先清除默认的第一个影像 bing地图影像。 当然不作处理也行
        img = viewer.imageryLayers.addImageryProvider(
            new Cesium.UrlTemplateImageryProvider({
                maximumLevel: 18,//最大缩放级别
                url: 'https://webst02.is.autonavi.com/appmaptile?style=6&x={x}&y={y}&z={z}',
                style: "default",
                format: "image/png",
                tileMatrixSetID: "GoogleMapsCompatible"

            })
        );
    }
    //百度影像
    else if (data.globalImagery && data.globalImagery == "百度") {
        viewer.imageryLayers.remove(viewer.imageryLayers.get(0));//可以先清除默认的第一个影像 bing地图影像。 当然不作处理也行
        img = viewer.imageryLayers.addImageryProvider(
            new Cesium.UrlTemplateImageryProvider({
                maximumLevel: 18,//最大缩放级别
                url: "https://ss1.bdstatic.com/8bo_dTSlR1gBo1vgoIiO_jowehsv/tile/?qt=vtile&x={x}&y={y}&z={z}&styles=pl&udt=20180810&scaler=1&showtext=1",
            })
        );
    }
    //天地图标注
    if (data.globalLabel && data.globalLabel == "天地图") {
        var url = "http://t0.tianditu.com/cia_w/wmts?service=wmts&request=GetTile&version=1.0.0&LAYER=cia&tileMatrixSet=w&TileMatrix={TileMatrix}&TileRow={TileRow}&TileCol={TileCol}&style=default.jpg" + "&tk=" + data.defaultKey;
        label = viewer.imageryLayers.addImageryProvider(new Cesium.WebMapTileServiceImageryProvider({
            url: url,
            layer: "tdtAnnoLayer",
            style: "default",
            maximumLevel: 18,//天地图的最大缩放级别
            format: "image/jpeg",
            tileMatrixSetID: "GoogleMapsCompatible",
            show: false
        }));
    }
    //高德标注
    else if (data.globalLabel && data.globalLabel == "高德") {
        label = viewer.imageryLayers.addImageryProvider(
            new Cesium.UrlTemplateImageryProvider({
                maximumLevel: 18,//最大缩放级别
                url: 'https://wprd02.is.autonavi.com/appmaptile?x={x}&y={y}&z={z}&lang=zh_cn&size=1&scl=2&style=8&ltype=11',
                style: "default",
                format: "image/png",
                tileMatrixSetID: "GoogleMapsCompatible"
            })
        );
    }
    else if (data.globalLabel && data.globalLabel == "tms") {

        // var tms = Cesium.createTileMapServiceImageryProvider({
        //     url : '/tms',
        //     fileExtension: 'jpg'
        //  });
        // viewer.scene.imageryLayers.addImageryProvider(tms);
    }
    //影像亮度
    if (data.globalImageryBrightness != undefined) {
        img.brightness = data.globalImageryBrightness;
    }
    if (data.globalLabelBrightness != undefined) {
        label.brightness = data.globalLabelBrightness
    }

    // return viewer;
    
    this.stopFly = false;
    this.xuxianArr = [];//存放虚线的
    this.liudongLine = [];//存放流动线数据
    this.maiChongArr = []; //脉冲
}


//CZML技术实现的即时路径飞行
//最初必须传入一个坐标点,数据更新的时间间隔 / S
xakjGis.prototype.realFlyByCZML = function (viewer, position, interval) {
    var len = 400;
    var bottomRadius = 70;
    // var viewer = this.viewer;
    this.flyAction = false;
    var self = this;
    //进来前先移除
    viewer.dataSources.removeAll();
    // console.log("-------++++++-----",viewer.dataSources);
    // var modelCartesianPoint = Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude, position.height);
    this.points1 = [
        0.0, position.longitude, position.latitude, position.height - len / 2 + 1,
    ]
    this.points2 = [
        0.0, position.longitude, position.latitude, position.height,
    ]
    //创建两个czml数据
    var cylinderCzml = [{
        "id": "document",
        "name": "polygon",
        "version": "1.0",
        "clock": {
            "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
            "currentTime": "2012-08-04T16:00:00Z",
            "multiplier": 10
        }
    }, {
        "id": "cylinderCzml",
        "name": "可视区域",
        "availability": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
        "cylinder": {
            "id": "cylinder",
            "length": len,
            "topRadius": 0.5,
            "bottomRadius": bottomRadius,
            "outline": false,
            "material": {
                "stripe": {
                    "orientation": "VERTICAL",
                    "evenColor": {
                        "rgba": [10, 211, 250, 0]
                    },
                    "oddColor": {
                        "rgba": [10, 211, 250, 30.95]
                    },
                    "offset": {
                        "number": 1
                    },
                    "repeat": 0.1
                }
            },
        },
        "position": {
            "interpolationAlgorithm": "LAGRANGE",
            "interpolationDegree": 1,
            "epoch": "2012-08-04T16:00:00Z",
            "cartographicDegrees": self.points1
        }
    }];
    var modelCzml = [{
        "id": "document",
        "name": "polygon",
        "version": "1.0",
        "clock": {
            "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
            "currentTime": "2012-08-04T16:00:00Z",
            "multiplier": 10
        }
    }, {
        "id": "modelCzml",
        "name": "飞机模型",
        "availability": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
        "model": {
            "id": "fffff",
            "gltf": "./libs/Build/Cesium1/CesiumAir/Cesium_Air.glb",
            "scale": 0.5,
            // "modelMatrix":"" //模型变换矩阵
        },
        "path": {
            "material": {
                "solidColor": {
                    "color": {
                        "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                        "rgba": [255, 255, 255, 128]
                    }
                }
            },
            "width": [{
                "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                "number": 3.0
            }],
            "show": [{
                "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                "boolean": false
            }]
        },
        "orientation": {
            "velocityReference": "#position"
        },
        "position": {
            "interpolationAlgorithm": "HERMITE",//插值算法为LAGRANGE，HERMITE,GEODESIC 三种
            "interpolationDegree": 1,
            "epoch": "2012-08-04T16:00:00Z",
            "cartographicDegrees": self.points2
        }
    }];
    var a = 60;
    this.updatePoint = function (p) {
        if (!self.stopFly) {
            a += 10;
            self.points1.push(a, p.longitude, p.latitude, p.height - len / 2);
            cylinderCzml[1].position.cartographicDegrees = self.points1;
            cylinderCzml[0].clock.currentTime = viewer.clock.currentTime.toString();

            //转换卡特坐标
            // var modelCarter = Cesium.Cartesian3.fromDegrees(p.longitude,p.latitude,p.height);
            self.points2.push(a, p.longitude, p.latitude, p.height);
            modelCzml[1].position.cartographicDegrees = self.points2;
            modelCzml[0].clock.currentTime = viewer.clock.currentTime.toString();


            viewer.entities.remove(viewer.dataSources);
            // viewer.dataSources.removeAll();
            viewer.dataSources.add(Cesium.CzmlDataSource.load(cylinderCzml));
            viewer.dataSources.add(Cesium.CzmlDataSource.load(modelCzml)).then(function (ds) {
                // viewer.trackedEntity = null;
                // viewer.trackedEntity = ds.entities.getById("modelCzml");
                // var center = Cesium.Cartesian3.fromDegrees(p.longitude, p.latitude);
                // var heading = Cesium.Math.toRadians(0.0);
                // var pitch = Cesium.Math.toRadians(-90.0);
                // var range = 5000.0;
                // viewer.camera.lookAt(center, new Cesium.HeadingPitchRange(heading, pitch, range));
                // viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0, p.height + 200));
            });
        }

    };

    //第一次加载
    viewer.dataSources.add(Cesium.CzmlDataSource.load(cylinderCzml)).then(function (dataSource) {
        viewer.clock.shouldAnimate = true;
    });
    viewer.dataSources.add(Cesium.CzmlDataSource.load(modelCzml)).then(function (dataSource) {
        // viewer.trackedEntity = dataSource.entities.getById('modelCzml');
        // viewer.zoomTo(model);
        viewer.clock.shouldAnimate = true;
        // var center = Cesium.Cartesian3.fromDegrees(position.longitude, position.latitude);
        // viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0, position.height + 200));
    });
    viewer.clock.onTick.addEventListener(function (e) {

        if (viewer.dataSources) {
            var s = viewer.dataSources._dataSources[viewer.dataSources.length - 1];
            var sp = s.entities.getById('modelCzml').position._property._interpolationResult;
            //   console.log(sp[0]);
            if (sp[0] && self.flyAction) {

                //锁定视觉的两种方法
                //方法1：看起来流畅，但是飞机飞的过程中视角锁定，鼠标无法操作
                var pf = changePf(sp[0], sp[1], sp[2]);
                // var center = Cesium.Cartesian3.fromDegrees(pf[0],pf[1]);
                // viewer.camera.lookAt(center, new Cesium.Cartesian3(0.0, 0.0,pf[2] + 200));

                //锁定视角的方法二
                //方法2：看起来相对不流畅，但是过程中鼠标可以操作视角
                viewer.flyTo(s.entities.getById('modelCzml'), {
                    duration: 0,
                    offset: new Cesium.HeadingPitchRange(0.0, Cesium.Math.toRadians(-90.0), pf[2] + 100)
                })
            }

        }
    });


    function changePf(x, y, z) {
        var ellipsoid = viewer.scene.globe.ellipsoid;
        var cartesia3 = new Cesium.Cartesian3(x, y, z);
        var cartographic = ellipsoid.cartesianToCartographic(cartesia3);
        var lat = Cesium.Math.toDegrees(cartographic.latitude);
        var lng = Cesium.Math.toDegrees(cartographic.longitude);
        var alt = cartographic.height;
        return [lng, lat, alt];
    }


    return viewer;

}

xakjGis.prototype.track = function (viewerff, positions) {
    var viewer = this.viewer;
    //创建两个czml数据
    var zuizhong = [{
        "id": "document",
        "name": "polygon",
        "version": "1.0",
        "clock": {
            "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
            "currentTime": "2012-08-04T16:00:00Z",
            "multiplier": 10
        }
    }, {
        "id": "zuizhong",
        "name": "",
        "availability": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
        "path": {
            "material": {
                "solidColor": {
                    "color": {
                        "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                        "rgba": [255, 170, 51, 128]
                    }
                }
            },
            "width": [{
                "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                "number": 3.0
            }],
            "show": [{
                "interval": "2012-08-04T16:00:00Z/2012-08-04T18:00:00Z",
                "boolean": true
            }]
        },
        "label": {
            "text": '',
            "font": '24px Helvetica',
            "fillColor": Cesium.Color.BLACK,
            "outlineColor": Cesium.Color.BLACK,
            "outlineWidth": 2,
            "style": Cesium.LabelStyle.FILL_AND_OUTLINE
        },
        "position": {
            "interpolationAlgorithm": "LAGRANGE",
            "interpolationDegree": 1,
            "epoch": "2012-08-04T16:00:00Z",
            "cartographicDegrees": [
                0.0, 113.97037617, 22.53906826, 40.9,
                60.0, 113.97027843, 22.53895994, 40.9,
                70.0, 113.97019461, 22.5390389, 40.9,
                80.0, 113.97019461, 22.53877536, 40.9,
                90.0, 113.9677355, 22.54068787, 40.9,
                100.0, 113.96803091, 22.53877536, 40.9,
                110.0, 113.96977298, 22.53838252, 40.9,
                120.0, 113.97020404, 22.54038274, 40.9,
                130.0, 113.97064145, 22.53868913, 40.9,

            ]
        }
    }];
    viewer.dataSources.add(Cesium.CzmlDataSource.load(zuizhong)).then(function (dataSource) {
        // viewer.trackedEntity = dataSource.entities.getById('zuizhong');
        viewer.zoomTo(dataSource.entities.getById('zuizhong'));
    })


}


xakjGis.prototype.createPOIForShp = function (x, y, z, makiIconId, deviceType, code, status) {
    // 设置图标大小（0-1)
    var imgScale = 1;
    // if (deviceType != 1) {
    //     imgScale = 0.7;
    // }
    var labels = "";
    labels = viewer.entities.add(new Cesium.Entity({

        code_id: code,
        status: status,
        description: '正常',

        deviceType: deviceType,
        position: Cesium.Cartesian3.fromDegrees(x, y, z),
        point: {
            pixelSize: 1.0,
            color: Cesium.Color.YELLOW,
            outlineColor: Cesium.Color.YELLOW,
            outlineWidth: 1.0,
            heightReference: Cesium.HeightReference.clampToGround, //贴地
        },
        label: {
            // text:"6",
            style: Cesium.LabelStyle.FILL_AND_OUTLINE,
            font: '24px 楷体',
            fillColor: Cesium.Color.WHITE,
            outlineColor: Cesium.Color.WHITE,
            outlineWidth: 6,
            scale: 0.5,
            disableDepthTestDistance: 1000000000,
            verticalOrigin: Cesium.VerticalOrigin.CENTER, //垂直方向 CENTER BOTTOM
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,//水平方向
            pixelOffset: new Cesium.Cartesian2(0, 10),
            eyeOffset: new Cesium.Cartesian3(0, 10, 0)

        },
        billboard: {
            image: makiIconId,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
            show: true,
            scale: imgScale,
            verticalOrigin: Cesium.VerticalOrigin.BOTTOM, //垂直方向 CENTER BOTTOM
            horizontalOrigin: Cesium.HorizontalOrigin.LEFT,//水平方向
            pixelOffset: new Cesium.Cartesian2(-64, 0),

        },

    }));
    return labels;

}

// 113.9701973995406,22.538732310643795,10.0,
// 113.97032311854063,22.53868995179056,10.0,
// 113.97038596985342,22.538818763654366,10.0,
// 113.97024728025244,22.538861159904375,10.0,
// 113.9701973995406,22.538732310643795,10.0,
// 113.9703051552137,22.538760999342028,40.0,



//四棱锥画法
xakjGis.prototype.test = function () {
    var mPointArr = [
        Cesium.Cartesian3.fromDegrees(113.9703051552137, 22.538760999342028, 40.0), //顶点
        Cesium.Cartesian3.fromDegrees(113.9701973995406, 22.538732310643795, 10.0),
        Cesium.Cartesian3.fromDegrees(113.97032311854063, 22.53868995179056, 10.0),
        Cesium.Cartesian3.fromDegrees(113.97038596985342, 22.538818763654366, 10.0),
        Cesium.Cartesian3.fromDegrees(113.97024728025244, 22.538861159904375, 10.0)
    ]
    //索引
    var marr = [
        [0, 1, 2, 0],
        [0, 2, 3, 0],
        [0, 3, 4, 0],
        [0, 4, 1, 0],
        // [1,2,3,4,1],
    ]
    marr.forEach(function (item, index) {
        // console.log(item[0]);

        var enty = viewer.entities.add({
            name: 'm' + index,
            polygon: {
                hierarchy: [
                    mPointArr[item[0]],
                    mPointArr[item[1]],
                    mPointArr[item[2]],
                    mPointArr[item[3]],
                ],
                perPositionHeight: true,
                material: getColorRamp()
            }

        })
    })

}
function getColorRamp() {

    var r = Math.random() * 255;
    var g = Math.random() * 255;
    var b = Math.random() * 255;

    return new Cesium.Color(r, g, b, 0.8);
}


//根据顶点，确定四棱锥底面4点
/**
 * 
 * @param {*} position 棱锥顶点位置
 * @param {*} horizontal 横向范围（可视范围）
 * @param {*} vertical 纵向范围
 */
function getPyramidVertex(position, horizontal, vertical) {

}


/**
 * 圆形波圈 脉冲
 * 
 */
xakjGis.prototype.addCircleRipple = function (data) {
    var r1 = data.minR, r2 = data.minR;
    let self = this;

    function changeR1() { //这是callback，参数不能内传
        r1 = r1 + data.deviationR;
        if (r1 >= data.maxR) {
            r1 = data.minR;
        }

        return r1;
    }
    function changeR2() {
        r2 = r2 + data.deviationR;
        if (r2 >= data.maxR) {
            r2 = data.minR;
        }
        return r2;
    }
   let mc =  viewer.entities.add({
        id: data.id,
        name: data.name,
        position: Cesium.Cartesian3.fromDegrees(data.lon, data.lat, data.height),
        ellipse: {
            semiMinorAxis: new Cesium.CallbackProperty(changeR1, false),
            semiMajorAxis: new Cesium.CallbackProperty(changeR1, false),
            height: data.height,
            material: new Cesium.ImageMaterialProperty({
                image: data.imageUrl,
                repeat: new Cesium.Cartesian2(1.0, 1.0),
                transparent: true,
                color: new Cesium.CallbackProperty(function () {
                    var alp = 1 - r1 / data.maxR;
                    return Cesium.Color.WHITE.withAlpha(alp)  //entity的颜色透明 并不影响材质，并且 entity也会透明哦
                }, false)
            })
        }
    });
    self.maiChongArr.push(mc);
    setTimeout(function () {
       let mc = viewer.entities.add({
            name: data.name,
            position: Cesium.Cartesian3.fromDegrees(data.lon, data.lat, data.height),
            ellipse: {
                semiMinorAxis: new Cesium.CallbackProperty(changeR2, false),
                semiMajorAxis: new Cesium.CallbackProperty(changeR2, false),
                height: data.height,
                material: new Cesium.ImageMaterialProperty({
                    image: data.imageUrl,
                    repeat: new Cesium.Cartesian2(1.0, 1.0),
                    transparent: true,
                    color: new Cesium.CallbackProperty(function () {
                        var alp = 1;
                        alp = 1 - r2 / data.maxR;
                        return Cesium.Color.WHITE.withAlpha(alp)
                    }, false)
                })
            }
        });
        self.maiChongArr.push(mc);

    }, data.eachInterval)
}

//添加自定义标注点
/**
 * 传入事件
 * 传入div（就是标注点）
 * 偏移量
 */
xakjGis.prototype.customLabelPoints = function (lng, lat, height, divClassName, data) {

    console.log("自定义标注");
    let destination = Cesium.Cartesian3.fromDegrees(lng, lat, height);
    let div = document.createElement('div');
    let span = document.createElement('span');
    span.innerText = data.count;
    div.className = divClassName;
    div.value = {
        position: {
            lng: lng,
            lat: lat,
            height: height
        },
        address: data.address,
        count: data.count
    };
    div.position =
        div.appendChild(span);
    document.getElementById('main').appendChild(div);
    var ellipsoid = viewer.scene.globe.ellipsoid;
    var cartographic = Cesium.Cartographic.fromDegrees(lng, lat, height);
    var cartesian3 = ellipsoid.cartographicToCartesian(cartographic);
    let obj = {
        position: cartesian3,
        destination: destination,
        content: div
    }
    //改变弹窗的坐标
    function changePopup(c) {

        div.style.left = c.x - 27 + 'px';
        div.style.top = c.y - 37 + 'px';
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

//点击弹出自定义标注点

/**
 * @param {*} cartesian3 一个Cesium.Cartographic.fromDegrees 对象
 * @param {*} divClassName div的类名
 */
xakjGis.prototype.customPopLabel = function (lng, lat, height, divClassName) {
    let destination = Cesium.Cartesian3.fromDegrees(lng, lat, height);
    //先创建弹窗
    let div = document.createElement('div');
    div.className = divClassName;
    div.style.display = 'none';
    let _p = document.createElement('p');
    div.appendChild(_p);
    document.getElementById('main').appendChild(div);
    //转换需要的坐标格式，备用
    var ellipsoid = viewer.scene.globe.ellipsoid;
    let cartographic = Cesium.Cartographic.fromDegrees(lng, lat, height);
    let cartesian3 = ellipsoid.cartographicToCartesian(cartographic);
    let obj = {
        position: cartesian3,
        destination: destination,
        content: div
    }
    //改变弹窗的坐标
    function changePopup(c) {
        //需要向上偏移
        div.style.left = c.x - 124 + 'px';
        div.style.top = c.y - (70 + 50) + 'px';
    }
    let c = new Cesium.Cartesian2(obj.position.x, obj.position.y);
    changePopup(c);
    //显示div
    this.customLabelShow = function (lng, lat, height, data) {
        div.style.display = 'block';
        _p.innerText = data;
        let _cartographic = Cesium.Cartographic.fromDegrees(lng, lat, height);
        let _cartesian3 = ellipsoid.cartographicToCartesian(_cartographic);
        if (removeHandler) {
            removeHandler.call();
        }
        var removeHandler = viewer.scene.postRender.addEventListener(function () {
            // debugger
            // console.log('监听生命监测');
            let changeC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, _cartesian3);
            if (c && changeC && c.x && changeC.x && c.y && changeC.y) {
                if ((c.x != changeC.x) || (c.y != changeC.y)) {
                    changePopup(changeC);
                    c = changeC;
                }
            }
            //如果弹出窗被关闭，则移除监听
            if (div.style.display === "none") {
                removeHandler.call();
            }
        })
    }
    //隐藏div
    this.customLabelHide = function () {
        div.style.display = "none"
    }
    return true;

}

/**
 * 热力图视频
 */
xakjGis.prototype.thermalMapVideo = function (lng, lat, height, divId) {
    //初始化
    let destination = Cesium.Cartesian3.fromDegrees(lng, lat, height);
    //先创建弹窗
    let div = document.getElementById(divId);

    div.style.display = 'none';
    //转换需要的坐标格式，备用
    var ellipsoid = viewer.scene.globe.ellipsoid;
    let cartographic = Cesium.Cartographic.fromDegrees(lng, lat, height);
    let cartesian3 = ellipsoid.cartographicToCartesian(cartographic);
    let obj = {
        position: cartesian3,
        destination: destination,
        content: div
    }
    //改变弹窗的坐标
    function changePopup(c) {
        //需要向上偏移
        div.style.left = c.x - 124 + 'px';
        div.style.top = c.y - (70 + 50) + 'px';
    }
    let c = new Cesium.Cartesian2(obj.position.x, obj.position.y);
    changePopup(c);
    //显示div
    this.thermalMapVideoShow = function (lng, lat, height) {
        div.style.display = 'block';
        // _p.innerText = data;
        let _cartographic = Cesium.Cartographic.fromDegrees(lng, lat, height);
        let _cartesian3 = ellipsoid.cartographicToCartesian(_cartographic);
        if (removeHandler) {
            removeHandler.call();
        }
        var removeHandler = viewer.scene.postRender.addEventListener(function () {
            // debugger
            // console.log('监听生命监测');
            let changeC = Cesium.SceneTransforms.wgs84ToWindowCoordinates(viewer.scene, _cartesian3);
            if (c && changeC && c.x && changeC.x && c.y && changeC.y) {
                if ((c.x != changeC.x) || (c.y != changeC.y)) {
                    changePopup(changeC);
                    c = changeC;
                }
            }
            //如果弹出窗被关闭，则移除监听
            if (div.style.display === "none") {
                removeHandler.call();
            }
        })
    }
    //隐藏div
    this.thermalMapVideoHide = function () {
        div.style.display = "none"
    }
    return true;

}

// 画虚线
//传入一组点位（没有进行插值的画法）
xakjGis.prototype.addXuxian = function (pointArr) {
    // console.log("mmmmm",pointArr);
    // [113.96977298, 22.53838252, 10.6, 113.97020404, 22.54038274, 10.6] polyline 
    let line = viewer.entities.add({
        polyline: {
            positions: Cesium.Cartesian3.fromDegreesArrayHeights([113.96977298, 22.53838252, 10.6, 113.97020404, 22.54038274, 10.6]),
            width: 5,
            arcType: Cesium.ArcType.GEODESIC,
            // heightReference: Cesium.HeightReference.clampToGround,
            // material:new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED) //带箭头的实线
            material: new Cesium.PolylineDashMaterialProperty({
                color: new Cesium.Color(255.0 / 255.0, 127.0 / 255.0, 0.0, 1.0),
                gapColor: Cesium.Color.WHITE.withAlpha(0.0),
                dashLength: 30.0,
                dashPattern: 255.0,
            })
        }
    })
    this.xuxianArr.push(line);
}

/**
 * 计算高程 可单独也可批量 
 * @param {*} datas longtitude 经度 latitude 纬度 data存储对象{latitude:113.222,latitude:22.33322}
 * @param {*} req 异步回调，返回一个三维坐标数组
 */
function calculateElevation(datas, req) {

    var terrain = Cesium.createWorldTerrain();//地形
    var positions = [];
    datas.forEach(function (item) {
        positions.push(Cesium.Cartographic.fromDegrees(item.longitude, item.latitude));
    })
    var promise = Cesium.sampleTerrainMostDetailed(terrain, positions);
    Cesium.when(promise, function (updatedPositions) {
        //  console.log("计算得到的",updatedPositions);
        //数据格式如下
        // {longitude: 1.9891583139029845, latitude: 0.39338095146874935, height: 7.799686289676892}
        // {longitude: 1.9891566080181735, latitude: 0.3933790609281036, height: 7.700426821708238}
        // {longitude: 1.9891551450831946, latitude: 0.39338043904008096, height: 6.47250618376394}
        req(updatedPositions)
    });
}

/**
 * 计算距离,返回最近的高空视频点信息
 * @param {*} point1 包括经纬度高度的点  示例：{
        longitude:113.96977298314195,
        latitude:22.538382523802976,
        height:40,}
 * @param {*} point2 包括经纬度高度的点
 */
function distance(point1) {
    //目前就三个高空点
    let _heightPs = [
        {
            longitude: 113.96977298314195,
            latitude: 22.538382523802976,
            height: 40,
            GBCode: "44030552001320002321",
        },
        {
            longitude: 113.970204038803,
            latitude: 22.5403827377687,
            height: 40,
            GBCode: "44030552001320002221",
        },
        {
            longitude: 113.9706414539,
            latitude: 22.5386891287,
            height: 40,
            GBCode: "44030552701320002166",
        }
    ];
    let _h = null;
    let _indx = 0;
    _heightPs.forEach(function (item, indx) {
        var point1cartographic = Cesium.Cartographic.fromDegrees(point1.longitude, point1.latitude, 40);
        var point2cartographic = Cesium.Cartographic.fromDegrees(item.longitude, item.latitude, item.height);
        /**根据经纬度计算出距离**/
        var geodesic = new Cesium.EllipsoidGeodesic();
        geodesic.setEndPoints(point1cartographic, point2cartographic);
        var s = geodesic.surfaceDistance;
        //console.log(Math.sqrt(Math.pow(distance, 2) + Math.pow(endheight, 2)));
        //返回两点之间的距离
        s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2));
        if (!_h) {
            _h = s;
            _indx = indx;
        } else {
            if (_h > s) {
                _h = s;
                _indx = indx;
            }
        }
    })


    return _heightPs[_indx];
}

/**
 * czml方法创建飞行路径线+抛物线函数
 */
xakjGis.prototype.creatFlyLinesByCzml = function (data) {
    viewer.shouldAnimate = true;
    let center = data.center;
    let cities = data.points;
    var dsArr = [];
    for (var j = 0; j < cities.length; j++) {
        var czml = [
            {
                "id": "document",
                "name": "CZML Path",
                "version": "1.0",
                "clock": { //定时
                    "interval": "2019-05-27T10:00:00Z/2019-05-27T10:16:50Z", // 990/60=16.5
                    "currentTime": "2019-05-27T10:00:00Z",//当前时间
                    "multiplier": data.multiplier //动画的速度倍数
                }
            },
            {
                //new Cesium.PolylineArrowMaterialProperty(Cesium.Color.RED)
                "id": "path",
                "name": "path with GPS flight data",
                "description": "<p>Hang gliding flight log data from Daniel H. Friedman.<br>Icon created by Larisa Skosyrska from the Noun Project</p>",
                "availability": "2019-05-27T10:00:00Z/2019-05-27T10:16:50Z",
                "path": {
                    "material": { //线的材质
                        "polylineOutline": {
                            "color": {
                                "rgba": data.lineColor
                            },
                            "outlineColor": {
                                "rgba": [0, 0, 0, 0]
                            },
                            "outlineWidth": 0
                        },
                    },//路线的材质
                    "width": 2, //线的宽度
                    "leadTime": 990,
                    "trailTime": 990,
                    "resolution": 5 //分辨率
                },
                "billboard": { //加billboard 也可以加载其他entity cesium会自己解析
                    "image": data.image,
                    "scale": 0.5,
                    "eyeOffset": {
                        "cartesian": [0.0, 0.0, -10.0]
                    }
                },
                "position": {
                    "epoch": "2019-05-27T10:00:00Z",//动画起始时间
                    "cartographicDegrees": [],
                }
            }];
        var points = parabolaEquation({ pt1: center, pt2: cities[j], height: data.height, num: 100 });//100个点
        var pointArr = [];
        for (var i = 0; i < points.length; i++) {
            pointArr.push(0 + i * 10, points[i][0], points[i][1], points[i][2]);//0+i*10;表示距离
        }
        czml[1].position.cartographicDegrees = pointArr;
        if (cities[j].image) {
            czml[1].billboard.image = cities[j].image;
        }
        viewer.dataSources.add(Cesium.CzmlDataSource.load(czml)).then(function (ds) {
            dsArr.push(ds);
        });
    }

    return dsArr;
}

/**
     *流动线纹理
     * */
xakjGis.prototype.creatFlyLinesAndPoints = function (initData, callback,hasCenter) {
    viewer.scene.globe.depthTestAgainstTerrain = false; // 设置该属性为true之后，标绘将位于地形的顶部；如果设为false（默认值），那么标绘将位于平面上。缺陷：开启该属性有可能在切换图层时会引发标绘消失的bug。
    viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK); //取消双击事件 ，双击的话，会视角直接切到该实体，且无法拖拽

    //创建线
    this.creatParabola(viewer, initData);

    if(hasCenter){

   
    //创建点
    let center = initData.center;
    var cities = initData.points;
    /*   ***********  这个可以修改成其他实体  *********** **/
    //中心点
    viewer.entities.add({
        id: center.id,
        position: Cesium.Cartesian3.fromDegrees(center.lon, center.lat, 0),
        point: {
            pixelSize: center.size,
            color: center.color,
        }
    });
    //散点
    for (var i = 0; i < cities.length; i++) {
        viewer.entities.add({
            id: cities[i].id,
            position: Cesium.Cartesian3.fromDegrees(cities[i].lon, cities[i].lat, 1),
            point: {
                pixelSize: cities[i].size,
                color: cities[i].color
            }
        });
    }
    /*   ***********  这个可以修改成其他实体  *********** **/
    }

    leftCilck(viewer, callback);
}


/**
 * (流动)抛物线
 * */
xakjGis.prototype.creatParabola = function (viewer, data) {
    let self = this;
    
    var material = null;
    var center = data.center;//起始点
    var cities = data.points;//可以为多组哦！
    if (data.flowing == true) {
        if (material != null) { } else {
            initPolylineTrailLinkMaterialProperty(data);
            var str1 = data.options.polyline.material[0];
            var str2 = data.options.polyline.material[1];
            data.options.polyline.material = new Cesium.PolylineTrailLinkMaterialProperty(str1, str2);
        }
    }
    for (var j = 0; j < cities.length; j++) {
        var points = parabolaEquation({ pt1: center, pt2: cities[j], height: data.height, num: 100 });
        var pointArr = [];
        for (var i = 0; i < points.length; i++) {
            pointArr.push(points[i][0], points[i][1], points[i][2]);
        }
        data.options.polyline.positions = Cesium.Cartesian3.fromDegreesArrayHeights(pointArr);
       let _ll = viewer.entities.add(data.options);
       self.liudongLine.push(_ll);
    }
}
//流动特效
function initPolylineTrailLinkMaterialProperty(data) {
    function PolylineTrailLinkMaterialProperty(color, duration) {
        this._definitionChanged = new Cesium.Event();
        this._color = undefined;
        this._colorSubscription = undefined;
        this.color = color;
        this.duration = duration +100;
        this._time = (new Date()).getTime();
    }
    Cesium.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
        isConstant: {
            get: function () {
                return false;
            }
        },
        definitionChanged: {
            get: function () {
                return this._definitionChanged;
            }
        },
        color: Cesium.createPropertyDescriptor('color')
    });
    PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
        return 'PolylineTrailLink';
    }
    PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
        if (!Cesium.defined(result)) {
            result = {};
        }
        result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
        result.image = Cesium.Material.PolylineTrailLinkImage;
        result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration ;
        return result;
    }
    PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
        return this === other ||
            (other instanceof PolylineTrailLinkMaterialProperty &&
                Property.equals(this._color, other._color))
    };
    Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;
    Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink';
    Cesium.Material.PolylineTrailLinkImage = data.flowImage;//图片
    Cesium.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
                                                   {\n\
                                                        czm_material material = czm_getDefaultMaterial(materialInput);\n\
                                                        vec2 st = materialInput.st;\n\
                                                        vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
                                                        material.alpha = colorImage.a * color.a;\n\
                                                        material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
                                                        return material;\n\
                                                    }";
    // material.alpha:透明度;material.diffuse：颜色;
    Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
        fabric: {
            type: Cesium.Material.PolylineTrailLinkType,
            uniforms: {
                color: new Cesium.Color(1.0, 0.0, 0.0, 1.0),
                image: Cesium.Material.PolylineTrailLinkImage,
                time: 0
            },
            source: Cesium.Material.PolylineTrailLinkSource
        },
        translucent: function (material) {
            return true;
        }
    });
}

/**
    * 左击事件, 主动屏蔽了 name=yscNoNeedEntity的实体,并返回实体的id
    */
function leftCilck(viewer, callback) {
    if (callback) {
        new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas).setInputAction(function (e) {
            var obj = viewer.scene.pick(e.position);
            if (Cesium.defined(obj)) {
                var str = obj.id._name;
                if (str == "test")
                    return
                callback(obj.id._id);
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
}

//++++++++++++++++++++====================方程====================
//抛物线方程
function parabolaEquation(options, resultOut) {
    //方程 y=-(4h/L^2)*x^2+h h:顶点高度 L：横纵间距较大者
    var h = options.height && options.height < 500 ? options.height : 500;
    var L = Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat - options.pt2.lat) ? Math.abs(options.pt1.lon - options.pt2.lon) : Math.abs(options.pt1.lat - options.pt2.lat);
    var num = options.num && options.num > 50 ? options.num : 50;
    var result = [];
    var dlt = L / num;
    if (Math.abs(options.pt1.lon - options.pt2.lon) > Math.abs(options.pt1.lat - options.pt2.lat)) {//以lon为基准
        var delLat = (options.pt2.lat - options.pt1.lat) / num;
        if (options.pt1.lon - options.pt2.lon > 0) {
            dlt = -dlt;
        }
        for (var i = 0; i < num; i++) {
            var tempH = h - Math.pow((-0.5 * L + Math.abs(dlt) * i), 2) * 4 * h / Math.pow(L, 2);
            var lon = options.pt1.lon + dlt * i;
            var lat = options.pt1.lat + delLat * i;
            result.push([lon, lat, tempH]);
        }
    } else {//以lat为基准
        var delLon = (options.pt2.lon - options.pt1.lon) / num;
        if (options.pt1.lat - options.pt2.lat > 0) {
            dlt = -dlt;
        }
        for (var i = 0; i < num; i++) {
            var tempH = h - Math.pow((-0.5 * L + Math.abs(dlt) * i), 2) * 4 * h / Math.pow(L, 2);
            var lon = options.pt1.lon + delLon * i;
            var lat = options.pt1.lat + dlt * i;
            result.push([lon, lat, tempH]);
        }
    }
    if (resultOut != undefined) {
        resultOut = result;
    }
    return result;
}