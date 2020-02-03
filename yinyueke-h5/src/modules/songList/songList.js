
import Vue from 'vue'
import songList from './songList.vue'
import axios from './../../common/axios_config'
Vue.prototype.axios = axios;
new Vue({
    render: h => h(songList)
}).$mount('#songList')