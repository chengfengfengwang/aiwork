import Vue from 'vue'
import App from './App.vue'
// import {Dialog} from 'vant'
// Dialog.alert({message: '请求出错了'})
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
