<template>
  <div class="page_wrapper">
    <Loading v-show="loadingShow"/>
    <section class="banner" v-bind:style="{ backgroundImage: 'url(' + courseInfo.good_img + ')' }"></section>
    <section class="base_info">
      <div class="base_info_top px1-bottom-d9">
        <div class="course_name">{{courseInfo.name}}</div>
        <div class="person_num">{{courseInfo.user_count}}人参与</div>
      </div>
      <div class="base_info_bottom">
        <div class="lesson_num">
          <img src="./../assets/img/icon_purchase_book.png" alt>
          课程：{{courseInfo.lesson_count}}节
        </div>
        <div class="teacher">
          <img src="./../assets/img/icon_purchase_teacher.png" alt>
          授课教师：{{courseInfo.teacher ? courseInfo.teacher.name : ''}}
        </div>
        <div class="duration">
          <img src="./../assets/img/icon_purchase_time.png" alt>
          学习时长：{{courseInfo.duration}}天
        </div>
      </div>
    </section>
    <section class="common_section teacher_container">
      <div class="section_title">
        <span class="text_decoration"></span>
        <span class="title_text">授课教师</span>
        <span class="text_decoration"></span>
      </div>
      <div class="teacher_wrapper">
        <div class="teacher_img" v-if="courseInfo.teacher">
          <img :src="courseInfo.teacher.img" alt>
        </div>
        <div class="teacher_detail">
          <div class="teacher_name">{{courseInfo.teacher ? courseInfo.teacher.name : ''}}</div>
          <div class="introduction" v-if="courseInfo.teacher">
            <div v-for="(item,index) in courseInfo.teacher.desc" :key="index">
              <span class="dot"></span>
              {{item}}
            </div>
          </div>
        </div>
      </div>
    </section>
    <div class="section_bottom_line">
      <span v-for="(n,index) in 14" :key="index" class="bottom_line_dot"></span>
    </div>
    <section class="common_section">
      <div class="section_title">
        <span class="text_decoration"></span>
        <span class="title_text">课程目录</span>
        <span class="text_decoration"></span>
      </div>
      <div class="lesson_wrapper">
        <p class="lesson_item" v-for="(item,index) in courseInfo.lesson_name" :key="index">
          <span class="lesson_index">第{{ index | numToNum}}课</span>阿斯顿发送到撒发生的
        </p>
      </div>
    </section>
    <div class="section_bottom_line">
      <span v-for="(n,index) in 14" :key="index" class="bottom_line_dot"></span>
    </div>
    <section class="common_section">
      <div class="section_title">
        <span class="text_decoration"></span>
        <span class="title_text">尊享服务</span>
        <span class="text_decoration"></span>
      </div>
      <div class="service_wrapper">
        <div class="service_item" v-for="(item,index) in courseInfo.ad_desc" :key="index">
          <span class="service_item_index">{{index + 1}}.</span>
          <span class="service_content">{{item.desc}}</span>
          <div class="service_img_wrapper">
            <img :src="item.img" alt>
          </div>
        </div>
      </div>
    </section>
    <section class="evaluation">
      <div class="evaluation_header px1-bottom-d8">
        <div class="eva_header_left">
          <img src="./../assets/img/icon_evaluate_g.png" alt>
          学员评价({{courseInfo.evaluate ? courseInfo.evaluate.length : ''}})
        </div>
        <div @click="toEvaluaList" class="eva_header_right">
          全部评价
          <img src="./../assets/img/icon_common_more.png" alt>
        </div>
      </div>
      <div v-if="courseInfo.evaluate">
        <div
          class="evaluation_item"
          v-for="(item,index) in courseInfo.evaluate.slice(0,3)"
          :key="index"
        >
          <div class="item_header">
            <div class="item_header_left">
              <div class="avatar_wrapper">
                <img :src="item.avatar_url" alt>
              </div>
              <span class="name">{{item.nickname}}</span>
            </div>
            <div class="item_header_right">{{formatTime(item.create_time)}}</div>
          </div>
          <div class="item_content">{{item.message}}</div>
        </div>
      </div>

      <!-- <div class="evaluation_item">
        <div class="item_header">
          <div class="item_header_left">
            <div class="avatar_wrapper">
              <img
                src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg"
                alt
              >
            </div>
            <span class="name">AIMUSIC_0621</span>
          </div>
          <div class="item_header_right">2018-12-02</div>
        </div>
        <div class="item_content">人们在被命运眷宠的时候，勇、怯、强、弱、智、愚、贤、不肖，都看不出什么分别来可是一旦为幸运所抛弃，开始涉历惊涛骇浪的时候</div>
      </div>
      <div class="evaluation_item">
        <div class="item_header">
          <div class="item_header_left">
            <div class="avatar_wrapper">
              <img
                src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg"
                alt
              >
            </div>
            <span class="name">AIMUSIC_0621</span>
          </div>
          <div class="item_header_right">2018-12-02</div>
        </div>
        <div class="item_content">人们在被命运眷宠的时候，勇、怯、强、弱、智、愚、贤、不肖，都看不出什么分别来可是一旦为幸运所抛弃，开始涉历惊涛骇浪的时候</div>
      </div>-->
    </section>
    <div class="bottom_pay_bar">
      <div class="bar_main">
        <div class="bar_main_top">
          <div class="course_title">{{courseInfo.name}}</div>
          <div class="origin_price">¥{{courseInfo.old_price/100}}</div>
        </div>
        <div class="bar_main_bottom">
          <div class="buy_num">{{courseInfo.user_count}}人参与</div>
          <div class="now_price">
            <span class="text">限时特价</span>
            <span class="num">¥{{courseInfo.price/100}}</span>
          </div>
        </div>
      </div>
      <div class="bar_btn" @click="toPay">立即购买</div>
    </div>
  </div>
