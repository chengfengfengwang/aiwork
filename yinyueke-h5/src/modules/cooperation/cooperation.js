
import Vue from 'vue'
import cooperation from './cooperation.vue'
import './../../common/common.less'
import { Icon } from 'vant';
import 'vant/lib/icon/local.css';
Vue.use(Icon);


new Vue({
    render: h => h(cooperation)
}).$mount('#cooperation')