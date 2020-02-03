<template>
  <div id="aiCourseList">
    <!-- <div class="top_menu">
      <div :class="{active:curIndex==0}" class="top_menu_item active"  @click="curIndex=0">{{obj.course_type}}</div>
      <div :class="{active:curIndex==1}" class="top_menu_item" @click="curIndex=1">尤克里里中级</div>
    </div>-->
    <Loading v-show="loadingShow"/>
    <div v-show="menuArr.length>1" class="menu_wrapper">
      <div :class="'top_menu'+menuArr.length" class="top_menu">
        <div
          v-for="(menu,idx) in menuArr"
          :key="idx"
          :class="{active:curIndex==idx}"
          class="top_menu_item"
          @click="curIndex=idx"
        >{{menu.course_type}}</div>
      </div>
    </div>

    <div class="main_content" v-show="curIndex==index" v-for="(obj,index) in menuArr" :key="index">
      <div class="page_title">
        <div class="title">
          <img class="left" src="../../assets/img/ai/title_d.png" alt>
          <span class="title_content">{{obj.title}}</span>
          <img class="right" src="../../assets/img/ai/title_d.png" alt>
        </div>
        <div v-show="obj.sub_title" class="sub_title">{{obj.sub_title}}</div>
      </div>
      <div class="section" v-for="(item,index) in obj.section_list" :key="index">
        <div v-show="obj.section_list.length>1 && item.title">
          <div class="level">LV{{index+1}}</div>
          <div class="section_title">
            <div class="title">{{item.title}}</div>
          </div>
          <div class="line">
            <div class="round left"></div>
            <div class="round right"></div>
            <span v-for="(n,index) in 100" :key="index">-</span>
          </div>
        </div>

        <div class="section_content">
          <div
            class="content_item"
            v-for="(lesson,lesson_index) in item.content"
            :key="lesson_index"
          >
            <div class="item_title">{{lesson.title}}</div>
            <div class="item_content_wrapper">
              <div
                class="item_content"
                v-for="(lesson_content,lesson_content_index) in lesson.list"
                :key="lesson_content_index"
              >{{lesson_content}}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Loading from "./../../components/Loading";
import dataArr from "./data.js";
export default {
  data() {
    return {
      loadingShow: true,
      course_ids: "",
      menuArr: [],
      curIndex: 0
    };
  },
  components: {
    Loading
  },
  mounted() {
    console.log(location.href);
    console.log(this.$util.getQueryVariable("course_ids"));
    this.course_ids = this.$util.getQueryVariable("course_ids");
    this.get();
  },
  methods: {
    get() {
      this.loadingShow = true;
      var url = `http://iguitar.immusician.com:2525/v3/course/catalog?course_ids=${
        this.course_ids
      }`;
      // this.menuArr = dataArr.slice(0,2);
      // this.loadingShow = false;
      // return
      this.axios
        .get(url)
        .then(res => {
          var res = res.data;
          this.loadingShow = false;
          if (res.data && res.data.length > 0) {
            this.menuArr = res.data.filter(n => {
              return n;
            });
          } else {
            alert("无相关数据");
          }
        })
        .catch(() => {
          alert("请求出错");
        });
    }
  }
};
</script>

