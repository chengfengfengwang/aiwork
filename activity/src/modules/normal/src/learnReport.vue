<template>
  <div class="page">
    <div class="top">
      <img src="../../../assets/img/normal/learnReport/logo.png" alt class="logo">
      <div class="share" @click="share" v-show="openInApp">
        <img src="../../../assets/img/normal/learnReport/share.png" alt>
        <span>分享</span>
      </div>
    </div>
    <div class="bottom">
      <div class="person_box">
        <div class="new_avator">
          <img src="../../../assets/img/normal/learnReport/a_bottom.png" alt class="a_bottom">
          <img src="../../../assets/img/normal/learnReport/a_left.png" alt class="a_left">
          <img src="../../../assets/img/normal/learnReport/a_right.png" alt class="a_right">
          <!-- <img src="../../../assets/img/normal/learnReport/a_outline.jpg" alt class="out_line"> -->
          <img :src="reportInfo.avatar_url" alt class="a_main">
          <span class="user_title">{{reportInfo.nickname}}小朋友</span>
        </div>
        <img src="../../../assets/img/normal/learnReport/zhuhe.png" alt class="zhuhe">
        <img src="../../../assets/img/normal/learnReport/person_box.png" alt class="person_box_bg">
        <div class="person_box_content">
          <div class="bz">本周获得</div>
          <div class="title_name">{{reportInfo.title}}</div>
          <div class="learn_detail">
            <div class="left">
              <div class="common_text">在音乐壳坚持学习</div>
              <div>
                <span class="day_num">{{reportInfo.week_study}}</span>
                <span class="day">分</span>
              </div>
            </div>
            <div class="right">
              <div class="common_text">已经超过同学</div>
              <div class="person">{{reportInfo.ranking}}%</div>
            </div>
          </div>
        </div>
      </div>
      <div class="box performance" v-if="showCanvas">
        <div class="title_img">
          <span class="text">本周表现</span>
          <img src="../../../assets/img/normal/learnReport/class_note1.jpg" alt>
        </div>
        <div id="eContainer" class="canvas_wrapper"></div>
      </div>
      <div class="box k_points" v-if="knowledgePoints.length>0">
        <div class="dot dot1"></div>
        <div class="dot dot2"></div>
        <div class="dot dot3"></div>
        <div class="dot dot4"></div>
        <div class="title_img">
          <span class="text">课堂知识点</span>
          <img src="../../../assets/img/normal/learnReport/class_note2.jpg" alt>
        </div>
        <div class="ring_box">
          <!-- <div class="point point1">知识点1</div>
          <div class="point point2">知识点2</div>
          <div class="point point3">知识点3</div>
          <div class="point point4">知识点4</div>
          <div class="point point5">知识点5</div>
          <div class="point point6">知识点6</div>-->
          <div
            v-for="(point,index) in knowledgePoints"
            :key="index"
            class="point"
            :class="['point'+(index+1)]"
          >{{point}}</div>
          <div class="ring ring1"></div>
          <div class="ring ring2"></div>
          <div class="ring ring3"></div>
          <img src="../../../assets/img/normal/learnReport/coco.png" alt class="coco">
        </div>
      </div>
      <!-- <div class="box homework">
        <div class="title_img">
          <span class="text">课后作业</span>
          <img src="../../../assets/img/normal/learnReport/class_note1.jpg" alt>
        </div>
        <div class="homework_content">
          <p>
            请家长朋友帮助
            <span style="color:#FF742A">{{reportInfo.nickname}}宝贝</span> 课后登录音乐壳教室；
          </p>
          <p v-show="reportInfo.class_video!=''">
            完成
            <span style="color:#FF742A">{{reportInfo.lesson_name_num}}</span>随堂视频
            <span style="color:#FF742A">{{reportInfo.class_video}}</span> 的学习；
          </p>
          <p>完成{{reportInfo.lesson_name_num}}课后的所有练习作业。</p>
        </div>
      </div>-->
      <div class="box road">
        <div class="title_img">
          <span class="text">累计学习</span>
          <img src="../../../assets/img/normal/learnReport/class_note2.jpg" alt>
        </div>
        <div>
          <p>累计学习时长</p>
          <div class="value">
            <span class="num">
              <span>{{reportInfo.total_study}}</span>
              <span class="f_label fenzhong">分钟</span>
            </span>
          </div>
          <p>累计学习知识点</p>
          <div class="value">
            <span class="num">
              <span>{{reportInfo.knowledge_total_count}}</span>
              <span class="f_label ge">个</span>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <img src="../../../assets/img/normal/learnReport/footer_wave.png" alt>
    </div>
  </div>
