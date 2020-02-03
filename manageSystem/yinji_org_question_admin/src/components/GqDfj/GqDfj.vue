<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <MyUpload
        btnText="上传bgt"
        :acceptType="-1"
        :defaultFile="obj.bgt"
        v-on:upload-success="bgtUploadSuccess"
      />
      <div>
        <span>游戏模式:</span>
        <Select class="edit_width" v-model="obj.mode" placeholder>
          <Option :value="0">简单模式</Option>
          <Option :value="1">复杂模式</Option>
        </Select>
      </div>

      <div>
        <span>区域宽度：</span>
        <Input class="edit_width" v-model="obj.viewAreaWidth" placeholder="输入百分比值，如98"></Input>
      </div>
      <div>
        <span>击中得分：</span>
        <Input class="edit_width" v-model="obj.hitScore"></Input>
      </div>
      <div>
        <span>未击中扣分：</span>
        <Input class="edit_width" v-model="obj.missScore"></Input>
      </div>
      <div>
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
      </div>
      <!-- <div>
        <Button @click="submit">提交</Button>
      </div> -->
    </div>
  </div>
</template>
<script>
import MyUpload from "../UploadGroup/UploadItem";
import passData from "../../assets/passData.js";
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
    MyUpload
  },
  created() {},
  methods: {
    submit() {
      console.log(this.myObj);
      return this.myObj;
    },
    bgtUploadSuccess(response, idx, position, file, fileList) {
      console.log(response, idx, position, file, fileList);
      this.myObj.bgt = response.data;
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

