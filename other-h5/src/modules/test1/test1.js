import Vue from 'vue'
import test1 from './test1.vue'


//import '../../assets/common.less'
import axios from 'axios'
Vue.prototype.axios = axios;

new Vue({
    render: h => h(test1)
}).$mount('#test1')