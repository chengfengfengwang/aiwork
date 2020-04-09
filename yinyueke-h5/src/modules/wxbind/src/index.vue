<template>
  <div class="page">
    <div class="logo">
      <img src="../../../assets//img//yiqiac/loginb2.png" alt>
    </div>
    <div class="bottom_coco">
      <img src="../../../assets/img/wbzs/coco.png" alt>
    </div>
    <div class="form">
      <div class="input_wrapper phone">
        <input v-model="form.phone" placeholder="请输入手机号" type="text">
      </div>
      <div class="input_wrapper v_code">
        <input v-model="form.code" placeholder="请输入验证码" type="text">
        <div class="v_code_btn" @click="getVCode">{{vcodeText}}</div>
      </div>
      <div @click="reg" class="reg_btn">提交</div>
    </div>
     <popup v-model="popShow">
      <div class="pop_wrapper">
        <div>扫描下方二维码入群</div>
        <img class="qr" :src="courseItem.qr" alt="">
      </div>
    </popup>
    <!-- <img src="../../../assets/img/regist/rd1.png" alt class="d1">
    <img src="../../../assets/img/regist/rd2.png" alt class="d2">
    <img src="../../../assets/img/regist/rd3.png" alt class="d3">-->
  </div>
</template>
<script>
import { testWeixin, getQueryVariable } from "../../../common/util.js";
import { Popup } from "vant";

export default {
  data() {
    return {
      form: {
        phone: "",
        code:""
      },
      vcodeText: "获取验证码",
      vCode: "",
      courseId: "",
      courseItem:{
        qr:''
      },
      popShow:false,
      qrSrc:''
    };
  },
  components: {
    Popup
  },
  created() {
    if(!getQueryVariable('code') && testWeixin()){
      let originUrl = `${location.origin}${location.pathname}?course_id=${getQueryVariable('course_id')}`
      let encodedUrl = encodeURIComponent(originUrl);
      let scope = 'snsapi_base';
      location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxebd76dff6ca15a2a&redirect_uri=${encodedUrl}&response_type=code&scope=${scope}&state=STATE#wechat_redirect`)
    }
    this.courseId = getQueryVariable("course_id");
    // this.getSignInfo().then(param => {
    //   this.shareReady(param);
    // });
  },
  mounted() {
    this.inputevent();
    this.getCourseList();
  },
  methods: {
    findQr() {
      return this.courseList.find(e => {
        return (e.course_id = this.courseId);
      });
    },
    getCourseList() {
      this.axios
        .get(`http://api.yinji.immusician.com/v1/wechat/get_records`, {
          institutions_id: getQueryVariable("orgId")
        })
        .then(res => {
          this.courseList = res.data;
          this.courseItem = this.findQr();
        });
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
    reg() {
      this.axios
        .post(`http://api.yinji.immusician.com/v1/wechat/record_bind/`, {
          course_id: Number(getQueryVariable("course_id")),
          sms_code: this.form.code,
          phone: this.form.phone,
          code:getQueryVariable("code")
        })
        .then(res => {
          if(!res.error){
            this.popShow = true
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
    shareReady(param) {
      var that = this;
      wx.config({
        debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: param.appId, // 必填，公众号的唯一标识
        timestamp: param.timestamp, // 必填，生成签名的时间戳
        nonceStr: param.nonceStr, // 必填，生成签名的随机串
        signature: param.signature, // 必填，签名
        jsApiList: ["updateAppMessageShareData", "updateTimelineShareData"] // 必填，需要使用的JS接口列表
      });
      wx.ready(function() {
        wx.updateAppMessageShareData({
          title: "高考作文被音乐霸屏了！你家孩子音乐知识学好了吗？", // 分享标题
          desc:
            "5分钟就让孩子爱上的趣味音乐课程，音乐基础一学就会，快来领取免费体验课程吧！", // 分享描述
          imgUrl: "https://s.immusician.com/web/h5/share1.jpeg", // 分享图标
          link: `http://s.immusician.com/web/h5/music.html?channel=cp_tiyan&v=${
            that.shareVersion
          }`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          success: function() {
            //console.log("分享的success");
            // 设置成功
          }
        });
        wx.updateTimelineShareData({
          title: "高考作文被音乐霸屏了！你家孩子音乐知识学好了吗？", // 分享标题
          imgUrl: "https://s.immusician.com/web/h5/share1.jpeg", // 分享图标
          link: `http://s.immusician.com/web/h5/music.html?channel=cp_tiyan&v=${
            that.shareVersion
          }`, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
          success: function() {
            // 设置成功
          }
        });
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      });
    },
    getSignInfo() {
      return new Promise((resolve, reject) => {
        this.axios
          .post(`http://api.yinji.immusician.com:55555/v1/wechat/config/`, {
            url: location.href
          })
          .then(res => {
            //var res = res.data;
            let param = {
              appId: res.appId,
              timestamp: res.timestamp,
              nonceStr: res.nonceStr,
              signature: res.signature
            };
            resolve(param);
          });
      });
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
    left: 17%;
    top: 8%;
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
    height: 50px;
    margin-bottom: 30px;
    border-radius: 25px;
    //border: 1px solid rgba(51, 51, 51, 0.2);

    background-color: #fff !important;
  }
  .name input {
    text-align: center;
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
.van-popup{
  border-radius: 10px;
  overflow: hidden;
}
.pop_wrapper{
  text-align: center;
  position: relative;
  width: 300px;
  height: 300px;
  padding-top: 15px;
  border-radius: 10px;
  .qr{
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%,-50%);
    width: 200px;
    height: 200px;
  }
}
</style>

