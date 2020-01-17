// let basGraphic = new BaseGraphic(viewer);
// let basGraphic = window.basGraphic
let measureTools = new MeasureTools(viewer);

let toolUse = {
    measureTools:measureTools,
    basGraphic:window.basGraphic,
    statu:false,//是否在标记或者测量状态
    drawPoint : drawPoint, //标点函数
    drawPolygon: drawPolygon, //画面
    drawLineString:drawLineString, //画线
    removeFromDevmap:removeFromDevmap,
    homeLng:113.97025613534363,
    homeLat:22.541192996412686,
    heading:3.279304500963121,
    pitch:-0.25239072362282485,
    roll:6.283185307179583
}
window.toolUse = toolUse;
/**
 * 标点
 * @param {*} pointType 
 */
var points = []
var polygons = []
var lines = []
function drawPoint(pointType){
    toolUse.statu = true
    if(pointType){
        basGraphic.point_type = pointType
    }
    
    basGraphic.drawPoint(function(p){
        toolUse.statu = false
        if(p){
            // console.log("dddddd就是就是就",p)
            let _ps = []
            if(devMap.containsKey("points")){
                _ps = devMap.get("points")
            }
            _ps.push(p)
            // points.push(p)
            devMap.put("points", _ps);
        }
        
        
    })
}
//区域标识
function drawPolygon(color){

    if(color){
        basGraphic.polygonColor = color;  
    }
    
    basGraphic.drawPolygon(function(data){
        if(data){
            polygons.push(data)
            devMap.put("polygons", polygons);
        }
    });
}


function drawLineString(type,color){
    // new Cesium.Color(255.0 / 255.0, 127.0 / 255.0, 0.0, 1.0)
    
    let colors = [
        Cesium.Color.fromCssColorString("#FF0000").withAlpha(0.7), //#FF0000
        Cesium.Color.fromCssColorString("#800080").withAlpha(0.7), //#800080
        Cesium.Color.fromCssColorString("#008080").withAlpha(0.7), // #008080
        Cesium.Color.fromCssColorString("#87CEEB").withAlpha(0.7), // #87CEEB
        Cesium.Color.fromCssColorString("#7CFC00").withAlpha(0.7), //#7CFC00
        Cesium.Color.fromCssColorString("#FF8C00").withAlpha(0.7), //#FF8C00
    ]
    basGraphic.drawLineString(type,colors[color],function(l,p){
        if(l){
            lines.push(l)
            devMap.put("polyLine", lines);
        }
        if(p){
           devMap.put('linePoint',p);
        }
    });
}

function removeFromDevmap(){
    rm("points")
	rm("polygons")
    rm("polyLine")
    rm("linePoint")
    function rm(key){
        if(devMap.containsKey(key)){
            let ps = devMap.get(key);
            ps.forEach(item => {
               viewer.entities.remove(item); 
            });
            $(".showText").hide();
        }
    }
}


