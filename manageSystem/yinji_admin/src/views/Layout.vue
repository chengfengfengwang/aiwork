<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100vh;
}
.layout-logo {
  width: 100px;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
}
.ivu-menu-item {
  color: #515a6e;
}
</style>
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-nav"></div>
          <div class="app_name">{{appName}}</div>
          <div class="user">
            <!-- <Avatar>A</Avatar> -->
            <span class="role">{{$store.getters.role}}</span>
            <Avatar style="background-color: #87d068" icon="ios-person"/>
            <span class="username">{{$store.state.userInfo.username}}</span>
            <Dropdown trigger="click" style="margin-left: 20px">
              <span href="javascript:void(0)">
                <Icon color="#7cc95d" size="25" type="md-add"/>
              </span>
              <DropdownMenu slot="list">
                <DropdownItem>
                  <span class="quit" @click="logout">退出登录</span>
                </DropdownItem>
                <!-- <DropdownItem>
                  <span @click="changePassword">修改密码</span>
                </DropdownItem>-->
              </DropdownMenu>
            </Dropdown>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff',height:'100vh',overflow:'auto'}">
          <Menu :active-name="activeMenuName" theme="light" width="auto" :open-names="openMenuArr">
            <template v-for="(item,index) in menus">
              <router-link v-if="!item.hasChild" :to="item.link" :key="index">
                <MenuItem :name="item.name">{{item.text}}</MenuItem>
              </router-link>
              <Submenu v-else :name="item.name">
                <template slot="title">{{item.menuText}}</template>
                <router-link v-for="(child,idx) in item.children" :to="child.link" :key="idx">
                  <MenuItem :name="child.name">{{child.text}}</MenuItem>
                </router-link>
              </Submenu>
            </template>

            <!-- <router-link to="/">
              <MenuItem name="1-1">直播间配置</MenuItem>
            </router-link>
            <router-link to="/AppointTimeConfig">
              <MenuItem name="AppointTimeConfig">预约时间配置</MenuItem>
            </router-link>
            <router-link to="/ProductManage">
              <MenuItem name="ProductManage">商品管理</MenuItem>
            </router-link>
            <router-link to="/OrderList">
              <MenuItem name="OrderList">订单列表</MenuItem>
            </router-link>
            <Submenu name="GameBank">
              <template slot="title">游戏</template>
              <router-link to="/GameBank/GameConfig">
                <MenuItem name="GameConfig">游戏素材库配置</MenuItem>
              </router-link>
              <router-link to="/GameBank/CourseGame">
                <MenuItem name="CourseGame">课程游戏配置</MenuItem>
              </router-link>
            </Submenu>
            <Submenu name="QuestionBank">
              <template slot="title">模拟考题库</template>
              <router-link to="/QuestionBank/QuestionSelect">
                <MenuItem name="QuestionSelect">选择题</MenuItem>
              </router-link>
              <router-link to="/QuestionBank/DragNoteLine">
                <MenuItem name="DragNoteLine">拖拽小节线</MenuItem>
              </router-link>
              <router-link to="/QuestionBank/KnockBeat">
                <MenuItem name="KnockBeat">敲击单位拍</MenuItem>
              </router-link>
              <router-link to="/QuestionBank/SightSing">
                <MenuItem name="SightSing">视唱</MenuItem>
              </router-link>
              <router-link to="/QuestionBank/QuestionTests">
                <MenuItem name="QuestionTests">模拟试题库</MenuItem>
              </router-link>
            </Submenu>
            <Submenu name="AnotherQuestionBank">
              <template slot="title">练习库</template>
              <router-link to="/AnotherQuestionBank/Type0">
                <MenuItem name="Type0">乐理</MenuItem>
              </router-link>
              <router-link to="/AnotherQuestionBank/Type1">
                <MenuItem name="Type1">练耳</MenuItem>
              </router-link>
              <router-link to="/AnotherQuestionBank/Type2">
                <MenuItem name="Type2">常识</MenuItem>
              </router-link>
              <router-link to="/AnotherQuestionBank/Type3">
                <MenuItem name="Type3">视唱</MenuItem>
              </router-link>
              <router-link to="/AnotherQuestionBank/QuestionBanks">
                <MenuItem name="QuestionBanks">题库集合</MenuItem>
              </router-link>
            </Submenu>
            <Submenu name="ActiveCodeAndCard">
              <template slot="title">激活码和奖学金卡</template>
              <router-link to="/ActiveCodeAndCard/Create">
                <MenuItem name="CodeAndCard_Create">配置/列表</MenuItem>
              </router-link>
            </Submenu>
            <Submenu name="BaseConfig">
              <template slot="title">基础配置</template>
              <router-link to="/BaseConfig/MobileTypeConfig">
                <MenuItem name="MobileTypeConfig">自采机型配置</MenuItem>
              </router-link>
            </Submenu>
            <router-link to="/UserInfo">
              <MenuItem name="UserInfo">用户信息修改</MenuItem>
            </router-link>
            <router-link to="/AddWx">
              <MenuItem name="AddWx">老师微信配置</MenuItem>
            </router-link>
            <Submenu name="CountData">
              <template slot="title">数据统计</template>
              <router-link to="/CountData/CountDataCourseAi">
                <MenuItem name="CountDataCourseAi">数据统计AI</MenuItem>
              </router-link>
              <router-link to="/CountData/CountDataCourseYinji">
                <MenuItem name="CountDataCourseYinji">数据统计音基</MenuItem>
              </router-link>
            </Submenu>-->
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px 24px',height:'calc(100vh - 60px)'}">
          <Content
            :style="{marginTop:'20px',padding: '24px', minHeight: '280px', background: '#fff',overflow:'auto'}"
          >
            <router-view></router-view>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import {
  Row,
  Submenu,
  Col,
  Icon,
  MenuItem,
  Menu,
  Sider,
  Layout,
  Breadcrumb,
  BreadcrumbItem,
  Card
} from "iview";

