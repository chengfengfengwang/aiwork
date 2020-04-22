<template>
  <div class="question_detail_wrapper">
    <div v-if="otherBankShow">
      <div class="banner">
        <img src="./../assets/img/question_detail/banner.png" alt>
      </div>
      <div class="section">
        <div class="title">
          <img src="./../assets/img/question_detail/title1.png" alt>
        </div>
        <div class="box sec1">
          <div class="subtitle">
            <img src="./../assets/img/question_detail/sub_title1.png" alt>
          </div>
          <div class="box_sec">
            <img class="sec_img" src="./../assets/img/question_detail/sec1_1.png" alt>
            <div class="title1">整套真题 还原最真实的考试场景</div>
            <div class="title2">模拟真题、即时评分，同步中国音乐学院 最新线上考试系统</div>
          </div>
          <div class="box_sec">
            <img class="sec_img" src="./../assets/img/question_detail/sec1_2.png" alt>
            <div class="title1">最新“音乐识别”技术 轻松克服“视唱练耳”难点</div>
            <div class="title2">智能“视唱”音准识别 ，比郎朗的耳朵还准还灵敏</div>
          </div>
          <div class="box_sec">
            <img class="sec_img" src="./../assets/img/question_detail/sec1_3.png" alt>
            <div class="title1">错题收录+专业解析 夯实每一个知识点</div>
            <div class="title2">错题收录，重点练习薄弱环节，快速提升总成绩</div>
          </div>
          <div class="box_sec">
            <img class="sec_img" src="./../assets/img/question_detail/sec1_4.png" alt>
            <div class="title1">
              <span class="red">12</span>种互动游戏模型+
              <span class="red">8~18</span>个音乐常识动画故事
            </div>
            <div class="title2">趣味答疑，让孩子爱学、会学、轻松学</div>
          </div>
        </div>
      </div>
      <div class="section">
        <img class="teacher_sec" src="./../assets/img/question_detail/teacher_sec.png" alt>
      </div>
      <div class="section sec3">
        <div class="title">
          <img src="./../assets/img/question_detail/title2.png" alt>
        </div>
        <div class="box sec3">
          <div class="subtitle">
            <img src="./../assets/img/question_detail/sub_title1.png" alt>
          </div>
          <div class="box_sec" v-for="(item,index) in catalog" :key="index">
            <img class="sec_img" :src="catalogImg[index]" alt>
            <div class="title">{{item.title}}</div>
            <div class="content" :class="'content' + index">
              <div class="item" :key="lidex" v-for="(li,lidex) in item.content">
                <span v-show="li">{{lidex+1}}.</span>
                {{li}}
              </div>
            </div>
          </div>
        </div>
        <div class="box feature">
          <div class="red_title">模拟真题</div>
          <div>
            1、五套往届完整真题，每套
            <span class="red_f red">26</span>题，共
            <span class="red_f red">130</span>道题
          </div>
          <div>2、随时点击错题解析，获取专业解题思路</div>
        </div>
        <div class="box feature">
          <div class="red_title">错题本</div>
          <div>1、根据模拟考试实际完成情况，自动收录相应错题</div>
          <div>2、随时点击错题解析，获取专业解题思路</div>
        </div>
      </div>
      <div class="sec4">
        <!-- <img src="./../assets/img/question_detail/sec_4.png alt=""> -->
        <div class="qrarea">
          <img src="../assets/img/question_detail/qr.jpeg" alt>
          <div>
            <div>微信号:jessieyin02</div>
            <div>或扫描添加老师微信</div>
          </div>
        </div>
        <img class="content" src="../assets/img/question_detail/sec_4.png" alt>
      </div>
    </div>
    <div id="musicTheory" v-if="musicTheoryShow">
      <img src="./../assets/img/question_detail/theory/1.png" alt class="page">
      <img src="./../assets/img/question_detail/theory/2.png" alt class="page">
      <img src="./../assets/img/question_detail/theory/3.png" alt class="page">
      <img src="./../assets/img/question_detail/theory/4.png" alt class="page">
      <img src="./../assets/img/question_detail/theory/5.png" alt class="page">
    </div>
    <div id="countryThree" v-if="countryThreeShow">
      <img src="./../assets/img/question_detail/countryThree/01.png" alt class="page">
      <img src="./../assets/img/question_detail/countryThree/02.png" alt class="page">
      <img src="./../assets/img/question_detail/countryThree/03.png" alt class="page">
      <img src="./../assets/img/question_detail/countryThree/04.png" alt class="page">
      <img src="./../assets/img/question_detail/countryThree/05.png" alt class="page">
      <img src="./../assets/img/question_detail/countryThree/06.png" alt class="page">
    </div>
    <div id="centerMiddle" v-if="centerMiddleShow">
      <img src="./../assets/img/question_detail/centerMiddle/01.png" alt class="page">
      <img src="./../assets/img/question_detail/centerMiddle/02.png" alt class="page">
      <img src="./../assets/img/question_detail/centerMiddle/03.png" alt class="page">
      <img src="./../assets/img/question_detail/centerMiddle/04.png" alt class="page">
      <img src="./../assets/img/question_detail/centerMiddle/05.png" alt class="page">
      <img src="./../assets/img/question_detail/centerMiddle/06.png" alt class="page">
    </div>
    <!-- <div class="bottom_pay_bar" :style="{paddingBottom:isIphonex?'10px':'0px'}">
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
    </div>-->
    <div class="section_pay" :style="{paddingBottom:isIphonex?'20px':'10px'}">
      <div class="left">
        <div class="left_top">
          <span class="pay_label">限时特价</span>
          <span class="money_icon">¥</span>
          <span class="price_num">{{courseInfo.price/100}}</span>
          <span class="old_price_num">{{courseInfo.old_price/100}}</span>
        </div>
        <div class="left_bottom">{{courseInfo.user_count}}人参加</div>
      </div>
      <div class="right" @click="toPay">立即购买</div>
    </div>
  </div>
