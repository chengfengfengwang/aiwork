<template>
  <!-- 音基冲刺课 -->
  <div id="home">
    <div class="logo">
      <img src="./../../../assets/img/receiveCourse/home/logo.png" alt>
    </div>
    <div class="page_title">
      <img src="./../../../assets/img/receiveCourse/home/page_title1.png" alt>
    </div>
    <div class="welcome">
      <div class="fl">欢迎<span style="color: #bf3636;">{{schoolName}}</span>的家长</div>
      <div class="sl">来领取课程</div>
    </div>
    <div class="box1">
      <div class="box_title">
        <img src="./../../../assets/img/receiveCourse/home/box1_title.png" alt>
      </div>
      <div class="tree">
        <img src="./../../../assets/img/receiveCourse/home/three.png" alt>
      </div>
      <div class="item1">填写相关信息，点击提交按钮。</div>
      <div class="item2">提交成功后点击下载APP按钮，安装成功后即可登录上课；如您已安装音乐壳会自动启动APP。</div>
    </div>
    <div class="box2">
      <div class="box_title">
        <img src="./../../../assets/img/receiveCourse/home/box2_title.png" alt>
      </div>
      <div class="item_title">姓名</div>
      <div class="input_wrapper name">
        <input v-model="nickname" type="text" placeholder="请输入您的姓名">
      </div>

      <div class="item_title">手机号</div>
      <div class="input_wrapper phone">
        <input v-model="phone" type="text" placeholder="请输入您的手机号码">
      </div>
      <div class="item_title grade">选择年级</div>
      <div class="option_container">
        <div
          @click="gradeAcIndex=index"
          :class="{active:gradeAcIndex===index}"
          class="option_wrapper"
          :key="index"
          v-for="(item,index) in gradeHans"
        >
          <div class="option_text">{{item}}年级</div>
        </div>
      </div>

      <div class="item_title class">选择班级</div>
      <div class="option_container">
        <div
          @click="classAcIndex=n"
          :class="{active:classAcIndex===n}"
          class="option_wrapper"
          :key="n"
          v-for="n in classes"
        >
          <div class="option_text">{{n}}班</div>
        </div>
        <div class="other_class">
          <div class="label">
            <div>其他</div>
            <div>班级：</div>
          </div>
          <div class="input_wrapper">
            <input id="otherClass" v-model="otherClass" type="text" placeholder>
          </div>
        </div>
      </div>
      <div @click="toActive" class="ac_btn" >
        <div class="ac_btn_text">激活</div>
        <img  v-show="acBtnShow" src="./../../../assets/img/receiveCourse/home/ac_btn.png" alt>
        <img v-show="!acBtnShow" src="./../../../assets/img/receiveCourse/home/dis_btn.png" alt>
      </div>
    </div>
    <div class="chicken">
      <img src="./../../../assets/img/receiveCourse/home/chicken.png" alt>
    </div>
    <div class="leaf">
      <img src="./../../../assets/img/receiveCourse/home/leaf.png" alt>
    </div>
    <div class="mask" v-show="successShow">
      <div ref="successContainer" id="successContainer">
        <div class="course_text">
          <div>成功领取了</div>
          <div>国院一级音基课程</div>
        </div>
        <div class="close" @click="successShow=false">
          <img src="./../../../assets/img/receiveCourse/home/close.png" alt>
        </div>
        <div class="suc_main_box">
          <div>点击下方按钮，立即前往音乐壳</div>
          <div class="logo_b">
            <img src="./../../../assets/img/receiveCourse/home/chicken_c.png" alt>
          </div>
          <div id="downloadButton" class="ac_btn">
            <div class="ac_btn_text">去上课</div>
            <img src="./../../../assets/img/receiveCourse/home/ac_btn.png" alt>
          </div>
          <div class="tip">
            <span style="color:#8A4331">温馨提示：</span>登录APP的手机号务必与您刚才填写信息的手机号保持一致哦！
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "./../../../common/util.js";
export default {
  data() {
    return {
      gradeHans: ["一", "二", "三", "四", "五", "六"],
      classes: 7,
      gradeAcIndex: "",
      classAcIndex: "",
      successShow: false,
      phone: "",
      nickname: "",
      otherClass: "",
      acBtnShow:false,
      schoolName: decodeURIComponent(getQueryVariable('schoolName')) 
    };
  },
  computed: {
    classInfo() {
      return this.classAcIndex ||  this.otherClass
      // if(this.classAcIndex===''){
      //   //this.changeBtn();
      //   console.log('zzz')
      //   return this.otherClass
      // }else if(this.otherClass===''){
      //   //this.changeBtn();
      //   console.log('zzz111')
      //   return this.classAcIndex
      // }
    }
  },
  mounted() {
    this.initialShareInstall();
    var scrollTop;
    document.querySelector('#otherClass').addEventListener('focus',function(){
      scrollTop = document.body.scrollTop;
      console.log(scrollTop)
      //alert(document.body.scrollTop) 
    })
    document.querySelector('#otherClass').addEventListener('blur',function(){
      document.body.scrollTop=scrollTop
    })
  },
  methods: {
    initialShareInstall() {
      var data = ShareInstall.parseUrlParams(); //shareinstall.js中提供的工具函数，解析url中的所有查询参数
      new ShareInstall(
        {
          appKey: "2KBKKFAK2E26FF",
          //可选项，微信中打开自定义遮罩层
          //shadow : function(){
          //  return "<div id='shareinstall_shadow' style='position:fixed;left:0;top:0;background:rgba(0,255,0,0.5);filter:alpha(opacity=50);width:100%;height:100%;z-index:10000;'></div>"
          // },
          /*可选参数，是否优先考虑下载app，以牺牲唤醒为代价*/
          //preferInstall:true,
          /*可选参数，是否优先考虑拉起app，以牺牲下载体验为代价*/
          //preferWakeup:true,
          /*可选参数，微信中直接跳下载*/
          //weChatdownload:true,
          onready: function() {
            //shareinstall已成功回调
            var m = this,
              button = document.getElementById("downloadButton");
            button.style.visibility = "visible";
            //用户点击某个按钮时(假定按钮id为downloadButton)，安装app
            button.onclick = function() {
              m.wakeupOrInstall();
            };
          }
        },
        data
      );
    },
    toActive() {
      // this.successShow = true;
      // this.$refs.successContainer.classList.add("startUp");
      if (this.nickname === "") {
        alert("请输入姓名");
        return;
      } else if (this.phone.length !== 11) {
        alert("请输入正确的手机号");
        return;
      } else if (this.gradeAcIndex === "") {
        alert("请选择年级");
        return;
      } else if (this.classInfo === "") {
        alert("请选择班级 ");
        return;
      }
      var param = {
        phone: this.phone,
        channel: getQueryVariable("channel"),
        extra_info: {
          nickname: this.nickname,
          grade: this.gradeAcIndex + 1,
          class: this.classInfo
        }
      };
      console.log(param);
      if(!this.acBtnShow){
          return;
      }
      
      this.$parent.toggleLoading(true);
      this.axios
        .post(
          `http://api.yinji.immusician.com:55555/v1/channel_active_course`,
          param
        )
        .then(res => {
          this.$parent.toggleLoading(false);
          this.successShow = true;
          this.$refs.successContainer.classList.add("startUp");
        })
        .catch(err => {
          this.$parent.toggleLoading(false);
          document.body.scrollTop=scrollTop
        });
    },
    changeBtn() {
      var arr = [
        "phone",
        "nickname",
        "gradeAcIndex",
        "classInfo",
      ];
      for (var i = 0; i < arr.length; i++) {
        var item = this[arr[i]];
        console.log(item)
        if (item ==='') {
          this.acBtnShow = false
          return;
        }
      }
      this.acBtnShow = true
      console.log("激活");
    }
  },
  watch: {
    classAcIndex(v) {
      this.changeBtn();
      if(v!==''){
        this.otherClass=''
      }
    },
    otherClass(v) {
      this.changeBtn();
      if(v!==''){
        this.classAcIndex=''
      }
    },
    gradeAcIndex(v) {
      this.changeBtn();
    },
    phone(v) {
      this.changeBtn();
    },
    nickname(v) {
      this.changeBtn();
    }
  }
};
</script>
<style lang="less" scoped>
#home {
  position: relative;
  overflow: hidden;
  background-color: rgb(254, 216, 60);
  background: url("./../../../assets/img/receiveCourse/home/bg.png") no-repeat
    center;
  background-position: 0 0;
  background-size: 100% 100%;
  .chicken {
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 70px;
    img {
      width: 100%;
    }
  }
  .leaf {
    position: absolute;
    bottom: -10px;
    right: 0;
    width: 120px;
    img {
      width: 100%;
    }
  }
  .logo {
    position: absolute;
    right: 5px;
    top: 25px;
    width: 75px;
    img {
      width: 100%;
    }
  }
}

