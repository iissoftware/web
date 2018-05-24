;(function(global,factory){
    factory(global);
})(this,function(global){
    var
    rquickExpr = /^(?:\s*\.([\w-]*)|#([\w-]*))$/,
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    jQuery = function( selector,context ) {
        return new jQuery.fn.init( selector,context );
    };

    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,
        init: function( selector,context ){
            var elem, match;

            //$(''), $(false), $(undefined), $(null)
            if ( !selector ) {
                return this;
            }

            //如果是HTML或者字符串
            if ( typeof selector === 'string' ) {
                if ( selector.charAt(0) === '<' && selector.charAt( selector.length - 1 ) === '>' && selector.length >= 3) {
                    match = [ null, selector, null ];
                } else {
                    match = rquickExpr.exec( selector );
                }
                if ( match && ( match[1] || !context )) {
                    if ( match[1] ) {
                        context = context instanceof jQuery ? context[0] : context;
                        var arr = jQuery.parseHTML( match[1], context && context.nodeType ? context.ownerDocument || context : document, true);
                        jQuery.merge(this, arr);       //合并到类数组对象中去
                    }
                    console.log(rsingleTag.test( match[1] ))
                }
            }

        },
        length: 0,
        splice: [].splice
    }

    //给jQuery扩展一个extend属性
    jQuery.extend = jQuery.fn.extend =  function () {
        var length = arguments.length,
            target = arguments[0] || {},
            i = 1,
            name;
        if ( typeof target !== 'object' || typeof target !== 'function' ) {
            target = {};
        }

        if ( i == length ) {
            target = this;
            i--;
        }

        for ( ; i < length;i++ ) {
            for (name in arguments[i]){
                target[name] = arguments[i][name];
            }
        }
        // console.log(arguments[0])
        return target;
    }

    //给jQuery本身扩展属性方法
    jQuery.extend({
        /* merge方法： 合并数组或者类数组。
            var obj = { length: 0 }, 
            var arr = ['li']
            最后输出 $.merge( obj, arr )  // { 0: 'li',length: 1 }
        */
        merge: function ( first, seconds ) {      
            var l = seconds.length,
                i = first.length,
                j = 0;

            if ( typeof l === 'number' ) {
                for ( ; j < l; j++ ) {
                    first[ i++ ] = seconds[ j ];
                }
            } else {
                while ( seconds[ j ] !== undefined ) {
                    first[ i++ ] = seconds[ j++ ]
                }
            }

            first.length = i;

            return first;       //返回合并后的数组或者类数组对象
        },
        parseHTML: function ( data, context, keepScripts ) {

            //如果data不存在或者不是一个字符串类型
            if ( !data || typeof data !== 'string' ) {
                return null;
            }

            //如果是布尔类型的，将值保存到keepScripts变量中，默认设置context = false
            if( typeof context === 'boolean' ) {
                keepScripts = context;
                context = false;
            }

            context = context || document;

            var parsed = rsingleTag.exec( data ),
                scripts = !keepScripts && [];

            //如果匹配到这个元素，将创建这个元素并保存到数组中返回
            if( parsed ) {
                return [ context.createElement( parsed[1] ) ];
            }

        }
    });

    jQuery.fn.init.prototype = jQuery.fn;

    global.$ = global.jQuery = jQuery;

});