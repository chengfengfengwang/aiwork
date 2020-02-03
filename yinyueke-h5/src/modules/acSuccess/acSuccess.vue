<template>
    <div class="page">
        <div class="container">
            <img class="bg" src="../../assets/img/acSuccess/bg_2.jpeg" alt="">
            <!-- <img src="../../assets/img/acSuccess/qr.png" alt="" class="qr"> -->
        </div>
    </div>
</template>
<style lang="less">
// @import url("./../../common/common.less");
// .font-size(@sizeValue:16) {
//   @vw: 16 / 375 * 100;
//   @result: @sizeValue / 16 * @vw;
//   font-size: ~"@{result}vw";
// }
// html {
//   .font-size(16);
// }
// html {
//   @media screen and (max-width: 320px) {
//     .font-size(16);
//   }
//   @media screen and (min-width: 480px) {
//     .font-size(13);
//   }
// }
    .page{
        position: relative;
        min-height: 100vh;
        background-color: rgb(244,205,67);
        .container{
            position: relative;
        }
        .bg{
            width: 100%;
        }
        .qr{
            position: absolute;
            left: 50%;
            top:41.5%;
            transform: translateX(-50%);
            //width: 95px;
            width: 25.3%;
        }
    }
</style>

