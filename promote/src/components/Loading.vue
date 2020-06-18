<template>
  <div class="mask">
    <img class="loading_icon" src="./../assets/img/common/audio.svg" alt>
  </div>
</template>
<script>
export default {
  mounted() {
    document.querySelector(".mask").addEventListener(
      "touchstart",
      e => {
        e.preventDefault();
      },
      false
    );
  }
};
</script>

<style scoped>
.mask {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 2000;
  background-color: rgba(0, 0, 0, 0.4);
}
.loading_icon {
  position: fixed;
  top: 48%;
  left: 50%;
  z-index: 4;
  transform: translate(-50%, -50%);
}
</style>

