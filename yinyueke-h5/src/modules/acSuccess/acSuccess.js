
import Vue from 'vue'
import acSuccess from './acSuccess.vue'
import axios from './../../common/axios_config'
Vue.prototype.axios = axios;
new Vue({
    render: h => h(acSuccess)
}).$mount('#acSuccess')