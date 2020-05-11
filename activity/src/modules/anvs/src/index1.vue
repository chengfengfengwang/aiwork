<template>
  <div class="page">
    hello
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
export default {
  data() {
    return {
      instrumentList: [
        "快乐非洲鼓初级",
        "快乐非洲鼓中级",
        "音乐素养",
        "趣味乐理视唱练耳初级",
        "趣味乐理视唱练耳中级",
        "尤克里里畅游记初级",
        "尤克里里畅游记中级",
      ],
      selInstrument: "",
      form: {
        name: ""
      }
    };
  },
  created() {},
  mounted() {
    this.inputevent();
  },
  methods: {
    inputevent() {
      var inputArr = document.querySelectorAll("input");
      inputArr.forEach(function(ele) {
        let scrollTop;
        ele.addEventListener("focus", function() {
          scrollTop = document.body.scrollTop;
          console.log(scrollTop);
        });
        ele.addEventListener("blur", function() {
          //document.body.scrollTop = scrollTop;
          window.scrollTo(0, 0);
          console.log(scrollTop);
        });
      });
    },
    reg() {
      localStorage.setItem("zsName", this.form.name);
      localStorage.setItem("zsCourse", this.selInstrument);
      location.href = `${location.origin}${location.pathname}#/poster1`
      //this.$router.push("/poster1");
    }
  }
};
</script>

