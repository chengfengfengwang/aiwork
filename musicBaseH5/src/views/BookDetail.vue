<template>
  <div class="page_wrapper">
    <!-- <Loading v-show="loadingShow"/> -->
    <div class="video_model" style="margin:0;padding-bottom:110px">
      <div class="common_wrapper">
        <CourseCommonTitle>
          <template v-slot:title_zh>产品简介</template>
          <template v-slot:title_en>Product introduction</template>
        </CourseCommonTitle>
      </div>

      <div class="video_box">
        <img src="../assets/img/book_header.png" alt class="cover">
      </div>
      <div class="text">
        <div class="intro_title">《{{courseInfo.name}}》</div>
        <div>(1、2级)是音乐专业的基础课，主要包括视唱练耳和基本乐理两部分,是各类学习音乐专业学生的必修课。作为非专业性的音乐教育，应把它当做非常重要的音乐启蒙课。</div>
        <!-- <div class="intro_item">
          <div class="intro_label">适用范围</div>
          <div class="intro_item_content">适用6岁及以上学习音乐的儿童</div>
        </div>
        <div class="intro_item">
          <div class="intro_label">学习内容</div>
          <div class="intro_item_content">16课时+8个音乐常识小动画，50个乐理视唱练耳练习</div>
        </div>
        <div class="intro_item">
          <div class="intro_label">学习方式</div>
          <div class="intro_item_content">在家上课，包学包过，一对一辅导。</div>
        </div>-->
      </div>
    </div>

    <div class="catalogue">
      <div class="common_wrapper">
        <CourseCommonTitle>
          <template v-slot:title_zh>课程目录</template>
          <template v-slot:title_en>Course catalogue</template>
        </CourseCommonTitle>
      </div>
      <div class="catalogue_wrapper">
        <div class="catalogue_item" v-for="item in catalogue">
          <div class="catalogue_title">{{item.title}}</div>
          <div class="catalogue_content">{{item.content.join(' / ')}}</div>
        </div>
        <div class="harf_round first"></div>
        <div class="harf_round second"></div>
        <div class="harf_round third"></div>
        <div class="harf_round forth"></div>
      </div>
    </div>
    <div class="display">
      <div class="common_wrapper">
        <CourseCommonTitle>
          <template v-slot:title_zh>产品展示</template>
          <template v-slot:title_en>Product display</template>
        </CourseCommonTitle>
      </div>
      <div class="display_container">
        <div class="display_wrapper">
          <img src="./../assets/img/display1.png" alt>
        </div>
        <div class="display_wrapper">
          <img src="./../assets/img/display2.png" alt>
        </div>
        <div class="display_wrapper">
          <img src="./../assets/img/display3.png" alt>
        </div>
        <div class="display_wrapper">
          <img src="./../assets/img/display4.png" alt>
        </div>
        <div class="display_wrapper">
          <img src="./../assets/img/display5.png" alt>
        </div>
      </div>
    </div>
    <div class="bottom_pay_bar" :style="{paddingBottom:isIphonex?'20px':'0px'}">
      <div class="bar_main">
        <div class="bar_main_top">
          <div class="course_title">{{courseInfo.name}}</div>
          <div class="origin_price">¥{{courseInfo.old_price/100}}</div>
        </div>
        <div class="bar_main_bottom">
          <div class="buy_num"></div>
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
import { getQueryVariable, formatTime, isIphonex } from "../utils/util.js";
import CourseCommonTitle from "../components/CourseCommonTitle";
import mixins_book_detail from "./../utils/bookDetailMixin.js";
const catalogue = [
  {
    title: "第一课",
    content: ["乐理知识", "节奏练习"]
  },
  {
    title: "第二课",
    content: ["乐理知识", "听觉练习", "视唱"]
  },
  {
    title: "第三课",
    content: ["乐理知识", "听觉练习", "节奏练习", "视唱"]
  },
  {
    title: "第四课",
    content: ["乐理知识", "节奏练习", "听觉练习", "视唱", "乐曲分析"]
  },
  {
    title: "第五课",
    content: ["乐理知识", "节奏练习", "听觉练习", "视唱"]
  },
  {
    title: "第六课",
    content: ["乐理知识", "听觉练习", "节奏练习", "视唱", "乐曲分析"]
  },
  {
    title: "第七课",
    content: ["乐理知识", "听觉练习", "节奏练习", "视唱", "乐曲分析"]
  },
  {
    title: "第八课",
    content: ["乐理知识", "节奏练习", "视唱"]
  },
  {
    title: "第九课",
    content: ["乐理知识", "节奏练习", "听觉练习", "视唱"]
  },
  {
    title: "第十课",
    content: ["乐理知识", "听觉练习", "节奏练习", "视唱", "乐曲分析"]
  },
  {
    title: "第十一课",
    content: ["节奏练习", "听觉练习", "视唱", "乐曲分析"]
  },
  {
    title: "第十二课",
    content: ["乐理知识", "节奏练习", "听觉练习", "视唱"]
  },
  {
    title: "第十三课",
    content: ["节奏练习", "听觉练习", "视唱", "乐曲分析"]
  },
  {
    title: "第十四课",
    content: ["乐理知识", "节奏练习", "听觉练习", "视唱", "乐曲分析"]
  },
  {
    title: "第十五课",
    content: ["乐理知识", "视唱"]
  },
  {
    title: "第十六课",
    content: ["基本乐科考级笔试测试题（第一级）\\ 测试答案"]
  }
];
export default {
  data() {
    return {
      courseInfo: {
        course: []
      },
      loadingShow: false,
      urlParams: {},
      catalogue: catalogue,
      isIphonex: false
    };
  },
  mixins: [mixins_book_detail],
  components: {
    Loading,
    CourseCommonTitle
  },
  created() {
    this.isIphonex = isIphonex();
  },
  mounted() {
    this.urlParams = {
      goodsId: getQueryVariable("goodsId"),
      share_channel: getQueryVariable("share_channel"),
      address: getQueryVariable("address"),
      phone: getQueryVariable("phone"),
      uid: getQueryVariable("uid"),
      token: getQueryVariable("token"),
      coupon_id: getQueryVariable("coupon_id")
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
      if (process.env.NODE_ENV === "production") {
        this.callApp();
      }
      this.$router.push({
        path: "/BookPay"
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
          `${process.env.JINKANG}/v1/goods/textbook?id=${
            this.urlParams.goodsId
          }`
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
.page_wrapper {
  background-color: #fff;
  padding-bottom: 50px;
}
.common_wrapper {
  margin: 0 15px;
  overflow: hidden;
}
.harf_round {
  position: absolute;
  border-radius: 50%;
  background: #fff7f2;
  z-index: 2;
}
.video_model {
  .common_wrapper;
  position: relative;
  border-bottom: 1px solid transparent;
  margin-bottom: 35px;
  .video_box {
    position: relative;
    .cover {
      width: 100%;
      //border-radius: 5px 5px 0 0;
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
      bottom: 14px;
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
      top: 0;
      width: 100%;
      z-index: 5;
    }
  }
  .text {
    position: absolute;
    bottom: 40px;
    left: 50%;
    width: 90%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 5px;
    box-sizing: border-box;
    padding: 17px 5px;
    font-size: 12px;
    color: #666666;
    letter-spacing: 1px;
    line-height: 17px;
    box-shadow: 0px 11px 21px -9px #ece3d2;
    .intro_title {
      line-height: 24px;
      font-size: 18px;
      color: #333333;
      //text-align: center;
      margin-bottom: 10px;
      text-indent: -0.5em;
      padding: 0 1em;
    }
    .intro_item {
      display: flex;
      margin-bottom: 7px;
    }
    .intro_label,
    .intro_item_content {
      //display: inline-block;
      position: relative;
    }
    .intro_label {
      padding: 0 10px 0 10px;
      width: 60px;
      flex-shrink: 0;
      flex-grow: 0;
    }
    .intro_label:before {
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      position: absolute;
      left: 3px;
      top: 7px;
      //margin-top: -2px;
      background: #ffaa06;
    }
    .intro_label:after {
      content: "";
      width: 1px;
      height: 11px;
      position: absolute;
      right: 8px;
      top: 3px;
      background: #d9d9d9;
    }
  }
}
.catalogue_wrapper {
  .common_wrapper;
  overflow: hidden;
  position: relative;
  padding: 26px 29px;
  margin-bottom: 30px;
  background-color: #fffaf8;
  box-shadow: 0px 11px 21px -9px #ece3d2;
  .catalogue_item {
    position: relative;
    z-index: 10;
    margin-bottom: 12px;
    .catalogue_title {
      font-family: PingFangSC-Medium;
      font-size: 13px;
      color: #ffa700;
    }
    .catalogue_content {
      font-size: 12px;
      color: #333333;
    }
  }
  .harf_round.first {
    width: 253px;
    height: 253px;
    left: -130px;
    top: -30px;
  }
  .harf_round.second {
    width: 264px;
    height: 264px;
    right: -130px;
    top: 254px;
  }
  .harf_round.third {
    width: 370px;
    height: 370px;
    left: -230px;
    bottom: 0px;
  }
  .harf_round.forth {
    width: 265px;
    height: 265px;
    right: -120px;
    bottom: -120px;
  }
}
.display_wrapper {
  background-color: #fff;
  .px1-bottom-f1;
  text-align: center;
  font-size: 0;
  padding: 30px 0;
  &:nth-child(1) {
    img {
      width: 215px;
    }
  }
  &:nth-child(2) {
    img {
      width: 322px;
    }
  }
  &:nth-child(3) {
    img {
      width: 353px;
    }
  }
  &:nth-child(4) {
    img {
      width: 320px;
    }
  }
  &:nth-child(5) {
    img {
      width: 320px;
    }
  }
}
.bottom_pay_bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  z-index: 1999;
  background-color: #fff;
  .bar_main {
    //display: flex;
    flex-direction: column;
    //justify-content: center;
    background-color: #fff;
    flex-grow: 0;
    width: 61%;
    padding: 10px 7px;
    .bar_main_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .course_title {
        flex-grow: 0;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #333333;
        line-height: 13px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        //width: 76%;
        margin-right: 2px;
      }
      .origin_price {
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #999999;
        text-decoration: line-through;
      }
    }
    .bar_main_bottom {
      display: flex;
      align-items: center;
      font-size: 11px;
      .buy_num {
        flex-grow: 1;
        font-size: 11px;
        color: #999999;
      }
      .now_price {
        .text {
          font-size: 11px;
          color: #333333;
        }
        .num {
          font-family: PingFangSC-Semibold;
          font-size: 14px;
          color: #ec545e;
        }
      }
    }
  }
  .bar_btn {
    background: #ee525b;
    width: 39%;
    font-family: PingFangSC-Medium;
    font-size: 16px;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    line-height: 50px;
  }
}
</style>


