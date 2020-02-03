<template>
  <div>
    <Header></Header>
    <section id="indexBannerSwiper" class="swiper-container">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <!-- <div class="swiper-slide slide1"></div> -->
        <div class="swiper-slide" :style="{backgroundImage: 'url(' + banner.img + ')' }" v-for="banner in banners">
          <!-- <img :src="banner.img" alt=""> -->
        </div>
        <!-- <div class="swiper-slide">Slide 3</div> -->
      </div>
      <div class="swiper-pagination"></div>
    </section>
    <section class="wrapper" id="singer">
      <h2>热门歌手</h2>
      <div class="singer_row">
        <!-- <router-link to="/SingerDetail/123"></router-link> -->
        <router-link
          :to="'/SingerDetail/' + singer.id"
          tag="div"
          class="singer_item"
          v-for="singer in singers"
          :key="singer.id"
        >
          <img :src="singer.avatar" alt>
          <div class="name">{{singer.name}}</div>
          <div class="content">{{singer.introduction}}</div>
        </router-link>
      </div>
    </section>
    <section class="wrapper" id="song">
      <h2>推荐歌曲</h2>
      <div class="song_row">
        <router-link :to="'/Play/' + song.id" v-for="song in recommendSongs" class="song_item" :key="song.id">
          <img :src="song.cover" alt>
          <div class="name">{{song.title}}</div>
        </router-link>
      </div>
    </section>
    <section class="wrapper" id="rank">
      <h2>排行榜</h2>
      <div class="rank_wrapper">
        <div class="rank_item">
          <p class="rank_title first">新歌榜</p>
          <router-link
            tag="p"
            :to="'/Play/' + song.id"
            v-for="(song,index) in recentSongs"
            :key="song.id"
          >
            <span class="rank_index">{{index + 1}}</span>
            {{song.title}}
            <span class="singer">{{song.singer.name}}</span>
          </router-link>
        </div>
        <div class="rank_item">
          <p class="rank_title second">热歌榜</p>
          <router-link
            tag="p"
            :to="'/Play/' + song.id"
            v-for="(song,index) in hotSongs"
            :key="song.id"
          >
            <span class="rank_index">{{index + 1}}</span>
            {{song.title}}
            <span class="singer">{{song.singer.name}}</span>
          </router-link>
        </div>
      </div>
    </section>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  data() {
    return {
      singers: [],
      recentSongs: [],
      hotSongs: [],
      recommendSongs: [],
      banners: []
    };
  },
  components: {
    Header,
    Footer
  },
  mounted() {
    this.getHotSingers();
    this.getHotSongs();
    this.getRecentSongs();
    this.getRecommendSongs();
    this.getBanners();
  },
  methods: {
    getBanners() { 
      this.axios.get(`${process.env.LIUXIN}/music/banners/`).then(res => {
        this.banners = res.data;
        this.$nextTick(()=>{
          this.initBannerSwiper();
        })
        
      });
    },
    getRecentSongs() {
      this.axios.get(`${process.env.LIUXIN}/music/songs/newest/`).then(res => {
        this.recentSongs = res.data;
      });
    },
    getHotSingers() {
      this.axios.get(`${process.env.LIUXIN}/music/singers/hot/`).then(res => {
        this.singers = res.data;
      });
    },
    getHotSongs() {
      this.axios.get(`${process.env.LIUXIN}/music/songs/hot/`).then(res => {
        this.hotSongs = res.data;
      });
    },
    getRecommendSongs() {
      this.axios
        .get(`${process.env.LIUXIN}/music/songs/recommend/`)
        .then(res => {
          this.recommendSongs = res.data;
        });
    },
    initBannerSwiper() {
      var mySwiper = new Swiper("#indexBannerSwiper", {
        direction: "horizontal",
        //loop: true
        pagination: {
          el: ".swiper-pagination",
          clickable: true
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#rank {
  .rank_wrapper {
    display: flex;
    justify-content: space-around;
    font-size: 16px;
    .rank_item {
      width: 40%;
      background-color: #f2f2f2;
      & > p {
        padding: 10px 30px;
      }
      .rank_title {
        text-align: center;
        color: #fff;
      }
      .rank_title.first {
        background-color: #ef4747;
      }
      .rank_title.second {
        background-color: #febd16;
      }
      .rank_index {
        margin-right: 10px;
      }
      .singer {
        float: right;
      }
    }
  }
}
#song {
  .song_row {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    text-align: center;
    .song_item {
      flex: 0 0 20%;
      margin-bottom: 20px;
    }
    img {
      width: 150px;
      height: 150px;
    }
    .name {
      font-weight: 700;
      font-size: 14px;
      color: #4a4a4a;
      //margin-bottom: 5px;
    }
    .author {
      font-size: 13px;
    }
  }
}
#singer {
  .singer_row {
    display: flex;
    justify-content: space-around;
    text-align: center;
    img {
      width: 160px;
      height: 160px;
      border-radius: 50%;
    }
    .name {
      font-weight: 700;
      font-size: 14px;
      color: #4a4a4a;
      margin-bottom: 5px;
    }
    .content {
      text-align: left;
      padding: 0 20px;
      font-size: 13px;
    }
  }
}
#indexBannerSwiper.swiper-container {
  width: 100%;
  height: 650px;
  .swiper-slide{
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }
  .slide1 {
    //background: url("./../assets/img/banner_index_1.png") no-repeat center;
    //background-size: cover;
  }
}
</style>


