import Vue from 'vue'
import networkTest from './networkTest.vue'
import '../../assets/common.less'
import axios from 'axios'
Vue.prototype.axios = axios;

new Vue({
    render: h => h(networkTest)
}).$mount('#networkTest')