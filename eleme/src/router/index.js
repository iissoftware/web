import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Discover from '@/components/Discover'
import Order from '@/components/Order'
import Profile from '@/components/Profile'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
        path: '/discover',
        component: Discover
    },
    {
        path: '/order',
        component: Order
    },
    {
        path: '/profile',
        component: Profile
    },
    {
        path: '/search',
        component: Search
    }
  ]
})
