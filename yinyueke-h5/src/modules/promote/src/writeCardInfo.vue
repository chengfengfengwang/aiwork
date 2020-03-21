<template>
  <div id="main">
    <van-cell-group>
      <van-field v-model="form.name" label="姓名" placeholder="请输入您的姓名" />
      <van-field v-model="form.phone" label="手机号" placeholder="请输入您的手机号" error-message />
      <van-field v-model="form.identify_number" label="身份证" placeholder="请输入您的身份证号" error-message />
      <van-field v-model="form.card_number" label="银行卡" placeholder="请输入您的银行卡号" error-message />
      <van-field v-model="form.bank" label="开户行" placeholder="请输入您的开户行地址" error-message />
    </van-cell-group>
    <div @click="onSubmit" class="getCashBtn">确认并提现</div>
  </div>
</template>
<script>
import { Field, Cell, CellGroup, Dialog } from "vant";

export default {
  data() {
    return {
      form: {
        name: "",
        phone: "",
        identify_number: "",
        card_number: "",
        bank: ""
      }
    };
  },
  mounted(){
    
  },
  components: {
    "van-field": Field,
    "van-cell-group": CellGroup
  },
  methods: {
    setMyWidthDrawInfo() {
      this.axios
        .post(`http://58.87.125.111:55555/v1/account/set_my_info/?god=${getQueryVariable('uid')}`, this.form)
        .then(res => {
          this.getCash()
        });
    },
    getCash(){
      let moneyNum = sessionStorage.getItem('cashNum') * 100;
      this.axios
        .get(`http://58.87.125.111:55555/v1/account/withdrawal_application/?amount=${moneyNum}&god=${getQueryVariable('uid')}`)
        .then(res => {
          if(!res.error){
            Dialog.alert({message: '提现信息提交成功'})
          }
        });

    },
    onSubmit(values) {
      this.setMyWidthDrawInfo()
    }
  }
};
</script>
<style lang="less">
.van-field__control {
  text-align: right;
}
.getCashBtn {
  margin: 25px auto 0 auto;
  width: 335px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  background: rgba(252, 225, 57, 1);
  border-radius: 20px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(142, 49, 18, 1);
}
</style>
