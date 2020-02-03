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
        <span>最大可玩次数：</span>
        <Input class="edit_width" v-model.number="obj.maxRound" placeholder=""></Input>
      </div>
      <div>
        <span>倒计时时间：</span>
        <Input class="edit_width" v-model.number="obj.countdown" placeholder="单位：秒"></Input>
      </div>
      <div>
        <span>鱼的间距：</span>
        <Input class="edit_width" v-model.number="obj.fishDistance" placeholder="单位px"></Input>
      </div>
      <div>
        <span>同一个音符弹奏次数：</span>
        <Input class="edit_width" v-model.number="obj.notePlayNum" placeholder=""></Input>
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
import MyUpload from "../UploadGroup/UploadItem";
import passData from "../../assets/passData.js";
export default {
  props: {
    obj: {
      default: function() {
        return {
            countdown:300, //默认值
            maxRound:4
        };
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

