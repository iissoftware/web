/**
*	Author: iissoftware
	Date: 2018-3-28
	Description: js一些算法
*/


/**
*	url参数解析成对象
*/
function parseQueryString(url){
	var url_arr = url.split('?')[1].split('&');
	var obj = {};
	for(var i = 0;i < url_arr.length;i++){
		var item = url_arr[i].split('=');
		obj[item[0]] = item[1];
	}
	return obj;
}


/**
*	通用的事件注册函数
	attachEvent ==> IE9以下
	addEventListener ==> 标准浏览器
*/
function addEvent(elem,eventType,fn){
	if(elem.addEventListener){
		return elem.addEventListener(eventType,fn);
	}else{
		return elem.attachEvent('on' + eventType,fn);		
	}
}


/**
*	截取空字符串
	思路：利用正则表达式可轻松去除字符串首尾空格
*/
function trim(str){
	return str.replace(/(^\s+)|(\s+$)/g,'');
}


/**
*	数组快速排序
	思路：先从数组中拿出一个数，然后遍历判断是否比该数大或者小，如果比该数大
		  就放到right数组中，比该数小放到left数组中，利用递归不断判断，最后
		  使用concat()方法把两个数组合并起来
*/
function quickSort(arr){
	if(arr.length <= 1) return arr;
	var left = [];			//存放小于center的值
	var right = [];			//存放大于center的值
	var centerIndex = Math.floor(arr.length / 2);
	var center = arr.splice(centerIndex,1);
	for(var i = 0;i < arr.length;i++){
		if(arr[i] < center){
			left.push(arr[i]);
		}else{
			right.push(arr[i]);
		}
	}
	return quickSort(left).concat(center,quickSort(right));		//递归调用
}

/**
*	数组冒泡排序
	冒泡排序：加入后一位数比前一位数小，那么进行位置交换。
*/
function bubbleSort(arr){
	var tmp;
	for(var i = 0;i < arr.length;i++){
		for(var j = i + 1;j < arr.length;j++){
			if(arr[j] < arr[i]){			//说明后一位数小于前一位数
				tmp = arr[i];				//把前一位数拿出来保存给临时变量
				arr[i] = arr[j];			//把后一位数移动到前一位
				arr[j] = tmp;				//最后把临时拿出来的数放回后一位
			}
		}
	}
	return arr;
}	



/**
*	判断字符串是否回文
	回文：就是顺序和倒叙读取相同，如aba,1221,acbbca
*/
function palindrome(str){
	str = typeof str === 'string' ? str.replace(/(^\s+)|(\s+$)/g,'') : str.toString();			//先去掉左右空格
	return str == str.split('').reverse().join('');
}


/**
*	数组去重(方法1)
	特点：利用对象Key单一特点进行自动过滤
*/
function cleanRepeat1(arr){
	var obj = {};
	var newArr = [];
	for(var i = 0;i < arr.length;i++){
		if(!obj[arr[i]]){
			obj[arr[i]] = arr[i];
			newArr.push(obj[arr[i]]);
		}
	}
	return newArr;
}


/**
*	数组去重(方法2)
	思路：定义一个新数组，判断新数组中是否第一次出现过该字符串，
	      如果没有，就将该字符添加到新数组中，有则跳过
*/
function cleanRepeat2(arr){
	var newArr = [];
	for(var i = 0;i < arr.length;i++){
		if(newArr.indexOf(arr[i]) < 0){
			newArr.push(arr[i]);
		}
	}
	return newArr;
}


/**
*	统计字符串出现最多的字符
	思路：利用去重的特点，判断如果对象key已经存在，则key的value +1来统计出现的次数
*/
function countString(str){		//abdacsadfac
	var obj = {};
	for(var i = 0;i < str.length;i++){
		!obj[str.charAt(i)] ? obj[str.charAt(i)] = 1 : obj[str.charAt(i)] += 1;
	}
	for(var i in obj){
		if(obj[i] > 1){
			return [i,obj[i]];
		}else{
			return '没有最大值';
		}
	}
}


