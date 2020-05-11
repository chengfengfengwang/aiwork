<template>
  <div class="page">
    <div class="logo">
      <img src="../../../assets/img/zs/loginb2.png" alt>
    </div>
    <div class="bottom_coco">
      <img src="../../../assets/img/zs/coco.png" alt>
    </div>
    <div class="form">
      <div class="input_wrapper name">
        <input v-model="form.name" placeholder="请输入宝贝姓名领取证书" type="text">
      </div>
      <div class="input_wrapper course_option">
        <select required v-model="selInstrument">
          <option value disabled selected>选择课程品类</option>
          <option v-for="course in instrumentList" :key="course" :value="course">{{course}}</option>
        </select>
      </div>
      <div @click="reg" class="reg_btn">领取证书</div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
export default {
  data() {
    return {
      instrumentList: [
        "快乐非洲鼓初级",
        "快乐非洲鼓中级",
        "音乐素养",
        "趣味乐理视唱练耳初级",
        "趣味乐理视唱练耳中级",
        "尤克里里畅游记初级",
        "尤克里里畅游记中级",
      ],
      selInstrument: "",
      form: {
        name: ""
      }
    };
  },
  created() {},
  mounted() {
    this.inputevent();
  },
  methods: {
    inputevent() {
      var inputArr = document.querySelectorAll("input");
      inputArr.forEach(function(ele) {
        let scrollTop;
        ele.addEventListener("focus", function() {
          scrollTop = document.body.scrollTop;
          console.log(scrollTop);
        });
        ele.addEventListener("blur", function() {
          //document.body.scrollTop = scrollTop;
          window.scrollTo(0, 0);
          console.log(scrollTop);
        });
      });
    },
    reg() {
      localStorage.setItem("zsName", this.form.name);
      localStorage.setItem("zsCourse", this.selInstrument);
      location.href = `${location.origin}${location.pathname}#/poster1`
      //this.$router.push("/poster1");
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
  min-height: 100vh;
  position: relative;
  padding: 0 30px;
  background: url("../../../assets/img/zs/loginb1.png") no-repeat top
      center/100%,
    url("../../../assets/img/zs/loginb3.png") no-repeat bottom center/100%;
  background-color: #fff8df;
}
.logo {
  position: absolute;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 122px;
  img {
    width: 100%;
  }
}
.bottom_coco {
  position: absolute;
  bottom: 45px;
  right: 10px;
  img {
    width: 145px;
  }
}
.form {
  position: absolute;
  left: 0;
  top: 32%;
  width: 100%;
  padding: 0 30px;
  input {
    border: none;
    background-color: transparent;
    outline: none;
    color: rgba(51, 51, 51, 1);
    left: 12%;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    width: 70%;
    height: 40px;
    font-size: 16px;
  }
  input::placeholder,
  select:invalid {
    font-size: 16px;
    font-family: "PingFang-SC-Regular", "PingFang-SC";
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
  }
  select {
    //text-align: center;
    border: none;
    background-color: transparent;
    outline: none;
    //color: #fff;
    left: 12%;
    top: 50%;
    transform: translateY(-50%);
    position: absolute;
    width: 80%;
    height: 40px;
    font-size: 16px;
    font-family: "PingFang-SC-Regular", "PingFang-SC";
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .input_wrapper {
    position: relative;
    width: 100%;
    height: 50px;
    margin-bottom: 30px;
    border-radius: 25px;
    //border: 1px solid rgba(51, 51, 51, 0.2);

    background-color: #fff !important;
  }
 
  .course_option {
    margin-bottom: 30px;
  }
  .reg_btn {
    width: 314px;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
    background: rgba(255, 116, 43, 0.7);
    border-radius: 25px;
    font-size: 17px;
    font-family: "PingFangSC-Medium", "PingFang SC";
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
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

