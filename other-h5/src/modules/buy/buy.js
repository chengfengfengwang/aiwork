import Vue from 'vue'
import buy from './buy.vue'
import '../../assets/common.less'
import axios from 'axios'
Vue.prototype.axios = axios;

new Vue({
    render: h => h(buy)
}).$mount('#buy')