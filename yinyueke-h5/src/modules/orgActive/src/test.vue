<template>
  <div @click="go">跳转</div>
</template>
<script>
import { getQueryVariable, testWeixin } from "../../../common/util.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      isWatch: 1,
    
    };
  },
  created() {
   
  },
  mounted() {
    console.log('test')
    setTimeout(() => {
      location.replace('http://192.168.199.159:5555/liveMaterial.html#/test1')
    }, 1000);
  },
  methods: {
   go(){
     this.$router.push('test1')
   }
  }
};
</script>