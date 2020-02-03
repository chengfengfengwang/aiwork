<template>
  <div class="upload-group">
    <div class="item tool_row" v-for="(item,index) in myGroupArr" :key="index">
      <div class="tool">
        <span @click="up(item)">上移</span>
        <span @click="down(item)">下移</span>
        <span @click="remove(item)">删除</span>
      </div>
      <MyUpload
        btnText="音频"
        :acceptType="1"
        :idx="index"
        :index="index"
        position="0"
        :defaultFile="item.music.url"
        v-on:upload-success="itemUploadSuccess"
      />
      <span>乐器名称：</span>
      <Select v-model="item.music.type" placeholder="选择乐器">
              <Option
                v-for="(value,name) in HechengInstruments"
                :key="value"
                :value="value"
              >{{name}}</Option>
            </Select>
      <!-- <Input v-model="item.music.type" placeholder="输入乐器" style="width: 300px"/> -->
    </div>
    <div>
      <Button style="margin-left:20px" type="info" @click="add">新增乐器</Button>
    </div>
  </div>
</template>
<script>
var findIndex = require("lodash.findindex");
import MyUpload from "./Upload";
import HechengInstruments from '../../assets/instrucmentList.js'
export default {
  props: {
    groupArr: {
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
      myGroupArr: this.groupArr,
      HechengInstruments:HechengInstruments
    };
  },
  components: {
    MyUpload
  },
  created() {
    // console.log(this.group);
    // console.log(this.myGroupArr);
  },
  methods: {
    itemUploadSuccess(response, idx, position, file, fileList) {
      if (position == 0) {
        this.myGroupArr[idx].music.url = response.data;
      } 
    },
    add() {
      // console.log("---");
      // console.log(this.myGroupArr);
      // console.log("---");
      this.myGroupArr.push({
        id: Date.now(),
        music:{
          url:''
        }
      });
    },
    down(item) {
      var fileList = JSON.parse(JSON.stringify(this.myGroupArr));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      if (index == fileList.length - 1) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index + 1];
      fileList[index + 1] = temp;
      this.myGroupArr = fileList;
    },
    up(item) {
      var fileList = JSON.parse(JSON.stringify(this.myGroupArr));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      if (index == 0) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index - 1];
      fileList[index - 1] = temp;
      this.myGroupArr = fileList;
    },
    remove(item) {
      var fileList = JSON.parse(JSON.stringify(this.myGroupArr));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      fileList.splice(index, 1);
      this.myGroupArr = fileList;
    }
  },
  watch: {
    groupArr() {
      this.myGroupArr = this.groupArr;
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
  display: none;
  position: absolute;
  left: 136px;
  top:3px;
  font-size: 12px;
  font-weight: normal;
  span {
    margin: 0 7px;
    color: blueviolet;
  }
}
</style>

