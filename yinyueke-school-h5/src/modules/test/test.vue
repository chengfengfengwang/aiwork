<template>
  <div>
      <router-view/>
  </div>
</template>
<script>
import {getQueryVariable} from '../../common/util.js'
export default {
  data(){
    return{
      previewSrc:''
    }
  },
  created(){
    console.log(history)
    if(getQueryVariable('from')){
        location.replace('https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxebd76dff6ca15a2a&redirect_uri=http%3A%2F%2Fkids.immusician.com%2Fweb%2Fh5%2Ftest.html&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect')
    }
      
    
  },
};
</script>
