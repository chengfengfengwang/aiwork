<template>
  <div id="main">
    <Nav>求谱墙</Nav>
    <div class="content">
      <div class="list_wrapper">
        <div class="list_item" v-for="n in 5" :key="n">
          <div class="index">{{n}}</div>
          <div class="qupu">
            <div class="title">好想爱这个世界</div>
            <div>
              <span class="author">华晨宇</span>
              <span class="type">吉他谱</span>
            </div>
          </div>
          <div class="num">230</div>
          <div class="status">
            已求
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from './../../../../components/Nav'

export default {
  data() {
    return {
      menuIndex: 0
    };
  },
  created() {},
  components: {
    Nav
  }
};
</script>
<style lang="less" scoped>
.menus {
  display: flex;
  padding: 8px 34px;
  justify-content: space-between;
  .menu_item {
    position: relative;
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(153, 153, 153, 1);
    &.active {
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(51, 51, 51, 1);
    }
    &.active:after {
      content: "";
      position: absolute;
      bottom: -6px;
      left: 50%;
      transform: translateX(-50%);
      width: 12px;
      height: 2px;
      background: linear-gradient(
        90deg,
        rgba(255, 135, 27, 1) 0%,
        rgba(255, 69, 32, 1) 100%
      );
      border-radius: 12px;
    }
  }
}
.content {
  padding: 0 16px;
  .list_item {
    margin: 24px 0;
    display: flex;
    //justify-content: space-between;
    align-items: center;
    .index {
      margin-right: 15px;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .qupu {
      flex-grow: 1;
      .title {
        font-size: 16px;
        font-family: PingFangSC-Semibold, PingFang SC;
        font-weight: 600;
        color: rgba(51, 51, 51, 1);
      }
      .author {
        margin-right: 30px;
        font-size: 14px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
      .type {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
      }
    }
    .num {
      margin-right: 17px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .status {
      width: 65px;
      text-align: center;
      height: 28px;
      line-height: 28px;
      border-radius: 15px;
      font-size:14px;
      font-family:PingFangSC-Regular,PingFang SC;
      font-weight:400;
      &.yiqiu{
        border:1px solid rgba(153,153,153,1);
        color:rgba(153,153,153,1);
      }
      &.tongqiu{
        border:1px solid rgba(153,153,153,1);
        color:rgba(255,135,27,1);
      }
      &.zhizuozhong{
        background:linear-gradient(138deg,rgba(28,172,100,1) 0%,rgba(0,188,76,1) 100%);
        color:rgba(255,255,255,1);
      }
    }
  }
}
</style>
