//import 'amfe-flexible';
import './../../assets/ipadRem'
import Vue from 'vue'
import Index from './about_mob.vue'
import '../../assets/mob_assets/css/common.less'
import '../../assets/common.js'


new Vue({
    render: h => h(Index)
}).$mount('#about_mob')