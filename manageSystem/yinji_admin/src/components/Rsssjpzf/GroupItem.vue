<template>
  <div class="upload-group">
    <h2 class="tool_row" style="margin:10px 0">
      <span>分组：</span>
      <slot></slot>
    </h2>
    <div>
      <span>练习手指：</span>
      <Input style="width:200px" v-model="myGroup.options" placeholder="输入手指，01234"/>
    </div>
  </div>
</template>
<script>
var findIndex = require("lodash.findindex");
import MyUpload from "../UploadGroup/UploadItem";
export default {
  props: {
    group: {
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      //数据格式如下
      //   [
      //     {
      //       id: 1,
      //       instrument:{
      //         img:'http://pnil6bhr3.bkt.clouddn.com/cover/game_material1551952199_pic',
      //         audio:'http://pnil6bhr3.bkt.clouddn.com/cover/game_material1553683115wo.mp3'
      //       }
      //     }
      //   ]
      myGroup: this.group
    };
  },
  components: {
    MyUpload
  },
  created() {
    // console.log(this.group);
    // console.log(this.myGroup);
  },
  methods: {
    down(item) {
      var fileList = JSON.parse(JSON.stringify(this.myGroup.keyboard));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      if (index == fileList.length - 1) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index + 1];
      fileList[index + 1] = temp;
      this.myGroup.keyboard = fileList;
    },
    up(item) {
      var fileList = JSON.parse(JSON.stringify(this.myGroup.keyboard));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      if (index == 0) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index - 1];
      fileList[index - 1] = temp;
      this.myGroup.keyboard = fileList;
    },
    remove(item) {
      var fileList = JSON.parse(JSON.stringify(this.myGroup.keyboard));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      fileList.splice(index, 1);
      this.myGroup.keyboard = fileList;
    }
  },
  watch: {
    group() {
      this.myGroup = this.group;
    }
  }
};
</script>
<style lang="less" scoped>
.item {
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin: 10px 0 10px 20px;
  padding: 10px;
  border: 1px solid #f2f2f2;
  background-color: #f2f2f2;
}
.tool_row:hover {
  position: relative;
  .tool {
    display: block;
  }
}
.tool {
  display: block;
  position: absolute;
  left: 136px;
  top: 3px;
  font-size: 12px;
  font-weight: normal;
  span {
    margin: 0 7px;
    color: blueviolet;
  }
}
</style>

