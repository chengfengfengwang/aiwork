<template>
  <div>test111</div>
</template>
<script>
import { getQueryVariable, testWeixin } from "../../../common/util.js";
import { Toast } from "vant";
export default {
  data() {
    return {
      isWatch: 1,
    
    };
  },
  created() {
   
  },
  mounted() {
    console.log('test11')
    var ruri = encodeURIComponent(
        "http://cdn.kids-web.immusician.com/yinji/liveMaterial.html"
      );
      //正式
      var appId = "wxebd76dff6ca15a2a";
    location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${ruri}&response_type=code&scope=snsapi_base&state=STATE#wechat_redirect`);
  },
  methods: {
   go(){
     console.log('zzz')
   }
  }
};
</script>