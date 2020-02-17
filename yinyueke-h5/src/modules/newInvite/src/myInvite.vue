<template>
  <div class="page">
    <div class="main">
      <div class="nav">
        <div class="page_title">邀请记录</div>
        <div class="poster_btn" @click="toPoster">我的海报</div>
      </div>
      <div class="top">
        <img src="../../../assets/img/newInvite/user_bg.png" alt />
        <div class="invite_text">
          <span>您已经成功邀请了</span>
          <span class="num"> {{count}} </span>位好友
        </div>
      </div>
      <div v-show="count!=0" class="invite_data">
        <img src="../../../assets/img/newInvite/chain.png" alt class="chain left" />
        <img src="../../../assets/img/newInvite/chain.png" alt class="chain right" />
        <div v-for="(value ,key) in inviteData" :key="key" class="date_box">
          <div class="date">{{key}}</div>
          <div v-for="(user,idx) in value" :key="idx" class="user">
            <div class="avatar">
              <img :src="user.avatar_url" alt />
            </div>
            <div class="name">{{user.nickname}}</div>
            <div class="phone">{{hidePhone(user.phone)}}</div>
          </div>
        </div>
      </div>
      <div v-show="count==0" class="invite_data no_data">
        <img src="../../../assets/img/newInvite/chain.png" alt class="chain left" />
        <img src="../../../assets/img/newInvite/chain.png" alt class="chain right" />
        <img src="../../../assets/img/newInvite/coco.png" alt class="coco" />
        <div>您还没邀请好友哦，快去邀请吧</div>
        <div class="invite_btn" @click="toPoster">邀请好友</div>
      </div>
      <div class="bottom">
        <img src="../../../assets/img/newInvite/bottom.png" alt />
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
export default {
  data() {
    return {
      count: 0,
      inviteData: [
        {
          date: "02.14",
          users: [
            {
              name: "qwe",
              phone: "18810240072",
              avatar:
                "http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg"
            },
            {
              name: "qwe",
              phone: "18810240072",
              avatar:
                "http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg"
            },
            {
              name: "qwe",
              phone: "18810240072",
              avatar:
                "http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg"
            }
          ]
        },
        {
          date: "02.15",
          users: [
            {
              name: "qwe",
              phone: "18810240072",
              avatar:
                "http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg"
            },
            {
              name: "qwe",
              phone: "18810240072",
              avatar:
                "http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg"
            },
            {
              name: "qwe",
              phone: "18810240072",
              avatar:
                "http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg"
            }
          ]
        }
      ]
    };
  },
  created() {
    this.axios.defaults.headers.common["token"] = getQueryVariable("token");
    this.axios.defaults.headers.common["uid"] = getQueryVariable("uid");
  },
  mounted() {
    this.getInviteData();
  },
  methods: {
    toPoster() {
      this.$router.push("/poster");
    },
    hidePhone(phone) {
      if (phone.length > 0) {
        return phone.replace(/(\d{3})(\d{4})(\d{4})/, "$1****$3");
      }
    },
    getInviteData() {
      if (process.env.NODE_ENV === "development") {
        var url =
          "http://api.yinji.immusician.com/v1/share/share_data/?god=84703&share_id=3";
      } else {
        var url =
          "http://api.yinji.immusician.com/v1/share/share_data/?share_id=4";
      }

      this.axios.get(url).then(res => {
        if (!res.error) {
          this.inviteData = res.data.share_data;
          this.count = res.data.count;
          //this.count = 0;
          //this.inviteData = {};
        }
        console.log(res);
      });
    }
  }
};
</script>
<style lang="less">
@import url("./../../../common/common.less");
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
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 0 20px;

  background-color: #fff8df;
}
.main {
  font-size: 0;
  text-align: center;
  padding-bottom: 30px;
  .nav {
    position: relative;
    padding: 25px 0 30px 0;
    .page_title {
      font-size: 20px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(160, 87, 6, 1);
    }

    .poster_btn {
      font-size: 16px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 128, 48, 1);
      width: 90px;
      height: 30px;
      line-height: 30px;
      border-radius: 16px;
      border: 1px solid rgba(255, 128, 48, 1);
      position: absolute;
      right: 0;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .top {
    img {
      width: 100%;
    }
    position: relative;
    .invite_text {
      position: absolute;
      right: 15.5%;
      top: 20%;
      font-size: 15px;
      font-family: PingFangSC-Medium, PingFang SC;
      color: #fff;
    }
    .num {
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: rgba(255, 235, 0, 1);
    }
  }
  .bottom {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    img {
      width: 100%;
    }
  }
  .invite_data {
    position: relative;
    margin-top: 12px;
    background: rgba(255, 255, 255, 0.96);
    border-radius: 20px;
    padding: 10px 0;
    z-index: 3;
    .chain {
      position: absolute;
      width: 12px;
      top: -28px;
    }
    .chain.left {
      left: 34px;
    }
    .chain.right {
      right: 34px;
    }
    .date_box {
      margin-top: 10px;

      border-radius: 20px;
      padding: 17px;
      padding-bottom: 0;
      .date {
        position: relative;
        padding-left: 13px;
        font-size: 21px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(255, 148, 53, 1);
        margin-bottom: 10px;
        text-align: left;
        &::before {
          content: "";
          position: absolute;
          left: 0px;
          top: 42%;
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: rgba(255, 148, 53, 1);
        }
      }
      .user {
        display: flex;
        align-items: center;
        padding: 8px 10px;
        background: rgba(255, 247, 220, 1);
        border-radius: 23px;
        margin-bottom: 10px;
        .avatar {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          overflow: hidden;
          margin-right: 8px;
          img {
            width: 100%;
          }
        }
        .name {
          flex-grow: 1;
          font-size: 16px;
          font-family: PingFangSC-Medium, PingFang SC;
          font-weight: 500;
          color: rgba(160, 87, 6, 1);
        }
        .phone {
          font-size: 15px;
          font-family: PingFangSC-Regular, PingFang SC;
          font-weight: 400;
          color: rgba(160, 87, 6, 1);
        }
      }
    }
  }
  .no_data {
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(160, 87, 6, 1);
    .coco {
      margin-top: 70px;
      width: 120px;
    }
    .invite_btn {
      margin: 34px auto 130px auto;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
      width: 160px;
      height: 32px;
      line-height: 32px;
      background: rgba(255, 128, 48, 1);
      border-radius: 16px;
    }
  }
}
</style>

