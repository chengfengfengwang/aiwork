import Vue from 'vue'
import vipConfig from './vipConfig.vue'


import '../../assets/common.less'
import axios from './../../axiosConfig'
//import axios from 'axios'
Vue.prototype.axios = axios;

import fakervue from 'fakervue'
import 'fakervue/lib/fakervue.css'
Vue.use(fakervue)

new Vue({
    render: h => h(vipConfig)
}).$mount('#vipConfig')