.page_title {
  margin-top: 20px;
  img {
    width: 100%;
  }
}
.welcome {
  margin-top: 13px;
  margin-bottom: 60px;
  text-align: center;
  font-size: 21px;
  font-family: PingFangSC-Medium, PingFangSC;
  font-weight: 500;
  color: rgba(138, 67, 49, 1);
  .fl {
    // border-bottom: 1px solid rgba(245, 166, 35, 1);
  }
}
.box1 {
  position: relative;
  margin: auto;
  width: 347px;
  padding: 65px 30px 40px 70px;
  background-color: #fff;
  font-size: 17px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: rgba(138, 67, 49, 1);
  .box_title {
    width: 210px;
    position: absolute;
    left: 50%;
    margin-left: -105px;
    top: -21px;
    img {
      width: 100%;
    }
  }
  .tree {
    width: 44px;
    position: absolute;
    right: 16px;
    top: -21px;
    img {
      width: 100%;
    }
  }
  .item1 {
    margin-bottom: 35px;
  }
  .item1,
  .item2 {
    position: relative;
    &::after {
      position: absolute;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      line-height: 30px;
      text-align: center;
      background-color: #74d4f3;
      color: #fff;
      left: -45px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
  .item1:after {
    content: "1";
  }
  .item2:after {
    content: "2";
    top: 20%;
  }
  box-shadow: 0px 1px 6px 0px rgba(202, 101, 36, 0.47);
  border-radius: 15px;
}
.box2 {
  width: 347px;
  padding: 45px 0px 10px 0px;
  position: relative;
  .box_title {
    width: 210px;
    position: absolute;
    left: 50%;
    margin-left: -105px;
    top: -21px;
    img {
      width: 100%;
    }
  }
  margin: auto;
  margin-top: 35px;
  margin-bottom: 40px;
  background-color: #fff;
  font-size: 16px;
  font-family: PingFang-SC-Medium, PingFang-SC;
  font-weight: 500;
  color: rgba(138, 67, 49, 1);
  .item_title {
    position: relative;
    margin-bottom: 7px;
    text-align: center;
    font-size: 19px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(138, 67, 49, 1);
    .lr {
      width: 50px;
      height: 2px;
      background: rgba(138, 67, 49, 1);
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
    }
    &::before {
      content: "";
      .lr;
      left: 25%;
    }
    &::after {
      content: "";
      .lr;
      right: 25%;
    }
  }
  box-shadow: 0px 1px 6px 0px rgba(202, 101, 36, 0.47);
  border-radius: 15px;
}
.input_wrapper {
  text-align: center;
  input {
    width: 252px;
    height: 37px;
    background: rgba(255, 255, 234, 1);
    box-shadow: 0px 1px 2px 0px rgba(211, 173, 111, 0.54);
    border-radius: 3px;
    border: 1px solid rgba(138, 67, 49, 1);
    text-align: center;
  }
  input::placeholder {
    font-size: 19px;
    font-family: PingFang-SC-Medium, PingFang-SC;
    font-weight: 400;
    color: rgba(213, 196, 171, 1);
  }
}
.input_wrapper.name,
.input_wrapper.phone {
  margin-bottom: 20px;
}
.option_container {
  position: relative;
  margin: 0 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .option_wrapper {
    // margin-right: 12px;
    margin-bottom: 10px;
    &:last-child {
      margin-right: 0;
    }
    display: inline-block;
    position: relative;
    width: 90px;
    height: 42px;
    .option_text {
      position: absolute;
      width: 100%;
      left: 0;
      top: 19%;
      text-align: center;
      font-size: 16px;
      font-family: PingFang-SC-Medium, PingFang-SC;
      font-weight: 500;
      color: rgba(138, 67, 49, 1);
    }
    background: url("./../../../assets/img/receiveCourse/home/option.png")
      no-repeat center/contain;
  }
  .option_wrapper.active {
    background: url("./../../../assets/img/receiveCourse/home/option_a.png")
      no-repeat center/contain;
    .option_text {
      color: #fff;
      top: 23%;
    }
  }
  .other_class {
    position: absolute;
    right: 0;
    bottom: 10px;
    display: flex;
    align-items: center;
    .label {
      line-height: 20px;
    }
    input {
      width: 148px;
    }
  }
}
.item_title.grade {
  margin-bottom: 25px;
}
.item_title.grade {
  margin-bottom: 15px;
}

#successContainer {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: rgb(254, 216, 60);
  background: url("./../../../assets/img/receiveCourse/home/success_bg.png")
    no-repeat center;
  background-position: 0 0;
  background-size: 100%;
  // transition: all 2s;
  bottom: -100vh;
  // bottom: 0vh;
  &.startUp {
    animation: up 0.3s linear 1 forwards;
  }
  @keyframes up {
    0% {
      bottom: -100vh;
    }
    100% {
      bottom: 0vh;
    }
  }
  .course_text {
    text-align: center;
    font-size: 24px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(138, 67, 49, 1);
    position: absolute;
    width: 100%;
    top: 144px;
  }
  @media screen and (min-width: 480px) {
    .course_text {
      top: 180px;
    }
  }
  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    img {
      width: 100%;
    }
  }
  .suc_main_box {
    width: 335px;
    padding: 25px 20px 24px 20px;
    position: absolute;
    top: 36%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 1px 6px 0px rgba(202, 101, 36, 0.47);
    border-radius: 15px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFangSC;
    font-weight: 500;
    color: rgba(138, 67, 49, 1);
    text-align: center;
    .logo_b {
      width: 200px;
      margin: 20px auto 10px auto;
      img {
        width: 100%;
      }
    }
    .ac_btn {
      margin: 0 auto;
      margin-bottom: 10px;
    }
    .tip {
      text-align: left;
      font-size: 14px;
      font-family: PingFang-SC-Heavy, PingFang-SC;
      font-weight: 800;
      color: rgba(138, 67, 49, 1);
    }
  }
  @media screen and (min-width: 480px) {
    .suc_main_box {
      top: 260px;
    }
    .logo_b {
      width: 180px !important;
    }
  }
}
.ac_btn {
  position: relative;
  width: 208px;
  margin: 30px auto 15px auto;
  img {
    width: 100%;
  }
  .ac_btn_text {
    position: absolute;
    left: 50%;
    top: 45%;
    transform: translate(-50%, -50%);
    color: #fff;
    font-size: 17px;
    font-family: PingFang-SC-Heavy, PingFang-SC;
    font-weight: 800;
    text-shadow: 0px 1px 2px rgba(52, 71, 91, 0.5);
  }
}
</style>

