import Vue from 'vue'
import addWx from './addWx.vue'
import axios from './../../common/axios_config'
Vue.prototype.axios = axios;
new Vue({
    render: h => h(addWx)
}).$mount('#addWx')