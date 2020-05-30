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
    console.log('zz')
  },
  methods: {
    toggleLoading(status) {
      this.loadingShow = status;
    }
  }
};
</script>