/**
*	求数组最大差值
	思路：先求得数组最大值和最小值，最后两者相减求得差值
*/
function bothMaxValue(arr){
	var max = Math.max.apply(null,arr);		//求最大值
	var min = Math.min.apply(null,arr);		//求最小值
	return max - min;
}


/**
*	随机生成指定长度的字符串，比如 length=8; random=0xea15zw
*/
function randString(len){
	var str = '0123456789abcdefghijklmnopqrstuvwswz';
	var newStr = '';
	for(var i = 0;i < len;i++){
		newStr += str[Math.floor(Math.random() * (str.length))];
	}
	return newStr;
}


/**
*	实现类似getElementsByClassName的功能，
	不允许使用原生提供的getElementsByClassName和querySelectorAll查找函数
*/
function getElementsByClassName(ele,oParent){
	var dom = document.getElementsByTagName('*');
	var arr = [];
	for(var i = 0;i < dom.length;i++){
		var classArray = dom[i].className.split(' ');
		for(var j = 0;j < classArray.length;j++){
			if(classArray[j] == ele){
				arr.push(dom[i]);
			}
		}
	}
	return arr;
}


/**
*	js实现阶乘算法
	如：5！= 5 * 4 * 3 *2 * 1
*/
function factorial(n){
	if(n <= 1) return 1;
	return n * factorial(n - 1);
}



/**
*	求两个数组的交集
*/
function intersection(arr1,arr2){
	var newArr = [];
	for(var i = 0;i < arr1.length;i++){
		for(var j = 0;j < arr2.length;j++){
			if(arr1[i] == arr2[j]){
				newArr.push(arr1[i]);
			}
		}
	}
	return newArr;
}


/**
*	求两个数组的并集
*/
function union(arr1,arr2){
	var newArr = [];
	var obj = {};
	var arr = arr1.concat(arr2);
	for(var i = 0;i < arr.length;i++){
		if(!obj[arr[i]]){
			obj[arr[i]] = arr[i];
			newArr.push(obj[arr[i]]);
		}
	}
	return newArr;
}


/**
*	提取两个数组中的差异元素
	如：[1, "calf", 3, "piglet"],[1, "calf", 3, 4]  ==> ["piglet", 4]
*/
function diff(arr1,arr2){
	var arr = arr1.concat(arr2);
	var newArr = [];
	var obj = {};
	for(var i = 0;i < arr.length;i++){
		if(!obj[arr[i]]){
			obj[arr[i]] = 1;
		}else{
			obj[arr[i]] += 1;
		}
	}
	for(var i in obj){
		if(obj[i] <= 1){
			newArr.push(i);
		}
	}
	console.log(newArr)
}



/**
*	求得指定日期的上一天
*/
function nextDate(date){
	var nowTime = new Date(date);
	var yesTime = nowTime.getTime() - 24 * 60 * 60 * 1000;	//当前时间的总毫秒数 - 1天的总毫秒数
	nowTime.setTime(yesTime);				//设置当前时间
	var year = nowTime.getFullYear();		//获取年份
	var month = nowTime.getMonth() + 1;		//获取月份
	var day = nowTime.getDate();			//获取日份
	if(month < 10) month = '0' + month;
	return year + '-' + month + '-' + day;
}


/**
*	对象深拷贝
*/
function deepCopy(obj){
	var newObj = {};
	if(obj instanceof Array) newObj = [];
	for(var key in obj){
		newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
	}
	return newObj;
}


/**
*	求1-10000中0的出现个数
	start: 开始数字
	end: 结束数字
	target: 匹配的目标对象
*/


function numCount(start,end,target){
	var i = start,str = '';
	for(;i <= end;i++){
		str += i;
	}
	return str.match(new RegExp(target,'g')).length;
}



