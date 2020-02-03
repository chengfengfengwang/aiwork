<template>
  <div class="question">
    <div>
      <Button
        class="hide_btn"
        type="success"
        @click="myIsShowDetail = !myIsShowDetail"
      >{{myIsShowDetail?'收起':'展开'}}</Button>
      <div class="question_item">
        <span class="select_label">题目要求：</span>
        <div class="select_content">
          <BasicDisplay :content="question.topic_request"></BasicDisplay>
        </div>
      </div>
      <div v-if="myIsShowDetail">
        <div class="question_item">
          <span class="select_label">题目要求音频：</span>
          <div class="select_content">
            <BasicDisplay :content="question.topic_voice"></BasicDisplay>
          </div>
        </div>
        <div class="question_item">
          <span class="select_label">题干：</span>
          <div class="select_content">
            <BasicDisplay :content="question.topic_main"></BasicDisplay>
          </div>
        </div>
        <div class="question_item">
          <span class="select_label">题干音频：</span>
          <div class="select_content">
            <BasicDisplay :content="question.topic_main_voice"></BasicDisplay>
          </div>
        </div>
        <div class="question_item">
          <span class="select_label">音频2：</span>
          <div class="select_content">
            <BasicDisplay :content="question.voice2"></BasicDisplay>
          </div>
        </div>
        <div v-for="(option,index) in question.options">
          <div class="question_item">
            <span class="select_label">{{'选项' + (index+1) + ':'}}</span>
            <div class="select_content">
              <BasicDisplay :content="option"></BasicDisplay>
            </div>
          </div>
        </div>
        <div class="question_item">
          <span class="select_label">正确答案：</span>
          <div class="select_content">{{question.answer | option}}</div>
        </div>
        <!-- 状态、位置分类等附加信息 -->
        <div v-show="additionalInfo">
          <div class="question_item">
            <span class="select_label">答案解析：</span>
            <div class="select_content">
              <div>{{answerDetail}}</div>
              <!-- <BasicDisplay :content="question.answer_detail"></BasicDisplay> -->
            </div>
          </div>
          <!-- <div class="question_item" v-if="tagListAll && tagListAll.length>0">
            <span class="select_label">知识分类：</span>
            <div class="select_content">{{getTagName(this.tagListAll,question.tag)}}</div>
          </div>-->
          <div>
            <span class="select_label">状态：</span>
            <span class="select_content">{{question.online ?'上线':'未上线'}}</span>
          </div>
          <!-- <div>
            <span class="select_label">位置：</span>
            <span class="select_content">{{question.source | Qposition}}</span>
          </div>-->
        </div>
      </div>

      <!-- 状态、位置分类等附加信息 -->
      <div class="tool_row" v-show="showEdit">
        <Button @click="editShow=!editShow">编辑</Button>
        <Button v-show="additionalInfo" @click="remove">删除</Button>
      </div>
    </div>
    <div v-if="editShow">
      <div>
        <BasicInput
          position="题目要求"
          :content="question.topic_request"
          v-on:upload="upload('topic_request',$event)"
        ></BasicInput>
      </div>

      <BasicInput
        position="题目音频"
        :content="question.topic_voice"
        v-on:upload="upload('topic_voice',$event)"
      ></BasicInput>
      <BasicInput position="音频2" :content="question.voice2" v-on:upload="upload('voice2',$event)"></BasicInput>
      <BasicInput
        position="题干"
        :content="question.topic_main"
        v-on:upload="upload('topic_main',$event)"
      ></BasicInput>
      <BasicInput
        position="题干音频"
        :content="question.topic_main_voice"
        v-on:upload="upload('topic_main_voice',$event)"
      ></BasicInput>
      <BasicInput
        v-for="(option,index) in question.options"
        :key="index"
        :position="'选项'+(index+1)"
        :content="option"
        v-on:upload="upload('option'+index,$event)"
      ></BasicInput>
      <div>
        <span>正确答案：</span>
        <Input v-model="question.answer" placeholder="Enter something..." style="width: 100px"/>
      </div>

      <!-- 状态、位置分类等附加信息 -->
      <div v-show="additionalInfo">
        <div style="margin:10px 0">
          <div class="label" style="font-size:16px;font-weight:bold">答案解析：</div>
          <div>
            <span>视频：</span>
            <AnswerDetailUpload v-on:uploadSuccess="handleUploaded" ref="videoUpload" :type="2"></AnswerDetailUpload>
          </div>
          <div>
            <span>音频：</span>
            <AnswerDetailUpload v-on:uploadSuccess="handleUploaded" ref="audioUpload" :type="1"></AnswerDetailUpload>
          </div>
          <div>
            <span>图：</span>
            <AnswerDetailUpload v-on:uploadSuccess="handleUploaded" ref="imgUpload" :type="0"></AnswerDetailUpload>
          </div>
          <div>
            <span>文：</span>
            <Input v-model="answerDetail.text" ref="textAnswerDetail" style="width: 300px"/>
          </div>
          <div>
            <span>考点：</span>
            <Input v-model="answerDetail.point" ref="pointAnswerDetail" style="width: 300px"/>
          </div>
          <div>
            <span>难易度：</span>
            <Input
              v-model="answerDetail.difficult"
              ref="difficultAnswerDetail"
              style="width: 300px"
            />
          </div>
          <div>
            <span style="font-weight:bold;font-size:14px">题目倒计时：</span>
            <Input v-model="question.count_down" style="width: 300px"/>
          </div>
          <div>
            <span style="font-weight:bold;font-size:14px">听辨间隔：</span>
            <Input v-model="question.interval" style="width: 300px"/>
          </div>
        </div>
        <div>
          <span>是否上线：</span>
          <!-- <RadioGroup v-model="question.online">
            <Radio label="true">上线</Radio>
            <Radio label="false">不上线</Radio>
          </RadioGroup> -->
          <Select v-model="question.online" style="width:200px">
              <Option  :value="1">上线</Option>
              <Option  :value="0">不上线</Option>
          </Select>
        </div>
        <!-- <div v-if="tagList && tagList.length>0">
          <span>分类：</span>
          <Select v-model="question.tag" style="width:200px">
            <OptionGroup label="乐理">
              <Option
                v-for="item in tagList[0]"
                :value="item.value"
                :key="item.value"
              >{{ item.name }}</Option>
            </OptionGroup>
            <OptionGroup label="练耳">
              <Option
                v-for="item in tagList[1]"
                :value="item.value"
                :key="item.value"
              >{{ item.name }}</Option>
            </OptionGroup>
            <OptionGroup label="常识">
              <Option
                v-for="item in tagList[2]"
                :value="item.value"
                :key="item.value"
              >{{ item.name }}</Option>
            </OptionGroup>
            <OptionGroup label="视唱">
              <Option
                v-for="item in tagList[3]"
                :value="item.value"
                :key="item.value"
              >{{ item.name }}</Option>
            </OptionGroup>
          </Select>
        </div>
        <div>
          <span>位置：</span>
          <Select v-model="question.source" style="width:200px">
            <Option :value="0">默认</Option>
            <Option :value="1">知识点题库</Option>
            <Option :value="2">模拟题库</Option>
          </Select>
        </div>-->
        <Button type="primary" style="width:200px" @click="handleSubmit">提交</Button>
      </div>
      <!-- 状态、位置分类等附加信息 -->
    </div>
  </div>
