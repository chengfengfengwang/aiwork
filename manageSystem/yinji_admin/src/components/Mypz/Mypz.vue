<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      
      <div>
        <span>背景：</span>
        <BgList ref="listRef" :arr="obj.bgList"></BgList>
      </div>
      <div>
        <span>一句话：</span>
        <Input class="edit_width" v-model="obj.inviteText" placeholder=""></Input>
      </div>
      <div>
        <span>二维码：</span>
            <MyUpload
          btnText="上传二维码"
          :acceptType="0"
          position="0"
          :defaultFile="obj.qrImg"
          v-on:upload-success="itemUploadSuccess"
        />
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
import BgList from "./List";
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
    BgList,
    MyUpload
  },
  created() {},
  methods: {
    itemUploadSuccess(response, idx, position, file, fileList) {
      this.myObj.qrImg = response.data;
    },
    submit() {
      //console.log(this.$refs.listRef.myArr);
      this.myObj.bgList = this.$refs.listRef.myArr;
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

