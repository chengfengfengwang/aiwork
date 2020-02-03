<template>
  <div class="topic_basic_item">
    <!-- 图片 -->
    <div v-show="acceptType==0">
      <div>{{content}}</div>
      <img class="uploaded-img" :src="content" alt>
    </div>
    <!-- 音频 -->
    <div v-show="acceptType==1">
      <div>{{content}}</div>
      <audio controls :src="content"></audio>
    </div>
    <!-- 其他文件 -->
    <div v-show="acceptType==-1">
      <div>{{content}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["content"],
  data() {
    return {
      myFileList: []
    };
  },
  computed: {
    acceptType() {
      return this.getFileType(this.content)
    }
  },
  mounted(){
      
  },
  methods: {}
};
</script>
<style lang="less">
.topic_basic_item .ivu-upload-list {
  display: none;
}
.topic_basic_item .uploaded-img {
  max-width: 200px;
}
</style>

