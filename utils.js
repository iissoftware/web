//去除数组重复对象，兼容IE8浏览器
function deleteArrayRepeatObject(arr) {
	var unique = [], obj = {};
	for(var i = 0; i < arr.length; i++) {
        if(!Object.keys) {
            Object.keys = (function() {
                'use strict';
                var hasOwnProperty = Object.prototype.hasOwnProperty,
                    hasDontEnumBug = !({ toString: null }).propertyIsEnumerable('toString'),
                    dontEnums = [
                      'toString',
                      'toLocaleString',
                      'valueOf',
                      'hasOwnProperty',
                      'isPrototypeOf',
                      'propertyIsEnumerable',
                      'constructor'
                    ],
                    dontEnumsLength = dontEnums.length;
                return function(obj) {
                    if (typeof obj !== 'function' && (typeof obj !== 'object' || obj === null)) {
                        throw new TypeError('Object.keys called on non-object');
                    }
                    var result = [], prop, i;
                    for (prop in obj) {
                    if (hasOwnProperty.call(obj, prop)) {
                            result.push(prop);
                        }
                    }
                    if (hasDontEnumBug) {
                        for (i = 0; i < dontEnumsLength; i++) {
                            if (hasOwnProperty.call(obj, dontEnums[i])) {
                                result.push(dontEnums[i]);
                            }
                        }
                    }
                    return result;
                }
            }());
        }
        var keyArr = Object.keys(arr[i]);
        keyArr.sort(function(a, b) {
            return (Number(a) - Number(b));
        });
        var str = '';
        for(var j = 0; j < keyArr.length; j++) {
            str += JSON.stringify(keyArr[j]);
            str += JSON.stringify(arr[i][keyArr[j]]);
        }
        if(!obj.hasOwnProperty(str)) {
            uniques.push(arr[i]);
            obj[str] = true;
        }
    }
    return uniques;
}