</template>
<script>
import Loading from "./../components/Loading";
import { getQueryVariable, formatTime } from "../utils/util.js";
export default {
  data() {
    return {
      courseInfo: {
        course: []
      },
      loadingShow: false,
      urlParams: {}
    };
  },
  components: {
    Loading
  },
  created() {
    console.log(location.href);
  },
  mounted() {
    this.urlParams = {
      goodsId: getQueryVariable("goodsId"),
      share_channel: getQueryVariable("share_channel"),
      address: getQueryVariable("address"),
      phone: getQueryVariable("phone"),
      uid: getQueryVariable("uid"),
      token: getQueryVariable("token")
    };
    localStorage.setItem("urlParams", JSON.stringify(this.urlParams));
    this.axios.defaults.headers.common["token"] = this.urlParams.token;
    this.axios.defaults.headers.common["uid"] = this.urlParams.uid;
    this.getCourseInfo();
  },
  methods: {
    formatTime: formatTime,
    toPay() {
      localStorage.setItem("courseInfo", JSON.stringify(this.courseInfo));
      this.callApp();
      this.$router.push({
        name: "Pay"
      });
    },
    callApp() {
      // 由于对象映射，所以调用hello对象等于调用Android映射的对象
      // AndroidJS.hello("js调用了android中的hello方法");
      console.log("--- js调用了原生app中的方法 ---");
      var isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      console.log(isIOS);
      if (isIOS) {
        window.webkit.messageHandlers.onBuyClick.postMessage({
          onBuyClick: "ture"
        });
      } else {
        PayFeedBack.onBuyClick("true");
      }
    },
    getCourseInfo() {
      //5c764f0e9a5f77d3be85c727
      //5c764fe99a5f77d3be85c729
      this.loadingShow = true;
      this.axios
        .get(
          `${process.env.JINKANG}/v1/goods/detail?id=${this.urlParams.goodsId}`
        )
        .then(res => {
          this.loadingShow = false;
          this.courseInfo = res.data;
        });
    },
    toEvaluaList() {
      if (this.courseInfo.evaluate.length > 0) {
        this.$router.push({
          name: "EvaluationList",
          params: { evaluaList: this.courseInfo.evaluate }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./../assets/css/common.less");
@font-face {
  font-family: "DINCond-Bold";
  src: url("./../assets/fonts/DINCond-Bold.ttf") format("truetype");
}
.page_wrapper {
  margin-bottom: 300px;
}
.common_section {
  background-color: #fff;
  margin: 0 30px;
  padding: 0 30px;
  .section_title {
    text-align: center;
    padding: 0px 0 30px 0;
    .text_decoration {
      display: inline-block;
      vertical-align: middle;
      width: 80px;
      height: 12px;
      background: #ffad8f;
      box-shadow: 0 4px 8px 0 #ffd7c9;
      border-radius: 20px;
    }
    .title_text {
      vertical-align: middle;
      font-family: PingFangSC-Medium;
      font-size: 32px;
      color: #333333;
      margin: 0 30px;
    }
  }
}
.teacher_container {
  .section_title {
    padding: 40px 0 30px 0;
  }
  .teacher_wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  @media screen and (min-width: 1023px) {
    .teacher_img {
      width: 40%;
      margin: 0 40px 0 0 !important;
    }
  }
  .teacher_img {
    margin: 0 auto;
    text-align: center;
    img {
      width: 91%;
      //width: 630px;
      //height: 394px;
    }
  }
  .teacher_detail {
    .teacher_name {
      font-family: PingFangSC-Semibold;
      font-size: 32px;
      color: #333333;
      margin: 30px 0;
    }
    .introduction {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #333333;
      & > div {
        display: flex;
        align-items: center;
        line-height: 44px;
        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #ffad8f;
          margin-right: 16px;
        }
      }
    }
  }
}
.section_bottom_line {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 40px 0px 40px 0;
  margin: 0 30px;
  .bottom_line_dot {
    display: inline-block;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #f7f7f5;
    &:first-child {
      margin-left: -12px;
    }
    &:last-child {
      margin-right: -12px;
    }
  }
}
.sale_package {
  width: 100%;
  height: 240px;
  background: url("./../assets/img/pic_bundle_bg.png") no-repeat center;
  background-size: cover;
  box-sizing: border-box;
  margin: 20px 0;
  padding: 30px;
  display: flex;
  justify-content: space-around;
  .cover {
    width: 320px;
    height: 180px;
  }
  .price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 338px;
    height: 80px;
    padding: 0 20px;
    border-radius: 8px;
    background: url("./../assets/img/price_bg.png") no-repeat center;
    background-size: cover;
    .origin_price {
      font-family: PingFangSC-Semibold;
      font-size: 22px;
      color: #402500;
      text-decoration: line-through
    }
    .price_text {
      font-family: PingFangSC-Semibold;
      font-size: 28px;
      color: #402500;
    }
    .now_price {
      font-family: PingFangSC-Semibold;
      font-size: 36px;
      color: #ec545e;
    }
  }
  .lessons {
    margin-top: 30px;
    font-family: PingFangSC-Regular;
    font-size: 22px;
    color: #402500;
    line-height: 36px;
    & > div {
      font-size: 0;
      .lesson_name {
        display: inline-block;
        vertical-align: middle;
        width: 80%;
        font-size: 22px;
        .ellipsis;
      }
      .lessons_n {
        display: inline-block;
        vertical-align: middle;
        color: #ec545e;
        font-size: 22px !important;
      }
    }
  }
}
.banner {
  width: 100%;
  height: 200px;
  background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551345964066&di=89273e7d75317455faae336d1064ef07&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fcefc1e178a82b901fd40c8077d8da9773912ef11.jpg")
    no-repeat center;
  background-size: cover;
}
@media screen and (min-width: 1023px) {
  .banner {
    height: 320px;
  }
}
.base_info {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 0 30px;
  .base_info_top {
    display: flex;
    align-items: center;
    height: 88px;
    .course_name {
      flex-grow: 1;
      font-family: PingFangSC-Regular;
      font-size: 28px;
      color: #333333;
      letter-spacing: 0;
    }
    .person_num {
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #999999;
      letter-spacing: 0;
    }
  }
  .base_info_bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 83px;
    justify-content: space-between;
    .lesson_num,
    .teacher,
    .duration {
      display: flex;
      align-items: center;
      font-family: PingFangSC-Regular;
      font-size: 22px;
      color: #333333;
      text-align: center;
      line-height: 22px;
      img {
        margin-right: 12px;
      }
    }
    .lesson_num {
      img {
        width: 20px;
      }
    }
    .teacher {
      img {
        width: 20px;
      }
    }
    .duration {
      img {
        width: 24px;
      }
    }
  }
}
.service_wrapper {
  font-family: PingFangSC-Regular;
  font-size: 24px;
  color: #151515;
  letter-spacing: 0;
  text-align: justify;
  line-height: 36px;
  .service_item {
    padding-bottom: 40px;
    img {
      width: 628px;
    }
  }
  .service_content {
    white-space: normal;
    word-break: break-all;
  }
  .service_item_index {
    font-family: DINCond-Bold;
    font-size: 60px;
    color: #333333;
  }
  .service_img_wrapper {
    text-align: center;
    img {
      max-width: 80%;
      margin-top: 20px;
    }
  }
}
.evaluation {
  background-color: #fff;
  margin-top: 20px;
  .evaluation_header {
    height: 94px;
    display: flex;
    align-items: center;
    padding: 0 30px;
    .eva_header_left {
      flex-grow: 1;
      display: flex;
      align-items: center;
      img {
        width: 28px;
        margin-right: 16px;
      }
    }
    .eva_header_right {
      display: flex;
      align-items: center;
      font-family: PingFangSC-Medium;
      font-size: 24px;
      color: #ee515a;
      img {
        width: 17px;
        margin-left: 20px;
      }
    }
  }
  .evaluation_item {
    .px1-bottom-ddd;
    &:last-child:after {
      content: "";
      height: 0;
    }
    padding: 0 30px;
    .item_header {
      display: flex;
      align-items: center;
      padding: 20px 0;
    }
    .item_header_left {
      flex-grow: 1;
      display: flex;
      align-items: center;
      .avatar_wrapper {
        margin-right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .name {
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #333333;
      }
    }
    .item_header_right {
      font-family: PingFangSC-Medium;
      font-size: 22px;
      color: #999999;
    }
    .item_content {
      padding-bottom: 20px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #333333;
      letter-spacing: 0;
      text-align: justify;
      line-height: 36px;
    }
  }
}
.bottom_pay_bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  display: flex;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  .bar_main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #fff;
    flex-grow: 0;
    width: 61%;
    padding: 0 30px;
    .bar_main_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .course_title {
        flex-grow: 0;
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #333333;
        line-height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        //width: 76%;
        margin-right: 5px;
      }
      .origin_price {
        font-family: PingFangSC-Regular;
        font-size: 22px;
        color: #999999;
        text-decoration: line-through
      }
    }
    .bar_main_bottom {
      display: flex;
      align-items: center;
      .buy_num {
        flex-grow: 1;
        font-family: PingFangSC-Regular;
        font-size: 22px;
        color: #999999;
      }
      .now_price {
        .text {
          font-family: PingFangSC-Regular;
          font-size: 22px;
          color: #333333;
        }
        .num {
          font-family: PingFangSC-Semibold;
          font-size: 28px;
          color: #ec545e;
        }
      }
    }
  }
  .bar_btn {
    background: #ee525b;
    width: 39%;
    font-family: PingFangSC-Medium;
    font-size: 32px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    line-height: 100px;
  }
}
.lesson_wrapper {
  border-radius: 16px;
  padding: 0 40px;
  background-color: #ffc367;
  font-family: PingFangSC-Regular;
  font-size: 28px;
  color: #151515;
  letter-spacing: 0;
  line-height: 28px;
  .lesson_index {
    font-family: PingFangSC-Semibold;
    margin-right: 20px;
  }
  .lesson_item {
    line-height: 80px;
  }
}
</style>


