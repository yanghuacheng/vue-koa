/**
 * 大疆无人机对接
 * Create by @AC
 */

 var DJI = function(jquery,option){
    var _self = this;
    var _drone = {
        sn : "",
        name:"",
        type:"",
        teamId:"",
        date:"",
        lat:0,
        lng:0,
        altitude:0,
        speed:0,
        yaw:0,
        batteryLevel:100,
        homeLat:0,
        homeLng:0
    };

    _self._baseUrl = "http://190.32.33.94/fhsdk/v3";
    _self._headers = {      //请求头
        "fh-ts": "1553138384575",
        "fh-appid": "fhappid_sdk", 
        "fh-sign":"AQzwfw9t8b43AKsjAdnfBwFScxQ="
    };

    //获取无人机sn
    _self.getSn = function(callback){  
        var drones;      
        jquery.ajax({
            type: "get",
            url: _self._baseUrl+"/online/drones",
            headers: _self._headers,
            contentType: "application/json",
            dataType: "json",
            async:true,
            success: function(resp){
                // console.log(resp);    
                callback(resp);            
                // if(0==resp.code){
                //     drones = resp.data.drones;
                //     if(drones.length == 0){
                //         console.error("未检测到无人机！");
                        
                //         return "";
                //     }else if(sn){                        
                //         for(var i=0;i<drones.length;i++){
                //             if(sn == drones[i].sn){                                
                //                 return drones[i];
                //             }
                //         }
                //         // _self.startPlay(drones[0].sn);//开始播放
                //     }
                // }              
            },
            error:function(){
                callback(false);
                console.log('error');
            }
        })
        // return drones;
    }

    //获取无人机的视频播放地址
    _self.getVideoUrl = function(sn,callback){
        var url = "";
        jquery.ajax({
            type: "get",
            url: _self._baseUrl + "/drones/"+sn+"/stream/play",
            headers: _self._headers,
            contentType: "application/json",  //推荐写这个
            dataType: "json",
            async:true,
            success: function(resp){
                console.log("dddddddd",resp);
                if(0==resp.code){
                    url = resp.data.rtmp.playUrl;    
                    callback(url);                
                }else{
                    callback(false);
                    console.error("未检测到视频！");
                }
            },
            error:function(){
                callback(false);
                console.log('error');
            }
        })
        // return url;
    }

    //开始播放
    _self.startPlay = function(sn,callback){
        var url= "";//_self.getVideoUrl(sn);
        if(!url){            
            jquery.ajax({
                type: "put",
                url: _self._baseUrl + "/remote/"+sn+"/livestreaming/start",
                headers: _self._headers,
                contentType: "application/json",  //推荐写这个
                dataType: "json",
                async:true,
                success: function(resp){
                    console.log(resp);
                    if(0==resp.code){
                    //    debugger
                        _self.getVideoUrl(sn,function(murl){
                            callback(murl);    
                        });   
                                       
                    }else{
                        console.error("直播失败！");
                        callback(false);  
                    }
                },
                error:function(){
                    callback(false); 
                    console.log('error');

                }
            })
        }
        // return url;
    }
 }
