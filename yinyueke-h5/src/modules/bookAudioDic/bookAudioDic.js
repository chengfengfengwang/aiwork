import Vue from 'vue'
import bookAudioDic from './bookAudioDic.vue'
import axios from './../../common/axios_config'
Vue.prototype.axios = axios;
new Vue({
    render: h => h(bookAudioDic)
}).$mount('#bookAudioDic')