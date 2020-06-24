import Vue from 'vue'
import Router from 'vue-router'
import store from './../store/index'

import Login from './../views/Login.vue';
import Layout from './../views/Layout.vue';
//直播
import LiveRoomManage from './../views/LiveRoomManage.vue';
import AppointTimeConfig from './../views/AppointTimeConfig.vue';

import ProductManage from './../views/ProductManage.vue';
import MobileTypeConfig from './../views/MobileTypeConfig.vue';

//小游戏
import GameConfig from './../views/GameBank/GameConfig.vue';
import CourseGame from './../views/GameBank/CourseGame.vue';
import LittleGame from './../views/GameBank/LittleGame.vue';
import TestList from './../views/GameBank/TestList.vue';

//小游戏测试
import GameConfigTest from './../views/GameBankTest/GameConfig.vue';
import CourseGameTest from './../views/GameBankTest/CourseGame.vue';

//仿真题库
import QuestionSelect from './../views/QuestionBank/QuestionSelect.vue';
import DragNoteLine from './../views/QuestionBank/DragNoteLine.vue';
import KnockBeat from './../views/QuestionBank/KnockBeat.vue'
import QuestionTests from './../views/QuestionBank/QuestionTests.vue'
import TestDetail from './../views/QuestionBank/TestDetail.vue'
import SightSing from './../views/QuestionBank/SightSing.vue'

//题库
import AnotherQuestionBank from './../views/AnotherQuestionBank/Config.vue';
import Type0 from './../views/AnotherQuestionBank/Type0.vue';
import Type1 from './../views/AnotherQuestionBank/Type1.vue';
import Type2 from './../views/AnotherQuestionBank/Type2.vue';
import Type3 from './../views/AnotherQuestionBank/Type3.vue';
import QuestionBanks from './../views/AnotherQuestionBank/QuestionBanks.vue'

//激活码和奖学金卡
import CodeAndCard_Create from './../views/ActiveCodeAndCard/Create.vue'
import CodeAndCard_ActivedList from './../views/ActiveCodeAndCard/ActivedList.vue'
import CodeAndCard_Create_Ai from './../views/ActiveCodeAndCard/Create_Ai.vue'

//购买完成后添加微信
import AddWx from './../views/AddWx.vue'

//数据统计
import CountSongList from './../views/NewCountData/songList.vue';

//课程学习计划
import CoursePlan from './../views/CoursePlan/index.vue';
import CoursePlanLevelList from './../views/CoursePlan/levelList.vue';

//优惠券
import Yhq from './../views/Yhq.vue/index.vue';

import OrderList from './../views/OrderList.vue';
import UserInfo from './../views/UserInfo.vue';
import ShareConfig from './../views/ShareConfig.vue';
import AppHomeConfig from './../views/AppHomeConfig.vue';
import Config from './../views/Config.vue';

//书籍发货
import Book415 from './../views/book415.vue';
//歌单配置
import AlbumList from './../views/SongList/AlbumList.vue';
import AudioList from './../views/SongList/AudioList.vue';

//工具
import Upload from './../views/Tools/Upload.vue';
import UploadList from './../views/Tools/UploadList.vue';
//开通vip
import OpenVip from './../views/OpenVip.vue';
//快递查询
import Express from './../views/Express/index.vue';
import ExpressActivity from './../views/Express/expressActivity.vue';

