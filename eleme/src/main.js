import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import 'lib-flexible'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import '../static/css/main.css'

Vue.use(ElementUI)

Vue.use(MintUI)

Vue.prototype.$http = axios             //在 Vue 原型上添加一个属性$http

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
