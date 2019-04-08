module.exports = {
    isMobile() {            //是否是移动端
        let reg = /Android|webOS|iPhone|iPod|BlackBerry/i;
        if(reg.test(navigator.userAgent)) {
            return true;
        }
    },
    formatData(time) {          //格式化日期 xxxx-xx-xx
        var date = new Date(time),
            year = date.getFullYear(),
            month = date.getMonth() + 1,
            day = date.getDate();
        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;
        return year + '-' + month + '-' + day;
    },
    setItem(name, value) {              //设置浏览器缓存
        if(typeof value !== 'object') {
            localStorage.setItem(name, value);
        } else {
            localStorage.setItem(name, JSON.stringify(value));
        }
    },
    getItem(name) {             //获取浏览器缓存数据
        let val = localStorage.getItem(name);
        if(typeof val == 'string') {
            return val;
        } else {
            return JSON.parse(val);
        }
    },
    removeItem(name) {          //删除浏览器缓存中指定的name
        localStorage.removeItem(name);
    },
    toRepeat(array, field) {           //数组去重
        var newArr = [], obj = {};
        for(var i = 0; i < array.length; i++) {
            if(!obj[array[i][field]]) {
                newArr.push(array[i]);
                obj[array[i][field]] = array[i];
            }
        }
        return newArr;
    },
    arrayCategory(arr, filed, parentNodeName, childNodeName) {          //根据字段进行分类
        var uniqueArr = this.toRepeat(arr, filed);
        var newArr = [];
        for(var i = 0; i < uniqueArr.length; i++) {
            var obj = {};
            obj[parentNodeName] = uniqueArr[i][filed];
            obj[childNodeName] = [];
            obj['id'] = (i + 1) * 999999;
            obj['treeId'] = 0;
            newArr.push(obj);
        }
        for(var i = 0; i < newArr.length; i++) {
            for(var j = 0; j < arr.length; j++) {
                if(newArr[i][parentNodeName] == arr[j][filed]) {
                    newArr[i][childNodeName].push(arr[j]);
                }
            }
        }
        return newArr;
    },
    formatYear(date) {          //只返回年份
        return new Date(date).getFullYear();
    },
    sortRule(property) {            //根据某个属性进行升序排序
        return function(a, b) {
            var value1 = a[property];
            var value2 = b[property];
            return value1 - value2;
        }
    },
    openLayerIframe($title, $zIndex, $width, $height, $url, $shade, $type) {
        if(this.isMobile()) $height = '500px';
        parent.layer.open({
            type: $type || 2,
            title: $title,
            shade: $shade || 0.3,
            shadeClose: true,
            zIndex: $zIndex,
            maxmin: true,
            anim: 0,
            fixed: true,
            btn: ['确定'],
            area: [$width, $height],
            content: $url,
        });
    },
    openSubLayerIframe($title, $zIndex, $width, $height, $url, $shade, $type) {         //新增、修改调用此方法
        parent.layer.open({
            type: $type || 2,
            title: $title,
            shade: $shade || 0.3,
            shadeClose: true,
            zIndex: $zIndex,
            maxmin: true,
            anim: 0,
            fixed: true,
            btn: ['确定'],
            area: [$width, $height],
            content: $url,
            success: function() {
                $(':focus').blur();
            },
            end: function() {               //关闭弹窗的时候记得销毁window上的idArr变量
                if(parent.idArr) delete parent.idArr;//id集合
                if(parent.getData) delete parent.getData;//新增修改后要刷新的方法
                if(parent.obj) delete parent.obj;//自定义对象
            }
        });
    },
    compareByAttr(attr) {           //根据属性升序排列 例如：arr.sort(compareByAttr('id'));
        return function(a, b) {
            return a[attr] - b[attr];
        }
    },
    deepClone(origin, target) {           //对象深度克隆
        let obj = target || {},
            toStr = Object.prototype.toString,          //判断类型
            arrType = '[object Array]';
        for(let key in origin) {
            if(origin.hasOwnProperty(key)) {            //判断是不是属于自己的属性
                if(typeof origin[key] === 'object' && origin[key] !== null) {
                    if(toStr.call(origin[key]) === arrType) {
                        obj[key] = [];
                    } else {
                        obj[key] = {};
                    }
                    this.deepClone(origin['key'], obj[key]);
                } else {
                    //基本类型
                    obj[key] = origin[key];
                }
            }
        }
        return obj;
    },
    isNull(val) {
        return Object.prototype.toString.call(val) === '[object Null]';
    }
}