import test from './../views/myTest.vue';
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      children: [
        {
          name: 'LiveRoomManage',
          path: '/Live/LiveRoomManage',
          component: LiveRoomManage,
          meta: { parentMenu: 'Live' }
        },
        {
          name: 'AppointTimeConfig',
          path: '/Live/AppointTimeConfig',
          component: AppointTimeConfig,
          meta: { parentMenu: 'Live' }
        },
        // {
        //   name: 'GameConfig',
        //   path: '/Live/GameConfig',
        //   component: GameConfig,
        //   meta: { parentMenu: 'Live' }
        // },
        {
          name: 'LiveRoomManage',
          path: '/',
          component: LiveRoomManage
        },
        {
          name: 'AppointTimeConfig',
          path: '/AppointTimeConfig',
          component: AppointTimeConfig
        },
        {
          name: 'ProductManage',
          path: '/ProductManage',
          component: ProductManage
        },
        {
          name: 'GameConfig',
          path: '/GameBank/GameConfig',
          component: GameConfig,
          meta: { parentMenu: 'GameBank' }
        },
        {
          name: 'TestList',
          path: '/GameBank/TestList',
          component: TestList,
          meta: { parentMenu: 'GameBank' }
        },
        {
          name: 'CourseGame',
          path: '/GameBank/CourseGame',
          component: CourseGame,
          meta: { parentMenu: 'GameBank' }
        },
        {
          name: 'GameConfigTest',
          path: '/GameBankTest/GameConfigTest',
          component: GameConfigTest,
          meta: { parentMenu: 'GameBankTest' }
        },
        {
          name: 'CourseGameTest',
          path: '/GameBankTest/CourseGameTest',
          component: CourseGameTest,
          meta: { parentMenu: 'GameBankTest' }
        },
        {
          name: 'LittleGame',
          path: '/GameBank/LittleGame',
          component: LittleGame,
          meta: { parentMenu: 'GameBank' }
        },
        {
          name: 'QuestionSelect',
          path: '/QuestionBank/QuestionSelect',
          component: QuestionSelect,
          meta: { parentMenu: 'QuestionBank' }
        },
        {
          name: 'DragNoteLine',
          path: '/QuestionBank/DragNoteLine',
          component: DragNoteLine,
          meta: { parentMenu: 'QuestionBank' }
        },
        {
          name: 'KnockBeat',
          path: '/QuestionBank/KnockBeat',
          component: KnockBeat,
          meta: { parentMenu: 'QuestionBank' }
        },
        {
          name: 'SightSing',
          path: '/QuestionBank/SightSing',
          component: SightSing,
          meta: { parentMenu: 'QuestionBank' }
        },
        {
          name: 'QuestionTests',
          path: '/QuestionBank/QuestionTests',
          component: QuestionTests,
          meta: { parentMenu: 'QuestionBank' }
        },
        {
          name: 'TestDetail',
          path: '/QuestionBank/TestDetail',
          component: TestDetail,
          meta: { parentMenu: 'QuestionBank' }
        },
        {
          name: 'MobileTypeConfig',
          path: '/BaseConfig/MobileTypeConfig',
          component: MobileTypeConfig,
          meta: { parentMenu: 'BaseConfig' }
        },
        {
          name: 'AnotherQuestionBank',
          path: '/AnotherQuestionBank/Config',
          component: AnotherQuestionBank,
          meta: { parentMenu: 'AnotherQuestionBank' }
        },
        {
          name: 'Type0',
          path: '/AnotherQuestionBank/Type0',
          component: Type0,
          meta: { parentMenu: 'AnotherQuestionBank' }
        },
        {
          name: 'Type1',
          path: '/AnotherQuestionBank/Type1',
          component: Type1,
          meta: { parentMenu: 'AnotherQuestionBank' }
        },
        {
          name: 'Type2',
          path: '/AnotherQuestionBank/Type2',
          component: Type2,
          meta: { parentMenu: 'AnotherQuestionBank' }
        },
        {
          name: 'Type3',
          path: '/AnotherQuestionBank/Type3',
          component: Type3,
          meta: { parentMenu: 'AnotherQuestionBank' }  
        },
        {
          name: 'Type3',
          path: '/AnotherQuestionBank/QuestionBanks',
          component: QuestionBanks,
          meta: { parentMenu: 'AnotherQuestionBank' }  
        },
        {
          name: 'CodeAndCard_Create',
          path: '/ActiveCodeAndCard/Create',
          component: CodeAndCard_Create,
          meta: { parentMenu: 'ActiveCodeAndCard' }  
        },
        {
          name: 'CodeAndCard_Create_Ai',
          path: '/ActiveCodeAndCard/Create_Ai',
          component: CodeAndCard_Create_Ai,
          meta: { parentMenu: 'ActiveCodeAndCard' }  
        },
        {
          name: 'CodeAndCard_ActivedList', 
          path: '/ActiveCodeAndCard/ActivedList',
          component: CodeAndCard_ActivedList,
          meta: { parentMenu: 'ActiveCodeAndCard' }  
        }, 
        {
          name: 'OrderList',
          path: '/OrderList',
          component: OrderList
        }, 
        {
          name: 'UserInfo',
          path: '/UserInfo',
          component: UserInfo
        },  
        {
          name: 'AddWx',
          path: '/AddWx',
          component: AddWx
        },  
        {
          name: 'ShareConfig',
          path: '/ShareConfig',
          component: ShareConfig
        }, 
        {
          name: 'AppHomeConfig',
          path: '/AppHomeConfig',
          component: AppHomeConfig
        },
        {
          name: 'Config',
          path: '/Config',
          component: Config
        },
        // {
        //   name: 'CountDataCourseAi',
        //   path: '/CountData/CountDataCourseAi',
        //   component: CountDataCourseAi,
        //   meta: { parentMenu: 'CountData' }
        // },  
        {
          name: 'CountSongList',
          path: '/CountData/CountSongList',
          component: CountSongList,
          meta: { parentMenu: 'CountData' }
        }, 
        {
          name: 'OpenVip',
          path: '/OpenVip',
          component: OpenVip
        }, 
        {
          name: 'Express',
          path: '/Express',
          component: Express
        },  
        {
          name: 'ExpressActivity',
          path: '/ExpressActivity',
          component: ExpressActivity
        },
         {
          name: 'Book415',
          path: '/Book415',
          component: Book415
        }, 
        {
          name: 'AlbumList',
          path: '/AlbumList',
          component: AlbumList
        }, 
        {
          name: 'AudioList',
          path: '/AudioList',
          component: AudioList
        }, 
        {
          name: 'CoursePlan',
          path: '/CoursePlan',
          component: CoursePlan,
          meta: { parentMenu: 'CoursePlan' }
        }, 
        {
          name: 'CoursePlanLevelList',
          path: '/CoursePlanLevelList',
          component: CoursePlanLevelList,
          meta: { parentMenu: 'CoursePlan' }
        }, 
        {
          name: 'Yhq',
          path: '/Yhq',
          component: Yhq,
          meta: { parentMenu: 'Yhq' }
        }, 
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
    },
    {
      path: '/test',
      name: 'test',
      component: test,
    },
    {
      path: '/Upload',
      name: 'Upload',
      component: Upload,
    },
    {
      path: '/UploadList',
      name: 'UploadList',
      component: UploadList,
    } 
  ]
})
router.beforeEach((to, from, next) => {
  if (to.name == 'Login' || to.name == 'UploadList') {
    next()
  } else {
    if (store.state.userInfo.token) {
      next()
    } else {
      next({
        path: '/Login'
      })
    }
  }
})
export default router