<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <!-- <MyUpload
        btnText="上传图片"
        :acceptType="-1"
        :defaultFile="obj.img"
        v-on:upload-success="imgUploadSuccess"
      />-->
      <Upload multiple name="material" :data="uploadData" :on-success="onSuccess" action="http://58.87.125.111:55555/v1/upload_course_material/">
        <Button icon="ios-cloud-upload-outline">选择上传</Button>
      </Upload>
      <span>是否需要生成短链:</span>
      <Select style="width:200px" v-model="needShort" placeholder="是否需要生成短链">
        <Option :value="1">需要</Option>
          <Option :value="0">不需要</Option>
      </Select>
      <div v-for="(item,index) in arr" :key="index">
        <div>链接：{{item.material_url}}</div>
        <div>短链接：{{item.short_url}}</div>
        <div>文件名：{{item.filename}}</div>
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
      arr: [],
      needShort:0
    };
  },
  computed: {
    // 计算属性的 getter
    uploadData: function () {
      // `this` 指向 vm 实例
      return {need_short:this.needShort}
    }
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

