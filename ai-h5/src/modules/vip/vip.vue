<template>
  <div id="vip" :style="{paddingTop:isIphonex?'78px':'58px'}">
    <Loading v-show="loadingShow"/>
    <div v-show="true" :style="{paddingTop:isIphonex?'20px':'0px'}" class="menu_wrapper">
      <div :class="'top_menu'+menuArr.length" class="top_menu">
        <div
          v-for="(menu,idx) in menuArr"
          :key="idx"
          :class="{active:curIndex==idx}"
          class="top_menu_item"
          @click="changeTeacher(idx)"
        >{{menu.name}}</div>
      </div>
    </div>
    <div v-if="instrument_type==0 && curIndex==0" class="guitar_n7">
      <div class="top">
        <div class="banner">
          <img src="../../assets/img/vip/banner.png" alt>
          <img src="../../assets/img/vip/banner_text.png" alt class="banner_text">
        </div>
        <div class="feater_box">
          <div class="item">
            <img src="../../assets/img/vip/f1.png" alt>
            <div>专属超值课程</div>
          </div>
          <div class="item">
            <img src="../../assets/img/vip/f2.png" alt>
            <div>折扣券</div>
          </div>
          <div class="item">
            <img src="../../assets/img/vip/f3.png" alt>
            <div>双师辅导</div>
          </div>
          <div class="item">
            <img src="../../assets/img/vip/f4.png" alt>
            <div>每月抽奖资格</div>
          </div>
        </div>
        <div class="lesson">
          <div class="gift">购买会员解锁课程</div>
          <div class="title">·{{gift.title}}·</div>
          <div class="price">原价 {{gift.price/100}}元（48小时内购买即送！）</div>
        </div>
      </div>
      <div class="main">
        <div class="card">
          <div class="title">
            <div class="sub_title">AI音乐学院</div>
            <div class="main_title">超值吉他会员卡</div>
          </div>
          <div class="card_img">
            <img src="../../assets/img/vip/card.png" alt>
          </div>
          <div class="card_content">
            <div class="item">
              <span>价值</span>
              <span class="n">{{gift.price/100}}</span>
              <span>元的</span>
              <span class="n">{{gift.title}}</span>
            </div>
            <div class="item">
              <span>吉他全品类课程</span>
              <span class="n">6折优惠</span>
            </div>
            <div class="item">
              <span>乐器</span>
              <span class="n">优惠内购</span>资格
              <span class="s">(雅马哈，卡马等知名品牌会员价)</span>
            </div>
            <div class="item">
              <span>会员专属每月</span>
              <span class="n">抽奖</span>
            </div>
          </div>
        </div>
        <div class="v v1">
          <div class="header">会员特权一</div>
          <div class="v_main">
            <div class="title">N7老师进阶课程</div>
            <!-- <div class="length">
              <div class="line"></div>
              <div class="length_content">20节课 | 18节课后练习</div>
            </div>-->
            <div class="lesson_content">
              <div>你将学会：</div>
              <div>1.掌握吉他扫弦、横按技巧，为之后学习高阶技巧做好准备</div>
              <div>2.学习吉他相关乐理知识，随时随地都能快速识谱演奏</div>
              <div>3.学习7个吉他必备和弦，均衡左右手演奏，搞定吉他曲谱库70%歌曲</div>
            </div>
          </div>
        </div>
        <div class="v v2">
          <div class="header">会员特权二</div>
          <div class="v_main">
            <div class="title">吉他全品类课程</div>
            <div class="length">
              <div class="line"></div>
              <div class="length_content">尽享6折优惠</div>
            </div>
            <div class="dis_list">
              <div class="item">
                <img src="../../assets/img/vip/course1.jpeg" alt class="cover">
                <div>
                  <div class="dis_title">N7老师乐理+乐理进阶</div>
                  <div class="dis_price">
                    <span class="common">原价：116</span>
                    <span class="red">6折价：69.6</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <img src="../../assets/img/vip/course2.jpeg" alt class="cover">
                <div>
                  <div class="dis_title">N7老师和弦转化课</div>
                  <div class="dis_price">
                    <span class="common">原价：47</span>
                    <span class="red">6折价：28.2</span>
                  </div>
                </div>
              </div>
              <div class="item">
                <img src="../../assets/img/vip/course3.jpeg" alt class="cover">
                <div>
                  <div class="dis_title">N7老师扒谱课</div>
                  <div class="dis_price">
                    <span class="common">原价：85</span>
                    <span class="red">6折价：51</span>
                  </div>
                </div>
              </div>
              <div class="dot_list"></div>
            </div>
          </div>
        </div>
        <div class="v v3">
          <div class="header">会员特权三</div>
          <img src="../../assets/img/vip/v3.png" alt>
          <!-- <img src="../../assets/img/vip/v3.jpeg" alt> -->
        </div>
        <div class="v v4">
          <div class="header">会员特权四</div>
          <img src="../../assets/img/vip/v4.jpeg" alt>
        </div>
        <div class="v v5">
          <img src="../../assets/img/vip/v5.jpeg" alt>
        </div>
      </div>
    </div>
    <div v-if="instrument_type==0 && curIndex==1" class="guitar_liushuqi">
      <img src="./../../assets/img/vip/guitar_l1.png" alt>
      <img src="./../../assets/img/vip/guitar_l2.jpeg" alt>
      <img src="./../../assets/img/vip/guitar_l3.jpg" alt>
      <img src="./../../assets/img/vip/guitar_l4.jpg" alt>
      <img src="./../../assets/img/vip/guitar_l5.jpg" alt>
      <img src="./../../assets/img/vip/guitar_l6.jpg" alt>
    </div>
    <div v-if="instrument_type==1 && curIndex==0" class="ukulele_xiaotao">
      <img src="./../../assets/img/vip/ukulele_xt_1.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_2.png" alt>
      <img src="./../../assets/img/vip/ukulele_xt_3.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_4.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_5.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_6.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_7.jpg" alt>
    </div>
    <div v-if="instrument_type==1 && curIndex==1" class="ukulele_xiaotao_tc">
      <img src="./../../assets/img/vip/ukulele_xt_tc1.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_tc2.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_tc3.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_tc4.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_tc5.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_tc6.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_tc7.jpg" alt>
    </div>
    <div v-if="instrument_type==1 && curIndex==2" class="ukulele_xiaotao_zt">
      <img src="./../../assets/img/vip/ukulele_xt_zt1.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_zt2.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_zt3.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_zt4.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_zt5.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_zt6.jpg" alt>
      <img src="./../../assets/img/vip/ukulele_xt_zt7.jpg" alt>
    </div>
    <div class="bottom_pay_bar" :style="{paddingBottom:isIphonex?'20px':'0px'}">
      <div class="bar_main">
        <div class="bar_main_top">
          <div class="course_title">{{vipName}}</div>
          <div class="origin_price">
            <span>原价：</span>
            ¥{{originPrice/100}}/年
          </div>
        </div>
        <div class="bar_main_bottom">
          <div class="buy_num"></div>
          <div class="now_price">
            <span class="text">限时特价：</span>
            <span class="num">¥{{price/100}}</span>
            <span>/年</span>
          </div>
        </div>
      </div>
      <div v-show="!haveBuy" class="bar_btn" @click="toPay">成为会员</div>
      <div v-show="haveBuy" class="bar_btn" style="background:#666">已购买</div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import { getQueryVariable } from "../../common/util.js";
