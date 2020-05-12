import Vue from 'vue'
import Router from 'vue-router'

// import ukulelePac from './src/ukulelePac.vue'
// import ukuleleES from './src/ukuleleES.vue'
// import djembePac_ad from './src/djembePac_ad.vue' 
// import ukuleleGsc from './src/ukuleleGsc.vue' 
// import djembePac from './src/djembePac.vue'
// import qimeng from './src/qimeng_new.vue'

const home = () => import('./src/index.vue')
const success = () => import('./src/success.vue')
const newIndex = () => import('./src/newIndex.vue')
const newQrPage = () => import('./src/newQrPage.vue')
const newInput = () => import('./src/newInput')
const weiboInput = () => import('./src/weiboInput.vue')
const weiboQr = () => import('./src/weiboQr.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'newIndex',
      component: newIndex
    },

    {
      path: '/success',
      name: 'success',
      component: success,
    }, 
    {
      path: '/newIndex',
      name: 'home',
      component: home,
    },
    {
      path: '/newQrPage',
      name: 'newQrPage',
      component: newQrPage,
    }, 
    {
      path: '/newInput',
      name: 'newInput',
      component: newInput,
    }, 
    {
      path: '/weiboInput',
      name: 'weiboInput',
      component: weiboInput,
    },
    {
      path: '/weiboQr',
      name: 'weiboQr',
      component: weiboQr,
    }
  ]
})
