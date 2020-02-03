<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      
      <div>
        <span>曲谱和节拍：</span>
        <BgtList ref="listRef" :arr="obj.musicAndSign"></BgtList>
      </div>
      <div>
        <span>默认拍号和bgt：</span>
        <Select v-model.number="obj.defaultMusicAndSignIndex" style="width:200px" placeholder>
          <Option :key="index" v-for="(n,index) in 6" :value="n">第{{n}}个</Option>
        </Select>
      </div>
      <div>
        <span>是否显示拍号：</span>
        <Select v-model.number="obj.showTimeSign" style="width:200px" placeholder>
          <Option :value="1">是</Option>
          <Option :value="0">否</Option>
        </Select>
      </div>
      
      <div>
        <span>默认播放速度：</span>
        <Input class="edit_width" v-model.number="obj.defaultSpeed" placeholder=""></Input>
      </div>
      <div>
        <span>倒计时：</span>
        <Input class="edit_width" v-model.number="obj.countdown" placeholder=""></Input>
      </div>
       <div>
            <span>考察节拍：</span>
            <Select v-model="obj.lessonAboutNote" style="width:200px" placeholder="当前考察几分音符，如4,8,16">
                <Option :value="4">4</Option>
                <Option :value="8">8</Option>
                <Option :value="16">16</Option>
            </Select>
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
import BgtList from "./List";
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
    BgtList
  },
  created() {},
  methods: {
    submit() {
      console.log(this.myObj);
      console.log(this.$refs.listRef.myArr);
      this.myObj.musicAndSign = this.$refs.listRef.myArr;
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

