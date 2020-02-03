<template>
  <div class="my-upload">
    <Upload
      multiple
      name="material"
      :accept="myAccept"
      :on-success="onSuccess"
      action="http://58.87.125.111:55555/v1/upload_material/"
    >
      <Button icon="ios-cloud-upload-outline">{{btnText}}</Button>
    </Upload>
    <!-- 图片 -->
    <div v-show="acceptType==0">
      <div>{{myFile}}</div>
      <img class="uploaded-img" :src="myFile" alt>
    </div>
    <!-- 音频 -->
    <div v-show="acceptType==1">
      <div>{{myFile}}</div>
      <audio v-show="myFile" controls :src="myFile"></audio>
    </div>
    <!-- 视频 -->
    <div v-show="acceptType==2">
      <div>{{myFile}}</div>
      <video v-show="myFile" controls :src="myFile"></video>
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
      type: Number,
      default: 0 //0图片1音频-1其他
    },
    btnText: {
        type: String,
        default: '上传文件'
    },
    defaultFile: ""
  },
  data() {
    return {
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

  mounted() {},
  methods: {
    onSuccess(response, file, fileList) {
      this.myFile = response.data;
      console.log(response.data)
      this.$emit("upload-success", response.data);
      //console.log(response, file, fileList)
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
video{
  max-width: 300px;
}
</style>

