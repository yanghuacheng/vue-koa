
var xakj = new xakjGis("main", {
    // globalImagery: "谷歌",
    // 'globalImagery':"tms"

})

var popInit = false;
let thermalMapVideo = false;
// let heightCamera = null;
//相机点位数据
let cameraData = null;

var viewer = xakj.viewer;

//存放设备点位
var devMap = new HashMap();

var _rtspId;
// //测试请求点位数据 +++++++++++++++++++++  (暂时先加载，先做完无人机再做这一块)  +++++++++++++++++++++++++
function addCameraData() {

    //添加一个全景的按钮

    var qj = xakj.createPOIForShp(113.97027643, 22.53903994, 16, "./images/qj.png", 'quanjing', "全景");
    var labs = [];
    labs.push[qj];

    $.ajax({
        url: "./cameras_SJZC.json",
        success: function (data) {
            // console.log(data);
            if (data) { cameraData = data }
            data.forEach(function (item) {
                //根据状态给不同的图标表示
                var img_url = './images/qiuji.png';
                if (item.status == 1 || item.status == 2) {
                    // img_url = './images/bjtb.png'
                } else if (item.status == 3) {
                    // img_url = './images/camera3.png'
                } else {
                    var lable = xakj.createPOIForShp(item.longitude, item.latitude, item.height, img_url, 'camera', item.GBCode, item.status);
                    labs.push(lable);
                }
                // var lable = xakj.createPOIForShp(item.longitude, item.latitude, item.height, img_url, 'camera', item.GBCode, item.status);
                // labs.push(lable);

            });
            devMap.put("cameraLabel", labs);
            // var datasource=Cesium.GeoJsonDataSource.load(data);
            // viewer.dataSources.add(datasource);
        },
        error: function (data) {

        }

    })

}
addCameraData(); //加载视频点位数据






function addSJZCModel() {

    var dimian = null;
    var jianzhu = null;

    //加载地面模型
    function loadDimian() {

        dimian = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: "./static/dimian/tileset.json",
            maximumNumberOfLoadedTiles: 100000
        }));

        //贴地显示
        var height = -3; //-3.77
        dimian.readyPromise.then(function (argument) {
            var cartographic = Cesium.Cartographic.fromCartesian(dimian.boundingSphere.center);
            // console.log(cartographic);
            var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
            var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height +
                height);
            var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
            dimian.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        })
    }
    // loadDimian();
    //加载建筑模型
    function loadmoxing() {
         jianzhu = viewer.scene.primitives.add(new Cesium.Cesium3DTileset({
            url: "./static/moxing/tileset.json",
            maximumNumberOfLoadedTiles: 100000
        }));
        //贴地显示
        var height2 = -3; //-3.77
        jianzhu.readyPromise.then(function (argument) {
            var cartographic = Cesium.Cartographic.fromCartesian(jianzhu.boundingSphere.center);
            // console.log(cartographic);
            var surface = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height);
            var offset = Cesium.Cartesian3.fromRadians(cartographic.longitude, cartographic.latitude, cartographic.height +
                height2);
            var translation = Cesium.Cartesian3.subtract(offset, surface, new Cesium.Cartesian3());
            jianzhu.modelMatrix = Cesium.Matrix4.fromTranslation(translation);
        })
    }
    // loadmoxing();
    // viewer.entities.remove(dimian);
    // viewer.entities.remove(jianzhu);


    // //根据不同的相机高度显示不同的模型
    viewer.scene.camera.changed.addEventListener(function () {
        //获取当前相机高度
        var height = Math.ceil(viewer.camera.positionCartographic.height);//取整数

        if (height <= 400) {
            // dimian.show = true;
            // jianzhu.show = true;
            // viewer.entities.remove();
            if(!jianzhu){
                // console.log("加载建筑模型");
                // loadmoxing();
            }
           
        }
        else if (height > 800) {
            // jianzhu.show = false;
            if(jianzhu){
                // console.log("移除建筑面模型");
                // viewer.entities.remove(jianzhu);
                // jianzhu = null;
            }
           
        }
    });



    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(113.97025613534363, 22.541192996412686, 130),
        orientation: {
            heading: 3.279304500963121,
            pitch: -0.25239072362282485,
            roll: 6.283185307179583
        }
    });
}
//加载模型

