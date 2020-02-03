// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './common/axios_config'
import store from './store/index'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

import './common/index.less';
//require('./index.less')
Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.prototype.baseUrl = process.env.BASE_URL;
Vue.prototype.axios = axios;

new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
