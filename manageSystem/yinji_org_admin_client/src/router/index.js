//代理   0
//机构   2
//管理员  3
import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/index'

import Login from './../views/Login.vue';
import Layout from './../views/Layout.vue';
//import LiveRoomManage from './../views/LiveRoomManage.vue';
import orgList from './../views/orgList/orgList.vue'
import oClassList from './../views/orgList/orgClassList.vue'  
import classList from './../views/classList/classList.vue' 
import teacherList from './../views/classList/teacherList.vue'
import studentList from './../views/classList/studentList.vue'
import register from './../views/classList/register.vue'
import teacherVideos from './../views/orgList/teacherVideos.vue'
import agents from './../views/orgList/agents.vue'
import agentTree from './../views/orgList/agentTree.vue'
import areaAgentTree from './../views/orgList/areaAgentTree.vue' 
import goods from './../views/orgList/goods.vue'
import agentDetail from './../views/orgList/agentDetail.vue'
import proxyOrgList from './../views/orgList/proxyOrgList.vue' 
import checkList from './../views/orgList/checkList.vue'
import config from './../views/orgList/config.vue'
import tpList from './../views/orgList/teachingPlan/list.vue'
import tpDetail from './../views/orgList/teachingPlan/detail.vue'

//import test from './../views/orgList/test.vue'
import test from './../views/myTest'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          name: 'index',
          path: '/',
          redirect: store.getters.role === 3 ? "/orgList" : "classList",
          component: orgList
        },
        {
          name: 'orgList',
          path: '/orgList',
          component: orgList,
          meta: { role: '03' }
        },
        {
          path: '/oClassList',
          name: 'oClassList',
          component: oClassList,
          meta: { role: '03' } 
        },
        {
          path: '/teacherVideos',
          name: 'teacherVideos',
          component: teacherVideos,
          meta: { role: '03' }  
        },
        {
          path: '/agents',
          name: 'agents',
          component: agents,
          meta: { role: '03' }   
        },
        {
          path: '/agentTree',
          name: 'agentTree',
          component: agentTree,
          meta: { role: '03' }   
        }, 
        {
          path: '/areaAgentTree',
          name: 'areaAgentTree',
          component: areaAgentTree,
          meta: { role: '3' }    
        },
        {
          path: '/config',
          name: 'config',
          component: config,
          meta: { role: '3' }    
        },
        {
          path: '/goods',
          name: 'goods',
          component: goods,
          meta: { role: '03' }   
        },
        {
          path: '/agentDetail',
          name: 'agentDetail',
          component: agentDetail,
          meta: { role: '023' }   
        },
        {
          path: '/proxyOrgList',
          name: 'proxyOrgList',
          component: proxyOrgList,
          meta: { role: '0' }   
        },
        {
          path: '/checkList',
          name: 'checkList',
          component: checkList,
          meta: { role: '0' }   
        },
        {
          path: '/classList',
          name: 'classList',
          component: classList,
          meta: { role: '2' }
        },
        {
          path: '/studentList',
          name: 'studentList',
          component: studentList,
          meta: { role: '2' }
        },
        {
          path: '/teacherList',
          name: 'teacherList',
          component: teacherList,
          meta: { role: '2' }
        },
        {
          path: '/register',
          name: 'register',
          component: register,
          meta: { role: '2' }
        },
        {
          path: '/tpList',
          name: 'tpList',
          component: tpList,
          meta: { role: '3' } 
        },
        {
          path: '/tpDetail',
          name: 'tpDetail',
          component: tpDetail,
          meta: { role: '3' } 
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/test',
      name: 'test',
      component: test,
      meta: { role: '0123' }
    }
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name == 'Login') {
    next()
  } else {
    if (store.getters.user.token && to.meta.role.indexOf(store.getters.user.role)!==-1) {
      next()
    } else {
      next({
        path: '/Login'
      })
    }
  }
})
export default router