addSJZCModel();
// viewer.camera.flyTo({
//     destination: Cesium.Cartesian3.fromDegrees(113.97025613534363, 22.541192996412686, 130),
//     orientation: {
//         heading: 3.279304500963121,
//         pitch: -0.25239072362282485,
//         roll: 6.283185307179583
//     }
// });











//CZML实时漫游
//模拟点

var points_1 = [
    { longitude: 113.97037617, latitude: 22.53906826, height: 200 },
    { longitude: 113.97027843, latitude: 22.53895994, height: 200 },
    { longitude: 113.97019461, latitude: 22.5390389, height: 195 },
    { longitude: 113.96779713, latitude: 22.53877536, height: 200 },
    { longitude: 113.9677355, latitude: 22.54068787, height: 200 },
    { longitude: 113.96803091, latitude: 22.53877536, height: 200 },
    { longitude: 113.96977298, latitude: 22.53838252, height: 200 },
    { longitude: 113.97020404, latitude: 22.54038274, height: 200 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 200 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 200 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 200 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 200 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 190 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 195 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 198 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 200 },

]
var points_2 = [
    { longitude: 113.96779713, latitude: 22.53877536, height: 200 },
    { longitude: 113.9677355, latitude: 22.54068787, height: 200 },
    { longitude: 113.96803091, latitude: 22.53877536, height: 200 },
    { longitude: 113.96977298, latitude: 22.53838252, height: 200 },
    { longitude: 113.97020404, latitude: 22.54038274, height: 200 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 200 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 200 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 200 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 200 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 190 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 195 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 198 },
    { longitude: 113.97064145, latitude: 22.53868913, height: 200 },
]


function testFly() {
    var tm = null;
    var ff = null;
    function test1(points) {
        var _kll = 1;
        xakj.realFlyByCZML(viewer, points[0], 1);
        tm = setInterval(() => {
            _kll++;
            if (_kll < points.length) {
                xakj.updatePoint(points[_kll]);
                xakj.flyAction = true;
            }

        }, 1000);
    }

    //模拟点击开始
    setTimeout(() => {
        // xakj.stopFly = true;
        test1(points_1);

    }, 5000);

    //模拟点击结束
    setTimeout(() => {
        // xakj.stopFly = true;
        // clearInterval(tm);
        // CZMLFly();
        clearInterval(tm);
        xakj.points1 = [];
        xakj.points2 = [];
        xakj.stopFly = true;

    }, 10000);

    setTimeout(() => {
        xakj.stopFly = false;
        test1(points_2);
    }, 20000);
}
//模拟无人机飞行
// testFly()





//测试画棱锥
// xakj.test();

//添加标注点
function testAddPapa() {
    //弹窗气泡初始化（输入坐标可以随便输一个数字）
    xakj.customPopLabel(113.96975904, 22.538927841, 8.017, 'zuizongShow');
    //标注点
    // xakj.customLabelPoints(113.96975904,22.538927841,8.017,'zuizongPoint',false,"18");
    // xakj.customLabelPoints(113.97027843,22.53895994,8.017,'zuizongPoint',false,"10");

}
// testAddPapa();

