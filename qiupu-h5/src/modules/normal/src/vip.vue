<template>
  <div class="main">
    <div class="card">
      <div class="card_info">
        <div class="top">
          <div class="user">
            <img src="./../../../assets/img/normal/vip/card.png" alt class="avatar">
            <div>
              <div class="name">周杰伦</div>
              <div>开通VIP享受特权</div>
            </div>
          </div>
          <div class="open_btn">立即开通</div>
        </div>
        <div class="benifit_wrapper">
          <div class="benifit_item">解锁全部乐器类型</div>
          <div class="benifit_item">解锁海量曲谱库</div>
          <div class="benifit_item">解锁AI陪练</div>
          <div class="benifit_item">享受高清打印</div>
        </div>
      </div>
      <img class="imgw100" src="./../../../assets/img/normal/vip/card.png" alt>
    </div>
    <div class="buy">
      <div class="item_wrapper">
        <div class="item" v-for="(item,index) in prices" :key="index">
          <div class="time">{{item.time}}</div>
          <div class="price">
            <span class="money_icon">¥</span>
            <span>{{item.price/100}}</span>
          </div>
          <div class="intro">{{item.intro}}</div>
          <div class="buy_num">{{item.buy_num}}人购买</div>
        </div>
      </div>

      <div class="btn">立即以288元开通</div>
    </div>
    <div class="intro">
      <img class="imgw100" src="./../../../assets/img/normal/vip/intro.jpg" alt>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      prices: [
        {
          time: "终身",
          price: "28800",
          intro: "终身受益",
          buy_num: 65234
        },
        {
          time: "终身",
          price: "28800",
          intro: "终身受益",
          buy_num: 65234
        },
        {
          time: "终身",
          price: "28800",
          intro: "终身受益",
          buy_num: 65234
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.main {
  background: rgba(248, 248, 248, 1);
  font-size: 0;
}
.card {
  background-color: #fff;
  min-height: 205px;
  overflow: hidden;
  .card_info {
    width: 310px;
    position: absolute;
    left: 33px;
    top: 33px;
    color: #ab6312;
    font-size: 12px;
    .top {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .open_btn {
        text-align: center;
        width: 70px;
        height: 24px;
        line-height: 24px;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 5px 0px rgba(171, 99, 18, 0.2);
        border-radius: 12px;
      }
      .user {
        display: flex;
        align-items: center;
        .avatar {
          margin-right: 3px;
          width: 40px;
          height: 40px;
          border-radius: 50%;
        }
        .name {
          color: #333;
          font-size: 14px;
        }
      }
    }
    .benifit_wrapper{
      margin-top: 26px;
      margin-left: 10px;
    }
    .benifit_item {
      position: relative;
      &::before {
        position: absolute;
        left: -8px;
        top: 50%;
        transform: translateY(-50%);
        content: "";
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: rgba(171, 107, 47, 1);
      }
    }
  }
}
.buy {
  overflow: hidden;
  background-color: #fff;
  padding-top: 20px;
  margin: 0px 0 20px 0;
  .item_wrapper {
    display: flex;
    padding: 0 16px;
    justify-content: space-between;
    .item {
      width: 110px;
      height: 146px;
      border-radius: 6px;
      border: 1px solid rgba(238, 238, 238, 1);
      text-align: center;
      .time {
        margin-top: 30px;
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
      .price {
        .money_icon {
          font-size: 12px;
          font-family: PingFang-SC-Regular, PingFang-SC;
          font-weight: 400;
          color: rgba(222, 155, 51, 1);
        }
        font-size: 28px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(222, 155, 51, 1);
      }
      .intro {
        margin: 7px auto 3px auto;
        width: 90px;
        background: rgba(255, 225, 179, 1);
        border-radius: 8px;
        text-align: center;
        font-size: 11px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(222, 155, 51, 1);
      }
      .buy_num {
        font-size: 11px;
        font-family: PingFang-SC-Regular, PingFang-SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
  }
  .btn {
    margin: 20px auto;
    background: linear-gradient(
      90deg,
      rgba(200, 136, 36, 1) 0%,
      rgba(244, 185, 95, 1) 100%
    );
    color: rgba(255, 255, 255, 1);
  }
}
</style>
