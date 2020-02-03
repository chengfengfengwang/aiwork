<template>
  <div id="bookAc">
    
    <!-- <Loading v-show="loadingShow"/>
        <div class="banner">
            <img src="../../assets/img/bookActivity/banner.png" alt="">
        </div>
        <div class="main">
            <div class="box box1">
                <div v-bind:style="{ opacity: swiperShow?1:0}" id="bookSwiper" class="swiper-container">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide" @click="previewRemark(0)">
                            <img  src="../../assets/img/bookActivity/book1.png" alt="">
                        </div>
                        <div class="swiper-slide" @click="previewRemark(1)">
                            <img  src="../../assets/img/bookActivity/book2.png" alt="">
                        </div>
                        <div class="swiper-slide" @click="previewRemark(2)">
                            <img  src="../../assets/img/bookActivity/book3.png" alt="">
                        </div>
                    </div>
                    <div class="swiper-pagination"></div>
                </div>
                <div class="book_feature">
                    <div class="feature_row">
                        <img class="feature_i" src="../../assets/img/bookActivity/f_i1.png" alt="">官方绘制，顶级插画师、教研专家开发设计
                    </div>
                    <div class="feature_row">
                        <img class="feature_i" src="../../assets/img/bookActivity/f_i2.png" alt="">内容丰富、趣味引导, 小朋友一看就会
                    </div>
                    <div class="feature_row">
                        <img class="feature_i" src="../../assets/img/bookActivity/f_i3.png" alt="">色彩鲜明，孩子轻松掌控跳动的音符
                    </div>
                </div>
            </div>
            <div class="box box2">
                <div class="qr">
                    <img src="../../assets/img/bookActivity/qr.png" alt="">
                </div>
                <div class="wx_text_row">
                    <span>老师微信号</span>
                    <span class="wx_text">jessieyin02</span>
                    <button class="copy_btn" :data-clipboard-text="'jessieyin02'" @click="copyWx">点击复制</button>
                </div>
                <div class="line"></div>
                <div class="process">
                    <div class="process_title">
                        <span class="circle first"></span>
                        <span class="circle second"></span>
                        <span class="title_text">领书流程</span>
                    </div>
                    <div>1､长按图片保存到相册 2､打开微信扫一扫识别保存的图片</div>
                </div>
            </div>
        </div>
        <div class="footer">
            <div>
                <img class="logo" src="../../assets/img/bookActivity/footer_logo.png" alt="">
            </div>
            <div>音乐壳的小朋友们都在等你来哦~</div>
    </div>-->
    <img class="page_main" src="../../assets/img/bookActivity/new_bg.jpg" alt>
  </div>
</template>
<script>
// import Loading from "./../../components/Loading";
// import Swiper from "swiper";
// import "swiper/dist/css/swiper.min.css";
// import { getQueryVariable } from "../../common/util.js";
// import { Toast, ImagePreview } from "vant";
// import ClipboardJS from "clipboard";

// export default {
//   data() {
//     return {
//       param: "",
//       bookArr: [],
//       swiperShow:false,
//       loadingShow:true
//     };
//   },
//   components:{
//       Loading
//   },
//   created() {
//     for (var i = 1; i < 4; i++) {
//       var str = require(`./../../assets/img/bookActivity/book${i}.png`);
//       this.bookArr.push(str);
//     }
//     this.$nextTick(() => {

//       this.initBookSwiper();
//       setTimeout(() => {
//           this.loadingShow = false;
//           this.swiperShow = true
//       }, 400);
//     });
//   },
//   mounted() {
//     new ClipboardJS(".copy_btn", {
//       text: function(trigger) {
//         return trigger.getAttribute("data-clipboard-text");
//       }
//     });
//   },
//   methods: {
//     initBookSwiper() {
//       this.mySwiper = new Swiper("#bookSwiper", {
//           direction: "horizontal",
//           initialSlide: 1,
//           loop: true,
//           slidesPerView: 3,
//           centeredSlides: true,
//           spaceBetween: 0,
//           pagination: {
//           el: '.swiper-pagination',
//           clickable: true,
//         },
//         on:{
//             tap: (e)=>{
//               console.log(e);
//               var index = this.mySwiper.activeIndex%3;
//               ImagePreview({
//                 images: this.bookArr,
//                 startPosition: index
//               });
//             },
//           },
//       });
//     },
//     previewRemark(index) {
//       // console.log(index)
//       // ImagePreview({
//       //   images: this.bookArr,
//       //   startPosition: index
//       // });
//     },
//     copyWx() {
//       Toast.success({
//         duration: 1000,
//         message: "复制成功"
//       });
//     }
//   }
// };
//
</script>
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
// #bookAc {
//   //min-height: 100vh;
//   //   background: linear-gradient(
//   //     180deg,
//   //     rgba(255, 122, 92, 1) 0%,
//   //     rgba(255, 135, 73, 1) 100%
//   //   );
// }
// .banner {
//   img {
//     width: 100%;
//   }
// }
// #bookSwiper.swiper-container {
//     overflow: hidden;
//     height: 165px;
//   width: 100%;
//   margin: 0 auto;
//   .swiper-slide {
//     text-align: center;
//     font-size: 18px;
//     background: #fff;