//整合追踪演示
function zuizhongShow(zhongPoints) {
    console.log("zhongPoints+++++++", zhongPoints)
    //初始化弹出气泡
    if (!popInit) {
        xakj.customPopLabel(113.96975904, 22.538927841, 8.017, 'zuizongShow');
    }
    //拿到追踪到的点位
    // let zhongPoints = [
    //     { longitude: 113.97037617, latitude: 22.53906826, height: 40 },
    //     { longitude: 113.97027843, latitude: 22.53895994, height: 40 },
    //     { longitude: 113.97019461, latitude: 22.5390389, height: 40 },
    //     { longitude: 113.96977298, latitude: 22.53838252, height: 40 },
    // ]
    let lnPs = [];
    let laPs = [];
    let zzPs = [];
    zhongPoints.forEach(function (item, indx) {
        if (lnPs.indexOf(item.longitude) < 0 && laPs.indexOf(item.latitude) < 0) {
            lnPs.push(item.longitude);
            laPs.push(item.latitude);
            zzPs.push(item);
        } else {
            zzPs[lnPs.indexOf(item.longitude)].count += item.count;
        }
    })
    // console.log("-0-0-0-0-",zzPs);

    zhongPoints = zzPs;
    //计算高程
    // calculateElevation(zhongPoints, function (req) {
    // debugger
    // let xuxianPoints = [];
    // req.forEach(function (item, indx) {
    //     zhongPoints[indx].height = item.height;
    //     xuxianPoints.push(zhongPoints[indx].longitude );
    //     xuxianPoints.push(zhongPoints[indx].latitude);
    //     xuxianPoints.push(zhongPoints[indx].height + 20);
    //     // console.log("计算后的追踪数组", zhongPoints[indx].height);
    //     xakj.customLabelPoints(zhongPoints[indx].longitude, zhongPoints[indx].latitude, zhongPoints[indx].height, 'zuizongPoint', { count: zhongPoints[indx].count, address: zhongPoints[indx].address });
    // });
    // // console.log("计算后的追踪数组", zhongPoints);

    // //添加虚线
    // xakj.addXuxian(xuxianPoints);
    // //点击器气泡，显示相应的弹窗
    // clickZuiZhongPop();

    // });

    //
    let xuxianPoints = [];
    var _currItem;
    zhongPoints.forEach(function (item, indx) {

        // zhongPoints[indx].height +=  100;
        xuxianPoints.push(zhongPoints[indx].longitude);
        xuxianPoints.push(zhongPoints[indx].latitude);
        xuxianPoints.push(zhongPoints[indx].height + 20);
        xakj.customLabelPoints(zhongPoints[indx].longitude, zhongPoints[indx].latitude, zhongPoints[indx].height + 10, 'zuizongPoint', { count: zhongPoints[indx].count, address: zhongPoints[indx].address });
        if (indx == 0) _currItem = item;
        if (indx > 0) {
            let _data = {
                flowing: true,
                height: 50,//抛物线最大高度
                flowImage: "./images/tiao3.png"
                , center: { id: _currItem.videoId, lon: _currItem.longitude, lat: _currItem.latitude, size: 5, color: Cesium.Color.PURPLE, }
                , points: [
                    { id: item.videoId, lon: item.longitude, lat: item.latitude, color: Cesium.Color.YELLOW, size: 5 }
                ],
                options: {
                    name: 'zhuizong',
                    polyline: {
                        width: 5,//线宽度
                        material: [Cesium.Color.RED, 3000],//混合颜色、(红绿混合透明后 就是黄色了)3000秒发射间隔,单纯材质无法展示飞行动态。所以去掉了。
                    }
                }
            };
            //加载流动线
            xakj.creatFlyLinesAndPoints(_data);
        }
        //添加脉冲
        xakj.addCircleRipple({
            name: 'zhuizong',
            id: item.videoId,
            lon: item.longitude,
            lat: item.latitude,
            height: zhongPoints[indx].height + 2,
            maxR: 15,
            minR: 0,//最好为0
            deviationR: 0.1,//差值 差值也大 速度越快
            eachInterval: 2500,//两个圈的时间间隔
            imageUrl: "./images/redCircle2.png"
        })

        _currItem = item;


    })
    //添加虚线
    // xakj.addXuxian(xuxianPoints);  虚线版本先不用
    //点击器气泡，显示相应的弹窗
    clickZuiZhongPop();



}
// zuizhongShow();

// xakj.addXuxian();

