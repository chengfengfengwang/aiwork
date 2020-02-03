<template>
  <div class="my_detail_upload">
    <Upload name="material" :action="uploadUrl" :data="typeObj" :on-success="uploadSuccess">
      <Button icon="ios-cloud-upload-outline">上传</Button>
    </Upload>
    <div class="del_btn" @click="deleteParam">删除</div>
  </div>
</template>
<script>
export default {
  props: {
    type: {
      default: 0
    }
  },
  data() {
    return {
      uploadUrl: process.env.UPLOAD_URL,
      typeObj: {
        type: this.type
      },
      uploadedUrl: ""
    };
  },
  components: {},
  methods: {
    uploadSuccess(response, file, fileList) {
      this.uploadedUrl = response.data;
      const param = {
        type: this.type,
        url: response.data
      };
      this.$emit("uploadSuccess", param);
    },
    deleteParam() {
      this.$emit("uploadSuccess", { type: this.type, url: "" });
      this.$Message.success('删除成功')
    }
  }
};
</script>
<style lang="less" scoped>
.my_detail_upload {
  position: relative;
  display: inline-block;
  vertical-align: middle;
}
.del_btn {
  position: absolute;
  right: -30px;
  top: 17%;
}
</style>

