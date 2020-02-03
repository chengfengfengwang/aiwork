<template>
  <div id="child">
    <h2>i am child</h2>
  </div>
</template>
<script>
export default {
  data(){
    return{
      msg:'hello world'
    }
  },
  created() {
    console.log("created child");
  },
  mounted() {
    console.log("mounted child");
    this.$once("hook:beforeDestroy", function() {
      console.log("hook:beforeDestroy");
    });
  }
};
</script>
<style lang="less">
</style>


