<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      
      <div>
        <span>bgt：</span>
        <ItemList ref="listRef" :arr="obj.itemList"></ItemList>
      </div>
      <!-- <div>
        <span>是否直接通关：</span>
        <Select v-model="obj.canPass" style="width:200px" placeholder>
          <Option value="1">是</Option>
          <Option value="0">否</Option>
        </Select>
      </div>
      <div>
        <span>通关所需等级：</span>
        <Select v-model="obj.passScore" style="width:200px" placeholder>
          <Option v-for="item in passData" :key="item.name" :value="item.value">{{item.name}}</Option>
        </Select>
      </div> -->
      <!-- <div>
        <Button @click="submit">提交</Button>
      </div> -->
    </div>
  </div>
</template>
<script>
import ItemList from "./List";
import passData from "../../assets/passData.js";
import MyUpload from "../UploadGroup/UploadItem";

export default {
  props: {
    obj: {
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      myObj: this.obj,
      passData:passData
    };
  },
  components: {
    ItemList,
    MyUpload
  },
  created() {},
  methods: {
    submit() {
      //console.log(this.$refs.listRef.myArr);
      this.myObj.itemList = this.$refs.listRef.myArr;
      console.log(this.myObj);
      return this.myObj;
    }
  },
  watch: {
    obj() {
      this.myObj = this.obj;
    }
  }
};
</script>
<style lang="less" scoped>
.instrument_wrapper {
  padding-left: 10px;
}
.edit_width {
  width: 300px;
}
</style>

