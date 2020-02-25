<template>
  <div class="success_page">
    <div class="main" :class="{multiStyle:multiStyle}">
      <div v-show="acCourseList.length===1">
        <div v-for=" (course,index) in acCourseList" :key="index">
          <img class="course_img" :src="course.goods_cover_url" alt />
          <div class="course_title">{{course.goods_title}}</div>
          <div class="success_info">
            <img class="i_right" src="../../../assets/img/activeCourse/right.png" alt />成功激活
          </div>
        </div>
      </div>
      <div v-show="acCourseList.length>1" class="list_wrapper">
        <div class="success_tip">
          <img class="i_right" src="../../../assets/img/activeCourse/right.png" alt />以下课程成功激活
        </div>
        <div class="muiti_course_list" v-for=" (course,index) in acCourseList" :key="index" >
          <div class="course_item">
            <img class="i_right" :src="course.goods_cover_url" alt />
            {{course.goods_title}}
          </div>
        </div>
      </div>
      <div class="acbtn" @click="goDownload">去学习</div>
    </div>
    <img src="../../../assets/img/activeCourse/acsuccess.png" alt class="top" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      acCourseList: [],
      multiStyle:false
    };
  },
  created() {
    this.acCourseList = JSON.parse(localStorage.getItem("acCourseList"));
    // this.acCourseList = [
    //   {
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FsDi1mQazN4S6J7VXmQgNauSXb_L",
    //     goods_item_id: 40,
    //     goods_id: "5db262b5f156d84930287b81",
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FgRRXDNnKj1z1e_fAdN7rMrJShjM",
    //     goods_title: "音乐星球之旅",
    //     goods_type: 0
    //   },
    //   {
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FsDi1mQazN4S6J7VXmQgNauSXb_L",
    //     goods_item_id: 40,
    //     goods_id: "5db262b5f156d84930287b81",
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FgRRXDNnKj1z1e_fAdN7rMrJShjM",
    //     goods_title: "音乐星球之旅",
    //     goods_type: 0
    //   },
    //   {
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FsDi1mQazN4S6J7VXmQgNauSXb_L",
    //     goods_item_id: 40,
    //     goods_id: "5db262b5f156d84930287b81",
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FgRRXDNnKj1z1e_fAdN7rMrJShjM",
    //     goods_title: "音乐星球之旅",
    //     goods_type: 0
    //   },
    //   {
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FsDi1mQazN4S6J7VXmQgNauSXb_L",
    //     goods_item_id: 40,
    //     goods_id: "5db262b5f156d84930287b81",
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FgRRXDNnKj1z1e_fAdN7rMrJShjM",
    //     goods_title: "音乐星球之旅",
    //     goods_type: 0
    //   },
    //   {
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FsDi1mQazN4S6J7VXmQgNauSXb_L",
    //     goods_item_id: 40,
    //     goods_id: "5db262b5f156d84930287b81",
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FgRRXDNnKj1z1e_fAdN7rMrJShjM",
    //     goods_title: "音乐星球之旅",
    //     goods_type: 0
    //   },
    //   {
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FsDi1mQazN4S6J7VXmQgNauSXb_L",
    //     goods_item_id: 40,
    //     goods_id: "5db262b5f156d84930287b81",
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FgRRXDNnKj1z1e_fAdN7rMrJShjM",
    //     goods_title: "音乐星球之旅",
    //     goods_type: 0
    //   },
    //   {
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FsDi1mQazN4S6J7VXmQgNauSXb_L",
    //     goods_item_id: 40,
    //     goods_id: "5db262b5f156d84930287b81",
    //     goods_cover_url:
    //       "http://iguitar-new.iguitar.immusician.com/FgRRXDNnKj1z1e_fAdN7rMrJShjM",
    //     goods_title: "音乐星球之旅",
    //     goods_type: 0
    //   }
    // ];
    if(this.acCourseList.length>1){
        this.multiStyle = true
    }

    console.log(this.acCourseList);
  },
  mounted() {},
  methods: {
    goDownload() {
      this.$router.push("/download");
    }
  }
};
</script>
<style lang="less" scoped>
.success_page {
  min-height: 100vh;
  position: relative;
  background: rgba(120, 207, 123, 1);
}
.main {
  position: absolute;
  top: 32%;
  left: 50%;
  transform: translateX(-50%);
  width: 311px;
  min-height: 280px;
  .list_wrapper {
    max-height: 350px;
    overflow: scroll;
  }
  background: rgba(255, 255, 255, 1);
  border-radius: 20px;
  text-align: center;
  color: rgba(255, 255, 255, 1);
  z-index: 3;
  .course_img {
    width: 100px;
    height: 100px;
    border-radius: 5px;
    margin: 20px auto 10px auto;
  }
  .course_title {
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 128, 48, 1);
  }
  .success_info {
    .i_right {
      margin-right: 3px;
    }
    margin-top: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 600;
    color: rgba(255, 128, 48, 1);
    img {
      width: 17px;
    }
  }
  .acbtn {
    display: inline-block;
    margin-top: 20px;
     margin-bottom: 20px;
    width: 210px;
    height: 45px;
    line-height: 45px;
    background: rgba(255, 128, 48, 1);
    border-radius: 23px;
    font-size: 17px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: rgba(255, 255, 255, 1);
  }
}
.multiStyle{
    top:20%
}
.btn {
  position: absolute;
  left: 50%;
  top: 67%;
  transform: translateX(-50%);
  width: 315px;
  height: 44px;
  line-height: 44px;
  margin: auto;
  background: rgba(255, 255, 255, 1);
  border-radius: 22px;
  text-align: center;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: rgba(255, 87, 38, 1);
}
img.top {
  position: absolute;
  right: 0;
  top: 0;
  width: 100%;
}
.success_tip {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    margin-right: 3px;
    width: 15px;
  }
  margin: 20px auto;
  width: 240px;
  height: 32px;
  line-height: 32px;
  border-radius: 16px;
  text-align: center;
  background-color: #fff7dd;
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: rgba(255, 128, 48, 1);
}
.course_item {
  margin: 15px 15px;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    margin-right: 15px;
  }
  font-size: 16px;
  font-family: PingFangSC-Regular, PingFang SC;
  font-weight: 400;
  color: rgba(160, 87, 6, 1);
}
.muiti_course_list .course_item{
  text-align: left
}
</style>

