import Vue from 'vue'
import test from './test.vue'
import { Dialog } from 'vant';

Vue.use(Dialog);

import '../../assets/common.less'
import axios from 'axios'
Vue.prototype.axios = axios;

new Vue({
    render: h => h(test)
}).$mount('#test')