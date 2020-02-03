import Vue from 'vue'
import aiCourseList from './aiCourseList.vue'



import '../../assets/common.less'
import axios from 'axios'
Vue.prototype.axios = axios;

import fakervue from 'fakervue'
import 'fakervue/lib/fakervue.css'
Vue.use(fakervue)

new Vue({
    render: h => h(aiCourseList)
}).$mount('#aiCourseList')