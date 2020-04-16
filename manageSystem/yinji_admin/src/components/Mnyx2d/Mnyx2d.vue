<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <MyUpload
        btnText="上传bgt"
        :acceptType="-1"
        :defaultFile="obj.bgt"
        v-on:upload-success="bgtUploadSuccess"
      />
      <div>
        <span>bgt使用乐器：</span>
        <Select v-model="obj.instrument" style="width:200px" filterable placeholder>
          <Option
            v-for="(value,key) in instrumentArr"
            :key="value"
            :value="value"
          >{{key}}</Option>
        </Select>
      </div>
    </div>
  </div>
</template>
<script>
import MyUpload from "../UploadGroup/UploadItem";
import instrumentArr from '../../assets/instrucmentList.js'

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
      instrumentArr
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

