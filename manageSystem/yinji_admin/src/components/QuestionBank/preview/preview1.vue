<template>
  <div>
    <QuestionSelect :isShowDetail = "false" :showEdit="false" :initQuestion="question"></QuestionSelect>
    <div v-show="question.score!=undefined">
      <span class="select_label">分数：</span>
      {{question.score}}
    </div>
    <div v-show="showEdit">
      <div class="tool_row">
        <Button @click="editShow=!editShow">编辑</Button>
      </div>
      <div class="edit_area" v-show="editShow">
        <div class="edit_row">
          <span>分数：</span>
          <Input v-model="question.score" placeholder="输入题目分数" style="width: 300px"/>
        </div>
        <div class="edit_row">
          <Button @click="submit" class="submit_btn" type="info">提交</Button>
        </div>
      </div>
    </div>
    <!-- <span class="select_label">题目要求：</span>
    <div class="select_content">
      <BasicDisplay :content="question.topic_request"></BasicDisplay>
    </div>
    <span class="select_label">题目要求音频：</span>
    <div class="select_content">
      <BasicDisplay :content="question.topic_voice"></BasicDisplay>
    </div>
    <span class="select_label">题干：</span>
    <div class="select_content">
      <BasicDisplay :content="question.topic_main"></BasicDisplay>
    </div>
    <div v-for="(option,index) in question.options">
      <span class="select_label">{{'选项' + (index+1) + ':'}}</span>
      <div class="select_content">
        <BasicDisplay :content="option"></BasicDisplay>
      </div>
    </div>
    <div>
      <span class="select_label">正确答案：</span>
      {{question.answer}}
    </div>
    <span class="select_label">答案解析：</span>
    <div class="select_content">
      <BasicDisplay :content="question.answer_detail"></BasicDisplay>
    </div>
    <div v-show="question.score!=undefined">
      <span class="select_label">分数：</span>
      {{question.score}}
    </div>
    <div v-show="showEdit">
      <div class="tool_row">
        <Button @click="editShow=!editShow">编辑</Button>
      </div>
      <div class="edit_area" v-show="editShow">
        <div class="edit_row">
          <span>分数：</span>
          <Input v-model="question.score" placeholder="输入题目分数" style="width: 300px"/>
        </div>
        <div class="edit_row">
          <Button @click="submit" class="submit_btn" type="info">提交</Button>
        </div>
      </div>
    </div> -->
  </div>
</template>
<script>
import BasicDisplay from "./../BasicDisplay";
import mixins_edit from "./previewMixin.js";
import QuestionSelect from './../Select'
export default {
  props: {
    initQuestion:{},
    showEdit:{
      default: true
    }
  },
  data() {
    return {
      question: this.initQuestion
    };
  },
  mixins: [mixins_edit],
  components:{
    QuestionSelect
  }


  // props: {
  //   initQuestion:{},
  //   showEdit:{
  //     default: true
  //   }
  // },
  // mixins: [mixins_edit],
  // mounted(){
  // },
  // data() {
  //   return {
  //     question: this.initQuestion
  //   };
  // },
  // components: {
  //   BasicDisplay
  // },
  // methods: {
  // }
};
</script>
