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

//时间戳
function formatNumber(n) {
  n = n.toString();
  return n[1] ? n : '0' + n;
}
Vue.filter('formateTime', function (date) {
  if (!date) return '';
  var date = date * 1000; //项目返回的是秒级的时间戳
  var date = new Date(date);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();
  //秒没有返回
  return [year, month, day].map(formatNumber).join('-') + ' ' + [hour, minute].map(formatNumber).join(':');
})
//时间戳转化为天
Vue.filter('stampToDay',function(value){
  if (!value) return '';
  return Math.floor(value/86400) 
})


new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