/**
*	防抖动
*/
function debounce(fn,delay){
	var timer = null;
	return function(){
		var context = this;
		var args = arguments;
		clearTimeout(timer);
		timer = setTimeout(function(){
			fn.apply(context,args);
		},delay);
	}
}


/**
*	ajax封装
*/
function ajax(opt){
	opt.url = opt.url || '';
	opt.type = opt.type.toUpperCase() || 'POST';
	opt.async = opt.async || true;
	opt.data = opt.data || null;
	opt.success = opt.success || function(){};
	var xmlhttp = null;
	if(window.XMLHttpRequest){
		xmlhttp = new XMLHttpRequest();
	}else{
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	}

	var data = [];					//用来保存提交过来的数据
	for(var key in opt.data){
		data.push(key + '=' + opt.data[key]);
	}
	var postData = data.join('&');

	if(opt.type === 'POST'){
		xmlhttp.open(opt.type,opt.url,opt.async);
		xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded;charset=utf-8');
		xmlhttp.send(postData);
	}else if(opt.type === 'GET'){
		xmlhttp.open(opt.type,opt.url + '?' + postData,opt.async);
		xmlhttp.send();
	}
	xmlhttp.onreadystatechange = function(){
		if(xmlhttp.readyState == 4){
			if(xmlhttp.status == 200){
				opt.success(xmlhttp.responseText);
			}
		}
	}
}


/**
*	求水仙花数
	水仙花数：是一种特殊的三位数，它的特点就是，每个数位的立方和，等于它本身
	如 153就是水仙花数，因为13+53+33 = 153
*/
function specialNumber(){
	var arr = [];
	for(var i = 100;i <= 999;i++){
		i = String(i);
		if(i == (Math.pow(i[0],3) + Math.pow(i[1],3) + Math.pow(i[2],3))){
			arr.push(i);
		}
	}
	return arr;
}


/**
*	求数组中两个数字之间的和
	如：[5,10] ==> 5 + 6 + 7 + 8 + 9 + 10 = 45
*/
function sum(min,max){
	min = Math.min(min,max);
	max = Math.max(min,max);
	var sum = 0;
	for(var i = min;i <= max;i++){
		sum += i;
	}
	return sum;
}


/**
*	首字符大写
*/
function capitalize(str){
	return str.charAt(0).toUpperCase() + str.slice(1);
}


/**
*	某个属性是否是某个对象的本地属性
*/
function hasOwn(obj,key){
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	return hasOwnProperty.call(obj,key);
}


/**
*	监听一个对象属性的实时变化
	该方法一共有6个属性：enumerable,configurable,writable,value,get,set
	注意：若对象中有get和set属性，就不能有value和writable属性并存。
	兼容性：IE9以下不兼容。所以vuejs,angularjs在IE9以下版本不可用
*/
function observe(obj,key,val,target){
	Object.defineProperty(obj,key,{
		enumerable: false,			//对象属性是否可枚举
		configurable: true,			//总开关，为false时，对象属性不能被重写和设置
		get: function(){
			return val;				//当获取一个对象属性时，该方法触发
		},
		set: function(newVal){
			if(val !== newVal){		//当对一个对象属性设置时，该方法触发
				val = newVal;
			}
			target.innerHTML = val;
		}
	});
}


/**
*	将16进制颜色转化为rgb
	index * 16 + index
	ff4abc
*/
function rgb(color){
	var arr = [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'];
	color = color.substring(1);
	for(var i = 0;i < color.length;i++){
		console.log(color[i])
	}
}

/**
*	 字符串首字母大写
*/
String.prototype.toCapitalize = function(){
	return this[0].toUpperCase() + this.substr(1);
}

/**
*	检查一个变量数据类型
*/

function type ( obj ) {
	var core_toString = {}.toString;
	if( obj == null ) {
		return String( obj );
	}
	return typeof obj === 'object' || typeof obj === 'function' ? core_toString.call( obj ) || 'object' : typeof obj;
}
