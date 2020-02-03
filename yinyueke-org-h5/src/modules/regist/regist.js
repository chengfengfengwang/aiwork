import Vue from 'vue'
import app from './app.vue'
import axios from '../../common/axios_config'
Vue.prototype.axios = axios;
import router from './router/index'



new Vue({
    router,
    render: h => h(app)
}).$mount('#regist')