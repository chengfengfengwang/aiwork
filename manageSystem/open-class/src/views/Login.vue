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
          <!-- <div class="forget" @click="changePassword">
            <a href="javascript:;">修改密码</a>
          </div> -->
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
      modalShow: false,
      form: {
        username: "",
        password: ""
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
      },
      formValidate: {}
    };
  },
  methods: {
    handleSubmit({ username, password }) {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          console.log(this.form);
          this.axios
            .post(`${process.env.JINKANG}/v3/user2/login/`, this.form)
            .then(res => {
              if (res.error === 0) {
                this.$store.dispatch("updateUserInfo", res.data);
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                this.axios.defaults.headers.common['token'] = res.data.token;
                this.axios.defaults.headers.common['uid'] = res.data.uid;
                this.axios.defaults.headers.common['key'] = res.data.key;
                this.$router.push("/");
                this.$Message.success("登录成功!");
              } else {
                this.$Message.error("登录失败，用户名或密码错误");
              }
            });
        } else {
          this.$Message.error("Fail!");
        }
      });
    },
    
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  background-image: url("./../assets/bg.jpg");
  background-color: #000;
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
.forget {
  text-align: center;
  font-size: 12px;
}
</style>
