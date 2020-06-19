<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <div>
        <span>游戏组数</span>
        <Input class="edit_width" v-model.number="obj.group_num" placeholder="游戏组数"></Input>
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
        this.myObj.bg = response.data;
      }
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

