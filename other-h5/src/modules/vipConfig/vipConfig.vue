<template>
  <div class="search_key">
    <div class="section">
      <h4>VIP状态查询</h4>
      <div class="search_wrapper" style="margin-top:10px">
        <input v-on:keyup.enter="search" v-model="key" type="text" style="margin-right:10px">
        <div class="btn" @click="search">查询</div>
      </div>
      <div class="my_result" v-show="resultShow">
        <span>结果：</span>
        {{resultMessage}}
      </div>
    </div>
    <div class="section">
      <h4>注册VIP</h4>
      <div class="search_wrapper" style="margin-top:10px">
        <input
          v-on:keyup.enter="register"
          v-model="registerKey"
          type="text"
          style="margin-right:10px"
        >
        <select v-model="reInstrument" id="regSelect">
          <option disabled value>请选择</option>
          <option value="0">吉他</option>
          <option value="1">尤克里里</option>
          <option value="2">卡淋巴</option>
          <option value="3">非洲鼓</option>
          <option value="4">钢琴</option>
        </select>
        <select v-model="reTeacher" id="regSelect">
          <option disabled value>请选择</option>
          <option v-for="(item, index) in reTeachers" :key="index" :value="item.tuid">{{item.name}}</option>
        </select>
        <div class="btn" @click="register">注册</div>
      </div>
    </div>
    <div class="section">
      <h4>批量注册</h4>
      <div class="search_wrapper">
        <input @change="fileChange" class="file_input" type="file">
        <select v-model="mulReInstrument" id="regSelect">
          <option disabled value>请选择</option>
          <option value="0">吉他</option>
          <option value="1">尤克里里</option>
          <option value="2">卡淋巴</option>
          <option value="3">非洲鼓</option>
          <option value="4">钢琴</option>
        </select>
        <select v-model="mulReTeacher" id="regSelect">
          <option disabled value>请选择</option>
          <option
            v-for="(item, index) in mulReTeachers"
            :key="index"
            :value="item.tuid"
          >{{item.name}}</option>
        </select>
        <div class="btn" @click="mulRegister">注册</div>
      </div>
    </div>
    <div class="section" v-show="showCancel">
      <h4>取消VIP</h4>
      <div class="search_wrapper" style="margin-top:10px">
        <input v-on:keyup.enter="cancel" v-model="cancelKey" type="text" style="margin-right:10px">
        <select v-model="caInstrument" id="canSelect">
          <option disabled value>请选择</option>
          <option value="0">吉他</option>
          <option value="1">尤克里里</option>
          <option value="2">卡淋巴</option>
          <option value="3">非洲鼓</option>
          <option value="4">钢琴</option>
        </select>
        <select v-model="caTeacher" id="regSelect">
          <option disabled value>请选择</option>
          <option v-for="(item, index) in caTeachers" :key="index" :value="item.tuid">{{item.name}}</option>
        </select>
        <div class="btn" @click="cancel">取消</div>
      </div>
    </div>

    <!-- <div class="no-data" v-show="!resultShow">{{errMsg}}</div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      key: "",
      registerKey: "",
      cancelKey: "",
      errMsg: "",
      resultMessage: "",
      resultShow: false,
      baseUrl: "http://iguitar.immusician.com:2525",
      //baseUrl: "http://192.168.1.68:22222"
      reInstrument: "",
      mulReInstrument: "",
      caInstrument: "",
      reTeacher: "",
      mulReTeacher: "",
      caTeacher: "",
      teachers: {},
      showCancel: false
    };
  },
  computed: {
    //返回注册时乐器对应的老师列表
    reTeachers() {
      return this.teachers[this.reInstrument];
    },
    //返回注册时乐器对应的老师列表
    mulReTeachers() {
      return this.teachers[this.mulReInstrument];
    },
    //返回取消注册时乐器对应的老师列表
    caTeachers() {
      return this.teachers[this.caInstrument];
    }
  },
  mounted() {
    //this.search("y7z4cqx");
    if (this.$util.getQueryVariable("show_cancel") === "true") {
      this.showCancel = true;
    }
    this.getTuid();
  },
  methods: {
    //y7z4cqx
    fileChange(e) {
      this.files = e.target.files;
    },
    cancel() {
      this.axios
        .get(
          `${this.baseUrl}/v3/users/vip/update_vip/?tel=${
            this.cancelKey
          }&state=0&instrument=${this.caInstrument}&tuid=${this.caTeacher}`
        )
        .then(res => {
          this.$loading.hide();
          var res = res.data;
          if (!res.error) {
            alert(res.msg);
          }
        });
    },
    //批量注册
    mulRegister() {
      var param = {
        vips_file: this.files[0],
        instrument: this.mulReInstrument,
        tuid: this.mulReTeacher
      }
      
     
      var formdata = new FormData();
      for (var name in param){
        formdata.append(name,param[name])
      }
     //return;
      this.axios
        //?tel=${this.registerKey}&instrument=${this.reInstrument}&tuid=${this.reTeacher}
        .post(`${this.baseUrl}/v3/users/vip/active_vip_bulk/`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.$loading.hide();
          //var res = res.data;
          alert(res.message)
          // if (!res.error) {
          //   alert(res.msg);
          // }
        });
    },
    register() {
      console.log(this.registerKey, this.reInstrument);
      //return
      this.axios
        .get(
          `${this.baseUrl}/v3/users/vip/update_vip/?tel=${
            this.registerKey
          }&instrument=${this.reInstrument}&tuid=${this.reTeacher}`
        )
        .then(res => {
          this.$loading.hide();
          var res = res.data;
          if (!res.error) {
            alert(res.msg);
          }
        });
    },
    search() {
      this.axios
        .get(`${this.baseUrl}/v3/users/vip/feedback/?tel=${this.key}`)
        .then(res => {
          this.$loading.hide();
          var res = res.data;
          this.resultShow = true;
          this.resultMessage = "";
          if (res.vip_list instanceof Array) {
            res.vip_list.forEach(e => {
              console.log(e);
              let instrument;
              switch (e.instrument) {
                case 0:
                  instrument = "吉他";
                  break;
                case 1:
                  instrument = "尤克里里";
                  break;
                case 2:
                  instrument = "卡林吧";
                  break;
                case 3:
                  instrument = "非洲鼓";
                  break;
                case 4:
                  instrument = "钢琴";
                  break;
              }
              let teacher = "";
              this.teachers[e.instrument].forEach(ele => {
                if (ele.tuid == e.tuid) {
                  teacher = ele.name;
                }
              });
              this.resultMessage += `${instrument}，等级${
                e.level
              }，老师${teacher} `;
            });
            return;
          }
          this.resultMessage += `${res.msg} `;
          // for (var key in res) {
          //   this.resultMessage += `${key}：${res[key]} `;
          // }
        });
    },
    update(code) {
      this.$loading.show("查询中...");
      if (this.status == "create") {
        //取消
        var state = 0;
      } else {
        //创建
        var state = 1;
      }
      this.axios
        .get(
          `${this.baseUrl}/v3/users/vip/update_vip/?tel=${
            this.key
          }&state=${state}`
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
            console.log(this.my_result);
          }
        });
    },
    getTuid() {
      this.axios.get(`${this.baseUrl}/v3/users/vip/show_teacher/`).then(res => {
        this.teachers = res.data;
      });
    }
  }
};
</script>
<style lang="less" scoped>
input {
  width: 130px;
}
.section {
  border-bottom: 1px solid #f2f2f2;
  //padding: 10px 20px 20px 20px;
  padding: 10px 0px 20px 0px;
  margin: 10px auto;
}
h4 {
  //padding: 15px 0;
  font-size: 16px;
  text-align: center;
}
.search_wrapper {
  text-align: center;
}
.search_key {
  padding: 10px;
}
.my_result {
  margin-top: 20px;
  text-align: center;
}
@media screen and (min-width: 700px) {
  .my_result {
    width: 700px;
    margin: 20px auto;
  }
  .section {
    width: 700px;
    margin: 20px auto;
    padding: 30px;
    border: 1px dashed #a78181;
  }
}
select {
  width: 70px;
  height: 30px;
  margin-right: 3px;
}
.file_input {
  border: none;
  width: 230px;
}
</style>



