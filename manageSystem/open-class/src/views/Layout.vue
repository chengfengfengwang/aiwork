
<template>
  <div class="layout">
    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <!-- <div class="layout-logo"></div> -->
          <!-- <div class="app_name">课程激活管理后台</div> -->
          <div class="layout-nav"></div>
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
                </DropdownItem> -->
              </DropdownMenu>
            </Dropdown>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff',height:'100vh',overflow:'auto'}">
          <Menu :active-name="activeMenuName" theme="light" width="auto" :open-names="openMenuArr">
            <Submenu name="1">
              <template slot="title">
                <Icon type="ios-navigate"></Icon>功能
              </template>
              <router-link to="/">
                <MenuItem name="OpenClassYinji">音基课程开通</MenuItem> 
              </router-link>
              <router-link to="/book415">
                <MenuItem name="book415">赠书发货信息</MenuItem> 
              </router-link>
              <router-link to="/AlbumList">
                <MenuItem name="AlbumList">歌单</MenuItem> 
              </router-link>
              <!-- <router-link to="/OpenVip">
                <MenuItem name="OpenVip">vip开通</MenuItem> 
              </router-link> -->
              <!-- <router-link to="/OpenClassAi">
                <MenuItem name="OpenClassAi">AI课程开通</MenuItem> 
              </router-link> -->
              <!-- <router-link to="/">
                <MenuItem name="ClassInfo">课程开通</MenuItem>
              </router-link> -->
              <!-- <router-link to="/AppointTimeConfig">
                <MenuItem name="AppointTimeConfig">预约时间配置</MenuItem>
              </router-link>
              <router-link to="/ProductManage">
                <MenuItem name="ProductManage">商品管理</MenuItem>
              </router-link>
              <Submenu name="GameBank">
                <template slot="title">游戏</template>
                <router-link to="/GameBank/GameConfig">
                  <MenuItem name="GameConfig">游戏素材库配置</MenuItem>
                </router-link>
                <router-link to="/GameBank/CourseGame">
                  <MenuItem name="CourseGame">课程游戏配置</MenuItem>
                </router-link>
                <router-link to="/GameBank/LittleGame">
                  <MenuItem name="LittleGame">小游戏配置</MenuItem>
                </router-link>
              </Submenu>
              <Submenu name="QuestionBank">
                <template slot="title">题库</template>
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
              </Submenu>-->
            </Submenu>
            <!-- <Submenu name="User" v-show="$store.getters.permission===0"> -->
            <!-- <Submenu name="User">
              <template slot="title"> 
                <Icon type="md-person"></Icon>用户  
              </template>
              <router-link to="/User/UserList">
                <MenuItem name="UserList">用户列表</MenuItem>
              </router-link>
              <router-link to="/User/Group">
                <MenuItem name="Group">组管理</MenuItem>
              </router-link>
            </Submenu> -->
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
            <!-- <keep-alive include="classList">
              <router-view></router-view>
            </keep-alive> -->
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <Modal v-model="modalShow" width="460">
      <p slot="header" style>
        <span>修改密码</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <!-- <FormItem label="账号" prop="start_time">
            <Input v-model="formValidate.username" placeholder="输入账号" style="width: 300px"/>
          </FormItem>-->
          <FormItem label="旧密码" prop="start_time">
            <Input v-model="formValidate.old_password" placeholder="输入旧密码" style="width: 300px"/>
          </FormItem>
          <FormItem label="新密码" prop="start_time">
            <Input v-model="formValidate.password" placeholder="输入新密码" style="width: 300px"/>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="submitChange('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow = false;">关闭</Button>
      </div>
    </Modal>
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
      activeMenuName: "",
      openMenuArr: ["1"],
      modalShow: false,
      formValidate: {}
    };
  },
  created() {
    this.activeMenuName = this.$route.name;
    this.openMenuArr.push(this.$route.meta.parentMenu);
  },
  mounted() {},
  methods: {
    submitChange() {
      this.axios
        .post(`${process.env.JINKANG}/v3/user2/update_pwd`, this.formValidate)
        .then(res => {
          if (res.error === 0) {
            this.$Message.success("修改成功!");
            this.logout();
          } else {
            this.$Message.error("修改失败!");
          }
          this.modalShow = false;
        });
    },
    logout() {
      localStorage.clear();
      this.$store.dispatch("updateUserInfo", {});
      this.$router.push("/Login");
    },
    changePassword() {
      this.modalShow = true;
    }
  }
};
</script>
<style lang="less" scoped>
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
.app_name{
  color: #fff;
  font-size: 21px;
  margin-top:3px
}
</style>

