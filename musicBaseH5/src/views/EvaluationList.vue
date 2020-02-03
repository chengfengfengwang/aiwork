<template>
  <section class="evaluation">
    <Nav
  title="评论"
  left-text="返回"
  left-arrow
  style="background:#fff"
/>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <ul>
        <li v-for="(item,index) in evaluaList" :key="index" class="evaluation_item">
          <div class="item_header">
            <div class="item_header_left">
              <div class="avatar_wrapper">
                <img
                  :src="item.avatar_url"
                  alt
                >
              </div>
              <span class="name">{{item.nickname}}</span>
            </div>
            <div class="item_header_right">{{formatTime(item.create_time)}}</div>
          </div>
          <div class="item_content">{{item.message}}</div>
        </li>
      </ul>
    </van-list>

    <!-- <div class="evaluation_item">
      <div class="item_header">
        <div class="item_header_left">
          <div class="avatar_wrapper">
            <img
              src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg"
              alt
            >
          </div>
          <span class="name">AIMUSIC_0621</span>
        </div>
        <div class="item_header_right">2018-12-02</div>
      </div>
      <div class="item_content">人们在被命运眷宠的时候，勇、怯、强、弱、智、愚、贤、不肖，都看不出什么分别来可是一旦为幸运所抛弃，开始涉历惊涛骇浪的时候</div>
    </div>
    <div class="evaluation_item">
      <div class="item_header">
        <div class="item_header_left">
          <div class="avatar_wrapper">
            <img
              src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4259300811,497831842&fm=26&gp=0.jpg"
              alt
            >
          </div>
          <span class="name">AIMUSIC_0621</span>
        </div>
        <div class="item_header_right">2018-12-02</div>
      </div>
      <div class="item_content">人们在被命运眷宠的时候，勇、怯、强、弱、智、愚、贤、不肖，都看不出什么分别来可是一旦为幸运所抛弃，开始涉历惊涛骇浪的时候</div>
    </div>-->
  </section>
</template>
<script>
import { List, Cell } from "vant";
import Nav from '../components/Nav';
import { getQueryVariable, formatTime } from "../utils/util.js";
export default {
  data() {
    return {
      evaluaList: [],
      loading: false,
      finished: true
    };
  },
  components: {
    "van-list": List,
    Nav
  },
  mounted(){
    console.log(this.$route.params.evaluaList);
    this.evaluaList = this.$route.params.evaluaList;
  },
  methods: {
    formatTime:formatTime,
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 98500);
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./../assets/css/common.less");
.van-list__loading-text{
    font-size: 18px !important;
    color: yellow !important
}
.evaluation {
  //background-color: #fff;
  .evaluation_item {
    margin: 30px;
    &:last-of-type {
      margin-bottom: 0;
    }
    padding: 0 30px;
    background: #ffffff;
    box-shadow: 0 14px 20px 0 rgba(0, 0, 0, 0.04);
    border-radius: 20px;
    .item_header {
      display: flex;
      align-items: center;
      padding: 20px 0;
    }
    .item_header_left {
      flex-grow: 1;
      display: flex;
      align-items: center;
      .avatar_wrapper {
        margin-right: 20px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .name {
        font-family: PingFangSC-Medium;
        font-size: 28px;
        color: #333333;
      }
    }
    .item_header_right {
      font-family: PingFangSC-Medium;
      font-size: 22px;
      color: #999999;
    }
    .item_content {
      padding-bottom: 20px;
      font-family: PingFangSC-Regular;
      font-size: 24px;
      color: #333333;
      letter-spacing: 0;
      text-align: justify;
      line-height: 36px;
    }
  }
}
</style>


