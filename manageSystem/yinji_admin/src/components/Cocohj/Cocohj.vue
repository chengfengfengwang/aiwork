<template>
  <div class="upload-group">
    <div class="instrument_wrapper">
      <div>
        <span>题目：</span>
        <QList ref="listRef" :arr="obj.selectList"></QList>
      </div>
      <!-- <div>
        <span>倒计时：</span>
        <Input class="edit_width" v-model.number="obj.countdown" placeholder=""></Input>
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
      console.log(this.myObj);
      console.log(this.$refs.listRef.myArr);
      this.myObj.selectList = this.$refs.listRef.myArr;
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

