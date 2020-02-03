<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" :title="isLogin ? '欢迎登录' : '注册'" :bordered="false">
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
            <FormItem prop="password" v-show>
              <Input type="password" v-model="repeatPassword" placeholder="请重复输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="md-lock"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>{{isLogin ? '登录':'注册'}}</Button>
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
        username: "",
        password: ""
      },
      repeatPassword: "",
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
  computed: {
    isLogin() {
      if (this.$route.params.param === "login") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    regist() {
      this.axios
        .get(
          `${process.env.LIUXIN}/user/register/?username=${
            this.form.username
          }&password=${this.form.password}`
        )
        .then(res => {
          this.$Message.success(res.msg);
          if (!res.error) {
            localStorage.setItem("myUserName", this.form.username);
            this.$router.push("/");
          }
        });
    },
    login() {
      this.axios
        .get(
          `${process.env.LIUXIN}/user/login/?username=${
            this.form.username
          }&password=${this.form.password}`
        )
        .then(res => {
          this.$Message.success(res.msg);
          if (!res.error) {
            localStorage.setItem("myUserName", this.form.username);
            this.$router.push("/");
          }
        });
    },
    handleSubmit({ username, password }) {
      if (this.isLogin) {
        this.login();
      } else {
        this.regist();
      }
      return;
      this.axios
        .post(`${process.env.CHENGLONG}/v1/teacher/admin_login`, this.form)
        .then(res => {
          this.$store.dispatch("updateUserInfo", res.data);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          this.$router.push("/");
          this.axios.defaults.headers.common["token"] = res.data.token;
          this.axios.defaults.headers.common["uid"] = res.data.uid;
          this.$Message.success("Success!");
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
  background-image: url("https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1581687483,23888076&fm=26&gp=0.jpg");
  background-color: #f2f2f2;
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
