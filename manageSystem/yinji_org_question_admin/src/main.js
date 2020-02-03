// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './common/axios_config'
import store from './store'

import iView from 'iview';
import 'iview/dist/styles/iview.css';
import iviewArea from 'iview-area';
    Vue.use(iviewArea);
Vue.use(iView);

import './common/index.less';
//require('./index.less')
Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.prototype.baseUrl = process.env.BASE_URL;
Vue.prototype.axios = axios;
Vue.prototype.getFileType = function (file) {
  if (file == undefined) { return }
  if (!Boolean(file)) { return }
  var arr = file.split('.');
  var key = arr[arr.length - 1];
  switch (key) {
    case "jpg":
      return 0;
      break;
    case "jpeg":
      return 0;
      break;
    case "png":
      return 0;
      break;
    case "mp3":
      return 1;
      break;
    default:
      return -1;
  }
}
Vue.filter('option', function (value) {
  if (!value) return ''
  var value = value + '';
  switch (value) {
    case '0':
      return 'A';
      break;
    case '1':
      return 'B';
      break;
    case '2':
      return 'C';
      break;
    case '3':
      return 'D';
      break;
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
})
Vue.filter('Qposition', function (value) {
  //if (!value) return ''
  var value = value + '';
  switch (value) {
    case '0':
      return '默认';
      break;
    case '1':
      return '知识点题库';
      break;
    case '2':
      return '模拟题库';
      break;
  }
  return value.charAt(0).toUpperCase() + value.slice(1)
})

const uniqBy = require('lodash.uniqby');
Vue.prototype.$util={
  uniqBy
};
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
