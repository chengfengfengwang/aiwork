<template>
  <div class="page">
    <img src="../../../../assets/img/jxj_ac/login_bg.png" alt class="bg">

    <div class="form">
      <div class="tips">
        <img src="../../../../assets/img/jxj_ac/round.png" alt class="round">
        <span class="text">填写手机号，点击“立即激活”</span>
        <img src="../../../../assets/img/jxj_ac/round.png" alt class="round">
      </div>
      <div class="input_wrapper phone">
        <input v-model="form.phone" placeholder="请输入手机号" type="text">
      </div>
      <div class="input_wrapper v_code">
        <input v-model="form.code" placeholder="请输入验证码" type="text">
        <div class="v_code_btn" @click="getVCode">{{vcodeText}}</div>
      </div>
      <div class="input_wrapper course_option">
        <select required v-model="selInstrument">
          <option value disabled selected>选择课程品类</option>
          <option
            v-for="course in instrumentList"
            :key="course.value"
            :value="course.value"
          >{{course.name}}</option>
        </select>
      </div>

      <div @click="reg" :class="{active:btnActive}" class="reg_btn">免费领取</div>
    </div>
    <div v-show="popShow" class="pop_wrapper mask">
      <div class="pop_content">
        <div class="gift_title">尊享课程大礼包-尤克里里</div>
        <div class="gift_content">
          <div class="item">
            <div class="index">
              <img src="../../../../assets/img/jxj_ac/index1.png" alt>
            </div>解锁47节初级课程，零基础轻松学
            <span class="remark">(课程时效：7天)</span>
          </div>
          <div class="item">
            <div class="index">
              <img src="../../../../assets/img/jxj_ac/index2.png" alt>
            </div>赠送一年名师互动课
            <span class="remark">（课程时效：1年）</span>
          </div>
        </div>
        <div class="yhq">
          <div class="left">
            <div class="yhq_num">50</div>
            <div>奖学金(元)</div>
          </div>
          <div class="right">
            <div class="yhq_content">全部乐器必修课程通用 满100即可使用</div>
            <div class="yhq_time">有效期:自激活之日起,10天内有效</div>
          </div>
        </div>
        <div class="download_btn">
          <img src="../../../../assets/img/jxj_ac/download_btn.png" alt>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../../common/util.js";
import { Toast, Dialog } from "vant";

