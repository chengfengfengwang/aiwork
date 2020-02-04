<template>
  <div id="cooperation">
    <div class="banner">
      <img src="../../assets/img/cooperation/banner.png" alt>
    </div>
    <div class="main">
      <img src="../../assets/img/cooperation/leaf.png" alt="" class="leaf">
      <div class="identity">
        <div class="title">如果您是以下身份，欢迎联系负责老师咨询商务合作</div>
        <!-- <div class="title2">咨询商务合作</div> -->
        <div class="identity_main">
          <div>
            <img src="../../assets/img/cooperation/icon1.png" alt>
            <div class="text">考级办老师</div>
          </div>
          <div>
            <img src="../../assets/img/cooperation/icon2.png" alt>
            <div class="text">琴行负责人</div>
          </div>
          <!-- <div>
            <img src="../../assets/img/cooperation/icon3.png" alt>
            <div class="text">社群KOL</div>
          </div> -->
          <div>
            <img src="../../assets/img/cooperation/icon4.png" alt>
            <div class="text">音乐老师</div>
          </div>
        </div>
      </div>
      <div class="teacher">
        <img src="../../assets/img/cooperation/teacher.png" alt class="teacher_img">
        <div class="text">如果您是乡（镇）中小学、幼儿园音乐老师，提供证明材料后我们为您免费赠课</div>
      </div>
      <div class="tel_title" @click="test">
        <img src="../../assets/img/cooperation/title_d_l.png" alt="" class="left">
        <span>联系方式</span>
        <img src="../../assets/img/cooperation/title_d_r.png" alt="" class="right">
      </div>
      <div class="tel_box">
        <div class="item">
          <img class="teacher_avatar" src="../../assets/img/cooperation/area1.png" alt>
          <div style="color:#2599FF" class="item_title">华南、华东大区</div>
          <div class="name">钟老师</div>
          <div class="tel">
            17779677797
            <span class="wx">(微信同号)</span>
          </div>
          <button @click="copyWx" class="item_btn copy_wx" :data-clipboard-text="'17779677797'">复制号码</button>
        </div>
        <!-- <div class="item">
          <img class="teacher_avatar" src="../../assets/img/cooperation/photo2.png" alt>
          <div class="item_title">社群KOL、图书渠道请联系</div>
          <div class="name">孙老师</div>
          <div class="tel">
            18686672423
            <span class="wx">(微信同号)</span>
          </div>
          <button @click="copyWx" class="item_btn copy_wx" :data-clipboard-text="'18686672423'">复制号码</button>
        </div> -->
        <!-- <div class="item">
          <img class="teacher_avatar" src="../../assets/img/cooperation/photo3.png" alt>
          <div class="item_title">考级办（中国北区）</div>
          <div class="name">陈老师</div>
          <div class="tel">
            13511089101
            <span class="wx">(微信同号)</span>
          </div>
          <button @click="copyWx" class="item_btn copy_wx" :data-clipboard-text="'13511089101'">复制号码</button>
        </div> -->
        <div class="item">
          <img class="teacher_avatar" src="../../assets/img/cooperation/area2.png" alt>
          <div style="color:#1EBE8C" class="item_title">华中、华北大区</div>
          <div class="name">李老师</div>
          <div class="tel">
            18801020414
            <span class="wx">(微信同号)</span>
          </div>
          <button @click="copyWx" class="item_btn copy_wx" :data-clipboard-text="'18801020414'">复制号码</button>
        </div>
        <div class="item">
          <img class="teacher_avatar" src="../../assets/img/cooperation/area3.png" alt>
          <div style="color:#FF6A64" class="item_title">东北、西南大区</div>
          <div class="name">赵老师</div>
          <div class="tel">
            18510088511
            <span class="wx">(微信同号)</span>
          </div>
          <button @click="copyWx" class="item_btn copy_wx" :data-clipboard-text="'18510088511'">复制号码</button>
        </div>
        <div class="item">
          <img class="teacher_avatar" src="../../assets/img/cooperation/area4.png" alt>
          <div style="color:#7B38FF" class="item_title">西北大区</div>
          <div class="name">党老师</div>
          <div class="tel">
            13810352513
            <span class="wx">(微信同号)</span>
          </div>
          <button @click="copyWx" class="item_btn copy_wx" :data-clipboard-text="'13810352513'">复制号码</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../common/util.js";