function zuizhongHid() {
    $(".zuizongPoint").hide();
    $(".zuizongShow").hide();
    // console.log("虚线", xakj.xuxianArr);
    xakj.xuxianArr.forEach(function (item) {
        viewer.entities.remove(item);
    })
    xakj.xuxianArr = [];
    //移除流动线
    xakj.liudongLine.forEach(function (item) {
        viewer.entities.remove(item);
    })
    xakj.liudongLine = [];
    //移除脉冲
    xakjGis.maiChongArr.forEach(function (item) {
        if (item.name == "zhuizong") {
            viewer.entities.remove(item);
        }
    })
    xakjGis.maiChongArr = [];

}

setTimeout(() => {
    // zuizhongHid();
}, 10000);


//脉冲效果
// xakj.addCircleRipple({
//     id:"脉冲测试",
//     lon:"113.96975904",
//     lat:"22.538927841",
//     height:8.017,
//     maxR:13,
//     minR:0,//最好为0
//     deviationR:0.1,//差值 差值也大 速度越快
//     eachInterval:2000,//两个圈的时间间隔
//     imageUrl:"./images/redCircle2.png"
// })




//创建Map对象
function HashMap() {
    /** Map 大小 **/
    var size = 0;
    /** 对象 **/
    var entry = new Object();
    /** 存 **/
    this.put = function (key, value) {
        if (!this.containsKey(key)) {
            size++;
        }
        entry[key] = value;
    }
    /** 取 **/
    this.get = function (key) {
        return this.containsKey(key) ? entry[key] : null;
    }
    /** 删除 **/
    this.remove = function (key) {
        if (this.containsKey(key) && (delete entry[key])) {
            size--;
        }
    }
    /** 是否包含 Key **/
    this.containsKey = function (key) {
        return (key in entry);
    }
    /** 是否包含 Value **/
    this.containsValue = function (value) {
        for (var prop in entry) {
            if (entry[prop] == value) {
                return true;
            }
        }
        return false;
    }
    /** 所有 Value **/
    this.values = function () {
        var values = new Array();
        for (var prop in entry) {
            values.push(entry[prop]);
        }
        return values;
    }
    /** 所有 Key **/
    this.keys = function () {
        var keys = new Array();
        for (var prop in entry) {
            keys.push(prop);
        }
        return keys;
    }
    /** Map Size **/
    this.size = function () {
        return size;
    }
    /* 清空 */
    this.clear = function () {
        size = 0;
        entry = new Object();
    }
}


//监听场景点击事件
viewer.screenSpaceEventHandler.setInputAction(function onLeftClick(movement) {
    var pickedFeature = viewer.scene.pick(movement.position);
    // console.log('点击', pickedFeature)
    // console.log('点击', movement.position);

    if (!Cesium.defined(pickedFeature)) {
        return;
    }

    var currentSelectedEntity = pickedFeature.id;
    //点击摄像头图标
    if (currentSelectedEntity) {
        if (currentSelectedEntity.deviceType == "camera") {
            // console.log(currentSelectedEntity.code_id);
            if (currentSelectedEntity.status > 0) {
                // console.log(currentSelectedEntity.code_id);
                alertmodel("该视频暂未注册");
            }
            else {
                // alert("rtmp://190.32.33.80:9935/live/"+ currentSelectedEntity.code_id);
                playVideo("rtmp://190.32.33.80:9935/live/" + currentSelectedEntity.code_id);
            }
        }
        //点击全景
        if (currentSelectedEntity.deviceType == 'quanjing') {
            $('iframe').show().siblings('#close').show();
            $('.qjbutton').addClass('qjshow');
        }
    }

}, Cesium.ScreenSpaceEventType.LEFT_CLICK)


//点击home
$('.zhuye').on('click', function () {
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(113.97025613534363, 22.541192996412686, 130),
        orientation: {
            heading: 3.279304500963121,
            pitch: -0.25239072362282485,
            roll: 6.283185307179583
        }
    });
})


