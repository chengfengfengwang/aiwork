<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <div class="item tool_row" v-for="(item,index) in myArr" :key="item.id">
        <div class="tool">
          <span @click="up(item)">上移</span>
          <span @click="down(item)">下移</span>
          <span @click="remove(item)">删除</span>
        </div>
        <div>
          <span>类型：</span>
          <Select v-model="item.type" style="width:200px">
            <Option :value="0">图片</Option>
            <Option :value="1">音频</Option>
            <Option :value="-1">文字</Option>
          </Select>
        </div>
        <div>
          <span style="display:inline-block;vertical-align: top">素材：</span>
          <MyUpload
            v-show="item.type!==-1"
            style="display:inline-block"
            btnText="上传"
            :acceptType=item.type
            position="0"
            :index="index"
            :idx="index"
            :defaultFile="item.option"
            v-on:upload-success="optionUploadSuccess"
          />
          <Input style="width:300px" class="edit_width" v-show="item.type===-1" v-model="item.option" placeholder=""></Input>
        </div>
      </div>
      <div style="margin-left:15px">
        <Button size="small" @click="add" type="info">新增选项</Button>
        <!-- <Button @click="submit">确定</Button> -->
      </div>
    </div>
  </div>
</template>
<script>
var findIndex = require("lodash.findindex");
import MyUpload from "../UploadGroup/UploadItem";
export default {
  props: {
    arr: {
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      myArr: this.arr
    };
  },
  components: {
    MyUpload
  },
  created() {},
  methods: {
    submit() {
      console.log(this.myArr);
    },
    optionUploadSuccess(response, idx, position, file, fileList) {
      this.myArr[idx].option = response.data;
    },
    add() {
      this.myArr.push({
        id: Date.now(),
        option: "",
        type: ""
      });
    },
    down(item) {
      var fileList = JSON.parse(JSON.stringify(this.myArr));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      if (index == fileList.length - 1) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index + 1];
      fileList[index + 1] = temp;
      this.myArr = fileList;
    },
    up(item) {
      var fileList = JSON.parse(JSON.stringify(this.myArr));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      if (index == 0) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index - 1];
      fileList[index - 1] = temp;
      this.myArr = fileList;
    },
    remove(item) {
      var fileList = JSON.parse(JSON.stringify(this.myArr));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      fileList.splice(index, 1);
      this.myArr = fileList;
    }
  },
  watch: {
    arr() {
      this.myArr = this.arr;
    }
  }
};
</script>
<style lang="less" scoped>
.instrument_wrapper {
  padding-left: 10px;
}
.item {
  min-width: 80%;
  display: inline-block;
  vertical-align: top;
  position: relative;
  margin: 10px 0;
  margin-right: 10px;
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
  display: none;
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

