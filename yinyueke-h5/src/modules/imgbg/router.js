import Vue from 'vue'
import Router from 'vue-router'

// import ukulelePac from './src/ukulelePac.vue'
// import ukuleleES from './src/ukuleleES.vue'
// import djembePac_ad from './src/djembePac_ad.vue' 
// import ukuleleGsc from './src/ukuleleGsc.vue' 
// import djembePac from './src/djembePac.vue'
// import qimeng from './src/qimeng_new.vue'

const home = () => import('./src/index.vue')
const poster = () => import('./src/poster.vue')
const test = () => import('./src/test.vue')
const qr04051 = () => import('./src/qr04051.vue')
const qr04052 = () => import('./src/qr04052.vue')
const shanshanPacQimeng = () => import('./src/shanshanPacQimeng.vue')
const douyin = () => import('./src/douyin.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/poster',
      name: 'poster',
      component: poster
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/qr04051',
      name: 'qr04051',
      component: qr04051
    },
    {
      path: '/qr04052',
      name: 'qr04052',
      component: qr04052
    },
    {
      path: '/shanshanPacQimeng',
      name: 'shanshanPacQimeng',
      component: shanshanPacQimeng
    },
    {
      path: '/douyin',
      name: 'douyin',
      component: douyin
    }
  ],
  // scrollBehavior(to, from, savedPosition) {
  //   console.log('--savedPosition--')
  //   console.log(to, from, savedPosition)
  //   console.log('--savedPosition--')
    
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     return { x: 0, y: 0 }
  //   }
  // }
})
