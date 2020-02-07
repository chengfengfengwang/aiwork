<template>
  <div id="main">
    <div class="main_wrapper">
      <img v-for="(courseImg,index) in imgArr" class="course_img" :key="index" :src=courseImg alt="">
    </div>
    <div class="bottom">
      <div class="course_container" v-show="arrowOpen">
        <div v-for="course in courseList" class="course_item" :key="course.goods_id">{{course.name}}</div>
      </div>
      <div class="select_sec" @click="toggleOpen">
        <img class="arrow" :class="{open:arrowOpen}" src="../../../assets/img/yiqiac/arrow.png" alt />
        请选择课程
      </div>
      <div class="get_course">立即领取</div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
export default {
  data() {
    return {
      arrowOpen: false,
      imgArr:[],
      courseList:[]
    };
  },
  created() {
    document.title = "疫期不孤单，爱心赠好课";
    for(var i=0;i<20;i++){
      this.imgArr.push(require(`../../../assets/img/yiqiac/${i}.png`))
    }
    this.courseList = JSON.parse(localStorage.getItem('multiCourse'));
    console.log(this.courseList)
  },

  methods: {
    toggleOpen() {
      this.arrowOpen = !this.arrowOpen;
    },
    toPoster() {
      this.$router.push("/poster");
    }
  }
};
</script>
<style lang="less">
#main {
  //background-color: #78ce7d;
  min-height: 100vh;
}
.main_wrapper {
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // width: 100%;
  background-color: #fff6e1;
  min-height: 100vh;
  position: relative;
  .course_img {
    width: 100%;
  }
}
.bottom {
  position: fixed;
  background-color: #fff;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  height: 54px;
  padding: 0 16px 0 30px;
  align-items: center;
  justify-content: space-between;
  .course_container {
    position: absolute;
    bottom: 79%;
    left: 15px;
    padding: 10px;
    background-color: #fff;
    border-radius: 10px;
    .course_item {
      background: rgba(230, 230, 230, 1);
      border-radius: 15px;
      padding: 6px 9px;
      margin-bottom: 10px;
      font-size: 13px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(102, 102, 102, 1);
    }
  }
  .select_sec {
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(51, 51, 51, 1);
    display: flex;
    align-items: center;
    .arrow {
        transition: all .2s;
      width: 18px;
      margin-top: 3px;
      margin-right: 10px;
      transform: rotate(180deg);
    }
    .arrow.open {
      transform: rotate(0deg);
    }
  }
  .get_course {
    width: 109px;
    height: 36px;
    background: rgba(255, 114, 3, 1);
    border-radius: 18px;
    line-height: 36px;
    text-align: center;
    font-size: 17px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
}
</style>
