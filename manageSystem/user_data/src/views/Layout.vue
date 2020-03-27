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
          <!-- <div class="layout-logo"></div> -->
          <h2 style="color:#fff;margin-top:4px">运营相关</h2>
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
              <MenuItem name="GroupList">用户分组</MenuItem>
            </router-link>
            <router-link to="/Activity">
              <MenuItem name="Activity">活动管理</MenuItem>
            </router-link>
            <router-link to="/UserList">
              <MenuItem name="UserList">用户列表</MenuItem>
            </router-link>
            <router-link to="/MessagePush">
              <MenuItem name="MessagePush">消息推送</MenuItem>
            </router-link>
            <router-link to="/ActiveCode"> 
              <MenuItem name="ActiveCode">激活码/奖学金</MenuItem>
            </router-link>-->
            <!-- <router-link to="/UnlockCourse">
              <MenuItem name="UnlockCourse">课程解锁</MenuItem>
            </router-link>
            <router-link to="/">
              <MenuItem name="WriteOrders">订单同步</MenuItem>
            </router-link>
            <router-link to="/instrumentFactory">
              <MenuItem name="instrumentFactory">厂商</MenuItem>
            </router-link>
            <router-link to="/channels">
              <MenuItem name="channels">渠道</MenuItem>
            </router-link>
            <router-link to="/channelTemplate">
              <MenuItem name="channelTemplate">渠道模版</MenuItem>
            </router-link>-->
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px 24px',height:'calc(100vh - 60px)'}">
          <!-- <Breadcrumb :style="{margin: '24px 0'}">
                        <BreadcrumbItem>Home</BreadcrumbItem>
                        <BreadcrumbItem>Components</BreadcrumbItem>
                        <BreadcrumbItem>Layout</BreadcrumbItem>
          </Breadcrumb>-->
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
    hasChild: false,
    name: "UnlockCourse",
    text: "课程解锁",
    link: "/UnlockCourse"
  },
  // {
  //   hasChild: false,
  //   name: "WriteOrders",
  //   text: "订单同步",
  //   link: "/"
  // },
  {
    hasChild: false,
    name: "instrumentFactory",
    text: "厂商",
    link: "/instrumentFactory"
  },
  {
    hasChild: false,
    name: "channels",
    text: "渠道",
    link: "/channels"
  },
  {
    hasChild: false,
    name: "channelTemplate",
    text: "渠道模版",
    link: "/channelTemplate"
  },
  {
    hasChild: false,
    name: "orderList",
    text: "订单列表",
    link: "/orderList"
  },

  {
    hasChild: true,
    name: "Bills",
    menuText: "财务报表",
    children: [
      {
        hasChild: false,
        name: "channelBills",
        text: "渠道对账单",
        link: "/channelBills"
      },
      {
        hasChild: false,
        name: "factoryBills",
        text: "厂商对账单",
        link: "/factoryBills"
      }
    ]
  },
   {
    hasChild: false,
    name: "tools",
    text: "万物工具",
    link: "/tools"
  }
];
export default {
  data() {
    return {
      menus: myMenus,
      theme2: "light",
      activeMenuName: "",
      openMenuArr: ["1"]
    };
  },
  created() {
    this.activeMenuName = this.$route.name;
    this.openMenuArr.push(this.$route.meta.parentMenu);
  },
  mounted() {},
  methods: {
    logout() {
      localStorage.clear();
      this.$store.dispatch("updateUserInfo", {});
      this.$router.push("/Login");
    }
  }
};
</script>
<style lang="less">
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
</style>
