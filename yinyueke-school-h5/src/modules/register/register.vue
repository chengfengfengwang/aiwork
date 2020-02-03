<template>
  <div id="inviteCode">
    <input v-model="form.nickname" type="text" placeholder="姓名">
    <input v-model="form.phone" type="text" placeholder="手机号">
    <input v-model="form.code" type="text" placeholder="验证码">
    <input v-model="form.course_ids" type="text" placeholder="课程">
    <button @click="reg">注册</button>
  </div>
</template>
<script>
import { getQueryVariable } from "../../common/util.js";
import ClipboardJS from "clipboard";

export default {
  data() {
    return {
      form: {
        nickname: "王大锤",
        phone: "001",
        zone: 86,
        code: "989898",
        institutions_id: "5dbaa163887437b3610adbee",
        course_ids: []
      }
    };
  },
  mounted() {},
  methods: {
    reg() {
      var arr = [];
      arr.push(Number(this.form.course_ids));
      this.form.course_ids = arr;
      this.axios
        .post(`${process.env.VUE_APP_ORG}/v9/create_student`, this.form)
        .then(res => {
          //this.invitedFriends = res.data.slice(0,12);
          this.invitedFriends = res.data;
          this.userInfo = res.user_info;
        });
    }
  }
};
</script>

<style lang="less">
@import url("./../../common/common.less");
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
    .font-size(11.5);
  }
}
</style>

