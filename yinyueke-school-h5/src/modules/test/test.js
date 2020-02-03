import Vue from 'vue'
import test from './test.vue'
import router from './router/index'



new Vue({
    router,
    render: h => h(test)
}).$mount('#test')