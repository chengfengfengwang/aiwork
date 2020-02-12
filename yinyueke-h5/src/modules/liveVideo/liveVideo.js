import Vue from 'vue'
import liveVideo from './liveVideo.vue'
import './../../common/common.less'
import axios from '../../common/axios_config'
Vue.prototype.axios = axios;
// import { Icon } from 'vant';
// import 'vant/lib/icon/local.css';
// Vue.use(Icon);


new Vue({
    render: h => h(liveVideo)
}).$mount('#liveVideo')