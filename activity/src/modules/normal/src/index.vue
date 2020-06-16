<template>
  <div id="main">
    <img src="../../../assets/img/normal/normal/qr612.png" alt="" class="qr">
    <div class="text">
      <div>
        <div class="text_title">扫码入群领取:</div>
1. 价值199元原创VIP课程电子资料包<br>
2. 有机会抽取价值999元电子琴等乐器<br>
3. 老师一对一辅导
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {}
  },
  created(){
    document.title='入群领取礼包';
    this.countPage('页面访问')
  },
  methods:{
     countPage(key) {
      // //http://api.yinji.immusician.com/v1/wechat/live_list
      // let postUrl = `${location.origin}${
      //   location.pathname
      // }?index=${getQueryVariable("index")}`;
      this.axios
        .post(
          "http://api.yinji.immusician.com/v1/operate/collect_page_visit/",
          {
            url: '音乐壳奖学金卡页面PV',
            key,
            uid: ''
          }
        )
        .then(res => {});
    },
  },
  components: {
    
  },
 
};
</script>
<style lang="less" scoped>
#main{
  text-align: center;
  .qr{
    width: 200px;
    margin: 30px auto 10px auto;
  }
  .text_title{
    margin-bottom: 3px
  }
  
}
</style>
