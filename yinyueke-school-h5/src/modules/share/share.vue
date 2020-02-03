<template>
  <div class="wrapper">
    <!-- <img class="bg" src="../../assets/img/share/bg.png" alt> -->
    <img class="bg_title" src="../../assets/img/share/bg_title.png" alt>
    <div class="content_box">
      <img class="content_box_bg" src="../../assets/img/share/content_box.png" alt>
      <div class="content">
        <div class="my_invite_code">我的邀请码 {{userInfo.invitation_id}}</div>
        <div class="my_invite_title">
          <div
            class="my_invite"
            v-show="userInfo.inviter_nickname"
          >我的邀请人：{{userInfo.inviter_nickname}}</div>
        </div>
        <div class="step">
          <div class="step_item">
            <div class="step_icon">
              <img src="../../assets/img/share/share.png" alt>
            </div>
            <div class="step_right">
              <div class="step_num">STEP 1</div>
              <div class="step_text">点击底部分享渠道邀请好友</div>
            </div>
          </div>
          <div class="step_item">
            <div class="line"></div>
            <div class="step_icon">
              <img src="../../assets/img/share/friends.png" alt>
            </div>
            <div class="step_right">
              <div class="step_num second">STEP 2</div>
              <div class="step_text">好友打开链接，进行注册填写邀请码</div>
            </div>
          </div>
        </div>
        <div class="my_invite_wrapper">
          <div class="friends_title">
            <img src="../../assets/img/share/myinvite.png" alt>
            <div class="friends_title_text">我邀请的好友</div>
          </div>
          <div class="invited_box">
            <div  v-show="invitedFriends.length>0" class="friends_wrapper" :class="invitedFriends.length>8 ? 'ov':'common'">
              <div v-for="(friend,index) in invitedFriends" :key="index" class="friend">
                <div class="avatar">
                  <img :src="friend.avatar_url" alt>
                </div>
                <div class="nickname">{{friend.nickname}}</div>
                <div class="time">{{friend.registered_at}}</div>
              </div>
            </div>
            <div v-show="invitedFriends.length==0" class="no_data">
              <img class="logo" src="../../assets/img/share/no_data_logo.png" alt>
              <div>还没邀请到好友哦，快去邀请吧～</div>
            </div>
          </div>
        </div>
        <div class="share_wrapper">
          <div class="share_title">
            <div class="dot s"></div>
            <div class="dot b"></div>
            <div class="title_text">分享到</div>
            <div class="dot b"></div>
            <div class="dot s"></div>
          </div>
          <div class="items">
            <!-- <div class="item" @click="share(23)">
              <img src="../../assets/img/share/pyq.png" alt>
              <div>朋友圈</div>
            </div> -->
            <div class="item" @click="share(22)">
              <img src="../../assets/img/share/wx.png" alt>
              <div>微信</div>
            </div>
            <div class="item" @click="share(24)">
              <img src="../../assets/img/share/qq.png" alt>
              <div>QQ</div>
            </div>
            <div class="item" @click="share(1)">
              <img src="../../assets/img/share/wb.png" alt>
              <div>新浪微博</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { platForm, getQueryVariable } from "../../common/util.js";
export default {
  data() {
    return {
      invitedFriends: [],
      userInfo: {
        nickname: "",
        avatar_url:"",
        invitation_id: ""
      },
      uid: getQueryVariable("uid")
    };
  },
  mounted() {
    //http://cdn.kids-web.immusician.com/yiji-school/share.html?uid=xxx&token=xxx
    console.log(process.env);
    this.axios
      .get(`${process.env.VUE_APP_SHARE}/v2/school/my_inviter/`, {
        headers: {
          uid: Number(getQueryVariable("uid")),
          token: getQueryVariable("token")
        }
      })
      .then(res => {
        //this.invitedFriends = res.data.slice(0,12);
        this.invitedFriends = res.data;
        this.userInfo = res.user_info;
      });
  },
  methods: {
    share(num) {
      // this.userInfo = {
      //   nickname: "xxx",
      //   avatar_url:
      //     "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1569312967&di=7efb577a895225a10cc6a508de755b57&imgtype=jpg&er=1&src=http%3A%2F%2Fgss0.baidu.com%2F9fo3dSag_xI4khGko9WTAnF6hhy%2Fzhidao%2Fpic%2Fitem%2Fd4628535e5dde7115abcc1ceafefce1b9d166198.jpg",
      //   invitation_id: "123"
      // };
      var myShareUrl = `${process.env.VUE_APP_HOST}/inviteCode.html?uid=${
        this.uid
      }&nickname=${encodeURIComponent(this.userInfo.nickname)}&avatar=${
        this.userInfo.avatar_url
      }&myInviteCode=${this.userInfo.invitation_id}`;

      if (platForm == "IOS") {
        console.log('--------------')
        console.log(webkit.messageHandlers.Share.postMessage)
        console.log(num)
        webkit.messageHandlers.Share.postMessage({
          title: "0元享VIP会员",
          content: myShareUrl,
          mode: 0,
          type: num
        });
      } else {
        console.log('--------------')
         PayFeedBack.shareUrl(myShareUrl);
         //PayFeedBack.shareUrl(myShareUrl, 0, num, "0元享VIP会员");
      }
    }
  }
};
</script>

<style lang="less">
@import url("./../../common/common.less");
// .font-size(@sizeValue:16) {
//   @vw: 16 / 375 * 100;
//   @result: @sizeValue / 16 * @vw;
//   font-size: ~"@{result}vw";
// }
// html {
//   .font-size(16);
// }
// html {
//   @media screen and (max-width: 320px) {
//     .font-size(16);
//   }
//   @media screen and (min-width: 480px) {
//     .font-size(13);
//   }
// }

