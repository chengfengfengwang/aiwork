<template>
  <div>
    <div>hello card {{param}}</div>
  </div>
</template>
<script>
import {getQueryVariable} from '../../common/util.js'
export default {
  data(){
    return{
      param:''
    }
  },
  mounted() {
      console.log(getQueryVariable('v'))
      this.param = getQueryVariable('v')
    
  }
};
</script>
