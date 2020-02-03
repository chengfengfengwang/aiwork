<template>
  <div>
    <div v-for="(question,index) in questions" :key="question.question_id">
      <div class="drag_question_index">题目{{index + 1 + '：'}}</div>
      <SightSingItem :tagListAll="tagListAll" :tagList="tagList" :initQuestion="question"></SightSingItem>
      <div></div>
    </div>
    <div style="margin-top:10px">
      <Button style="width:200px" type="info" @click="addNewQuestion">新增题目</Button>
    </div>
    <div style="margin-top:10px">
      <Page
        @on-page-size-change="pageSizeChange"
        @on-change="pageChange"
        :total="total"
        :page-size="pageSize"
        show-sizer
        :page-size-opts="[5,10,15,20,30,40]"
        show-elevator
      />
    </div>
  </div>
</template>
<script>
import SightSingItem from "./../../components/QuestionBank/SightSingItem";
import mixins_tagList from "./../../components/QuestionBank/tagListMixin.js";

export default {
  mixins: [mixins_tagList],
  data() {
    return {
      questions: [],
      page: 0,
      pageSize: 5,
      total: 0,
    };
  },
  mounted() {
    this.getQuestionList();
  },
  methods: {
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getQuestionList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getQuestionList();
    },
    addNewQuestion() {
      this.questions.push({
        data: {
          music_file:'',
          music_img: "",
          topic_request: "",
          topic_voice: "",
          bgt:"",
          pass_rate:"",
          mode:1,
          interval:0
        },
        online: "false",
        tag: "",
        type: 3
      });
    },
    getQuestionList() {
      this.axios
        .get(`${process.env.JINKANG}/${process.env.VERSION}/question/get_many_material/?type=3&page=${this.page}&size=${
            this.pageSize
          }`)
        .then(res => {
          this.questions = this.formateIncomingData(res.data);
          this.total = res.total;
          console.log(this.questions);
        });
    },
    formateIncomingData(arr) {
      arr.forEach(e => {
        e.online = e.online + "";
      });
      return arr;
    }
  },
  components: {
    SightSingItem
  }
};
</script>
<style lang="less">
.drag_question_index {
  font-size: 18px;
  margin: 10px 0;
  background-color: #f2f2f2;
}
</style>

