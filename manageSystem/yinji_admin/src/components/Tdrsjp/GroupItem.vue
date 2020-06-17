<template>
  <div class="upload-group">
    <h2 class="tool_row" style="margin:10px 0">
      <span>分组：</span>
      <slot></slot>
    </h2>
    <div>
      <span>上面拖动项：</span>
      
      <Input style="width:200px" v-model="myGroup.options" placeholder="输入数字，如2323代表2黑键3黑键2黑键3黑键排列"/>
    </div>
    <div>
      <div>下面键盘：</div>
      <div class="item tool_row" v-for="(item,index) in myGroup.keyboard" :key="index">
        <div class="tool">
          <span @click="up(item)">上移</span>
          <span @click="down(item)">下移</span>
          <span @click="remove(item)">删除</span>
        </div>
        <Select style="width:325px" v-model="item.name" placeholder="类别">
          <Option :value="2">2黑键</Option>
          <Option :value="3">3黑键</Option>
        </Select>
        <span>是否显示：</span>

        <Select style="width:325px" v-model="item.show" placeholder="是否显示">
          <Option :value="0">不是</Option>
          <Option :value="1">是</Option>
        </Select>
      </div>
    </div>

    <div>
      <Button style="margin-left:20px" type="info" @click="add">新增键</Button>
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
  
    itemUploadSuccess(response, idx, position, file, fileList) {
      if (position == 0) {
        this.myGroup.keyboard[idx].img = response.data;
      } else if (position == 1) {
        this.myGroup.keyboard[idx].audio = response.data;
      }
    },
    add() {
      this.myGroup.keyboard.push({
        id: Date.now(),
        name: "",
        show: "",
      });
    },
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

