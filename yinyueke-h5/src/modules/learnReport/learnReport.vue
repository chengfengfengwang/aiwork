<template>
  <div>
    <div id="canvasImgWrapper" class="canvas_img_wrapper">
      <div class="header">
        <div class="header_title">学习报告</div>
        <div class="draw_btn" @click="toShare">晒一晒</div>
      </div>
      <div class="main_wrapper">
        <div class="top">
          <div class="left_s">
            <div class="all_status_icon">
              <img
                v-show="learnInfo.one_word==='一般'"
                src="../../assets/img/learnReport/score1.png"
                alt
              >
              <img
                v-show="learnInfo.one_word==='良好'"
                src="../../assets/img/learnReport/score2.png"
                alt
              >
              <img
                v-show="learnInfo.one_word==='优秀'"
                src="../../assets/img/learnReport/score3.png"
                alt
              >
            </div>
            <!-- <div class="all_status">{{learnInfo.one_word}}</div> -->
          </div>
          <div class="right_s">
            <div class="left">
              <img :src="learnInfo.avatar_url" alt class="avatar">
            </div>
            <div class="right">
              <div>
                <span class="user_name">{{learnInfo.username}}</span>
                <span>{{learnInfo.total_study_days}}</span>
              </div>
              <div class="right_ranking">{{learnInfo.ranking}}</div>
            </div>
          </div>
        </div>
        <div class="item_wrapper">
          <div class="item">
            <div class="item_left">
              <div class="item_left_l">
                <img src="../../assets/img/learnReport/time.png" alt>
              </div>
              <div class="item_left_r">
                <!-- <div class="t">
                  <span class="n">{{learnInfo.study_time}}</span>分钟
                </div>
                <div class="b">学习时长</div> -->
                <div class="b">完成最好</div>
              </div>
            </div>
            <div class="item_right">{{learnInfo.study_time_word}}</div>
          </div>
          <div class="item">
            <div class="item_left">
              <div class="item_left_l">
                <img src="../../assets/img/learnReport/game.png" alt>
              </div>
              <div class="item_left_r">
                <div class="t">
                  <span class="n">{{learnInfo.played_count}}</span>次
                </div>
                <div class="b">练习次数</div>
              </div>
            </div>
            <div class="item_right">{{learnInfo.played_count_word}}</div>
          </div>
        </div>
        <div class="love_wrapper">
          <div class="item">
            <div class="item_left">
              <img src="../../assets/img/learnReport/lover.png" alt>
            </div>
            <div class="item_right">{{learnInfo.favorite_score}}</div>
          </div>

          <!-- <div class="right">{{learnInfo.complete_lesson}}{{learnInfo.complete_lesson_word}}</div> -->
        </div>
        <div class="star_wrapper">
          <div v-for="(item,index) in starArr" :key="index" class="star_item">
            <span class="star_title">{{item.type}}</span>
            <img
              v-for="n in item.value"
              :key="n"
              src="./../../assets/img/learnReport/star1.png"
              alt
              class="star"
            >
            <img
              v-for="(m,idx) in (5-item.value)"
              :key="idx"
              src="./../../assets/img/learnReport/star2.png"
              alt
              class="star1"
            >
          </div>
        </div>
        <div class="remark_wrapper">
          <div class="remark_title">老师点评</div>
          <div class="remark_content">{{learnInfo.teacher_comments}}</div>
        </div>
        <div class="main_bottom_wrapper">
          <div class="main_bottom_left">
            <img src="../../assets/img/learnReport/logo.png" alt class="logo">
          </div>
          <div class="main_bottom_right">
            <div class="right_l">
              <div class="t">加入音乐壳</div>
              <div class="b">和我一起跟大师学音乐</div>
            </div>
            <div class="right_r">
              <img src="../../assets/img/learnReport/qr.png" alt class="qr">
            </div>
          </div>
        </div>
      </div>

      <div class="leaf l">
        <img src="../../assets/img/learnReport/leafl.png" alt>
      </div>
      <div class="leaf r">
        <img src="../../assets/img/learnReport/leafr.png" alt>
      </div>
    </div>

    <!-- <div  class="btn_wrapper">
      <div class="btn">晒一晒</div>
    </div>-->
  </div>
