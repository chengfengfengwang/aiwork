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
 const test = () => import('./src/test.vue')
const poster = () => import('./src/poster.vue')
const reward = () => import('./src/reward.vue')
const reg = () => import('./src/reg.vue')
const regSuccess = () => import('./src/regSuccess.vue')
const getCash = () => import('./src/getCash.vue')
const writeCardInfo = () => import('./src/writeCardInfo.vue')
////老用户
const ou_reg = () => import('./src/ou_reg')
const ou_regSuccess = () => import('./src/ou_regSuccess')
const ou_poster = () => import('./src/ou_poster')
const ou_poster1 = () => import('./src/ou_poster1')
const ou_getCash = () => import('./src/ou_getCash')
const ou_intro = () => import('./src/ou_intro')
const ou_intro1 = () => import('./src/ou_intro1')
const ou_reward = () => import('./src/ou_reward.vue')

Vue.use(Router)
export default new Router({
  routes: [
  
    {
      path: '/poster',
      name: 'poster',
      component: poster
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
    {
      path: '/getCash',
      name: 'getCash',
      component: getCash,
    }, 
    {
      path: '/writeCardInfo',
      name: 'writeCardInfo',
      component: writeCardInfo,
    },
    {
      path: '/ou_reg',
      name: 'ou_reg',
      component: ou_reg,
    }, 
    {
      path: '/ou_regSuccess',
      name: 'ou_regSuccess',
      component: ou_regSuccess,
    },
    {
      path: '/ou_poster',
      name: 'ou_poster',
      component: ou_poster,
    }, 
    {
      path: '/ou_poster1',
      name: 'ou_poster1',
      component: ou_poster1,
    }, 
    {
      path: '/ou_getCash',
      name: 'ou_getCash',
      component: ou_getCash,
    }, 
    {
      path: '/ou_intro',
      name: 'ou_intro',
      component: ou_intro,
    },
    {
      path: '/ou_intro1',
      name: 'ou_intro1',
      component: ou_intro1,
    },
    {
      path: '/ou_reward',
      name: 'ou_reward',
      component: ou_reward,
    },
    {
      path: '/test',
      name: 'test',
      component: test,
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
