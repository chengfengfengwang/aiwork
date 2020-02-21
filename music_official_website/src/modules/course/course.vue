<template>
  <div id="course">
    <Header></Header>
    <section id="indexBannerSwiper" class="swiper-container">
      <div class="swiper-wrapper">
        <!-- Slides -->
        <div class="swiper-slide slide1"></div>
        <!-- <div class="swiper-slide">Slide 2</div>
        <div class="swiper-slide">Slide 3</div>-->
      </div>
      <div class="swiper-pagination"></div>
    </section>
    <section class="introduction" id="introduction">
      <!-- <CourseCommonTitle style="margin:30px 0;">
        <template v-slot:title_zh>课程简介</template>
        <template v-slot:title_en>Course Characteristics</template>
      </CourseCommonTitle>-->
      <div class="introduction_wrapper wrapper">
        <VideoBlock class="video_block" style="width:560px">
          <template v-slot:cover>
            <img class="cover" src="../../assets/img/course_music_basis.png" alt>
          </template>
          <template v-slot:video>
            <video preload="auto" id="play3" controls src="https://s.immusician.com/web/h5/video/index_music_base_2.mp4"></video>
          </template>
        </VideoBlock>
        <div class="index_banner_main">
          <div class="title">
            <img class="img_left" src="./../../assets/img/course_title_d.png" alt>《中国音乐学院音基考级一级课程》
            <img class="img_right" src="./../../assets/img/course_title_d.png" alt>
          </div>
          <div class="content">
            <div class="course_brief_intro">
              <p>
                适用人群
                <span class="seg">|</span>适用
                <span class="num">5</span>岁及以上学习音乐的儿童。
              </p>
              <p>
                学习内容
                <span class="seg">|</span>
                <span class="num">16</span>课时+
                <span class="num">8</span>个音乐常识小动画，近
                <span class="num">800</span>道测练模拟题。
              </p>
              <p>
                学习方式
                <span class="seg">|</span>在家上课，包学包过，一对一辅导。
              </p>
            </div>
            <div class="line">
              <span v-for="n in 100">-</span>
            </div>
            <!-- <div class="brief_intro">
            <p>
              适用
              <span class="intro_b">6</span>岁及以上学习音乐的儿童
            </p>
            <p>
              乐理视唱练耳
              <span class="intro_b">16</span>课时+
              <span class="intro_b">8</span>个音乐常识小动画
            </p>
            <p>名师讲授+游戏互动练习+动画故事</p>
            <p>练习数据自动检测，课后智能推送相应练习，针对薄弱知识点强化练习</p>
            <p>课程附带考前模拟真题练习题库，确保学生考试通过。</p>
            </div>-->
            <div class="teacher">
              <div class="teacher_img">
                <img src="./../../assets/img/pc_teacher.png" alt>
              </div>
              <div class="teacher_info">
                <div class="teacher_title">主讲老师：田园</div>
                <div
                  class="teacher_intro"
                >美国波士顿大学音乐表演钢琴演奏专业硕士毕业，中国音乐学院音乐教育专业本科毕业，10年少儿音乐基础知识和钢琴教学经验，熟知国内外各大知名音乐考级体系。</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="price_wrapper">
      <div class="price wrapper">
        <div class="price_item">
          <div class="now_price">
            <span class="label">限时特价：</span>
            <span class="num">¥999</span>
          </div>
          <div class="middle_line"></div>
          <div class="old_price">
            <span class="label">原价：</span>
            <span class="num">¥1299</span>
          </div>
        </div>
        <div class="sign_btn" @click="wxBoxShow=true">
          <span>咨询报名</span>
          <img src="./../../assets/img/arrow.png" alt>
        </div>
      </div>
    </section>
    <section class="feature_wrapper">
      <div class="feature wrapper">
        <div class="feature_item">
          <img src="./../../assets/img/feature1.png" alt>
          <div>名师讲授</div>
        </div>
        <div class="feature_item">
          <img src="./../../assets/img/feature2.png" alt>
          <div>游戏互动</div>
        </div>
        <div class="feature_item">
          <img src="./../../assets/img/feature3.png" alt>
          <div>模拟题库</div>
        </div>
        <div class="feature_item">
          <img src="./../../assets/img/feature4.png" alt>
          <div>实时答疑</div>
        </div>
        <div class="feature_item">
          <img src="./../../assets/img/feature5.png" alt>
          <div>动画故事</div>
        </div>
        <div class="feature_item">
          <img src="./../../assets/img/feature6.png" alt>
          <div>一对一辅导</div>
        </div>
      </div>
    </section>

    <section class="outline wrapper" id="outline">
      <CourseCommonTitle style="margin:30px 0">
        <template v-slot:title_zh>课程大纲</template>
        <template v-slot:title_en>Course outline</template>
      </CourseCommonTitle>
      <div class="outline_row">
        <div class="outline_item">
          <img class="top_img" src="./../../assets/img/intro1.png" alt>
          <div class="outline_item_content" style="padding-bottom:30px">
            <div class="intro_list_wrapper">
              <div class="intro_li_title">乐理</div>
              <div class="intro_li_content">
                <p>学会5种常见音符.3种谱号，五线谱，四二拍；</p>
                <p>认低音do到高音do一个八度音名，唱名及音高位置。</p>
              </div>
            </div>
            <div class="intro_list_wrapper">
              <div class="intro_li_title">练耳</div>
              <div class="intro_li_content">
                <p>学会听辨一个八度音高；比较音高低及音符的长度；</p>
                <p>感知四二拍音乐律动。</p>
              </div>
            </div>
            <div class="intro_list_wrapper">
              <div class="intro_li_title">视唱</div>
              <div class="intro_li_content">
                <p>学会敲击单位拍，唱念节奏；跟四二拍旋律完整视唱。</p>
              </div>
            </div>
            <div class="intro_list_wrapper">
              <div class="intro_li_title">常识</div>
              <div class="intro_li_content">
                <p>了解3种键盘乐器，5种常见中外拉弦乐乐器，并听辨它们的音色。</p>
              </div>
            </div>
            <div class="harf_round first"></div>
            <div class="harf_round second"></div>
          </div>
        </div>
        <div class="outline_item">
          <img class="top_img" src="./../../assets/img/intro2.png" alt>
          <div class="outline_item_content">
            <div class="intro_list_wrapper">
              <div class="intro_li_title">乐理</div>
              <div class="intro_li_content">
                <p>学会5种常见休止符，音符时值组合及节奏型；扩展更多高低音；学习c大调音阶，全音半音，大小二度，三度音程。</p>
                <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
              </div>
            </div>
            <div class="intro_list_wrapper">
              <div class="intro_li_title">练耳</div>
              <div class="intro_li_content">
                <p>学会听辨节奏型，全音半音，大小二度三度音程，旋律走向及更多音高的比较。</p>
                <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
              </div>
            </div>
            <div class="intro_list_wrapper">
              <div class="intro_li_title">视唱</div>
              <div class="intro_li_content">
                <p>学会视唱更多的旋律，节奏，音准，唱名，全面提升。</p>
                <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
              </div>
            </div>
            <div class="intro_list_wrapper">
              <div class="intro_li_title">常识</div>
              <div class="intro_li_content">
                <p>了解7种中外弹拨乐，十几种常见中外吹奏乐器，6种中外打击乐器，并听辨它们的音色。</p>
                <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
              </div>
            </div>
            <div class="harf_round first"></div>
            <div class="harf_round second"></div>
          </div>
        </div>
        <div class="outline_item">
          <img class="top_img" src="./../../assets/img/intro3.png" alt>
          <div class="outline_item_content">
            <div class="intro_list_wrapper">
              <div class="intro_li_title">乐理</div>
              <div class="intro_li_content">
                <p>学会四三拍，3种附点音符及附点节奏；学习跳音，同音连线及力度，速度术语，音乐情绪；综合复习所有知识点。</p>
                <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
              </div>
            </div>
            <div class="intro_list_wrapper">
              <div class="intro_li_title">练耳</div>
              <div class="intro_li_content">
                <p>学会听辨两种常见拍号，附点节奏，力度，速度及音乐情绪，巩固旋律音高听辨。</p>
                <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
              </div>
            </div>
            <div class="intro_list_wrapper">
              <div class="intro_li_title">视唱</div>
              <div class="intro_li_content">
                <p>学会视唱四三拍附点节奏旋律，巩固所有旋律音高视唱。</p>
                <!-- <p>认低音do到高音do一个八度音名，唱名及音高位置。</p> -->
              </div>
            </div>
            <div class="intro_list_wrapper">
              <div class="intro_li_title">常识</div>
              <div class="intro_li_content">
                <p>了解10位中外著名音乐家以及他们的代表作品。</p>
              </div>
            </div>
            <div class="harf_round first"></div>
            <div class="harf_round second_l"></div>
          </div>
        </div>
      </div>
    </section>
    <section class="catalogue" id="catalogue">
      <div class="catalogue_wrapper">
        <CourseCommonTitle>
          <template v-slot:title_zh>课程目录</template>
          <template v-slot:title_en>Course catalogue</template>
        </CourseCommonTitle>
        <div class="catalogue_main">
          <div class="left_section">
            <div class="top">《乐理视唱练耳16课 》</div>
            <div class="bottom">
              <div class="bottom_left">
                <p>
                  <span class="index">01</span>快乐音符
                </p>
                <p>
                  <span class="index">02</span>掌中五线谱
                </p>
                <p>
                  <span class="index">03</span>音符唱一唱
                </p>
                <p>
                  <span class="index">04</span>敲敲四二拍
                </p>
                <p>
                  <span class="index">05</span>旋律中的音高
                </p>
                <p>
                  <span class="index">06</span>不发声的休止符
                </p>
                <p>
                  <span class="index">07</span>节奏变变变
                </p>
                <p>
                  <span class="index">08</span>找找高低音
                </p>
              </div>
              <div class="bottom_right">
                <p>
                  <span class="index">09</span>C大调音阶
                </p>
                <p>
                  <span class="index">10</span>二度音程
                </p>
                <p>
                  <span class="index">11</span>三度音程
                </p>
                <p>
                  <span class="index">12</span>音程来聚会
                </p>
                <p>
                  <span class="index">13</span>舞动的四三拍
                </p>
                <p>
                  <span class="index">14</span>奇妙的附点
                </p>
                <p>
                  <span class="index">15</span>玩转节拍
                </p>
                <p>
                  <span class="index">16</span>音乐中的情感
                </p>
              </div>
            </div>
          </div>
          <div class="middle_section">
            <img src="./../../assets/img/add.png" alt>
          </div>
          <div class="right_section">
            <div class="top">《音乐星球小动画8课》</div>
            <div class="bottom">
              <div class="bottom_left">
                <div class="lesson">
                  <p class="p_title">
                    <span class="index">01</span>穿越键盘星球
                  </p>
                  <p class="p_sub_title">乐器之王钢琴，管风琴，手风琴</p>
                </div>
                <div class="lesson">
                  <p class="p_title">
                    <span class="index">02</span>弦乐星球1号
                  </p>
                  <p class="p_sub_title">中西方拉弦乐小提琴、中提琴，二胡等</p>
                </div>
                <div class="lesson">
                  <p class="p_title">
                    <span class="index">03</span>弦乐星球2号
                  </p>
                  <p class="p_sub_title">——中西方弹拨乐琵琶，古筝，竖琴等</p>
                </div>
                <div class="lesson">
                  <p class="p_title">
                    <span class="index">04</span>吹奏乐星球1号
                  </p>
                  <p class="p_sub_title">——中西方吹奏乐长笛、单簧管、唢呐等</p>
                </div>
              </div>
              <div class="bottom_right">
                <div class="lesson">
                  <p class="p_title">
                    <span class="index">05</span>吹奏乐星球2号
                  </p>
                  <p class="p_sub_title">——西方铜管乐大管、圆号、小号等</p>
                </div>
                <div class="lesson">
                  <p class="p_title">
                    <span class="index">06</span>打击乐星球
                  </p>
                  <p class="p_sub_title">——中西方打击乐小军鼓、响板，锣等</p>
                </div>
                <div class="lesson">
                  <p class="p_title">
                    <span class="index">07</span>西方音乐家星球
                  </p>
                  <p class="p_sub_title">——巴赫，莫扎特、贝多芬等</p>
                </div>
                <div class="lesson">
                  <p class="p_title">
                    <span class="index">08</span>中国音乐家星球
                  </p>
                  <p class="p_sub_title">——冼星海、王洛宾、聂耳等</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="remark wrapper" id="remark">
      <CourseCommonTitle>
        <template v-slot:title_zh>用户评论</template>
        <template v-slot:title_en>User reviews</template>
      </CourseCommonTitle>
      <div class="remark_container wrapper">
        <div id="remarkSwiper" class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide slide" v-for="(remark,index) in remarkArr">
              <div class="user_info">
                <div class="avatar">
                  <img :src="photoArr[index]" alt>
                </div>
                <div class="name">孩子家长</div>
              </div>

              <div class="remark_content">{{remark.content}}</div>
            </div>
          </div>

          <!-- <div class="swiper-button-next"></div>
          <div class="swiper-button-prev"></div>-->
        </div>
        <div @click="remarkSwiperNext" class="swiper-button-next">
          <img src="./../../assets/img/arrow.png" alt>
        </div>
        <div @click="remarkSwiperPrev" class="swiper-button-prev">
          <img src="./../../assets/img/arrow.png" alt>
        </div>
      </div>
    </section>
    <BackTop></BackTop>
    <Footer></Footer>
    <div v-show="wxBoxShow">
      <div class="mask" @click="wxBoxShow=false"></div>
      <div class="wx_box">
        <img @click="wxBoxShow=false" src="./../../assets/img/close.png" alt class="close">
        <div class="wx_img">
          <img src="./../../assets/img/wechat_g.jpeg" alt>
        </div>
        <div class="text_content">
          <div class="add_wx">添加微信号 jessieyin02</div>
          <div class="to_know">了解课程相关信息</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { remarkData } from "./../../assets/data.js";
