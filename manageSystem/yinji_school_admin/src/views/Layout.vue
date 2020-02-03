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
          <h2 style="color:#fff;margin-top:4px">音乐壳校园版管理系统</h2>
          <div class="layout-nav">
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff',height:'100vh',overflow:'auto'}">
          <Menu :active-name="activeMenuName" theme="light" width="auto" :open-names="openMenuArr">
            <router-link to="/Schools">
              <MenuItem name="GroupList">学校管理</MenuItem>
            </router-link>
            <router-link to="/StudentsList">
              <MenuItem name="StudentsList">学生列表</MenuItem>
            </router-link>
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
export default {
  data() {
    return {
      theme2: "light",
      activeMenuName:"",
      openMenuArr:['1']
    };
  },
  created(){
      this.activeMenuName = this.$route.name;
      this.openMenuArr.push(this.$route.meta.parentMenu);
  },
  mounted(){
  }
};
</script>
