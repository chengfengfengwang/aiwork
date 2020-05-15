<template>
  <div class="login">
    <div class="login-con">
      <Tabs value="name1">
        <TabPane label="管理员" name="name1">
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
          </div>
        </TabPane>
        <TabPane label="用户" name="name2">
          <div class="form-con">
            <Form ref="loginForm" :model="form" @keydown.enter.native="handleSubmit">
              <div>
                <FormItem class="send_wrapper">
                  <Input v-model="form1.phone" placeholder="请输入手机号">
                    <span slot="prepend">
                      <Icon :size="16" type="ios-person"></Icon>
                    </span>
                  </Input>
                  <Button
                    class="send_btn"
                    size="small"
                    type="info"
                    @click="sendPhoneCode"
                  >{{sendBtnText}}</Button>
                </FormItem>
                <FormItem>
                  <Input type="password" v-model="form1.code" placeholder="请输入验证码">
                    <span slot="prepend">
                      <Icon :size="14" type="md-lock"></Icon>
                    </span>
                  </Input>
                </FormItem>
              </div>
              <FormItem>
                <Button @click="handleSubmit1" type="primary" long>登录</Button>
              </FormItem>
            </Form>
          </div>
        </TabPane>
      </Tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: "admin",
        password: ""
      },
      form1: {
        phone: ""
      },
      sendBtnText: "发送验证码",
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
    handleCountDown() {
      if (
        this.sendBtnText !== "重新发送" &&
        this.sendBtnText !== "发送验证码"
      ) {
        return;
      }
      var timer = setInterval(() => {
        this.sendBtnText = this.countdown--;
        if (this.sendBtnText < 1) {
          this.countdown = 60;
          this.sendBtnText = "重新发送";
          clearInterval(timer);
        }
      }, 1000);
    },
    sendPhoneCode() {
      this.handleCountDown();
      if (
        this.sendBtnText === "重新发送" ||
        this.sendBtnText === "发送验证码"
      ) {
        this.axios
          .post(`${this.msgUrl}`, {
            phone: this.form.phone
          })
          .then(res => {
            // this.$store.dispatch("updateUserInfo", res.data);
            // localStorage.setItem("userInfo", JSON.stringify(res.data));
            // this.$router.push("/ActiveCode");
            // this.$Message.success("Success!");
          })
          .catch(err => {
            this.$Message.error("发送失败!");
          });
      }
    },
    handleSubmit({ username, password }) {
      console.log("handleSubmit");
      let url;
      if (process.env.APP_NAME === "org") {
        url = `${process.env.JINKANG}/${
          process.env.VERSION
        }/agency_teacher/admin_login`;
      } else {
        url = `${process.env.JINKANG}/${
          process.env.VERSION
        }/teacher/admin_login`;
      }

      console.log(this.form);
      this.axios
        .post(url, this.form)
        .then(res => {
          localStorage.setItem("menus", JSON.stringify(res.data.menus));
          this.$store.dispatch("updateUserInfo", res.data);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          this.axios.defaults.headers.common["token"] = res.data.token;
          this.axios.defaults.headers.common["uid"] = res.data.uid;
          this.$Message.success("Success!");
          if (process.env.APP_NAME === "org") {
            this.$router.push("/AnotherQuestionBank/QuestionBanks");
            console.log("org app");
            return;
          }
          if (res.data.username === "珊珊老师") {
            this.$router.push("/GameBankTest/GameConfigTest");
          } else if (res.data.nickname === "徐老师") {
            this.$router.push("/ActiveCodeAndCard/Create");
          } else {
            this.$router.push("/");
          }
        })
        .catch(err => {
          this.$Message.error("登录失败!");
        });
    },
    handleSubmit1() {
      // console.log('handleSubmit1')
      // return
      let url = `${process.env.XIAOPO}/${
          process.env.VERSION
        }/user/login/`;
      this.axios.post(url, this.form1).then(res => {
        if (res.error) return;
        localStorage.setItem("menus", JSON.stringify(res.data.menus));
        this.$store.dispatch("updateUserInfo", res.data);
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        this.axios.defaults.headers.common["token"] = res.data.token;
        this.axios.defaults.headers.common["uid"] = res.data.uid;
        this.$router.push("/ActiveCodeAndCard/ActivedList");
      });
    }
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
    padding: 15px 10px;
    border-radius: 8px;
    background-color: #fff;
    &-header {
      font-size: 16px;
      font-weight: 300;
      text-align: center;
      padding: 30px 0;
    }
    .form-con {
      //padding: 10px 0 0;
      padding: 10px 20px;
    }
    .login-tip {
      font-size: 10px;
      text-align: center;
      color: #c3c3c3;
    }
  }
}
.send_wrapper {
  position: relative;
  .send_btn {
    position: absolute;
    right: 10px;
    top: 6px;
    z-index: 2;
  }
}
</style>
