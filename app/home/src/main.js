import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './auth'
import 'lib-flexible'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import main from './assets/css/main.css'

Vue.use(ElementUI);

Vue.prototype.$http = axios;            //给vue对象原型上绑定一个$http属性

new Vue({
  el: '#app',
  router,
  axios,
  store,
  components: { App },
  template: '<App/>'
});

