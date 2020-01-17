var config = (function (conf) {
    conf.webSize="small";//big   small
    conf.VERSION = '0.0.4'; //版本号
    conf.PRODUCTION = 'CHIAN'; //(产品号) CHIAN      
    conf.CONTEXT = {
        'HOST': '127.0.0.1',
        'PORT': '8080',
        'APPLICATION': ""//"demo"
    };
    //上下文路径
    conf.CONTEXTPATH = "http://" + window.location.host + "/" + conf.CONTEXT.APPLICATION; //"http://"+conf.CONTEXT.HOST+":"+conf.CONTEXT.PORT+"/"+conf.CONTEXT.APPLICATION;
    //三维窗口大小
    conf.pluginwidth = 0;
    conf.pluginheight = 0;

    //CEP文件路径   
   // conf.CEP_FOLDER_PATH = "‪G:\\Package_人才公园\\人才公园.cep";  //‪F:\ghy500\1.cep
    conf.CEP_PATH = "‪G:\\Package_人才公园\\人才公园.cep";//'智慧南山_主场景.cep';   智慧南山_主场景-华为演示.cep
  //  conf.CEP_DATA = conf.CEP_FOLDER_PATH + 'data';
    //行政服务大厅全景
    conf.xzfwdt_path = "https://gz.kangyun3d.com/projects/nsxza/";
    conf.currentState = 0;//当前状态  默认三维场景0   全景1
    //模型库FDB连接地址
    conf.MODEL_LIBRARY_CONNECTSTR = 'ConnType=FireBird2; DataBase=' + conf.CEP_FOLDER_PATH + 'sck.fdb';
    conf.MODEL_LIBRARY_DATASETNAME = 'MaterialDataSet';
    conf.MODEL_LIBRARY_OBJECTCLASSNAME = 'ModelLib';
    //东门坐标系WKT
    conf.DONGMEN_WKT = 'PROJCS["UTM Zone 50, Northern Hemisphere",GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433],AUTHORITY["EPSG","4490"]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",114],PARAMETER["scale_factor",1],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],UNIT["metre",1]]';
    //南山坐标系WKT
    conf.NANSHAN_WKT = 'PROJCS["CGCS2000_3_Degree_GK_CM_114E",GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["central_meridian",114],PARAMETER["false_easting",11038],PARAMETER["false_northing",-2486635],PARAMETER["latitude_of_origin",0],PARAMETER["scale_factor",1],UNIT["metre",1]]';
    // conf.NANSHAN_WKT = 'PROJCS["CGCS2000_3_Degree_GK_CM_114E",GEOGCS["GCS_China_Geodetic_Coordinate_System_2000",DATUM["D_China_2000",SPHEROID["CGCS2000",6378137.0,298.257222101]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433]],PROJECTION["Gauss_Kruger"],PARAMETER["central_meridian",114],PARAMETER["false_easting",500000],PARAMETER["false_northing",0],PARAMETER["latitude_of_origin",0],PARAMETER["scale_factor",1],UNIT["metre",1]]';
    //WGS84坐标系
    conf.WGS84_WKT = 'GEOGCS["GCS_WGS_1984",DATUM["D_WGS_1984",SPHEROID["WGS_1984",6378137.0,298.257223563]],PRIMEM["Greenwich",0.0],UNIT["Degree",0.0174532925199433],AUTHORITY["EPSG","4326"]]';

    //初始场景路径
    conf.HOME_PATH = '初始场景';
    //安保图层
   conf.tree={
      "jiankong":"安保图层\\视频监控",
      "yanhua":"安保图层\\文艺晚会疏导图",
      "zhongdian":"安保图层\\焰火晚会安保图",
      "fangxian":"安保图层\\南山分局管控图",
      "quyu":"安保图层\\海域安全警戒图",
      "huiyan":"安保图层\\重点位置",

   };
   //视频服务器地址
   conf.videoPath="rtsp://190.32.33.80:8554/";
   //后台人员推送接口
   conf.peoplePath="http://190.32.33.80:9092/webSocketServer";
   conf.peoplePathHt="/queue/shangtang/videowarning/message";
   return conf;
})(window.config || {});
