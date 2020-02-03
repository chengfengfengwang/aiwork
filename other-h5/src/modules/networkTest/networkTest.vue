<template>
  <div id="networkTest">
    <div class="location">
      <div v-show="ipInfo.ip">
        ip:
        <span class="location_val">{{ipInfo.ip}}</span>
      </div>
      <div v-show="ipInfo.region">
        region:
        <span class="location_val">{{ipInfo.region}}</span>
      </div>
      <div v-show="ipInfo.city">
        city:
        <span class="location_val">{{ipInfo.city}}</span>
      </div>
      <div v-show="ipInfo.org">
        org:
        <span class="location_val">{{ipInfo.org}}</span>
      </div>
    </div>
    <div class="list_wrapper">
      <div v-for="item in testArr">
        <div>{{item.storageSpace}}</div>
        <div>
          <b v-show="item.duration">耗时：{{item.duration + 'ms'}}</b>
          <b v-show="item.status">状态码：{{item.status}}</b>
          <b v-show="item.statusText">状态：{{item.statusText}}</b>
        </div>
        <!-- <div><b>域名：{{item.domainName}}</b></div> -->
        <div v-if="item.ipList && item.ipList.length>0">
           <div>
             <b>ipList：</b>
             <b v-for="(ip,index) in item.ipList">{{ip}}</b>
           </div>
           
        </div>
      </div>
    </div>

    <div class="btn" @click="start">开始测试</div>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {
      ipInfo: {
        ip: "",
        city: "",
        region: "",
        org: ""
      },
      testArr: [
        {
          storageAlias: "",
          storageSpace: "",
          imgUrl: "",
          status: "",
          duration: "",
          statusText: "",
          ipList:[]
        },
        {
          storageAlias: "",
          storageSpace: "",
          imgUrl: "",
          status: "",
          duration: "",
          statusText: "",
          ipList:[]
        }
      ]
    };
  },
  created() {
    this.getIp();
    this.getTestArr();
  },
  mounted() {},
  methods: {
    getTestArr() {
      this.axios
        .get("http://iguitar.immusician.com:2525/v3/resource/link/config")
        .then(res => {
          this.testArr = res.data.data;
        });
    },
    getIp() {
      this.axios.get("http://ipinfo.io").then(res => {
        this.ipInfo = res.data;
      });
    },
    start() {
      this.testArr.forEach((e, index) => {
        this.test(e.imgUrl, index);
        this.showIpList(e.domainName,this.ipInfo.ip,index);
      });
    },
    showIpList(url,ip,index){
      var myUrl = url.split('//')[1];
      this.axios.post(`http://iguitar.immusician.com:2525/v3/resource/tools/`,{
        param:`http://119.29.29.29/d?dn=${myUrl}&ip=${ip}`,
        //ip:ip,
        tools_type:'ask_others'
      }).then(res=>{
        var arr = res.data.data.split(';');
        this.$set(this.testArr[index], "ipList", arr);
      })
    },
    test(url, index) {
      var url = url + "?" + new Date().valueOf();
      var timeA = new Date().valueOf();
      this.$set(this.testArr[index], "statusText", "正在连接...");
      this.axios
        .get(url, { timeout: 15000 })
        .then(res => {
          console.log(res);
          var timeB = new Date().valueOf();
          this.$set(this.testArr[index], "duration", timeB - timeA);
          this.$set(this.testArr[index], "status", res.status);
          this.$set(this.testArr[index], "statusText", "请求成功");
        })
        .catch(error => {
          var timeB = new Date().valueOf();
          this.$set(this.testArr[index], "duration", timeB - timeA);
          this.$set(this.testArr[index], "statusText", "请求失败");
          if (error.message.includes("timeout")) {
            this.$set(this.testArr[index], "status", -1);
            this.$set(this.testArr[index], "statusText", "请求超时");
          } else if (error.response) {
            this.$set(this.testArr[index], "status", error.response.status);
            this.$set(this.testArr[index], "statusText", "请求失败");
          }
          console.log(error);
          if (error.response) {
            console.log(error.response);
          }
          console.log(error.config);
          // console.log(error.response);
          // console.log(error.response.status);
        });
    },
    test1(url, index) {
      var that = this;
      var img = new Image();
      var timeA = new Date().valueOf();

      that.$set(that.testArr[index], "status", "正在连接...");
      img.onload = function() {
        var timeB = new Date().valueOf();
        that.$set(that.testArr[index], "status", "请求成功");
        that.$set(that.testArr[index], "duration", timeB - timeA);
      };
      img.onerror = function(error) {
        console.log(error);
        var timeB = new Date().valueOf();
        that.$set(that.testArr[index], "status", "请求失败");
        that.$set(that.testArr[index], "duration", timeB - timeA);
      };
      img.src = url + "?" + new Date().valueOf();
    }
  }
};
</script>
<style lang="less" scoped>
#networkTest {
  padding: 10px;
}
.location {
  font-size: 15px;
  color: #333;
  border-bottom: 1px solid #999;
  padding-bottom: 10px;
  margin-bottom: 10px;
  .location_val {
    margin-left: 10px;
    font-size: 12px;
    color: #000;
  }
}
.result {
  margin-top: 10px;
  border: 1px dashed #999;
}
#listOfResults {
  padding: 5px 0;
}
#listOfResults li {
  width: 100%;
  list-style: none;
  height: 30px;
  line-height: 30px;
  display: block;
  font-size: 16px;
  background-image: url(http://7xl6wu.com5.z0.glb.qiniucdn.com/images/dashed_line.png);
  background-position: center center;
  background-repeat: repeat-x;
  background-size: 30px 30px;
  letter-spacing: 1px;
  font-weight: 300;
  text-align: center;
}
#listOfResults li span {
  display: inline-block;
  background: white;
  padding: 0 10px 0 5px;
  float: left;
}
#listOfResults li b {
  color: red;
  float: right;
  background: white;
  padding: 0 5px 0 10px;
  font-weight: 400;
}
.btn {
  width: 80%;
  margin: 20px auto;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 30px;
  border: 1px solid #333;
  font-size: 14px;
  color: #fff;
  background-color: green;
}
.list_wrapper {
  b {
    color: red;
    background: white;
    padding: 0 5px 0 5px;
    font-weight: 400;
    font-size: 12px;
    display: inline-block
  }
}
</style>
