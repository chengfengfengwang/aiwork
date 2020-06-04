<template>
  <div id="main">
    <Nav>我的求谱</Nav>
    <div class="menus">
      <div
        v-for="(value,name,index) in statusList"
        @click="changeNav(name,index)"
        :key="index"
        class="menu_item"
        :class="{active:menuIndex==index}"
      >{{value}}</div>

      <!-- <div class="menu_item" :class="{active:menuIndex==1}">制谱中</div>
      <div class="menu_item" :class="{active:menuIndex==2}">已完成</div>
      <div class="menu_item" :class="{active:menuIndex==3}">未通过</div>-->
    </div>
    <div class="content">
      <div class="list_wrapper">
        <van-list v-model="loading" :finished="finished" finished-text @load="getMyData">
          <div class="list_item" v-for="(dataItem,index) in dataList" :key="index">
            <div class="index">{{index+1}}</div>
            <div class="qupu">
              <div class="title">{{dataItem.name}}</div>
              <div>
                <span class="author">{{dataItem.author}}</span>
                <span class="type">{{dataItem.instrument_type_msg}}</span>
              </div>
            </div>
            <div class="operate">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
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
      page:0,
      size:10,
      menuIndex: 0,
      dataList: [],
      statusList: [],
      curStatus:0,
      loading: false,
      finished: false
    };
  },
  created() {
    this.getStatusList();
    this.getMyData(0, 0);
  },
  components: {
    Nav,
    "van-list": List
  },
  methods: {
    changeNav(index,status){
      this.page = 0;
      this.finished = false;
      this.menuIndex = index;
      this.curStatus = status;
      this.dataList = [];
      this.getMyData()
    },
    getMyData() {
      this.axios
        .get(
          `http://192.168.2.129:8002/v1/my_request_scores?page=${this.page}&size=${this.size}&status=${this.curStatus}`
        )
        .then(res => {
          //this.dataList = res.data.api_request_sheet_music_wall;

          this.loading = false;
          this.page++;
          var resList = res.data.api_request_sheet_music_wall;
          if (resList && resList.length > 0) {
            this.dataList = this.dataList.concat(resList);
          } else {
            this.finished = true;
          }
        });
    },
    getStatusList() {
      this.axios
        .get(`http://192.168.2.129:8002/v1/score_wall_status`)
        .then(res => {
          this.statusList = res.data;
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
    justify-content: space-between;
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
    .operate {
      display: flex;
      justify-content: center;
      align-items: center;
      .dot {
        background-color: #999;
        width: 3px;
        height: 3px;
        margin: 0 1.5px;
        border-radius: 50%;
      }
    }
  }
}
</style>
