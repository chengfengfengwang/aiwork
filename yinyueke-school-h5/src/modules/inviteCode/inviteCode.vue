<template>
  <div id="inviteCode">
    <div class="main">
      <div class="page_title">
        <img src="../../assets/img/inviteCode/title.png" alt>
      </div>
      <div class="user">
        <div class="avatar">
          <img :src="avatar" alt>
        </div>
        <div class="nickname">{{nickname}}</div>
      </div>
      <div class="main_wrapper">
        <img src="../../assets/img/inviteCode/main_wrapper.png" alt>
      </div>
      <div class="code">{{myInviteCode}}</div>
      <button class="btn copy_btn" :data-clipboard-text="myInviteCode" @click="copyCode">复制邀请码</button>
      <div class="tip">
        <div>复制邀请后，可在注册音乐壳校园版时</div>
        <div>填写邀请码，享受免费学音乐</div>
      </div>
      <div class="go_btn btn">
        马上0元享VIP
        <!-- <img src="../../assets/img/inviteCode/go_btn.png" alt> -->
      </div>
    </div>
    <div class="footer">
      <img src="../../assets/img/inviteCode/footer.png" alt>
    </div>
    <div v-show="maskShow" class="mask" @click="maskShow=false">
      <div class="window">
        <img src="../../assets/img/inviteCode/window.png" alt>
        <div class="content_wrapper">
          <div style="color:#FF5322">复制邀请码成功</div>
          <div>快参加0元享终身VIP活动吧～</div>
          <div class="btn">立即参加</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from '../../common/util.js'
import ClipboardJS from "clipboard";

export default {
  data(){
    return{
      maskShow:false,
      myInviteCode:'',
      nickname:'',
      avatar:''
    }
  },
  mounted() {
    this.myInviteCode = getQueryVariable('myInviteCode');
    this.nickname = decodeURIComponent(getQueryVariable('nickname'));
    this.avatar = getQueryVariable('avatar');
    new ClipboardJS(".copy_btn", {
      text: function(trigger) {
        return trigger.getAttribute("data-clipboard-text");
      }
    });
  },
  methods:{
    copyCode(){
      this.maskShow = true;
      const element =  document.querySelector('.window');
      element.classList.add('animated', 'fadeInDown');
    }
  }
}
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
    .font-size(11.5);
  }
}
#inviteCode {
  min-height: 100vh;
  background: url("../../assets/img/inviteCode/bg.png") no-repeat center
    top/cover;
  // @media screen and (min-width: 480px) {
  // background: url("../../assets/img/inviteCode/bg_pad.png") no-repeat center top/cover;
  // }
}
.main {
  // background: url("../../assets/img/inviteCode/main_wrapper.png") no-repeat center
  //   top/115%;
  .main_wrapper {
    z-index: -1;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -20px;
    img {
      width: 366px;
    }
  }
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 30%;
  width: 317px;
  height: 250px;
  text-align: center;
  //background-color: #fff;
  .page_title {
    img {
      width: 320px;
    }
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -185px;
  }
  .user {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -40px;
    text-align: center;
    .avatar {
      display: inline-block;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .nickname {
      font-size: 16px;
      font-family: PingFang-SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
  .code {
    margin-top: 79px;
    font-family: PingFang-SC;
    font-size: 30px;
    font-weight: 500;
    color: rgba(247, 66, 20, 1);
  }
  .copy_btn {
    margin: 12px auto 30px auto;
    width: 120px;
    height: 30px;
    line-height: 28px;
    text-align: center;
    border-radius: 30px;
    border: 2px solid rgba(255, 147, 23, 1);
    color: #ff9317;
    font-size: 14px;
    background-color: #fff;
  }
  .tip {
    font-size: 14px;
    font-family: PingFang-SC;
    font-weight: 400;
    color: rgba(141, 113, 39, 1);
  }
  .go_btn {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: -90px;
    background-color: rgb(252, 86, 27);
    width: 300px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 19px;
    border-radius: 25px;
    box-shadow: 0 3px 15px 1px #ed1a1a59;
  }
}
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  font-size: 0;
  img {
    width: 100%;
  }
}
.window {
  position: fixed;
  left: 50%;
  //transform: translateX(-50%) translateZ(0);
  top: 20%;
  margin-left: -150px;
  img {
    width: 300px;
  }
  .content_wrapper {
    text-align: center;
    position: absolute;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
    top: 54%;
    font-size: 16px;
    font-family: PingFang-SC;
    font-weight: 500;
    color: #333333;
  }
  .btn {
    margin-top: 16px;
    display: inline-block;
    width: 200px;
    height: 40px;
    line-height: 40px;
  }
}
</style>

