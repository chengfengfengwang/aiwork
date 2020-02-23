<template>
  <div class="success_page">
    <div class="main">
      <div class="input_wrapper">
        <input v-model="acCode" placeholder="请输入激活码，注意区分大小写" type="text" />
      </div>
      <div @click="ac" class="acbtn" :class="{active:acBtn}">立即激活</div>
    </div>
    <img src="../../../assets/img/activeCourse/top.png" alt class="top" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      acCode: "",
      acBtn: false
    };
  },
  methods: {
    ac() {
      //this.form.is_trial = this.isTrial ? 1 : 0;
      this.axios
        .post(
          `http://api.agency.immusician.com/v9/code/active_code`,
          {
            code: this.acCode
          },
          {
            headers: {
              uid: localStorage.getItem("uid"),
              token: localStorage.getItem("token")
            }
          }
        )
        .then(res => {
          if (!res.error) {
            let data = res.data;
            localStorage.setItem("acCourseList", JSON.stringify(data));
            this.$router.push("/acSuccess");
          } else {
          }
          return;
        });
    }
  },
  watch: {
    acCode() {
      if ((this.acCode + "").length > 0) {
        this.acBtn = true;
      } else {
        this.acBtn = false;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.success_page {
  height: 100vh;
  position: relative;
  background: rgba(120, 207, 123, 1);
}
.main {
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translateX(-50%);
  width: 311px;
  height: 280px;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  z-index: 3;
  input {
    margin-top: 80px;
    border: none;
    background-color: transparent;
    outline: none;
    width: 70%;
    height: 40px;
    font-size: 21px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 128, 48, 1);
    border-bottom: 2px solid #f5dd77;
    text-align: center;
  }
  input::placeholder,
  select:invalid {
    font-size: 15px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(142, 142, 142, 1);
  }
  .acbtn {
    display: inline-block;
    margin-top: 45px;
    width: 210px;
    height: 45px;
    line-height: 45px;
    background: rgba(255, 128, 48, 1);
    border-radius: 23px;
    opacity: 0.5;
    font-size: 17px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
  .acbtn.active {
    opacity: 1;
  }
}
.btn {
  position: absolute;
  left: 50%;
  top: 67%;
  transform: translateX(-50%);
  width: 315px;
  height: 44px;
  line-height: 44px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 22px;
  text-align: center;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 87, 38, 1);
}
img.top {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
}
</style>

