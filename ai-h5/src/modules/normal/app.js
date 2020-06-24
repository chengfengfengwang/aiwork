import Vue from 'vue'
import app from './app.vue'
import router from './router'
import axios from './../../common/axios_config'
import  '../../common/common.less'
import Vuelidate from 'vuelidate';

Vue.use(Vuelidate);
Vue.prototype.axios = axios;


new Vue({
    router,
    render: h => h(app)
}).$mount('#normal')