//点击追踪气泡弹出窗口
function clickZuiZhongPop() {
    let pop_tim = null;
    $('.zuizongPoint').on('click', function () {
        console.log($(this).context.value);
        if (pop_tim) {
            clearTimeout(pop_tim);
        }
        let val = $(this).context.value;
        xakj.customLabelShow(val.position.lng, val.position.lat, val.position.height, val.address + "出现" + val.count + "次");
        pop_tim = setTimeout(function () {
            xakj.customLabelHide();
        }, 10000)
    })
}
clickZuiZhongPop();


function getdatareq(req) {

    //解析数据
    let pointDatas = [];//收集有用数据
    let cameraIdxs = [];
    if (req) {
        req.forEach(function (item, idex) {
            // console.log(item);
            //计算距离,得到最近的高空摄像头
            if (idex == 0) {
                let heightCamera = distance({
                    'longitude': item.longitude,
                    'latitude': item.latitude,
                    'height': 40,
                });
                //播放高空摄像头视频
                Highvideo("rtmp://190.32.33.80:9935/live/" + heightCamera.GBCode);

            }
            if (cameraIdxs.indexOf(item.cameraIdx) < 0) {
                cameraIdxs.push(item.cameraIdx);
                item.count = 1;
                let _p = {
                    longitude: item.longitude,
                    latitude: item.latitude,
                    height: 0,
                    count: 1,
                    address: item.videoName,
                    videoId: item.videoId,
                    cameraIdx: item.cameraIdx,
                }
                pointDatas.push(_p);
            } else {
                pointDatas[cameraIdxs.indexOf(item.cameraIdx)].count += 1;
            }
        })
        // console.log("-------",pointDatas);
        //追踪
        zuizhongShow(pointDatas);
    } else {

    }

}

//先加载追踪数据
function loadZuiZhongData(req) {

}

//放弃追踪
$('.fq').on('click', function () {
    zuizhongHid();
});



//测试加载热力图
// presentationDXWGSYT
let heartMapPlay = null;
$('.mtop >#presentationDXWGSYT').on('click', function () {
    _getData.getData("http://190.32.33.80:9092/camera/list", function (req) {
        console.log("获取相机列表:", req);
        if (req) {
            req.data.items.forEach(function (item, indx) {
                if (indx == 0) {
                    let url = "http://190.32.33.80:9092/camera/thermodynamic?cameraId=" + item.id
                    _getData.getData(url, function (obj) {
                        console.log("----====-----", url);
                        // heartMap("rtmp://190.35.205.219:1935/0/render/MTU3MzQ2MjcyOTYxMg==");
                        if (obj) {
                            //播放热力图视频
                            if (heartMapPlay) {
                                heartMapPlay.pause();
                                heartMapPlay.dispose();//销毁播放器
                            }
                            $('#tmv').show();
                            // heartMap(obj.data.plyUrl)
                            // console.log("热力图数据：",obj.data)
                            heartMapPlay = thermalMapVideoPlay(obj.data.playUrl);
                        }
                    })
                }

            })
        }
    })
})


//测试加载热力图
function heartMap(rtmp) {
    heartMapPlay = thermalMapVideoPlay(rtmp);
}
//测试
// heartMap("rtmp://124.139.232.61:1935/live/livestream");

$('#tmv button').on('click', function () {
    $(this).parent().hide();
    heartMapPlay.pause();
    heartMapPlay.dispose();//销毁播放器
    heartMapPlay = null;

})
// setTimeout(function(){
//     let d = 
//         {
//             "cameraId": "44030552001320122306",
//             "name": "深南大道东往西世界之窗公交车站枪机",
//             "position": {
//                 "longitude": 113.970038254,
//                 "latitude": 22.538064471,
//             }
//         }
//         ljfunc(d);

