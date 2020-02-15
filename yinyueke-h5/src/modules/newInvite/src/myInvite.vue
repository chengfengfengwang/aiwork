<template>
  <div class="page">
    <div class="main">
      <div class="top">
        <img src="../../../assets/img/newInvite/already.png" alt />
      </div>
      <div class="invite_data">
          <img src="../../../assets/img/newInvite/chain.png" alt="" class="chain left">
          <img src="../../../assets/img/newInvite/chain.png" alt="" class="chain right">
        <div v-for="(item,index) in inviteData" :key="index" class="date_box">
          <div class="date">{{item.date}}</div>
          <div class="user">
            <div class="avatar">
              <img src="http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg" alt />
            </div>
            <div class="name">王大锤</div>
            <div class="phone">18810240072</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
export default {
  data() {
    return {
      vcodeText: "获取验证码",
      vCode: "",
      selectedCourse: "",
      form: {
        phone: "",
        code: "",
        share_id: getQueryVariable("share_id"),
        share_phone: getQueryVariable("share_phone"),
        is_proxy: 0,
        share_stall: getQueryVariable("c")
      },
      courseList: [],
      inviteData: [
        {
          date: "02.14",
          users: [
            {
              name: "qwe",
              phone: "18810240072",
              avatar:
                "http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg"
            },
            {
              name: "qwe",
              phone: "18810240072",
              avatar:
                "http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg"
            },
            {
              name: "qwe",
              phone: "18810240072",
              avatar:
                "http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg"
            }
          ]
        },
        {
          date: "02.15",
          users: [
            {
              name: "qwe",
              phone: "18810240072",
              avatar:
                "http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg"
            },
            {
              name: "qwe",
              phone: "18810240072",
              avatar:
                "http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg"
            },
            {
              name: "qwe",
              phone: "18810240072",
              avatar:
                "http://img5.imgtn.bdimg.com/it/u=3526059149,524929962&fm=26&gp=0.jpg"
            }
          ]
        }
      ]
    };
  },
  created() {},
  mounted() {
    this.inputevent();
  },
  methods: {
    inputevent() {
      var inputArr = document.querySelectorAll("input");
      inputArr.forEach(function(ele) {
        let scrollTop;
        ele.addEventListener("focus", function() {
          scrollTop = document.body.scrollTop;
          console.log(scrollTop);
        });
        ele.addEventListener("blur", function() {
          //document.body.scrollTop = scrollTop;
          window.scrollTo(0, 0);
          console.log(scrollTop);
        });
      });
    },
    getCourses() {
      this.axios
        .post(`${process.env.VUE_APP_ORG}/v9/class_info/get_course_apply`, {
          institutions_id: getQueryVariable("orgId")
        })
        .then(res => {
          this.courseList = res.data;
          console.log("---");
          console.log(this.courseList);
          //this.courseList.unshift({ id: "-1", name: "全部" });
        });
    },
    reg() {
      localStorage.setItem("loginPhone", this.form.phone);
      this.axios
        .post(`${process.env.VUE_APP_LIEBIAN}/v1/user/share_reg/`, this.form)
        .then(res => {
          if (!res.error) {
            let data = res.data;
            if (data instanceof Array && data.length == 0) {
              this.$router.push("/download");
            } else if (data instanceof Array && data.length != 0) {
              localStorage.setItem("multiCourse", JSON.stringify(data));
              this.$router.push("/selectCourse");
            } else if (data instanceof Object) {
              location.href = data.url;
            }
          }
        });
    },
    getVCode() {
      if (this.vcodeText === "重新获取" || this.vcodeText === "获取验证码") {
        if (this.vcodeText === "获取验证码") {
          this.vCode = "";
        }
        this.axios
          .post(`${process.env.VUE_APP_SMS}/v1/user/tx_sms/`, {
            phone: this.form.phone
          })
          .then(res => {
            console.log(res);
          });
      } else {
        return;
      }
      var count = 59;
      this.vcodeText = count + "s";
      var timer = setInterval(() => {
        this.vcodeText = --count + "s";
        if (count === 0) {
          clearInterval(timer);
          this.vcodeText = "重新获取";
        }
      }, 1000);
    }
  }
};
</script>
<style lang="less">
@import url("./../../../common/common.less");
.font-size(@sizeValue:16) {
  @vw: 16 / 375 * 100;
  @result: @sizeValue / 16 * @vw;
  font-size: ~"@{result}vw";
}
html {
  .font-size(16);
}
html {
  @media screen and (max-width: 320px) {
    .font-size(16);
  }
  @media screen and (min-width: 480px) {
    .font-size(13);
  }
}
html,
body {
  width: 100%;
  height: 100%;
}
.page {
  width: 100%;
  min-height: 100vh;
  position: relative;
  padding: 0 20px;

  background-color: #fff8df;
}
.main {
  .top {
    img {
      width: 100%;
    }
  }
  .invite_data{
      position: relative;
      .chain{
          position: absolute;
          width: 12px;
          top:-28px;
      }
      .chain.left{
          left: 34px;
      }
      .chain.right{
          right: 34px;
      }
  }
  .date_box {
      margin-top:10px;
    background: rgba(255, 255, 255, 1);
    border-radius: 20px;
    padding: 17px;
    .date {
      font-size: 21px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      color: rgba(255, 148, 53, 1);
      margin-bottom: 10px;
    }
    .user {
      display: flex;
      align-items: center;
      padding: 8px;
      background:rgba(255,247,220,1);
border-radius:23px;
      .avatar {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        overflow: hidden;
        margin-right: 8px;
        img {
          width: 100%;
        }
      }
      .name {
        flex-grow: 1;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(160, 87, 6, 1);
      }
      .phone {
        font-size: 15px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(160, 87, 6, 1);
      }
    }
  }
}
</style>

