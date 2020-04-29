<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <MyUpload
        btnText="上传图片"
        :acceptType="0"
        :defaultFile="obj.img"
        v-on:upload-success="imgUploadSuccess"
      />
    </div>
  </div>
</template>
<script>
import MyUpload from "../../components/UploadGroup/UploadItem";
export default {
  props: {
    obj: {
      default: function() {
        return {
            countdown:300, //默认值
            maxRound:4
        };
      }
    }
  },
  data() {
    return {
      myObj: this.obj,
    };
  },
  components: {
    MyUpload
  },
  created() {},
  methods: {
   
    imgUploadSuccess(response, idx, position, file, fileList) {
      this.myObj.bgt = response.data;
    },
    
  },
  watch: {
    obj() {
      this.myObj = this.obj;
    }
  }
};
</script>
<style lang="less">
.instrument_wrapper {
  padding-left: 10px;
}
.edit_width {
  width: 300px;
}
.uploaded-img{
    width: 200px;
}
</style>

