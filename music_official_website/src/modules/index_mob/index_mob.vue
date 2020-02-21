<template>
  <div>
    <Header></Header>
    <Download></Download>
    <!-- <video controls="controls">
      <source src="../../assets/video/index_djembe.mp4" type="video/mp4">
    </video> -->
    <section id="indexBannerSwiper" class="swiper-container">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide slide1"></div>
        <div class="swiper-slide slide2"></div>
        <div class="swiper-slide slide3"></div>
      </div>
      <div class="swiper-pagination"></div>
    </section>
    <section class="statistics_container">
      <div class="statistics">
        <div class="item_box">
          <div class="data">37050</div>
          <div class="item">毕业学员</div>
        </div>
        <div class="item_box">
          <div class="data">100000+</div>
          <div class="item">用户数量</div>
        </div>
        <div class="item_box">
          <div class="data">1200h+</div>
          <div class="item">课程时长</div>
        </div>
      </div>
    </section>
    <div>
      <div class="video_model">
        <div class="video_box" @click="handleClick('music_basis','music_basis_video')">
          <img src="../../assets/mob_assets/img/index_mob_video_1.png" alt class="cover">
          <img src="../../assets/img/play.png" alt class="play">
          <div class="video_info">
            <div class="info_title">音乐基础理论</div>
            <div class="info_sub_title">999元考级保过</div>
          </div>
          <video ref="music_basis" v-show="music_basis_video" controls="controls">
            <source src="../../assets/video/index_music_base.mp4" type="video/mp4">
          </video>
        </div>
        <div class="text">
          <p>15小时兴趣性学习，为考级保驾护航；</p>
          <p>18位明星导师精心设计，为考级量身定制；</p>
          <p>AI技术赋能，比音乐老师耳朵更灵敏，高质高</p>
        </div>
      </div>

      <div class="video_model">
        <div class="video_box" @click="handleClick('djembe','djembe_video')">
          <img src="../../assets/mob_assets/img/index_mob_video_2.png" alt class="cover">
          <img src="../../assets/img/play.png" alt class="play">
          <div class="video_info">
            <div class="info_title">非洲鼓</div>
            <div class="info_sub_title">80%妈妈给孩子音乐启蒙的第一课</div>
          </div>
          <video ref="djembe" v-show="djembe_video" controls="controls">
            <source src="../../assets/video/index_djembe.mp4" type="video/mp4">
          </video>
        </div>
        <div class="text">
          <p>国内外名师双课堂，主课+辅导课全跟踪；</p>
          <p>26课时技巧+非洲鼓文化故事，28课时快速进阶；</p>
          <p>30天轻松组建家庭小乐队</p>
        </div>
      </div>

      <div class="video_model">
        <div class="video_box" @click="handleClick('ukulele','ukulele_video')">
          <img src="../../assets/mob_assets/img/index_mob_video_3.png" alt class="cover">
          <img src="../../assets/img/play.png" alt class="play">
          <div class="video_info">
            <div class="info_title">尤克里里</div>
            <div class="info_sub_title">孩子爱上音乐的第一件乐器</div>
          </div>
          <video ref="ukulele" v-show="ukulele_video" controls="controls">
            <source src="../../assets/video/index_ukulele.mp4" type="video/mp4">
          </video>
        </div>
        <div class="text">
          <p>名师授课，班级辅导，保证学会；</p>
          <p>智能游戏化教学系统让孩子5分钟上手《小星星》</p>
          <p>8分钟上手《生日歌》；</p>
          <p>30天，成为班级音乐小明星</p>
        </div>
      </div>
    </div>
    <section class="learning">
      <CommonTitle>此刻他们正在学习</CommonTitle>
      <div class="learning_video_model">
        <div class="video_box" @click="handleClick('learning_video_ref','learningVideoShow')">
          <img src="../../assets/mob_assets/img/index_mob_video_4.jpeg" alt class="cover">
          <img src="../../assets/img/play.png" alt class="play">
          <div class="video_mask"></div>
          <video ref="learning_video_ref" v-show="learningVideoShow" controls="controls">
            <source src="../../assets/video/index_ukulele.mp4" type="video/mp4">
          </video>
        </div>
      </div>
    </section>
    <section class="remark">
      <CommonTitle>用户评论</CommonTitle>
      <div class="remark_container wrapper">
        <div id="remarkSwiper" class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(item,index) in remarkArr" :key="item">
              <img @click="previewRemark(index)" :src="item" alt>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="promise_section common_wrapper">
      <CommonTitle>我们向您承诺</CommonTitle>
      <div class="promise_row">
        <div class="promise_item">
          <div class="promise_icon">
            <img src="./../../assets/img/promise_money.png" alt>
          </div>
          <div class="promise_conten">
            <div class="item">退款承诺</div>
            <div class="detail">若您对课程或服务不满意，并且满足退款条件，可向我们提出“全额退款”申请。</div>
          </div>
        </div>
        <div class="promise_item">
          <div class="promise_icon">
            <img src="./../../assets/img/promise_service.png" alt>
          </div>
          <div class="promise_conten">
            <div class="item">服务承诺</div>
            <div class="detail">学员购买课程以后，即成为音乐壳的VIP学员，我们将向每一位学员保证服务水平。</div>
          </div>
        </div>
        <div class="promise_item">
          <div class="promise_icon">
            <img src="./../../assets/img/promise_teacher.png" alt>
          </div>
          <div class="promise_conten">
            <div class="item">师资承诺</div>
            <div class="detail">我们承诺AI音乐学院的师资团队来自国内顶尖名师，保证教师的优质教学水平。</div>
          </div>
        </div>
      </div>
    </section>
    <section class="common_wrapper">
      <CommonTitle>战略合作伙伴</CommonTitle>
      <div class="coopetation">
        <img src="./../../assets/mob_assets/img/coopetations.png" alt>
      </div>
    </section>
    <Footer :aiLogoShow="false"></Footer>
    <BackTop></BackTop>
  </div>
