<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <div class="item tool_row" v-for="(item,index) in myArr" :key="item.id">
        <div class="tool">
          <span @click="up(item)">上移</span>
          <span @click="down(item)">下移</span>
          <span @click="remove(item)">删除</span>
        </div>
        <MyUpload
          btnText="上传图片"
          :acceptType="0"
          position="0"
          :index="index"
          :idx="index"
          :defaultFile="item.img"
          v-on:upload-success="itemUploadSuccess"
        />
        <MyUpload
          btnText="上传音频"
          :acceptType="1"
          position="1"
          :index="index"
          :idx="index"
          :defaultFile="item.audio"
          v-on:upload-success="audioUploadSuccess"
        />
        <div>
          <span>名称：</span>
          <Select v-model="item.name" placeholder="">
            <Option
              v-for="(note,index) in noteList"
              :key="index"
              :value="note.value"
            >{{note.name}}</Option>
          </Select>
        </div>
      </div>
      <div>
        <Button @click="add" type="info">新增</Button>
        <!-- <Button @click="submit">确定</Button> -->
      </div>
    </div>
  </div>
</template>
<script>
var findIndex = require("lodash.findindex");
import MyUpload from "../UploadGroup/UploadItem";
const noteList = [
  { name: "1", value: "c" },
  { name: "2", value: "d" },
  { name: "3", value: "e" },
  { name: "4", value: "f" },
  { name: "5", value: "g" },
  { name: "6", value: "a" },
  { name: "7", value: "b" },
  { name: "8", value: "gc" }
];
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
        noteList:noteList,
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
    handleInput(i, v) {
      this.myArr[i].name = v;
    },
    itemUploadSuccess(response, idx, position, file, fileList) {
      this.myArr[idx].img = response.data;
    },
    audioUploadSuccess(response, idx, position, file, fileList) {
      this.myArr[idx].audio = response.data;
    },
    add() {
      this.myArr.push({
        id: Date.now(),
        img: ""
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

