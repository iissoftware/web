// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// import Print from 'vue-print-nb'    //打印
// Vue.use(Print); //注册打印组件

import Print from './assets/js/Print'
Vue.use(Print) // 注册

import './utils/directive.js'

Vue.config.productionTip = false
// Vue.prototype.$url = 'http://soso.natapp1.cc/';        //内网穿透
// Vue.prototype.$url = 'http://47.107.242.70:8090/';     //线上测试
  Vue.prototype.$url = 'http://192.168.31.124:8090/';
Vue.prototype.$http = axios;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
