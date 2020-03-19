import Vue from 'vue'
import Router from 'vue-router'

// import ukulelePac from './src/ukulelePac.vue'
// import ukuleleES from './src/ukuleleES.vue'
// import djembePac_ad from './src/djembePac_ad.vue' 
// import ukuleleGsc from './src/ukuleleGsc.vue' 
// import djembePac from './src/djembePac.vue'
// import qimeng from './src/qimeng_new.vue'

// const home = () => import('./src/index.vue')
// const poster = () => import('./src/poster.vue')
// const download = () => import('./src/download.vue')
// const cp = () => import('./src/cp.vue')
// const selectCourse = () => import('./src/selectCourse.vue')

const login = () => import('./src/login.vue')
const poster = () => import('./src/poster.vue')
const reward = () => import('./src/reward.vue')
const reg = () => import('./src/reg.vue')
const regSuccess = () => import('./src/regSuccess.vue')

Vue.use(Router)

export default new Router({
  routes: [
  
    {
      path: '/poster',
      name: 'poster',
      component: poster
    },
   
    {
      path: '/login',
      name: 'login',
      component: login,
    },
 
    {
      path: '/reward',
      name: 'reward',
      component: reward,
    }, 
    {
      path: '/reg',
      name: 'reg',
      component: reg,
    }, 
    {
      path: '/regSuccess',
      name: 'regSuccess',
      component: regSuccess,
    },
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
