<template>
  <div id="active">
    <div class="card">
      <img src="../../../assets/img/anvs/card_bg.png" alt class="card_bg">
      <img
        v-show="status=='instrument'"
        src="../../../assets/img/anvs/card_instrument.jpg"
        alt
        class="card_img"
      >
      <img v-show="status=='vip'" src="../../../assets/img/anvs/card_vip.jpg" alt class="card_img">
    </div>
    <input v-model="cardCode" type="text" :placeholder="placeholder" class="input input_line">
    <div class="ac_btn btn" @click="goActive" :class="{disable:btnDisable}">{{btnText}}</div>
    <img src="../../../assets/img/anvs/rights.png" alt class="rights">
    <Wechat/>
  </div>
</template>
<script>
import { getQueryVariable } from "common/util.js";
import Wechat from "../../../components/Wechat";

export default {
  inject: ["status"],
  data() {
    return {
      cardCode: "",
      btnDisable: true,
      btnText:'立即激活',
      placeholder:'请输入卡片上的激活码进行激活'
      //status:'card'
    };
  },
  created() {
    if(this.status=='instrument'){
      document.title='乐器卡激活';
      this.btnText = '立即兑换';
      this.placeholder = '请输入卡片上的兑换码进行兑换'
    }else if(this.status=='vip'){
      document.title='会员卡激活';
      this.btnText = '立即激活';
      this.placeholder = '请输入卡片上的激活码进行激活'
    }
  },
  components: {
    Wechat
  },
  methods: {
    goActive() {
      if (this.btnDisable) return;
      this.axios
        .post(`http://58.87.125.111:55555/v1/active_code_anniversary`, {
          active_code: this.cardCode
        })
        //.get(`http://58.87.125.111:55555/v1/operate/activity_qr/?activity_type=`)
        .then(res => {
          if (!res.error) {
            let goods_data = res.goods_data;
            if (this.status == "instrument") {
              sessionStorage.setItem("active_code", this.cardCode);
              sessionStorage.setItem(
                "goods_data",
                JSON.stringify(res.goods_data)
              );
              this.$router.push("/selInstrument");
            } else if (this.status == "vip") {
              sessionStorage.setItem("need_instrument", res.need_instrument);
              sessionStorage.setItem("need_vip", res.need_vip);
              this.$router.push("/success");
            }
          }
        });
    }
  },
  watch: {
    cardCode() {
      if ((this.cardCode + "").length > 0) {
        this.btnDisable = false;
      } else {
        this.btnDisable = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
#active {
  min-height: 100vh;
  text-align: center;
  background-color: #fff;
}
.card {
  margin-bottom: 90px;
  .card_bg {
    width: 100%;
  }
  .card_img {
    position: absolute;
    left: 50%;
    top: 16px;
    transform: translateX(-50%);
    width: 285px;
    border-radius: 8px;
  }
}
.input_line {
  text-align: center;
  padding-bottom: 12px;
  width: 315px;
  border-bottom: 1px solid #ccc;
  margin-bottom: 40px;
}
.input_line::placeholder {
  font-size: 14px;
  font-family: PingFang-SC-Regular, PingFang-SC;
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
.ac_btn {
  margin: auto;
  margin-bottom: 80px;
  width: 315px;
  height: 44px;
  line-height: 44px;
  border-radius: 22px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  background: rgba(255, 203, 62, 1);
  color: #ff5726;
}

img.rights {
  width: 306px;
}
</style>


