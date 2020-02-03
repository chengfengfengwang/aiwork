    //shareinstall初始化，初始化时将与shareinstall服务器交互，应尽可能早的调用
    /*web页面向app传递的json数据(json string/js Object)，应用被拉起或是首次安装时，通过相应的
     android/ios api可以获取此数据*/
    var data = ShareInstall.parseUrlParams();//shareinstall.js中提供的工具函数，解析url中的所有查询参数
    new ShareInstall({
        appKey : '2KBKKFAK2E26FF',
        //可选项，微信中打开自定义遮罩层
        //shadow : function(){
        //  return "<div id='shareinstall_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
        // },
        /*可选参数，是否优先考虑下载app，以牺牲唤醒为代价*/
        //preferInstall:true,
        /*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
        //preferWakeup:true,
       /*可选参数，微信中直接跳下载*/
        //weChatdownload:true,
        onready : function() {
            //shareinstall已成功回调
            console.log('shareinstall已成功回调')
            var m = this, button = document.getElementById("downloadButton");
            button.style.visibility = "visible";

            //用户点击某个按钮时(假定按钮id为downloadButton)，安装app
            button.onclick = function() {
                m.wakeupOrInstall();
            }
        }
    }, data);
