<template>
  <div>
    <Nav>发布求谱</Nav>
    <div class="form_wrapper">
      <div class="input_wrapper">
        <div class="label">曲谱名</div>
        <input type="text">
      </div>
      <div class="input_wrapper">
        <div class="label">作者</div>
        <input type="text">
      </div>

      <div class="input_wrapper course_option">
        <div class="label">曲谱类型</div>
        <select required v-model="selInstrument">
          <option value disabled selected>选择课程品类</option>
          <option v-for="course in instrumentList" :key="course" :value="course">{{course}}</option>
        </select>
      </div>
      <div class="input_wrapper">
        <div class="label">试听链接</div>
        <input type="text">
      </div>
      <div class="btn">发布</div>
    </div>
  </div>
</template>
<script>
import Nav from './../../../../components/Nav'
export default {
  data() {
    return {
      menuIndex: 0,
      selInstrument: "吉他",
      instrumentList: ["1", "2"]
    };
  },
  created() {
  },
  components: {
    Nav
  }
};
</script>
<style lang="less" scoped>
.form_wrapper {
  padding: 0 14px;
  .input_wrapper {
    margin: 16px 0;
    padding: 0 19px;
    height: 44px;
    border-radius: 26px;
    border: 1px solid rgba(232, 232, 232, 1);
    display: flex;
    .label {
      width: 90px;
      font-size: 16px;
      line-height: 44px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    input {
      flex-grow: 1;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 44px;
      color: rgba(51, 51, 51, 1);
    }
    select{
      flex-grow: 1;
    }
  }
  .btn {
    margin-top: 30px;
    width: 100%;
    background: linear-gradient(
      135deg,
      rgba(255, 135, 27, 1) 0%,
      rgba(255, 69, 32, 1) 100%
    );
    color: rgba(255, 255, 255, 1);
  }
}
</style>


