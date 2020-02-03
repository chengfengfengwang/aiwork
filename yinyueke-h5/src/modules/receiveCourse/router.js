import Vue from 'vue'
import Router from 'vue-router'

// import ukulelePac from './src/ukulelePac.vue'
// import ukuleleES from './src/ukuleleES.vue'
// import djembePac_ad from './src/djembePac_ad.vue' 
// import ukuleleGsc from './src/ukuleleGsc.vue' 
// import djembePac from './src/djembePac.vue'
// import qimeng from './src/qimeng_new.vue'

const home = () => import('./src/index.vue')
const school = () => import('./src/school.vue')
const qr = () => import('./src/qr.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/qr',
      name: 'qr',
      component: qr
    },
    {
      path: '/school',
      name: 'school',
      component: school
    }
  ]
})
