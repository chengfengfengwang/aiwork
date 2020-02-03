// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from './common/axios_config'
import store from './store'
import {getQueryVariable} from './common/util'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
import iviewArea from 'iview-area';
Vue.use(iviewArea);
Vue.use(iView);
import './common/index.less';
//require('./index.less')
Vue.config.productionTip = false
/* eslint-disable no-new */

Vue.prototype.getQueryVariable = getQueryVariable;
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
