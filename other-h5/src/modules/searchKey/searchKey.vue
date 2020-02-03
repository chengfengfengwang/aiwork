<template>
  <div class="search_key">
    <h4>Ai激活码（激活码、体验课码）激活状态查询</h4>
    <div class="search_wrapper">
      <input v-on:keyup.enter="search" v-model="key" type="text" style="margin-right:10px">
      <div class="btn" @click="search">查询</div>
    </div>
    <div class="result" v-show="resultShow">
      <div class="row">
        <div class="label">创建时间</div>
        <div>{{result.created_at}}</div>
      </div>
      <div class="row">
        <div class="label">用户电话</div>
        <div>{{result.tel}}</div>
      </div>
      <div class="row">
        <div class="label">激活课程名称</div>
        <div>{{result.course_name}}</div>
      </div>
      <div class="row">
        <div class="label">激活课程id</div>
        <div>{{result.course_id}}</div>
      </div>
    </div>
    <div class="no-data" v-show="!resultShow">{{errMsg}}</div>
    <hr>
    <h4 style="margin-top:30px">音基激活码（激活码、奖学金码）激活状态查询</h4>
    <div class="search_wrapper">
      <input v-on:keyup.enter="search1" v-model="key1" type="text" style="margin-right:10px">
      <div class="btn" @click="search1">查询</div>
    </div>
    <div class="result" v-show="resultShow1">
      <div class="row">
        <div class="label">创建时间</div>
        <div>{{result1.created_at}}</div>
      </div>
      <div class="row">
        <div class="label">用户电话</div>
        <div>{{result1.tel}}</div>
      </div>
      <div class="row">
        <div class="label">激活课程名称</div>
        <div>{{result1.course_name}}</div>
      </div>
      <div class="row">
        <div class="label">渠道</div>
        <div>{{result1.channel}}</div>
      </div>
    </div>
    <div class="no-data" v-show="!resultShow1">{{errMsg1}}</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      key: "",
      errMsg: "",
      result: {
        created_at: "",
        tel: "",
        course_name: "",
        course_id: ""
      },
      resultShow: false,
      //第二个
      key1: "",
      errMsg1: "",
      resultShow1: false,
      result1: {
        created_at: "",
        tel: "",
        course_name: "",
        channel: ""
      }
    };
  },
  mounted() {
    //this.search("y7z4cqx");
    console.log(this.$util);
  },
  methods: {
    //y7z4cqx
    search(code) {
      this.$loading.show("查询中...");
      this.axios
        .get(
          `http://iguitar.immusician.com:2525/v3/active_code/search/?code=${
            this.key
          }`
        )
        .then(res => {
          this.$loading.hide();
          var res = res.data;
          if (res.error) {
            this.resultShow = false;
            this.errMsg = res.message;
          } else {
            this.resultShow = true;
            var res = res.data;
            this.result.created_at = res.created_at;
            this.result.tel = res.user.tel;
            this.result.course_name = res.sup_courses.course_name;
            this.result.course_id = res.sup_courses.course_id;
            console.log(this.result);
          }
        });
    },
    search1(code) {
      this.$loading.show("查询中...");
      this.axios
        .get(`http://58.87.125.111:55555/v1/code_search?code=${this.key1}`)
        .then(res => {
          this.$loading.hide();
          var res = res.data;
          if (res.error) {
            this.resultShow1 = false;
            this.errMsg1 = res.msg;
          } else {
            this.resultShow1 = true;
            if (res.data) {
              var res = res.data;
              this.result1.created_at = this.$util.formatTime(res.created_at);
              this.result1.tel = res.tel;
              this.result1.course_name = res.course_name;
              this.result1.channel = res.channel;
            }else{
              this.resultShow1 = false;
              this.errMsg1 = res.msg;
            }
          }
        });
    }
  }
};
</script>
<style lang="less" scoped>
h4 {
  padding: 15px 0;
  font-size: 16px;
  text-align: center;
}
.search_wrapper {
  text-align: center;
}
.search_key {
  padding: 10px;
}
.result {
  margin-top: 20px;
  .row {
    font-size: 16px;
    display: flex;
    justify-content: space-between;
  }
}
@media screen and (min-width: 700px) {
  .result {
    width: 700px;
    margin: 20px auto;
  }
}
</style>



