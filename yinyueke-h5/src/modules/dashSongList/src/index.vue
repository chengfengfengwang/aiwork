<template>
  <div id="dashSong">
    <div class="page_title">
      <img src="../../../assets/img/dashSongList/picl.png" alt class="left">
      <img src="../../../assets/img/dashSongList/picr.png" alt class="right">
      <div>音基冲刺练习册歌单</div>
      <div>听力练习表</div>
    </div>
    <div class="main">
      <div class="lesson_wrapper" v-for="(lesson,index) in dataArr" :key="index">
        <div class="lesson" @click="toggleLesson(index,$event)">
          {{lesson.title}}
          <img
            v-show="lesson.showDetail"
            class="arrow"
            src="../../../assets/img/dashSongList/arrow_d.png"
            alt
          >
          <img
            v-show="!lesson.showDetail"
            class="arrow"
            src="../../../assets/img/dashSongList/arrow_r.png"
            alt
          >
        </div>
        <div class="point_wrapper" v-show="lesson.showDetail">
          <div
            @click="goPlay(point.title,point.audioName)"
            v-for="point in  lesson.detail"
            :key="point.title"
            class="test_point"
          >{{point.title}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
var dicArr = [
  {
    title: "第七课",
    detail: [
      { title: "7课-考点1-1题", audioName: "1-1-1" },
      { title: "7课-考点1-2题", audioName: "1-1-2" },
      { title: "7课-考点1-3题", audioName: "1-1-3" },
      { title: "7课-考点1-4题", audioName: "1-1-4" },
      { title: "7课-考点2-5题", audioName: "1-2-1" },
      { title: "7课-考点2-6题", audioName: "1-2-2" },
      { title: "7课-考点2-7题", audioName: "1-2-3" },
      { title: "7课-考点2-8题", audioName: "1-2-4" },
      { title: "7课-考点3-9题", audioName: "1-3-1" },
      { title: "7课-考点3-10题", audioName: "1-3-2" },
      { title: "7课-考点3-11题", audioName: "1-3-3" },
      { title: "7课-考点3-12题", audioName: "1-3-4" }
    ],
    showDetail: false
  },
  {
    title: "第八课",
    detail: [
      { title: "8课-考点1-1题", audioName: "2-1-1" },
      { title: "8课-考点1-2题", audioName: "2-1-2" },
      { title: "8课-考点1-3题", audioName: "2-1-3" },
      { title: "8课-考点1-4题", audioName: "2-1-4" },
      { title: "8课-考点1-5题", audioName: "2-1-5" },
      { title: "8课-考点2-6题", audioName: "2-2-1" },
      { title: "8课-考点2-7题", audioName: "2-2-2" },
      { title: "8课-考点2-8题", audioName: "2-2-3" },
      { title: "8课-考点2-9题", audioName: "2-2-4" },
      { title: "8课-考点2-10题", audioName: "2-2-5" }
    ],
    showDetail: false
  },
  {
    title: "第九课",
    detail: [
      { title: "9课-考点1-1题", audioName: "3-1-1" },
      { title: "9课-考点1-2题", audioName: "3-1-2" },
      { title: "9课-考点1-3题", audioName: "3-1-3" },
      { title: "9课-考点1-4题", audioName: "3-1-4" },
      { title: "9课-考点1-5题", audioName: "3-1-5" },
      { title: "9课-考点2-6题", audioName: "3-2-1" },
      { title: "9课-考点2-7题", audioName: "3-2-2" },
      { title: "9课-考点2-8题", audioName: "3-2-3" },
      { title: "9课-考点2-9题", audioName: "3-2-4" },
      { title: "9课-考点2-10题", audioName: "3-2-5" }
    ],
    showDetail: false
  },
  {
    title: "第十课",
    detail: [
      { title: "10课-考点1-1题", audioName: "4-1-1" },
      { title: "10课-考点1-2题", audioName: "4-1-2" },
      { title: "10课-考点1-3题", audioName: "4-1-3" },
      { title: "10课-考点1-4题", audioName: "4-1-4" },
      { title: "10课-考点2-5题", audioName: "4-2-1" },
      { title: "10课-考点2-6题", audioName: "4-2-2" },
      { title: "10课-考点2-7题", audioName: "4-2-3" },
      { title: "10课-考点2-8题", audioName: "4-2-4" },
      { title: "10课-考点3-9题", audioName: "4-3-1" },
      { title: "10课-考点3-10题", audioName: "4-3-2" },
      { title: "10课-考点3-11题", audioName: "4-3-3" },
      { title: "10课-考点3-12题", audioName: "4-3-4" }
    ],
    showDetail: false
  },
  {
    title: "第十一课",
    detail: [
      { title: "11课-考点1-1题", audioName: "5-1-1" },
      { title: "11课-考点1-2题", audioName: "5-1-2" },
      { title: "11课-考点1-3题", audioName: "5-1-3" },
      { title: "11课-考点1-4题", audioName: "5-1-4" },
      { title: "11课-考点1-5题", audioName: "5-1-5" },
      { title: "11课-考点2-6题", audioName: "5-2-1" },
      { title: "11课-考点2-7题", audioName: "5-2-2" },
      { title: "11课-考点2-8题", audioName: "5-2-3" },
      { title: "11课-考点2-9题", audioName: "5-2-4" },
      { title: "11课-考点2-10题", audioName: "5-2-5" }
    ],
    showDetail: false
  },
  {
    title: "第十二课",
    detail: [
      { title: "12课-考点1-1题", audioName: "6-1-1" },
      { title: "12课-考点1-2题", audioName: "6-1-2" },
      { title: "12课-考点1-3题", audioName: "6-1-3" },
      { title: "12课-考点1-4题", audioName: "6-1-4" },
      { title: "12课-考点1-5题", audioName: "6-1-5" },
      { title: "12课-考点2-6题", audioName: "6-2-1" },
      { title: "12课-考点2-7题", audioName: "6-2-2" },
      { title: "12课-考点2-8题", audioName: "6-2-3" },
      { title: "12课-考点2-9题", audioName: "6-2-4" },
      { title: "12课-考点2-10题", audioName: "6-2-5" }
    ],
    showDetail: false
  },
  {
    title: "第十三课",
    detail: [
      { title: "13课-考点1-1题", audioName: "7-1-1" },
      { title: "13课-考点1-2题", audioName: "7-1-2" },
      { title: "13课-考点1-3题", audioName: "7-1-3" },
      { title: "13课-考点1-4题", audioName: "7-1-4" },
      { title: "13课-考点2-5题", audioName: "7-2-1" },
      { title: "13课-考点2-6题", audioName: "7-2-2" },
      { title: "13课-考点2-7题", audioName: "7-2-3" },
      { title: "13课-考点2-8题", audioName: "7-2-4" },
      { title: "13课-考点3-9题", audioName: "7-3-1" },
      { title: "13课-考点3-10题", audioName: "7-3-2" },
      { title: "13课-考点3-11题", audioName: "7-3-3" },
      { title: "13课-考点3-12题", audioName: "7-3-4" }
    ],
    showDetail: false
  },
  {
    title: "第十四课",
    detail: [
      { title: "14课-考点1-1题", audioName: "8-1-1" },
      { title: "14课-考点1-2题", audioName: "8-1-2" },
      { title: "14课-考点1-3题", audioName: "8-1-3" },
      { title: "14课-考点1-4题", audioName: "8-1-4" },
      { title: "14课-考点2-5题", audioName: "8-2-1" },
      { title: "14课-考点2-6题", audioName: "8-2-2" },
      { title: "14课-考点2-7题", audioName: "8-2-3" },
      { title: "14课-考点2-8题", audioName: "8-2-4" },
      { title: "14课-考点3-9题", audioName: "8-3-1" },
      { title: "14课-考点3-10题", audioName: "8-3-2" },
      { title: "14课-考点3-11题", audioName: "8-3-3" },
      { title: "14课-考点3-12题", audioName: "8-3-4" }
    ],
    showDetail: false
  },
  {
    title: "第十八课",
    detail: [
      { title: "18课-考点1-视唱1伴奏", audioName: "18课-考点1-1伴奏" },
      { title: "18课-考点1-视唱1范唱", audioName: "18课-考点1-1范唱" },
      { title: "18课-考点1-视唱2伴奏", audioName: "18课-考点1-2伴奏" },
      { title: "18课-考点1-视唱2范唱", audioName: "18课-考点1-2范唱" },
      { title: "18课-考点1-视唱3伴奏", audioName: "18课-考点1-3伴奏" },
      { title: "18课-考点1-视唱3范唱", audioName: "18课-考点1-3范唱" },
      { title: "18课-考点1-视唱4伴奏", audioName: "18课-考点1-4伴奏" },
      { title: "18课-考点1-视唱4范唱", audioName: "18课-考点1-4范唱" },
      { title: "18课-考点1-视唱5伴奏", audioName: "18课-考点1-5伴奏" },
      { title: "18课-考点1-视唱5范唱", audioName: "18课-考点1-5范唱" },
      { title: "18课-考点2-视唱6伴奏", audioName: "18课-考点2-6伴奏" },
      { title: "18课-考点2-视唱6范唱", audioName: "18课-考点2-6范唱" },
      { title: "18课-考点2-视唱7伴奏", audioName: "18课-考点2-7伴奏" },
      { title: "18课-考点2-视唱7范唱", audioName: "18课-考点2-7范唱" },
      { title: "18课-考点2-视唱8伴奏", audioName: "18课-考点2-8伴奏" },
      { title: "18课-考点2-视唱8范唱", audioName: "18课-考点2-8范唱" },
      { title: "18课-考点2-视唱9伴奏", audioName: "18课-考点2-9伴奏" },
      { title: "18课-考点2-视唱9范唱", audioName: "18课-考点2-9范唱" },
      { title: "18课-考点2-视唱10伴奏", audioName: "18课-考点2-10伴奏" },
      { title: "18课-考点2-视唱10范唱", audioName: "18课-考点2-10范唱" }
    ],
    showDetail: false
  },
  {
    title: "模拟真题试卷",
    detail: [
      { title: "模拟真题试卷-1题", audioName: "模拟真题试卷—练耳—第1题" },
      { title: "模拟真题试卷-2题", audioName: "模拟真题试卷—练耳—第2题" },
      { title: "模拟真题试卷-3题", audioName: "模拟真题试卷—练耳—第3题" },
      { title: "模拟真题试卷-4题", audioName: "模拟真题试卷—练耳—第4题" },
      { title: "模拟真题试卷-5题", audioName: "模拟真题试卷—练耳—第5题" },
      { title: "模拟真题试卷-6题", audioName: "模拟真题试卷—练耳—第6题" },
      { title: "模拟真题试卷-7题", audioName: "模拟真题试卷—练耳—第7题" },
      { title: "模拟真题试卷-8题", audioName: "模拟真题试卷—练耳—第8题" },
      { title: "模拟真题试卷-9题", audioName: "模拟真题试卷—练耳—第9题" },
      { title: "模拟真题试卷-10题", audioName: "模拟真题试卷—练耳—第10题" },
      { title: "模拟真题试卷-视唱", audioName: "模拟真题试卷—视唱" }
    ],
    showDetail: false
  }
];
export default {
  name: "test",
  data() {
    return {
      dataArr: dicArr
    };
  },
  methods: {
    handleScroll() {
      this.scroll = this.scrollElement.scrollTop;
    },
    goPlay(title, audioName) {
      this.$router.push({ path: "/play" });
      sessionStorage.setItem("title", title);
      sessionStorage.setItem("audioName", audioName);
      //location.href = `dashSongList.html?audioName=${audioName}&title=${title}#/play`;
    },
    toggleLesson(index, e) {
      const isShow = this.dataArr[index].showDetail;
      const lessonWrapper = document.querySelectorAll(".lesson_wrapper")[index];
      const lesson = document.querySelectorAll(".lesson")[index];
      const pointWrapper = document.querySelectorAll(".point_wrapper")[index];
      const cloneData = JSON.parse(JSON.stringify(this.dataArr));
      cloneData[index].showDetail = !isShow;
      this.dataArr = cloneData;
      if (isShow) {
        lessonWrapper.style.height = lesson.offsetHeight + "px";
      } else {
        this.$nextTick(() => {
          lessonWrapper.style.height =
            lesson.offsetHeight + pointWrapper.offsetHeight + "px";
        });
      }
    }
  },
  created() {
    console.log("created");
  },
  mounted() {
    console.log("mounted");
    this.scrollElement = document.querySelector('#dashSong');
    
  },
  activated() {
    document.title = '音基冲刺练习册歌单听力练习表'
    this.scrollElement.addEventListener("scroll", this.handleScroll);
    if (this.scroll > 0) {
      this.scrollElement.scrollTo(0, this.scroll);
    }
  },
  deactivated() {
    this.scrollElement.removeEventListener("scroll", this.handleScroll);
  }
};
</script>
<style lang="less">
#dashSong {
  position: relative;
  height: 100vh;
  background: url("../../../assets/img/dashSongList/newBg.png") no-repeat;
  background-position: 0 0;
  background-size: 100% 100%;
  background-attachment: fixed;
  background-color: rgb(116, 199, 255);
  overflow: auto;
  .bg {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
  }
}
.page_title {
  position: relative;
  width: 375px;
  margin: auto;
  margin-top: 40px;
  padding-left: 91px;
  font-size: 24px;
  font-family: PingFang SC;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  .left,
  .right {
    position: absolute;
  }
  .left {
    width: 55px;
    left: 23px;
    top: -35px;
  }
  .right {
    width: 55px;
    right: 0px;
    top: -4px;
  }
}
.main {
  width: 375px;
  margin: auto;
  margin-bottom: 30px;
  z-index: 2;
  .lesson_wrapper {
    margin: 13px auto;
    height: 53px;
    transition: height 0.6s;
    .lesson {
      margin: auto;
      position: relative;
      width: 357px;
      height: 53px;
      line-height: 53px;
      padding-left: 18px;
      border-radius: 26px;
      background-color: #fff;
      font-size: 16px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(67, 174, 235, 1);
      .arrow {
        width: 28px;
        position: absolute;
        right: 15px;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .point_wrapper {
      margin-left: 30px;
      .test_point {
        background-color: rgb(36, 147, 231);
        width: 320px;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
        margin: 5px 0;
        border-radius: 20px;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: 400;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
}
</style>

