<template>
    <div class="mask">
      <img class="loading_icon" src="./../assets/img/audio.svg" alt="">
    </div>
</template>
<style lang="less" scoped>
.mask{
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 2000;
    background-color: rgba(0, 0, 0, .6)
}
.loading_icon{
    position: fixed;
    top: 50%;
    left: 50%;
    z-index: 4;
}
</style>
