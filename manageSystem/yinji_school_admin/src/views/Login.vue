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
      }
    };
  },
  methods: {
    handleSubmit({ username, password }) {
    //   this.$refs.loginForm.validate(valid => {
    //     if (valid) {
    //       console.log(this.form);
    //       this.axios
    //         .post(`${process.env.CHENGLONG}/v1/teacher/admin_login`, this.form)
    //         .then(res => {
    //           this.$store.dispatch("updateschoolInfo", res.data);
    //           localStorage.setItem("userInfo", JSON.stringify(res.data));
    //           this.$router.push("/");
    //           this.$Message.success("Success!");
    //         })
    //         .catch(err => {
    //           this.$Message.error("登录失败!");
    //         });
    //     } else {
    //       this.$Message.error("Fail!");
    //     }
    //   });
    }
  }
};
</script>

<style lang="less" scoped>
.login {
  width: 100%;
  height: 100vh;
  //background-image: url("./../assets/bg.jpg");
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
</style>
