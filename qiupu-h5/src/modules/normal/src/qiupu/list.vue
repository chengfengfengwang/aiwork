<template>
  <div id="main">
    <Nav :backShow="false">求谱墙</Nav>
    <!--mescroll滚动区域的基本结构-->
    <div class="content" id="content">
      <mescroll-vue ref="mescroll" :down="mescrollDown" :up="mescrollUp" @init="mescrollInit">
        <div
          class="list_item"
          v-for="(item,index) in dataList"
          :key="item.id"
        >
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
            @click="vote(item,index)"
            class="status"
            :class="{yiqiu:item.is_vote_msg=='已求',tongqiu:item.is_vote_msg=='同求',zhizuozhong:item.is_vote_msg=='制作中'}"
          >{{item.is_vote_msg}}</div>
        </div>
      </mescroll-vue>
    </div>
    <div @click="goApply" class="apply">
      <img src="../../../../assets/img/normal/qiupu/add.jpg" alt>
    </div>
  </div>
</template>
			
<script>
// 引入mescroll的vue组件
import MescrollVue from "mescroll.js/mescroll.vue";
import Nav from "./../../../../components/Nav";
import { Toast } from "vant";

export default {
  components: {
    Nav,
    MescrollVue // 注册mescroll组件
  },
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
        // toTop: {
        //   //回到顶部按钮
        //   src: "./static/mescroll/mescroll-totop.png", //图片路径,默认null,支持网络图
        //   offset: 1000 //列表滚动1000px才显示回到顶部按钮
        // },
        empty: {
          //列表第一页无任何数据时,显示的空提示布局; 需配置warpId才显示
          warpId: "content", //父布局的id (1.3.5版本支持传入dom元素)
          icon: "./mescroll/mescroll-empty.png", //图标,默认null,支持网络图
          tip: "暂无相关数据~" //提示
        }
      },
      dataList: [], // 列表数据
      page: 0,
      size: 10,
      menuIndex: 0,
      list: [],
      loading: false,
      finished: false
    };
  },
  beforeRouteEnter(to, from, next) {
    // 如果没有配置顶部按钮或isBounce,则beforeRouteEnter不用写
    next(vm => {
      // 滚动到原来的列表位置,恢复顶部按钮和isBounce的配置
      vm.$refs.mescroll && vm.$refs.mescroll.beforeRouteEnter();
    });
  },
  beforeRouteLeave(to, from, next) {
    // 如果没有配置顶部按钮或isBounce,则beforeRouteLeave不用写
    // 记录列表滚动的位置,隐藏顶部按钮和isBounce的配置
    this.$refs.mescroll && this.$refs.mescroll.beforeRouteLeave();
    next();
  },
  mounted(){
  },
  methods: {
    vote(item,index){
      //localhost:8002
      if(item.is_vote_msg!=='同求'){
        return
      }
      
      this.axios
        .put(`${process.env.VUE_APP_QIUPU}/vote_request_score`, {
          id:item.id
        })
        .then(res => {
          if(!res.error){
            Toast({
              message: "投票成功",
              duration: 2000
            });
            //本地修改为已求状态
            item.is_vote_msg = '已求';
            this.list.splice(index,1,item)
          }
          
        })
    },
    goQupuDetail() {
      console.log('goQupuDetail')
      location.href = "uniwebview://qupu_detail?id=5ec79ab3dff4144ee386c0ad";
    },
    goApply() {
      this.$router.push("/qiupu_apply");
    },
    getList(pageNum, pageSize, successCallback, errCallback) {
      //var pageNum = page.num; // 页码, 默认从1开始 如何修改从0开始 ?
      this.axios
        .get(`${process.env.VUE_APP_QIUPU}/request_scores`, {
          params: {
            page: pageNum, // 页码
            size: pageSize // 每页长度
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
/*通过fixed固定mescroll的高度*/
.mescroll {
  position: fixed;
  top: 44px;
  bottom: 0;
  height: auto;
}
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
  .list_item {
    margin: 24px 0;
    padding: 0 16px;
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
        border: 1px solid #FF641E;
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
.apply {
  position: fixed;
  bottom: 30px;
  left: 50%;
  transform: translate(-50%);
  width: 80px;
  img {
    width: 100%;
  }
}
</style>