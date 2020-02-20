<template>
  <div class="page_wrapper">
    <div
      :class="{ac11wrapper:courseInfo.name=='音乐星球之旅'}"
      class="video_model"
      style="margin:0;padding-bottom:110px"
    >
      <div class="common_wrapper">
        <CourseCommonTitle>
          <template v-slot:title_zh>课程简介</template>
          <template v-slot:title_en>Course Introduction</template>
        </CourseCommonTitle>
      </div>

      <div
        class="video_box"
        v-if="courseInfo.name=='音基启蒙课'"
        @click="handleClick('music_basis','music_basis_video')"
      > 
        <img src="../../../assets/img/courseDetail/instrumentsKing/video_cover.png" alt class="cover">
        <img src="../../../assets/img/courseDetail/instrumentsKing/play.png" alt class="play">
        <video
          src="http://iguitar-new.iguitar.immusician.com/lhP_WrN7p2RcqL04_KtfqB38QMZ5"
          ref="music_basis"
          v-show="music_basis_video"
          controls="controls"
        ></video>
      </div>
      <div
        class="video_box"
        v-if="courseInfo.name=='器乐王国之旅'"
        @click="handleClick('music_basis','music_basis_video')"
      >
        <img src="../../../assets/img/courseDetail/instrumentsKing/video_cover.png" alt class="cover">
        <img src="../../../assets/img/courseDetail/instrumentsKing/play.png" alt class="play">
        <video
          src="http://iguitar-new.iguitar.immusician.com/ltfiQvA_ljoYfy12IeYrMBXsoSEh"
          ref="music_basis"
          v-show="music_basis_video"
          controls="controls"
        ></video>
      </div>
      <div
        class="video_box ac11"
        v-else-if="courseInfo.name=='音乐星球之旅'"
        @click="handleClick('music_basis','music_basis_video')"
      >
        <img src="../../../assets/img/courseDetail/instrumentsKing/course11.jpg" alt class="cover">
      </div>
      <div class="video_box" v-else @click="handleClick('music_basis','music_basis_video')">
        <img src="../../../assets/img/courseDetail/instrumentsKing/video_cover.png" alt class="cover">
        <img src="../../../assets/img/courseDetail/instrumentsKing/play.png" alt class="play">
        <video
          src="http://cdn.kids.immusician.com/web/music-base-h5/mp4/course_introduction/1556018694068132.mp4"
          ref="music_basis"
          v-show="music_basis_video"
          controls="controls"
        ></video>
      </div>
      <div class="text">
        <div class="intro_title" v-show="courseInfo.name">《{{courseInfo.name}}》</div>
        <div class="intro_item" v-for="(item,index) in brief" :key="index">
          <div class="intro_label">{{item.label}}</div>
          <div class="intro_item_content">{{item.content}}</div>
        </div>
      </div>
    </div>
    <div class="teacher ac11teacher" v-show="courseInfo.name==='音乐星球之旅'">
      <div class="teacher_img" style="border-radius:0%">
        <img src="../../../assets/img/courseDetail/instrumentsKing/logo.jpg" alt>
      </div>
      <div class="teacher_info">
        <!-- <div class="teacher_title">主讲老师：田园</div> -->
        <div
          class="teacher_intro"
        >音乐壳教研团队，10余位专业音乐教师，国内外专业音乐院校毕业。10余年一线少年儿童音乐素养培养，音基教学经验。熟知奥尔夫、柯达伊、达尔克罗兹三大音乐教学体系。</div>
      </div>
    </div>
    <div class="teacher" v-show="courseInfo.name!=='器乐王国之旅' && courseInfo.name!=='音乐星球之旅'">
      <div class="teacher_img">
        <img src="../../../assets/img/courseDetail/instrumentsKing/mobile_teacher.png" alt>
      </div>
      <div class="teacher_info">
        <div class="teacher_title">主讲老师：田园</div>
        <div
          class="teacher_intro"
        >美国波士顿大学音乐表演钢琴演奏专业硕士毕业，中国音乐学院音乐教育专业本科毕业，10年少儿音乐基础知识和钢琴教学经验，熟知国内外各大知名音乐考级体系。</div>
      </div>
    </div>
    <div class="teacher" v-show="courseInfo.name=='器乐王国之旅'">
      <div class="teacher_img">
        <img src="../../../assets/img/courseDetail/instrumentsKing/teacher.png" alt>
      </div>
      <div class="teacher_info">
        <div class="teacher_title">主讲老师：姗姗老师</div>
        <div class="teacher_intro">
          <p>美国伊斯曼音乐学院 音乐教育 硕士</p>
          <p>中央音乐学院 音乐教育 学士</p>
          <p>美国奥尔夫认证教师+柯达伊认证教师</p>
          <p>著有《AP 音乐理论》双语教材</p>
          <p>百度百科【奥尔夫音乐】词条解说人</p>
          <p>10年+儿童音乐教育经验</p>
        </div>
      </div>
    </div>
    <div v-show="courseInfo.name!=='音乐星球之旅'" class="feature">
      <div class="feature_row">
        <div class="feature_item">
          <img src="../../../assets/img/courseDetail/instrumentsKing/feature1.png" alt>
          <div>名师讲授</div>
        </div>
        <div class="feature_item">
          <img src="../../../assets/img/courseDetail/instrumentsKing/feature2.png" alt>
          <div>游戏互动</div>
        </div>
        <div class="feature_item">
          <img src="../../../assets/img/courseDetail/instrumentsKing/feature3.png" alt>
          <div>模拟题库</div>
        </div>
      </div>
      <div class="feature_row">
        <div class="feature_item">
          <img src="../../../assets/img/courseDetail/instrumentsKing/feature4.png" alt>
          <div>实时答疑</div>
        </div>
        <div class="feature_item">
          <img src="../../../assets/img/courseDetail/instrumentsKing/feature5.png" alt>
          <div>动画故事</div>
        </div>
        <div class="feature_item">
          <img src="../../../assets/img/courseDetail/instrumentsKing/feature6.png" alt>
          <div>一对一辅导</div>
        </div>
      </div>
    </div>
    <section v-show="courseInfo.name!=='音乐星球之旅'" class="introduction common_wrapper">
      <CourseCommonTitle>
        <template v-slot:title_zh>课程大纲</template>
        <template v-slot:title_en>Course Outline</template>
      </CourseCommonTitle>
      <div class="introduction_item">
        <div class="top_img_wrapper" v-if="this.outLineTop.length>0">
          <div class="level">LV1</div>
          <div class="font_area">
            <span class="main_title">{{this.outLineTop[0].main}}</span>
            <span class="text_title">{{this.outLineTop[0].sub}}</span>
            <span class="sub_title" v-show="this.outLineTop[0].text">—{{this.outLineTop[0].text}}</span>
          </div>
          <img class="top_img" src="../../../assets/img/courseDetail/instrumentsKing/mob_intro.png" alt>
        </div>

        <div class="introduction_item_content">
          <div class="intro_list_wrapper" v-for="(item,index) in outLine[0]" :key="index">
            <div class="intro_li_title">{{item.title}}</div>
            <div class="intro_li_content">
              <p>{{item.line1}}</p>
              <p>{{item.line2}}</p>
            </div>
          </div>
          <div class="harf_round"></div>
        </div>
      </div>
      <div class="introduction_item">
        <div class="top_img_wrapper" v-if="this.outLineTop.length>0">
          <div class="level">LV2</div>
          <div class="font_area">
            <span class="main_title">{{this.outLineTop[1].main}}</span>
            <span class="text_title">{{this.outLineTop[1].sub}}</span>
            <span class="sub_title" v-show="this.outLineTop[1].text">—{{this.outLineTop[1].text}}</span>
          </div>
          <img class="top_img" src="../../../assets/img/courseDetail/instrumentsKing/mob_intro.png" alt>
        </div>
        <div class="introduction_item_content">
          <div class="intro_list_wrapper" v-for="(item,index) in outLine[1]" :key="index">
            <div class="intro_li_title">{{item.title}}</div>
            <div class="intro_li_content">
              <p>{{item.line1}}</p>
              <p>{{item.line2}}</p>
            </div>
          </div>
          <div class="harf_round"></div>
        </div>
      </div>
      <div class="introduction_item">
        <div class="top_img_wrapper" v-if="this.outLineTop.length>0">
          <div class="level">LV3</div>
          <div class="font_area">
            <span class="main_title">{{this.outLineTop[2].main}}</span>
            <span class="text_title">{{this.outLineTop[2].sub}}</span>
            <span class="sub_title" v-show="this.outLineTop[2].text">—{{this.outLineTop[2].text}}</span>
          </div>
          <img class="top_img" src="../../../assets/img/courseDetail/instrumentsKing/mob_intro.png" alt>
        </div>
        <div class="introduction_item_content" style="background: #FFFAF7;">
          <div class="intro_list_wrapper" v-for="(item,index) in outLine[2]" :key="index">
            <div class="intro_li_title">{{item.title}}</div>
            <div class="intro_li_content">
              <p>{{item.line1}}</p>
              <p>{{item.line2}}</p>
            </div>
          </div>
          <div class="harf_round"></div>
          <div class="harf_round last"></div>
        </div>
      </div>
    </section>
    <section class="catalogue common_wrapper">
      <CourseCommonTitle>
        <template v-slot:title_zh>课程目录</template>
        <template v-slot:title_en>Course catalogue</template>
      </CourseCommonTitle>
      <div class="catalogue_main">
        <div class="top_section" v-show="catalogueTop.length>0">
          <div class="title">
            《乐理视唱练耳
            <span class="title_num">{{catalogueTop.length}}</span>课》
          </div>
          <div class="content">
            <div class="content_left">
              <p v-for="(item,index) in catalogueTop1" :key="index">
                <span class="index">{{formatNumber(index+1)}}</span>
                {{item}}
              </p>
            </div>
            <div class="content_right">
              <p v-for="(item,index) in catalogueTop2" :key="index">
                <span class="index">{{formatNumber(item.index+1)}}</span>
                {{item.v}}
              </p>
            </div>
          </div>
        </div>
        <div class="bottom_section" style="margin-bottom:30px">
          <div class="title" v-html="catalogueBottomTitle">
            <!-- <span>《音乐星球小动画</span>
            <span class="title_num">8</span>
            <span>个》</span>-->
            <!-- {{catalogueBottomTitle}} -->
          </div>
          <div class="content">
            <div class="lesson" v-for="(item,index) in catalogueBottom" :key="index">
              <p class="p_title">
                <span class="index">{{formatNumber(index+1) + ' '}}</span>
                {{item.line1}}
              </p>
              <p class="p_sub_title">{{item.line2}}</p>
              <p class="p_sub_title">{{item.line3}}</p>
            </div>
          </div>
        </div>
        <div class="bottom_section" v-show="catalogueBottom1.length>0">
          <div class="title" v-html="catalogueBottom1Title">
            <!-- 《音乐壳TV音乐会
            <span class="title_num">{{catalogueBottom1.length}}</span>个》-->
            <!-- {{catalogueBottom1Title}} -->
          </div>
          <div class="content">
            <div class="lesson" v-for="(item,index) in catalogueBottom1" :key="index">
              <p class="p_title">
                <span class="index">{{formatNumber(index+1) + ' '}}</span>
                {{item.line1}}
              </p>
              <p class="p_sub_title">{{item.line2}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <!-- 器乐王国之旅额外福利 -->
    <section class="catalogue common_wrapper extra_section" v-show="courseInfo.name=='器乐王国之旅'">
      <CourseCommonTitle>
        <template v-slot:title_zh>额外福利</template>
        <template v-slot:title_en>Course catalogue</template>
      </CourseCommonTitle>
      <div class="catalogue_main">
        <div class="top_section">
          <div class="content">
            <div class="content_left">
              <div class="harf_round"></div>
              <p class="extra_title">一、购买赠送课程配套精美资料包，包含：</p>
              <p>
                <span class="index">1</span>
                一套原创品质音乐绘本
              </p>
              <p>
                <span class="index">2</span>
                一套器乐闪卡
              </p>
              <p>
                <span class="index">3</span>
                一套活动操作卡
              </p>
              <p class="extra_title">二、加入学习群还可获得：</p>
              <p>
                <span class="index">1</span>
                家长课堂5节
              </p>
              <p>
                <span class="index">2</span>
                器乐欣赏歌单（内含世界名曲音乐选段67个）
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="remark common_wrapper" v-show="remarkArr && remarkArr.length>0">
      <CourseCommonTitle>
        <template v-slot:title_zh>用户评论</template>
        <template v-slot:title_en>User reviews</template>
      </CourseCommonTitle>
      <div class="remark_container wrapper">
       
      </div>
    </section>
  </div>
</template>
<script>
import {
  getQueryVariable,
  formatTime,
  isIphonex,
  formatNumber
} from "../../../common/util.js";
import CourseCommonTitle from "../../../components/CourseCommonTitle";

//import "./../utils/courseDetailRem.js";

const brief = [
  {
    label: "适用范围",
    content: "适用学完中国音乐学院一级课程或音乐基础水平较高儿童"
  },
  {
    label: "学习内容",
    content: "15课时+8个音乐常识小动画，上百个乐理视唱练耳练习"
  },
  {
    label: "学习方式",
    content: "在家上课，包学包过，一对一辅导"
  }
];
export default {
  data() {
    return {
      payIndex:1,
      courseInfo: {
        course: []
      },
      urlParams: {},
      music_basis_video: false,
      remarkArr: [],
      wxBoxShow: false,
      isIphonex: false,
      courseType: "",
      brief: [],
      outLine: [],
      outLineTop: [],
      catalogueTop: [],
      // catalogueTop1:[],
      // catalogueTop2:[],
      catalogueBottom: [],
      catalogueBottom1: [],
      catalogueBottomTitle: "",
      catalogueBottom1Title: "",
      outsideInfo:{

      },
      haveOutsideGoods:false,
    };
  },
  components: {
    CourseCommonTitle
  },
  computed: {
    //将catalogueTop分成左右两部分
    catalogueTop1() {
      var length = this.catalogueTop.length;
      return this.catalogueTop.slice(0, Math.ceil(length / 2));
    },
    catalogueTop2() {
      var length = this.catalogueTop.length;
      var arr = this.catalogueTop.slice(Math.ceil(length / 2));
      return arr.map((e, i) => {
        return { index: i + Math.ceil(length / 2), v: e };
      });
    }
  },
  created() {
    //document.documentElement.style.fontSize = "32px";
    // if (window.innerWidth > 600) {
    //   document.documentElement.style.fontSize = (24 / 375) * 100 + "vw";
    // } else {
    //   document.documentElement.style.fontSize = (32 / 375) * 100 + "vw";
    // }
    this.isIphonex = isIphonex();

    this.urlParams = {
      goodsId: getQueryVariable("goodsId"),
      share_channel: getQueryVariable("share_channel"),
      address: getQueryVariable("address"),
      phone: getQueryVariable("phone"),
      uid: getQueryVariable("uid"),
      token: getQueryVariable("token"),
      coupon_id: getQueryVariable("coupon_id")
    };
    localStorage.setItem("urlParams", JSON.stringify(this.urlParams));
    this.courseInfo =  JSON.parse(localStorage.getItem('courseInfo'))
    //this.getCoursetype(this.courseInfo.name);
    this.getCoursetype('器乐王国之旅');
  },
  destroyed() {
    if (document.documentElement.clientWidth < 900) {
      document.documentElement.style.fontSize = "18px";
    } else {
      document.documentElement.style.fontSize = "22px";
    }
  },
  methods: {
    formatNumber,
    formatTime: formatTime,
    toYouzan(){
      location.href = this.outsideInfo.goods_url;
    },
  
    handleClick(ref, video) {
      this.$refs[ref].play();
      this[video] = true;
    },
    toPay() {
      localStorage.setItem("courseInfo", JSON.stringify(this.courseInfo));
      if (process.env === "production") {
        this.callApp();
      }

      this.$router.push({
        name: "Pay"
      });
    },
    callApp() {
      // 由于对象映射，所以调用hello对象等于调用Android映射的对象
      // AndroidJS.hello("js调用了android中的hello方法");
      console.log("--- js调用了原生app中的方法 ---");
      var isIOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
      console.log(isIOS);
      if (isIOS) {
        window.webkit.messageHandlers.onBuyClick.postMessage({
          onBuyClick: "ture"
        });
      } else {
        PayFeedBack.onBuyClick("true");
      }
    },
    getCoursetype(name) {
      switch (name) {
        case "中国音乐学院音基考级一级课程":
          this.courseType = "G1";
          this.brief = [
            {
              label: "适用范围",
              content: "适用5岁及以上学习音乐的儿童"
            },
            {
              label: "学习内容",
              content: "16课时+8个音乐常识小动画，50个乐理视唱练耳练习"
            },
            {
              label: "学习方式",
              content: "在家上课，包学包过，一对一辅导"
            }
          ];
          this.outLineTop = [
            {
              main: "打好基础",
              sub: "(1-5)+2常识",
              text: "从识谱和节奏开始"
            },
            {
              main: "稳固提升",
              sub: "(6-12)+4常识",
              text: "快速认音 听对音准"
            },
            {
              main: "全面覆盖",
              sub: "(13-16)+4常识",
              text: "30个必考点 边学边测"
            }
          ];
          this.outLine = [
            [
              {
                top: {
                  main: "打好基础",
                  sub: "(1-5)+2常识",
                  text: "从识谱和节奏开始"
                },
                title: "乐理",
                line1: "学会5种常见音符，3种谱号，五线谱，四二拍；",
                line2: "认低音do到高音do一个八度音名，唱名及音高位置"
              },
              {
                title: "练耳",
                line1: "学会听辨一个八度音高；比较音高低及音符的长度；",
                line2: "感知四二拍音乐律动"
              },
              {
                title: "视唱",
                line1: "学会敲击单位拍，唱念节奏；跟四二拍旋律完整视唱",
                line2: ""
              },
              {
                title: "常识",
                line1:
                  "了解3种键盘乐器，5种常见中外拉弦乐乐器，并听辨它们的音色",
                line2: ""
              }
            ],
            [
              {
                title: "乐理",
                line1:
                  "学会5种常见休止符，音符时值组合及节奏型；扩展更多高低音；学习c大调音阶，全音半音，大小二度，三度音程",
                line2: ""
              },
              {
                title: "练耳",
                line1:
                  "学会听辨节奏型，全音半音，大小二度三度音程，旋律走向及更多音高的比较",
                line2: ""
              },
              {
                title: "视唱",
                line1: "学会视唱更多的旋律，节奏，音准，唱名，全面提升",
                line2: ""
              },
              {
                title: "常识",
                line1:
                  "了解7种中外弹拨乐，十几种常见中外吹奏乐器，6种中外打击乐器，并听辨它们的音色",
                line2: ""
              }
            ],
            [
              {
                title: "乐理",
                line1:
                  "学会四三拍，3种附点音符及附点节奏；学习跳音，同音连线及力度，速度术语，音乐情绪；综合复习所有知识点",
                line2: ""
              },
              {
                title: "练耳",
                line1:
                  "学会听辨两种常见拍号，附点节奏，力度，速度及音乐情绪，巩固旋律音高听辨",
                line2: ""
              },
              {
                title: "视唱",
                line1: "学会视唱四三拍附点节奏旋律，巩固所有旋律音高视唱",
                line2: ""
              },
              {
                title: "常识",
                line1: "了解10位中外著名音乐家以及他们的代表作品",
                line2: ""
              }
            ]
          ];
          this.catalogueTop = [
            "快乐音符",
            "掌中五线谱",
            "音名与唱名",
            "学习四二拍",
            "旋律中的音高",
            "不发声的休止符",
            "音符时值与节奏",
            "熟练高低音",
            "C大调音阶",
            "二度音程",
            "三度音程",
            "音程聚会",
            "学习四三拍",
            "不一样的附点",
            "音符与节拍",
            "音乐中的情感"
          ];
          this.catalogueBottom = [
            {
              line1: "穿越键盘星球",
              line2: "乐器之王钢琴，管风琴，手风琴"
            },
            {
              line1: "弦乐星球1号",
              line2: "中西方拉弦乐小提琴、中提琴，二胡等"
            },
            {
              line1: "弦乐星球2号",
              line2: "中西方弹拨乐琵琶，古筝，竖琴等"
            },
            {
              line1: "吹奏乐星球1号",
              line2: "中西方吹奏乐长笛、单簧管、唢呐等"
            },
            {
              line1: "吹奏乐星球2号",
              line2: "西方铜管乐大管、圆号、小号等"
            },
            {
              line1: "打击乐星球",
              line2: "中西方打击乐小军鼓、响板，锣等"
            },
            {
              line1: "西方音乐家星球",
              line2: "巴赫，莫扎特、贝多芬等"
            },
            {
              line1: "中央音乐家星球",
              line2: "冼星海、王洛宾、聂耳等"
            }
          ];
          this.catalogueBottomTitle = `《音乐星球小动画<span class="title_num">${
            this.catalogueBottom.length
          }</span>个》`;
          break;
        case "中国音乐学院音基考级二级课程":
          this.courseType = "G2";
          this.brief = [
            {
              label: "适用范围",
              content: "适用学完中国音乐学院一级课程或音乐基础水平较高儿童"
            },
            {
              label: "学习内容",
              content: "15课时+8个音乐常识小动画，上百个乐理视唱练耳练习"
            },
            {
              label: "学习方式",
              content: "在家上课，包学包过，一对一辅导"
            }
          ];
          this.outLineTop = [
            {
              main: "巩固拓展",
              sub: "(1-6)+2常识",
              text: "从复拍子到所有音程学习"
            },
            {
              main: "快速进阶",
              sub: "(7-12)+4常识",
              text: "多样的节奏,不一样的调式"
            },
            {
              main: "全面提升",
              sub: "(13-15)+4常识",
              text: "结合考点，边学边测"
            }
          ];
          this.outLine = [
            [
              {
                title: "乐理",
                line1:
                  "学会所有自然音程，音数计算，能够向上、向下构写音程.学习四四拍及其律动规律",
                line2: ""
              },
              {
                title: "练耳",
                line1:
                  "学会模唱大小二三、纯四、纯五和纯八度音程，听辨区分音程、协和与不协和；感知四四拍音乐律动",
                line2: ""
              },
              { title: "视唱", line1: "学会四四拍旋律完整视唱", line2: "" },
              {
                title: "常识",
                line1:
                  "了解3种键盘乐器，5种常见中外拉弦乐乐器，并听辨它们的音色",
                line2: ""
              }
            ],
            [
              {
                title: "乐理",
                line1:
                  "学会十六分音符及时值计算，复习三种节拍和多种节奏型；学习a小调音阶、音级，认识平行大小调以及大小调的色彩",
                line2: ""
              },
              {
                title: "练耳",
                line1:
                  "学会模唱a小调音阶，能够听辨音组、大小调色彩，感受旋律选节拍",
                line2: ""
              },
              {
                title: "视唱",
                line1: "学会视唱小调旋律，挑战带有十六分音符节奏的视唱",
                line2: ""
              },
              {
                title: "常识",
                line1:
                  "了解7种中外弹拨乐，十几种常见中外吹奏乐器，6种中外打击乐器，并听辨它们的音色",
                line2: ""
              }
            ],
            [
              {
                title: "乐理",
                line1:
                  "学会大小三和弦，音乐中的演奏法及常用记号，如连音记号、断音记号、保持音记号、换气记号",
                line2: ""
              },
              {
                title: "练耳",
                line1: "学会听辨音组、演奏记号，能够听旋律补充空缺的小节",
                line2: ""
              },
              {
                title: "视唱",
                line1: "学会带有演奏法及常用记号的视唱",
                line2: ""
              },
              {
                title: "常识",
                line1: "了解10位中外著名音乐家以及他们的代表作品",
                line2: ""
              }
            ]
          ];
          this.catalogueTop = [
            "新的复拍子",
            "二度与三度音程",
            "四度音程",
            "五度音程",
            "不一样的音程色彩",
            "音程家族来聚会",
            "十六分音符快快跑",
            "有趣的节奏型",
            "节拍与节奏",
            "暗淡的小调",
            "平行大小调",
            "音乐调性与情绪",
            "学习三和弦",
            "分一分大小三和弦",
            "有用的符号"
          ];
          this.catalogueBottom = [
            {
              line1: "穿越键盘星球",
              line2: "乐器之王钢琴，管风琴，手风琴"
            },
            {
              line1: "弦乐星球1号",
              line2: "中西方拉弦乐小提琴、中提琴，二胡等"
            },
            {
              line1: "弦乐星球2号",
              line2: "中西方弹拨乐琵琶，古筝，竖琴等"
            },
            {
              line1: "吹奏乐星球1号",
              line2: "中西方吹奏乐长笛、单簧管、唢呐等"
            },
            {
              line1: "吹奏乐星球2号",
              line2: "西方铜管乐大管、圆号、小号等"
            },
            {
              line1: "打击乐星球",
              line2: "中西方打击乐小军鼓、响板，锣等"
            },
            {
              line1: "西方音乐家星球",
              line2: "巴赫，莫扎特、贝多芬等"
            },
            {
              line1: "中央音乐家星球",
              line2: "冼星海、王洛宾、聂耳等"
            }
          ];
          this.catalogueBottomTitle = `《音乐星球小动画<span class="title_num">${
            this.catalogueBottom.length
          }</span>个》`;
          break;
        case "中央音乐学院音基考级初级课程":
          this.courseType = "Y1";
          this.brief = [
            {
              label: "适用范围",
              content: "适用5岁及以上学习音乐的儿童"
            },
            {
              label: "学习内容",
              content: "20课时+18个音乐常识小动画，近1000道测练模拟题"
            },
            {
              label: "学习方式",
              content: "在家上课，包学包过，一对一辅导"
            }
          ];

          this.outLineTop = [
            {
              main: "打好基础",
              sub: "(1-8)+2常识",
              text: "从识谱和节奏开始"
            },
            {
              main: "稳固提升",
              sub: "(9-14)+4常识",
              text: "拓展音乐知识，听对唱准"
            },
            {
              main: "全面覆盖",
              sub: "(15-20)+2常识",
              text: "28个必考点，边学边测"
            }
          ];

          this.outLine = [
            [
              {
                title: "乐理",
                line1:
                  "学会常用音符和休止符，时值计算，音阶，能够掌握反复记号、临时变音记号",
                line2: "学习四四拍、四三拍及其指挥图示"
              },
              {
                title: "练耳",
                line1: "学会打单位拍，可以听辨旋律中的节奏、单音；",
                line2: "听辩四四拍、四三拍，模唱C大调音阶"
              },
              {
                title: "视唱",
                line1: "学会四四拍、四三拍旋律完整视唱",
                line2: ""
              },
              {
                title: "常识",
                line1: "了解童声、女声、男声演唱形式，以及中国汉族民歌",
                line2: ""
              }
            ],
            [
              {
                title: "乐理",
                line1:
                  "认识四二拍、四二拍的指挥图示和低音谱表的音，学会小附点节奏型及时值计算，掌握同音连线、表情连线等音乐记号；学习常用速度术语",
                line2: ""
              },
              {
                title: "练耳",
                line1:
                  "学会听辨速度术语、力度变化，可以进行旋律音高模唱，听写节奏",
                line2: ""
              },
              {
                title: "视唱",
                line1: "学会四二拍和带有常用记号的视唱",
                line2: ""
              },
              {
                title: "常识",
                line1: "了解少数民族民歌、外国民歌，以及3种键盘乐器和9种弦乐器",
                line2: ""
              }
            ],
            [
              {
                title: "乐理",
                line1:
                  "学会八六拍、八六拍的指挥图示，掌握音程并能够向上、向下构写音程，拓展音乐中的力度记号及常用记号，如重音记号、保持音记号、呼吸记号",
                line2: ""
              },
              {
                title: "练耳",
                line1:
                  "学会听辨八六拍、四二拍，模唱并听辨二度、三度、五度、八度音程，听辨单音、旋律",
                line2: ""
              },
              {
                title: "视唱",
                line1: "学会八六拍、带有演奏法及常用记号的视唱",
                line2: ""
              },
              {
                title: "常识",
                line1: "了解17种中国乐器和19种西方乐器，还要认识管弦乐队",
                line2: ""
              }
            ]
          ];
          this.catalogueTop = [
            "走进音乐王国",
            "音符来聚会",
            "小小指挥家",
            "彩虹音阶",
            "附点音符",
            "认识更多的音",
            "快乐的三拍子",
            "不发声的休止符",
            "音符与节奏",
            "特别的小附点",
            "好玩的模进",
            "常用速度术语",
            "新的节拍",
            "低音王国",
            "有用的音乐记号",
            "旋转的八六拍",
            "节奏对对碰",
            "音程聚会",
            "不一样的三连音",
            "玩转节拍与旋律"
          ];
          this.catalogueBottom = [
            {
              line1: "穿越键盘星球",
              line2: "乐器之王钢琴，管风琴，手风琴"
            },
            {
              line1: "弦乐星球1号",
              line2: "中西方拉弦乐小提琴、中提琴，二胡等"
            },
            {
              line1: "弦乐星球2号",
              line2: "中西方弹拨乐琵琶，古筝，竖琴等"
            },
            {
              line1: "吹奏乐星球1号",
              line2: "中西方吹奏乐长笛、箫、唢呐等"
            },
            {
              line1: "吹奏乐星球2号",
              line2: "西方铜管乐大管、圆号、小号等"
            },
            {
              line1: "打击乐星球1号",
              line2: "中西方打击乐小军鼓、定音鼓，大堂鼓等"
            },
            {
              line1: "打击乐星球2号",
              line2: "中西方打击乐铜钹、木琴，锣等"
            },
            {
              line1: "西方管弦乐队星球",
              line2: "认识管弦乐队"
            }
          ];
          this.catalogueBottom1 = [
            {
              line1: "童声音乐会第一场",
              line2: "童声独唱，童声齐唱《小杜鹃》"
            },
            {
              line1: "童声音乐会第二场",
              line2: "童声独唱《小燕子》，童声齐唱"
            },
            {
              line1: "女生音乐会",
              line2: "女高音独唱、女中音独唱等"
            },
            {
              line1: "男生音乐会",
              line2: "男高音独唱、男中音独唱等"
            },
            {
              line1: "中国汉族民歌音乐会",
              line2: "陕北民歌、山西民歌等"
            },
            {
              line1: "中国汉族民歌音乐会第二场",
              line2: "山东民歌、四川民歌等"
            },
            {
              line1: "中国少数民族民歌音乐会",
              line2: "蒙古族民歌、哈萨克族民歌等"
            },
            {
              line1: "中国少数民族民歌音乐会第二场",
              line2: "朝鲜族民歌、彝族民歌等"
            },
            {
              line1: "外国民歌音乐会",
              line2: "日本民歌、印尼民歌等"
            },
            {
              line1: "外国民歌音乐会第二场",
              line2: "俄罗斯民歌、苏格兰民歌等"
            }
          ];
          this.catalogueBottomTitle = `《音乐星球小动画<span class="title_num">${
            this.catalogueBottom.length
          }</span>个》`;
          this.catalogueBottom1Title = `《音乐壳TV音乐会<span class="title_num">${
            this.catalogueBottom1.length
          }</span>个》`;
          break;
        case "中央音乐学院音基考级二级课程":
          this.courseType = "Y2";
          this.brief = [
            {
              label: "适用范围",
              content: "适用学完中国音乐学院一级课程或音乐基础水平较高儿童"
            },
            {
              label: "学习内容",
              content: "15课时+8个音乐常识小动画，上百个乐理视唱练耳练习"
            },
            {
              label: "学习方式",
              content: "在家上课，包学包过，一对一辅导"
            }
          ];
          this.outLine = [
            [
              {
                title: "乐理",
                line1:
                  "学会所有自然音程，音数计算，能够向上、向下构写音程.学习四四拍及其律动规律",
                line2: ""
              },
              {
                title: "练耳",
                line1:
                  "学会模唱大小二三、纯四、纯五和纯八度音程，听辨区分音程、协和与不协和；感知四四拍音乐律动",
                line2: ""
              },
              { title: "视唱", line1: "学会四四拍旋律完整视唱", line2: "" },
              {
                title: "常识",
                line1:
                  "了解3种键盘乐器，5种常见中外拉弦乐乐器，并听辨它们的音色",
                line2: ""
              }
            ],
            [
              {
                title: "乐理",
                line1:
                  "学会十六分音符及时值计算，复习三种节拍和多种节奏型；学习a小调音阶、音级，认识平行大小调以及大小调的色彩",
                line2: ""
              },
              {
                title: "练耳",
                line1:
                  "学会模唱a小调音阶，能够听辨音组、大小调色彩，感受旋律选节拍",
                line2: ""
              },
              {
                title: "视唱",
                line1: "学会视唱小调旋律，挑战带有十六分音符节奏的视唱",
                line2: ""
              },
              {
                title: "常识",
                line1:
                  "了解7种中外弹拨乐，十几种常见中外吹奏乐器，6种中外打击乐器，并听辨它们的音色",
                line2: ""
              }
            ],
            [
              {
                title: "乐理",
                line1:
                  "学会大小三和弦，音乐中的演奏法及常用记号，如连音记号、断音记号、保持音记号、换气记号",
                line2: ""
              },
              {
                title: "练耳",
                line1: "学会听辨音组、演奏记号，能够听旋律补充空缺的小节",
                line2: ""
              },
              {
                title: "视唱",
                line1: "学会带有演奏法及常用记号的视唱",
                line2: ""
              },
              {
                title: "常识",
                line1: "了解10位中外著名音乐家以及他们的代表作品",
                line2: ""
              }
            ]
          ];
          this.catalogueBottomTitle = `《音乐星球小动画${
            this.catalogueBottom.length
          }个》`;
          break;
        case "音基启蒙课":
          //this.courseType = "Q1";
          this.brief = [
            {
              label: "适用范围",
              content: "适用4-6岁零基础的孩子学习"
            },
            {
              label: "学习内容",
              content: "16课时+16个音乐常识小动画"
            },
            {
              label: "学习方式",
              content: "在家上课，包学包过，一对一辅导"
            }
          ];
          //outline是课程大纲
          this.outLineTop = [
            {
              main: "打好基础",
              sub: "(1-6)+6常识",
              text: "从识谱和节奏开始"
            },
            {
              main: "稳固提升",
              sub: "(7-11)+5常识",
              text: "快速认音，听对唱准"
            },
            {
              main: "全面覆盖",
              sub: "(12-16)+5常识",
              text: "稳步前进，拓展知识"
            }
          ];
          this.outLine = [
            [
              {
                title: "乐理",
                line1:
                  "学会4种常见音符、休止符，2种谱号，五线谱，四四拍；认识音do到sol的唱名及音高位置",
                line2: ""
              },
              {
                title: "练耳",
                line1:
                  "学会听辨音符音高；比较音高低及音符的长度；感知四四拍音乐律动",
                line2: ""
              },
              {
                title: "视唱",
                line1: "学会敲击单位拍，唱念节奏；跟四四拍旋律完整视唱",
                line2: ""
              },
              {
                title: "常识",
                line1:
                  "了解3种键盘乐器，常见中外拉弦乐乐器、吹奏乐器，并听辨它们的音色",
                line2: ""
              }
            ],
            [
              {
                title: "乐理",
                line1:
                  "认识音do到高音fa的唱名及音高位置，学习c大调音阶，全音半音，二度音程，三度音程，四种力度记号",
                line2: ""
              },
              {
                title: "练耳",
                line1:
                  "学会听辨节奏型、听辨力度变化，全音半音，二度三度音程，及更多音高的比较",
                line2: ""
              },
              {
                title: "视唱",
                line1: "学会模唱，视唱更多的旋律，节奏，音准，唱名，全面提升",
                line2: ""
              },
              {
                title: "常识",
                line1:
                  "了解中外打击乐器，并听辨它们的音色，认识童声、女声演唱形式",
                line2: ""
              }
            ],
            [
              {
                title: "乐理",
                line1:
                  "学会四三拍，附点音符及附点节奏；学习跳音，同音连线及速度术语、音乐情绪；综合复习所有知识点",
                line2: ""
              },
              {
                title: "练耳",
                line1:
                  "学会听辨两种常见拍号，附点节奏，速度及音乐情绪，巩固旋律音高听辨",
                line2: ""
              },
              {
                title: "视唱",
                line1: "学会视唱四三拍附点节奏旋律，巩固所有旋律音高视唱",
                line2: ""
              },
              {
                title: "常识",
                line1: "了解男生演唱形式，中国少数民族民歌以及外国民歌",
                line2: ""
              }
            ]
          ];
          //课程目录三大块
          this.catalogueTop = [
            "音符披萨",
            "手掌五线谱",
            "我的第一条视唱",
            "小小指挥家",
            "爱睡觉的休止符",
            "玩转节奏",
            "畅游旋律王国",
            "彩虹音阶",
            "音程朋友",
            "有趣的力度记号",
            "认识高音朋友",
            "舞动的三拍子",
            "好玩的速度与表情",
            "唱唱低音",
            "不一样的附点",
            "有用的音乐记号"
          ];
          this.catalogueBottom = [
            {
              line1: "穿越键盘星球",
              line2: "乐器之王钢琴，管风琴，手风琴"
            },
            {
              line1: "弦乐星球1号",
              line2: "中西方拉弦乐小提琴、中提琴，二胡等"
            },
            {
              line1: "弦乐星球2号",
              line2: "中西方弹拨乐琵琶，古筝，竖琴等"
            },
            {
              line1: "吹奏乐星球1号",
              line2: "中西方吹奏乐长笛、箫、唢呐等"
            },
            {
              line1: "吹奏乐星球2号",
              line2: "西方铜管乐大管、圆号、小号等"
            },
            {
              line1: "打击乐星球1号",
              line2: "中西方打击乐小军鼓、定音鼓，大堂鼓等"
            },
            {
              line1: "打击乐星球2号",
              line2: "中西方打击乐铜钹、木琴，锣等"
            },
            {
              line1: "西方管弦乐队星球",
              line2: "认识管弦乐队"
            }
          ];
          this.catalogueBottom1 = [
            {
              line1: "童声音乐会第一场",
              line2: "童声独唱，童声齐唱《小杜鹃》"
            },
            {
              line1: "童声音乐会第二场",
              line2: "童声独唱《小燕子》，童声齐唱"
            },
            {
              line1: "女生音乐会",
              line2: "女高音独唱、女中音独唱等"
            },
            {
              line1: "男生音乐会",
              line2: "男高音独唱、男中音独唱等"
            },
            {
              line1: "中国少数民族民歌音乐会",
              line2: "蒙古族民歌、哈萨克族民歌等"
            },
            {
              line1: "中国少数民族民歌音乐会第二场",
              line2: "朝鲜族民歌、彝族民歌等"
            },
            {
              line1: "外国民歌音乐会",
              line2: "日本民歌、印尼民歌等"
            },
            {
              line1: "外国民歌音乐会第二场",
              line2: "俄罗斯民歌、苏格兰民歌等"
            }
          ];
          this.catalogueBottomTitle = `《音乐星球小动画<span class="title_num">${
            this.catalogueBottom.length
          }</span>个》`;
          this.catalogueBottom1Title = `《音乐壳TV音乐会<span class="title_num">${
            this.catalogueBottom1.length
          }</span>个》`;
          break;
        case "器乐王国之旅":
          this.brief = [
            {
              label: "适用范围",
              content: "适用于2-6岁幼儿音乐启蒙"
            },
            {
              label: "学习内容",
              content:
                "带领小朋友感受、欣赏多种乐器及音乐作品，形成自己的音乐偏好并发掘潜能；激发孩子想象力和创造力，体会“玩”音乐的乐趣"
            },
            {
              label: "学习方式",
              content:
                "足不出户，通过互动式游戏模拟体验、辨别不同乐器的演奏方式及音效"
            }
          ];
          //outline是课程大纲
          //lv123的主标题
          this.outLineTop = [
            {
              main: "打开器乐奇妙之旅",
              sub: "",
              text: ""
            },
            {
              main: "小动物带你玩转乐器",
              sub: "",
              text: ""
            },
            {
              main: "动物小乐队即兴创作",
              sub: "",
              text: ""
            }
          ];
          this.outLine = [
            [
              {
                title: "",
                line1: "发挥音乐想象力，把不同乐器演奏的音乐跟可爱星星配对",
                line2: ""
              },
              {
                title: "",
                line1: "根据孩子对于音色的偏好选择器乐并生成个性化学习顺序",
                line2: ""
              }
            ],
            [
              {
                title: "器乐分类",
                line1: "铜管乐器、木管乐器、弦乐、键盘乐、嗓音、打击乐",
                line2: ""
              },
              {
                title: "常识",
                line1:
                  "不同乐器的种类、外形、演奏方式的介绍，不同乐器在音色上的特性",
                line2: ""
              },
              {
                title: "赏析",
                line1:
                  "配合乐器来欣赏20余首经典乐曲乐段，发展孩子音乐听觉能力和欣赏水平",
                line2: ""
              },
              {
                title: "听力",
                line1: "不同乐器的音色辨别",
                line2: ""
              },
              {
                title: "演奏",
                line1: "体验不同乐器的演奏",
                line2: ""
              }
            ],
            [
              {
                title: "",
                line1: "复习巩固五种器乐类型",
                line2: ""
              },
              {
                title: "",
                line1: "探索乐器组合创作",
                line2: ""
              }
            ]
          ];
          //课程目录三大块
          this.catalogueBottom = [
            {
              line1: "Coco音乐奇妙夜",
              line2: "了解常见器乐种类的音色",
              line3: "根据音色选择器乐偏好，自动生成学习顺序"
            },
            {
              line1: "玩弦乐的天鹅家族",
              line2: "弓弦乐器（小提琴，中提琴，大提琴，低音提琴）",
              line3: "弹拨乐器（尤克里里，吉他，竖琴）"
            },
            {
              line1: "吹木管的袋鼠家族",
              line2: "长笛，单簧管，双簧管，巴松，萨克斯"
            },
            {
              line1: "吹铜管的河马家族",
              line2: "小号，长号，圆号，大号"
            },
            {
              line1: "敲打击乐的毛毛虫",
              line2: "非洲鼓，三角铁，铃鼓，沙锤，木琴，钟琴"
            },
            {
              line1: "钢琴师八爪鱼和它的朋友",
              line2: "钢琴（键盘），嗓音，身体打击乐"
            },
            {
              line1: "动物音乐会大联欢",
              line2: "五种器乐的区分与组合创作"
            }
          ];
          this.catalogueBottom1 = [
            {
              line1: "会唱歌的皮鞋",
              line2: "关于小提琴家帕格尼尼的趣事"
            },
            {
              line1: "木管的交响童话",
              line2: "交响童话《彼得与狼》"
            },
            {
              line1: "会变身的铜管",
              line2: "铜管乐器的趣味知识"
            },
            {
              line1: "巨大的鼓",
              line2: "非洲鼓诞生的童话故事"
            },
            {
              line1: "皇帝的钢琴",
              line2: "钢琴演变的故事"
            }
          ];
          this.catalogueBottomTitle = `《主课内容》`;
          this.catalogueBottom1Title = `《器乐文化小故事》`;
          break;
        case "音乐星球之旅":
          this.brief = [
            {
              label: "适用范围",
              content: "3-12岁儿童音乐常识的拓展与丰富"
            },
            {
              label: "学习目标",
              content:
                "点燃孩子学习音乐的兴趣、丰富拓展音乐常识、开阔眼界；了解40种经典乐器及音色、了解中外著名音乐家；激发孩子音乐学习潜能，认识、听辨、欣赏，全面提升音乐素养"
            },
            {
              label: "学习方式",
              content:
                "足不出户，名师带着孩子通过原创故事动画了解各种器乐知识以互动式游戏体验认，听，辨，赏等调动多感官综合学习"
            }
          ];
          //outline是课程大纲
          //lv123的主标题
          //课程目录三大块
          this.catalogueBottom = [
            {
              line1: "穿越键盘星球",
              line2: "——乐器之王钢琴，管风琴，手风琴"
            },
            {
              line1: "弦乐星球1号",
              line2: "——中西方拉弦乐小提琴、中提琴，二胡等"
            },
            {
              line1: "弦乐星球2号",
              line2: "——中西方弹拨乐琵琶，古筝，竖琴等"
            },
            {
              line1: "吹奏乐星球1号",
              line2: "——中西方吹奏乐长笛、箫、唢呐等"
            },
            {
              line1: "吹奏乐星球2号",
              line2: "——西方铜管乐大号、圆号、小号等"
            },
            {
              line1: "打击乐星球1号",
              line2: "——中西方打击乐小军鼓、定音鼓，大堂鼓等"
            },
            {
              line1: "西方管弦乐队星球",
              line2: "——认识管弦乐队"
            },
            {
              line1: "中国音乐家",
              line2: "——冼星海、王洛宾、聂耳等"
            },
            {
              line1: "西方音乐家",
              line2: "——巴赫，莫扎特、贝多芬等"
            }
          ];

          this.catalogueBottomTitle = `《主课内容》`;
          //this.catalogueBottom1Title = `《器乐文化小故事》`;
          break;
      }
    },
    toEvaluaList() {
      if (this.courseInfo.evaluate.length > 0) {
        this.$router.push({
          name: "EvaluationList",
          params: { evaluaList: this.courseInfo.evaluate }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
 @import url("../../../common/common.less");

.page_wrapper {
  margin-bottom: 60px;
}
.common_section {
  background-color: #fff;
  margin: 0 15px;
  padding: 0 15px;
  .section_title {
    text-align: center;
    padding: 0px 0 15px 0;
    .text_decoration {
      display: inline-block;
      vertical-align: middle;
      width: 40px;
      height: 6px;
      background: #ffad8f;
      box-shadow: 0 2px 4px 0 #ffd7c9;
      border-radius: 10px;
    }
    .title_text {
      vertical-align: middle;
      font-family: PingFangSC-Medium;
      font-size: 16px;
      color: #333333;
      margin: 0 15px;
    }
  }
}
.teacher_container {
  .section_title {
    padding: 20px 0 15px 0;
  }
  .teacher_wrapper {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
  @media screen and (min-width: 1023px) {
    .teacher_img {
      width: 40%;
      margin: 0 20px 0 0 !important;
    }
  }
  .teacher_img {
    margin: 0 auto;
    text-align: center;
    img {
      width: 91%;
    }
  }
  .teacher_detail {
    .teacher_name {
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      color: #333333;
      margin: 15px 0;
    }
    .introduction {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #333333;
      & > div {
        display: flex;
        align-items: center;
        line-height: 22px;
        .dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #ffad8f;
          margin-right: 8px;
        }
      }
    }
  }
}
.section_bottom_line {
  display: flex;
  justify-content: space-between;
  background-color: #fff;
  padding: 20px 0px 20px 0;
  margin: 0 15px;
  .bottom_line_dot {
    display: inline-block;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: #f7f7f5;
    &:first-child {
      margin-left: -6px;
    }
    &:last-child {
      margin-right: -6px;
    }
  }
}
.sale_package {
  width: 100%;
  height: 120px;
  background: url("./../../../assets/img/courseDetail/instrumentsKing/pic_bundle_bg.png") no-repeat center;
  background-size: cover;
  box-sizing: border-box;
  margin: 10px 0;
  padding: 15px;
  display: flex;
  justify-content: space-around;
  .cover {
    width: 160px;
    height: 90px;
  }
  .price {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 169px;
    height: 40px;
    padding: 0 10px;
    border-radius: 4px;
    background: url("./../../../assets/img/courseDetail/instrumentsKing/price_bg.png") no-repeat center;
    background-size: cover;
    .origin_price {
      font-family: PingFangSC-Semibold;
      font-size: 11px;
      color: #402500;
      text-decoration: line-through;
    }
    .price_text {
      font-family: PingFangSC-Semibold;
      font-size: 14px;
      color: #402500;
    }
    .now_price {
      font-family: PingFangSC-Semibold;
      font-size: 18px;
      color: #ec545e;
    }
  }
  .lessons {
    margin-top: 15px;
    font-family: PingFangSC-Regular;
    font-size: 11px;
    color: #402500;
    line-height: 18px;
    & > div {
      font-size: 0;
      .lesson_name {
        display: inline-block;
        vertical-align: middle;
        width: 80%;
        font-size: 11px;
        .ellipsis;
      }
      .lessons_n {
        display: inline-block;
        vertical-align: middle;
        color: #ec545e;
        font-size: 11px !important;
      }
    }
  }
}
.banner {
  width: 100%;
  height: 100px;
  background: url("https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1551345964066&di=89273e7d75317455faae336d1064ef07&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fimage%2Fpic%2Fitem%2Fcefc1e178a82b901fd40c8077d8da9773912ef11.jpg")
    no-repeat center;
  background-size: cover;
}
@media screen and (min-width: 1023px) {
  .banner {
    height: 160px;
  }
}
.base_info {
  background-color: #fff;
  margin-bottom: 10px;
  padding: 0 15px;
  .base_info_top {
    display: flex;
    align-items: center;
    height: 44px;
    .course_name {
      flex-grow: 1;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #333333;
      letter-spacing: 0;
    }
    .person_num {
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #999999;
      letter-spacing: 0;
    }
  }
  .base_info_bottom {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    height: 41px;
    justify-content: space-between;
    .lesson_num,
    .teacher,
    .duration {
      display: flex;
      align-items: center;
      font-family: PingFangSC-Regular;
      font-size: 11px;
      color: #333333;
      text-align: center;
      line-height: 11px;
      img {
        margin-right: 6px;
      }
    }
    .lesson_num {
      img {
        width: 10px;
      }
    }
    .teacher {
      img {
        width: 10px;
      }
    }
    .duration {
      img {
        width: 12px;
      }
    }
  }
}
.service_wrapper {
  font-family: PingFangSC-Regular;
  font-size: 12px;
  color: #151515;
  letter-spacing: 0;
  text-align: justify;
  line-height: 18px;
  .service_item {
    padding-bottom: 20px;
    img {
      width: 314px;
    }
  }
  .service_content {
    white-space: normal;
    word-break: break-all;
  }
  .service_item_index {
    font-family: DINCond-Bold;
    font-size: 30px;
    color: #333333;
  }
  .service_img_wrapper {
    text-align: center;
    img {
      max-width: 80%;
      margin-top: 10px;
    }
  }
}


.lesson_wrapper {
  border-radius: 8px;
  padding: 0 20px;
  background-color: #ffc367;
  font-family: PingFangSC-Regular;
  font-size: 14px;
  color: #151515;
  letter-spacing: 0;
  line-height: 14px;
  .lesson_index {
    font-family: PingFangSC-Semibold;
    margin-right: 10px;
  }
  .lesson_item {
    line-height: 40px;
  }
}

.wx_box {
  position: relative;
  border-radius: 3px;
  background-color: #fff;
  text-align: center;
  box-sizing: border-box;
  width: 150px;
  padding: 32px 0 29px 0;
  .wx_img {
    width: 60px;
  }
  .add_wx {
    font-size: 8px;
    color: #ffab0c;
    margin: 9px 20px;
  }
  .copy_wx {
    border: none;
    outline: none;
    display: inline-block;
    width: 72px;
    height: 18px;
    line-height: 18px;
    border-radius: 18px;
    font-size: 8px;
    color: #ffffff;
    background: #fd9f24;
    text-align: center;
    box-shadow: 0px 2px 2px -1px #ece3d2;
  }
  .close {
    position: absolute;
    top: 0;
    right: 0;
    padding: 5px 5px 10px 10px;
    width:12px;
  }
}
.video_model {
  .common_wrapper;
  position: relative;
  border-bottom: 1px solid transparent;
  margin-bottom: 18px;
  .video_box {
    position: relative;
    .cover {
      width: 100%;
    }
    .play {
      width: 19px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
    .video_info {
      position: absolute;
      left: 7px;
      bottom: 7px;
      display: flex;
      align-items: center;
      .info_title {
        margin-right: 9px;
        font-size: 9px;
        color: #ffffff;
      }
      .info_title::after {
        content: "";
        position: absolute;
        left: 2px;
        bottom: -1px;
        height: 2px;
        width: 9px;
        background-color: #ffaa06;
      }
      .info_sub_title {
        font-size: 6px;
        color: #ffffff;
      }
    }
    video {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      z-index: 5;
    }
  }
  .text {
    position: absolute;
    bottom: 0px;
    left: 50%;
    width: 86%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 2px;
    box-sizing: border-box;
    padding: 9px 2px;
    font-size: 12px;
    color: #666666;
    letter-spacing: 1px;
    line-height: 17px;
    box-shadow: 0px 11px 21px -9px #ece3d2;
    .intro_title {
      font-size: 18px;
      color: #333333;
      text-align: center;
      margin-bottom: 12px;
    }
    .intro_item {
      display: flex;
      margin-bottom: 7px;
    }
    .intro_label,
    .intro_item_content {
      //display: inline-block;
      position: relative;
    }
    .intro_label {
      padding: 0 10px 0 10px;
      width: 60px;
      flex-shrink: 0;
      flex-grow: 0;
    }
    .intro_label:before {
      content: "";
      width: 4px;
      height: 4px;
      border-radius: 50%;
      position: absolute;
      left: 3px;
      top: 5.5px;
      //margin-top: -2px;
      background: #ffaa06;
    }
    .intro_label:after {
      content: "";
      width: 1px;
      height: 11px;
      position: absolute;
      right: 8px;
      top: 3px;
      background: #d9d9d9;
    }
  }
}
.teacher {
  margin-top: 25px;
  margin-bottom: 30px;
  padding: 15px;
  display: flex;
  align-items: center;
  background: #ff9400;
  .teacher_img {
    flex-shrink: 0;
    width: 90px;
    height: 90px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      //height: 100%;
    }
  }
  .teacher_info {
    padding-left: 15px;
    .teacher_title {
      margin-bottom: 4px;
      font-size: 14px;
      color: #ffffff;
    }
    .teacher_intro {
      line-height: 20px;
      font-size: 11px;
      color: #ffffff;
    }
  }
}
.feature {
  padding: 25px 0;
  background-color: #fff9f2;
  .feature_row {
    display: flex;
    text-align: center;
    justify-content: space-around;

    .feature_item {
      width: 33.333%;
      margin-bottom: 18px;
      font-size: 12px;
      color: #333333;
      img {
        width: 40px;
        margin-bottom: 5px;
      }
    }
  }
}
.price {
  background-image: linear-gradient(-90deg, #ffaa26 0%, #ffa32b 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 25px;
  padding: 14px 15px;
  box-sizing: border-box;
  @media screen and (max-width: 345px) {
    .price_item {
      flex-wrap: wrap;
    }
    .now_price {
      margin-right: 10px;
    }
    .middle_line {
      display: none;
    }
  }
  .price_item {
    display: flex;
    align-items: center;
    .now_price {
      display: flex;
      align-items: center;
      .label {
        font-size: 14px;
        color: #ffffff;
      }
      .num {
        font-size: 18px;
        color: #ffffff;
      }
    }
    .old_price {
      display: flex;
      align-items: center;
      .label {
        font-size: 13px;
        color: #ffffff;
      }
      .num {
        font-size: 18px;
        color: #ffffff;
        opacity: 0.8;
        text-decoration: line-through;
      }
    }
    .middle_line {
      margin: 0 15px;
      width: 1px;
      height: 14px;
      background-color: #fff;
    }
  }
  .sign_btn {
    margin-left: 20px;
    width: 100px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #ffaa06;
    background: #fff9ee;
    box-shadow: 0 6px 12px 0 #fc901a;
    border-radius: 28px;
    img {
      margin-left: 5px;
      width: 8px;
      transform: rotate(180deg);
    }
  }
}
.common_wrapper {
  margin: 0 15px;
}
.introduction_item {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 25px auto;
  max-width: 500px;
  .top_img_wrapper {
    position: relative;
    width: 100%;
    z-index: 30;
    color: #fff;
    background-size: cover;
    .level {
      position: absolute;
      left: 3.6%;
      top: 50%;
      transform: translateY(-87%);
      font-family: PingFangSC-Medium;
      font-size: 14px;
      color: #ffffff;
    }
    .font_area {
      width: 87%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      position: absolute;
      left: 15%;
      // top: -2px;
      top: 50%;
      transform: translateY(-80%);
      //transform: translateY(-50%);
      .main_title {
        font-size: 16px;
        font-family: PingFangSC-Medium;
        color: #ffffff;
      }
      .text_title {
        font-family: PingFangSC-Regular;
        font-size: 11px;
        color: #ffffff;
      }
      .sub_title {
        font-family: PingFangSC-Regular;
        font-size: 13px;
        color: #ffffff;
      }
    }
    @media screen and (max-width: 370px) {
      .font_area {
        //width: 100%;
        //left: 80px;
        .main_title {
          font-size: 10px;
          font-family: PingFangSC-Medium;
          color: #ffffff;
        }
        .text_title {
          font-family: PingFangSC-Regular;
          font-size: 10px;
          color: #ffffff;
        }
        .sub_title {
          font-family: PingFangSC-Regular;
          font-size: 10px;
          color: #ffffff;
        }
      }
    }
    @media screen and (min-width: 372px) {
      .font_area {
        //width: 100%;
        //left: 80px;
        .main_title {
          font-size: 13px;
          //font-family: PingFangSC-Medium;
          color: #ffffff;
        }
        .text_title {
          font-family: PingFangSC-Regular;
          font-size: 10px;
          color: #ffffff;
        }
        .sub_title {
          font-family: PingFangSC-Regular;
          font-size: 11px;
          color: #ffffff;
        }
      }
    }
    @media screen and (min-width: 719px) {
      .level {
        left: 24px;
      }
      .font_area {
        left: 80px;
      }
    }
    .top_img {
      // position: absolute;
      // left: 0;
      // top:0;
      width: 100%;
      z-index: 30;
    }
  }
}
.introduction_item:last-child {
  margin-bottom: 40px;
}
.introduction_item_content {
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  box-shadow: 0 14px 20px -9px #ffe2aa;
  width: 90%;
  background-color: #fff8f2;
  border-radius: 10px 10px 6px 6px;
  padding: 30px 18px 10px 15px;
  margin-top: -30px;
  .intro_list_wrapper {
    position: relative;
    z-index: 12;
    margin-bottom: 12px;
    .intro_li_title {
      margin-bottom: 5px;
      font-family: PingFangSC-Medium;
      font-size: 15px;
      color: #fea803;
    }
    .intro_li_content {
      line-height: 22px;
      font-family: PingFangSC-Regular;
      font-size: 12px;
      color: #666666;
    }
  }
}
.catalogue {
  margin-bottom: 45px;
  .catalogue_main {
    max-width: 500px;
    margin: 0 auto;
    .top_section {
      display: flex;
      margin-bottom: 25px;
      box-shadow: 0px 5px 16px -9px #ffb366;
      .title {
        writing-mode: vertical-lr;
        line-height: 50px;
        width: 50px;
        background: #ffc058;
        background-image: linear-gradient(-179deg, #ffc058 0%, #ff982b 100%);
        box-shadow: 4px 2px 11px -3px #ffb366;
        border-radius: 8px;
        font-size: 15px;
        color: #ffffff;
        text-align: center;
        letter-spacing: 1px;
        align-items: stretch;
        //height: 100%;
        display: flex;
        justify-content: center;
        .title_num {
          transform: rotate(270deg);
          display: inline-block;
          //vertical-align: middle;
          margin: 3px 0 3px 0;
        }
      }
      .content {
        flex-grow: 1;
        padding: 18px 0px 18px 25px;
        display: flex;
        background: #fffbf9;
        font-size: 12px;
        color: #666666;
        border-radius: 0 6px 6px 0;
        //justify-content: space-between;
        .content_left,
        .content_right {
          line-height: 25px;
        }
        .content_left {
          //margin-right: 45px
          margin-right: 10%;
        }
        .content_right {
          //margin-left: 45px;
        }
      }
    }
    .bottom_section {
      display: flex;
      box-shadow: 0px 5px 16px -9px #ffb366;
      .title {
        writing-mode: vertical-lr;
        line-height: 50px;
        width: 50px;
        background-image: linear-gradient(-179deg, #ffc058 0%, #ff982b 100%);
        box-shadow: 4px 2px 11px -3px #ffb366;
        border-radius: 8px;
        font-size: 15px;
        color: #ffffff;
        text-align: center;
        letter-spacing: 1px;
        display: flex;
        justify-content: center;
        .title_num {
          transform: rotate(270deg);
          display: inline-block;
          margin: 3px 0 3px 0;
        }
      }
      .content {
        flex-grow: 1;
        padding: 18px 0 18px 25px;
        background: #fbf2e9;
        border-radius: 0 6px 6px 0;
        .lesson {
          margin-bottom: 12px;
          .p_title {
            margin-bottom: 3px;
            font-size: 13px;
            color: #333333;
          }
          .p_sub_title {
            font-size: 12px;
            color: #666666;
          }
        }
      }
    }
  }
}
.remark_container {
  position: relative;
  margin-bottom: 45px;
  .slide {
    width: 35%;
    height: 220px;
    padding: 15px 13px;
    background: #ffaf06;
    border-radius: 6px;
    .user_info {
      text-align: center;
      margin-bottom: 7px;
    }
    .avatar {
      margin: 0 auto;
      display: inline-block;
      width: 46px;
      height: 46px;
      border-radius: 50%;
      border: 2px solid #ffc072;
      overflow: hidden;
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
.harf_round {
  top: 0;
  left: -20px;
  position: absolute;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #fff0e3;
  z-index: 10;
}
.harf_round.last {
  width: 400px;
  height: 400px;
  top: 160px;
  left: 70px;
}
.extra_section {
  position: relative;
  .harf_round {
    z-index: 39;
    left: -10px;
    top: -10px;
  }
  .extra_title {
    font-size: 14px;
    margin: 10px 0 10px 0px;
  }
  .content {
    position: relative;
    overflow: hidden;
    padding: 10px 0 10px 25px !important;
    background: #fff8f2 !important;
    p {
      position: relative;
      z-index: 40;
    }
  }
}
</style>
<style lang=less>
.title_num {
  transform: rotate(270deg);
  display: inline-block;
  margin: 3px 0 3px 0;
}
.ac11 {
  margin-bottom: 110px;
}
.ac11wrapper {
  .text {
    padding: 30px 10px 30px 20px !important;
    width: 100% !important;
    box-shadow: none !important;
    border-radius: 0 !important;
  }
}
.ac11teacher {
  margin: 0 !important;
  .teacher_img {
    width: 75px !important;
    height: 75px !important;
  }
}
</style>


