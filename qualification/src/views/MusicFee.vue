<template>
  <div>
    <Header></Header>
    <div class="bank_wrapper wrapper">
      <div class="message_item">
        <div class="song_name">聆听好音乐，拥有好情绪（查看本文收费2元）</div>
        <div class="singer">音乐总是与情绪紧紧相连的。我执著于这样一种温情一种感动，我也总是会因为一首歌词而喜欢一首歌，因为喜欢一首歌而去喜欢一种情绪。音乐是人类爱和智慧的升华，是对人类完美未来的憧憬与呼唤。。。</div>
        <!-- <div class="time">2019-04-16</div> -->
      </div>
      <div class="message_item">
        <div class="song_name">聆听音乐（查看本文收费2元）</div>
        <div class="singer">听得最多的便是钢琴，钢琴声总能给我一种说不出的感觉。这种声音是那样美妙，就像清澈的溪水从你心里流过。以前听过一首曲子，曲名是《少女的祈祷》，那是怎样的一首曲子啊，我似乎看到了一个亭亭玉立的少女，她穿着白色的连衣裙，像一朵百合花，那样纯洁、那样美丽。她轻轻地闭上了双眼，双手合在一齐，在月光下默默地祈祷着什么，我心随着音乐还在那里荡漾……</div>
        <!-- <div class="time">2019-04-16</div> -->
      </div>
      <div class="message_item">
        <div class="song_name">音乐的味道（查看本文收费2元）</div>
        <div class="singer">人类的感情丰富而敏感，生活的一点一滴都会拨动我们的心弦，引发人类最初的感动和想望。于是有了音乐，音乐成了我们最好的宣泄方式，音乐里每一个跳动的音符，都把我们的内心世界张扬得淋漓尽致，活灵活现。音乐能够倾诉，有倾诉者便有了倾听者，用一颗细腻温柔的心去倾听那一片无边无际的广阔内心世界，和音乐共起伏，和音乐背后那一颗心同忧共苦，享受每一个跳动的音符里所承载的酸甜苦辣。。。。</div>
        <!-- <div class="time">2019-04-16</div> -->
      </div>
      <div class="message_item">
        <div class="song_name">音乐使我陶醉（查看本文收费2元）</div>
        <div class="singer">每一样事物都有不同的好处，每一样东西都有令人陶醉的地方。音乐，令我陶醉，问我为什么？只因为音乐有它的独特的魅力，使我陶醉，使我坚强，勇敢，音乐里面令人产生了遐想，就如同美丽的月光，音乐令我。。。。</div>
        <!-- <div class="time">2019-04-16</div> -->
      </div>
      <div class="message_item">
        <div class="song_name">音乐的魅力（查看本文收费2元）</div>
        <div class="singer">这天，我欣赏了一身闻名中外的钢琴名曲，名叫《牧童短笛》，让我在音乐的海洋中漫游、陶醉。

　　这首钢琴曲是悠扬、自在的。听了这首美妙的钢琴曲，我仿佛深陷其中，思维好像穿越到无拘无束、快活自在的农村生活。。。。</div>
        <!-- <div class="time">2019-04-16</div> -->
      </div>
    </div>
    <div class="wrapper page_wrapper">
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
    // this.getSongs();
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
.message_item {
  width: 80%;
  padding: 0 10px;
  margin: 40px;
  font-size: 14px;
  box-sizing: border-box;
  line-height: 21px;
  overflow: hidden;
  .song_name{
    font-size: 20px;
  }
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



