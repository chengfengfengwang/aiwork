<template>
  <div class="login">
    <div class="login-con">
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <Form ref="loginForm" :model="form" @keydown.enter.native="handleSubmit">
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
export default {
  data() {
    return {
      form: {
        phone: "18810240072",
        code: ""
      },
      sendBtnText: "发送验证码"
    };
  },
  mounted() {
    this.countdown = 60;
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
          .post(`${process.env.XIAOPO}/v1/users/sms`, {
            phone: this.form.phone,
            zone: 86
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
      this.axios
        .post(`${process.env.XIAOPO}/v1/users/login`, this.form)
        .then(res => {
          this.$store.dispatch("updateUserInfo", res.data);
          localStorage.setItem("userInfo", JSON.stringify(res.data));
          this.$router.push("/ActiveCode");
          this.$Message.success("Success!");
        })
        .catch(err => {
          console.log(err)
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
  //background-image: url("./../assets/bg.jpg");
  background-color: #5ad17cb5;
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
