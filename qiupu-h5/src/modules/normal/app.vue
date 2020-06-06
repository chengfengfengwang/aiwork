<template>
  <div>
    <router-view />
  </div>
</template>
<script>
import { getQueryVariable } from "common/util.js";
export default {
  data() {
    return{
      
    }
  },
  components: {},
  created() {
    document.title = '求谱';
    this.axios.defaults.headers.common['token'] = getQueryVariable('token');
    this.axios.defaults.headers.common['uid'] = getQueryVariable('uid');
    this.instrument_type = getQueryVariable('instrument_type');
  },
  methods: {
    toggleLoading(status) {
      this.loadingShow = status;
    }
  }
};
</script>
