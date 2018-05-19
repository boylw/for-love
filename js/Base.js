/**
 * Created by liuwenwu on 2017/9/17.
 */
/**
 * Created by liuwenwu on 2017/9/16.
 */
//$类
function $(obj){
    var top = obj.charAt(0); // 获取第一个字符
    var bottom = obj.substr(1);// 获取后面的字符
    switch (top){
        case "#" :
            return document.getElementById(bottom);
            break;
        case ".":
            return getclassName(bottom);
            break;
        default :
            return document.getElementsByTagName(obj);
    }
}
//scrollTop类
function scrollTop(){
    if (window.pageYOffset != null){
        return{
            left : window.pageXOffset,
            top : window.pageYOffset
        }
    }
    else if (document.compatMode == "CSS1Compat"){
        return{
            left : document.documentElement.scrollLeft,
            top : document.documentElement.scrollTop
        }
    }
    else if (document.compatMode == "BackCompat"){
        return{
            left : document.body.scrollLeft,
            top : document.body.scrollTop
        }
    }
}
// client类
function client(){
    if (window.innerWidth != null){
        return{
            width:window.innerWidth,
            height: window.innerHeight
        }
    }
    else if (document.documentMode == "CSS1Compat"){
        return{
            width : document.documentElement.clientWidth,
            height: document.documentElement.clientHeight
        }
    }
    else if(document.documentMode == "BackCompat"){
        return{
            width: document.body.clientWidth,
            height : document.body.clientHeight
        }
    }
}
//className 类
function getclassName(classname,id){
    if (document.getElementsByClassName){
        if (id){
            var id = $(id);
            return id.getElementsByClassName(classname);
        }
        else{
            return document.getElementsByClassName(classname);
        }
    }
    else{
        if (id){
            var id = $(id);
            var s=[], ss=[],dom=[];
            s = id.getElementsByTagName("*");
            for (var i=0;i< s.length;i++){
                dom[i] = s[i].className.split(" ");
                for (var j=0;j< dom.length;j++){
                    if (dom[j] == classname){
                        ss.push(s[i]);
                    }
                }
            }
            return ss;
        }
        else{
            var s=[], ss=[],dom=[];
            s = document.getElementsByTagName("*");
            for (var i=0;i< s.length;i++){
                dom[i] = s[i].className.split(" ");
                for (var j=0;j< dom.length;j++){
                    if (dom[j] == classname){
                        ss.push(s[i]);
                    }
                }
            }
            return ss;
        }
    }
}

//动画函数
/**
 * Created by liuwenwu on 2017/10/9.
 */
function animate (obj,json,fn){
    clearInterval(obj.timer);
    obj.timer = setInterval(function () {
        var flat =true;// 判断是否全部达到
        for (var attr in json){
            var current = 0;
            var terget = parseInt(json[attr]); // 返回目标的style
            if ("opacity" == attr){
                current = parseInt(Math.round(getStyle(obj,attr)*100)) || 0;
                //console.log(current);
            }
            else{
                current = parseInt(getStyle(obj,attr)); // 返回当前的style
            }
            var step = (terget - current) / 10;
            step = step >0 ?Math.ceil(step) : Math.floor(step);

            if ("opacity" == attr){
                if("opcity" in obj.style){
                    obj.style.opacity = (current + step) /100;
                }
                else
                {  // obj.style.filter = alpha(opacity = 30)
                    obj.style.filter = "alpha(opacity = "+(current + step)* 10+")";

                }
            }
            else if(attr == "zIndex")
            {
                obj.style.zIndex = json[attr];
            }
            else
            {
                obj.style[attr] = current  + step + "px" ;
            }
            if (current != terget){
                flat = false;
            }
        }
        if (flat){
            clearInterval(obj.timer);
            if(fn){
                fn();
            }
        }
    },40);
}
function getStyle(obj,attr){
    if (obj.currentStyle){
        return obj.currentStyle[attr];
    }
    else{
        return window.getComputedStyle(obj,null)[attr];
    }
}