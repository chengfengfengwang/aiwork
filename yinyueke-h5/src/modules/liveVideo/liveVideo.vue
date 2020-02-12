<template>
<!-- 开学活动 -->
    <div id="pageWrapper">
      <div @click="play">播放</div>
      <div @click="cancel">取消</div>
      <!-- <video src="https://www.w3school.com.cn/i/movie.ogg"></video> -->
    </div>
</template>
<script>
export default {
    methods:{
        play(){
            console.log('play');
            location.href='http://iguitar-new.iguitar.immusician.com/lh9RYKiFyICDONKOaMO-0dqk6Tc0'
        },
        cancel(){
            console.log('play');
            var video = document.querySelector('video');
            video.style.display = 'none';
            video.pause()
        }
    }
}
</script>
<style lang="less" scoped>
#pageWrapper{
    min-height: 100vh;
    position: relative;
}
.page_img{
    width: 100%;
}
.qr{
    display: block;
    width: 50%;
    margin: 50px auto 0 auto;
}

</style>

