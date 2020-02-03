<template>
  <div>
    <sightSingItem :showArea="false" :isPreview="true" :initQuestion="initQuestion"></sightSingItem>
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
  </div>
</template>
<script>
import mixins_edit from "./previewMixin.js";
import sightSingItem from "./../SightSingItem";
export default {
  props: {
    initQuestion: {},
    showEdit: {
      default: true
    }
  },
  mixins: [mixins_edit],
  components: {
    sightSingItem
  },
  data() {
    return {
      question: this.initQuestion,
      editShow: false
    };
  },
  mounted() {},
  methods: {},
  watch: {
    initQuestion(v) {
      
    }
  }
};
</script>
<style>
</style>


