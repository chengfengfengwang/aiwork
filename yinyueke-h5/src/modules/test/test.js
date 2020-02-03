import Vue from 'vue'
import test from './test.vue'
import './../../common/common.less'
import axios from './../../common/axios_config'
Vue.prototype.axios = axios;
// import { Icon } from 'vant';
// import 'vant/lib/icon/local.css';
// Vue.use(Icon);


new Vue({
    render: h => h(test)
}).$mount('#test')