</template>
<script>
import {
  getQueryVariable,
  formatTime,
  formatOnlyTime,
  getDate,
  platForm,
  openInApp
} from "../../../common/util.js";
const echarts = require("echarts");

export default {
  data() {
    return {
      openInApp,
      echartsData: [5, 3, 2, 3, 4, 3],
      reportInfo: {},
      showCanvas: true,
      startAngle: 90,
      radius: "65%"
    };
  },
  computed: {
    learnTime() {
      return {
        date: getDate(this.reportInfo.start_time),
        startTime: formatOnlyTime(this.reportInfo.start_time),
        endTime: formatOnlyTime(this.reportInfo.end_time)
      };
    },
    totalMinuts() {
      if (this.reportInfo.total_duration) {
        return parseInt(this.reportInfo.total_duration / 60);
      } else {
        return 0;
      }
    },
    knowledgePoints() {
      if (this.reportInfo.knowledge_list) {
        return this.reportInfo.knowledge_list;
      } else {
        return [];
      }
    }
  },
  created() {
    this.getReport();
  },
  mounted() {
    //this.initCanvas();
  },
  methods: {
    //http://192.168.1.85:5556/learnReport?course_id=43&lesson_id=519&uid=46&token=GOD#/
    share(num) {
      var myShareUrl = location.href;

      if (platForm == "IOS") {
        console.log("--------------");
        console.log(webkit.messageHandlers.Share.postMessage);
        console.log(num);
        webkit.messageHandlers.Share.postMessage({
          title: "0元享VIP会员",
          content: myShareUrl,
          mode: 0,
          type: num
        });
      } else {
        console.log("--------------");
        PayFeedBack.shareUrl(myShareUrl);
        //PayFeedBack.shareUrl(myShareUrl, 0, num, "0元享VIP会员");
      }
    },
    formatCanvasData() {
      if (this.reportInfo && this.reportInfo.star_list) {
        const sourceData = this.reportInfo.star_list;
        this.echartsData = sourceData.map(e => Number(e.value));
        this.echartsIndicator = sourceData.map(e => {
          return {
            name: e.key,
            max: 100
          };
        });
        // this.echartsData = [20, 30, 40, 50];
        // this.echartsIndicator = [
        //   { name: "我会听", max: 100 },
        //   { name: "我会认", max: 100 },
        //   { name: "我会弹", max: 100 },
        //   { name: "AI舞台秀", max: 100 }
        // ];
        if (this.echartsData.length == 4) {
          this.startAngle = 45;
          this.radius = "75%";
        }
      }
    },
    initCanvas() {
      var myChart = echarts.init(document.getElementById("eContainer"));
      var option = {
        tooltip: {},
        radar: {
          // shape: 'circle',
          center: ["50%", "50%"], //圆心在画布中的位置
          radius: this.radius, //外半径长度
          startAngle: this.startAngle, //旋转雷达图
          nameGap: 8,
          name: {
            //雷达图每个指示器名称的配置项
            show: true, //是否展示各项名字
            color: "#333333", //文字的颜色
            //fontWeight: "bolder", //字重
            fontFamily: "PingFang-SC-Regular", //字体
            fontSize: "14", //字体大小
            fontWeight: 500,
            backgroundColor: "#000", //背景色
            padding: [5, 5, 5, 5], //内边距
            splitNumber: 3,
            textStyle: {
              color: "#333333", //字体颜色
              backgroundColor: "#fff"
            }
          },
          axisLine: {
            show: false //是否显示坐标轴轴线
          },

          splitArea: {
            show: false //是否显示分隔区域
          },
          // indicator: [
          //   //{ name: "音乐感受力", max: 5, color: "#333" },
          //   { name: "音乐感受力", max: 5 },
          //   { name: "音乐听觉", max: 5 },
          //   { name: "音乐记忆", max: 5 },
          //   { name: "单位拍的稳定性", max: 5 },
          //   { name: "音乐常识", max: 5 },
          // ]
          indicator: this.echartsIndicator
        },
        series: [
          {
            name: "",
            type: "radar",
            symbol: "circle",
            symbolSize: 6,
            areaStyle: {
              color: "#6ACF67"
            },
            itemStyle: {
              //折线拐点标志的样式
              borderWidth: 2,
              color: "#6ACF67"
            },
            data: [
              {
                value: this.echartsData,
                name: "",
                lineStyle: {
                  normal: {
                    width: 2
                  }
                }
              }
            ]
          }
        ]
      };
      myChart.setOption(option);
    },
    getReport() {
      const courseId = getQueryVariable("course_id");
      const lessonId = getQueryVariable("lesson_id");
      this.axios
        .get(
          `${process.env.VUE_APP_JINKANG}/v1/students/week_report/?god=197`
          // {
          //   headers: {
          //     uid: getQueryVariable("uid"),
          //     token: getQueryVariable("token")
          //   }
          // }
        )
        .then(res => {
          this.reportInfo = res.data;
          //14234
          if (
            this.reportInfo.star_list &&
            this.reportInfo.star_list.length > 0
          ) {
            this.showCanvas = true;
            this.formatCanvasData();
            this.initCanvas();
          } else {
            this.showCanvas = false;
          }
        });
    }
  }
};
</script>
<style lang="less">
@import url("./../../../common/common.less");
@main_color: #4ed162;
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
html,
body {
  width: 100%;
  height: 100%;
}
.page {
  * {
    box-sizing: border-box;
  }
  background: url("../../../assets/img/normal/learnReport/top_bg.png") top
    center / 375px no-repeat;
}
.top {
  border-top: 1px solid transparent;
  height: 227px;
  // background: url("./../../../assets/img/normal/learnReport/top_bg.png")
  //   no-repeat top center/cover;
  .logo {
    position: absolute;
    left: 20px;
    top: 10px;
    width: 90px;
  }
  .share {
    position: absolute;
    right: 0;
    top: 10px;
    background-color: #ffd70e;
    display: flex;
    align-items: center;
    padding: 6px 16px;
    font-size: 18px;
    font-family: PingFang-SC-Semibold, PingFang-SC;
    font-weight: 600;
    color: rgba(255, 99, 40, 1);
    border-radius: 35px 0 0 35px;
    img {
      width: 20px;
    }
  }

  .lesson {
    margin: 15px 0 3px 0;
    text-align: center;
    font-size: 28px;
    font-family: PingFang-SC-Semibold, PingFang-SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
  .learn_time {
    padding: 3px 0;
    background: url(../../../assets/img/normal/learnReport/learn_time.png)
      no-repeat center/240px 30px;
    text-align: center;
    font-size: 14px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
  }
}
.bottom {
  background-color: @main_color;
  padding: 0 20px;
  border-bottom: 1px solid transparent;
  .person_box {
    position: relative;
    margin: 0 auto 15px auto;
    //width: 365px;
    height: 210px;
    .person_box_bg {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 210px;
    }
    .zhuhe{
      position: absolute;
      z-index: 2;
      top:-160px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
    }
    .new_avator {
      position: absolute;
      z-index: 2;
      left: 50%;
      transform: translateX(-50%);
      top: 41px;
      width: 200px;
      //height: 200px;
      .a_bottom,
      .a_left,
      .a_right,
      .a_main {
        position: absolute;
      }
      .a_bottom {
        bottom: 0;
        left: 0;
        width: 200px;
        height: 54px;
        z-index: 5;
      }
      .a_left {
        left: 15px;
        bottom: 0px;
        width: 100px;
        z-index: 4;
      }
      .a_right {
        right: -22px;
        bottom: -28px;
        width: 120px;
      }
      .a_main {
        z-index: 4;
        left: 50%;
        transform: translateX(-50%);
        bottom: 35px;
        width: 100px;
        border-radius: 50%;
        border: 6px solid #edfaef;
      }
      .out_line {
        z-index: 2;
        position: relative;
        width: 100%;
      }
      .user_title {
        position: absolute;
        bottom: 23px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 6;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(255, 232, 65, 1);
      }
    }
    .person_box_content {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 35px;
      width: 80%;
      text-align: center;
      .bz {
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .title_name {
        display: inline-block;
        padding: 0 5px;
        margin-bottom: 10px;
        position: relative;
        font-size: 25px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 157, 32, 1);
        &::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: rgba(255, 157, 32, 1);
        }
      }
      .name {
        margin-bottom: 15px;
        font-size: 16px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(255, 157, 32, 1);
      }
      .learn_detail {
        display: flex;
      }
      .left,
      .right {
        .common_text {
          font-size: 14px;
          font-family: PingFang-SC-Regular, PingFang-SC;
          font-weight: 400;
          color: rgba(51, 51, 51, 1);
        }
        padding: 10px 0;
        border-radius: 10px;
        flex-grow: 1;
        background-color: #f8f8f8;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 97, 31, 1);
      }
      .left {
        margin-right: 10px;
        .day_num {
          font-size: 28px;
        }
        .day {
          font-size: 28px;
        }
      }
      .right {
        .person {
          font-size: 28px;
        }
      }
    }
  }
  .box {
    position: relative;
    margin: 0 auto 25px auto;
    padding: 45px 20px 20px 20px;
    background-color: #fff;
    border: 8px solid #a2ea76;
    border-radius: 15px;
    //width: 350px;
    font-size: 14px;
    font-family: PingFang-SC-Regular, PingFang-SC;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
    .title_img {
      position: absolute;
      width: 167px;
      height: 45px;
      left: 50%;
      transform: translateX(-50%);
      top: -26px;
      padding-top: 13px;
      text-align: center;
      font-size: 18px;
      font-family: PingFang-SC-Semibold, PingFang-SC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
      //background: url(../../../assets/img/normal/learnReport/class_note1.jpg) no-repeat center/cover;
      .text {
        position: relative;
        z-index: 2;
        //margin-top:10px;
      }
      img {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
      }
    }
  }
  .box.performance {
    #eContainer {
      height: 200px;
    }
  }
  .box.k_points {
    padding: 30px 20px 40px 20px;
    height: 330px;
    position: relative;
    .dot {
      position: absolute;
      background-color: #ffcd2b;
      //background-color: #000;
      border-radius: 50%;
      z-index: 7;
    }
    .dot1 {
      width: 4px;
      height: 4px;
      left: 133px;
      top: 91px;
    }
    .dot2 {
      width: 6px;
      height: 6px;
      right: 95px;
      top: 129px;
    }
    .dot3 {
      width: 6px;
      height: 6px;
      left: 114px;
      bottom: 78px;
    }
    .dot4 {
      width: 4px;
      height: 4px;
      right: 70px;
      bottom: 129px;
    }
    .ring_box {
      position: absolute;
      width: 200px;
      height: 200px;
      left: 50%;
      transform: translateX(-50%);
      top: 70px;
    }
    .point {
      //min-width: 80px;
      max-width: 160px;
      padding: 4px 12px;
      //height: 24px;
      //line-height: 24px;
      //text-align: center;
      border-radius: 12px;
      background-color: #fdb3d9;
      font-size: 14px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      z-index: 6;
      position: absolute;
    }
    .point1 {
      left: -39px;
      top: 36px;
      background-color: #fdb3d9;
    }
    .point2 {
      right: -39px;
      top: 20px;
      background-color: #ffb047;
    }
    .point3 {
      left: -60px;
      top: 106px;
      background-color: #90cfff;
    }
    .point4 {
      right: -42px;
      top: 149px;
      background-color: #aea3ff;
    }
    .point5 {
      left: 62px;
      top: -19px;
      background-color: #ff9e5b;
    }
    .point6 {
      left: 10px;
      bottom: -7px;
      background-color: #6acf67;
    }
    .ring {
      border-radius: 50%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .coco {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
      width: 90px;
      z-index: 4;
    }
    .ring1 {
      width: 130px;
      height: 130px;
      background-color: #ffd66b;
      z-index: 3;
    }
    .ring2 {
      width: 164px;
      height: 164px;
      background-color: #fff5e2;
      z-index: 2;
    }
    .ring3 {
      width: 200px;
      height: 200px;
      background-color: #fffaf0;
      z-index: 1;
    }
  }
  .box.homework {
    .homework_content > p {
      margin-bottom: 5px;
    }
  }
  .box.road {
    text-align: center;
    .value {
      margin-bottom: 20px;
      font-size: 14px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      .num {
        position: relative;
        font-size: 36px;
        font-family: SFUIDisplay-Bold, SFUIDisplay;
        font-weight: bold;
        color: rgba(255, 97, 31, 1);
        // &::after {
        //   content: "分钟";
        //   font-size: 14px;
        //   font-family: PingFangSC-Regular, PingFang SC;
        //   font-weight: 400;
        //   color: rgba(153, 153, 153, 1);
        // }
      }
      .f_label {
        position: absolute;
        right: -20px;
        bottom: 10px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .f_label.fenzhong {
        right: -32px;
      }
    }
  }
}
.footer {
  background-color: @main_color;
  font-size: 0;
  img {
    width: 100%;
  }
}
</style>

