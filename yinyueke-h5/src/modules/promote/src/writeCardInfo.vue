<template>
  <div id="main">
    <van-cell-group>
      <van-field v-model="form.username" label="姓名" placeholder="请输入您的姓名" />
      <van-field v-model="form.phone" label="手机号" placeholder="请输入您的手机号" error-message />
      <van-field v-model="form.userId" label="身份证" placeholder="请输入您的身份证号" error-message />
      <van-field v-model="form.bankCardId" label="银行卡" placeholder="请输入您的银行卡号" error-message />
      <van-field v-model="form.bankName" label="开户行" placeholder="请输入您的开户行地址" error-message />
    </van-cell-group>
    <div class="getCashBtn">确认并提现</div>
  </div>
</template>
<script>
import { Field, Cell, CellGroup } from "vant";

export default {
  data() {
    return {
      form: {
        username: "",
        phone: "",
        userId: "",
        bankCardId: "",
        bankName: ""
      }
    };
  },
  components: {
    "van-field": Field,
    "van-cell-group": CellGroup
  },
  methods: {
    onSubmit(values) {
      console.log("submit", values);
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
