<template>
  <div>
    <Header></Header>
    <div class="bank_wrapper wrapper">
      <router-link :to="'/SingerDetail/' + singer.id" :key="singer.id" class="singer_item" v-for="singer in singers" @click="toSingerDetail">
        <div class="cover">
          <img :src="singer.avatar" alt>
        </div>
        <div class="singer_name">{{singer.name}}</div>
      </router-link>
    </div>
     <div class="wrapper page_wrapper">
      <Page
        @on-change="pageChange"
        :total="total"
        :page-size="pageSize"
      />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./../components/Header";
import Footer from "./../components/Footer";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      singers: [],
      total: 0,
      page:0,
      pageSize:10
    };
  },
  mounted() {
    this.getSingerList();
  },
  methods: {
    pageChange(page) {
      this.page = page - 1;
      this.getSongs();
    },
    getSingerList() {
      this.axios.get(`${process.env.LIUXIN}/music/singers/?page=${this.page}&size=${
            this.pageSize
          }`).then(res => {
        this.singers = res.data;
        this.total = res.total;
      });
    },
    toSingerDetail() {
      this.$router.push("singerDetail");
    }
  }
};
</script>
<style lang="less" scoped>
.bank_wrapper {
  margin: 150px auto 50px auto;
  display: flex;
  flex-wrap: wrap;
}
.singer_item {
  width: 20%;
  padding: 0 10px;
  margin-bottom: 40px;
  font-size: 14px;
  box-sizing: border-box;
  line-height: 21px;
  overflow: hidden;
  .cover {
    width: 224px;
    height: 224px;
    overflow: hidden;
    margin-bottom: 10px;
    img {
      width: 100%;
      height: 100%;
      transition: all 0.5s;
    }
  }
  .singer,
  .time {
    color: #999;
  }
}
.singer_item:hover {
  .cover img {
    transform: scale(1.2);
  }
}
</style>


