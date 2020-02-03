import Vue from 'vue'
import addTeacher from './addTeacher.vue'
import '../../assets/common.less'
import axios from 'axios'
Vue.prototype.axios = axios;

new Vue({
    render: h => h(addTeacher)
}).$mount('#addTeacher')