export default {
  data() {
    return {
      vcodeText: "获取验证码",
      vCode: "",
      selectedCourse: "",
      form: {
        phone: "",
        code: "",
        vendor: "andelu"
      },
      selInstrument: "",
      instrumentList: [
        {
          name: "尤克里里",
          value: "1"
        },
        {
          name: "尤克里里",
          value: "2"
        }
      ],
      instrumentMenu: ["guitar", "ukulele", "kalimba"],
      btnActive: false,
      popShow:false
    };
  },
  created() {
    //this.countPage(key);
  },
  mounted() {
    this.inputevent();
  },
  methods: {
    countPage(key) {
      this.axios
        .get(`http://58.87.125.111:6363/v1/txsms/tongji?key=${key}`)
        .then(res => {});
    },
    successCount() {
      this.axios
        .get(`http://58.87.125.111:6363/v1/txsms/tongji?key=vendor_andelu_wx`)
        .then(res => {});
    },
    btnChange() {
      if (
        this.form.code &&
        this.form.phone &&
        this.selInstrument !== undefined
      ) {
        this.btnActive = true;
      } else {
        this.btnActive = false;
      }
    },
    inputevent() {
      var inputArr = document.querySelectorAll("input");
      inputArr.forEach(function(ele) {
        let scrollTop;
        ele.addEventListener("focus", function() {
          scrollTop = document.body.scrollTop;
        });
        ele.addEventListener("blur", function() {
          //document.body.scrollTop = scrollTop;
          window.scrollTo(0, 0);
        });
      });
    },
    getInstruments() {
      this.axios
        .get(`http://58.87.125.111:6363/v1/third/vendor_activity?vendor=andelu`)
        .then(res => {
          var data = res.data;
          this.instrumentList = [];
          for (let key in data) {
            this.instrumentList.push({
              name: data[key],
              value: key
            });
          }
          //this.instrumentList.unshift({ id: "-1", name: "全部" });
        });
    },
    reg() {
      this.form.instrument = Number(this.selInstrument);
      //console.log(this.form)

      if (!this.btnActive) {
        var msg = "";
        if (!this.form.phone) {
          msg = "请填写手机号";
        } else if (!this.form.code) {
          msg = "请填写验证码";
        } else if (this.form.instrument === undefined) {
          msg = "请选择课程品类";
        }
        Toast({
          message: msg,
          duration: 1000
        });
        return;
      }
      this.successCount();
      this.axios
        .post(`http://58.87.125.111:6363/v1/third/vendor_activity`, this.form)
        .then(res => {
          if (!res.error) {
            Dialog.alert({ message: "课程领取成功，下载APP学习" }).then(res => {
              location.href =
                "http://s.immusician.com/static/html/channel_page_auto.html?channel=&channel=andelu7tianrumen";
            });
            // sessionStorage.setItem("acInstrument", this.form.instrument);
            // sessionStorage.setItem("acCourse", JSON.stringify(res.data.words));
            //this.$router.push("/success");
          }
        });
    },
    getVCode() {
      if (this.vcodeText === "重新获取" || this.vcodeText === "获取验证码") {
        if (this.vcodeText === "获取验证码") {
          this.vCode = "";
        }
        this.axios
          .post(`http://58.87.125.111:6363/v1/txsms/send`, {
            phone: this.form.phone,
            zone: 86
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
    }
  },
  watch: {
    form: {
      //监听的对象
      deep: true, //深度监听设置为 true
      handler: function(newV, oldV) {
        this.btnChange();
      }
    },
    selInstrument() {
      this.btnChange();
    }
  }
};
</script>
<style lang="less">
@import url("../../../../common/common.less");
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
.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #53058e;
  font-size: 0;
}
.bg {
  width: 100%;
}
.form {
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 36.5%;
  //top: 220px;
  width: 335px;
  padding: 24px 15px;
  background: #fff;
  border-radius: 15px;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    top: 35.5%;
  }
  input {
    border: none;
    background-color: transparent;
    outline: none;
    color: rgba(51, 51, 51, 1);
    left: 9%;
    top: 2%;
    position: absolute;
    width: 70%;
    height: 40px;
    font-size: 15px;
  }
  input::placeholder,
  select:invalid {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 0.3);
  }
  select {
    border: none;
    background-color: transparent;
    outline: none;
    //color: #fff;
    left: 9%;
    top: 2%;
    position: absolute;
    width: 80%;
    height: 40px;
    font-size: 15px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .tips {
    .round {
      vertical-align: middle;
      width: 8px;
      height: 8px;
    }
    .text {
      margin: 0 6px;
      vertical-align: middle;
    }
    position: absolute;
    left: 0;
    top: -30px;
    width: 100%;
    text-align: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .input_wrapper {
    position: relative;
    width: 100%;
    height: 44px;
    margin-bottom: 12px;
    border-radius: 22px;
    border: 1px solid #ddd;
    background-color: #fff !important;
  }

  .v_code {
    .v_code_btn {
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      width: 106px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;

      color: #ff5726;
      .px1-left(rgba(204, 204, 204, 1));
      //border-left: 1px solid rgba(204,204,204,1);
    }
  }
  .course_option {
    margin-bottom: 18px;
  }
  .reg_btn {
    height: 44px;
    margin-left: auto;
    margin-right: auto;
    background: #fb7336;
    border-radius: 25px;
    font-size: 17px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 44px;
    text-align: center;
    opacity: 0.6;
  }
  .reg_btn.active {
    opacity: 1;
  }
}
.form::after {
  content: "*活动真实有效，手机号进行保密处理，可放心填写";
  position: absolute;
  left: 0;
  bottom: -30px;
  width: 100%;
  text-align: center;
  font-size: 12px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(255, 186, 33, 1);
}

.pop_content {
  width: 312px;
  height: 300px;
  position: fixed;
  left: 50%;
  top: 80px;
  transform: translateX(-50%);
  background: url(../../../../assets/img/jxj_ac/pop_bg.png) no-repeat
    center/100% 100%;
  .gift_title {
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translateX(-48%);
    top: 70px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
  .gift_content {
    width: 276px;
    position: absolute;
    left: 50%;
    transform: translateX(-48%);
    top: 114px;
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    .item {
      padding-left: 24px;
      position: relative;
      .index {
        position: absolute;
        left: 0;
        top: 2px;
        width: 16px;
        height: 16px;
        img {
          width: 100%;
        }
      }
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      .remark {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .yhq {
    width: 276px;
    height: 75px;
    position: absolute;
    left: 50%;
    transform: translateX(-48%);
    top: 209px;
    background: url(../../../../assets/img/jxj_ac/yhq.png) no-repeat center/100%
      100%;
    display: flex;
    align-items: center;
    padding: 10px 0;
    .left {
      width: 130px;
      text-align: center;
      font-size: 12px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(249, 60, 7, 1);
      .yhq_num {
        margin-top: -5px;
        font-size: 32px;
        font-family: SFUIDisplay-Heavy, SFUIDisplay;
        font-weight: 800;
        color: rgba(249, 60, 7, 1);
      }
    }
    .right {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding-left: 3px;
      .yhq_content {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(74, 51, 11, 1);
      }
      .yhq_time {
        font-size: 11px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(74, 51, 11, 0.5);
      }
    }
  }
  .download_btn {
    position: absolute;
    bottom: -56px;
    left: 50%;
    transform: translateX(-50%);
    width: 208px;
    img {
      width: 100%;
    }
  }
}
</style>