</template>
<script>
import { isIphonex, getQueryVariable } from "../utils/util.js";
let img1 = require("./../assets/img/question_detail/yl.png");
let img2 = require("./../assets/img/question_detail/le.png");
let img3 = require("./../assets/img/question_detail/sc.png");
let img4 = require("./../assets/img/question_detail/cs.png");
let img5 = require("./../assets/img/question_detail/yx.png");

export default {
  data() {
    return {
      catalogImg: [img1, img2, img3, img4, img5],
      catalog: [],
      isIphonex: false,
      courseInfo: {
        goodsId: getQueryVariable("goodsId"),
        name: decodeURI(getQueryVariable("name")),
        user_count: getQueryVariable("user_count"),
        price: getQueryVariable("price"),
        old_price: getQueryVariable("old_price"),
        good_img: ""
      },
      musicTheoryShow: false,
      countryThreeShow: false,
      centerMiddleShow: false,
      otherBankShow: false
    };
  },
  created() {
    //document.documentElement.style.fontSize = (16 / 375) * 100 + "vw";
    this.isIphonex = isIphonex();
    this.showQuestionBank();
    this.showCatalog();
    this.getBankInfo();
  },
  methods: {
    getBankInfo() {
      this.axios
        .get(
          `http://58.87.125.111:55555/v1/goods/detail?id=${getQueryVariable(
            "goodsId"
          )}`
        )
        .then(res => {
          const good_img = res.data.good_img;
          this.courseInfo.good_img = res.data.good_img;
          localStorage.setItem("good_img", good_img);
        });
    },
    showQuestionBank() {
      const QuestionBankName = decodeURIComponent(getQueryVariable("name"));
      console.log(QuestionBankName);
      //中国音乐学院基本乐科 1 级-专家版
      //中国音乐学院基本乐科 2 级-专家版
      //中国音乐学院基本乐科 3 级-专家版 countryThreeShow
      //中央音乐学院音基考级(初)-专家版
      //中央音乐学院基本乐科中级 ？ centerMiddleShow
      //趣味乐理初级题库 musicTheoryShow
      //趣味乐理中级题库 musicTheoryShow
      if (
        QuestionBankName === "中国音乐学院基本乐科 1 级-专家版" ||
        QuestionBankName === "中国音乐学院基本乐科 2 级-专家版" ||
        QuestionBankName === "中央音乐学院音基考级(初)-专家版"
      ) {
        this.otherBankShow = true;
      }
      if (
        QuestionBankName === "趣味乐理初级题库" ||
        QuestionBankName === "趣味乐理中级题库"
      ) {
        this.musicTheoryShow = true;
      }
      if (QuestionBankName.indexOf("中国音乐学院基本乐科 3 级-专家版") !== -1) {
        console.log("---");
        this.countryThreeShow = true;
      }
      if (QuestionBankName.indexOf("中央音乐学院音基考级(中)") !== -1) {
        this.centerMiddleShow = true;
      }
    },
    showCatalog() {
      if (this.musicTheoryShow) {
        this.catalog = [
          {
            title: "乐理",
            content: ["时值计算", "符号识别", "五线谱", "音高识别"]
          },
          {
            title: "练耳",
            content: [
              "听辨音的属性",
              "听辨音高",
              "听辨音乐符号",
              "听辨节奏",
              "音乐创作"
            ]
          },
          {
            title: "节奏",
            content: ["节奏敲击", "敲击单位拍", ""]
          },
          {
            title: "视唱",
            content: ["模唱", "视唱", "音的强弱"]
          }
        ];
      } else {
        this.catalog = [
          {
            title: "乐理",
            content: ["符号识别", "音符时值", "音高识别", "音程识别"]
          },
          {
            title: "练耳",
            content: [
              "单位拍练习",
              "时值比较",
              "音高比较",
              "拍号听辩",
              "节奏听辩",
              "旋律听辩",
              "音程听辩",
              "符号听辩"
            ]
          },
          {
            title: "视唱",
            content: ["模唱练习", "二十条指定视唱+8条补充"]
          },
          {
            title: "常识",
            content: [
              "穿越键盘星球",
              "弦乐星球1号",
              "弦乐星球2号",
              "吹奏乐星球1号",
              "吹奏乐星球2号",
              "打击乐星球",
              "西方音乐家星球",
              "中国音乐家星球",
              ""
            ]
          },
          {
            title: "游戏化互动",
            content: [
              "音符天平",
              "音程小鸟",
              "打乌鸦认音",
              "音高柱子",
              "小鸟模唱",
              "......"
            ]
          }
        ];
      }
    },
    toPay() {
      localStorage.setItem("courseInfo", JSON.stringify(this.courseInfo));
      if (process.env === "production") {
        this.callApp();
      }
      location.href = this.getPayUrl();
      //this.$router.push("/");
      // this.$router.push({
      //   name: "QuestionBankPay"
      // });
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
    getPayUrl() {
      let params = {
        share_channel: getQueryVariable("share_channel"),
        address: getQueryVariable("address"),
        phone: getQueryVariable("phone"),
        uid: getQueryVariable("uid"),
        token: getQueryVariable("token"),
        coupon_id: getQueryVariable("coupon_id"),
        goodsId: this.courseInfo.goodsId,
        good_img: this.courseInfo.good_img,
        name: this.courseInfo.name,
        user_count: this.courseInfo.user_count,
        price: this.courseInfo.price,
        old_price: this.courseInfo.old_price,
        hasParam: true,
        t: Date.now()
      };

      var str = "";
      for (var key in params) {
        str += `${key}=${params[key]}&`;
      }
      str += `&node=vertical`;
      if (process.env === "production") {
        this.callApp();
      }
      if (process.env.NODE_ENV === "development") {
        var host = "http://192.168.2.25:8090";
      } else {
        var host =
          "http://cdn.kids.immusician.com/web/music-base-h5/index.html";
      }
      this.toPayUrl = `${host}?${str}#/`;
      //return;
      return this.toPayUrl;
    }
  }
};
</script>
<style lang="less" scoped>
.section_pay {
  z-index: 999;
  background-color: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  //height: 120px;
  padding: 20px 32px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px -4px 16px 0px rgba(0, 0, 0, 0.05);
  .left {
    flex-grow: 1;
    .left_top {
      .pay_label {
        font-size: 28px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .money_icon {
        margin-right: -3px;
        font-size: 24px;
        font-family: PingFang-SC-Medium;
        font-weight: 400;
        color: rgba(255, 38, 38, 1);
      }
      .price_num {
        font-size: 40px;
        font-family: PingFang-SC-Medium;
        font-weight: 500;
        color: rgba(255, 38, 38, 1);
      }
      .old_price_num {
        font-size: 28px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(204, 204, 204, 1);
        text-decoration: line-through;
      }
    }
    .left_bottom {
      font-size: 24px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
  }
  .right {
    flex-grow: 0;
    width: 240px;
    height: 80px;
    background-color: #ff742b;
    line-height: 80px;
    text-align: center;
    font-size: 36px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    border-radius: 40px;
  }
}
#musicTheory img.page,
#countryThree img.page,
#centerMiddle img.page {
  width: 100%;
}
.question_detail_wrapper {
  margin-bottom: 100px;
}
.banner {
  img {
    width: 100%;
  }
}
.section {
  margin-bottom: 80px;
  text-align: center;
  .title {
    margin-top: 70px;
    margin-bottom: 70px;
    img {
      width: 234px;
    }
  }
  .box {
    position: relative;
    width: 92%;
    padding: 100px 0;
    margin: 0 auto;
    margin-bottom: 80px;
    background-color: #fff;
    box-shadow: 0px 6px 20px 0px rgba(255, 106, 63, 0.3);
    border-radius: 40px;
    text-align: center;
    .subtitle {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -42px;
      img {
        width: 520px;
      }
    }
  }
  .box.sec1 {
    .box_sec {
      margin-bottom: 60px;
      max-width: 90%;
      margin: 0 auto 60px auto;
      .sec_img {
        width: 590px;
        margin-bottom: 30px;
      }
      .title1 {
        margin-bottom: 14px;
        font-size: 28px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(75, 75, 75, 1);
      }
      .title2 {
        font-size: 26px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(75, 75, 75, 1);
      }
    }
  }
  .box.sec3 {
    .box_sec {
      margin-bottom: 50px;
      .sec_img {
        width: 100px;
      }
      .title {
        margin: 16px 0 20px 0;
        font-size: 28px;
        font-family: PingFangSC-Semibold;
        font-weight: 600;
        color: rgba(75, 75, 75, 1);
      }
      .content {
        //display: flex;
        //flex-wrap: wrap;
        //justify-content: space-around;
        text-align: center;
        font-size: 0;
        .item {
          display: inline-block;
          //margin-right: 1em;
          font-size: 26px;
          font-family: PingFangSC-Regular;
          font-weight: 400;
          color: rgba(75, 75, 75, 1);
        }
      }
      .content0 .item,
      .content1 .item {
        width: 23%;
      }
      .content2 .item {
        //width: 46%;
        margin-right: 1em;
      }
      .content3 .item {
        width: 31%;
        text-align: left;
      }
      .content4 .item {
        width: 31%;
        text-align: left;
      }
      .content4 .item:last-child span {
        display: none;
      }
    }
  }
  .box.feature {
    box-sizing: border-box;
    width: 92%;
    background: url("../assets/img/question_detail/feature_bg.png") no-repeat
      center/cover;
    position: relative;
    padding-left: 50px;
    .red_title {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: -24px;
      width: 260px;
      height: 50px;
      line-height: 50px;
      text-align: center;
      color: #fff;
      font-size: 28px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      border-radius: 50px;
      background: linear-gradient(
        -90deg,
        rgba(255, 162, 72, 1),
        rgba(255, 106, 63, 1)
      );
    }
    text-align: left;
    font-size: 26px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(75, 75, 75, 1);
  }
}
.sec4 {
  position: relative;
  text-align: center;
  img.content {
    width: 750px;
  }
  .qrarea {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 34%;
    img {
      width: 300px;
    }
    font-size: 28px;
    font-family: PingFang-SC-Medium;
    font-weight: 500;
    color: rgba(0, 0, 0, 1);
  }
}
.teacher_sec {
  width: 690px;
}
.bottom_pay_bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100px;
  display: flex;
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.2);
  z-index: 1999;
  background-color: #fff;
  .bar_main {
    //display: flex;
    flex-direction: column;
    //justify-content: center;
    background-color: #fff;
    flex-grow: 0;
    width: 61%;
    padding: 0px 14px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .bar_main_top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .course_title {
        flex-grow: 0;
        font-family: PingFangSC-Regular;
        font-size: 26px;
        color: #333333;
        //line-height: 26px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        //width: 76%;
        margin-right: 4px;
      }
      .origin_price {
        font-family: PingFangSC-Regular;
        font-size: 22px;
        color: #999999;
        text-decoration: line-through;
      }
    }
    .bar_main_bottom {
      display: flex;
      align-items: center;
      font-size: 22px;
      .buy_num {
        flex-grow: 1;
        font-size: 22px;
        color: #999999;
      }
      .now_price {
        .text {
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
.red {
  color: #ff6a3f;
}
</style>


