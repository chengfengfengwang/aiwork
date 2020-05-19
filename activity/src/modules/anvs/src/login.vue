<template>
  <div class="page">
    <div class="logo">
      <img src="../../../assets/img/login/loginb2.png" alt />
    </div>
    <div class="form">
      <div class="input_wrapper phone">
        <input v-model="form.phone" placeholder="请输入手机号" type="text" />
      </div>
      <div class="input_wrapper v_code">
        <input v-model="form.code" placeholder="请输入验证码" type="text" />
        <div class="v_code_btn" @click="getVCode">{{vcodeText}}</div>
      </div>
      <div @click="reg" :class="{disable:btnDisable}" class="btn  reg_btn">登录/注册</div>
    </div>
    <Wechat />
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
import Wechat from "../../../components/Wechat";
export default {
  inject: ["status"],
  data() {
    return {
      vcodeText: "获取验证码",
      vCode: "",
      form: {
        phone: "",
        code: ""
      },
      btnDisable:true,
      qr:''
    };
  },
  components:{
    Wechat
  },
  created(){
    document.title='登录'
  },
  mounted() {
    this.inputevent();
    if(process.env.NODE_ENV !== 'production'){
      this.form = {
        phone: "18810240072",
        code: "753951"
      }
    }
  },
  methods: {
    btnChange() {
      if (this.form.code && this.form.phone) {
        this.btnDisable = false;
      } else {
        this.btnDisable = true;
      }
    },
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
    reg() {
      //sessionStorage.setItem('loginPhone',this.form.phone);
      if(this.btnDisable) return;
      this.axios
        .get(`http://58.87.125.111:55555/v1/user/login/?phone=${this.form.phone}&code=${this.form.code}`)
        .then(res => {
          if(!res.error){
            let data = res.data;
            sessionStorage.setItem('token',data.token);
            sessionStorage.setItem('uid',data.uid)
            this.axios.defaults.headers.common['token'] = data.token;
            this.axios.defaults.headers.common['uid'] = data.uid;
            //location.href = `${location.origin}${location.pathname}${location.hash}`;
            this.$router.push('/active')
          }
        });
    },
    getVCode() {
      if (this.vcodeText === "重新获取" || this.vcodeText === "获取验证码") {
        if (this.vcodeText === "获取验证码") {
          this.vCode = "";
        }
        this.axios
          .post(`${process.env.VUE_APP_BASE}/v1/user/tx_sms/`, {
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
    
  },
  watch: {
    form: {
      //监听的对象
      deep: true, //深度监听设置为 true
      handler: function(newV, oldV) {
        this.btnChange();
      }
    }
  }
};
</script>
<style lang="less" scoped>
//@import url("./../../../common/common.less");
.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 0 30px; 
  background: url("../../../assets/img/login/loginb1.png") no-repeat top
      center/100%;
  background-color: #fff;
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
  //top: 220px;
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    top: 36%;
  }
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
    border: 1px solid #eee;

    background-color: #fff !important;
  }

  .phone {
    background: url("../../../assets/img/common/phone.png") no-repeat left 4.7%
      center/5.7% 54%;
  }
  .v_code {
    background: url("../../../assets/img/common/safe.png") no-repeat left 4.7%
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
    //width: 314px;
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
</style>

