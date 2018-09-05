import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import User from '@/components/User'
import SmsLogin from '@/components/SmsLogin'
import Login from '@/components/Login'
import Profile from '@/components/Profile'
import Discover from '@/components/Discover'
import Order from '@/components/Order'
import Info from '@/components/Info'
import UpdatePass from '@/components/UpdatePass'
import Food from '@/components/goods/Food'
import store from '../store'

Vue.use(Router)

// 页面刷新时，重新赋值token
if (window.localStorage.getItem('token')) {
    store.commit('userModule/login', window.localStorage.getItem('token'))       //取浏览器临时数据库token值
}

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
            children: [
                {
                    path: 'food',
                    name: 'Food',
                    component: Food
                }
            ]
        },
        {
            path: '/user',
            component: User,
            children: [
                {
                    path: 'smsLogin',
                    component: SmsLogin
                },
                {
                    path: 'login',
                    component: Login,
                }
            ]
        },
        {
            path: '/profile',
            component: Profile,
            children: [
                {
                    path: 'info',
                    component: Info,
                    meta: {
                        requireAuth: true       //是否启动登录拦截
                    }
                },
                {
                    path: 'updatePass',
                    component: UpdatePass
                }
            ]
        },
        {
            path: '/discover',
            name: 'Discover',
            component: Discover
        },
        {
            path: '/order',
            name: 'Order',
            component: Order
        }
    ]
});


//路由拦截
router.beforeEach(( to, from, next ) => {
    if( to.matched.some( res => res.meta.requireAuth ) ) {             //如果启动路由拦截
        if ( localStorage.getItem('token') ) {      //如果有token
            next();         //往下一个路由走
        } else {
            next({
                path: '/user/login',                //没有token就去到/user/login登录页面
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next();         //如果不启动路由拦截，就直接让它过去
    }
});


export default router;