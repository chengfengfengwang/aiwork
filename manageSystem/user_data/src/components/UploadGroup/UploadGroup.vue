<template>
  <div class="upload-group"> 
    <div class="item" v-for="(item,index) in myDataList" :key="index">
      <div class="tool">
        <span @click="up(item)">上移</span>
        <span @click="down(item)">下移</span>
        <span @click="remove(item)">删除</span>
      </div>
      <MyUpload
        btnText="上传图片"
        :acceptType="0"
        :idx="index"
        position="0"
        :index="index"
        :defaultFile="item.instrument.img"
        v-on:upload-success="itemUploadSuccess"
      />
      <MyUpload
        btnText="上传声音"
        :acceptType="1"
        :idx="index"
        :index="index"
        position="1"
        :defaultFile="item.instrument.audio"
        v-on:upload-success="itemUploadSuccess"
      />
    </div>

    <Button @click="add">新增</Button>
  </div>
</template>
<script>
var findIndex = require("lodash.findindex");
import MyUpload from "./UploadItem";
export default {
  props: {
    dataList: {
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
      myDataList: this.dataList
    };
  },
  components: {
    MyUpload
  },
  created() {
    console.log(this.dataList);
    console.log(this.myDataList);
  },
  methods: {
    itemUploadSuccess(response, idx, position, file, fileList) {
      if (position == 0) {
        this.myDataList[idx].instrument.img = response.data;
      } else if (position == 1) {
        this.myDataList[idx].instrument.audio = response.data;
      }
    },
    add() {
      this.myDataList.push({
        id: Date.now(),
        instrument: {
          img: "",
          audio: ""
        }
      });
    },
    down(item) {
      var fileList = JSON.parse(JSON.stringify(this.myDataList));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      if (index == fileList.length - 1) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index + 1];
      fileList[index + 1] = temp;
      this.myDataList = fileList;
    },
    up(item) {
      var fileList = JSON.parse(JSON.stringify(this.myDataList));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      if (index == 0) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index - 1];
      fileList[index - 1] = temp;
      this.myDataList = fileList;
    },
    remove(item) {
      var fileList = JSON.parse(JSON.stringify(this.myDataList));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      fileList.splice(index, 1);
      this.myDataList = fileList;
    }
  },
  watch: {
    dataList() {
      this.myDataList = this.dataList;
    }
  }
};
</script>
<style lang="less" scoped>
.item {
  position: relative;
  margin: 10px 0;
    padding: 10px;
    border: 1px solid #f2f2f2;
    background-color: #f2f2f2;
}
.item:hover {
  .tool {
    display: block;
  }
}
.tool {
  display: none;
  position: absolute;
  left: 166px;
  top: 7px;
  span {
    margin: 0 7px;
    color: blueviolet;
  }
}
</style>

