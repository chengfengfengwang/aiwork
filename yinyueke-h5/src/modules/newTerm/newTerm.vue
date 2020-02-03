<template>
<!-- 开学活动 -->
    <div id="pageWrapper">
        <img class="page_img" src="../../assets/img/newTerm/1.png" alt="">
        <img class="page_img" src="../../assets/img/newTerm/2.png" alt="">
        <img class="page_img" src="../../assets/img/newTerm/3.png" alt="">
        <img class="page_img" src="../../assets/img/newTerm/4.png" alt="">
        <div class="qr">
            <img src="../../assets/img/newTerm/qr.jpeg" alt="">
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less" scoped>
#pageWrapper{
    position: relative;
    font-size: 0
}
.page_img{
    width: 100%;
}
.qr{
    position: absolute;
    bottom: 3.5%;
    left: 50%;
    transform: translateX(-50%);
    width: 35%;
    img{
        width: 100%;
    }
}
</style>