<style lang="less" scoped>
#aiCourseList {
  background-color: #2f1941;
  color: #fff;
  overflow: hidden;
}
.top_menu {
  width: 260px;
  height: 30px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  margin: 15px auto 15px auto;
  color: #fff;
  display: flex;
  .top_menu_item {
    width: 50%;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    font-family: PingFangSC-Regular;
  }
  .top_menu_item.active {
    background: linear-gradient(
      270deg,
      rgba(94, 83, 224, 1) 0%,
      rgba(156, 98, 224, 1) 100%
    );
    border-radius: 15px;
  }
}
.top_menu3 {
  width: 400px;
}
.page_title {
  width: 607px;
  margin: 15px auto;
  background: url("./../../assets/img/ai/title_bg.png") no-repeat center;
  background-size: 100% 100%;
  text-align: center;
  overflow: auto;
  .title {
    margin: 15px auto;
    font-size: 18px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    display: flex;
    align-items: center;
    justify-content: center;
    .title_content {
      margin: 0 8px;
    }
    img {
      width: 30px;
    }
    img.right {
      transform: rotate(180deg);
    }
  }
  .sub_title {
    margin: 15px auto;
    width: 300px;
    height: 25px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    font-size: 13px;
    line-height: 25px;
  }
}
.section {
  position: relative;
  width: 607px;
  margin: 20px auto;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  //border:1px solid rgba(94,83,224,0.71);
  //border-image:linear-gradient(180deg, rgba(94,83,224,0.71), rgba(156,98,224,1)) 1 1;
  .level {
    position: absolute;
    left: 22px;
    top: 0;
    width: 30px;
    height: 43px;
    padding-top: 10px;
    box-sizing: border-box;
    font-size: 13px;
    font-family: PingFangSC-Medium;
    font-weight: 500;
    color: #fff;
    text-align: center;
    background: url("./../../assets/img/ai/level.png") no-repeat center;
    background-size: 100% 100%;
  }
  .section_title {
    //border-bottom: 1px dashed rgba(151, 151, 151, 1);
    .title {
      background: url("./../../assets/img/ai/section_title_bg.png") no-repeat
        center;
      background-size: 100% 100%;
      width: 323px;
      height: 33px;
      margin: 20px auto;

      text-align: center;
      line-height: 33px;
      font-size: 16px;
      font-family: PingFangSC-Medium;
      font-weight: 500;
    }
  }
  .line {
    position: relative;
    margin-top: -13px;
    overflow: hidden;
    width: 100%;
    white-space: nowrap;
    .round {
      position: absolute;
      width: 22px;
      height: 22px;
      z-index: 999;
      border-radius: 50%;
      background-color: #2f1941;
      top: 50%;
      transform: translateY(-50%);
    }
    .round.left {
      left: -11px;
    }
    .round.right {
      right: -12px;
    }
    span {
      opacity: 0.3;
      display: inline-block;
      transform: scaleX(0.8);
      color: rgba(151, 151, 151, 1);
      margin: 0 2px;
    }
  }
  .section_content {
    padding: 20px 22px 0px 22px;
    //display: flex;
    //flex-wrap: wrap;
    //justify-content: space-around;
    .content_item {
      display: inline-block;
      box-sizing: border-box;
      margin-bottom: 25px;
      vertical-align: top;
      .item_title {
        margin-bottom: 10px;
        font-size: 15px;
        font-family: PingFangSC-Medium;
        font-weight: 500;
      }
      .item_content_wrapper {
        font-size: 13px;
        font-family: PingFangSC-Regular;
        font-weight: 400;
        color: rgba(255, 255, 255, 0.7);
        .item_content {
          margin-bottom: 7px;
        }
        .item_content:last-child {
          margin-bottom: 0px;
        }
      }
    }
    .content_item:nth-child(odd) {
      width: 54%;
      padding-right: 5px;
    }
    .content_item:nth-child(even) {
      padding-left: 5px;
      width: 46%;
    }
  }
  //   .round{

  //       position: absolute;
  //       width: 200px;
  //       height: 200px;
  //       z-index: 999;
  //       border-radius: 50%;
  //       background-color: yellow;
  //       top: 50%;
  //       transform: translateY(-50%);
  //       left: -11px;
  //   }
}
// @media screen and (min-width: 900px) {
//     .page_title,.section {
//         width: 800px;
//     }
// }
.menu_wrapper {
  position: fixed;
  width: 100%;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  background-color: #2f1941;
  z-index: 9;
}
.main_content {
  padding-top: 50px;
}
</style>

