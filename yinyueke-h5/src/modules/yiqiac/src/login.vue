<template>
  <div class="page">
    <div class="logo">
      <img src="../../../assets//img//yiqiac/loginb2.png" alt />
    </div>
    <div class="bottom_text">
      点击领取课程确认同意
      <a href="http://cdn.kids.immusician.com/app/privacy.html">《音乐壳用户服务协议》</a>
    </div>
    <div class="form">
      <div class="input_wrapper phone">
        <input v-model="form.phone" placeholder="请输入手机号" type="text" />
      </div>
      <div class="input_wrapper v_code">
        <input v-model="form.code" placeholder="请输入验证码" type="text" />
        <div class="v_code_btn" @click="getVCode">{{vcodeText}}</div>
      </div>
      <div @click="reg" class="reg_btn">领取课程</div>
    </div>
    <!-- <img src="../../../assets/img/regist/rd1.png" alt class="d1">
    <img src="../../../assets/img/regist/rd2.png" alt class="d2">
    <img src="../../../assets/img/regist/rd3.png" alt class="d3">-->
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
export default {
  data() {
    return {
      vcodeText: "获取验证码",
      vCode: "",
      selectedCourse: "",
      form: {
        phone: "",
        code: "",
        share_id: getQueryVariable("share_id"),
        share_phone: getQueryVariable("share_phone")
      },
      courseList: []
    };
  },
  created() {
    
  },
  mounted() {
    this.inputevent();
  },
  methods: {
    inputevent() {
      var inputArr = document.querySelectorAll('input');
      inputArr.forEach(function(ele){
        let scrollTop;
        ele.addEventListener("focus", function() {
          scrollTop = document.body.scrollTop;
          console.log(scrollTop)
        });
        ele.addEventListener("blur", function() {
          //document.body.scrollTop = scrollTop;
          window.scrollTo(0,0)
          console.log(scrollTop)
        });
      })
    },
    getCourses() {
      this.axios
        .post(`${process.env.VUE_APP_ORG}/v9/class_info/get_course_apply`, {
          institutions_id: getQueryVariable("orgId")
        })
        .then(res => {
          this.courseList = res.data;
          console.log("---");
          console.log(this.courseList);
          //this.courseList.unshift({ id: "-1", name: "全部" });
        });
    },
    reg() {
      localStorage.setItem('loginPhone',this.form.phone)
      this.axios
        .post(`${process.env.VUE_APP_LIEBIAN}/v1/user/share_reg/`, this.form)
        .then(res => {
          if(!res.error){
            let data = res.data;
            if(data instanceof(Array) && data.length==0){
              this.$router.push('/download')
            }else if(data instanceof(Array) && data.length!=0){
              localStorage.setItem('multiCourse',JSON.stringify(data));
              this.$router.push('/selectCourse')
            }else if(data instanceof(Object)){
              location.href=data.url
            }
          }
        });
    },
    getVCode() {
      if (this.vcodeText === "重新获取" || this.vcodeText === "获取验证码") {
        if (this.vcodeText === "获取验证码") {
          this.vCode = "";
        }
        this.axios
          .post(`${process.env.VUE_APP_SMS}/v1/user/tx_sms/`, {
            phone: this.form.phone
          })
          .then(res => {
            console.log(res);
          });
      } else {
        return;
      }
      var count = 59;
      this.vcodeText = count + "s";
      var timer = setInterval(() => {
        this.vcodeText = --count + "s";
        if (count === 0) {
          clearInterval(timer);
          this.vcodeText = "重新获取";
        }
      }, 1000);
    },
    
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
  background: url("../../../assets/img/yiqiac/loginb1.png") no-repeat top
      center/100%,
    url("../../../assets/img/yiqiac/loginb3.png") no-repeat bottom center/100%;
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
.bottom_text {
  position: absolute;
  bottom: 35px;
  left: 0;
  width: 100%;
  text-align: center;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  a {
    color: #fbe54a;
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
    color: rgba(153, 153, 153, 1);
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
    //border: 1px solid rgba(51, 51, 51, 0.2);

    background-color: #fff !important;
  }

  .phone {
    background: url("../../../assets/img/yiqiac/phone.png") no-repeat left 4.7%
      center/5.7% 54%;
  }
  .v_code {
    background: url("../../../assets/img/yiqiac/safe.png") no-repeat left 4.7%
      center/7% 54%;
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
      //border-left: 1px solid #f1f1f1;
    }
  }

  .reg_btn {
    width: 314px;
    height: 50px;
    margin-left: auto;
    margin-right: auto;
    background: rgba(255, 116, 43, 0.7);
    border-radius: 25px;
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
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

