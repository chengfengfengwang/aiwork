<template>
  <!-- 开学活动 -->
  <div id="pageWrapper">
    <div>
      <img src="../../../assets/img/liveMaterial/bg.png" alt class="bg" />
      <div class="list">
        <div
          @click="goDetail(index,item.end)"
          v-for="(item,index) in liveList"
          :key="index"
          class="item"
          :class="{canplay:item.videoUrl}"
        >
          <!-- <div class="text_img">
            <div>《亲子国际体态律动游戏》</div>
            <div class="name">-李珊珊</div>
          </div> -->
           <img class="text_img" :src="item.imgSrc" alt />
          <!-- <div v-if="item.videoUrl" class="line"></div>
          <img class="text_img" :src="item.imgSrc" alt />
          <img v-show="item.videoUrl" src="../../../assets/img/liveVideo/play.png" alt class="play" /> -->
          <div  class="num">{{index+1}}</div>
        </div>
      </div>
    </div>

    <!-- <video src="https://www.w3school.com.cn/i/movie.ogg"></video> -->
  </div>
</template>
<script>
import { getQueryVariable, testWeixin } from "../../../common/util.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      isWatch: 1,
      liveList: [
        {
          imgSrc: "",
          name: "亲子国际体态律动游戏",
          author:'谢呈',
          end:1
        },
        {
          imgSrc: "",
          name: "奥尔夫打击乐趣味表演课",
          author:'李珊珊',
          end:1
        },
        {
          imgSrc: "",
          name: "尤克里里唱游记",
          author:'陈涛',
          end:1
        },
        {
          imgSrc: "",
          name: "当绘本遇上舞蹈",
          author:'王红丽',
          end:1
        },
        {
          imgSrc: "",
          name: "趣味视唱练耳玩起来",
          author:'田园',
          end:1
        },
        {
          imgSrc: "",
          name: "器乐王国之旅-乐器diy",
          author:'欣慰',
          end:0
        },
        {
          imgSrc: "",
          name: "用音乐解锁大脑的神奇魔力",
          author:'李添',
          end:0
        },
        {
          imgSrc: "",
          name: "儿童快乐非洲鼓",
          author:'董浩',
          end:0
        },
        {
          imgSrc: "",
          name: "美国最受孩子喜爱的钢琴启蒙课",
          author:'Irina Gorin',
          end:0
        }
      ]
    };
  },
  created() {
    if (process.env.NODE_ENV !== "development") {
      this.getCode();
      this.getList();
    }
  },
  mounted() {
    console.log("进入页面");
    this.liveList.forEach((e, index) => {
      e.imgSrc = require("../../../assets/img/liveMaterial/" + 'live'+ (index + 1) + ".png");
    });
  },
  methods: {
    getCode() {
      var ruri = encodeURIComponent(
        "http://cdn.kids-web.immusician.com/yinji/liveMaterial.html"
      );
      //正式
      var appId = "wxebd76dff6ca15a2a";
      //测试
      //var appId = "wx79d1426d8dc6654a";

      this.wxCode = getQueryVariable("code");
      console.log(this.wxCode);
      console.log(Boolean(!this.wxCode));
      if (!this.wxCode) {
        console.log("执行跳转");
        location.href = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${ruri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`;
      }
    },
    getList() {
      if (this.wxCode) {
        history.pushState(null, null, document.URL);
        window.addEventListener("popstate", function() {
          history.pushState(null, null, document.URL);
        });
        console.log("请求接口");
        this.axios
          .post("http://api.yinji.immusician.com/v1/wechat/live_list", {
            code: this.wxCode
          })
          .then(res => {
            this.isWatch = res.isWatch;
          });
      }
    },
    goDetail(index,end) {
      if (end===1) {
        let item = this.liveList[index];
        localStorage.setItem('liveIndex',index);
        localStorage.setItem('name',item.name);
        localStorage.setItem('author',item.author);
        this.$router.push('/detail')
      } else {
        Toast({
          message: "直播还未开始或暂无直播资料",
          duration: 1000
        });
      }
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
  //   @media screen and (min-width: 480px) {
  //     .font-size(13);
  //   }
}
#pageWrapper {
  min-height: 100vh;
  position: relative;
  //font-size: 0;
  //   background: url("../../assets/img/liveVideo/bg.png");
  //   background-size: cover;
  //   background-position: 0 0;
  .bg {
    width: 100%;
  }
}

.list {
  position: absolute;
  left: 55%;
  transform: translateX(-50%);
  top: 29%;
  width: 80%;
  .item {
    position: relative;
    margin-bottom: 15px;
    img.play {
      position: absolute;
      width: 16%;
      left: -13%;
      top: 46%;
      transform: translateY(-50%);
      z-index: 3;
    }
    .text_img{
      width: 280px;
      margin-left: 10px;
    }
    // .text_img {
    //   width: 285px;
    //   height: 80px;
    //   margin-left: 15px;
    //   padding-top: 15px;
    //   border-radius: 80px;
    //   padding-left: 30px;
    //   background: rgba(255, 255, 255, .95);
    //   margin-bottom: 15px;
    //   color: rgb(254, 170, 27);
    //   .name{
    //     margin-left: 10px;
    //     color: #333;
    //   }
    // }
    .num {
      position: absolute;
      width: 13%;
      left: -10%;
      top: 46%;
      transform: translateY(-50%);
      text-align: center;
      color: #fff;
      background: #ffc633;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 16px;
    }
  }
  .item .line {
    content: "";
    width: 1px;
    background-color: #fff;
    opacity: 0.3;
    height: 80%;
    position: absolute;
    left: -5%;
    top: 60%;
    z-index: 2;
    //transform: translateX(-50%);
  }
  // .item.canplay:last-of-type{
  //   background-color: #000;
  // }
}
.no_watch {
  position: absolute;
  left: 0;
  top: 0;
  img {
    width: 100%;
  }
}
</style>

