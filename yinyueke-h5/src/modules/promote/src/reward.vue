<template>
  <div id="main">
    <div class="top">
      <img src="../../../assets/img/promote/reward/top_bg.png" alt class="top_bg" />
      <div class="top_main">
        <div class="current">
          <div class="label_text">当前收益</div>
          <div class="num">300.00</div>
        </div>
        <div class="detail">
          <div class="detail_item">
            <div class="label_text">已注册</div>
            <div class="num">5</div>
          </div>
          <div class="detail_item">
            <div class="label_text">付费人数</div>
            <div class="num">5</div>
          </div>
          <div class="detail_item">
            <div class="label_text">付费金额(元)</div>
            <div class="num">99</div>
          </div>
        </div>
        <div class="cash_btn">
          <img src="../../../assets/img/promote/reward/cash_btn.png" alt />
        </div>
      </div>
    </div>
    <div class="record">
      <img src="../../../assets/img/promote/reward/reward_title.png" alt class="record_title" />
      <div class="have_data">
        <div class="record_item_title">
          <div class="user">用户</div>
          <div class="time">时间</div>
          <div class="reward_money">奖励</div>
        </div>
        <div class="record_item">
          <div class="user">
            <div class="avatar">
              <img
                src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1967122488,1967216897&fm=26&gp=0.jpg"
                alt
              />
            </div>
            <div class="user_detail">
              <div class="name">卡布奇诺</div>
              <div class="phone">185****6253</div>
            </div>
          </div>
          <div class="time">03/12</div>
          <div class="reward_money">99元</div>
        </div>
        <div class="record_item">
          <div class="user">
            <div class="avatar">
              <img
                src="https://dss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=1967122488,1967216897&fm=26&gp=0.jpg"
                alt
              />
            </div>
            <div class="user_detail">
              <div class="name">卡布奇诺</div>
              <div class="phone">185****6253</div>
            </div>
          </div>
          <div class="time">03/12</div>
          <div class="reward_money">99元</div>
        </div>
      </div>
      <!-- <div class="no_data">
        <img src="../../../assets/img/promote/reward/coco.png" alt class="coco" />
        <div class="text">您还没邀请好友，快去邀请吧～</div>
        <img src="../../../assets/img/promote/reward/invite_btn.png" alt class="invite_btn" />
      </div> -->
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
export default {
  data() {
    return {};
  },
  created() {},

  methods: {
    toPoster() {
      this.$router.push("/poster");
    }
  }
};
</script>
<style lang="less">
.top {
  position: relative;
  width: 350px;
  margin: auto;
  //background: url("../../../assets/img/reward/top_bg.png") no-repeat center;
  background-size: cover;
  text-align: center;
  img.top_bg {
    width: 100%;
  }
  .top_main {
    padding-top: 80px;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    .current {
      // margin-top: 80px;
      .label_text {
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(252, 225, 57, 1);
      }
      .num {
        font-size: 44px;
        font-family: PingFang SC;
        font-weight: 600;
        color: rgba(255, 255, 255, 1);
      }
    }
    .detail {
      margin-top: 20px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-evenly;
      .label_text {
        font-size: 14px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(134, 35, 0, 1);
      }
      .num {
        font-size: 24px;
        font-family: SF UI Text;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
    .cash_btn {
      img {
        width: 240px;
      }
    }
  }
}
.record {
  position: relative;
  width: 335px;
  padding: 10px;
  margin: 20px auto 0 auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  padding-top: 46px;
  font-size: 0;
  .no_data {
    text-align: center;
    .coco {
        width: 96px;
      margin-top: 80px;
    }
    .text {
      margin: 10px 0 18px 0;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(160, 87, 6, 1);
    }
    .invite_btn {
      width: 280px;
    }
  }
  .record_title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 207px;
    top: -10px;
  }
  .record_item_title {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    height: 30px;
    background: rgba(251, 190, 108, 0.1);
    border-radius: 15px;
    font-size: 14px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(251, 190, 108, 1);
    // .user {
    //   padding-left: 10px;
    // }
    padding: 0 10px;
  }

  .time,
  .reward_money {
    display: inline-block;
  }
  .user {
    width: 54%;
  }
  .time {
    text-align: center;
    width: 16%;
  }
  .reward_money {
    text-align: right;
    width: 30%;
  }
  .record_item {
    display: flex;
    align-items: center;
    margin: 0 10px 20px 6px;
    .user {
      display: flex;
      align-items: center;
      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 6px;
        img {
          width: 100%;
        }
      }
      .user_detail {
        .name {
          font-size: 14px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(160, 87, 6, 1);
        }
        .phone {
          font-size: 12px;
          font-family: PingFang SC;
          font-weight: 400;
          color: rgba(160, 87, 6, 1);
        }
      }
    }
    .time {
      font-size: 12px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(160, 87, 6, 1);
    }
    .reward_money {
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 600;
      color: rgba(255, 72, 23, 1);
    }
  }
}
</style>