// },15000)
function ljfunc(obj) {
    //拿到经纬度
    let _height = 6;
    if (cameraData) {
        //判断一下是否有记录高度
        cameraData.forEach(function (item) {
            if (item.GBCode == obj.cameraId) {
                _height = item.height;
            }
        })
    }
    // console.log(obj,"###333333###",_height)
    //创建脉冲
    xakj.addCircleRipple({
        name: '1',
        id: obj.cameraId,
        lon: obj.position.longitude,
        lat: obj.position.latitude,
        height: _height,
        maxR: 15,
        minR: 0,//最好为0
        deviationR: 0.1,//差值 差值也大 速度越快
        eachInterval: 2500,//两个圈的时间间隔
        imageUrl: "./images/redCircle2.png"
    })
    viewer.camera.flyTo({
        destination: Cesium.Cartesian3.fromDegrees(obj.position.longitude, obj.position.latitude, 150),
        orientation: {
            heading: 0,
            pitch: Cesium.Math.toRadians(-90),
            roll: 0
        }
    });

}


//测试czml流动线追踪（有点丑，不想用）
function zuizhongCZML() {
    let data2 = {
        image: "./images/fx1.png", //如果有其他需求 就直接修改ysc内部代码吧 这边就简单写几个参数
        center: { lon: 113.9700918983, lat: 22.5380197675 },
        points: [{ lon: 113.96975904, lat: 22.538927841 }],
        height: 40,//抛物线的最高点
        multiplier: 15,//动画的运行时间加快倍数//速度 缺陷是 因为时间是唯一的，一个容器不能同时存在两个时间加快倍数，所以。要在一个容器使用两个这个函数，且想要速度不一样，那就改源码的czml吧
        lineColor: [255.0, 127.0, 0.0, 255],//线的颜色 最后一个255就相当于1
    };
    xakj.creatFlyLinesByCzml(data2)
}
// zuizhongCZML();


//测试流动纹理线
function testLiuDong() {
    //创建射线
    let data = {
        flowing: true,
        height: 50,//抛物线最大高度
        flowImage: "./images/tiao3.png"
        , center: { id: 0, lon: 113.9700918983, lat: 22.5380197675, size: 5, color: Cesium.Color.PURPLE, }
        , points: [
            { id: 1, "lon": 113.96975904, "lat": 22.538927841, color: Cesium.Color.YELLOW, size: 5 }
        ],
        options: {
            name: 'test',
            polyline: {
                width: 8,//线宽度
                material: [Cesium.Color.RED, 8000],//混合颜色、(红绿混合透明后 就是黄色了)3000秒发射间隔,单纯材质无法展示飞行动态。所以去掉了。
            }
        }
    };
    let data2 = {
        flowing: true,
        height: 50,//抛物线最大高度
        flowImage: "./images/jiantou_xx.png"
        , center: { id: 2, lon: 113.96975904, lat: 22.538927841, size: 5, color: Cesium.Color.PURPLE, }
        , points: [
            { id: 3, "lon": 113.96274904, "lat": 22.538917841, color: Cesium.Color.YELLOW, size: 5 }
        ],
        options: {
            name: 'test',
            polyline: {
                width: 8,//线宽度
                material: [Cesium.Color.RED, 9000],//混合颜色、(红绿混合透明后 就是黄色了)3000秒发射间隔,单纯材质无法展示飞行动态。所以去掉了。
            }
        }
    };
    xakj.creatFlyLinesAndPoints(data, function (req) {
        console.log(req);
    })
    xakj.creatFlyLinesAndPoints(data2, function (req) {
        console.log(req);
    })
}

setTimeout(function () {
    // testLiuDong();
}, 5000)


// xakj.thermalMapVideo(113.96975904,22.538927841,20,"tmv");
// xakj.thermalMapVideoShow(113.96975904,22.538927841,20);
// thermalMapVideoPlay("rtmp://202.69.69.180:443/webcast/bshdlive-pc");

//禁止中间轮滑调整视角
// viewer.scene.screenSpaceCameraController.zoomEventTypes = [Cesium.CameraEventType.WHEEL, Cesium.CameraEventType.PINCH];
// viewer.scene.screenSpaceCameraController.tiltEventTypes = [Cesium.CameraEventType.PINCH, Cesium.CameraEventType.RIGHT_DRAG];

function testRotations() {

}
testRotations();

