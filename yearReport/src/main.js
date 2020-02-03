// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueRouter from 'vue-router'

Vue.use(VueRouter)
import App from './App';
import './utils/rem';
import('./assets/css/common.less');
//import('./assets/css/index.less');
Vue.config.productionTip = false
import axios from 'axios';
Vue.prototype.axios = axios;

const routes = [
  {
    path: '/',
    name: 'home',
    component:
      resolve => require(['./views/home.vue'], resolve)
  },
  {
    path: '/myMusicTrip',
    name: 'myMusicTrip',
    component:
      resolve => require(['./views/myMusicTrip.vue'], resolve)
  },
  {
    path: '/noData',
    name: 'noData',
    component:
      resolve => require(['./views/noData.vue'], resolve)
  },
  {
    path: '/test',
    name: 'test',
    component:
      resolve => require(['./views/test.vue'], resolve)
  }
]

const router = new VueRouter({
  routes
})
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
})