</template>
<script>
import BasicDisplay from "./BasicDisplay";
import BasicInput from "./BasicInput";
import AnswerDetailUpload from "./../../components/AnswerDetailUpload";
import {
  getTagName,
  selectQuestionFilter,
  selectQuestionOption
} from "./../../common/util.js";
export default {
  props: {
    initQuestion: "",
    tagList: "",
    tagListAll: "",
    showEdit: {
      default: true
    },
    additionalInfo: {
      default: true
    },
    isShowDetail: {
      default: true
    }
  },
  data() {
    return {
      editShow: false,
      question: this.initQuestion,
      online: 1,
      model7: 10,
      myIsShowDetail: this.isShowDetail,
      answerDetail: {
        text: "",
        point: "",
        difficult: "",
        video: "",
        audio: "",
        img: ""
      }
    };
  },
  components: {
    BasicDisplay,
    BasicInput,
    AnswerDetailUpload
  },
  methods: {
    getTagName: getTagName,
    handleUploaded(param) {
      switch (param.type) {
        case 0:
          this.$set(this.answerDetail, "img", param.url);
          break;
        case 1:
          this.$set(this.answerDetail, "audio", param.url);
          break;
        case 2:
          this.$set(this.answerDetail, "video", param.url);
          break;
      }
    },
    handleSubmit() {
      //return
      var resultParam = this.formateSubmit(this.question);
      console.log(resultParam);
      //return;
      this.axios
        .post(
          `${process.env.JINKANG}/${process.env.VERSION}/question/create_material/`,
          resultParam
        )
        .then(res => {
          this.$Message.success("修改成功");
          this.$parent.getQuestionList();
        });
    },
    formateSubmit(obj) {
      var obj = JSON.parse(JSON.stringify(obj));
      this.answerDetail.difficult = Number(this.answerDetail.difficult);
      this.answerDetail.video_cover =
        "http://cdn.kids.immusician.com/app/resource/timg.jpeg";
      obj.answer_detail = this.answerDetail;
      var newObj = {};
      [
        "answer",
        "answer_detail",
        "options",
        "topic_main",
        "topic_request",
        "topic_voice",
        "count_down",
        "interval",
        "voice2"
      ].forEach(e => {
        newObj[e] = obj[e];
        delete obj[e];
      });
      selectQuestionFilter(newObj);
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
      var that = this;
      this.$Modal.confirm({
        title: '警告',
        content: '删除提要联系侯',
        onOk() {
          var id = that.question.question_id;
          //return
          that.axios
            .get(
              `${
                process.env.JINKANG
              }/${process.env.VERSION}/question/delete_material/?question_id=${id}`
            )
            .then(res => {
              that.$parent.getQuestionList();
            });
          //this.$emit("remove", this.question);
        }
      });
    }
  },
  mounted() {
    if (!this.question.options) {
      this.$set(this.question, "options", ["", "", "", ""]);
    }
    this.$set(this.question, "options", selectQuestionOption(this.question));
    if (typeof this.question.answer_detail !== "object") {
      this.answerDetail = {
        text: "",
        point: "",
        difficult: "",
        video: "",
        audio: "",
        img: ""
      };
    } else {
      this.answerDetail = this.question.answer_detail;
    }
  },
  watch: {
    initQuestion() {
      this.question = this.initQuestion;
      if (!this.question.options) {
        this.$set(this.question, "options", ["", "", "", ""]);
      }
      this.$set(this.question, "options", selectQuestionOption(this.question));
      if (typeof this.question.answer_detail !== "object") {
        this.answerDetail = {
          text: "",
          point: "",
          difficult: "",
          video: "",
          audio: "",
          img: ""
        };
      } else {
        this.answerDetail = this.question.answer_detail;
      }
    }
  }
};
</script>
<style lang="less">
.select_label {
  font-weight: bold;
  font-size: 14px;
  //width: 100px;
}
.select_content {
  font-size: 14px;
  margin-left: 10px;
}
.tool_row {
  margin: 10px 0;
  background-color: #f2f2f2;
}
.question {
  display: inline-block;
  vertical-align: top;
}
.hide_btn {
  float: right;
  margin-left: 50px;
  margin-top: -5px;
}
</style>


