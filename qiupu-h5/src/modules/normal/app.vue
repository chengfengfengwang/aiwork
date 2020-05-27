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
  
  },
  methods: {
    toggleLoading(status) {
      this.loadingShow = status;
    }
  }
};
</script>
