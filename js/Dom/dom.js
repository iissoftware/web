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


/**
*   通过class查询节点
*/
function byClass(cls){
    var chilren = document.getElementsByTagName('*') || document.all;
    var arr = [];
    for(var i = 0;i < chilren.length;i++){
        var child = chilren[i];
        var clsName = child.className.split(' ');
        for(var j = 0;j < clsName.length;j++){
            if(cls == clsName[j]){
                arr.push(child);
            }
        }
    }
    return arr;
}