import Header from "./../../components/Header";
import Footer from "./../../components/Footer";
import BackTop from "./../../components/BackTop";
import CommonTitle from "./../../components/CommonTitle";
import VideoBlock from "./../../components/Index/VideoBlock";
import CourseCommonTitle from "./../../components/Index/CourseCommonTitle";
import Swiper from "swiper";
import "swiper/dist/css/swiper.min.css";
export default {
  name: "course",
  components: {
    Header,
    Footer,
    BackTop,
    CommonTitle,
    VideoBlock,
    CourseCommonTitle,
    Swiper
  },
  data() {
    return {
      remarkArr: remarkData,
      wxBoxShow:false,
      photoArr:[]
    };
  },
  created() {
    this.initPhotoArr();
  },
  mounted() {
    this.initBannerSwiper();
    this.initRemarkSwiper();
  },
  methods: {
     initPhotoArr() {
      for (var i = 0; i < 10; i++) {
        this.photoArr.push(
          require(`./../../assets/mob_assets/img/photo${i + 1}.png`)
        );
      }
    },
    initBannerSwiper() {
      var mySwiper = new Swiper("#indexBannerSwiper", {
        direction: "horizontal"
        //loop: true
        // pagination: {
        //   el: ".swiper-pagination",
        //   clickable: true
        // }
      });
    },
    initRemarkSwiper() {
      this.mySwiper = new Swiper("#remarkSwiper", {
        direction: "horizontal",
        //initialSlide :1,
        loop: true,
        slidesPerView: 4,
        //centeredSlides: true,
        spaceBetween: 36
      });
    },
    remarkSwiperNext() {
      this.mySwiper.slideNext();
    },
    remarkSwiperPrev() {
      this.mySwiper.slidePrev();
    }
  }
};
</script>

