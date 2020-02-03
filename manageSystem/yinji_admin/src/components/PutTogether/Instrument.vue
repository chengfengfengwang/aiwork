<template>
  <div class="upload-group">
    <h2 class="tool_row">
      <span>乐器：</span>
      <slot></slot>
    </h2>
    <div class="instrument_wrapper">
      <div>
        <span class="label">乐器名称：</span>
        <Input v-model.number="myinstrument.name" placeholder="乐器名称如：吉他" style="width: 300px"/>
      </div>
      <div>
        <span class="label">方向：</span>
        <Select style="width:325px" v-model="myinstrument.direction" placeholder="选择方向">
              <Option :value="0">横向</Option>
              <Option :value="1">纵向</Option>
              <Option :value="2">4*4</Option>
            </Select>
        <!-- <Input v-model.number="myinstrument.direction" placeholder="0横向1竖向2代表4*4" style="width: 300px"/> -->
      </div>
      <div>
        <span class="label">整体图：</span>
        <MyUpload
          btnText="上传整体图"
          :acceptType="0"
          :defaultFile="myinstrument.wholeImg"
          v-on:upload-success="wholeImgSuccess"
        />
      </div>
      <div>
        完成音乐：
        <MyUpload
          btnText="上传完成音乐"
          :acceptType="1"
          :defaultFile="myinstrument.completeMusic"
          v-on:upload-success="completeMusicSuccess"
        />
      </div>
      <div class="item tool_row" v-for="(item,index) in myinstrument.spices" :key="index">
        <div class="tool">
          <span @click="up(item)">上移</span>
          <span @click="down(item)">下移</span>
          <span @click="remove(item)">删除</span>
        </div>
        <MyUpload
          btnText="上传碎片轮廓图"
          :acceptType="0"
          position="0"
          :index="index"
          :idx="index"
          :defaultFile="item.outlineImg"
          v-on:upload-success="itemUploadSuccess"
        />
        <MyUpload
          btnText="上传碎片实体图"
          :acceptType="0"
          position="1"
          :idx="index"
          :index="index"
          :defaultFile="item.realImg"
          v-on:upload-success="itemUploadSuccess"
        />
        <MyUpload
          btnText="上传声音"
          position="2"
          :acceptType="1"
          :idx="index"
          :index="index"
          :defaultFile="item.audio"
          v-on:upload-success="itemUploadSuccess"
        />
      </div>
      <div>
        <Button @click="add">新增碎片</Button>
      </div>
    </div>
  </div>
</template>
<script>
var findIndex = require("lodash.findindex");
import MyUpload from "../UploadGroup/UploadItem";
export default {
  props: {
    instrument: {
      default: function() {
        return {};
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
      myinstrument: this.instrument
    };
  },
  components: {
    MyUpload
  },
  created() {},
  methods: {
    completeMusicSuccess(response, idx, position, file, fileList) {
      this.myinstrument.completeMusic = response.data;
    },
    wholeImgSuccess(response, idx, position, file, fileList) {
      this.myinstrument.wholeImg = response.data;
    },
    itemUploadSuccess(response, idx, position, file, fileList) {
      console.log(response, idx, position);
      if (position == 0) {
        this.myinstrument.spices[idx].outlineImg = response.data;
      }
      if (position == 1) {
        this.myinstrument.spices[idx].realImg = response.data;
      } else if (position == 2) {
        this.myinstrument.spices[idx].audio = response.data;
      }
      console.log(this.myinstrument);
    },
    add() {
      console.log("---");
      console.log(this.myinstrument);
      this.myinstrument.spices.push({
        id: Date.now(),
        outlineImg: "",
        realImg: "",
        audio: ""
      });
      console.log("---");
    },
    down(item) {
      var fileList = JSON.parse(JSON.stringify(this.myinstrument.spices));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      if (index == fileList.length - 1) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index + 1];
      fileList[index + 1] = temp;
      this.myinstrument.spices = fileList;
    },
    up(item) {
      var fileList = JSON.parse(JSON.stringify(this.myinstrument.spices));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      if (index == 0) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index - 1];
      fileList[index - 1] = temp;
      this.myinstrument.spices = fileList;
    },
    remove(item) {
      var fileList = JSON.parse(JSON.stringify(this.myinstrument.spices));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      fileList.splice(index, 1);
      this.myinstrument.spices = fileList;
    }
  },
  watch: {
    instrument() {
      this.myinstrument = this.instrument;
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

