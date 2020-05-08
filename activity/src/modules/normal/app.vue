<template>
  <div>
    <router-view />
  </div>
</template>
<script>
export default {
  data() {
    
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
