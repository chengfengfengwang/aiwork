<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  provide: function() {
    return {
      instrumentList: this.instrumentList,
      myInstrumentList: this.myInstrumentList
    };
  },
  name: "App",
  data() {
    return {
      instrumentList: [
        {
          label: "吉他",
          value: "guitar"
        },
        {
          label: "尤克里里",
          value: "ukulele"
        },
        {
          label: "卡林巴",
          value: "kalimba"
        },
        {
          label: "非洲鼓",
          value: "djembe"
        },
        {
          label: "钢琴",
          value: "piano"
        }
      ],
      myInstrumentList: [
         {
          label: "全部",
          value: "全部"
        },
        {
          label: "吉他",
          value: "guitar"
        },
        {
          label: "尤克里里",
          value: "ukulele"
        },
        {
          label: "卡林巴",
          value: "kalimba"
        },
        {
          label: "非洲鼓",
          value: "djembe"
        },
        {
          label: "钢琴",
          value: "piano"
        }
      ]
    };
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
