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
          <div class="app_name">音乐壳机构版</div>
          <div class="user">
            <!-- <Avatar>A</Avatar> -->
            <span class="role">{{$store.getters.user.phone}}</span>
            <Avatar style="background-color: #87d068" icon="ios-person"/>
            <span class="username">{{$store.state.userInfo.username}}</span>
            <Dropdown trigger="click" style="margin-left: 10px">
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
import menus from "./../common/menus.js";
export default {
  data() {
    return {
      theme2: "light",
      activeMenuName: "",
      openMenuArr: [],
      menus: []
    };
  },
  created() {
    this.menus = menus[this.$store.getters.role];
    this.menus = this.checkMenus(this.menus);
    this.activeMenuName = this.$route.name;
    this.openMenuArr.push(this.$route.meta.parentMenu);
  },
  mounted() {},
  methods: {
    checkMenus(menus) {
      if (!this.$store.getters.hasCheckPower) {
        return menus.filter(e => !e.needCheckPower);
      }
      return menus;
    },
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
    margin: 0 10px;
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

