import Vue from 'vue'
import test from './test.vue'
import axios from '../../common/axios_config'
import {  eConsole } from "../../common/util";
eConsole()
Vue.prototype.axios = axios;
new Vue({
    render: h => h(test)
}).$mount('#test')