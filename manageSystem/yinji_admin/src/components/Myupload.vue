<template>
  <div class="my-upload">
    <Upload
      multiple
      name="material"
      :accept="myAccept"
      :on-success="onSuccess"
      :action="$store.state.uploadUrl"
    >
      <Button icon="ios-cloud-upload-outline">{{btnText}}</Button>
    </Upload>
    <!-- 图片 -->
    <div v-show="acceptType==0" v-for="(item,index) in myFileList" :key="index+'-'">
      <div>{{item}}</div>
      <img class="uploaded-img" :src="item" alt>
    </div>
    <!-- 音频 -->
    <div
      v-show="acceptType==1 && myFileList.length>0"
      v-for="(item,index) in myFileList"
      :key="index"
    >
      <div>{{item}}</div>
      <audio v-show="item" controls :src="item"></audio>
    </div>
    <!-- 其他文件 -->
    <div v-show="acceptType==-1" v-for="(item,index) in myFileList" :key="index+'--'">
      <div>{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    acceptType: {},
    btnText: {},
    defaultFileList: {
      default: []
    }
  },
  data() {
    return {
      myFileList: this.defaultFileList
    };
  },
  computed: {
    myAccept() {
      switch (this.acceptType) {
        case 0:
          return "image/*";
          break;
        case 1:
          return "audio/*";
          break;
        default:
          return "";
      }
    }
  },
  methods: {
    onSuccess(response, file, fileList) {
      this.$emit("upload-success", response, file, fileList);
    }
  },
  watch: {
    defaultFileList() {
      this.myFileList = this.defaultFileList;
    }
  }
};
</script>
<style lang="less">
.my-upload .ivu-upload-list {
  display: none;
}
.my-upload .uploaded-img {
  max-width: 500px;
}
</style>

