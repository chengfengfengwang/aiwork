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
    <div v-show="acceptType==0" v-for="(item,index) in defaultFileList" :key="index+'-'">
      <div>{{item}}</div>
      <img class="uploaded-img" :src="item" alt>
    </div>
    <!-- 音频 -->
    <div v-show="acceptType==1" v-for="(item,index) in defaultFileList" :key="index">
      <div>{{item}}</div>
      <audio controls :src="item"></audio>
      <div class="edit_tools">
        <Button>删除</Button><Button>上移</Button><Button>下移</Button>
      </div>
    </div>
    <!-- 其他文件 -->
    <div v-show="acceptType==-1" v-for="(item,index) in defaultFileList" :key="index+'--'">
      <div>{{item}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["acceptType", "btnText", "defaultFileList"],
  data() {
    return {
      myFileList: []
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

