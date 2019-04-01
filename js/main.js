/*js*/
var OnOff = true;
window.onload = function () {

    var screenHeight = document.body.offsetHeight || document.documentElement.offsetHeight;
    var shortcut = getElementsClass("shortcut")[0];
    var GoBack = getElementsClass("GoBack")[0];
    var search = getElementsClass("search")[0];
    var searchImg = search.getElementsByTagName("img")[0];
    var searchText = search.getElementsByTagName("input")[0];
    searchImg.timer = null;
    searchText.OnOff = false;
    var shortcutWindow = getElementsClass("shortcut")[0].getElementsByTagName("li")[5];
    shortcutWindow.OnOff = true; //还没打开
    var shortcutWindowP =getElementsClass("shortcutWindowP")[0];
    var shortcutWindowImg=getElementsClass("shortcutWindowImg")[0];
    //logo模块变量
    var logoPage = getElementsClass("logoPage")[0];
    var closeBtn = logoPage.getElementsByTagName("p")[0];
    var openBtn = document.getElementById("logo");

    //视频模块变量
    var detailVidBox =getElementsClass("detailVidBox")[0];
    var vidPlayBtnArr = getElementsClass("vidPlayBtn");
    var vidArr = detailVidBox.getElementsByTagName("video");
    var prevVid = null;

    var j = 0; //全局通用循环变量
    shortcutWindow.prevClass ="hello";
    shortcutWindow.timer = null;




    searchImg.onclick = function(){
            clearTimeout(searchImg.timer);

        if(searchText.value=="" &&searchText.OnOff){
            searchText.OnOff = false;
            searchText.style.cssText = "width:0px;margin-left:200px;opacity:0";
            searchImg.timer=setTimeout(function (){
                displayFunc(searchText,"none");
                searchImg.style.cssText="margin-left:100px";
                searchText.style.opacity="100";
                clearTimeout(searchImg.timer);
            },500);


            /*searchImg.timer=setTimeout(
                displayFunc(searchText,"none")
            ,3000);*/  //怪异问题
        }
        else if(searchText.value==""&& !searchText.OnOff){
            searchText.OnOff=true;
            searchText.style.opacity="0";
            searchImg.style.cssText="margin-left:0px";
            displayFunc(searchText,"block");
            searchImg.timer=setTimeout(
                function () {
                    searchText.style.cssText="width:200px;margin-left:10px;opacity:100";
                    clearTimeout(searchImg.timer);
                },600);

        }else{
            //window.location.href="http://www.baidu.com"; //直接在当前页面跳转
            window.open("http://www.baidu.com/s?wd="+searchText.value);
            searchText.value = "";
        }
    };
    document.onkeydown = function(e){
          e = e || event;
          if(e.keyCode==13&&!searchText.value==""){
              window.open("http://www.baidu.com/s?wd="+searchText.value);
              searchText.value = "";
          }
    };

    logoPage.style.top = document.documentElement.scrollTop+"px";
    shortcut.style.top = document.documentElement.scrollTop-100+"px";

    //shortcut跟随屏幕移动
    window.onscroll= function(){
        var oTop = document.documentElement.scrollTop;
        logoPage.style.top = oTop+"px";
        shortcut.style.top = oTop-100+"px";
    };

    window.onmousewheel = function () {
        OnOff = false;
    }
    getElementsClass("GoBack")[0].onclick = function () {
        OnOff = true;
        //window.scrollTo(0,0);//返回顶部 无动画
        smoothScroll(); //引用返回顶部函数 有动画
    };



    var shortcutWindowArr = ['GoWechat','GoQq','GoXing','GoPhone'];

    for(j=0;j<shortcutWindowArr.length;j++){
        showShortcutWindowFunc(shortcutWindowArr[j]);
    }

    //原始事件绑定


        //封装函数打开方法
    function showShortcutWindowFunc(classnames){
        getElementsClass(classnames)[0].onclick= function() {
            var color = 0;
            clearTimeout(shortcutWindow.timer);
            switch (classnames) {
                case 'GoWechat':
                    color = "#000";
                    break;
                case 'GoQq':
                    color = "#3ce0e2";
                    break;
                case 'GoXing':
                    color = "#ffaf00";
                    break;
                default :
                    color = "#000000";
                    break;
            }


            if(shortcutWindow.OnOff ){ //&& shortcutWindow.prevClass!=classnames
                openShortcutWindow();
                shortcutWindow.OnOff = false;
                shortcutWindowImg.src = 'img/'+classnames+'.jpg';
                shortcutWindowP.style.cssText = "color:"+color+";";
                if(classnames=="GoPhone"){
                    shortcutWindowP.innerHTML = "要我电话~不告诉你~~";
                }
                else{
                    shortcutWindowP.innerHTML="关注有更多内容哦！";
                }

            }
            else if (!shortcutWindow.OnOff&&shortcutWindow.prevClass!=classnames){
                closeShortcutWindow();
                shortcutWindow.timer =setTimeout(
                    function () {
                        openShortcutWindow();
                        shortcutWindowImg.src = 'img/'+classnames+'.jpg';
                        shortcutWindowP.style.cssText = "color:"+color+";";
                        if(classnames=="GoPhone"){
                            shortcutWindowP.innerHTML = "要我电话~不告诉你~~";
                        }
                        else{
                            shortcutWindowP.innerHTML="关注有更多内容哦！";
                        }
                    },500)
                /**/

            }
            else{
                closeShortcutWindow();
                shortcutWindow.OnOff = true;
            }
            shortcutWindow.prevClass = classnames;
        }
    }

    function openShortcutWindow() {
        shortcutWindow.style.width=300+"px";
        shortcutWindowImg.style.cssText ="opacity:100;width:200px;";
        shortcutWindowP.style.cssText = "opacity:100;color:red;";
    }
    function closeShortcutWindow() {
        shortcutWindow.style.width=0+"px";
        shortcutWindowImg.style.cssText="opacity:0;width:0px;";
        shortcutWindowP.style.cssText = "opacity:0;color:black;";
    }

    //登陆模块

    //关闭打开窗口
    openBtn.onclick = function () {
        logoPage.style.cssText = "display:block;";
    };
    closeBtn.onclick = function () {
        logoPage.style.cssText = "display:none;";
    };

    //视频模块
    for(j=0;j<vidPlayBtnArr.length;j++){
        vidPlayBtnArr[j].index = j;
        vidPlayBtnArr[j].OnOff = true;
        vidArr[j].index = j;

        vidPlayBtnArr[j].onclick = function () {
            if(this.OnOff){
                if(prevVid){
                    if(prevVid.index!=this.index){
                        prevVid.pause();
                        vidPlayBtnArr[prevVid.index].OnOff = true;
                        vidPlayBtnArr[prevVid.index].style.cssText = "display:block";
                    }
                }
                vidArr[this.index].play();
                this.OnOff = false;
                this.style.cssText = "opacity:0";
                prevVid=vidArr[this.index];
                /*this.style.cssText = "display:none";*/
            }
            else{
                vidArr[this.index].pause();
                this.OnOff = true;
                this.style.cssText = "display:block";
                /*this.style.cssText = "opacity:50%";*/
            }
        }

    }


};



function displayFunc(obj,event) {
    obj.style.display = event;
}

//封装寻找class类函数
function getElementsClass(classnames){

    var classObj = new Array(); //定义数组
    var classInt = 0; //定义数组下标
    var tags = document.getElementsByTagName("*"); //获取HTML的标签
    for(var i in tags){ //对标签进行遍历
        if(tags[i].nodeType==1) //判断节点类型
            if(tags[i].getAttribute("class")==classnames){
                classObj[classInt] =tags[i];
                classInt++;
            }
    }
    return classObj; //返回组成的数组
}

//封装返回顶部函数
function smoothScroll(ev) {
    var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;

    if(currentScroll>1&&OnOff){
        window.requestAnimationFrame(smoothScroll);
        window.scrollTo(0,currentScroll-(currentScroll/5));
    }

    else{
        return false;
    }
};



