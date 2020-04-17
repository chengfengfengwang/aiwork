<template>
  <div class="page">
    <div class="title">
      <div>欢迎加入我们一起学习</div>
      <div>一起成长</div>
    </div>
    <div class="form">
      <div class="input_wrapper name">
        <input v-model="form.nickname" placeholder="请输入您的姓名" type="text">
      </div>
      <div class="input_wrapper phone">
        <input v-model="form.phone" placeholder="请输入您的手机号" type="text">
      </div>
      <div class="input_wrapper v_code">
        <input v-model="form.code" placeholder="请输入验证码" type="text">
        <div class="v_code_btn" @click="getVCode">{{vcodeText}}</div>
      </div>
      <div class="input_wrapper course_option">
        <select required v-model="selectedCourse">
          <!-- <option disabled value>请选择</option> -->
          <option value disabled selected>请选择课程</option>
          <option v-for="course in courseList" :key="course.id" :value="course.id">{{course.name}}</option>
        </select>
      </div>
      <div @click="reg" class="reg_btn">{{isTrial?'注册体验课':'立即注册'}}</div>
    </div>
    <img src="../../../assets/img/regist/rd1.png" alt class="d1">
    <img src="../../../assets/img/regist/rd2.png" alt class="d2">
    <img src="../../../assets/img/regist/rd3.png" alt class="d3">
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      vcodeText: "获取验证码",
      vCode: "",
      selectedCourse: "",
      isTrial: getQueryVariable("is_trial") === "1",
      form: {
        nickname: "",
        phone: "",
        zone: 86,
        code: "",
        institutions_id: getQueryVariable("orgId"),
        course_ids: ""
      },
      courseList: []
    };
  },
  created() {
    this.getCourses();
  },
  mounted() {
    console.log(location.href);
  },
  methods: {
    getCourses() {
      this.axios
        .post(`${process.env.VUE_APP_ORG}/v9/class_info/get_course_apply`, {
          institutions_id: getQueryVariable("orgId"),
          is_trial: this.isTrial ? 1 : 0
        })
        .then(res => {
          this.courseList = res.data;
          console.log("---");
          console.log(this.courseList);
          //this.courseList.unshift({ id: "-1", name: "全部" });
        });
    },
    reg() {
      if (!this.selectedCourse) {
        Toast({
          message: "请选择课程信息",
          duration: 2000
        });
        return
      }
      this.form.course_ids = [Number(this.selectedCourse)];
      this.form.is_trial = this.isTrial ? 1 : 0;
      this.axios
        .post(`${process.env.VUE_APP_ORG}/v9/create_student`, this.form)
        .then(res => {
          this.$router.push("/success");
        });
    },
    getVCode() {
      if (this.vcodeText === "重新获取" || this.vcodeText === "获取验证码") {
        if (this.vcodeText === "获取验证码") {
          this.vCode = "";
        }
        this.axios
          .post(`${process.env.VUE_APP_SMS}/v9/tx_sms`, {
            phone: this.form.phone
          })
          .then(res => {
            console.log(res);
          });
      } else {
        return;
      }
      var count = 59;
      this.vcodeText = count;
      var timer = setInterval(() => {
        this.vcodeText = --count;
        if (this.vcodeText === 0) {
          clearInterval(timer);
          this.vcodeText = "重新获取";
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less">
@import url("./../../../common/common.less");
.font-size(@sizeValue:16) {
  @vw: 16 / 375 * 100;
  @result: @sizeValue / 16 * @vw;
  font-size: ~"@{result}vw";
}
html {
  .font-size(16);
}
html {
  @media screen and (max-width: 320px) {
    .font-size(16);
  }
  @media screen and (min-width: 480px) {
    .font-size(13);
  }
}
html,
body {
  width: 100%;
  height: 100%;
}
.page {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0 30px;
  background: url("../../../assets/img/regist/bottom_bg.png") no-repeat bottom
    center/100%;
}
.title {
  font-size: 28px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(51, 51, 51, 1);
  position: absolute;
  top: 11%;
  left: 8%;
}
.form {
  position: absolute;
  left: 0;
  top: 29%;
  width: 100%;
  padding: 0 30px;
  input {
    border: none;
    background-color: transparent;
    outline: none;
    color: rgba(51, 51, 51, 1);
    left: 17%;
    top: 2%;
    position: absolute;
    width: 70%;
    height: 40px;
    font-size: 16px;
  }
  input::placeholder,
  select:invalid {
    font-size: 16px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 0.2);
  }
  select {
    border: none;
    background-color: transparent;
    outline: none;
    //color: #fff;
    left: 17%;
    top: 2%;
    position: absolute;
    width: 80%;
    height: 40px;
    font-size: 16px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .input_wrapper {
    position: relative;
    width: 100%;
    height: 44px;
    margin-bottom: 15px;
    border-radius: 22px;
    border: 1px solid rgba(51, 51, 51, 0.2);
  }
  .name {
    background: url("../../../assets/img/regist/name.png") no-repeat left 15px
      center/22px 22px;
  }
  .phone {
    background: url("../../../assets/img/regist/phone.png") no-repeat left 15px
      center/18px 24px;
  }
  .v_code {
    background: url("../../../assets/img/regist/safe.png") no-repeat left 15px
      center/20px 24px;
    .v_code_btn {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 106px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(255, 87, 38, 1);
      border-left: 1px solid #f1f1f1;
    }
  }
  .course_option {
    background: url("../../../assets/img/regist/book.png") no-repeat left 15px
      center/24px 20px;
    margin-bottom: 30px;
  }
  .reg_btn {
    height: 44px;
    background: rgba(255, 236, 185, 1);
    border-radius: 22px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 87, 38, 1);
    line-height: 44px;
    text-align: center;
  }
}
.d1 {
  position: absolute;
  left: 0;
  top: 0;
  width: 90px;
}
.d2 {
  position: absolute;
  right: 0;
  top: 27px;
  width: 40px;
}
.d3 {
  position: absolute;
  left: 0;
  top: 210px;
  width: 80px;
  z-index: -1;
}
</style>

