<template>
  <div>
    <Header></Header>
    <div>
        <Player :song="song"></Player>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Header from "./../components/Header";
import Footer from "./../components/Footer";
import Player from './../components/player/Player'
export default {
    data(){
        return{
            song:{
                name:'安静',
                singer:'周杰伦',
                cover:'https://img3.doubanio.com/view/subject/m/public/s27288751.jpg',
                src:'http://111.202.85.153/amobile.music.tc.qq.com/C400004UWMHQ3OuZDy.m4a?guid=1076652879&vkey=56820C42EFF537493684DAC40FB303271C2A9DDB89A3F839A6DB9F0A8CB3122F14092FDF1AFC63C166606306CF18155F755B98C55378A328&uin=542&fromtag=66'
            }
        }
    },
  components: {
    Header,
    Footer,
    Player
  },
  mounted(){
    this.getSongDetail()
  },
  methods:{
    getSongDetail(){
      this.axios.get(`${process.env.LIUXIN}/music/songs/${this.$route.params.id}`).then(res => {
        this.song = res.data;
      });
    }
  }
};
</script>

