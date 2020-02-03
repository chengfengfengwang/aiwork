<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <div>
        <!-- <span>题目：</span> -->
        <QList ref="listRef" :arr="obj.instrumentList"></QList>
      </div>
      <div>
        <span>倒计时：</span>
        <Input class="edit_width" v-model.number="obj.countdown" placeholder=""></Input>
      </div>
      <div>
        <span>默认速度：</span>
        <Input class="edit_width" v-model.number="obj.speedDefault" placeholder=""></Input>
      </div>
      <div>
        <span>最小速度：</span>
        <Input class="edit_width" v-model.number="obj.speedMin" placeholder=""></Input>
      </div>
      <div>
        <span>最大速度：</span>
        <Input class="edit_width" v-model.number="obj.speedMax" placeholder=""></Input>
      </div>
      <div>
        <span>节拍：</span>
        <Input class="edit_width" v-model="obj.timeSign" placeholder=""></Input>
      </div>
      <!-- <div>
        <Button @click="submit">提交</Button>
      </div> -->
    </div>
  </div>
</template>
<script>
import QList from "./List";
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
    QList
  },
  created() {},
  methods: {
    submit() {
      this.myObj.instrumentList = this.$refs.listRef.submit();
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

