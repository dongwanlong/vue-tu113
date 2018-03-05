var backBaseUrl = "http://39.106.64.5:80/";         //线上服务
//var backBaseUrl = "http://127.0.0.1:80/";       //本机测试服务

var config = {
    imgsType: {
        funny:"funny",          //搞笑
        battle:"battle",        //热血
        food:"food",            //美食
        suspense:"suspense",    //悬疑
        animation:"animation",  //动画
        movie:"movie",          //电影
        tv:"tv",                //电视剧
        show:"show",            //综艺节目        
    },
    typeSet:[
        {value:"funny", label:"搞笑"},
        {value:"battle", label:"热血"},
        {value:"food", label:"美食"},
        {value:"suspense", label:"悬疑"},
        {value:"animation", label:"动画"},
        {value:"movie", label:"电影"},
        {value:"tv", label:"电视剧"},
        {value:"show", label:"综艺节目"},
    ],
    backSet: {
        staticUpload:backBaseUrl+"static/upload/",        //静态缓存路径 
        uploadClear:backBaseUrl+"upload-clear",           //清空缓存上传图片           
        upload:backBaseUrl+"upload",                      //上传单个图片
        uploadRm:backBaseUrl+"upload-rm",                 //删除单个图片
        addImg:backBaseUrl+"add-img",                     //添加图组
        editImg:backBaseUrl+"edit-img",                   //编辑单个图组
        imgs:backBaseUrl+"imgs",                          //获取图组列表
        img:backBaseUrl+"img",                            //获取单个图组
        addSource:backBaseUrl+"add-source",               //添加作品
        editSource:backBaseUrl+"edit-source",             //编辑作品
        sources:backBaseUrl+"sources",                    //获取作品列表
        source:backBaseUrl+"source",                      //获取单个列表
        rmSource:backBaseUrl+"source-rm",                 //删除单个作品   
        rmImg:backBaseUrl+"img-rm",                       //删除单个图组               
              
    }
};

export default config;