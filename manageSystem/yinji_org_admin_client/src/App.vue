<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
   data() {
    return {
      age:12,
      name:'namename'
    };
  },
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
