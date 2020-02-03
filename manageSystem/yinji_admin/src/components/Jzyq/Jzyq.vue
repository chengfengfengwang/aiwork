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
        <span>是否显示节奏：</span>
        <Select v-model="obj.showNote" style="width:200px" placeholder>
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
        <span>bgt使用乐器：</span>
        <Select v-model="obj.instrument" style="width:200px" placeholder>
          <Option v-for="instrument in instrumentArr" :key="instrument.name" :value="instrument.value">{{instrument.name}}</Option>
        </Select>
      </div>
         <MyUpload
        btnText="上传乐器1"
        :acceptType="0"
        :defaultFile="obj.instrumentPic1"
        v-on:upload-success="obj.instrumentPic1=$event.data"
      />
      <MyUpload
        btnText="上传乐器2"
        :acceptType="0"
        :defaultFile="obj.instrumentPic2"
        v-on:upload-success="obj.instrumentPic1=$event.data"
      />
      <MyUpload
        btnText="上传乐器3"
        :acceptType="0"
        :defaultFile="obj.instrumentPic3"
        v-on:upload-success="obj.instrumentPic1=$event.data"
      />
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
const instrumentArr = [
  {
    name: "刮鱼",
    value: "fish_instrument",
  },
  {
    name: "三角铁",
    value: "triangle",
  },
  {
    name: "双响筒",
    value: "double_barrelled",
  },
  {
    name: "响板",
    value: "clapper",
  },
  {
    name: "串铃",
    value: "bunch_bell",
  },
  {
    name: "沙蛋",
    value: "sand_egg_gold",
  },
  {
    name: "手鼓",
    value: "Tambourine",
  }
];
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
      myObj: this.obj,
      passData:passData,
      instrumentArr
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

