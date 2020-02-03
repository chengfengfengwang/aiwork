<template>
  <div>
    <Header></Header>
    <div class="bank_wrapper wrapper">
      <router-link :to="'/Play/'+song.id" class="song_item" v-for="song in songs" :key="song.id">
        <div class="cover">
          <img :src="song.cover" alt>
        </div>
        <div class="song_name">{{song.title}}</div>
        <div class="singer">{{song.singer.name}}</div>
        <!-- <div class="time">2019-04-16</div> -->
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
      songs: [],
      total:0,
      page:0,
      pageSize:10
    };
  },
  mounted() {
    this.getSongs();
  },
  methods: {
    pageChange(page) {
      this.page = page - 1;
      this.getSongs();
    },
    getSongs() {
      this.axios.get(`${process.env.LIUXIN}/music/songs/?page=${this.page}&size=${
            this.pageSize
          }`).then(res => {
        this.songs = res.data;
        this.total = res.total
      });
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
.song_item {
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
.song_item:hover {
  .cover img {
    transform: scale(1.2);
  }
}
</style>



