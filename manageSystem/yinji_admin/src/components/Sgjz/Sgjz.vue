<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <MyUpload
        btnText="上传bgt"
        :acceptType="-1"
        :defaultFile="obj.bgt"
        v-on:upload-success="bgtUploadSuccess"
      />
      <MyUpload
        btnText="上传背景音乐"
        :acceptType="1"
        :defaultFile="obj.bgMusic"
        v-on:upload-success="bgMusicUploadSuccess"
      />
      <div>
        <span>是否显示歌词：</span>
        <Select v-model="obj.showLyric" style="width:200px" placeholder>
          <Option :value="1">是</Option>
          <Option :value="0">否</Option>
        </Select>
      </div>
      <div>
        <span>休止符显示：</span>
        <Select v-model="obj.showRestNote" style="width:200px" placeholder>
          <Option :value="1">休止符图片</Option>
          <Option :value="0">小狗</Option>
        </Select>
      </div>
      <div>
        <span>单行或多行：</span>
        <Select v-model="obj.lineNum" style="width:200px" placeholder>
          <Option :value="1">单行</Option>
          <Option :value="2">多行</Option>
        </Select>
      </div>
      <!-- <div>
        <span>是否显示节奏：</span>
        <Select v-model="obj.showNote" style="width:200px" placeholder>
          <Option :value="1">是</Option>
          <Option :value="0">否</Option>
        </Select>
      </div> -->
       <!-- <Button @click="submit">提交</Button> -->
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
import MyUpload from "../UploadGroup/UploadItem";
import passData from "../../assets/passData.js";
export default {
  props: {
    obj: {
      default: function() {
        return {
        };
      }
    }
  },
  data() {
    return {
      test:'',
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
      this.myObj.pear = 'http://cdn.kids.immusician.com/game/shuiguojiezou/pear.png';
      this.myObj.cherry1 = 'http://cdn.kids.immusician.com/game/shuiguojiezou/cherry1.png';
      this.myObj.cherry2 = 'http://cdn.kids.immusician.com/game/shuiguojiezou/cherry2.png';
      this.myObj.peach = 'http://cdn.kids.immusician.com/game/shuiguojiezou/peach.png';
      this.myObj.grape = 'http://cdn.kids.immusician.com/game/shuiguojiezou/grape.png';
      return this.myObj;
    },
    bgtUploadSuccess(response, idx, position, file, fileList) {
      this.myObj.bgt = response.data;
    },
    bgMusicUploadSuccess(response, idx, position, file, fileList) {
      this.myObj.bgMusic = response.data;
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

