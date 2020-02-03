import Vue from 'vue'
import Router from 'vue-router'
import Pay from '@/views/Pay.vue'
import CourseDetail from '@/views/CourseDetail.vue'
import EvaluationList from '@/views/EvaluationList.vue'
import BookDetail from '@/views/BookDetail.vue'
import BookPay from '@/views/BookPay.vue'
import Address from '@/views/Address.vue'
import OrderDetail from '@/views/OrderDetail.vue'
import QuestionBankPay from '@/views/QuestionBankPay'
import UkDetail from '@/views/UkDetail'
import UkPay from '@/views/UkPay'
import QuestionDetail from '@/views/QuestionDetail'
import VipPay from '@/views/VipPay'
import Active11Course from '@/views/Active11Course'
import NoFound from '@/views/404.vue'
import Test from '@/views/Test.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/courseDetail',
      name: 'CourseDetail',
      component: CourseDetail
    },
    {
      path: '/EvaluationList',
      name: 'EvaluationList',
      component: EvaluationList
    },
    {
      path: '/BookDetail',
      name: 'BookDetail',
      component: BookDetail
    },
    {
      path: '/BookPay',
      name: 'BookPay',
      component: BookPay
    },
    {
      path: '/Address',
      name: 'Address',
      component: Address
    },
    {
      path: '/OrderDetail',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path: '/QuestionBankPay',
      name: 'QuestionBankPay',
      component: QuestionBankPay     
    },
    {
      path: '/UkDetail',
      name: 'UkDetail',
      component: UkDetail   
    },
    {
      path: '/UkPay',
      name: 'UkPay',
      component: UkPay   
    },
    {
      path: '/VipPay',
      name: 'VipPay',
      component: VipPay   
    }, 
    {
      path: '/Active11Course',
      name: 'Active11Course',
      component: Active11Course   
    },
    {
      path: '/Test',
      name: 'Test',
      component: Test
    },
    {
      path: '/QuestionDetail',
      name: 'QuestionDetail',
      component: QuestionDetail
    },
    {
      path: '*',
      name: 'NoFound',
      component: NoFound
    },
  ]
})
