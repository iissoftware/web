;(function(global,factory){
    factory(global);
})(this,function(global){
    var
    class2type = {},
    core_toString = class2type.toString,
    rquickExpr = /^(?:\s*\.([\w-]*)|#([\w-]*))$/,
    rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
    rhtml = /<|&#?\w+;/,
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
                        context = context && context.nodeType ? context.ownerDocument || context : document, true;
                        var arr = jQuery.parseHTML( match[1], context, true);

                        // jQuery.merge(this, arr);       //合并到类数组对象中去
                    }
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

            //只有两个参数的时候，第二个就是是否保存script标签，这时候context就没有传进来!
            if( typeof context === 'boolean' ) {
                keepScripts = context;
                context = false;
            }


            //如果只有两个参数那么context就是document对象!  
            context = context || document;

            //如果不是单个标签那么parsed就是null,所谓的单个标签就是<div/>或者<div></div>但是<div>hello</div>不满足!
            var parsed = rsingleTag.exec( data ),
                scripts = !keepScripts && [];

            //如果是单个标签就调用相应的createElement方法，默认上下文是document!
            if( parsed ) {
                return [ context.createElement( parsed[1] ) ];
            }

            //如果不是单标签，就调用buildFragment方法，把html字符串传入，同时上下文也传入，第三个参数就是scripts!
            //如果paseHTML的第三个参数是false，那么这里的scripts就是一个数组，传递到buildFragment中会把所有的script标签放在里面  
            //所以就要收到移除!  

            parsed = jQuery.buildFragment( [data], context, scripts );
        },
        type: function ( obj ) {

            if ( obj == null ) {
                return String( obj );
            }

            return typeof obj === 'object' || typeof obj === 'function' ? 
                class2type[ core_toString.call(obj) ] || 'object' : typeof obj;
        },
        buildFragment: function ( elems, context, scripts, selection ) {
            var fragment = context.createDocumentFragment(),
                l = elems.length,
                nodes = [],
                i = 0,
                elem;
            for ( ; i < l; i++) {
                elem = elems[i];
                if ( elem || elem.length === 0 ) {
                    if( jQuery.type( elem ) === 'object' ){
                        console.log('ss')
                    } else if ( !rhtml.test( elem ) ) {     //将非html转换成文本节点
                        nodes.push(context.createTextNode( elem ));
                    } else {

                    }
                }
            }
            fragment.textContent = '';
            i = 0;
            while ( elem = nodes[ i++ ] ) {
                console.dir(elem)
            }
        }
    });

    jQuery.fn.init.prototype = jQuery.fn;

    global.$ = global.jQuery = jQuery;

});