import Loading from "../../components/Loading";
import { deflate } from "zlib";
import { Promise } from "q";
export default {
  data() {
    return {
      previewSrc: "",
      price: "",
      toPayUrl: "",
      loadingShow: true,
      gift: {
        name: "",
        price: 0
      },
      isIphonex: false,
      originPrice: "",
      vipName: "",
      instrument_type: 0,
      tuid: 0,
      curName: "",
      haveBuy: false,
      curIndex: 0,
      tuidArr: {
        "0": [
          { tuid: 111834793, name: "柳舒淇老师" },
          { tuid: 239372153, name: "N7老师" }
        ],
        "1": [
          { tuid: 1009562, name: "弹唱VIP" }, // 弹唱小涛
          { tuid: 1009561, name: "指弹VIP" } // 指弹小涛
        ]
      },
      menuArr: []
    };
  },
  components: {
    Loading
  },
  created() {
    var that = this;
    var promise = new Promise((resolve, reject) => {
      this.getTuidArr(resolve);
    });
    promise.then(res => {
      var instrument = getQueryVariable("instrument");
      switch (instrument) {
        case "guitar":
          that.instrument_type = 0;
          break;
        case "ukulele":
          that.instrument_type = 1;
          break;
        default:
          that.instrument_type = 0;
          break;
      }
      that.isIphonex = that.testIsIphonex();
      that.menuArr = that.tuidArr[that.instrument_type];
      that.tuid = that.menuArr[that.curIndex].tuid;
      that.curName = that.menuArr[that.curIndex].name;
      console.log("----zzz");
      console.log(that.tuid);
      that.myVip();
      that.getVipInfo();
    });
  },
  mounted() {},
  methods: {
    getTuidArr(resolve) {
      this.loadingShow = true;
      axios
        .get("http://iguitar.immusician.com:2525/v3/users/vip/show_teacher_ctrl/")
        .then(res => {
          resolve();
          this.loadingShow = false;
          this.tuidArr = res.data.data;
          //测试数据
          // this.tuidArr = {
          //   "0": [
          //     { tuid: 111834793, name: "柳舒淇老师" },
          //     { tuid: 239372153, name: "N7老师" }
          //   ],
          //   "1": [
          //     { tuid: 1009562, name: "弹唱VIP" }, // 弹唱小涛
          //     { tuid: 1009561, name: "指弹VIP" }, // 指弹小涛
          //     { tuid: 1009561, name: "test" } // 指弹小涛
          //   ]
          // };
        });
    },
    changeTeacher(index) {
      this.curIndex = index;
      this.tuid = this.menuArr[this.curIndex].tuid;
      this.curName = this.menuArr[this.curIndex].name;
      this.myVip();
      this.getVipInfo();
    },
    getVipInfo() {
      var share_channel = getQueryVariable("share_channel");
      var phone = getQueryVariable("phone");
      var uid = getQueryVariable("uid");

      // var url = `http://192.168.1.68:22222/v3/users/vip/show_goods_vip/?tuid=${
      //   this.tuid
      // }&instrument=${this.instrument_type}`;
      // var url = `http://58.87.125.111:2525/v3/users/vip/show_goods_vip/?tuid=${
      //   this.tuid
      //  }&instrument=${this.instrument_type}`;
      var url = `http://iguitar.immusician.com:2525/v3/users/vip/show_goods_vip/?tuid=${
        this.tuid
      }&instrument=${this.instrument_type}`;
      axios.get(url).then(res => {
        this.loadingShow = false;
        var res = res.data.data;
        this.gift.title =
          res.course_goods_list.goods[0].title == "N7吉他初级进阶"
            ? "N7吉他进阶课程"
            : res.course_goods_list.goods[0].title;
        this.gift.price = res.course_goods_list.goods[0].sku_list[0].price;
        this.price = res.sku_list[0].price;
        this.originPrice = res.sku_list[0].origin;
        this.vipName = res.Vip_name;
        var t = Date.now();
        //var host = 'http://192.168.1.61:8082';
        var host =
          "http://cdn.kids.immusician.com/web/music-base-h5/index.html";
        //var host = "http://192.168.1.61:8082";
        if (getQueryVariable("qr_mode")) {
          this.toPayUrl = `${host}?vip_name=${res.Vip_name}&price=${
            this.price
          }&goodsId=${
            res._id.$oid
          }&share_channel=${share_channel}&phone=${phone}&uid=${uid}&instrument_type=${
            this.instrument_type
          }&goods_param=${
            res.sku_list[0].name
          }&node=vertical&t=${t}&from=youxuepai#/VipPay`;
        } else {
          this.toPayUrl = `${host}?vip_name=${res.Vip_name}&price=${
            this.price
          }&goodsId=${
            res._id.$oid
          }&share_channel=${share_channel}&phone=${phone}&uid=${uid}&instrument_type=${
            this.instrument_type
          }&goods_param=${res.sku_list[0].name}&node=vertical&t=${t}#/VipPay`;
        }
      });
    },
    //查看自己是否是vip
    myVip() {
      this.loadingShow = true;
      // var url = `http://iguitar.immusician.com:2525/v3/users/vip/feedback/?tel=${getQueryVariable(
      //       "phone"
      //     )}`
      // var url = `http://58.87.125.111:2525/v3/users/vip/feedback/?tel=${getQueryVariable(
      //   "phone"
      // )}`
      var url = `http://iguitar.immusician.com:2525/v3/users/vip/feedback/?tel=${getQueryVariable(
        "phone"
      )}`;
      // console.log('---')
      // console.log(this.instrument_type)
      // console.log(this.tuid)
      console.log(this.instrument_type);
      console.log(this.tuid);
      axios.get(url).then(res => {
        this.loadingShow = false;
        var res = res.data.data;
        var vip_list = res.vip_list;
        if (vip_list && vip_list instanceof Array) {
          for (var i = 0; i < vip_list.length; i++) {
            if (
              vip_list[i].instrument == this.instrument_type &&
              vip_list[i].tuid == this.tuid
            ) {
              this.haveBuy = true;
              break;
            } else {
              this.haveBuy = false;
            }
          }
          // res.vip_list.forEach(e => {
          //   if (e.instrument == this.instrument_type && e.tuid == this.tuid) {
          //     this.haveBuy = true;
          //   } else {
          //     //this.haveBuy = false;
          //   }
          // });
        }
      });
    },
    toPay() {
      if (this.loadingShow) {
        return;
      } else {
        //return
        this.loadingShow = true;
        location.href = this.toPayUrl;
      }
    },
    testIsIphonex() {
      if (typeof window !== "undefined" && window) {
        return (
          /iphone/gi.test(window.navigator.userAgent) &&
          window.screen.height >= 812
        );
      }
      return false;
    }
  }
};
</script>
<style lang="less">
.font-size(@sizeValue:16) {
  @vw: 16 / 375 * 100;
  @result: @sizeValue / 16 * @vw;
  font-size: ~"@{result}vw";
}
html {
  .font-size(16);
}
html {
  @media screen and (max-width: 320px) {
    .font-size(16);
  }
  @media screen and (min-width: 480px) {
    .font-size(13);
  }
}
#vip {
  //width: 70%;
  padding-top: 58px;
  margin: auto;
  background-color: #fff;
}
.top {
  padding-bottom: 40px;
  background-color: #fff;
  border-radius: 0 0 15px 15px;
}
.banner {
  position: relative;
  img {
    width: 100%;
  }
  .banner_text {
    position: absolute;
    left: 50%;
    bottom: 10px;
    transform: translateX(-50%);
    width: 76%;
  }
}
.feater_box {
  width: 90%;
  //margin: 40px auto;
  margin: 25px auto 40px auto;
  //padding-bottom: 50px;
  padding-bottom: 30px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  //font-size: 18px;
  font-size: 12px;
  font-weight: 500;
  color: rgba(42, 33, 13, 1);
  // img {
  //   width: 78px;
  //   margin-bottom: 15px;
  // }
  img {
    width: 44px;
    margin-bottom: 7px;
  }
  border-bottom: 2px solid rgba(213, 213, 213, 1);
}
.lesson {
  position: relative;
  //width: 594px;
  //height: 215px;
  width: 334px;
  height: 120px;
  margin: auto;
  //padding-top: 60px;
  padding-top: 35px;
  background-color: #e2ba68;
  //border-radius: 9px;
  border-radius: 4px;
  text-align: center;
  .title {
    //margin-bottom: 30px;
    margin-bottom: 15px;
    //font-size: 40px;
    font-size: 23px;
    font-weight: bold;
    color: rgba(42, 33, 13, 1);
  }
  .price {
    //font-size: 30px;
    font-size: 17px;
    font-weight: bold;
    color: rgba(186, 52, 44, 1);
  }
  .gift {
    position: absolute;
    left: 0;
    top: -13px;
    width: 150px;
    height: 25px;
    line-height: 25px;
    text-align: left;
    padding-left: 10px;
    border-radius: 0 16px 16px 0;
    background-color: #262626;
    font-size: 14px;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
.card {
  //width: 586px;
  width: 330px;
  margin: auto;
  margin-bottom: 35px;
  //padding: 60px 26px 60px 26px;
  padding: 35px 15px 35px 15px;
  background-color: rgba(229, 229, 229, 1);
  border-radius: 5px;
  .title {
    text-align: center;
    .sub_title {
      //font-size: 33px;
      font-size: 19px;
      font-weight: 400;
      color: rgba(4, 0, 0, 1);
    }
    .main_title {
      //font-size: 52px;
      font-size: 29px;
      font-weight: 400;
      color: rgba(4, 0, 0, 1);
    }
  }
  .card_img {
    width: 100%;
    margin: 30px auto;
    img {
      width: 100%;
    }
  }
  .card_content {
    //font-size: 24px;
    font-size: 14px;
    font-weight: 400;
    color: rgba(4, 2, 3, 1);
    .item {
      //margin-bottom: 20px;
      margin-bottom: 10px;
    }
  }
}
.v {
  //width: 580px;
  width: 326px;
  //margin: 60px auto;
  //margin: 35px auto;
  margin: 0px auto;
  padding: 17px 0;
  //background-color: #174047;
  background-color: #262626;
  .header {
    //padding-left: 20px;
    padding-left: 12px;
    //height: 50px;
    //line-height: 50px;
    height: 27px;
    line-height: 27px;
    background: rgba(230, 205, 132, 1);
    border-radius: 10px 10px 0px 0px;
    //font-size: 32px;
    font-size: 18px;
    font-weight: 600;
    color: rgba(38, 38, 38, 1);
  }
  .v_main {
    position: relative;
    border: 1px solid rgba(230, 205, 132, 1);
    border-radius: 0 0 10px 10px;
    //padding: 40px 20px 40px 20px;
    padding: 25px 7px 25px 7px;
    .title {
      //margin-bottom: 76px;
      margin-bottom: 43px;
      text-align: center;
      //font-size: 42px;
      font-size: 24px;
      font-weight: bold;
      color: rgba(230, 205, 132, 1);
    }
    .length {
      width: 96%;
      position: absolute;
      //top: 128px;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      text-align: center;
      //font-size: 26px;
      font-size: 15px;
      font-weight: 500;
      color: rgba(230, 205, 132, 1);
      .line {
        width: 100%;
        height: 1px;
        top: 50%;
        background-color: #e6cd84;
        opacity: 0.7;
      }
      .length_content {
        width: 53%;
        padding: 0 5px;
        background: #222;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 9;
      }
    }
    .lesson_content {
      //font-size: 21px;
      font-size: 12px;
      //font-weight:bold;
      color: rgba(230, 205, 132, 1);
    }
  }
}
.v1 {
  padding-top: 0;
}
.v2 {
  .length_content {
    //font-size: 42px;
    font-size: 24px;
    color: #b43a34;
    font-weight: bold;
  }
  .title {
    margin-bottom: 70px !important;
  }
  .dis_list {
    width: 70%;
    margin: auto;
    .item {
      //margin: 30px 0;
      margin: 15px 0;
      //height: 80px;
      height: 45px;
      display: flex;
      align-items: center;

      //font-size: 22px;
      font-size: 13px;
      color: rgba(230, 205, 132, 1);
      .cover {
        //width: 80px;
        //height: 80px;
        width: 45px;
        height: 45px;
        border-radius: 3px;
        //margin-right: 20px;
        margin-right: 14px;
      }
      .dis_title {
        //margin-bottom: 10px;
        margin-bottom: 5px;
        //font-size: 22px;
        font-size: 13px;
        font-weight: bold;
        color: rgba(230, 205, 132, 1);
      }
      .dis_price {
        .common {
          text-decoration: line-through;
        }
        .red {
          //margin-left: 30px;
          margin-left: 15px;
          color: #b43a33;
        }
      }
    }
  }
}
.v3,
.v4,
.v5 {
  img {
    width: 100%;
  }
}
.main {
  //background-color: #222;
  padding-bottom: 20px;
  background: url("../../assets/img/vip/bg.png") no-repeat center/100% 100%;
  padding-top: 25px;
}
.n {
  color: #ba342c;
  font-weight: bold;
}
.s {
  font-size: 12px;
  font-weight: bold;
}
.to_pay_wrapper {
  position: fixed;
  display: flex;
  z-index: 888;
  left: 0;
  bottom: 0px;
  width: 100%;
  height: 50px;
  background-color: #e7b35c;
  color: #fff;
  text-align: center;
  font-size: 13px;
  font-family: PingFangSC-Medium;
  font-weight: 500;
  .to_pay_price {
    background-color: #fff;
    color: #333;
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .to_pay {
    width: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    //line-height: 15px;
  }
}
.bottom_pay_bar {
  position: fixed;
  bottom: 0;
  width: 100%;
  //height: 50px;
  display: flex;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, 0.2);
  z-index: 1999;
  background-color: #fff;
  .bar_main {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    background-color: #fff;
    flex-grow: 0;
    width: 61%;
    padding: 3px 7px;
    .bar_main_top {
      padding-left: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .course_title {
        flex-grow: 0;
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #333333;
        line-height: 18px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        //width: 76%;
        width: 110px;
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
/////////
.guitar_liushuqi {
  font-size: 0;
  & > img {
    width: 100%;
  }
}
.ukulele_xiaotao_tc {
  font-size: 0;
  & > img {
    width: 100%;
  }
}
.ukulele_xiaotao_zt {
  font-size: 0;
  & > img {
    width: 100%;
  }
}
.ukulele_xiaotao {
  font-size: 0;
  & > img {
    width: 100%;
  }
}
.menu_wrapper {
  position: fixed;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #fff;
  z-index: 9;
  .top_menu {
    width: 192px;
    height: 30px;
    background: #e9e9e9;
    border-radius: 15px;
    margin: 15px auto 15px auto;
    color: #333;
    display: flex;
    .top_menu_item {
      width: 50%;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      font-family: PingFangSC-Regular;
    }
    .top_menu_item.active {
      background: linear-gradient(
        143deg,
        rgba(96, 89, 243, 1) 0%,
        rgba(210, 62, 231, 1) 100%
      );
      color: #fff;
      border-radius: 15px;
    }
  }
  .top_menu3 {
    width: 280px;
    .top_menu_item {
      font-size: 12px;
    }
    @media screen and (max-width: 320px) {
      .top_menu_item {
        font-size: 10px !important;
      }
    }
  }
}
</style>

