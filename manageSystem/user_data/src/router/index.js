import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/index'

import Login from './../views/Login.vue';
import Layout from './../views/Layout.vue';
import GroupList from './../views/GroupList.vue';
import GroupUserList from './../views/GroupUserList.vue'
import Activity from './../views/Activity.vue'
import UserList from './../views/Users/UserList.vue'
import UserDetail from './../views/Users/UserDetail.vue'
import MessagePush from './../views/MessagePush/MessagePush.vue'
import AcCodeLogin from './../views/AcCodeLogin.vue'
import ActiveCode from './../views/ActiveCode/ActiveCode.vue'
import BatchList from './../views/ActiveCode/BatchList.vue'
import CodeList from './../views/ActiveCode/CodeList.vue'
import UnlockCourse from './../views/UnlockCourse.vue'
import WriteOrders from './../views/WriteOrders/index.vue'
import OrderProcess from './../views/OrderProcess/index.vue'
import instrumentFactory from './../views/OrderProcess/instrumentFactory.vue'
import childGoods from './../views/OrderProcess/childGoods.vue'
import channels from './../views/OrderProcess/channels.vue'
import goodsPackage from './../views/OrderProcess/goodsPackage.vue'
import channelTemplate from './../views/OrderProcess/channelTemplate.vue'
import channelDataUpload from './../views/OrderProcess/channelDataUpload.vue'
import orderList from './../views/OrderProcess/orderList.vue'
import uploadList from './../views/OrderProcess/uploadList.vue'
import orderListToday from './../views/OrderProcess/orderListToday.vue'
import channelBills from './../views/OrderProcess/channelBills.vue'
import factoryBills from './../views/OrderProcess/factoryBills.vue'
import tools from './../views/OrderProcess/tools'
import wanwuOrderList from './../views/OrderProcess/wanwuOrderList.vue'
//账号还原
import ResetAccount from './../views/OrderProcess/ResetAccount.vue'
//夏令营活动
import SumerCamp from './../views/SumerCamp.vue'
import downloadChannels from './../views/OrderProcess/downloadChannels.vue'

import Test from './../views/Test.vue';

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        // {
        //   name: 'GroupList',
        //   path: '/',
        //   component: GroupList 
        // },
        //夏令营
        {
          name: 'SumerCamp',
          path: '/SumerCamp',
          component: SumerCamp
        },
        {
          name: 'GroupUserList',
          path: '/GroupUserList',
          component: GroupUserList
        },
        {
          name: 'Activity',
          path: '/Activity',
          component: Activity
        },
        {
          name: 'UserList',
          path: '/UserList',
          component: UserList
        },
        {
          name: 'UserDetail',
          path: '/UserDetail',
          component: UserDetail
        },
        {
          name: 'MessagePush',
          path: '/MessagePush',
          component: MessagePush
        },
        {
          name: 'ActiveCode',
          path: '/ActiveCode',
          component: ActiveCode
        },
        {
          name: 'BatchList',
          path: '/BatchList',
          component: BatchList
        },
        {
          name: 'CodeList',
          path: '/CodeList',
          component: CodeList
        },
        {
          name: 'UnlockCourse',
          path: '/UnlockCourse',
          component: UnlockCourse
        },
        {
          name: 'WriteOrders',
          path: '/',
          component: WriteOrders,
          redirect: '/channels'
        },
        {
          name: 'OrderProcess',
          path: '/OrderProcess',
          component: OrderProcess
        },
        {
          name: 'instrumentFactory',
          path: '/instrumentFactory',
          component: instrumentFactory
        },
        {
          name: 'childGoods',
          path: '/childGoods',
          component: childGoods
        },
        {
          name: 'channels',
          path: '/channels',
          component: channels
        },
        {
          name: 'goodsPackage',
          path: '/goodsPackage',
          component: goodsPackage
        },
        {
          name: 'channelTemplate',
          path: '/channelTemplate',
          component: channelTemplate
        },
        {
          name: 'channelDataUpload',
          path: '/channelDataUpload',
          component: channelDataUpload
        },
        {
          name: 'orderList',
          path: '/orderList',
          component: orderList
        },
        {
          name: 'uploadList',
          path: '/uploadList',
          component: uploadList
        },
        {
          name: 'orderListToday',
          path: '/orderListToday',
          component: orderListToday
        },
        {
          name: 'channelBills',
          path: '/channelBills',
          component: channelBills,
          meta: { parentMenu: 'Bills' }
        },
        {
          name: 'downloadChannels',
          path: '/downloadChannels',
          component: downloadChannels,
          meta: { parentMenu: 'Bills' }
        },
        {
          name: 'factoryBills',
          path: '/factoryBills',
          component: factoryBills,
          meta: { parentMenu: 'Bills' }
        },
        {
          name: 'tools',
          path: '/tools',
          component: tools
        },
        {
          name: 'Test',
          path: '/test',
          component: Test
        },
        {
          name: 'wanwuOrderList',
          path: '/wanwuOrderList',
          component: wanwuOrderList
        },
        {
          name: 'ResetAccount',
          path: '/ResetAccount',
          component: ResetAccount
        }
      ]
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login,
    },
    {
      name: 'AcCodeLogin',
      path: '/AcCodeLogin',
      component: AcCodeLogin
    },
  ]
})
router.beforeEach((to, from, next) => {
  // if (to.name == 'Login') {
  //   next()
  // } else {
  //   if (store.state.userInfo.token) {
  //     next()
  //   } else {
  //     next({
  //       path: '/Login'
  //     })
  //   }
  // }
  next()
})
export default router