//     /* Center slide text vertically */
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     transition: 300ms;
//     img {
//       width: 120%;
//     }
//   }
//   .swiper-slide:not(.swiper-slide-active) {
//     transform: scale(0.8);
//   }
// }
// .main {
//      background:
//     no-repeat right -100px top 40% ~"/" 220px 220px url("../../assets/img/bookActivity/circle.png"),
//     no-repeat left -100px bottom -20% ~"/" 220px 220px url("../../assets/img/bookActivity/circle.png");
//   .box {
//     position: relative;
//     margin: 0px auto 0px auto;
//     padding: 20px;
//     width: 345px;

//     border-radius: 20px;
//     background: rgba(255, 255, 255, 1);
//     box-shadow: 0px 0px 20px 0px rgba(129, 131, 195, 0.25);
//   }
//   .box1 {
//       top: -40px;
//     .book_feature {
//         margin-top: 10px;
//       font-size: 14px;
//       font-family: PingFang-SC-Regular;
//       color: rgba(51, 51, 51, 1);
//       .feature_row {
//         margin: 10px 0;
//         display: flex;
//         align-items: center;
//       }
//     }
//     .feature_i {
//       width: 18px;
//       margin-right: 7px;
//       display: inline-block;
//       vertical-align: center;
//     }
//   }
//   .box2 {
//       top: -30px;
//       padding: 20px 0;
//     //margin-bottom: 20px;
//     text-align: center;
//     .qr {
//         font-size: 0;
//         height: 130px;
//       img {
//         width: 130px;
//         height: 130px;
//       }
//     }
//     .wx_text_row {
//       margin: 5px 0 0 0;
//       padding-bottom: 20px;
//       font-size: 12px;
//       font-family: PingFang-SC-Regular;
//       //border-bottom: 1px solid #eee;
//       color: #999;
//       .wx_text {
//         color: #333;
//         margin: 0 5px;
//       }
//     }
//     .line{
//         height: 1px;
//         background-color: #eee;
//         transform: scaleY(.5)
//     }
//     .process {
//       font-size: 12px;
//       font-family: PingFang-SC-Regular;
//       font-weight: 400;
//       color: rgba(102, 102, 102, 1);
//       .process_title {
//           position: relative;
//         padding: 20px 0 15px 0;
//         font-size: 18px;
//         font-family: PingFangSC-Semibold;
//         font-weight: 600;
//         color: rgba(0, 0, 0, 1);
//         .title_text{
//             position: relative;
//             z-index: 9;
//         }
//         .circle{
//             position: absolute;
//             width: 16px;
//             height: 16px;
//             border-radius: 50%;
//             background:rgba(255,207,38,1);
//         }
//         .circle.first{
//             left: 36%;
//             top: 27%;
//             z-index: 2;
//         }
//         .circle.second{
//             width: 22px;
//             height: 22px;
//             left: 58%;
//             top: 49%;
//             z-index: 2;
//         }
//       }
//     }
//   }
// }
// .footer {
//   display: flex;
//   flex-direction: column;
//   justify-content: center;
//   text-align: center;
//   height: 92px;
//   background: rgba(255, 209, 46, 1);
//   font-size: 12px;
//   font-family: PingFang-SC-Regular;
//   .logo {
//     width: 70px;
//     margin-bottom: 5px;
//   }
// }
// .copy_btn {
//   display: inline-block;
//   width: 80px;
//   height: 24px;
//   line-height: 24px;
//   background: linear-gradient(
//     158deg,
//     rgba(255, 210, 74, 1) 0%,
//     rgba(255, 129, 0, 1) 100%
//   );
//   border-radius: 12px;
//   font-size: 14px;
//   font-family: PingFang-SC-Medium;
//   color: #fff;
// }
// .swiper-container-horizontal>.swiper-pagination-bullets, .swiper-pagination-custom, .swiper-pagination-fraction{
//     bottom: -5px;
//     span{
//         width: 6px;
//         height: 6px;
//         background:rgba(255,190,63,1);
//         opacity:0.2;
//     }

// }
// .swiper-pagination-bullet.swiper-pagination-bullet-active{
//         background:rgba(255,170,52,1);
//         opacity: 1 !important;
//     }
//
// #bookAc {
//   width: 100%;
//   height: 100vh;
//   background:url('../../assets/img/bookActivity/new_bg.jpg') no-repeat center/cover;
//   background-size: 100%
// }
#bookAc{
  width: 100%;
  min-height: 100vh;
  overflow: hidden;
  background-color: #FCDDC8;
}
.page_main{
  width: 100%;
}
</style>



