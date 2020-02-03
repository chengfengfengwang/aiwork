
<template>
  <div class="ArticleDetail">
    {{title}}{{content}}
    <hr>
    <div style="margin-bottom:10px">
      <span>标题：</span>
      <Input style="width:300px" v-model="title" placeholder></Input>
    </div>
    <div ref="editor" style="text-align:left;"></div>
    <Button type="success" @click="submit">提交</Button>
  </div>
</template>

<script>
import E from "wangEditor";
var editor;

export default {
  name: "WriteArticle",
  data: function() {
    return {
      id: "",
      title: "",
      content: `<p>1.阿瑟费个更多水分</p><ul><li>嘎多</li><li>贵卅地方</li></ul><p><img src="http://image.yinji.immusician.com/material/ae715dd66f84e75fa8c0d84cf2298a69.jpg" style="max-width:100%;"><br></p>`,
      status: "create"
    };
  },
  created() {
    this.status = localStorage.getItem("tpStatus");
  },
  mounted() {
    this.initEditor();
    if (this.status === "edit") {
      this.title = localStorage.getItem("tpTitle");
      this.id = localStorage.getItem("tpId");
      this.content = localStorage.getItem("tpData");
      editor.txt.html(this.content);
    }
  },
  methods: {
    initEditor() {
      var That = this;
      editor = new E(this.$refs.editor);
      editor.customConfig = {
        debug: true,
        onchange: function(html) {
          That.content = html;
        },
        uploadImgServer: "http://58.87.125.111:55555/v1/upload_material/", // 上传图片到服务器
        uploadFileName: "material", //后端使用这个字段获取图片信息
        uploadImgMaxLength: 1, // 限制一次最多上传 1 张图片
        uploadImgHooks: {
          customInsert: function(insertImg, result, editor) {
            // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
            // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
            // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
            var url = result.data;
            insertImg(url);
          }
        }
      };
      editor.create();
    },
    submit() {
      if (this.status === "create") {
        this.axios
          .post(
            `http://api.yinji.immusician.com/v1/materials/upload_pre_guide`,
            {
              title: this.title,
              data: this.content
            }
          )
          .then(res => {
            this.$Message.success("提交成功!");
          });
      } else {
        this.axios
          .post(
            `http://api.yinji.immusician.com/v1/materials/update_pre_guide`,
            {
              id: this.id,
              title: this.title,
              data: this.content
            }
          )
          .then(res => {
            this.$Message.success("提交成功!");
          });
      }
    }
  }
};
</script>
<style lang="less">
.w-e-text-container {
  min-height: 700px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
}
</style>
