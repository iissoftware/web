import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import BasicData from '@/components/basic/BasicData'
import PersonCenter from '@/components/personCenter/PersonCenter'
import Approval from '@/components/approval/Approval'
import Manage from '@/components/manage/Manage'
import ReportForm from '@/components/reportForm/ReportForm'
import OA from '@/components/OA/OA'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index,
      redirect: '/BasicData'
    },
    {
      path: '/BasicData',
      name: 'BasicData',
      component: BasicData,
      // children: [
      //   {
      //     path: 'moneyType',
      //     name: 'MoneyType',
      //     component: MoneyType
      //   }
      // ]
    },
    {
      path: '/PersonCenter',
      name: 'PersonCenter',
      component: PersonCenter
    },
    {
      path: '/Approval',
      name: 'Approval',
      component: Approval
    },
    {
      path: '/Manage',
      name: 'Manage',
      component: Manage
    },
    {
      path: '/ReportForm',
      name: 'ReportForm',
      component: ReportForm
    },
    {
      path: '/OA',
      name: 'OA',
      component: OA
    }
  ]
})
