<template>
  <div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    return{
      
    }
  },
  components: {},
  created() {
    document.title = '求谱';
    this.axios.defaults.headers.common['token'] = 'god';
    this.axios.defaults.headers.common['uid'] = 2;
  },
  methods: {
    toggleLoading(status) {
      this.loadingShow = status;
    }
  }
};
</script>
