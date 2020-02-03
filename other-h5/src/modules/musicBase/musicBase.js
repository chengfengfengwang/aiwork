import Vue from 'vue'
import musicBase from './musicBase.vue'



import '../../assets/common.less'
import axios from 'axios'
Vue.prototype.axios = axios;

import fakervue from 'fakervue'
import 'fakervue/lib/fakervue.css'
Vue.use(fakervue)

new Vue({
    render: h => h(musicBase)
}).$mount('#musicBase')