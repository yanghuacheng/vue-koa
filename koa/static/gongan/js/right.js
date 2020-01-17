//右侧页面：无人机事件
var dji = new DJI($);
var wrjvido = null;
var interval = null, currentUavIndex = -1, currentRtmpUrl = "", hasUav = false;
// var drones;
var _viewer = null;
var flyAction = {
    fly1: true,
    fly2: true
}
$('#close').click(function () {
    $('iframe,#close').hide();
    $('.qjbutton').removeClass('qjshow');
})
$('.qjbutton button').click(function () {
    var index = $(this).index();
    $(this).addClass('active').siblings().removeClass('active');
    if (index == 0) { $('iframe').attr('src', 'http://190.35.195.80/xiaoan?p=209275d69093329245') }
    if (index == 1) { $('iframe').attr('src', 'http://190.35.195.80/xiaoan?p=418865d690c01cb844') }
    if (index == 2) { $('iframe').attr('src', 'http://190.35.195.80/xiaoan?p=387355d690d768b9d4') }
    if (index == 3) { $('iframe').attr('src', 'http://190.35.195.80/xiaoan?p=105895d730686024d1') }
})
$('.qjbutton button').eq(0).click();
// http://190.35.195.80/xiaoan?p=209275d69093329245
// http://190.35.195.80/xiaoan?p=418865d690c01cb844
// http://190.35.195.80/xiaoan?p=387355d690d768b9d4
// http://190.35.195.80/xiaoan?p=105895d730686024d1



// $("#uva1,#uva2").bind('click', function () {
//     currentUavIndex = $(this).index();
//     clearInterval(interval);
//     $(this).siblings().removeClass('active')
//     $(this).addClass("active");
//     var id = $(this).attr("id");
//     drones = dji.getSn();
//     if (!drones) {
//         alertmodel("未检测到无人机！");
//         _viewer = null;
//         return;
//     }
//     var drone = null;
//     if (id == "uva1" && drones.length > 0) {
//         drone = drones[0];
//     } else if (id == "uva2" && drones.length > 1) {
//         drone = drones[1];
//     }
//     if (drone != null) {
//         hasUav = true;

//         var lat = drone.lat;
//         var lng = drone.lng;
//         if (drone.lat == 0 || drone.lng == 0) {
//             lng = 113.97023;
//             lat = 22.53891;
//         }
//         currentRtmpUrl = dji.startPlay(drone.sn);
//         interval = setInterval(function () {
//             var drones = dji.getSn(drone.sn);
//             if (drones.length == 0) {
//                 if(_viewer){
//                     _viewer.trackedEntity = null;
//                     xakj.flyAction = false;
//                 }
//                 return;
//             }
//             drone = drones[0];
// 			// lat: 22.538285lng: 113.970376
// 			var _point = {longitude: drone.lng, latitude: drone.lat, height: 100}
// 			if(!_viewer){
//                 _viewer = xakj.realFlyByCZML(viewer,_point,1);
//                 xakj.flyAction = true;
//                 // _status = true;
//                 wrenvideo(currentRtmpUrl);
// 			}else{
// 				xakj.updatePoint(_point);
// 			}

//         }, 1000);
//     } else {
//         hasUav = false;
//         alertmodel("未检测到无人机")
//     }
// })

var url = '';
var bigNum = 0;
var leftNum = 0;
var rightNum = 0;
var vlcUrl = '';


var changeVlc = true; //判断是否分屏
// 右侧-大视频-切换


// 无人机按钮文字高亮
// $('.uva_code').hover(function () {
//     $(this).css('color', '#21aeff');
// }, function () {
//     $(this).css('color', '#fff');
// });



