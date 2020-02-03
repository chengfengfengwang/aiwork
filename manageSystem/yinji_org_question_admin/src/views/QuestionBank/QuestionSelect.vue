<template>
  <div>
    <Spin size="large" fix v-show="loadingShow"></Spin>
    <div v-for="question in questions" :key="question.id">
      <div class="question_index" v-show="question.index">题目{{question.index  + '：'}}</div>
      <BasicQuestion
        v-on:remove="handleRemove"
        :tagListAll="tagListAll"
        :tagList="tagList"
        :initQuestion="question"
        :isShowDetail = "false"
      ></BasicQuestion>
      <div>
        <!-- <Button @click="handleSubmit">提交</Button> -->
      </div>
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
import BasicQuestion from "./../../components/QuestionBank/Select";
import mixins_tagList from "./../../components/QuestionBank/tagListMixin.js";

function getIndex(id, arr) {
  return arr.findIndex(e => {
    return e.id === id;
  });
}
export default {
  mixins: [mixins_tagList],
  data() {
    return {
      // questions: [
      //   {
      //     topic_request: "",
      //     topic_main: "",
      //     topic_voice: "",
      //     options: ["option111", "option222", "option333"],
      //     answer: "0",
      //     answer_detail: "iamdaanjiexi",
      //     online:"false",
      //     type:0,
      //     tag:10
      //   }
      // ]
      questions: [],
      loadingShow: true,
      page: 0,
      pageSize: 10,
      total: 0,
    };
  },
  components: {
    BasicQuestion
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
        topic_request: "",
        topic_main: "",
        topic_voice: "",
        options: ["", "", "", ""],
        answer: "0",
        answer_detail: "",
        online: 1,
        type: 0,
        tag: "",
        source: 0,
        "count_down":0,
        "interval":0,
        "voice2":""
      });
    },
    getQuestionList() {
      this.axios
        .get(`${process.env.JINKANG}/${process.env.VERSION}/question/get_many_material/?type=0&page=${this.page}&size=${
            this.pageSize
          }`)
        .then(res => {
          //this.tableLoading = false;
          //this.getQuestionList()
          //this.questions = res.data;
          this.questions = this.formateIncomingData(res.data);
          this.loadingShow = false;
          this.total = res.total;
          console.log(this.questions);
        });
    },
    formateIncomingData(arr) {
      arr.forEach((e, index) => {
        for (var key in e.data) {
          arr[index][key] = e.data[key];
        }
        arr[index].online = arr[index].online?1:0;
      });
      return arr;
    },
    handleRemove(question) {
      var index = getIndex(question.id, this.questions);
      console.log(index);
      this.questions.splice(index, 1);
      console.log(this.questions);
    }
  }
};
</script>
<style lang="less">
.question_index {
  display: inline-block;
  vertical-align: top;
  font-weight: bolder;
  font-size: 16px;
  margin-right: 10px;
}
</style>