</template>
<script>
import { platForm, getQueryVariable } from "../../common/util.js";
import html2canvas from "html2canvas";
export default {
  data() {
    return {
      learnInfo: {},
      starArr: []
    };
  },
  mounted() {
    this.getData();
    console.log()
  },
  methods: {
    toShare(num) {
      this.myPromise
        .then(res => {
          if (platForm == "IOS") {
            console.log("-------ios-------");
            //console.log(webkit.messageHandlers.Share.postMessage);
            webkit.messageHandlers.shareWebImage.postMessage({
              data: res
            });
          } else {
            console.log("------android--------");
            PayFeedBack.shareWebImage(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getData() {
      var url = `http://api.yinji.immusician.com:55555/v1/liveroom/my_report?lesson_id=${getQueryVariable(
        "lessonId"
      )}`;
      this.axios
        .get(url, {
          headers: {
            god: getQueryVariable("uid")
          }
        })
        .then(res => {
          if (res.error === 0) {
            this.learnInfo = res.data;
            this.starArr = res.data.rate_list;
            // var div = document.createElement("div");
            // div.setAttribute("id", "finalEle");
            this.$nextTick(() => {
              this.drawImg();
            });
            // setTimeout(() => {
            //   this.drawImg()
            //   //document.body.appendChild(div);
            // }, 200);
          } else {
            alert(res.msg);
          }
        });
    },
    drawImg() {
      var that = this;
      this.myPromise = new Promise((resolve, reject) => {
        var imgWrapper = document.querySelector("#canvasImgWrapper");
        var width = imgWrapper.offsetWidth * 4;
        var height = imgWrapper.offsetHeight * 4;
        this.imgToBase64(this.learnInfo.avatar_url).then(res => {
          this.avatarBase64 = res;
          this.$set(this.learnInfo, "avatar_url", res);
          this.$nextTick(pa => {
            html2canvas(
              imgWrapper,
              {
                onclone: function(document) {
                  document.querySelector(".draw_btn").style.display = "none";
                }
              },
              {
                backgroundColor: "transparent",
                width: width,
                height: height,
                x: 0,
                y: 0
                //allowTaint: true
              }
            ).then(canvas => {
              var dataUrl = canvas.toDataURL("image/png");
              resolve(dataUrl);
              // var img = new Image();
              // img.classList.add("resultImg");
              // img.src = dataUrl;
              // img.onload = function() {
              //   document.body.appendChild(img);
              // };
            });
          });
        });
      });
      return this.myPromise;
    },
    imgToBase64(url) {
      var url = url + "?" + new Date().valueOf();
      return new Promise((resolve, reject) => {
        var img = new Image();
        img.setAttribute("crossOrigin", "Anonymous");
        img.src = url;
        img.onload = function() {
          var canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          var ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          var base64 = canvas.toDataURL("image/png");
          console.log("------");
          //console.log(base64);
          resolve(base64);
        };
      });
    },
    upload(file) {
      var formdata = new FormData();
      formdata.append("cover", file);
      formdata.append("uid", getQueryVariable("uid"));
      formdata.append("lesson_id", getQueryVariable("lessonId"));
      this.axios
        .post(
          `http://api.yinji.immusician.com:55555/v1/liveroom/upload_images`,
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          console.log(res);
        });
    }
  }
};
</script>
<style lang="less">
@import url("./../../common/common.less");
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
.canvas_img_wrapper {
  position: relative;
  background: linear-gradient(
    180deg,
    rgba(255, 181, 23, 1) 0%,
    rgba(255, 208, 63, 1) 100%
  );
  padding: 20px 10px;
  .header {
    position: relative;
    width: 345px;
    margin: 0 auto 20px auto;
    .header_title {
      text-align: center;
      font-size: 17px;
      font-family: PingFangSC-Semibold, PingFangSC;
      font-weight: 600;
      color: rgba(255, 255, 255, 1);
    }
    .draw_btn {
      position: absolute;
      right: 0;
      top: 0;
      width: 75px;
      height: 30px;
      background: rgba(255, 123, 31, 1);
      border-radius: 20px;
      text-align: center;
      line-height: 30px;
      font-size: 15px;
      font-family: PingFangSC-Semibold, PingFangSC;
      font-weight: 600;
      color: #fff;
    }
  }
  .main_wrapper {
    width: 345px;
    margin: 0 auto 50px auto;
    padding: 20px 12px;
    background: url("../../assets/img/learnReport/marin_wrapper.png") no-repeat
      0 0 / 100%;
    background-position: 0 0;
    background-size: 100% 100%;
    //background-color: #fff;

    .top {
      display: flex;
      .px1-bottom-f3f3f3;
      padding-bottom: 10px;
      .left_s {
        width: 40%;
        text-align: center;
        .all_status_icon {
          width: 100px;
          img {
            width: 100%;
          }
        }
        .all_status {
          font-size: 17px;
          font-family: PingFangSC-Semibold, PingFangSC;
          font-weight: 600;
          color: rgba(194, 98, 27, 1);
        }
      }
      .right_s {
        display: flex;
        align-items: center;
        .left {
          margin-right: 5px;
          .avatar {
            border-radius: 50%;
            border: 3px solid rgb(253, 184, 65);
            width: 56px;
            vertical-align: middle;
          }
        }
        .right {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFangSC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
          .user_name {
            margin-right: 10px;
            font-size: 17px;
            font-family: PingFangSC-Semibold, PingFangSC;
            font-weight: 600;
            color: rgba(51, 51, 51, 1);
          }
          .right_ranking {
            background: rgba(255, 184, 48, 1);
            border-radius: 11px;
            font-size: 10px;
            text-align: center;
            padding: 0 5px;
            font-family: PingFangSC-Regular, PingFangSC;
            font-weight: 400;
            color: rgba(255, 255, 255, 1);
          }
        }
      }
    }
    .item_wrapper {
      //   margin-top: 20px;
      //   border-bottom: .px1-bottom-f3f3f3;
      .item {
        padding: 15px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .px1-bottom-f3f3f3;
        .item_left {
          display: flex;
          align-items: center;
          .item_left_l {
            width: 27px;
            margin-right: 10px;
            img {
              width: 27px;
            }
          }
          .item_left_r {
            .t {
              font-size: 11px;
              text-align: center;
              font-family: PingFangSC-Regular, PingFangSC;
              font-weight: 400;
              color: rgba(153, 153, 153, 1);
              .n {
                margin-right: 10px;
                font-size: 19px;
                font-family: PingFangSC-Semibold, PingFangSC;
                font-weight: 600;
                color: rgba(51, 51, 51, 1);
              }
            }
            .b {
              font-size: 13px;
              font-family: PingFangSC-Regular, PingFangSC;
              font-weight: 400;
              color: rgba(51, 51, 51, 1);
            }
          }
        }
        .item_right {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFangSC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .love_wrapper {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .px1-bottom-f3f3f3;
      .item {
        margin: 20px 0;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .item_left {
          width: 27px;
          margin-right: 10px;
          img {
            width: 100%;
          }
        }
        .item_right {
          font-size: 12px;
          font-family: PingFangSC-Regular, PingFangSC;
          font-weight: 400;
          color: rgba(102, 102, 102, 1);
        }
      }
    }
    .star_wrapper {
      margin: 20px 0;
      display: flex;
      flex-wrap: wrap;
      .star_item {
        display: flex;
        width: 50%;
        align-items: center;
        margin-bottom: 10px;
        .star_title {
          margin-right: 5px;
          font-size: 14px;
          font-family: PingFangSC-Semibold, PingFangSC;
          font-weight: 600;
          color: rgba(135, 68, 19, 1);
        }
        img.star {
          width: 22px;
          height: 22px;
        }
        img.star1 {
          width: 18px;
          height: 18px;
        }
      }
    }
    .remark_wrapper {
      margin-top: 0px;
      margin-bottom: 22px;
      .remark_title {
        margin-bottom: 12px;
        width: 75px;
        height: 21px;
        background: rgba(255, 211, 53, 1);
        border-radius: 20px;
        line-height: 21px;
        text-align: center;
        font-size: 14px;
        font-family: PingFangSC-Medium, PingFangSC;
        font-weight: 500;
        color: rgba(135, 68, 19, 1);
      }
      .remark_content {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFangSC;
        font-weight: 400;
        color: rgba(156, 83, 29, 1);
      }
    }
    .main_bottom_wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .main_bottom_left {
        width: 60px;
        img {
          width: 100%;
        }
      }
      .main_bottom_right {
        display: flex;
        align-items: center;
        .right_l {
          text-align: right;
          margin-right: 5px;
          font-size: 14px;
          font-family: PingFangSC-Medium, PingFangSC;
          font-weight: 500;
          color: rgba(117, 58, 58, 1);
          .t {
            margin-bottom: 5px;
          }
        }
        .right_r {
          width: 85px;
          img {
            width: 100%;
          }
        }
      }
    }
  }

  .leaf {
    position: absolute;
    bottom: 0;
    width: 110px;
    font-size: 0;
    img {
      width: 100%;
    }
  }
  .leaf.l {
    left: 0;
  }
  .leaf.r {
    right: 0;
  }
}

.btn_wrapper {
  margin-top: 30px;
  text-align: center;
  .btn {
    text-align: center;
    display: inline-block;
    width: 80px;
    height: 24px;
    line-height: 24px;
    background: linear-gradient(
      158deg,
      rgba(255, 210, 74, 1) 0%,
      rgba(255, 129, 0, 1) 100%
    );
    border-radius: 12px;
    font-size: 14px;
    font-family: PingFang-SC-Medium;
    color: #fff;
  }
}
.resultImg {
  width: 100%;
}
</style>