const myMenus = [
  {
    hasChild: true,
    name: "Live",
    menuText: "直播业务配置",
    children: [
      {
        name: "LiveRoomManage",
        text: "直播间配置",
        link: "/Live/LiveRoomManage"
      },
      {
        name: "AppointTimeConfig",
        text: "预约时间配置",
        link: "/Live/AppointTimeConfig"
      }
    ]
  },
  {
    hasChild: false,
    name: "ProductManage",
    text: "商品管理",
    link: "/ProductManage"
  },
  {
    hasChild: false,
    name: "OrderList",
    text: "订单列表",
    link: "/OrderList"
  },
  {
    hasChild: true,
    name: "GameBank",
    menuText: "游戏",
    children: [
      {
        name: "GameConfig",
        text: "游戏素材库配置",
        link: "/GameBank/GameConfig"
      },
      {
        name: "TestList",
        link: "/GameBank/TestList",
        text: "测试游戏列表"
      },
      {
        name: "LittleGame",
        link: "/GameBank/LittleGame",
        text: "小游戏"
      },
      { name: "CourseGame", text: "课程游戏配置", link: "/GameBank/CourseGame" }
    ]
  },
  {
    hasChild: true,
    name: "GameBankTest",
    menuText: "游戏测试数据配置",
    children: [
      {
        name: "GameConfigTest",
        text: "游戏素材库配置",
        link: "/GameBankTest/GameConfigTest"
      },
      {
        name: "CourseGameTest",
        text: "课程游戏配置",
        link: "/GameBankTest/CourseGameTest"
      }
    ]
  },
  {
    hasChild: true,
    name: "QuestionBank",
    menuText: "模拟考题库",
    children: [
      {
        name: "QuestionSelect",
        text: "选择题",
        link: "/QuestionBank/QuestionSelect"
      },
      {
        name: "DragNoteLine",
        text: "拖拽小节线",
        link: "/QuestionBank/DragNoteLine"
      },
      {
        name: "KnockBeat",
        text: "敲击单位拍",
        link: "/QuestionBank/KnockBeat"
      },
      {
        name: "SightSing",
        text: "视唱",
        link: "/QuestionBank/SightSing"
      },
      {
        name: "QuestionTests",
        text: "模拟试题库",
        link: "/QuestionBank/QuestionTests"
      }
    ]
  },
  {
    hasChild: true,
    name: "AnotherQuestionBank",
    menuText: "练习库",
    children: [
      {
        name: "Type0",
        text: "乐理",
        link: "/AnotherQuestionBank/Type0"
      },
      {
        name: "Type1",
        text: "练耳",
        link: "/AnotherQuestionBank/Type1"
      },
      {
        name: "Type2",
        text: "常识",
        link: "/AnotherQuestionBank/Type2"
      },
      {
        name: "Type3",
        text: "视唱",
        link: "/AnotherQuestionBank/Type3"
      },
      {
        name: "QuestionBanks",
        text: "题库集合",
        link: "/AnotherQuestionBank/QuestionBanks"
      }
    ]
  },
  {
    hasChild: true,
    name: "ActiveCodeAndCard",
    menuText: "激活码和奖学金卡",
    children: [
      {
        name: "CodeAndCard_Create",
        text: "配置/列表",
        link: "/ActiveCodeAndCard/Create"
      }
    ]
  },
  {
    hasChild: true,
    name: "BaseConfig",
    menuText: "基础配置",
    children: [
      {
        name: "MobileTypeConfig",
        text: "配置",
        link: "/BaseConfig/MobileTypeConfig"
      }
    ]
  },
  {
    hasChild: false,
    name: "UserInfo",
    text: "用户信息修改",
    link: "/UserInfo"
  },
  {
    hasChild: false,
    name: "AddWx",
    text: "老师微信配置",
    link: "/AddWx"
  },
  {
    hasChild: true,
    name: "CountData",
    menuText: "数据统计",
    children: [
      {
        name: "CountDataCourseAi",
        text: "AI课程",
        link: "/CountData/CountDataCourseAi"
      },
      {
        name: "CountDataActivityAi",
        text: "Ai活动",
        link: "/CountData/CountDataActivityAi"
      },
      {
        name: "CountDataCourseYinji",
        text: "音基课程",
        link: "/CountData/CountDataCourseYinji"
      },
      {
        name: "CountDataActivityYinji",
        text: "音基活动",
        link: "/CountData/CountDataActivityYinji"
      }
    ]
  },
  {
    hasChild: false,
    name: "ShareConfig",
    text: "app分享配置",
    link: "/ShareConfig"
  },
  {
    hasChild: false,
    name: "Config",
    text: "配置",
    link: "/Config"
  }
];
const shanshanMenus = [
  {
    hasChild: true,
    name: "GameBankTest",
    menuText: "游戏测试数据配置",
    children: [
      {
        name: "GameConfigTest",
        text: "游戏素材库配置",
        link: "/GameBankTest/GameConfigTest"
      },
      {
        name: "CourseGameTest",
        text: "课程游戏配置",
        link: "/GameBankTest/CourseGameTest"
      }
    ]
  }
];
const openvip = [
    {
    hasChild: false,
    name: "OpenVip",
    text: "vip",
    link: "/OpenVip"
  }
]
const jiaoyan = 
[
    {
    hasChild: false,
    name: "AlbumList",
    text: "歌单",
    link: "/AlbumList"
  },
  {
    hasChild: false,
    name: "Book415",
    text: "快递信息",
    link: "/Book415"
  }
]
export default {
  data() {
    return {
      theme2: "light",
      activeMenuName: "",
      openMenuArr: ["1"],
      menus: [],
      appName: ""
    };
  },
  created() {
    this.menus = localStorage.getItem("menus")
      ? JSON.parse(localStorage.getItem("menus"))
      : myMenus;
    // this.menus = [{
    //   hasChild: false,
    //   name: "ActiveCodeAndCard",
    //   text: "激活码",
    //   link: "/ActiveCodeAndCard/ActivedList"
    // }];
    this.activeMenuName = this.$route.name;
    this.openMenuArr.push(this.$route.meta.parentMenu);
    this.getAppName();
  },
  mounted() {},
  methods: {
    getAppName() {
      var oAppName = process.env.APP_NAME;
      switch (oAppName) {
        case "yinji":
          this.appName = "音乐壳";
          break;
        case "org":
          this.appName = "音乐壳机构版";
          break;
        case "school":
          this.appName = "音乐壳校园版";
          break;
      }
    },
    logout() {
      localStorage.clear();
      this.$store.dispatch("updateUserInfo", {});
      this.$router.push("/Login");
    }
  }
};
</script>
<style scoped>
.user {
  position: absolute;
  right: 0;
  top: 0;
  color: #fff;
  .role {
    margin: 0 15px;
  }
  .username {
    margin: 0 0px;
  }
  .quit {
    cursor: pointer;
    margin-left: 0px;
  }
}
.app_name {
  color: #fff;
  font-size: 21px;
  margin-top: 3px;
}
</style>

