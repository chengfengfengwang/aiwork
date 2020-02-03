import Vue from 'vue'
import Router from 'vue-router'

// import ukulelePac from './src/ukulelePac.vue'
// import ukuleleES from './src/ukuleleES.vue'
// import djembePac_ad from './src/djembePac_ad.vue' 
// import ukuleleGsc from './src/ukuleleGsc.vue' 
// import djembePac from './src/djembePac.vue'
// import qimeng from './src/qimeng_new.vue'

const ukulelePac = () => import('./src/ukulelePac.vue')
const ukuleleES = () => import('./src/ukuleleES.vue')
const djembePac_ad = () => import('./src/djembePac_ad.vue')
const ukuleleGsc = () => import('./src/ukuleleGsc.vue')
const djembePac = () => import('./src/djembePac.vue')
const qimeng = () => import('./src/qimeng_new.vue')
const qimengM = () => import('./src/qimeng_m.vue')
const dash = () => import('./src/dash.vue') 
const christmasUklele = () => import('./src/christmasUklele.vue')
const christmasDjembe = () => import('./src/christmasDjembe.vue')
const hitMusic = () => import('./src/hitMusic.vue') 
const travelUkulele = () => import('./src/travelUkulele.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/ukulelePac',
      name: 'ukulelePac',
      component: ukulelePac
    },
    {
      path: '/ukuleleES',
      name: 'ukuleleES',
      component: ukuleleES
    },
    {
      path: '/djembePac_ad',
      name: 'djembePac_ad',
      component: djembePac_ad
    },
    {
      path: '/ukuleleGsc',
      name: 'ukuleleGsc',
      component: ukuleleGsc
    },
    {
      path: '/djembePac',
      name: 'djembePac',
      component: djembePac
    },
    {
      path: '/qimeng',
      name: 'qimeng',
      component: qimeng 
    },
    {
      path: '/qimeng_m',
      name: 'qimengM',
      component: qimengM 
    },
    {
      path: '/dash',
      name: 'dash',
      component: dash
    },   
    {
      path: '/christmasUklele',
      name: 'christmasUklele',
      component: christmasUklele
    },  
    {
      path: '/christmasDjembe',
      name: 'christmasDjembe',
      component: christmasDjembe
    },
    {
      path: '/hitMusic',
      name: 'hitMusic',
      component: hitMusic
    },  
    {
      path: '/travelUkulele',
      name: 'travelUkulele',
      component: travelUkulele
    },
  ]
})
