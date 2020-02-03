
<template>
  <div class="ArticleDetail">
    {{title}}{{content}}
    <hr>
    <div ref="editor" style="text-align:left"></div>
  </div>
</template>

<script>
import E from 'wangEditor';
var editor;

export default {
  name: "WriteArticle",
  data: function() {
    return {
      title: "",
      content: ""
    };
  },
  mounted: function() {
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
  }
};
</script>