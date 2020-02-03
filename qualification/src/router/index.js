import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue'
import MusicBank from '@/views/MusicBank.vue'
import MusicFee from '@/views/MusicFee.vue'
import Singer from '@/views/Singer.vue'
import SingerDetail from '@/views/SingerDetail.vue'
import Play from '@/views/Play.vue'
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'
import NoFound from '@/views/404.vue'
import Test from '@/views/Test.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/MusicBank',
      name: 'MusicBank',
      component: MusicBank
    },
    {
      path: '/MusicFee',
      name: 'MusicFee',
      component: MusicFee
    },
    {
      path: '/Singer',
      name: 'Singer',
      component: Singer
    },
    {
      path: '/SingerDetail/:id',
      name: 'SingerDetail',
      component: SingerDetail
    },
    {
      path: '/Play/:id',
      name: 'Play',
      component: Play
    },
    {
      path: '/About',
      name: 'About',
      component: About
    },
    {
      path: '/Login/:param',
      name: 'Login',
      component: Login
    },
    {
      path: '*',
      name: 'NoFound',
      component: NoFound
    },
  ]
})
