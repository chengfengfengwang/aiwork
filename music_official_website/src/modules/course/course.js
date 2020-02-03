import './../../assets/banRem'

import Vue from 'vue'
import course from './course.vue'
import '../../assets/common.less'
import '../../assets/common.js'


new Vue({
    render: h => h(course)
}).$mount('#course')