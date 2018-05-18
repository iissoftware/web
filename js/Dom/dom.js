/**
*   添加一个类
*/
function addClass(elem,cls){
    if(!hasClass(elem,cls)){
        elem.className = elem.className.trim() + ' ' + cls;
    }
}

/**
*   移除一个类
*/
function removeClass(elem,cls){
    if(hasClass(elem,cls)){
        elem.className = elem.className.trim().replace(new RegExp(cls),'').trim();
    }
}

/**
*   是否存在某个类
*/
function hasClass(elem,cls){
    var classArray = elem.className.trim().split(' ');
    if(classArray.indexOf(cls) >= 0){
        return true;
    }else{
        return false;
    }
}
