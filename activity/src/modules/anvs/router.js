import Vue from 'vue'
import Router from 'vue-router'


const login = () => import('./src/login.vue')
const active = () => import('./src/active.vue')
const success = () => import('./src/success.vue')
const download = () => import('./src/download.vue')
const address = () => import('./src/address.vue')
const selInstrument = () => import('./src/selInstrument.vue')
const order = () => import('./src/order.vue')
const imgDetail = () => import('./src/imgDetail.vue')

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home1',
    //   component: home1
    // },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/active',
      name: 'active',
      component: active
    },
    {
      path: '/success',
      name: 'success',
      component: success
    },
    {
      path: '/download',
      name: 'download',
      component: download
    },
    {
      path: '/address',
      name: 'address',
      component: address
    },
    {
      path: '/selInstrument',
      name: 'selInstrument',
      component: selInstrument
    },
    {
      path: '/order',
      name: 'order',
      component: order
    },
    {
      path: '/imgDetail',
      name: 'imgDetail',
      component: imgDetail
    } 
  ] 
})
