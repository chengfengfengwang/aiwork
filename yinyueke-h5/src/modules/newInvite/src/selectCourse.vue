<template>
  <div id="main">
    <div class="main_wrapper">
      <img v-for="(courseImg,index) in imgArr" class="course_img" :key="index" :src="courseImg" alt />
    </div>
    <div class="bottom">
      <div class="course_container" v-show="arrowOpen">
        <div
          @click="selectCourse(index,course.name)"
          v-for="(course,index) in courseList"
          class="course_item"
          :class="{active:acIndex===index}"
          :key="course.id"
        >{{course.name}}</div>
      </div>
      <div class="select_sec" @click="toggleOpen">
        <img class="arrow" :class="{open:arrowOpen}" src="../../../assets/img/yiqiac/arrow.png" alt />
        {{courseText}}
      </div>
      <div class="get_course" @click="activeCourse">立即领取</div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      arrowOpen: false,
      imgArr: [],
      courseList: [],
      acIndex: "",
      courseText: "请选择课程"
    };
  },
  created() {
    document.title = "疫期不孤单，爱心赠好课";
    for (var i = 1; i < 26; i++) {
      this.imgArr.push(require(`../../../assets/img/yiqiac/detail/${i}.png`));
    }
    this.courseList = JSON.parse(localStorage.getItem("multiCourse"));
    console.log(this.courseList);
  },
  mounted() {},
  methods: {
    activeCourse() {
      // console.log(this.courseList)
      // console.log({
      //   phone: getQueryVariable("user_phone"),
      //   id: this.courseList[this.acIndex].id
      // });
      // return;
      if (this.courseText === "请选择课程") {
        return;
      }
      this.axios
        .post(`http://api.yinji.immusician.com/v1/share/active_free_course/`, {
          phone: localStorage.getItem("loginPhone"),
          id: this.courseList[this.acIndex].id
        })
        .then(res => {
          if (!res.error) {
            Toast({
              message: "课程领取成功，请下载音乐壳App，登录后查看",
              duration: 2000
            });
            setTimeout(() => {
              this.$router.push("/download");
            }, 2000);
          }
        });
    },
    selectCourse(index, name) {
      this.acIndex = index;
      this.courseText = name;
      this.arrowOpen = false;
    },
    toggleOpen() {
      this.arrowOpen = !this.arrowOpen;
    },
    toPoster() {
      this.$router.push("/poster");
    }
  }
};
</script>
<style lang="less" scoped>
#main {
  //background-color: #78ce7d;

  min-height: 100vh;
}
#main * {
  box-sizing: border-box;
}
.main_wrapper {
  // position: absolute;
  // bottom: 0;
  // left: 0;
  // width: 100%;
  padding-bottom: 50px;
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
      border: 1px solid transparent;
    }
    .course_item.active {
      background-color: #fff2e8;
      border: 1px solid #ff7203;
      color: rgba(255, 114, 3, 1);
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
      transition: all 0.2s;
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
