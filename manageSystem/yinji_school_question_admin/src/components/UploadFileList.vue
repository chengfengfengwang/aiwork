<template>
  <div class="my-upload">
    <Upload
    multiple
      name="material"
      accept=""
      :on-success="onSuccess"
      :action="$store.state.uploadUrl"
    >
      <Button icon="ios-cloud-upload-outline">{{btnText}}</Button>
    </Upload>
    <!-- 音频 -->
    <div v-for="(item,index) in myFileList" :key="item">
      <div>
        {{item}}
        <span class="tool_tag" @click="up(item)">上移</span>
        <span class="tool_tag" @click="down(item)">下移</span>
        <span class="tool_tag" @click="remove(item)">删除</span>
      </div>
      <!-- <audio controls :src="item"></audio> -->
    </div>
  </div>
</template>
<script>
export default {
  props: {
    btnText: {
      default: "素材"
    },
    acceptType: {},
    defaultFileList: {
      default: function () {
        return []
      }
    }
  },
  data() {
    return {
      myFileList: this.defaultFileList
    };
  },
  computed: {},
  mounted(){
    
  },
  methods: {
    onSuccess(response, file, fileList) {
      this.myFileList.push(response.data)
    },
    down(item) {
      var fileList = JSON.parse(JSON.stringify(this.myFileList));
      var index = fileList.indexOf(item);
      if (index == fileList.length - 1) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index + 1];
      fileList[index + 1] = temp;
      this.myFileList = fileList;
    },
    up(item) {
      var fileList = JSON.parse(JSON.stringify(this.myFileList));
      var index = fileList.indexOf(item);
      if (index == 0) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index - 1];
      fileList[index - 1] = temp;
      this.myFileList = fileList;
    },
    remove(item) {
      var fileList = JSON.parse(JSON.stringify(this.myFileList));
      var index = fileList.indexOf(item);
      fileList.splice(index, 1);
      this.myFileList = fileList;
    }
  },
  watch:{
    defaultFileList(){
      this.myFileList = this.defaultFileList
    }
  }
};
</script>
<style lang="less">
.tool_tag {
  color: blue;
  margin: 0 5px;
  cursor: pointer;
}
.ivu-upload-list-file-finish{
    display: none !important;
}
</style>

