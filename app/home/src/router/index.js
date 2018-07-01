import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import store from '../store'

Vue.use(Router);


// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit('login', window.localStorage.getItem('token'))       //取浏览器临时数据库token值
}



const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      meta: {
        requireAuth: true     //加上这个，表示你当前路由需要登录验证
      }
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: {
        requireAuth: true
      }
    }
  ]
});

//路由拦截验证
router.beforeEach(( to, from, next ) => {
    if (to.matched.some(r => r.meta.requireAuth)) {
        if (store.state.token) {
            next();
        }
        else {
            next({
                path: '/login',
                query: {redirect: to.fullPath}
            })
        }
    }
    else {
        next();
    }
});

export default router;
