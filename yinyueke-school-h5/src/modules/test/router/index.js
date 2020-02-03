import Vue from 'vue'
import Router from 'vue-router'
import aa from './../aa.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/aa',
      name: 'aa',
      component: aa
    },
  ]
})
