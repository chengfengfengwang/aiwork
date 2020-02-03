<template>
  <div class="my-upload">
    <Upload
      multiple
      name="material"
      :accept="myAccept"
      :on-success="onSuccess"
      :action="UPLOAD_URL"
    >
      <Button icon="ios-cloud-upload-outline">{{btnText}}</Button>
    </Upload>
    <!-- 图片 -->
    <div v-show="acceptType==0">
      <div>{{myFile}}</div>
      <img class="uploaded-img" :src="myFile" alt>
    </div>
    <!-- 音频 -->
    <div
      v-show="acceptType==1"
    >
      <div>{{myFile}}</div>
      <audio v-show="myFile" controls :src="myFile"></audio>
    </div>
    <!-- 其他文件 -->
    <div v-show="acceptType==-1">
      <div>{{myFile}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    acceptType: {
      default: -1
    },
    btnText: {
      default: '上传文件'
    },
    defaultFile: ''
  },
  data() {
    return {
      UPLOAD_URL:process.env.UPLOAD_URL,
      myFile: this.defaultFile
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
      this.myFile = response.data;
      this.$emit("upload-success",response, file, fileList);      
    }
  },
  watch: {
    defaultFile() {
      this.myFile = this.defaultFile;
    }
  }
};
</script>
<style lang="less" scoped>
.my-upload .ivu-upload-list {
  display: none;
}
.my-upload .uploaded-img {
  max-width: 100px;
}
</style>

