
/**-----------------------图标------------------------------------------- */

//测试上传图标
let j_net = new j_NetWork()
function changepic(obj) {
    let f = obj.files[0];
    j_net.postImage("http://192.168.188.152:9092/upload", f, function (req) {
        if (req) {
            // console.log("成功返回的数据",req)
            $("#showImage").attr("src", req.data.src) //显示一下看有没有成功
            // 上传图标成功后新增图标信息
            //    newAddIcon(req.data.fileurl)

            //修改图标
            changeIcon(req.data.fileurl)
        }
    })
}

//新增或者修改图标信息
function newAddIcon(url) {
    j_net.postWay(
        "http://192.168.188.152:9092/icon/",
        {
            "url": url
        },
        function (req) {
            if (req) {
                console.log("新增图标成功：", req)
            }
            else {
                console.log('新增图标失败！');
            }
        }
    )
}
//修改图标
function changeIcon(url) {
    j_net.putChange("http://192.168.188.152:9092/icon/",
        {
            "id": "6",
            "url": url
        }, function (req) {
            if (req) {
                console.log("图标更新成功！", req)
            } else {
                console.log("图标更新失败！")
            }
        }
    )
}

//测试获取、删除操作
function testGetIconList() {
    //获取列表
    j_net.getWay("http://192.168.188.152:9092/icon/list", function (req) {
        if (req) {
            console.log("获取成功：", req)
        } else {
            console.log("获取列表失败!")
        }
    })

    // 删除图标
    // j_net.delete("http://192.168.188.152:9092/icon/"+ '5',
    // function(req){
    //     if(req){
    //         console.log("删除成功！",req)
    //     }
    //     else{
    //         console.log("删除失败！")
    //     }
    // })

    //获取图标信息
    j_net.getWay("http://192.168.188.152:9092/icon/" + "6", function (req) {
        if (req) {
            console.log("获取图标信息成功！", req)
        } else {
            console.log("获取图标信息失败！")
        }
    })

}
setTimeout(() => {
    // testGetIconList()
}, 5000);



/**-------+++++---------------点线面-------------++++------------ */

