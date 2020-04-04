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
