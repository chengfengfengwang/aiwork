<template>
  <div class="page">
    <!-- <img src="../../../assets/img/facChannel/bg.png" alt class="bg" />
    <div class="bottom">
      <img src="../../../assets/img/facChannel/bottom1.png" alt class="bg" />
    </div>
    <div class="form">
      <div class="tips">
        <img src="../../../assets/img/facChannel/tip_left.png" alt class="left" />
        <img src="../../../assets/img/facChannel/tip_right.png" alt class="right" />
        <div>
          填写下方号码，点击
          <span style="color:#FF5327">免费领取</span>立即获得
        </div>
        <div>群内7天免费指导+300首电子曲谱</div>
      </div>
      <div class="input_wrapper phone">
        <input v-model="form.phone" placeholder="请输入手机号" type="text" />
      </div>
      <div class="input_wrapper v_code">
        <input v-model="form.code" placeholder="请输入验证码" type="text" />
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
    </div> -->
    <img src="../../../assets/img/facChannel/625.jpg" alt class="bg" />
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
      btnActive: false
    };
  },
  created() {
    //this.getInstruments();
  },
  mounted() {
    this.count();
  },
  methods:{
    count() {
      this.axios
        //.get(`http://58.87.125.111:6363/v1/txsms/tongji?key=vendor_andelu_dx41`)
        .get(`http://58.87.125.111:6363/v1/txsms/tongji?key=vendor_andelu_dx0423`)
        .then(res => {});
    },
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
@import url("./../../../common/common.less");
.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  background-color: #f7d961;
  font-size: 0;
}
.bg {
  width: 100%;
}
.bottom {
  position: absolute;
  bottom: 0px;
  left: 0;
  width: 100%;
  img {
    width: 100%;
  }
}
.form {
  box-sizing: border-box;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 33%;
  //top: 220px;
  width: 335px;
  padding: 24px 30px;
  background: rgba(221, 217, 255, 1);
  border-radius: 15px;

  @media screen and (min-width: 768px) and (max-width: 1024px) {
    top: 33%;
  }
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
    font-size: 15px;
  }
  input::placeholder,
  select:invalid {
    font-size: 15px;
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
    font-size: 15px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
  .tips {
    position: relative;
    margin-bottom: 12px;
    text-align: center;
    font-size: 12px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(151, 38, 255, 1);
    img.left {
      position: absolute;
      left: 10px;
      top: 3px;
      width: 17px;
    }
    img.right {
      position: absolute;
      right: 10px;
      top: 3px;
      width: 17px;
    }
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
    background: url("../../../assets/img/facChannel/phone.png") no-repeat left
      6.7% center/4.7% 45%;
  }
  .v_code {
    background: url("../../../assets/img/facChannel/safe.png") no-repeat left
      6.7% center/6.2% 45%;
    .v_code_btn {
      position: absolute;
      right: 10px;
      top: 50%;
      transform: translateY(-50%);
      width: 106px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 15px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      //color: rgba(255, 87, 38, 1);
      //color: rgba(153, 153, 153, 1);
      color: #9726ff;

      //border-left: 1px solid #f1f1f1;
    }
  }
  .course_option {
    background: url("../../../assets/img/facChannel/book.png") no-repeat left
      6.7% center/6.2% 38%;
    margin-bottom: 30px;
  }
  .reg_btn {
    height: 50px;
    margin-left: auto;
    margin-right: auto;
    background: linear-gradient(
      90deg,
      rgba(62, 111, 255, 1) 0%,
      rgba(160, 30, 255, 1) 100%
    );
    border-radius: 25px;
    font-size: 17px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    line-height: 50px;
    text-align: center;
    opacity: 0.6;
  }
  .reg_btn.active {
    opacity: 1;
  }
}
</style>

