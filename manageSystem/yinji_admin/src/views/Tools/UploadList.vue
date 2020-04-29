<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <!-- <MyUpload
        btnText="上传图片"
        :acceptType="-1"
        :defaultFile="obj.img"
        v-on:upload-success="imgUploadSuccess"
      />-->
      <Upload multiple name="material" :on-success="onSuccess" :action="$store.state.uploadUrl">
        <Button icon="ios-cloud-upload-outline">选择上传</Button>
      </Upload>
      <div v-for="(item,index) in arr" :key="index">
        {{item}}
        <!-- <img  style="width:230px" :src="item" alt=""> -->
      </div>
      <!-- <img v-for="(item,index) in arr" :key="index" :src="item" alt=""> -->
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      myObj: this.obj,
      arr: []
    };
  },
  components: {
    
  },
  created() {},
  methods: {
    onSuccess(response, file, fileList) {
      this.arr.push(response.data);
    },
    
  },
 
};
</script>
<style lang="less">
.instrument_wrapper{
    margin: 20px 30px;
}
</style>