.wrapper {
  position: relative;
  overflow: auto;
  padding-bottom: 30px;
  //background-color: rgba(150, 78, 15, 1);
  img.bg {
    z-index: -2;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    //height: 100%;
  }
  min-height: 100vh;
  background: url("../../assets/img/share/bg.png") no-repeat center top/cover;
  .invite_code {
    position: absolute;
    left: 51%;
    top: 25%;
  }
  .bg_title {
    width: 420px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 24px;
  }
  .content_box {
    position: relative;
    margin: 265px auto 0 auto;
    width: 604px;
    //position: absolute;
    //left: 50%;
    //transform: translateX(-50%);
    //top: 25%;
    img.content_box_bg {
      position: absolute;
      z-index: 8;
      left: 0;
      top: 0;
      width: 100%;
    }
    .content {
      position: relative;
      z-index: 9;
      width: 100%;
      padding-left: 51px;
      padding-right: 51px;
      padding-top: 47px;
      // position: absolute;
      //left: 0;
      //top: 0;
    }
  }
}
.my_invite_code {
  position: absolute;
  top: -33px;
  left: 50%;
  transform: translateX(-50%);
  width: 240px;
  height: 40px;
  background: rgba(255, 236, 72, 1);
  box-shadow: 0px 2px 0px 0px rgba(255, 255, 255, 0.5);
  border-radius: 20px 20px 0px 0px;
  text-align: center;
  line-height: 44px;
  font-size: 20px;
  font-family: PingFang-SC;
  font-weight: 500;
  color: rgba(247, 66, 20, 1);
}
.my_invite_title {
  margin: auto;
  text-align: center;
  .my_invite {
    display: inline-block;
    width: 200px;
    height: 40px;
    line-height: 40px;
    background: rgba(252, 245, 231, 1);
    border-radius: 40px;
    font-size: 16px;
    font-family: PingFang-SC;
    font-weight: 400;
    color: rgba(212, 115, 69, 1);
  }
}
.step_item {
  position: relative;
  display: flex;
  align-items: center;
  .line {
    position: absolute;
    left: 31px;
    top: -12px;
    width: 2px;
    height: 60px;
    background: rgba(238, 238, 238, 1);
    z-index: 8;
  }
  .step_right {
    margin-left: 7px;
    position: relative;
    top: -4px;
  }
  .step_num {
    font-size: 14px;
    font-family: PingFang-SC;
    font-weight: 500;
    color: rgba(153, 153, 153, 1);
  }
  .step_num.second {
    color: #3f95eb;
  }
  .step_text {
    font-size: 16px;
    font-family: PingFang-SC;
    font-weight: 400;
    color: rgba(255, 120, 42, 1);
  }
  .step_icon {
    position: relative;
    z-index: 9;
    img {
      width: 64px;
    }
  }
}
.friends_title {
  margin-top: 15px;
  margin-bottom: 15px;
  position: relative;
  text-align: center;
  img {
    width: 200px;
  }
  .friends_title_text {
    position: absolute;
    left: 50%;
    top: 46%;
    transform: translate(-50%, -50%);
    font-size: 18px;
    font-family: PingFang-SC;
    font-weight: 600;
    color: rgba(51, 51, 51, 1);
  }
}
.invited_box {
  width: 490px;
  height: 214px;
  overflow-x: auto;
  background-color: rgba(251, 249, 225, 1);
  .friends_wrapper {
    -webkit-overflow-scrolling: touch;
    //width: 567px;
    height: 214px;
    overflow-x: auto;
    //overflow-y: hidden;
    padding: 20px 12px;
    .friend {
      display: inline-block;
      box-sizing: content-box;
      width: 90px;
      margin-right: 20px;
      margin-bottom: 10px;
      text-align: center;
      .avatar {
        margin: auto;
        width: 40px;
        height: 40px;
        overflow: hidden;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .nickname {
        font-size: 14px;
        font-family: PingFang-SC;
        font-weight: 400;
        color: rgba(51, 51, 51, 1);
      }
      .time {
        font-size: 11px;
        font-family: PingFang-SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .friends_wrapper.common {
    .friend {
      width: 25%;
      margin: 0;
      margin-bottom: 10px;
      //margin: 0 10px 10px 10px !important;
    }
  }
  .friends_wrapper.ov {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: flex-start;
    .friend {
      width: 89px;
      margin-right: 20px;
    }
    .friend:nth-last-child(2) {
      padding-right: 15px;
    }
    .friend:last-child {
      padding-right: 15px;
    }
  }
  .no_data {
    .logo {
      margin-bottom: 10px;
    }
    padding-top: 45px;
    text-align: center;
    font-size: 16px;
    font-family: PingFang-SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    .logo {
      width: 190px;
    }
  }
}
.share_wrapper {
  position: relative;
  margin-top: 90px;
  //top: -20px;
  .dot {
    border-radius: 50%;
    background-color: #fff;
    margin-right: 2px;
  }
  .dot.b {
    width: 6px;
    height: 6px;
  }
  .dot.s {
    width: 4px;
    height: 4px;
  }
  .share_title {
    .title_text {
      margin-right: 2px;
    }
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;
    text-align: center;
    font-size: 16px;
    font-family: PingFang-SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  .items {
    display: flex;
    justify-content: center;
    text-align: center;
    font-size: 12px;
    font-family: PingFang-SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 1);
    img {
      width: 58px;
    }
    .item {
      margin: 0 20px;
    }
  }
}
</style>

