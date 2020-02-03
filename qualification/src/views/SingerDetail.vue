<template>
  <div>
    <Header></Header>
    <div class="info wrapper">
      <div class="avatar">
        <img
          :src="singer.avatar"
          alt
        >
      </div>
      <div class="detail">
        <div class="name">{{singer.name}}</div>
        <div class="other">
          <div class="other_row">
            <div>性别：男</div>
            <div>身高：{{length}}cm</div>
          </div>
          <div class="other_row">
            <div>生日：{{singer.birthday}}</div>
            <div>出生地：{{singer.address}}</div>
          </div>
          <!-- <div class="other_row">
            <div>星座：双鱼</div>
          </div> -->
        </div>
      </div>
    </div>
    <div class="wrapper">
        <h2>简介</h2>
        <div class="introduction">
            {{singer.introduction}}
        </div>
    </div>
    <div class="wrapper">
        <h2>热门歌曲</h2>
        <ul class="song_list">
            <li class="song_row">
                <div class="index"></div>
                <div class="name">歌曲</div>
                <div class="album">专辑</div>
                <div class="time">时长</div>
            </li>
            <router-link :key="song.id" :to="'/Play/' + song.id" tag="li" class="song_row" v-for="(song,index) in singer.songs">
                <div class="index">{{index + 1}}</div>
                <div class="name">{{song.title}}</div>
                <div class="album">{{song.album}}</div>
                <div class="time">{{song.duration}}</div>
            </router-link>
        </ul>
    </div>
    <Footer></Footer>
  </div>
</template>
<style lang="less" scoped>
.song_list{
    font-size: 14px;
    .song_row{
        display: flex;
        //justify-content: space-around;
        padding: 20px 20px;
        .index{
            color: #999;
            width: 5%;
            flex-grow: 0;
        }
        .name{
            color: #999;
            width: 47%;
        }
        .album{
            color: #333;
            width: 40%;
        }
        .time{
            color: #999
        }
    }
    .song_row:nth-child(2n-1){
        background-color: #f2f2f2
    }
}
.info {
  display: flex;
  align-items: center;
  margin: 50px auto;
  .avatar {
    width: 250px;
    height: 250px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
  .detail {
      font-size: 14px;
      margin-left: 60px;
    .name {
      font-size: 38px;
      font-weight: 400;
      margin-bottom: 30px;
    }
    .other_row{
        width: 400px;
        display: flex;
        justify-content: space-between;
        margin-bottom: 7px;
    }
  }
}
.introduction{
    font-size: 14px
}
</style>

<script>
import Header from "./../components/Header";
import Footer from "./../components/Footer";
export default {
  components: {
    Header,
    Footer
  },
  data(){
    return{
      id:'',
      singer:{},
      length:Math.floor(Math.random()*10) + 170
    }
  },
  created(){
      this.id = this.$route.params.id
  },
  mounted(){
    this.getSingerDetail()
  },
  methods:{
    getSingerDetail(){
      this.axios.get(`${process.env.LIUXIN}/music/singers/${this.id}`).then(res => {
        this.singer = res.data;
      });
    }
  }
};
</script>

