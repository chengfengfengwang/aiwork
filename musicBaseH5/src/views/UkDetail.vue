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

      <div class="video_box" style="text-align:center">
        <!-- <img src="../assets/img/book_header.png" alt class="cover"> -->
        <img
          v-show="uk=='uk2'"
          style="width:73%"
          class="cover"
          id="J_ImgBooth"
          src="https://gd4.alicdn.com/imgextra/i3/0/O1CN01RYDrCE1togjSJyifO_!!0-item_pic.jpg_400x400.jpg"
          data-haszoom="700"
          data-size="400x400"
        >
        <img
          v-show="uk=='uk1'"
          style="width:73%"
          class="cover"
          id="J_ImgBooth"
          src="https://gd3.alicdn.com/imgextra/i2/0/O1CN01vpUH7Z1togjSzGHtM_!!0-item_pic.jpg_400x400.jpg"
          data-haszoom="700"
          data-size="400x400"
        >
      </div>
      <div class="text">
        <div v-show="uk=='uk1'" class="intro_title">ai音乐学院恩雅小黄人尤克里里女生款可爱初学者23寸智能小吉他</div>
        <div v-show="uk=='uk2'" class="intro_title">ai音乐学院恩雅X1 23寸尤克里里入门小吉他学生成人女23寸ukulele</div>
      </div>
    </div>

    <div class="catalogue">
      <div class="common_wrapper">
        <CourseCommonTitle>
          <template v-slot:title_zh>产品规格</template>
          <template v-slot:title_en>Course catalogue</template>
        </CourseCommonTitle>
      </div>
      <div class="catalogue_wrapper">
        <ul v-show="uk=='uk1'" class="attributes-list">
          <li title="恩雅">品牌:&nbsp;恩雅</li>

          <li title="MU1 MU2 ">颜色分类:&nbsp;MU1 MU2</li>

          <li title="其他">面板材质:&nbsp;其他</li>

          <li title="20">品位:&nbsp;20</li>

          <li title="封闭旋钮">卷弦器:&nbsp;封闭旋钮</li>

          <li title="其他">指板材质:&nbsp;其他</li>

          <li title="其他">背侧板材质:&nbsp;其他</li>

          <li title="初学者 家庭教学">适用对象:&nbsp;初学者 家庭教学</li>

          <li title="儿童">适用人群:&nbsp;儿童</li>

          <li title="面单">箱体材质分类:&nbsp;面单</li>

          <li title="23英寸">吉他尺寸:&nbsp;23英寸</li>
        </ul>
        <ul v-show="uk=='uk2'" class="attributes-list">
          <li title="恩雅">品牌:&nbsp;恩雅</li>

          <li title="尤克里里23寸 尤克里里26寸">颜色分类:&nbsp;尤克里里23寸 尤克里里26寸</li>

          <li title="其他">面板材质:&nbsp;其他</li>

          <li title="20">品位:&nbsp;20</li>

          <li title="半封闭旋钮">卷弦器:&nbsp;半封闭旋钮</li>

          <li title="玫瑰木">指板材质:&nbsp;玫瑰木</li>

          <li title="HPL 相思木">背侧板材质:&nbsp;HPL 相思木</li>

          <li title="专业演奏 初学者 家庭教学">适用对象:&nbsp;专业演奏 初学者 家庭教学</li>

          <li title="通用">适用人群:&nbsp;通用</li>

          <li title="全单">箱体材质分类:&nbsp;全单</li>

          <li title="23英寸 26英寸">吉他尺寸:&nbsp;23英寸 26英寸</li>
        </ul>
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
        <div v-show="uk=='uk2'" class="common_wrapper">
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN01yuAxxk1togi66ATbB_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i4/3336235949/O1CN01syTYuv1togi9Ph1T1_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN01xj9okj1togi7setAu_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN01jRYZ9u1togi0mN9GM_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN0161AsLA1togiA1ekxj_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01EIqrQA1togi0mM8un_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN01lc6C1K1togg5BzbHO_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i4/3336235949/O1CN01ES5yYB1togi7vneES_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN01hitHMj1togi5K1k6c_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN01BdaxZx1togi7XePRb_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN01CkN9Nf1togi7sf1Tt_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01fnCk631togi7GYgpw_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN01HLVy5O1togi9PjVMG_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i4/3336235949/O1CN01zZt2YW1togi7GYcfw_!!3336235949.jpg"
            class
            data-spm-anchor-id="2013.1.0.i2.17ef3f79V5vcVn"
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN01JkVAvK1togi7GYkwy_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01JWBzus1togiAdk12Q_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN011Z64JQ1togi5K0bW0_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN01UkXZ5v1togi7vmmCk_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i4/3336235949/O1CN016bOpoJ1togi7GXsun_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN01APsGdg1togg5BzCFV_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN01JIlLyH1togi7XdT7x_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN011fYyiY1togi5K56AG_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i4/3336235949/O1CN01TehJUC1togi8p44A6_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01QcsQfW1togi66D1az_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN01ceFmFT1togiA1dY7Q_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN01sShAr51togi9PhpTl_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01fgkzQ41togi8u1s9z_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN01ylM8TW1togiAE8Lwm_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01zxTCIL1togi5K0T5Z_!!3336235949.jpg"
            class
          >
        </div>
        <div v-show="uk=='uk1'" class="common_wrapper">
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN01YUZHJJ1togi0mEp7f_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i4/3336235949/O1CN01tbLOEx1togi660GnK_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01oBE7961togiAdYXNd_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN0131ikpE1togi7XQa4u_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01T9p5mF1togi8ttwuu_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i4/3336235949/O1CN01NSJx4E1togi8ts4QY_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01UvV4Ob1togiA1SsIg_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN01TztuJu1togi7XSvkj_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01aetQpH1togi7tp72s_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN019xJIbE1togi7to6Zn_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i4/3336235949/O1CN014QO7ty1togiADy0uI_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN01TkLXpL1togiADxwfQ_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01wkpSUn1togi0mEQAB_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i4/3336235949/O1CN015q46V31togi7XV0Yl_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i4/3336235949/O1CN01bkFQiS1togi8klw2k_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01BruCmt1togi8trGRl_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i4/3336235949/O1CN013U846U1togi7toVXi_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN012S6JRd1togi8ovjoT_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN014zBy6p1togi8tswZ9_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i1/3336235949/O1CN01rYBgKn1togi7XUCgE_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01Rqwe7R1togi8tuout_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN01oeWiE51togi8ouC9p_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i4/3336235949/O1CN01NNNvdh1togi8otSVa_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01Q8AvjM1togi6SJ2VN_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i2/3336235949/O1CN01BQCCpK1togiA1T8wc_!!3336235949.jpg"
            class
          >
          <img
            style="display: block;width: 100.0%;"
            src="https://img.alicdn.com/imgextra/i3/3336235949/O1CN01GxaeVh1togi5JrCka_!!3336235949.jpg"
            class
          >
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
import { getQueryVariable, formatTime, isIphonex } from "../utils/util.js";
import CourseCommonTitle from "../components/CourseCommonTitle";
import mixins_book_detail from "./../utils/bookDetailMixin.js";
const uk1Info = {
  course: [],
  price: 61900,
  old_price: 69900,
  name: "小黄人尤克里里",
  user_count: 576
};
const uk2Info = {
  course: [],
  price: 61900,
  old_price: 69900,
  name: "恩雅X1尤克里里",
  user_count: 476
};
export default {
  data() {
    return {
      courseInfo: uk1Info,
      loadingShow: false,
      urlParams: {},
      isIphonex: false,
      uk: getQueryVariable("type")
    };
  },
  mixins: [mixins_book_detail],
  components: {
    Loading,
    CourseCommonTitle
  },
  created() {
    this.isIphonex = isIphonex();
    this.courseInfo = this.uk=='uk1'?uk1Info:uk2Info
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
    //this.getCourseInfo();
  },
  methods: {
    getQueryVariable: getQueryVariable,
    formatTime: formatTime,
    toPay() {
      localStorage.setItem("courseInfo", JSON.stringify(this.courseInfo));
      if (process.env.NODE_ENV === "production") {
        //this.callApp();
      }
      this.$router.push({
        path: "/UkPay"
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
    bottom: 20px;
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
  //margin-bottom: 30px;
  background-color: #fffaf8;
  box-shadow: 0px 11px 21px -9px #ece3d2;
  font-size: 13px;
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


