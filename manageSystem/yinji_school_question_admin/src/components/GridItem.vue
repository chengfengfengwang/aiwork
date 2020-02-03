<template>
  <div>
    <span class="card_label">{{position}}：</span>
    <Select @on-change="typeChange" v-model="type" placeholder="选择类型" style="width:200px">
      <Option :value="0">图片</Option>
      <Option :disabled="position=='右边'" :value="1">音频</Option>
      <Option :disabled="position=='右边'" :value="2">文字</Option>
    </Select>
    <Upload
      v-show="type!=2"
      style="width:200px;display:inline-block"
      :accept="acceptType"
      @on-exceeded-size="exceededHandle"
      :before-upload="handleUpload"
      :max-size="1024"
      @on-error="uploadError"
      @on-success="uploadSuccess"
      :action="$store.state.uploadUrl"
    >
      <Button icon="ios-cloud-upload-outline">上传素材</Button>
    </Upload>
    <div class="show_wrapper">
      <!-- 输入框展示逻辑originType为2且type为2 -->
      <Input
        v-show="originType==2 && type==2"
        style="width:500px"
        placeholder="输入卡片文字"
        @on-change="input"
        :value="gridText"
      ></Input>
      <!-- 输入框展示逻辑type为2 -->
      <Input
        v-show="originType!=2 && type==2"
        style="width:500px"
        placeholder="输入卡片文字"
        @on-change="input"
      ></Input>
      <!-- 图片展示逻辑上传成功并且选择type为0 -->
      <div v-show="(imgUploadSuccess && type==0)">
        <img style="max-width:500px" :src="previewSrc" alt>
      </div>
      <!-- 图片展示逻辑上传成功并且选择type为0 -->
      <div v-show="(originType==0 && type==0 && !imgUploadSuccess)">
        <img style="max-width:500px" :src="gridText" alt>
      </div>
      <!-- 音频文件展示逻辑 -->
      <div v-show="originType==1 && type==1 && !audUploadSuccess">{{gridText}}</div>
      <!-- 音频文件展示逻辑 -->
      <div v-show="audUploadSuccess && type==1">{{audioText}}</div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["position", "gridText", "gridId"],
  data() {
    return {
      uploadShow: false,
      inputTextShow: false,
      previewSrc: "",
      acceptType: "image/*",
      file: "",
      type: "",
      originType: "",
      imgUploadSuccess: "",
      audUploadSuccess: "",
      audioText: ""
    };
  },
  computed: {},
  mounted() {
    this.originType = this.initType();
    this.type = this.initType();
    this.typeChange()
  },
  methods: {
    typeChange(v) {
      switch (this.type) {
        case 0:
          this.acceptType = "image/*";
          break;
        case 1:
          this.acceptType = "audio/*";
          break;
        case 2:
          break;
      }
    },
    input(e) {
      this.$emit("upload", e.target.value);
    },
    initType() {
      return this.getFileType(this.gridText)
    },
    handleUpload(file) {
      //this.modalCoverShow = true;
      this.file = file;
      var type;
      if (file.type.indexOf("image") != -1) {
        this.previewSrc = window.URL.createObjectURL(file);
        type = "img";
      }
      var formdata = new FormData();
      formdata.append("material", file);
      if (type == "img") {
        formdata.append("type", 0);
        this.imgUploadSuccess = true;
      } else {
        formdata.append("type", 1);
        this.audUploadSuccess = true;
        this.audioText = file.name;
      }
      //return false
      this.axios
        .post(`${process.env.JINKANG}/v2/upload_material/`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          var url = res.data;
          this.$emit("upload", url);
          this.imgUploadSuccess = true;
          // this.$Message.success("修改成功啦!");
          // this.modalShow = false;
          // this.file = "";
          // this.getProductList();
        });
      return false;
    },
    exceededHandle() {
      this.$Message.error("封面最大不能超过1M，请将图片进行压缩优化");
    },
    uploadSuccess(e) {
      console.log(e);
    },
    uploadError(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="less" scoped>
.card_label {
  display: inline-block;
  width: 5em;
}
.show_wrapper {
  margin-left: 63px;
}
</style>

