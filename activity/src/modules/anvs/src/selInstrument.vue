<template>
  <div id="selInstrument">
    <div class="item" v-for="(item,index) in goodsList" :key="index" @click="acIndex=index">
      <div class="select" >
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
      <div class="cover">
        <img :src="item.goods_cover_url" alt>
      </div>
      <div class="content">
        <div class="title">{{item.goods_title}}</div>
        <div class="content_all">
          <div class="line1">{{item.goods_detail.remark}}</div>
          <div class="line2">供货价：<span class="text-decoration-lt">{{item.goods_detail.old_price}}元</span></div>
        </div>
      </div>
      
    </div>
    <div @click="goNext" class="btn next_step">下一步</div>
    <Wechat />
  </div>
</template>
<script>
import Wechat from "../../../components/Wechat";

export default {
  data() {
    return {
      acIndex: 0,
      goodsList: []
    };
  },
  components:{
    Wechat
  },
  created() {
    this.goodsList = JSON.parse(localStorage.getItem("goods_data"));
    console.log(this.goodsList);
    document.title='选择乐器'
  },
  methods:{
    goNext(){
      let selectItem = this.goodsList[this.acIndex];
      localStorage.setItem('selectItem',JSON.stringify(selectItem));
      this.$router.push('/address')
    }
  }
};
</script>
<style lang="less" scoped>
#selInstrument{
  min-height: 100vh;
  background:rgba(248,248,248,1);

}
.item {
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 20px;
  .select {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    img {
      width: 100%;
    }
  }
  .cover {
    width: 80px;
    height: 80px;
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
    flex-grow: 1;
    height: 80px;
    .title {
      font-size: 16px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .content_all {
      font-size: 12px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
      .line1{
        margin-bottom: 3px;
      }
    }
  }
}

</style>

