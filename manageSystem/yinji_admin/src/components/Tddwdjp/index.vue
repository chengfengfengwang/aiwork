<template>
  <div>
    <GroupItem v-for="(groupItem,index) in myGroupArr" :key="index" :group="groupItem">
      <div class="tool">
        <span @click="upGroup(groupItem)">上移</span>
        <span @click="downGroup(groupItem)">下移</span>
        <span @click="remove(groupItem)">移除</span>
      </div>
    </GroupItem>
    <div style="margin-top:10px;">
      <Button type="success" @click="add">新增分组</Button>
      <!-- <Button type="success" @click="submit">提交</Button> -->
    </div>
  </div>
</template>
<script>
var findIndex = require("lodash.findindex");
import GroupItem from "./GroupItem";
import MyUpload from "./../UploadGroup/UploadItem";
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
      myGroupArr: this.groupArr,
      myName: this.name
    };
  },
  components: {
    GroupItem,
    MyUpload
  },
  methods: {
    submit() {
      let resultArr = JSON.parse(JSON.stringify(this.myGroupArr));
      console.log(resultArr);
      return resultArr;
    },
    upGroup(item) {
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
    downGroup(item) {
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
    remove(item) {
      var fileList = JSON.parse(JSON.stringify(this.myGroupArr));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      fileList.splice(index, 1);
      this.myGroupArr = fileList;
    },
    add() {
      this.myGroupArr.push({
        id: Date.now(),
        audios: []
      });
    }
  },
  watch: {
    //immediate: true
    groupArr: {
      //immediate: true,
      handler() {
        this.myGroupArr = this.groupArr;
      }
    },
    name() {
      this.myName = this.name;
    }
  }
};
</script>
