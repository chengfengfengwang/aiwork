<template>
  <div>
    <Nav>发布求谱</Nav>
    <div class="form_wrapper">
      <div class="input_wrapper">
        <div class="label">曲谱名</div>
        <input placeholder="请输入曲名" v-model="formValue.name" type="text">
      </div>
      <div class="input_wrapper">
        <div class="label">作者</div>
        <input placeholder="请输入作者名称" v-model="formValue.author" type="text">
      </div>

      <div class="input_wrapper course_option">
        <div class="label">曲谱类型</div>
        <select required v-model.number="formValue.instrument_type">
          <option value disabled selected>选择曲谱类型</option>
          <option v-for="(value, name) in instrumentList" :key="name" :value="name">{{value}}</option>
        </select>
      </div>
      <div class="input_wrapper">
        <div class="label">试听链接</div>
        <input placeholder="请输入链接" v-model="formValue.audition_url" type="text">
      </div>
      <div class="btn" :class="{active:!$v.formValue.$invalid}" @click="submit">发布</div>
      <!-- <div class="btn" @click="submit">发布</div> -->
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";
import Nav from "./../../../../components/Nav";
import { required, minLength } from "vuelidate/lib/validators";
export default {
  data() {
    return {
      menuIndex: 0,
      selInstrument: "吉他",
      instrumentList: {},
      formValue: {
        name: "",
        author: "",
        instrument_type: "",
        audition_url: ""
      }
    };
  },
  validations: {
    formValue: {
      name: { required },
      author: { required },
      instrument_type: { required }
      //      audition_url: { required }
    }
  },
  created() {
    if (process.env.NODE_ENV !== "production") {
      this.formValue = {
        name: "夜曲",
        author: "周杰伦",
        instrument_type: 0,
        audition_url: "https://www.baidu.com"
      };
    }
    this.getInstruments();
  },
  mounted() {},
  components: {
    Nav
  },
  methods: {
    invalidMessage() {
      if (this.$v.formValue.name.$invalid) {
        Toast({
          message: "请输入曲名",
          duration: 2000
        });
        return false;
      } else if (this.$v.formValue.author.$invalid) {
        Toast({
          message: "请输入作者",
          duration: 2000
        });
        return false;
      } else if (this.$v.formValue.instrument_type.$invalid) {
        Toast({
          message: "请输入乐器类型",
          duration: 2000
        });
        return false;
      }
      return true;
    },
    getInstruments() {
      this.axios
        .get(`${process.env.VUE_APP_QIUPU}/instrument_type`)
        .then(res => {
          this.instrumentList = res.data;
        });
    },
    submit() {
      // console.log(this.formValue)
      // return
      //this.formValue.instrument_type = 0;
      if (this.invalidMessage()) {
        this.axios
          .post(`${process.env.VUE_APP_QIUPU}/request_score`, this.formValue)
          .then(res => {
            if (!res.error) {
              const time = 1500;
              Toast.success({
                message: "发布成功",
                duration: time
              });
              setTimeout(() => {
                this.$router.push("/qiupu_me");
              }, time);
            }
          });
      }
    }
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
    input,select {
      flex-grow: 1;
      font-size: 15px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      line-height: 44px;
      color: rgba(51, 51, 51, 1);
    }
    select {
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
    opacity: 0.3;
    //opacity: 1;
    &.active {
      opacity: 1;
    }
  }
}
</style>


