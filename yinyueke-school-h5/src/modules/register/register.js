import Vue from 'vue'
import register from './register.vue'
import axios from './../../common/axios_config'
Vue.prototype.axios = axios;
//import router from './router/index'



new Vue({
    //router,
    render: h => h(register)
}).$mount('#register')