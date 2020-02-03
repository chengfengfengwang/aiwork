
import Vue from 'vue'
import addMusicTeacher from './addMusicTeacher.vue'
import '../../assets/common.less'
import axios from 'axios'
Vue.prototype.axios = axios;

new Vue({
    render: h => h(addMusicTeacher)
}).$mount('#addMusicTeacher')