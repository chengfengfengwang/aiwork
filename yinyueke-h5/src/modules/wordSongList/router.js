import Vue from 'vue'
import Router from 'vue-router'

// import ukulelePac from './src/ukulelePac.vue'
// import ukuleleES from './src/ukuleleES.vue'
// import djembePac_ad from './src/djembePac_ad.vue' 
// import ukuleleGsc from './src/ukuleleGsc.vue' 
// import djembePac from './src/djembePac.vue'
// import qimeng from './src/qimeng_new.vue'

const home = () => import('./src/index.vue')
const play = () => import('./src/play.vue')
const folk = () => import('./src/folk.vue')
const folkplay = () => import('./src/folkplay.vue')
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/play',
      name: 'play',
      component: play
    },
    {
      path: '/folk',
      name: 'folk',
      component: folk
    },
    {
      path: '/folkplay',
      name: 'folkplay',
      component: folkplay
    },
  ]
})
