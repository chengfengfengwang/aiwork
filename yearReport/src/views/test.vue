<template>
  <div>
    <div @click="bf" style="margin-top:200px">播放</div>
    <audio autoplay preload loop id="myTripAudio">
      <source src="../assets/musicTrip.mp3" type="audio/mp3">
    </audio>
  </div>
</template>
<script>
export default {
  methods: {
    bf(){
      console.log('click bf');
      document.querySelector('#myTripAudio').play();
    }
  }
};
</script>

