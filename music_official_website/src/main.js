import Vue from 'vue'
import App from './App.vue'
import store from './store'
import './assets/common.less'
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
