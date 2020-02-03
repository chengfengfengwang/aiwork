<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <Form ref="loginForm" :model="form" @keydown.enter.native="handleSubmit">
            <FormItem>
              <div class="usertype">
                <span class="label">您的身份：</span>
                <Select v-model="form.personInfo" style="width:100px">
                  <Option value="admin">管理员</Option>
                  <Option value="agent">代理人</Option>
                  <Option value="org">机构负责人</Option>
                </Select>
              </div>
            </FormItem>
            <div>
              <FormItem class="send_wrapper">
                <Input v-model="form.phone" placeholder="请输入手机号">
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
                <Input type="password" v-model="form.code" placeholder="请输入验证码">
                  <span slot="prepend">
                    <Icon :size="14" type="md-lock"></Icon>
                  </span>
                </Input>
              </FormItem>
            </div>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import menus from "./../common/menus.js";
export default {
  data() {
    return {
      form: {
        personInfo: "admin",
        phone: "",
        code: ""
      },
      sendBtnText: "发送验证码"
    };
  },
  mounted() {
    this.countdown = 60;
  },
  methods: {
    changeUrl() {
      if (this.form.personInfo === "agent") {
        this.msgUrl = `${process.env.AGENTSV1}/proxy/tx_sms`;
        this.loginUrl = `${process.env.AGENTSV1}/proxy/login`;
        this.loginMethod = `put`;
      } else {
        this.msgUrl = `${process.env.AGENTSV9}/tx_sms`;
        this.loginUrl = `${process.env.AGENTSV9}/phone_login`;
        this.loginMethod = `post`;
      }
    },
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
    handleSubmit() {
      if(this.form.personInfo === "org"){
        this.form.is_admin = 1
      }else{
        delete this.form.is_admin
      }
      this.axios[this.loginMethod](`${this.loginUrl}`, this.form)
        .then(res => {
          let userInfo  = res.data;
          // if (this.form.personInfo === "agent") {
          //   this.axios.defaults.headers.common["uid"] = userInfo.proxy_id;
          // } else {
          //   this.axios.defaults.headers.common["uid"] = userInfo.uid;
          // }
          this.$store.dispatch("updateUserInfo", userInfo);
          localStorage.setItem("userInfo", JSON.stringify(userInfo));
          this.axios.defaults.headers.common["uid"] = userInfo.uid;
          this.axios.defaults.headers.common["token"] = userInfo.token;
          const curMenus = menus[this.$store.getters.role];
          this.$router.push(curMenus[0].link);
        })
        .catch(err => {
          console.log(err);
          this.$Message.error("登录失败，用户名或密码错误");
        });
    }
  },
  watch: {
    form: {
      handler(newName, oldName) {
        this.changeUrl();
      },
      immediate: true,
      deep: true
    }
  }
};
</script>

<style lang="less" scoped>
.usertype {
  margin-bottom: 10px;
  text-align: center;
  font-size: 14px;
  .label {
    font-weight: bold;
  }
}
.login {
  width: 100%;
  height: 100vh;
  //background-image: url("./../assets/bg.jpg");
  background: url("./../assets/bg.jpg") no-repeat center/cover;

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
