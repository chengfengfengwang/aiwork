<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <MyUpload
        btnText="上传bgt"
        :acceptType="-1"
        :defaultFile="obj.bgt"
        v-on:upload-success="bgtUploadSuccess"
      />
      <MyUpload
        btnText="上传背景音乐"
        :acceptType="1"
        :defaultFile="obj.bgMusic"
        v-on:upload-success="bgMusicUploadSuccess"
      />
    </div>
  </div>
</template>
<script>
import MyUpload from "../UploadGroup/UploadItem";
import passData from "../../assets/passData.js";
export default {
  props: {
    obj: {
      default: function() {
        return {
        };
      }
    }
  },
  data() {
    return {
      test:'',
      myObj: this.obj,
      passData:passData
    };
  },
  components: {
    MyUpload
  },
  created() {},
  methods: {
    submit() {
      return this.myObj;
    },
    bgtUploadSuccess(response, idx, position, file, fileList) {
      this.myObj.bgt = response.data;
    },
    bgMusicUploadSuccess(response, idx, position, file, fileList) {
      this.myObj.bgMusic = response.data;
    }
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

