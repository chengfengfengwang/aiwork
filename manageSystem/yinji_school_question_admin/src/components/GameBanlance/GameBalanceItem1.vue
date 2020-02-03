<template>
  <div class="balance_item">
    <Upload
      @on-exceeded-size="exceededHandle"
      :before-upload="handleUpload"
      :max-size="1024"
      @on-error="uploadError"
      @on-success="uploadSuccess"
      :action="$store.state.uploadUrl"
    >
      <Button icon="ios-cloud-upload-outline">上传音符图片</Button>
    </Upload>
   
    <img class="preview_img" :src="previewSrc" alt>
    <div>
     <span>音符权重：</span> <Input v-model="myData.value" placeholder="输入音符重量" style="width: 300px"/>
     <span>序标：</span> <Input v-model="myData.idx" placeholder="输入音符重量" style="width: 300px"/>
    </div>
     
  </div>
</template>
<script>
export default {
  name: "GameBalanceItem",
  props: {
    data: {}
  },
  data() {
    return {
      myData: {
        url: "",
        value: "",
        idx:''
      },
      value: "",
      previewSrc: "",
      acceptType: "image/*",
      file: "",
      type: "",
      audioText: ""
    };
  },
  created() {
    this.myData = this.data
      ? this.data
      : {
          url: "",
          value: "",
          idx: ""
        };
    this.previewSrc = this.data ? this.data.url : '';
    //this.value = this.data ? this.data.value : '';
  },
  methods: {
    input(e) {
      this.$emit("upload", e.target.value);
    },
    handleUpload(file) {
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
      } else {
        formdata.append("type", 1);
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
          this.$set(this.myData,'url',url)
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
.balance_item{
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #f2f2f2;
  background-color: #f2f2f2
}
.preview_img {
  max-width: 100px;
}
</style>

