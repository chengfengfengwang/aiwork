import Vue from 'vue'
import Router from 'vue-router'


const home = () => import('./src/index.vue')
const musicRadio = () => import('./src/musicRadio.vue')

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/musicRadio',
      name: 'musicRadio',
      component: musicRadio
    }
  ]
})
