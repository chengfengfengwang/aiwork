<template>
  <div id="selInstrument">
    <div class="item" v-for="(item,index) in goodsList" :key="index" @click="acIndex=index">
      <div class="select">
        <img
          v-show="acIndex!=index"
          src="../../../assets/img/common/no_select.png"
          alt
          class="item_select_status"
        >
        <img
          v-show="acIndex==index"
          src="../../../assets/img/common/select.png"
          alt
          class="item_select_status"
        >
      </div>
      <div class="cover" @click.stop="goDetail(item.goods_detail.detail_url)">
        <img :src="item.goods_cover_url" alt>
      </div>
      <div @click.stop="goDetail(item.goods_detail.detail_url)" class="content">
        <div class="content_top">
          <div class="title">{{item.goods_title}}</div>
          <div class="line1">{{item.goods_detail.remark}}</div>
          <div class="line2">
            供货价：
            <span class="text-decoration-lt">{{item.goods_detail.old_price}}元</span>
          </div>
        </div>
        <div class="content_bottom">{{item.goods_detail.desc.point}}</div>
      </div>
    </div>
    <div @click="goNext" class="btn next_step">下一步</div>
    <Wechat/>
  </div>
</template>
<script>
import Wechat from "../../../components/Wechat";

export default {
  inject: ["status"],
  data() {
    return {
      acIndex: 0,
      goodsList: []
    };
  },
  components: {
    Wechat
  },
  created() {
    this.goodsList = JSON.parse(sessionStorage.getItem("goods_data"));
    console.log(this.goodsList);
    document.title = "选择乐器";
  },
  methods: {
    goDetail(url){
      location.href = url
    },
    goNext() {
      let selectItem = this.goodsList[this.acIndex];
      sessionStorage.setItem("selectItem", JSON.stringify(selectItem));
      this.$router.push("/address");
    }
  }
};
</script>
<style lang="less" scoped>
#selInstrument {
  min-height: 100vh;
  background: rgba(248, 248, 248, 1);
}
.item {
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 20px;
  .select {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    img {
      width: 100%;
    }
  }
  .cover {
    flex-shrink: 0;
    width: 90px;
    height: 90px;
    margin-right: 16px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    flex-grow: 1;
    min-height: 90px;
    .title {
      font-size: 16px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .line1,
    .line2 {
      font-size: 12px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }
    .line1 {
      margin-bottom: 3px;
    }
    .content_bottom {
      flex-grow: 0;
      padding: 0 7px;
      //display: inline-block;
      background: rgba(255, 87, 38, 1);
      border-radius: 8px;
      font-size: 10px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
}
</style>

