// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './common/axios_config'
import store from './store'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import './common/index.less';
//require('./index.less')
Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.prototype.baseUrl = process.env.BASE_URL;
Vue.prototype.axios = axios;
Vue.prototype.instrumentsLetter = [
  {
    name: "音乐壳",
    value: "music_basis"
  },
  {
    name: "吉他",
    value: "guitar"
  },
  {
    name: "尤克里里",
    value: "ukulele"
  },
  {
    name: "卡林吧",
    value: "kalimba"
  },
  {
    name: "非洲鼓",
    value: "djembe"
  },
  {
    name: "钢琴",
    value: "piano"
  },
  {
    name: "口琴",
    value: "harmonica"
  }
];
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
