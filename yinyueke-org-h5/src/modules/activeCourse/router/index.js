import Vue from 'vue'
import Router from 'vue-router'
import regist from '../src/regist.vue'
import success from '../src/success.vue'
import active from '../src/active.vue'
import download from '../src/download.vue'
import acSuccess from '../src/acSuccess'

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
    {
      path: '/active',
      name: 'active',
      component: active
    },
    {
      path: '/download',
      name: 'download',
      component: download
    },
    {
      path: '/acSuccess',
      name: 'acSuccess',
      component: acSuccess
    }
  ]
})
