import Vue from 'vue'
import Router from 'vue-router'


const home = () => import('./src/index.vue')
const musicRadio = () => import('./src/musicRadio.vue')
const songList = () => import('./src/songList.vue')
const play = () => import('./src/play.vue')
const bg100 = () => import('./src/bg100.vue')
const tools_org = () => import('./src/tools/index.vue')
const learnReport = () => import('./src/learnReport.vue')

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
    },
    {
      path: '/bg100',
      name: 'bg100',
      component: bg100
    },
    {
      path: '/tools_org',
      name: 'tools_org',
      component: tools_org
    },
    {
      path: '/learnReport',
      name: 'learnReport',
      component: learnReport
    }
  ]
})
