<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <span>模式：</span>
      <Select v-model="obj.mode" style="width:200px"  placeholder>
          <Option
            :value="1"
          >视频模式</Option>
          <Option
            :value="2"
          >游戏模式</Option>
        </Select>
      <MyUpload
        btnText="上传bgt"
        :acceptType="-1"
        :defaultFile="obj.bgt"
        v-on:upload-success="bgtUploadSuccess"
      />
      <div>
        <MyUpload
        btnText="上传mp3"
        :acceptType="1"
        :defaultFile="obj.mp3"
        v-on:upload-success="musicUploadSuccess"
      />
      </div>
      <div>
        <MyUpload
        btnText="上传视频"
        :acceptType="-1"
        :defaultFile="obj.video"
        v-on:upload-success="videoUploadSuccess"
        />
      </div>
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
      myObj: this.obj,
      
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
    bgtUploadSuccess(response, idx, position, file, fileList) {
      this.myObj.bgt = response.data;
    },
    musicUploadSuccess(response, idx, position, file, fileList) {
      this.myObj.mp3 = response.data;
    },
    videoUploadSuccess(response, idx, position, file, fileList) {
      this.myObj.video = response.data;
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

