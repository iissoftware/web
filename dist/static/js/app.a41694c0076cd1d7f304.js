webpackJsonp([1],{JCDB:function(t,e,s){t.exports=s.p+"static/img/banner-2.be7cc0a.jpeg"},NHnr:function(t,e,s){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=s("7+uW"),a={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]},n=s("VU/8")(null,a,!1,null,null,null).exports,r=s("/ocq"),o={data:function(){return{shoplist:[]}},created:function(){this.getShopList()},methods:{getShopList:function(){var t=this;this.$http.get("/static/recommend-seller.json").then(function(e){t.shoplist=e.data}).catch(function(t){console.log(t)})}}},c={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"shop-list"},[s("ul",{attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"5"}},t._l(t.shoplist,function(e){return s("li",{staticClass:"shoplist"},[s("div",{staticClass:"shoplist-item"},[s("div",{staticClass:"shop-img"},[s("img",{attrs:{src:e.src,width:"100%",height:"100%"}})]),t._v(" "),s("div",{staticClass:"shop-main"},[s("h3",{staticClass:"shopname"},[s("span",[t._v(t._s(e.name))])]),t._v(" "),s("div",{staticClass:"rate"},[s("el-rate",{attrs:{disabled:"","show-score":"","text-color":"#ff9900","score-template":"{value}"},model:{value:e.rate,callback:function(s){t.$set(e,"rate",s)},expression:"item.rate"}}),t._v(" "),s("span",[t._v("月售"+t._s(e.sales)+"单")])],1),t._v(" "),s("div",{staticClass:"index-money"},[s("span",[t._v("￥"+t._s(e.takePrice)+"起送 | 配送费￥"+t._s(e.dispatchPrice))])])])])])}))])},staticRenderFns:[]},l=s("VU/8")(o,c,!1,null,null,null).exports,v={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("footer",[s("div",{staticClass:"footer-item"},[s("router-link",{attrs:{to:"/"}},[s("img",{attrs:{src:"/"===t.$route.path?"/static/icon/icon-home-active.png":"/static/icon/icon-home.png"}}),t._v(" "),s("span",[t._v("首页")])])],1),t._v(" "),s("div",{staticClass:"footer-item"},[s("router-link",{attrs:{to:"/discover"}},[s("img",{attrs:{src:"/discover"===t.$route.path?"/static/icon/icon-discover-active.png":"/static/icon/icon-discover.png"}}),t._v(" "),s("span",[t._v("发现")])])],1),t._v(" "),s("div",{staticClass:"footer-item"},[s("router-link",{attrs:{to:"/order"}},[s("img",{attrs:{src:"/order"===t.$route.path?"/static/icon/icon-order-active.png":"/static/icon/icon-order.png"}}),t._v(" "),s("span",[t._v("订单")])])],1),t._v(" "),s("div",{staticClass:"footer-item"},[s("router-link",{attrs:{to:"/profile"}},[s("img",{attrs:{src:"/profile"===t.$route.path?"/static/icon/icon-profile-active.png":"/static/icon/icon-profile.png"}}),t._v(" "),s("span",[t._v("我的")])])],1)])},staticRenderFns:[]};var u=s("VU/8")(null,v,!1,function(t){s("vMvp")},"data-v-1491b29c",null).exports,h={data:function(){return{arr:"",shoplist:[]}},created:function(){this.getData()},methods:{getData:function(){var t=this;this.$http.get("/static/prod-type.json").then(function(e){t.arr=e.data})}},components:{"recommend-seller":l,"v-footer":u}},p={render:function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("header",[s("div",{staticClass:"search-div",on:{click:function(e){t.$router.push("/search")}}},[s("span",[t._v("水果 大牌立减30元")])]),t._v(" "),t._m(0)]),t._v(" "),t._m(1),t._v(" "),s("div",{staticClass:"main-slider"},[s("mt-swipe",{attrs:{auto:5e3}},t._l(t.arr,function(e){return s("mt-swipe-item",{key:e.length},t._l(e,function(e){return s("a",{staticClass:"mint-item",attrs:{href:"javascript:;"}},[s("div",{staticClass:"container"},[s("img",{attrs:{src:e.src}})]),t._v(" "),s("span",[t._v(t._s(e.name))])])}))}))],1),t._v(" "),t._m(2),t._v(" "),s("recommend-seller"),t._v(" "),s("v-footer")],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"search-li"},[s("span",[t._v("饺子")]),t._v(" "),s("span",[t._v("炸鸡")]),t._v(" "),s("span",[t._v("蛋糕")]),t._v(" "),s("span",[t._v("水果减30")]),t._v(" "),s("span",[t._v("麦当劳")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"m-show"},[e("img",{attrs:{src:s("JCDB"),width:"100%",height:"100%"}})])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"section-title"},[e("span",[this._v("推荐商家")])])}]};var d=s("VU/8")(h,p,!1,function(t){s("UW+h")},"data-v-c1b1a3ea",null).exports,f={components:{"v-footer":u}},_={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h3",[this._v("Discover")]),this._v(" "),e("v-footer")],1)},staticRenderFns:[]},m=s("VU/8")(f,_,!1,null,null,null).exports,g={components:{"v-footer":u}},A={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h3",[this._v("Order")]),this._v(" "),e("v-footer")],1)},staticRenderFns:[]},C=s("VU/8")(g,A,!1,null,null,null).exports,R={components:{"v-footer":u}},w={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("h3",[this._v("Profile")]),this._v(" "),e("v-footer")],1)},staticRenderFns:[]},x=s("VU/8")(R,w,!1,null,null,null).exports,E={render:function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"search-input"},[i("router-link",{attrs:{to:"/"}},[i("img",{staticClass:"back",attrs:{src:s("uKWM")}})]),t._v(" "),i("div",{staticClass:"serach-box"},[i("input",{directives:[{name:"model",rawName:"v-model",value:t.value,expression:"value"}],attrs:{type:"text",autofocus:"autofocus",placeholder:"输入商家、商品名称"},domProps:{value:t.value},on:{keyup:t.onchange,input:function(e){e.target.composing||(t.value=e.target.value)}}})])],1),t._v(" "),t.isshow?i("div",[t._m(0),t._v(" "),i("section",{staticClass:"index-item"},t._l(t.hotData,function(e){return i("span",{key:e,on:{click:function(s){t.searchFn(e)}}},[t._v(t._s(e))])}))]):t._e(),t._v(" "),t.isshow?t._e():i("div",{staticClass:"shop-list"},[i("ul",{attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"5"}},t._l(t.searchResult,function(e){return i("li",{staticClass:"shoplist"},[i("div",{staticClass:"shoplist-item"},[i("div",{staticClass:"shop-img"},[i("img",{attrs:{src:e.src,width:"100%",height:"100%"}})]),t._v(" "),i("div",{staticClass:"shop-main"},[i("h3",{staticClass:"shopname"},[i("span",[t._v(t._s(e.name))])]),t._v(" "),i("div",{staticClass:"rate"},[i("el-rate",{attrs:{disabled:"","show-score":"","text-color":"#ff9900","score-template":"{value}"},model:{value:e.rate,callback:function(s){t.$set(e,"rate",s)},expression:"item.rate"}}),t._v(" "),i("span",[t._v("月售"+t._s(e.sales)+"单")])],1),t._v(" "),i("div",{staticClass:"index-money"},[i("span",[t._v("￥"+t._s(e.takePrice)+"起送 | 配送费￥"+t._s(e.dispatchPrice))])])])])])}))])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("section",{staticClass:"index-22vWR"},[e("span",[this._v("热门搜索")])])}]};var $=s("VU/8")({data:function(){return{value:"",isshow:!0,hotData:["汉堡","蛋糕","麦当劳","麻辣烫","水果减30","会员领红包","小龙虾"],searchResult:[]}},methods:{searchFn:function(t){var e=this;this.value=t,this.isshow=!1,this.searchResult.splice(0,this.searchResult.length),this.$http.get("/static/recommend-seller.json").then(function(s){for(var i=s.data,a=0;a<i.length;a++)i[a].name.indexOf(t)>0&&e.searchResult.push(i[a])})},onchange:function(){this.value?this.searchFn(this.value):this.isshow=!0}}},E,!1,function(t){s("QAY7")},"data-v-40c7219c",null).exports;i.default.use(r.a);var k=new r.a({mode:"history",routes:[{path:"/",name:"Index",component:d},{path:"/discover",component:m},{path:"/order",component:C},{path:"/profile",component:x},{path:"/search",component:$}]}),b=s("mtWM"),F=s.n(b),M=(s("sVYa"),s("zL8q")),U=s.n(M),y=(s("tvR6"),s("Au9i")),V=s.n(y);s("d8/S"),s("WEav");i.default.use(U.a),i.default.use(V.a),i.default.prototype.$http=F.a,new i.default({el:"#app",router:k,components:{App:n},template:"<App/>"})},QAY7:function(t,e){},"UW+h":function(t,e){},WEav:function(t,e){},"d8/S":function(t,e){},tvR6:function(t,e){},uKWM:function(t,e){t.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABgElEQVRYR8WXMUrFQBCG/wERY2zSpkpp2DQ2imAlwkNBLDyApXoixcozPBAV5RWiF5AMuYmgKCMLebCEaHazySZtsnxf5p9NZgkTXzQSfyXP882qqhiA/McYXEAptQHgmYh2ROScmW+CCZhwAB8AdsuyfA8i0HjzTwAHzPzaFfEgEaRpup4kyaIuu4YfMfOiC67vewvU8Eci2hMRJ7i3gC/cS6AB/wJwaFt2M5peEbTAT5j5wSbz5jPOAlmWrcVx/FRnrt+8N9w5ghp+R0T7IuINdxIYA24tYMIBfIvIcd/MnXtAKbUK4F6XvYafMvO8T8O1relswqIorgBcjAG3ikApdUtEZ1MK6AjmRDQbQ6IzAl2mlj4I14TLxpl0G44pYRWBuX2GroSzgJZp+R/0+hNabcO/PjhDzAJeAnrxEBK9IjCr4ivhLWBUwhxKrSZi7wjMSjTPBCIyCzaWL0UmPZg0JF6IaAvAZVmW10FORs2PVRRF21VVvQH4CS7gMqz8Asip+yG8z5E1AAAAAElFTkSuQmCC"},vMvp:function(t,e){}},["NHnr"]);
//# sourceMappingURL=app.a41694c0076cd1d7f304.js.map