//无人机喊话按钮事件
$('.tambg ul li').on('click', function () {

})
$(".flyradio").on('click', function () {

})
//点击无人机1
$('.flyradio').on('click', function () {
    let _self = this;
    if ($(this).index() == 0) {
        // debugger
        //1先检测是否有无人机在飞
        //2如果有，先判断当前是否有无人机在飞，如果有先关闭
        //3进行飞行，定时更新位置
        flyAction.fly1 = !flyAction.fly1;
        flyAction.fly2 = true;
        if (flyAction.fly1) {
            //销毁视频窗口
            // wrjvido.playDispose();
            clearInterval(interval);
            _viewer = null;
            xakj.stopFly = true;
            xakj.points1 = [];
            xakj.points2 = [];
        }
        else {
            xakj.stopFly = false;
            detectionAndFly(function(req){
              //回调改变按钮状态
                if(req){
                    $(_self).children("span").removeClass('error');
                    $(_self).children("span").addClass('active');
                }else{
                    $(_self).children("span").removeClass('active');
                    $(_self).children("span").addClass('error');
                }
            });
        }

        // $(this).toggleClass('color', '#21aeff');
    }
    if ($(this).index() == 1) {
        // debugger
        flyAction.fly2 = !flyAction.fly2;
        flyAction.fly1 = true;
        if (flyAction.fly2) {
            clearInterval(interval);
            _viewer = null;
            xakj.stopFly = true;
            xakj.points1 = [];
            xakj.points2 = [];
        }
        else {
            xakj.stopFly = false;
            detectionAndFly(function(req){
                //回调改变按钮状态
                if(req){
                    $(_self).children("span").removeClass('error');
                    $(_self).children("span").addClass('active');
                }else{
                    $(_self).children("span").removeClass('active');
                    $(_self).children("span").addClass('error');
                }
                
            });
        }
    }
    // //1先检测是否有无人机在飞
    // //2如果有，先判断当前是否有无人机在飞，如果有先关闭
    // //3进行飞行，定时更新位置
    // flyAction.fly1 = !flyAction.fly1;
    // flyAction.fly2 = true;
    // if(flyAction.fly1){
    //     clearInterval(interval);
    //     _viewer = null;
    //     xakj.stopFly = true;
    //     xakj.points1 = [];
    //     xakj.points2 = [];
    // }
    // else{
    //     xakj.stopFly = false;
    //     detectionAndFly();
    // }

    // $(this).toggleClass('color', '#21aeff');

})
//点击无人机2
$('#uva2').on('click', function () {
    // flyAction.fly2 = !flyAction.fly2;
    // flyAction.fly1 = true;
    // if (flyAction.fly2) {
    //     clearInterval(interval);
    //     _viewer = null;
    //     xakj.stopFly = true;
    //     xakj.points1 = [];
    //     xakj.points2 = [];
    // }
    // else {
    //     xakj.stopFly = false;
    //     detectionAndFly();
    // }

    // $(this).toggleClass('color', '#21aeff');
})

//检测是否有无人机在飞
function detectionAndFly(req) {
    clearInterval(interval);
    var drones;
    dji.getSn(function (resp) {
        if (!resp) {
            alertmodel('未检测到无人机！');
            //返回无人机状态
            req(false);
        }
        if (0 == resp.code) {
            drones = resp.data.drones;
            if (drones.length == 0) {
                alertmodel('未检测到无人机！');
                //返回一个无人机状态
                req(false);
            } else {
                 //返回无人机状态
                req(true);
                //检测到无人机
                let drone = drones[0];
                if (drone != null) {
                    // debugger
                    //请求无人机视频播放地址,回调得到地址
                    dji.startPlay(drone.sn, function (v_rsp) {
                        console.log("dfdfdfdfd___++++", currentRtmpUrl);
                        if (v_rsp) {
                            currentRtmpUrl = v_rsp; // 得到视频地址
                            // wrenvideo(currentRtmpUrl);//开始播放无人机视频
                            playVideo(currentRtmpUrl,true);
                        }
                    });
                    //定时轮询得到无人机的位置
                    getFlyInfo(drone.sn);
                }

            }
        }

    });
}


//定时器轮询获取无人机实时位置
function getFlyInfo(sn) {
    console.log('sn---', sn);
    interval = setInterval(function () {
        dji.getSn(function (resp) {
            console.log(resp);
            var drones = resp.data.drones;
            for (var i = 0; i < drones.length; i++) {
                if (sn == drones[i].sn) {
                    var dronePoints = drones[i];
                    console.log('dronePoints+++', dronePoints);
                    //如果没有点位信息
                    if (!dronePoints) {
                        if (_viewer) {
                            _viewer.trackedEntity = null;
                            xakj.flyAction = false;
                        }
                        return;
                    }
                    let drone = dronePoints;
                    console.log(drone);
                    // lat: 22.538285lng: 113.970376
                    var _point = { longitude: drone.lng, latitude: drone.lat, height: 100 }
                    if (!_viewer) {
                        _viewer = xakj.realFlyByCZML(viewer, _point, 1);
                        xakj.flyAction = true;
                        // _status = true;
                    } else {
                        //持续更新无人机位置
                        xakj.updatePoint(_point);
                    }
                }
            }
        })
    }, 1000);
}