</template>
<script>
import Header from "../../components/mob/Header";
import Footer from "../../components/mob/Footer";
import Download from "../../components/mob/Download";
import CommonTitle from "../../components/mob/CommonTitle";
import Swiper from "swiper";
import { ImagePreview } from "vant";

import "swiper/dist/css/swiper.min.css";
import BackTop from "./../../components/mob/BackTop";
export default {
  data() {
    return {
      music_basis_video: false,
      djembe_video: false,
      ukulele_video: false,
      learningVideoShow: false,
      remarkArr: []
    };
  },
  components: {
    Header,
    CommonTitle,
    Footer,
    ImagePreview,
    Download,
    BackTop
  },
  created() {
    for (var i = 4; i < 10; i++) {
      var str = require(`./../../assets/mob_assets/img/remark${i}.png`);
      this.remarkArr.push(str);
    }
    this.$nextTick(() => {
      this.initRemarkSwiper();
    });

    //document.documentElement.style.fontSize = '50px'
  },
  mounted() {
    this.initBannerSwiper();
  },
  methods: {
    previewRemark(index) {
      ImagePreview({
        images: this.remarkArr,
        startPosition: index
      });
      //ImagePreview(this.remarkArr);
    },
    handleClick(ref, video) {
      this.$refs[ref].play();
      this[video] = true;
    },
    initRemarkSwiper() {
      this.mySwiper = new Swiper("#remarkSwiper", {
        direction: "horizontal",
        initialSlide: 1,
        //loop: true,
        slidesPerView: 3,
        centeredSlides: true,
        spaceBetween: 15
      });
    },
    initBannerSwiper() {
      var mySwiper = new Swiper("#indexBannerSwiper", {
        direction: "horizontal",
        //loop: true
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
.common_wrapper {
  margin: 0 15px;
}
#indexBannerSwiper.swiper-container {
  width: 100%;
  height: 150px;
  .slide1 {
    background: url("./../../assets/mob_assets/img/mob_banner1.png") no-repeat center;
    background-size: cover;
  }
  .slide2 {
    background: url("./../../assets/mob_assets/img/banner_index_2.png") no-repeat center;
    background-size: cover;
  }
  .slide3 {
    background: url("./../../assets/mob_assets/img/banner_index_3.png") no-repeat center;
    background-size: cover;
  }
}
.statistics_container {
  margin: 20px auto;
  width: 92%;
}
.statistics {
  background: #ffffff;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  text-align: center;
  padding: 10px 0;
  box-shadow: 0px 3px 5px 0px #f2f2f2;
  .item_box {
    width: 33.33%;
    position: relative;
    .data {
      font-size: 20px;
      color: #ffad00;
      font-weight: 500;
    }
    .item {
      font-size: 11px;
      color: #999999;
    }
  }
  .item_box::after {
    content: "";
    position: absolute;
    right: 0;
    top: 50%;
    height: 60%;
    width: 1px;
    background-color: #d9d9d9;
    transform: translateY(-50%) scaleX(0.5);
  }
  .item_box:last-child:after {
    content: "";
    position: absolute;
    width: 0;
    height: 0;
  }
}
.video_model {
  .common_wrapper;
  border-bottom: 1px solid transparent;
  margin-bottom: 35px;
  .video_box {
    position: relative;
    .cover {
      width: 100%;
      border-radius: 5px 5px 0 0;
    }
    .play {
      width: 39px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .video_info {
      position: absolute;
      left: 15px;
      bottom: 24px;
      display: flex;
      align-items: center;
      .info_title {
        margin-right: 18px;
        font-size: 18px;
        color: #ffffff;
      }
      .info_title::after {
        content: "";
        position: absolute;
        left: 3px;
        bottom: -2px;
        height: 3px;
        width: 18px;
        background-color: #ffaa06;
      }
      .info_sub_title {
        font-size: 13px;
        color: #ffffff;
      }
    }
    video {
      position: absolute;
      left: 0;
      right: 0;
      width: 100%;
      z-index: 5;
    }
  }
  .text {
        margin-top: -11px;
    padding: 18px 15px;
    font-size: 12px;
    color: #666666;
    letter-spacing: 1px;
    line-height: 19px;
    box-shadow: 0 8px 21px -12px #ece3d2;
  }
}
.learning {
  .common_wrapper;
  .learning_video_model {
    border-bottom: 1px solid transparent;
    margin-bottom: 35px;
    .video_box {
      font-size: 0;
      position: relative;
      .cover {
        width: 100%;
        border-radius: 5px;
      }
      .play {
        width: 39px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 3;
      }
      .video_mask {
        position: absolute;
        left: 0px;
        bottom: 0px;
        width: 100%;
        height: 100%;
        background-color: #ff9a29;
        opacity: 0.2;
      }
      video {
        position: absolute;
        left: 0;
        right: 0;
        width: 100%;
        z-index: 5;
      }
    }
  }
}
.remark {
  background-color: #fbf7f1;
  padding: 0 15px;
  overflow: auto;
}
#remarkSwiper.swiper-container {
  width: 100%;
  margin: 0 auto;
  .swiper-slide {
    text-align: center;
    font-size: 18px;
    background: #fff;

    /* Center slide text vertically */
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 300ms;
    img {
      width: 120%;
      background-color: #fbf7f1;
    }
  }
  .swiper-slide:not(.swiper-slide-active) {
    transform: scale(0.8);
  }
}
.promise_section {
  margin-bottom: 40px;
  .promise_item {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    .promise_icon {
      width: 50px;
      margin-right: 15px;
      img {
        width: 100%;
      }
    }
    .promise_conten {
      .item {
        margin-bottom: 3px;
        font-size: 14px;
        color: #666666;
        font-weight: 500;
      }
      .detail {
        font-size: 10px;
        color: #999999;
      }
    }
  }
}

.coopetation {
  img {
    width: 100%;
  }
  margin-bottom: 40px;
}
</style>

