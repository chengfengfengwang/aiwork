<template>
  <div id="main">
    <Nav :meShow="false">我的求谱</Nav>
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
    <div class="content" id="content">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div class="list_item" v-for="(dataItem,index) in dataList" :key="index">
          <div class="index">{{index+1}}</div>
          <div class="qupu">
            <div class="title">{{dataItem.name}}</div>
            <div>
              <span class="author">{{dataItem.author}}</span>
              <span class="type">{{dataItem.instrument_type_msg}}</span>
            </div>
          </div>
          <!-- <div class="operate">
            <div class="dot"></div>
            <div class="dot"></div>
            <div class="dot"></div>
          </div> -->
        </div>
      </mescroll-vue>
    </div>
  </div>
</template>
<script>
import MescrollVue from "mescroll.js/mescroll.vue";

import Nav from "./../../../../components/Nav";
import { List } from "vant";

export default {
  data() {
    return {
      mescroll: null, // mescroll实例对象
      mescrollDown: {
        use: false,
        auto: false,
        callback: this.downCallback
      }, //下拉刷新的配置. (如果下拉刷新和上拉加载处理的逻辑是一样的,则mescrollDown可不用写了)
      mescrollUp: {
        // 上拉加载的配置.
        callback: this.upCallback, // 上拉回调,此处简写; 相当于 callback: function(page, mescroll) { }
        //以下是一些常用的配置,当然不写也可以的.
        page: {
          num: 0, //当前页 默认0,回调之前会加1; 即callback(page)会从1开始
          size: 10 //每页数据条数,默认10
        },
        loadFull: {
          use: true, //use : 列表数据过少,不足以滑动触发上拉加载,是否自动加载下一页,直到满屏或无数据; 默认false,因为可调大page.size使数据满屏.
          delay: 500 //delay : 延时执行的毫秒数; 延时是为了保证列表数据或占位的图片都已初始化完成,且下拉刷新上拉加载中区域动画已执行完毕;
        },
        htmlNodata: '<p class="upwarp-nodata">-- END --</p>',
        noMoreSize: 0, //如果列表已无数据,可设置列表的总数量要大于5才显示无更多数据;
        //避免列表数据过少(比如只有一条数据),显示无更多数据会不好看
        //这就是为什么无更多数据有时候不显示的原因
        toTop: {
          //回到顶部按钮
          src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
          offset: 1000 //列表滚动1000px才显示回到顶部按钮
        },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "content", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "http://cdn.kids.immusician.com/mescroll-empty.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      page: 0,
      size: 10,
      menuIndex: 0,
      dataList: [],
      statusList: [],
      curStatus: 0,
      loading: false,
      finished: false
    };
  },
  created() {
    this.getStatusList();
  },
  components: {
    Nav,
    "van-list": List,
    MescrollVue
  },
  methods: {
    changeNav(index, status) {
      this.menuIndex = index;
      this.curStatus = status;
      this.dataList = []; // 在这里手动置空列表,可显示加载中的请求进度
      this.mescroll.resetUpScroll(); // 将page.num=1,再触发up.callback
    },

    getStatusList() {
      this.axios
        .get(`${process.env.VUE_APP_QIUPU}/score_wall_status`)
        .then(res => {
          this.statusList = res.data;
        });
    },
    getList(pageNum, pageSize, successCallback, errCallback) {
      //var pageNum = page.num; // 页码, 默认从1开始 如何修改从0开始 ?
      this.axios
        .get(`${process.env.VUE_APP_QIUPU}/my_request_scores`, {
          params: {
            page: pageNum, // 页码
            size: pageSize, // 每页长度
            status: this.curStatus
          }
        })
        .then(res => {
          let data = res.data.api_request_sheet_music_wall;
          let resList = [];
          if (data) {
            resList = data;
          } else {
            resList = [];
          }
          successCallback(resList);
        })
        .catch(errCallback);
    },
    // mescroll组件初始化的回调,可获取到mescroll对象
    mescrollInit(mescroll) {
      this.mescroll = mescroll; // 如果this.mescroll对象没有使用到,则mescrollInit可以不用配置
    },
    //下拉回调
    downCallback(mescroll) {
      //var pageNum = page.num; // 页码, 默认从1开始 如何修改从0开始 ?
      var pageNum = 0;
      var pageSize = 10; // 页长, 默认每页10条
      this.getList(
        pageNum,
        pageSize,
        data => {
          this.dataList = [];
          this.dataList = this.dataList.concat(data);
          this.$nextTick(() => {
            mescroll.endSuccess();
          });
        },
        () => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr();
        }
      );
    },
    // 上拉回调 page = {num:1, size:10}; num:当前页 ,默认从1开始; size:每页数据条数,默认10
    upCallback(page, mescroll) {
      //var pageNum = page.num; // 页码, 默认从1开始 如何修改从0开始 ?
      var pageNum = page.num - 1;
      var pageSize = page.size; // 页长, 默认每页10条
      this.getList(
        pageNum,
        pageSize,
        data => {
          if (pageNum === 0) this.dataList = [];
          this.dataList = this.dataList.concat(data);
          this.$nextTick(() => {
            mescroll.endSuccess(data.length);
          });
        },
        () => {
          // 联网失败的回调,隐藏下拉刷新和上拉加载的状态;
          this.mescroll.endErr();
        }
      );
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