function testPLM() {

    //上传点
    function uploadPoint() {
        j_net.postWay(
            "http://192.168.188.152:9092/poinlinesurface/",
            [
                {
                    "color": "#FF0000",
                    "alpha": 0.1,
                    "icon_id": 6,
                    "note": "测试数据备注",
                    "point_line_surface_type": 1,
                    "sort": 0,
                    "x_pont": "113.970653",
                    "y_pont": "22.537879",
                    "z_pont": "15.143"
                }
            ],
            function (req) {
                if (req) {
                    console.log("点上传成功！", req)
                } else {
                    console.log("点上传失败！")
                }
            }
        )
    }
    // uploadPoint()



    //上传线
    function uploadLine() {
        //模拟创建一个线的点位数组
        let lines = [
            { lng: "113.970653", lat: "22.537876", height: "15.143" },
            { lng: "113.970471", lat: "22.537703", height: "16.025" },
            { lng: "113.970549", lat: "22.537446", height: "18.937" },
            { lng: "113.970236", lat: "22.537300", height: "18.642" }
        ]
        let parms = []
        //构造数据
        lines.forEach(function (item, indx) {
            parms.push({
                "color": "#FF00FF",
                "icon_id": 6,
                "line_type": 0,
                "alpha": 0.7,
                "note": "线测试备注" + indx,
                "point_line_surface_type": 2,
                "sort": indx,
                "x_pont": item.lng,
                "y_pont": item.lat,
                "z_pont": item.height
            })
        })
        j_net.postWay(
            "http://192.168.188.152:9092/poinlinesurface/",
            parms,
            function (req) {
                if (req) {
                    console.log("线上传成功！", req)
                }
                else {
                    console.log("线上传失败!")
                }
            }
        )

    }

    // uploadLine()


    //上传面
    function uploadMap() {
        let maps = [
            { lng: "113.970165", lat: "22.537889", height: "13.099" },
            { lng: "113.969844", lat: "22.538065", height: "13.448" },
            { lng: "113.969677", lat: "22.537808", height: "13.408" },
            { lng: "113.969807", lat: "22.537628", height: "13.035" },
            { lng: "113.970030", lat: "22.537693", height: "140765" }
        ]
        let mapArr = []
        maps.forEach(function (item, idx) {
            mapArr.push({
                "color": "#FF0000",
                "id": 0,
                "line_type": 0,
                "note": "面的备注",
                "point_line_surface_type": 3,
                "alpha": 0.2,
                "sort": idx,
                "x_pont": item.lng,
                "y_pont": item.lat,
                "z_pont": item.height
            })
        })

        j_net.postWay(
            "http://192.168.188.152:9092/poinlinesurface/",
            mapArr,
            function (req) {
                if (req) {
                    console.log("面数据上传成功！", req)
                } else {
                    console.log("面数据上传失败！")
                }
            }
        )

    }
    // uploadMap()


    //查询点线面
    function searchAllPoints(callback) {
        j_net.getWay(
            "http://192.168.188.152:9092/poinlinesurface/search",
            function (req) {
                if (req) {
                    console.log("查询点线面数据成功！", req)
                    callback(req)
                } else {
                    console.log("查询点线面数据失败！")
                }

            }
        )
    }
    setTimeout(() => {
        // debugger
        // searchAllPoints()
    }, 5000);


    //获取点线面数据
    function getAllPoints() {
        j_net.getWay(
            "http://192.168.188.152:9092/poinlinesurface/6", //最后一个参数为id 
            function (req) {
                if (req) {
                    console.log("获取点线面数据成功！", req)
                } else {
                    console.log("获取点线面数据失败！")
                }
            }
        )
    }
    // getAllPoints()


    //删除点线面
    function deleteById() {
        j_net.delete(
            "http://192.168.188.152:9092/poinlinesurface/" + "334e62d7ecf247079ed3d87eae3a85df",
            function (req) {
                if (req) {
                    console.log("删除点线面成功！", req)
                } else {
                    console.log("删除点线面失败！")
                }
            }
        )
    }
    // deleteById()

    //更改点线面
    function changePLM() {
        j_net.putChange(
            "http://192.168.188.152:9092/poinlinesurface/",
            //必传 id, parentid,point_line_surface_type(类型)，要修改的字段
            //此处测试修改面的备注
            {
                "id": 36,
                "note": "测试修改面的备注2",
                "parentid": "482c8ce0286a4ddab77e08f6e4e330e9",
                "point_line_surface_type": 3
            },
            function (req) {
                if (req) {
                    console.log("更改点线面成功！", req)
                } else {
                    console.log("更改点线面失败！")
                }

            }
        )
    }
    // changePLM()


    /*+++++++++++++++++++++++++++++++++++++++++++++
        获取面的备注的时候，一定要获取第一个点的备注
    +++++++++++++++++++++++++++++++++++++++++++++*/



    /*+++++++++++++++++++++++++++++++++++++++++++++++++++++++
                        重现点线面
    +++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
    //测试重现点线面
    function testReshowDarta() {
        //先从数据库拿到数据
        searchAllPoints(function (req) {
            //解析数据
            req.data.forEach(function (item) {
                switch (item.point_line_surface_type) {
                    case 1:
                        //重现点
                        pointReshowFromNet(item)
                        break;
                    case 2:
                        //重现线
                        lineReshowFromNet(item)
                        break;
                    case 3:
                        //重现面
                        mapReshowFromNet(item)
                        break;

                    default:
                        break;
                }
            })

        })

    }

    testReshowDarta()



}

setTimeout(() => {
    testPLM()
}, 5000);


//重现点
function pointReshowFromNet(data) {
    let _ps = []
    if (devMap.containsKey('points')) {
        _ps = devMap.get("points")
    }
    // console.log(data)
    data.poinLineSurfaceEntities.forEach(item => {
        let _p = viewer.entities.add(new Cesium.Entity({
            id: item.id,
            point_line_surface_type: item.point_line_surface_type,
            parentid: item.parentid,
            deviceType: "points",
            position: Cesium.Cartesian3.fromDegrees(item.x_pont, item.y_pont, item.z_pont),
            billboard: {
                //图片地址可以随意更改
                image: item.iconEntity.url, //直接获取当前连接
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                show: true,
                scale: 1.0,
            }
        }))
        let html = reloadCreatDiv(item.note)
        reloadDiv(item.x_pont, item.y_pont, item.z_pont, html)
        _ps.push({
            div: html,
            point: _p

        })

    })
    devMap.put("points", _ps);


}
setTimeout(() => {
    //测试重绘线
    let line_Json = {
        "parentid": "cd015ece81e249329d6371b117d8fbb4",
        "point_line_surface_type": 2,
        "poinLineSurfaceEntities": [
            {
                "point_line_surface_type": 2,
                "sort": 3,
                "z_pont": "18.642",
                "creater": "",
                "parentid": "cd015ece81e249329d6371b117d8fbb4",
                "line_type": 2,
                "id": 37,
                "iconEntity": {
                    "id": 6,
                    "create_time": "2019-12-25 16:50:45",
                    "url": "http://192.168.188.152:8080/party_masses_storage/9d335b82-08dd-4263-b787-a793fcbd3a87.png"
                },
                "icon_id": 6,
                "color": "#1E90FF",
                "alpha": "0.7",
                "x_pont": "113.970236",
                "create_time": "2019-12-26 15:01:04",
                "y_pont": "22.537300",
                "note": "线测试备注3"
            },
            {
                "point_line_surface_type": 2,
                "sort": 2,
                "z_pont": "18.937",
                "creater": "",
                "parentid": "cd015ece81e249329d6371b117d8fbb4",
                "line_type": 2,
                "id": 35,
                "iconEntity": {
                    "id": 6,
                    "create_time": "2019-12-25 16:50:45",
                    "url": "http://192.168.188.152:8080/party_masses_storage/9d335b82-08dd-4263-b787-a793fcbd3a87.png"
                },
                "icon_id": 6,
                "color": "#1E90FF",
                "alpha": "0.7",
                "x_pont": "113.970549",
                "create_time": "2019-12-26 15:01:04",
                "y_pont": "22.537446",
                "note": "线测试备注2"
            },
            {
                "point_line_surface_type": 2,
                "sort": 1,
                "z_pont": "16.025",
                "creater": "",
                "parentid": "cd015ece81e249329d6371b117d8fbb4",
                "line_type": 2,
                "id": 33,
                "iconEntity": {
                    "id": 6,
                    "create_time": "2019-12-25 16:50:45",
                    "url": "http://192.168.188.152:8080/party_masses_storage/9d335b82-08dd-4263-b787-a793fcbd3a87.png"
                },
                "icon_id": 6,
                "color": "#1E90FF",
                "alpha": "0.7",
                "x_pont": "113.970471",
                "create_time": "2019-12-26 15:01:04",
                "y_pont": "22.537703",
                "note": "线测试备注1"
            },
            {
                "point_line_surface_type": 2,
                "sort": 0,
                "z_pont": "15.143",
                "creater": "",
                "parentid": "cd015ece81e249329d6371b117d8fbb4",
                "line_type": 2,
                "id": 30,
                "iconEntity": {
                    "id": 6,
                    "create_time": "2019-12-25 16:50:45",
                    "url": "http://192.168.188.152:8080/party_masses_storage/9d335b82-08dd-4263-b787-a793fcbd3a87.png"
                },
                "icon_id": 6,
                "color": "#1E90FF",
                "alpha": "0.7",
                "x_pont": "113.970653",
                "create_time": "2019-12-26 15:01:03",
                "y_pont": "22.537876",
                "note": "线测试备注0"
            }
        ]
    }
    lineReshowFromNet(line_Json)

    //测试重绘面
    let map_json =  {
        "parentid": "482c8ce0286a4ddab77e08f6e4e330e9",
        "point_line_surface_type": 3,
        "poinLineSurfaceEntities": [
          {
            "point_line_surface_type": 3,
            "sort": 3,
            "z_pont": "13.035",
            "creater": "",
            "parentid": "482c8ce0286a4ddab77e08f6e4e330e9",
            "line_type": 0,
            "id": 36,
            "iconEntity": {},
            "icon_id": 0,
            "color": "#FF0000",
            "alpha": "0.2",
            "x_pont": "113.969807",
            "create_time": "2019-12-26 15:01:04",
            "y_pont": "22.537628",
            "note": "面的备注"
          },
          {
            "point_line_surface_type": 3,
            "sort": 1,
            "z_pont": "13.448",
            "creater": "",
            "parentid": "482c8ce0286a4ddab77e08f6e4e330e9",
            "line_type": 0,
            "id": 32,
            "iconEntity": {},
            "icon_id": 0,
            "color": "#FF0000",
            "alpha": "0.2",
            "x_pont": "113.969844",
            "create_time": "2019-12-26 15:01:04",
            "y_pont": "22.538065",
            "note": "面的备注"
          },
          {
            "point_line_surface_type": 3,
            "sort": 0,
            "z_pont": "13.099",
            "creater": "",
            "parentid": "482c8ce0286a4ddab77e08f6e4e330e9",
            "line_type": 0,
            "id": 31,
            "iconEntity": {},
            "icon_id": 0,
            "color": "#FF0000",
            "alpha": "0.2",
            "x_pont": "113.970165",
            "create_time": "2019-12-26 15:01:03",
            "y_pont": "22.537889",
            "note": "面的备注"
          },
          {
            "point_line_surface_type": 3,
            "sort": 4,
            "z_pont": "14.0765",
            "creater": "",
            "parentid": "482c8ce0286a4ddab77e08f6e4e330e9",
            "line_type": 0,
            "id": 38,
            "iconEntity": {},
            "icon_id": 0,
            "color": "#FF0000",
            "alpha": "0.2",
            "x_pont": "113.970030",
            "create_time": "2019-12-26 15:01:04",
            "y_pont": "22.537693",
            "note": "面的备注"
          },
          {
            "point_line_surface_type": 3,
            "sort": 2,
            "z_pont": "13.408",
            "creater": "",
            "parentid": "482c8ce0286a4ddab77e08f6e4e330e9",
            "line_type": 0,
            "id": 34,
            "iconEntity": {},
            "icon_id": 0,
            "color": "#FF0000",
            "alpha": "0.2",
            "x_pont": "113.969677",
            "create_time": "2019-12-26 15:01:04",
            "y_pont": "22.537808",
            "note": "面的备注"
          }
        ]
      }
    //   mapReshowFromNet(map_json)




}, 5000);
//重现线
function lineReshowFromNet(data) {
    //由于取到的点位数据是倒叙的，且有许多冗余数据，故先过滤一遍
    let _ps = []
    let _lineType = 0
    let _options = null
    let color = Cesium.Color.fromCssColorString("#FF0000").withAlpha(0.7)
    //先对线的数据进行排序
    data.poinLineSurfaceEntities = j_sort(data.poinLineSurfaceEntities,"sort")
    // console.log("线数据排序后",data.poinLineSurfaceEntities)
    data.poinLineSurfaceEntities.forEach(item => {
        //收集点位
        _lineType = item.line_type
        color = Cesium.Color.fromCssColorString(item.color).withAlpha(parseFloat(item.alpha))
        let _cp = Cesium.Cartesian3.fromDegrees(item.x_pont, item.y_pont, item.z_pont)
        //标点
        let _p = viewer.entities.add(new Cesium.Entity({
            id: item.id,
            point_line_surface_type: item.point_line_surface_type,
            parentid: item.parentid,
            deviceType: "points",
            position: _cp,
            billboard: {
                //图片地址可以随意更改
                image: item.iconEntity.url, //直接获取当前连接
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                show: true,
                scale: 1.0,
            }
        }))
        let html = reloadCreatDiv(item.note)
        reloadDiv(item.x_pont, item.y_pont, item.z_pont, html)

        // let carPoint = _cp;
        _ps.push(_cp)

    })
    // console.log("数据：", _ps);
    if (_lineType == 0) {
        _options = {
            polyline: {
                show: true,
                positions: _ps,
                clampToGround: true,
                material: color,
                width: 3
            }
        };
        //虚线
    } else if (_lineType == 1) {
        _options = {
            polyline: {
                positions: _ps,
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
    else if (_lineType == 2) {
        _options = {
            polyline: {
                positions: _ps,
                width: 10,
                clampToGround: true,
                material: new Cesium.ImageMaterialProperty({
                    image:"./images/line_jt.png", //fangxiang
                    transparent:true, 
                    repeat:new Cesium.Cartesian2(24.0,1.0),
                    color:color
                  })
            }
        }
    }
    console.log(_options);
    viewer.entities.add(
        _options
    )

}

//重现面
function mapReshowFromNet(data) {
    //先排序
    data.poinLineSurfaceEntities = j_sort(data.poinLineSurfaceEntities,"sort")
    let color = Cesium.Color.fromCssColorString("#FF0000").withAlpha(0.2)
    let hierarchys = []
    let note = "请输入备注"
    data.poinLineSurfaceEntities.forEach(function(item,idx){
        if(idx == 0){
            note = item.note
        }
        hierarchys.push(Cesium.Cartesian3.fromDegrees(item.x_pont,item.y_pont,item.z_pont))
        color = Cesium.Color.fromCssColorString(item.color).withAlpha(parseFloat(item.alpha))
    })

    viewer.entities.add({
        name: '重绘',
        polygon: {
            hierarchy:hierarchys,
            classificationType: Cesium.ClassificationType.BOTH,
            material: color,
        }
    })
    //计算中心点
    let map_center = Cesium.BoundingSphere.fromPoints(hierarchys).center
    let cartographic = Cesium.Cartographic.fromCartesian(map_center);
    let lng = Cesium.Math.toDegrees(cartographic.longitude);
    let lat = Cesium.Math.toDegrees(cartographic.latitude);
    let height = cartographic.height;

    // console.log("计算得到的中心点：",{x:lng,y:lat,z:height})
    let div = reloadCreatDiv(note)
    reloadDiv(lng,lat,height,div)
}


//动态div
function reloadDiv(lng, lat, height, div) {
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


//标签div创建
function reloadCreatDiv(note) {
    let ohtml = document.createElement('div');
    ohtml.className = 'showText';
    let span = document.createElement("span");
    span.innerText = note
    span.setAttribute("ondblclick", "showElement(this);")
    ohtml.append(span);
    $(document.body).append(ohtml);
    $(ohtml).show();
    $(ohtml).css('left', window.innerWidth / 2 + 20 + 'px')
    $(ohtml).css('top', window.innerHeight / 2 - 38 + 'px')
    return ohtml
}

//数组排序方法
/**
 * 根据数值大小排序
 * @param {Array} datas 要排序的数据 
 * @param {String} according 排序的依据 ，比如要根据年龄字段(age)排序，则需要传入标识年龄的字段(age) ,类型：String
 * @param {Boolean} sort 是否倒叙，默认是由小到大排序
 */
function j_sort(datas,according,sort){
    //默认不用传sort这个参数，或者传false
    if(!sort){
        datas.sort(function(a,b){
            return a[according]-b[according]
        })
    }else{ //倒叙
        datas.sort(function(a,b){
            return b[according]-a[according]
        })
    }
    return datas
}


setTimeout(() => {
    tsColor()
}, 6000);


function tsColor(){
    // viewer.entities.add({
    //     rectangle:{
    //         coordinates: Cesium.Rectangle.fromDegrees(113.969807,22.537628,113.969844,22.538065),
    //         material:new Cesium.StripeMaterialProperty({
    //             orientation:Cesium.StripeOrientation.VERTICAL,
    //             evenColor:Cesium.Color.RED,
    //             oddColor:Cesium.Color.YELLOW,
    //             offset:20,
    //             repeat:10
    //         })
    //     }
    // })

    // viewer.entities.add({
    //     rectangle:{
    //         coordinates: Cesium.Rectangle.fromDegrees(113.969849,22.537704,113.9699831,22.538125),
    //         material:new Cesium.StripeMaterialProperty({
    //             orientation:Cesium.StripeOrientation.VERTICAL,
    //             evenColor:Cesium.Color.RED,
    //             oddColor:Cesium.Color.YELLOW,
    //             offset:20,
    //             repeat:10
    //         })
    //     }
    // })


    let instance = new Cesium.GeometryInstance({
        geometry: new Cesium.RectangleGeometry({
            rectangle: Cesium.Rectangle.fromDegrees(113.969849,22.537704,113.9699831,22.538125),
            vertextFormat : Cesium.EllipsoidSurfaceAppearance.VERTEX_FORMAT
        }),
        attributes : {
            color : new Cesium.ColorGeometryInstanceAttribute(1.0,0.0,0.1,0.9)
        }
    })
   let dd = viewer.scene.primitives.add(new Cesium.Primitive({
        geometryInstances : instance,
        // appearance : new Cesium.EllipsoidSurfaceAppearance({
        //     material : Cesium.Material.fromType('Stripe')
        // }),
        appearance : new Cesium.PerInstanceColorAppearance()
    }))


    //cesium缓存方式
    let cmap = new Cesium.AssociativeArray ();
    cmap.set('test',dd)

    setTimeout(function(){
        if(cmap.contains('test')){
            let a = cmap.get('test')
           console.log("aaaaa",a)
            a.show = false
        }
    },1000)

    var dataSource = new Cesium.CustomDataSource('myData');

    var entity = dataSource.entities.add({
       position : Cesium.Cartesian3.fromDegrees(113.969849,22.537704, 20),
       billboard : {
           image : 'image.png'
       }
    });
    
    viewer.dataSources.add(dataSource);

    
}
