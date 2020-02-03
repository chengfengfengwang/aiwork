<template>
  <div>
    <Instrument v-for="instrument in myInstrumentArr" :key="instrument.id" :instrument="instrument">
      <div class="tool">
        <span @click="upGroup(instrument)">上移</span>
        <span @click="downGroup(instrument)">下移</span>
        <span @click="remove(instrument)">移除</span>
      </div> 
    </Instrument>
    <div style="margin-top:10px"><Button type="success" @click="add">新增乐器</Button></div>
    
  </div>
</template>
<script>
var findIndex = require("lodash.findindex");
import Instrument from "./Instrument";
export default {
  props: {
    instrumentArr: {
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      myInstrumentArr: this.instrumentArr
    };
  },
  components: {
    Instrument
  },
  methods: {
    upGroup(item) {
      var fileList = JSON.parse(JSON.stringify(this.myInstrumentArr));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      if (index == 0) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index - 1];
      fileList[index - 1] = temp;
      this.myInstrumentArr = fileList;
    },
    downGroup(item) {
      var fileList = JSON.parse(JSON.stringify(this.myInstrumentArr));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      if (index == fileList.length - 1) {
        return;
      }
      var temp = fileList[index];
      fileList[index] = fileList[index + 1];
      fileList[index + 1] = temp;
      this.myInstrumentArr = fileList;
    },
    remove(item) {
      var fileList = JSON.parse(JSON.stringify(this.myInstrumentArr));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      fileList.splice(index, 1);
      this.myInstrumentArr = fileList;
    },
    add() {
      this.myInstrumentArr.push(
        {
          id: Date.now(),
          direction:0,
          completeMusic:'',
          wholeImg:'',
          spices:[]
        }
      );
    }
  },
  watch: {
    instrumentArr() {
      this.myInstrumentArr = this.instrumentArr;
    }
  }
};
</script>