<style lang="less" scoped>
.wx_box {
  position: fixed;
  top:30%;
  left: 50%;
  transform: translateX(-50%);
  background: #ffffff;
  border-radius: 10px;
  padding: 50px 40px;
  box-sizing: border-box;
  opacity: 1;
  z-index: 2001;
  width: 600px;
  display: flex;
  align-items: center;
  .close {
    position: absolute;
    right: 0;
    top: 0;
    padding: 20px;
    cursor: pointer;
  }
  .wx_img {
    width: 160px;
    height: 160px;
    margin-right: 30px;
    img {
      width: 100%;
    }
  }
  .text_content {
    .add_wx {
      font-size: 25px;
      color: #ffab0c;
      margin-bottom: 15px
    }
    .to_know {
      font-size: 20px;
      color: #666666;
    }
  }
}
#course {
  position: relative;
}
#indexBannerSwiper.swiper-container {
  width: 100%;
  height: 650px;
  .slide1 {
    background: url("./../../assets/img/course_banner999.png") no-repeat center;
    background-size: cover;
  }
}
#remarkSwiper.swiper-container {
  width: 1044px;
  margin: 0 auto;
  // //height: 335px;
  // height: 370px;
  // //padding: 0 30px;
  // display: flex;
  // justify-content: space-between;

  .slide {
    //width: 35%;
    box-sizing: border-box;
    width: 234px;
    height: 335px;
    padding: 34px 30px 50px 30px;
    background: #ffaf06;
    border-radius: 6px;
    margin-bottom: 20px;
    box-shadow: 0px 25px 22px -27px #d9840f;
    //box-shadow: 0 2px 4px 0 #D9840F;
    .user_info {
      text-align: center;
      margin-bottom: 20px;
    }
    .avatar {
      margin: 0 auto;
      display: inline-block;
      width: 86px;
      height: 86px;
      border-radius: 50%;
      border: 2px solid #ffc072;
      overflow: hidden;
      box-shadow: 1px 3px 12px 0px #eb9209;
      img {
        width: 100%;
      }
    }
    .name {
      font-size: 14px;
      color: #ffffff;
    }
    .remark_content {
      font-size: 12px;
      color: #ffffff;
      line-height: 20px;
    }
  }
}
.introduction {
  background: #fff9f2;
  padding-top: 60px;
  .introduction_wrapper {
    display: flex;
    .video_block {
      //width: 790px;
      //flex-shrink: 0;
    }
    .index_banner_main {
      width: 606px;
      color: #fff;
      margin-left: 33px;
      .title {
        font-size: 32px;
        color: #ffffff;
        height: 60px;
        line-height: 60px;
        border-radius: 5px 5px 0 0;
        background-image: linear-gradient(-179deg, #ffbc4b 0%, #ff9c15 100%);
        display: flex;
        align-items: center;
        justify-content: center;

        position: relative;
        z-index: 3;
        box-shadow: 0px 3px 6px -3px #f89d00;
        .img_left {
          transform: rotate(180deg);
          //margin-left: -3px;
        }
        .img_right {
        }
      }
      .content {
        padding-top: 30px;
        background-color: #ffba38;
        border-radius: 0 0 6px 6px;
      }
      .course_brief_intro {
        margin-left: 50px;
        // margin-bottom: 25px;
        padding-left: 15px;
        background: url("./../../assets/img/course_group.png") no-repeat;
        background-position: 0px 12px;
        background-size: 10px 82%;
        font-size: 16px;
        color: #ffffff;
        .num {
          font-size: 24px;
          color: #ff7800;
          margin: 0 3px;
          font-weight: 500
        }
        .seg {
          display: inline-block;
          margin: 0 15px;
          transform: scale(0.5, 1.2);
        }
        & > p {
          margin-bottom: 10px;
          display: flex;
          align-items: center;
        }
        //border-bottom: 1px dashed #fff;
      }
      .line {
        white-space: nowrap;
        width: 100%;
        overflow: hidden;
        opacity: 0.2;
        & > span {
          margin: 0 3px;
        }
        margin-top:-10px
      }
      .brief_intro {
        font-size: 16px;
        color: #666666;
        .intro_b {
          font-size: 24px;
          color: #ffa700;
        }
        & > p {
          position: relative;
          padding-left: 20px;
          line-height: 32px;
        }
      }
      .brief_intro > p:before {
        content: "";
        width: 8px;
        height: 8px;
        border-radius: 50%;
        position: absolute;
        left: 8px;
        top: 50%;
        margin-top: -4px;
        background: #ffaa06;
      }
      .teacher {
        //margin: 27px 30px 0px 56px;
        margin: 5px 30px 0px 56px;
        padding-bottom: 40px;
        padding-bottom: 20px;
        display: flex;
        align-items: center;
        //background: #fff9f1;
        .teacher_img {
          flex-shrink: 0;
          width: 100px;
          height: 115px;
          border-radius: 6px;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .teacher_info {
          padding: 0 30px;
          .teacher_title {
            margin-bottom: 12px;
            font-size: 24px;
            //color: #666666;
          }
          .teacher_intro {
            line-height: 27px;
            font-size: 14px;
            //color: #666666;
          }
        }
      }
    }
  }
}
.feature {
  display: flex;
  text-align: center;
  justify-content: space-around;
  background-color: #fff9f2;
  padding: 60px 0;
  .feature_item {
    font-size: 20px;
    color: #666666;
    img {
      margin-bottom: 10px;
    }
  }
}
.price_wrapper,
.feature_wrapper {
  background-color: #fff9f2;
}
.price_wrapper {
  padding-top: 60px;
}
.price {
  background-image: linear-gradient(-90deg, #ffaa26 0%, #ffa32b 100%);
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 80px;
  box-sizing: border-box;
  .price_item {
    display: flex;
    align-items: center;
    .now_price {
      display: flex;
      align-items: center;
      .label {
        font-size: 27px;
        color: #ffffff;
      }
      .num {
        font-size: 37px;
        color: #ffffff;
      }
    }
    .old_price {
      display: flex;
      align-items: center;
      .label {
        font-size: 27px;
        color: #ffffff;
      }
      .num {
        position: relative;
        display: inline-block;
        font-size: 37px;
        color: #ffffff;
        opacity: 0.8;
        //text-decoration: line-through;
      }
      .num:after {
        content: "";
        width: 100px;
        height: 2px;
        background-color: #fff;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-left: -47px;
        opacity: 0.8;
      }
    }
    .middle_line {
      margin: 0 30px;
      width: 1px;
      height: 30px;
      background-color: #fff;
    }
  }
  .sign_btn {
    cursor: pointer;
    width: 200px;
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 28px;
    color: #ffaa06;
    background: #fff9ee;
    box-shadow: 0 6px 12px 0 #fc901a;
    border-radius: 28px;
    img {
      margin-left: 10px;
      width: 14px;
      transform: rotate(180deg);
    }
  }
}
.outline {
  margin-bottom: 80px;
  .outline_row {
    display: flex;
    justify-content: space-between;
    .outline_item {
      overflow: hidden;
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      box-shadow: 0px 31px 21px -27px #f7cc8e;
      .top_img {
        z-index: 30;
      }
      .harf_round {
        position: absolute;
        width: 198px;
        height: 198px;
        border-radius: 50%;
        background-color: #fff0e3;
        z-index: 0;
      }
      .harf_round.first {
        left: -40px;
        top: -30px;
        width: 130px;
        height: 130px;
      }
      .harf_round.second {
        left: -40px;
        bottom: -90px;
      }
      .harf_round.second_l {
        right: -100px;
        top: 190px;
      }
    }
    .outline_item_content {
      position: relative;
      overflow: hidden;
      box-sizing: border-box;
      width: 350px;
      background-color: #fff8f2;
      border-radius: 10px 10px 6px 6px;
      padding: 30px 18px 10px 18px;
      margin-top: -30px;
      .intro_list_wrapper {
        position: relative;
        z-index: 10;
        margin-bottom: 25px;
        .intro_li_title {
          margin-bottom: 5px;
          font-family: PingFangSC-Medium;
          font-size: 20px;
          color: #fea803;
        }
        .intro_li_content {
          line-height: 22px;
          font-family: PingFangSC-Regular;
          font-size: 13px;
          color: #666666;
        }
      }
    }
  }
}
.catalogue {
  overflow: auto;
  .catalogue_wrapper {
    margin: 0 auto;
    max-width: 1200px;
  }

  background: #fff8f0;
  padding: 0 0 50px 0;
  .catalogue_main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left_section {
      width: 500px;
      .top {
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: #ffaa06;
        font-size: 24px;
        color: #ffffff;
        border-radius: 8px 8px 0 0;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #666666;
        background: #fff8f2;
        border-radius: 10px 10px 6px 6px;
        padding: 32px 60px 23px 60px;
        box-shadow: 0 14px 20px -9px #ffe2aa;
        .index {
          margin-right: 0.5em;
        }
        .bottom_left,
        .bottom_right {
          line-height: 28px;
        }
      }
    }
    .right_section {
      width: 500px;
      .top {
        height: 60px;
        line-height: 60px;
        text-align: center;
        background: #ffaa06;
        font-size: 24px;
        color: #ffffff;
        border-radius: 8px 8px 0 0;
      }
      .bottom {
        display: flex;
        justify-content: space-between;
        font-size: 16px;
        color: #666666;
        background: #fff8f2;
        border-radius: 10px 10px 6px 6px;
        padding: 32px 30px 23px 30px;
        box-shadow: 0 14px 20px -9px #ffe2aa;
        .index {
          margin-right: 0.5em;
        }
        .bottom_left,
        .bottom_right {
          line-height: 28px;
        }
        .p_title {
          font-size: 16px;
          color: #666666;
        }
        .p_sub_title {
          font-size: 12px;
          color: #666666;
        }
      }
    }
    .middle_section {
      width: 84px;
      height: 84px;
      display: flex;
      justify-content: center;
      align-items: center;
      opacity: 0.6;
      background: #ffe9d6;
      border-radius: 50%;
    }
  }
}
.remark {
  margin: 120px auto;
  margin-top: 30px;
}
.remark_container {
  position: relative;
  .swiper-button-next {
    position: absolute;
    right: 0px;
    top: 50%;
    margin-top: -24px;
    width: 48px;
    height: 48px;
    background: #ffe4bd;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 16px;
      transform: rotate(180deg);
    }
  }
  .swiper-button-prev {
    position: absolute;
    left: 0px;
    top: 50%;
    width: 48px;
    height: 48px;
    margin-top: -24px;
    background: #ffe4bd;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 16px;
      transform: rotate(360deg);
    }
  }
}
</style>