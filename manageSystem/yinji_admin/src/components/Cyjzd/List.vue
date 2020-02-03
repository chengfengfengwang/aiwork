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
          <span style="display:inline-block;vertical-align: top">乐器：</span>
          <Select v-model="item.instrument" style="width:200px">
            <Option
              v-for="instrument in instrumentArr"
              :key="instrument.value"
              :value="instrument.value"
            >{{instrument.name}}</Option>
          </Select>
        </div>
        <div>
          <span style="display:inline-block;vertical-align: top">乐器代表音符：</span>
          <Select v-model="item.note" style="width:200px">
            <Option v-for="note in noteArr" :key="note.value" :value="note.value">{{note.name}}</Option>
          </Select>
        </div>
      </div>
      <div>
        <Button @click="add" type="info">新增乐器</Button>
        <!-- <Button @click="submit">确定</Button> -->
      </div>
    </div>
  </div>
</template>
<script>
var findIndex = require("lodash.findindex");
import MyUpload from "../UploadGroup/UploadItem";
const instrumentArr = [
  {
    name: "三角铁",
    value: "Triangle"
  },
  {
    name: "刮葫",
    value: "Guiro"
  },
  {
    name: "双响筒",
    value: "TwinToneBlock"
  },
  {
    name: "响板",
    value: "Castanet"
  },
  {
    name: "串铃",
    value: "Bell"
  },
  {
    name: "沙蛋",
    value: "EggShaker"
  },
  {
    name: "手鼓",
    value: "HandDrum"
  }
];
const noteArr = [
  {
    name: "无",
    value: 0
  },
  {
    name: "二分音符",
    value: 2
  },
  {
    name: "四分音符",
    value: 4
  },
  {
    name: "四分休止符",
    value: -4
  },
  {
    name: "八分音符",
    value: 8
  },
  {
    name: "十六分音符",
    value: 16
  }
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
      myArr: this.arr,
      instrumentArr,
      noteArr
    };
  },
  components: {
    MyUpload
  },
  created() {},
  methods: {
    submit() {
      // this.myArr.forEach(e => {
      //   instrumentArr.forEach(k => {
      //     if (e.instrument === k.value) {
      //       e.note = k.note;
      //     }
      //   });
      // });
      return this.myArr;
    },
    questionUploadSuccess(response, idx, position, file, fileList) {
      this.myArr[idx].question = response.data;
    },
    add() {
      this.myArr.push({
        id: Date.now()
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
  min-width: 40%;
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
  right: 0px;
  top: 3px;
  font-size: 12px;
  font-weight: normal;
  span {
    margin: 0 7px;
    color: blueviolet;
  }
}
</style>

