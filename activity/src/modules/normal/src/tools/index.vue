<template>
  <div id="main">
    <div class="section">
      <van-cell-group>
        <van-field v-model="phone" clearable label="手机号" placeholder="请输入手机号"/>
      </van-cell-group>
      <van-button @click="submit" size="large" type="primary">清除登录信息</van-button>
    </div>
    <div class="section">
      <van-cell-group>
        <van-field v-model="phone1" clearable label="手机号" placeholder="请输入手机号"/>
      </van-cell-group>
      <van-button @click="submit1" size="large" type="primary">删除用户信息</van-button>
    </div>
  </div>
</template>
<script>
import { Field, Cell, CellGroup, Button } from "vant";
import { Toast } from "vant";

export default {
  data() {
    return {
      phone: "",
      phone1: ""
    };
  },
  created(){
    document.title = '机构版工具'
  },
  components: {
    "van-cell-group": CellGroup,
    "van-field": Field,
    "van-button": Button
  },
  methods: {
    submit() {
      if (!this.phone) {
        Toast.fail("请输入手机号");
        return
      }
      this.axios
        .put(`http://api.agency.immusician.com/v9/delete_user`, {
          phone: this.phone
        })
        .then(res => {
          if (!res.error) {
            Toast.success({
              message: "操作成功",
              duration: 1000
            });
          }
        });
    },
    submit1() {
      if (!this.phone1) {
        Toast.fail("请输入手机号");
        return
      }
      this.axios
        .put(`http://api.agency.immusician.com/v9/delete_user`, {
          phone: this.phone1
        })
        .then(res => {
          if (!res.error) {
            Toast.success({
              message: "操作成功",
              duration: 1000
            });
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
#main {
  min-height: 100vh;
  background-color: #f2f3f5;
}
.section {
  margin-bottom: 20px;
}
</style>
