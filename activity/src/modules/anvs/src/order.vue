<template>
  <div>
    <div class="address_item">
      <div class="left">
        <img src="../../../assets/img/common/location.png" alt>
      </div>
      <div class="right">
        <div class="line1">
          <span class="name">{{form.name}}</span>
          <span class="phone">{{form.phone}}</span>
        </div>
        <div class="line2">{{form.zone + ' ' +form.address}}</div>
      </div>
    </div>
    <div class="item">
      <div class="cover">
        <img :src="item.goods_cover_url" alt>
      </div>
      <div class="content">
        <div class="title">{{item.goods_title}}</div>
        <div class="content_all">
          <div class="line1">型号：音乐壳定制</div>
          <div class="line2">
            供货价：
            <span class="text-decoration-lt">{{item.goods_detail.old_price}}元</span>
          </div>
        </div>
      </div>
    </div>
    <div class="btn next_step" @click="submit">兑换</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      item: {},
      form: {}
    };
  },
  created() {
    this.item = JSON.parse(localStorage.getItem("selectItem"));
    this.form = JSON.parse(localStorage.getItem("instrumentForm"));
    console.log(this.form);
  },
  methods: {
    submit() {
      this.axios
        .post(
          `http://58.87.125.111:55555/v1/active_code_anniversary`,
          this.form
        )
        .then(res => {
          if (!res.error) {
            sessionStorage.setItem("need_instrument", res.need_instrument);
            sessionStorage.setItem("need_vip", res.need_vip);
            this.$router.push("/success");
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
.address_item {
  background-color: #fff;
  display: flex;
  align-items: center;
  padding: 20px;
  margin-bottom: 10px;
  .left {
    width: 48px;
    height: 48px;
    margin-right: 16px;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .right {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    flex-grow: 1;
    min-height: 50px;
    .line1 {
      font-size: 14px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
      margin-bottom: 3px;
      .name {
        margin-right: 12px;
      }
      .phone {
        color: rgba(153, 153, 153, 1);
      }
    }
    .line2 {
      font-size: 14px;
      font-family: PingFang-SC-Regular, PingFang-SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
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
      .line1 {
        margin-bottom: 3px;
      }
    }
  }
}
</style>

