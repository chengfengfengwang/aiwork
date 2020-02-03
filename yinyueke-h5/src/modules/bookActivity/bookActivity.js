import Vue from 'vue'
import bookActivity from './bookActivity.vue'

import { Icon } from 'vant';
import 'vant/lib/icon/local.css';
Vue.use(Icon);


new Vue({
    render: h => h(bookActivity)
}).$mount('#bookActivity')