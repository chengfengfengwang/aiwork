import Vue from 'vue'
import Router from 'vue-router'

const test = () => import('./src/promote/test.vue')
const test1 = () => import('./src/promote/test1.vue')
const poster = () => import('./src/promote/poster.vue')
const reward = () => import('./src/promote/reward.vue')
const reg = () => import('./src/promote/reg.vue')
const regSuccess = () => import('./src/promote/regSuccess.vue')
const getCash = () => import('./src/promote/getCash.vue')
const writeCardInfo = () => import('./src/promote/writeCardInfo.vue')
////老用户
const ou_reg = () => import('./src/promote/ou_reg')
const ou_regSuccess = () => import('./src/promote/ou_regSuccess')
const ou_poster = () => import('./src/promote/ou_poster')
const ou_poster1 = () => import('./src/promote/ou_poster1')
const ou_getCash = () => import('./src/promote/ou_getCash')
const ou_intro = () => import('./src/promote/ou_intro')
const ou_intro1 = () => import('./src/promote/ou_intro1')
const ou_reward = () => import('./src/promote/ou_reward.vue')

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
      component: test
    },
    {
      path: '/test1',
      name: 'test1',
      component: test1
    },
  ],

})
