<template>
  <div id="main">
    <Nav>求谱墙</Nav>
    <div class="content">
      <div class="list_wrapper">
        <van-list v-model="loading" :finished="finished" finished-text @load="getList">
          <div class="list_item" v-for="(item,index) in list" :key="item.id">
            <div class="index">{{index+1}}</div>
            <div class="qupu">
              <div class="title">{{item.name}}</div>
              <div>
                <span class="author">{{item.author}}</span>
                <span class="type">{{item.instrument_type_msg}}</span>
              </div>
            </div>
            <div class="num">{{item.vote_score}}</div>
            <div
              class="status"
              :class="{yiqiu:item.status_msg=='已求',tongqiu:item.status_msg=='同求',zhizuozhong:item.status_msg=='制作中'}"
            >{{item.status_msg}}</div>
          </div>
        </van-list>
      </div>
    </div>
  </div>
</template>
<script>
import Nav from "./../../../../components/Nav";
import { List } from "vant";

export default {
  data() {
    return {
      page: 0,
      size: 10,
      menuIndex: 0,
      list: [],
      loading: false,
      finished: false
    };
  },
  created() {
    //this.getList();
  },
  components: {
    Nav,
    "van-list": List
  },
  methods: {
    getList() {
      this.axios
        .get(
          `${process.env.VUE_APP_QIUPU}/request_scores?page=${this.page}&size=${
            this.size
          }`
        )
        .then(res => {
          this.loading = false;
          this.page++;
          var resList = res.data.api_request_sheet_music_wall;
          if (resList && resList.length > 0) {
            this.list = this.list.concat(resList);
          } else {
            this.finished = true;
          }
        });
    }
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
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      &.yiqiu {
        border: 1px solid rgba(153, 153, 153, 1);
        color: rgba(153, 153, 153, 1);
      }
      &.tongqiu {
        border: 1px solid rgba(153, 153, 153, 1);
        color: rgba(255, 135, 27, 1);
      }
      &.zhizuozhong {
        background: linear-gradient(
          138deg,
          rgba(28, 172, 100, 1) 0%,
          rgba(0, 188, 76, 1) 100%
        );
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}

</style>
