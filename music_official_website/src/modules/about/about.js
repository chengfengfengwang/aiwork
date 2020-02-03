import './../../assets/banRem'

import Vue from 'vue'
import About from './About.vue'
import '../../assets/common.less'
import '../../assets/common.js'
//import 'iview/dist/styles/iview.css';


new Vue({
    render: h => h(About)
}).$mount('#about')