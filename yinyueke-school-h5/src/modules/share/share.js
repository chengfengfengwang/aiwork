import Vue from 'vue'
import share from './share.vue'
import axios from './../../common/axios_config'
Vue.prototype.axios = axios;
//import router from './router/index'



new Vue({
    //router,
    render: h => h(share)
}).$mount('#share')