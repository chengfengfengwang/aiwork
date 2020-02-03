<template>
  <div class="upload-group">
    <div class="item tool_row" v-for="(item,index) in myGroupArr" :key="index">
      <div class="tool">
        <span @click="up(item)">上移</span>
        <span @click="down(item)">下移</span>
        <span @click="remove(item)">删除</span>
      </div>
      <MyUpload
        btnText="上传选项一"
        :acceptType="0"
        :idx="index"
        position="0"
        :index="index"
        :defaultFile="item.option1.img"
        v-on:upload-success="itemUploadSuccess"
      />
      <MyUpload
        btnText="上传选项二"
        :acceptType="0"
        :idx="index"
        :index="index"
        position="1"
        :defaultFile="item.option2.img"
        v-on:upload-success="itemUploadSuccess"
      />
      <MyUpload
        btnText="内容音频"
        :acceptType="1"
        :idx="index"
        :index="index"
        position="2"
        :defaultFile="item.contentAudio"
        v-on:upload-success="itemUploadSuccess"
      />
      <MyUpload
        btnText="背景图"
        :acceptType="0"
        :idx="index"
        :index="index"
        position="3"
        :defaultFile="item.bg"
        v-on:upload-success="itemUploadSuccess"
      />
      <span>答案：</span>
      <Input v-model.number="item.answer" placeholder="输入正确答案" style="width: 300px"/>
    </div>
    <div>
      <Button style="margin-left:20px" type="info" @click="add">新增组</Button>
    </div>
    <div>
      <span>是否是素养课：</span><Input v-model.number="isSuyangLesson" placeholder="0不是素养课1是素养课" style="width: 300px"/>
    </div>
  </div>
</template>
<script>
var findIndex = require("lodash.findindex");
import MyUpload from "./Upload";
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
      isSuyangLesson:1
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
        this.myGroupArr[idx].option1.img = response.data;
      } else if (position == 1) {
        this.myGroupArr[idx].option2.img = response.data;
      }else if (position == 2) {
        this.myGroupArr[idx].contentAudio = response.data;
      }else if (position == 3) {
        this.myGroupArr[idx].bg = response.data;
      }
    },
    add() {
      // console.log("---");
      // console.log(this.myGroupArr);
      // console.log("---");
      this.myGroupArr.push({
        id: Date.now(),
        option1:{
          img:''
        },
        option2:{
          img:''
        },
        contentAudio:"",
        answer: "",
        bg:""
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

