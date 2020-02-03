import Vue from 'vue'
import Router from 'vue-router'
import regist from './../src/regist.vue'
import success from './../src/success.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'regist',
      component: regist
    },
    {
      path: '/success',
      name: 'success',
      component: success
    },
  ]
})
