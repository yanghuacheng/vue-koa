/**
 * @author lijiang
 * time 2019-10-15 
 */

(function (window, undefined) {
    var xaCesium = {
        creatCesium: creatCesium,
        realTimeFly: realTimeFly,
        creatWRJFly: creatWRJFly //
    }


    //为了写代码过程中有代码提示，临时起变量，测试时注销
    var viewer;

    /**
     * 
     * @param {*} container 显示容器
     * @param {*} data 配置地图参数
     */
    function creatCesium(container, data) {
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
            "animation",
            "timeline",
            "fullscreenButton",
            "vrButton",
            "infoBox",
            "selectionIndicator"];
        for (var i = 0; i < args.length; i++) {
            if (!data[args[i]]) {
                data[args[i]] = false;
            }
        }
        if (!data.globalImagery) {
            data["imageryProvider"] = new Cesium.SingleTileImageryProvider({ url: "../libs/Build/Cesium/Assets/Textures/GlobalBkLayer.jpg" });
        }
        //创建viewer
        viewer = new Cesium.Viewer(container, data); //cesium初始化的时候 data中的参数不存在 也没事。

        //取消logo
        viewer._cesiumWidget._creditContainer.style.display = 'none';
        viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
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
        //影像亮度
        if (data.globalImageryBrightness != undefined) {
            img.brightness = data.globalImageryBrightness;
        }
        if (data.globalLabelBrightness != undefined) {
            label.brightness = data.globalLabelBrightness
        }

        return viewer;
    }


    /**
     * 飞行漫游
     */
    function realTimeFly(markDatas) {

        var marksIndex = 1;
        var pitchValue = -45;
        var _j = 2;

        var marks = markDatas;
        var datas = [
            { lng: 116.412928, lat: 39.889972, height: 100, flytime: 10 },// height:相机高度(单位米) flytime:相机两个标注点飞行时间(单位秒)
            { lng: 116.414114, lat: 39.888671, height: 100, flytime: 10 },
            { lng: 116.417133, lat: 39.888089, height: 100, flytime: 10 },
            { lng: 116.419396, lat: 39.889778, height: 100, flytime: 10 },
        ];
        // setTimeout(function(){

        flyExtent();
        // }, 2000);
        function flyExtent() {
            var pitch = Cesium.Math.toRadians(pitchValue);
            setExtentTime(marks[marksIndex].flytime);
           
            
            var Exection = function TimeExecution() {

                // _j += 1;
                // if (_j > 3) {
                //     _j = 0;
                //     // marks = [];
                // }
                // marks.push(datas[_j]);
                var preIndex = marksIndex - 1;
                if (marksIndex == 0) {
                    preIndex = marks.length - 1;
                }
                var heading = bearing(marks[preIndex].lat, marks[preIndex].lng, marks[marksIndex].lat, marks[marksIndex].lng)
                heading = Cesium.Math.toRadians(heading);

                var delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
                var originLat = marksIndex == 0 ? marks[marks.length - 1].lat : marks[marksIndex - 1].lat;
                var originLng = marksIndex == 0 ? marks[marks.length - 1].lng : marks[marksIndex - 1].lng;

                var endPosition = Cesium.Cartesian3.fromDegrees(
                    (originLng + (marks[marksIndex].lng - originLng) / marks[marksIndex].flytime * delTime),
                    (originLat + (marks[marksIndex].lat - originLat) / marks[marksIndex].flytime * delTime),
                    marks[marksIndex].height
                );
                // console.log('heading',heading);
                viewer.scene.camera.setView({
                    destination: endPosition,
                    orientation: {
                        heading: heading,
                        pitch: pitch,
                    }
                });
                if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
                    viewer.clock.onTick.removeEventListener(Exection);
                    changeCameraHeading();
                }
            };
            viewer.clock.onTick.addEventListener(Exection);

        }
        // 相机原地定点转向
        function changeCameraHeading() {
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
            setExtentTime(1);
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
            viewer.clock.onTick.addEventListener(Exection);
        }

        function setExtentTime(time) {
            var startTime = Cesium.JulianDate.fromDate(new Date());
            var stopTime = Cesium.JulianDate.addSeconds(startTime, time, new Cesium.JulianDate());
            viewer.clock.startTime = startTime.clone();
            viewer.clock.stopTime = stopTime.clone();
            viewer.clock.currentTime = startTime.clone();
            viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
            viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
        }

        function toRadians(degree) {
            return degree * Math.PI / 90;
        }
        function toDegrees(radians) {
            return radians * 180 / Math.PI;
        }

        function bearing(startLat, startLng, destLat, destLng) {
            startLat = toRadians(startLat);
            startLng = toRadians(startLng);
            destLat = toRadians(destLat);
            destLng = toRadians(destLng);

            var y = Math.sin(destLng - startLng) * Math.cos(destLat);
            var x = Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
            var brng = Math.atan2(x, y);
            var brngDgr = toDegrees(brng);
            return (brngDgr + 360) % 360;

        }


    }


    /**
     * 
     * @param {*} path 路径数组
     */
    function creatWRJFly(path) {

        //实时无人机路径

        //无人机照射范围

        // 实时漫游实现的思路：
        // 1、先预加载路径
        // 2、实时改变路径数组
        // 3、每更新一次数组，记录一下时间，让漫游从记录的时间开始



    }

    window.xaCesium = xaCesium;

})(window)


