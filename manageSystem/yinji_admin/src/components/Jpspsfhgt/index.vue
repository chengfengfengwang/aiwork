<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <MyUpload
        btnText="上传视频"
        position="0"
        :acceptType="-1"
        :defaultFile="obj.video"
        v-on:upload-success="uploadSuccess"
      />
      <MyUpload
        btnText="背景音乐"
        position="1"
        :acceptType="1"
        :defaultFile="obj.bgMusic"
        v-on:upload-success="uploadSuccess"
      />
       <MyUpload
        btnText="bgt"
        position="2"
        :acceptType="-1"
        :defaultFile="obj.bgt"
        v-on:upload-success="uploadSuccess"
      />
    </div>
  </div>
</template>
<script>
import MyUpload from "../UploadGroup/UploadItem";

export default {
  props: {
    obj: {
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      myObj: this.obj
    };
  },
  components: {
    MyUpload
  },
  created() {},
  methods: {
    submit() {
      console.log(this.myObj);
      return this.myObj;
    },
    uploadSuccess(response, idx, position, file, fileList) {
      if (position == 0) {
        this.myObj.video = response.data;
      } else if (position == 1) {
        this.myObj.bgMusic = response.data;
      } else if (position == 2) {
        this.myObj.bgt = response.data;
      } 
    },
   
  },
  watch: {
    obj() {
      this.myObj = this.obj;
    }
  }
};
</script>
<style lang="less" scoped>
.instrument_wrapper {
  padding-left: 10px;
}
.edit_width {
  width: 300px;
}
</style>