import { Toast } from "vant";
import ClipboardJS from "clipboard";
export default {
  data() {
    return {
      param: ""
    };
  },
  mounted() {
    new ClipboardJS(".copy_wx", {
      text: function(trigger) {
        return trigger.getAttribute("data-clipboard-text");
      }
    });
  },
  methods:{
    test(){
      console.log('test');
      
      //location.href="https://shop43817630.m.youzan.com/wscgoods/detail/1y92glljyf3uu"
    },
    copyWx() {
      Toast.success({
        duration: 1000,
        message: '复制成功'
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
#cooperation {
  min-height: 100vh;
  background: linear-gradient(
    180deg,
    rgba(255, 122, 92, 1) 0%,
    rgba(255, 135, 73, 1) 100%
  );
}
.banner {
  img {
    width: 100%;
  }
}
.main {
  position: relative;
  overflow: hidden;
  padding: 0 15px 25px 15px;
  .leaf{
    position: absolute;
    width: 22px;
    right: 0px;
    top: 21%;
  }
}
.identity {
  margin: 20px auto 35px auto;
  padding: 27px 0 20px 0;
  width: 345px;
  height: 163px;
  font-size: 16px;
  background: url("../../assets/img/cooperation/box1.png") no-repeat center/100%
    100%;
    .title{
      position: relative;
      font-size: 14px;
      margin-bottom: 20px !important;
    }
    // .title::before{
    //   content:'';
    //   position:absolute;
    //   width: 6px;
    //   height: 6px;
    //   border-radius: 50%;
    //   background:rgba(255,131,131,1);
    //   top:50%;
    //   transform: translateY(-50%);
    //   left: 15px;
    // }
    // .title::after{
    //   content:'';
    //   position:absolute;
    //   width: 6px;
    //   height: 6px;
    //   border-radius: 50%;
    //   background:rgba(255,131,131,1);
    //   top:50%;
    //   transform: translateY(-50%);
    //   right: 15px;
    // }
  .title,.title2 {
    //width: 84%;
    position: relative;
    margin: 0px auto 0px auto;
    text-align: center;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
  }
  .title2{
    margin-bottom: 10px
  }
  .identity_main {
    padding: 0 17px;
    display: flex;
    justify-content: space-around;
    text-align: center;
    img {
      width: 45px;
    }
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.teacher {
  margin: auto;
  margin-bottom: 30px;
  position: relative;
  width: 345px;
  height: 80px;
  background: url("../../assets/img/cooperation/box2.png") no-repeat center/100%
    100%;
  .teacher_img {
    position: absolute;
    width: 64px;
    left: 20px;
    top: -10px;
  }
  .text {
    position: absolute;
    width: 214px;
    top: 50%;
    left: 108px;
    transform: translateY(-50%);
    font-size: 13px;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    color: rgba(51, 51, 51, 1);
  }
}
.tel_title {
  position: relative;
  margin-bottom: 15px;
  text-align: center;
  font-size: 23px;
  font-family: PingFangSC-Semibold;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  img.left,img.right{
    width: 16px;
    position: absolute;
    top:50%;
    transform: translateY(-50%);
  }
  img.left{
    left: 28%;
  }
  img.right{
    right: 28%;
  }
}
.tel_box {
  width: 345px;
  height: 419px;
  //height: 320px;
  margin: auto;
  background: url("../../assets/img/cooperation/box3.png") no-repeat center/100%
    100%;
  .item {
    position: relative;
    margin: 0 20px;
    padding: 15px 0 12px 0;
    padding-left: 25px;
    .teacher_avatar {
      width: 11px;
      position: absolute;
      left: 5px;
      top: 19px;
    }
    &:not(:last-child){
        .px1-bottom-ffe6e6;
    }
    .item_title {
      margin-bottom: 10px;
      font-size:15px;
      font-family:PingFangSC-Medium,PingFang SC;
      font-weight:500;
      color: rgba(51, 51, 51, 1);
    }
    .name,
    .tel {
      font-size: 14px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(102, 102, 102, 1);
      .wx {
        font-size: 10px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(102, 102, 102, 1);
      }
    }
    .name {
      margin-bottom: 5px;
    }
    .item_btn {
      position: absolute;
      right: 0px;
      bottom: 12px;
      width: 75px;
      height: 25px;
      line-height: 25px;
      text-align: center;
      font-size: 13px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
      color: rgba(255, 127, 84, 1);
      .px1-around;
    }
  }
}
</style>

