<template>
  <div class="question" style="margin-left:100px">
    <div>
      <span class="select_label">题目要求：</span>
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
        <Input v-model="question.answer" placeholder="Enter something..." style="width: 100px"/>
      </div>
      <div class="tool_row">
        <Button @click="editShow=!editShow">编辑</Button>
      </div>
    </div>
    <div v-show="editShow">
      <BasicInput
        position="题目要求"
        :content="question.topic_request"
        v-on:upload="upload('topic_request',$event)"
      ></BasicInput>
      <BasicInput
        position="题目音频"
        :content="question.topic_voice"
        v-on:upload="upload('topic_voice',$event)"
      ></BasicInput>
      <BasicInput
        position="题干"
        :content="question.topic_main"
        v-on:upload="upload('topic_main',$event)"
      ></BasicInput>
      <BasicInput
        v-for="(option,index) in question.options"
        :key="index"
        :position="'选项'+(index+1)"
        :content="option"
        v-on:upload="upload('option'+index,$event)"
      ></BasicInput>
    </div>
  </div>
</template>
<script>
import BasicDisplay from "./BasicDisplay";
import BasicInput from "./BasicInput";

export default {
  props: {
    initQuestion: {
      default: function() {
        return {
          topic_request: "qweqwe",
          topic_main: "",
          topic_voice: "",
          options: ["", "", "",""],
          answer: "0",
        };
      }
    }
  },
  data() {
    return {
      editShow: false,
      question: this.initQuestion,
      online: "false",
      model7: 10
    };
  },
  components: {
    BasicDisplay,
    BasicInput
  },
  mounted() {
    this.getTagList();
  },
  methods: {
    handleSubmit() {
      var resultParam = this.formateSubmit(this.question);
      console.log(resultParam);
      return;
      this.axios
        .post(
          `${process.env.JINKANG}/v2/question/create_material/`,
          resultParam
        )
        .then(res => {
          this.$parent.getQuestionList();
        });
    },
    formateSubmit(obj) {
      var obj = JSON.parse(JSON.stringify(obj));
      var newObj = {};
      [
        "answer",
        "answer_detail",
        "options",
        "topic_main",
        "topic_request",
        "topic_voice"
      ].forEach(e => {
        newObj[e] = obj[e];
        delete obj[e];
      });
      obj.data = JSON.stringify(newObj);
      return obj;
    },
    upload(type, p) {
      if (type == "option0") {
        this.question.options.splice(0, 1, p);
      } else if (type == "option1") {
        this.question.options.splice(1, 1, p);
      } else if (type == "option2") {
        this.question.options.splice(2, 1, p);
      } else if (type == "option3") {
        this.question.options.splice(3, 1, p);
      } else {
        this.$set(this.question, type, p);
      }
    },
    remove() {
      var id = this.question.question_id;
      //return
      this.axios
        .get(
          `${
            process.env.JINKANG
          }/v2/question/delete_material/?question_id=${id}`
        )
        .then(res => {
          this.$parent.getQuestionList();
        });
      //this.$emit("remove", this.question);
    },
    getTagList() {
      this.axios
        .get(process.env.JINKANG + "/v2/question_bank/")
        .then(res => {
          this.tagList1 = res.data.abc;
          this.tagList2 = res.data.def;
          this.tagList3 = res.data.ghi;
          //this.tableLoading = false;
          //this.productList = res.data;
        });
    }
  }
};
</script>
<style lang="less">
.select_label {
  font-weight: bold;
  font-size: 14px;
}
.select_content {
  font-size: 16px;
  margin: 10px 0 10px 10px;
}
.tool_row {
  margin: 10px 0;
}
.question {
  display: inline-block;
  vertical-align: top;
}
</style>


