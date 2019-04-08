// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'babel-polyfill'
import store from './store'
axios.defaults.withCredentials = true;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

window.$store = store;

import utils from './utils/utils'

Vue.prototype.$util = utils;

Vue.config.productionTip = false
// Vue.prototype.$url = 'http://47.107.242.70:8090/'; //线上
// Vue.prototype.$url = 'http://soso.natapp1.cc/';        //内网穿透
// Vue.prototype.$url = 'http://192.168.31.124:8090/';  //小邓
// Vue.prototype.$url = 'http://192.168.31.182:8090/';     //峰哥
Vue.prototype.$url = 'http://192.168.31.159:8090/';   //小谢
// Vue.prototype.$url = 'http://192.168.31.28:8090/';     //测试服务器
// Vue.prototype.$url = 'http://192.168.31.227:8090/';   //大洋
// Vue.prototype.$domain = 'http://192.168.31.205:8080/'      //小游
Vue.prototype.$domain = 'http://localhost:8080/'      //通用
// Vue.prototype.$domain = 'http://www.glkjin.com/'     //线上
Vue.prototype.$http = axios;
/* eslint-disable no-new */
window.vm = new Vue({
  el: '#app',
  router,
  store: window === window.top ? window.$store : window.parent.$store,
  components: { App },
  template: '<App/>'
})
