<template>
  <div class="upload-group">
    <h2 class="tool_row" style="margin:10px 0">
      <span>题目：</span>
      <slot></slot>
    </h2>
    <div class="item_wrapper">
      <span class="item">题干文字：</span>
      <Input style="width:500px" v-model="myItem.topicText"></Input>
    </div>
    <div class="item_wrapper">
      <span class="item">读题干文字：</span>
      <MyUpload
        class="item"
        style="margin-left:20px"
        btnText="上传音频"
        :acceptType="1"
        :defaultFile="myItem.topicTextAudio"
        v-on:upload-success="guideAudioSuccess"
      />
    </div>
    <div class="item_wrapper">
      <span class="item">topicMain：</span>
      <Select v-model="topicMain" style="width:200px">
        <Option :value="0">图片</Option>
        <Option :value="1">音频</Option>
        <Option :value="2">文字</Option>
      </Select>
      <MyUpload
        v-if="topicMain===0"
        class="item"
        style="margin-left:20px"
        btnText="上传图片"
        :acceptType="0"
        :defaultFile="myItem.topicMain"
        v-on:upload-success="topicMainSuccess"
      />
      <MyUpload
        v-if="topicMain===1"
        class="item"
        style="margin-left:20px"
        btnText="上传音频"
        :acceptType="1"
        :defaultFile="myItem.topicMain"
        v-on:upload-success="topicMainSuccess"
      />
      <Input v-if="topicMain===2" style="width:500px" v-model="myItem.topicMain"></Input>
    </div>
    <!-- <div class="item_wrapper">
      <span class="item">题目图片：</span>
      <MyUpload
        class="item"
        style="margin-left:20px"
        btnText="上传图片"
        :acceptType="0"
        :defaultFile="myItem.topicMain"
        v-on:upload-success="topicMainSuccess"
      />
    </div> -->
    <!-- <div class="item_wrapper">
      <span class="item">选项一：</span>
      <MyUpload
        class="item"
        style="margin-left:20px"
        btnText="上传图片"
        :acceptType="0"
        :defaultFile="myItem.topicMain"
        v-on:upload-success="topicMainSuccess"
      />
    </div>-->
    <div class="item_wrapper">
      <span class="item">选项一：</span>
      <Select v-model="optionModel1" style="width:200px">
        <Option :value="0">图片</Option>
        <Option :value="1">音频</Option>
        <Option :value="2">文字</Option>
      </Select>
      <MyUpload
        v-if="optionModel1===0"
        class="item"
        style="margin-left:20px"
        btnText="上传图片"
        :acceptType="0"
        :defaultFile="myItem.option1"
        v-on:upload-success="option1Success"
      />
      <MyUpload
        v-if="optionModel1===1"
        class="item"
        style="margin-left:20px"
        btnText="上传音频"
        :acceptType="1"
        :defaultFile="myItem.option1"
        v-on:upload-success="option1Success"
      />
      <Input v-if="optionModel1===2" style="width:500px" v-model="myItem.option1"></Input>
    </div>
    <div class="item_wrapper">
      <span class="item">选项二：</span>
      <Select v-model="optionModel2" style="width:200px">
        <Option :value="0">图片</Option>
        <Option :value="1">音频</Option>
        <Option :value="2">文字</Option>
      </Select>
      <MyUpload
        v-if="optionModel2===0"
        class="item"
        style="margin-left:20px"
        btnText="上传图片"
        :acceptType="0"
        :defaultFile="myItem.option2"
        v-on:upload-success="option2Success"
      />
      <MyUpload
        v-if="optionModel2===1"
        class="item"
        style="margin-left:20px"
        btnText="上传音频"
        :acceptType="1"
        :defaultFile="myItem.option2"
        v-on:upload-success="option2Success"
      />
      <Input v-if="optionModel2===2" style="width:500px" v-model="myItem.option2"></Input>
    </div>
    <div class="item_wrapper">
      <span class="item">正确答案：</span>
      <Input style="width:500px" v-model="myItem.answer"></Input>
    </div>
  </div>
</template>
<script>
var findIndex = require("lodash.findindex");
import MyUpload from "../UploadGroup/UploadItem";
export default {
  props: {
    item: {
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      myItem: this.item,
      topicMain: 0,
      optionModel1: 0,
      optionModel2: 0
    };
  },
  components: {
    MyUpload
  },
  created() {
    // console.log(this.group);
    // console.log(this.myItem);
  },
  methods: {
    option2Success(response, idx, position, file, fileList) {
      this.myItem.option2 = response.data;
    },
    option1Success(response, idx, position, file, fileList) {
      this.myItem.option1 = response.data;
    },
    guideAudioSuccess(response, idx, position, file, fileList) {
      this.myItem.topicTextAudio = response.data;
    },
    topicMainSuccess(response, idx, position, file, fileList) {
      this.myItem.topicMain = response.data;
    }
  },
  watch: {
    item() {
      this.myItem = this.item;
    }
  }
};
</script>
<style lang="less" scoped>
.item_wrapper {
  display: flex;
  align-items: flex-start;
}
.item {
  display: inline-block;
  vertical-align: center;
}

.tool_row:hover {
  position: relative;
  .tool {
    display: block;
  }
}
.tool {
  display: none;
  position: absolute;
  left: 136px;
  top: 3px;
  font-size: 12px;
  font-weight: normal;
  span {
    margin: 0 7px;
    color: blueviolet;
  }
}
</style>

