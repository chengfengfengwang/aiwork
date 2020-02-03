<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules" @keydown.enter.native="handleSubmit">
            <FormItem prop="username">
              <Input v-model="form.username" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="ios-person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
          <!-- <p class="login-tip">输入任意用户名和密码即可</p> -->
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: "iguitar20200120"
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入账户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    handleSubmit({ username, password }) {
      this.axios
        .post(`${process.env.WULIU}/user/login`, this.form)
        .then(res => {
          let userInfo = res.data;
           //userInfo.token = res.
           this.$store.dispatch("updateUserInfo", userInfo);
           localStorage.setItem("userInfo", JSON.stringify(userInfo));
           this.$router.push("/instrumentFactory");
          // this.$Message.success("Success!");
        })
        .catch(err => {
          this.$Message.error("登录失败!");
        });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url('./../assets/img/rh.jpg');
  background-color: #7f8583;
  background-size: cover;
  background-position: center;
  position: relative;
  &-con {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translateX(-50%) translateY(-60%);
    width: 400px;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      padding: 10px 0 0;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
</style>
