import Vue from 'vue'
import Router from 'vue-router'


const home = () => import('./src/index.vue')
const musicRadio = () => import('./src/musicRadio.vue')
const songList = () => import('./src/songList.vue')
const play = () => import('./src/play.vue')

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
    },
    {
      path: '/songList',
      name: 'songList',
      component: songList
    },
    {
      path: '/play',
      name: 'play',
      component: play
    }
  ]
})
