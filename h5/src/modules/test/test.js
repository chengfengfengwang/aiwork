import Vue from 'vue'
import test from './test.vue'
import axios from '../../common/axios_config'
Vue.prototype.axios = axios;
import router from './router/index'



new Vue({
    router,
    render: h => h(test)
}).$mount('#test')