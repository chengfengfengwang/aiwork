<template>
  <div class="dragitem">
    <div>
      <div>序号：{{question.index}}</div>
      <span class="preview_label">题目要求：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.topic_request"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">题目id：</span>
      <span>{{question.question_id}}</span>
    </div>
    <div>
      <span class="preview_label">倒计时：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.count_down"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">读题音频：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.topic_voice"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">bgt：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.bgt"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">通过率：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.pass_rate"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">开始节拍：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.start_beat_index"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">结束节拍：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.end_beat_index"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">6/8拍：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.mult"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">模式：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.play_mode"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">音乐文件：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.music_file"></BasicDisplay>
    </div>
    <div
      @mousemove="wrapperMousemove"
      @mousedown="wrapperMouseDown"
      @mouseup="wrapperMouseup"
      class="mywrapper"
      ref="mywrapper"
    >
      <img class="myimg" ondragstart="return false;" :src="previewUrl" alt>
    </div>
    <div>
      <RadioGroup v-model="question.online">
        <Radio label="true">上线</Radio>
        <Radio label="false">不上线</Radio>
      </RadioGroup>
    </div>
    <div class="question_item">
      <span class="select_label">答案解析：</span>
      <div class="select_content">
        <div>{{answerDetail}}</div>
        <!-- <BasicDisplay :content="question.answer_detail"></BasicDisplay> -->
      </div>
    </div>
    <div>
      <span>知识分类：</span>
      <span>{{getTagName(this.tagListAll,question.tag)}}</span>
    </div>
    <div>
      <span>位置：</span>
      <span>{{question.source | Qposition}}</span>
    </div>
    <div>
      <Button @click="editShow = !editShow">编辑</Button>
    </div>
    <div class="tool_row" v-show="editShow">
      <p>
        <Button @click="reset">重置</Button>
        <Button @click="undo">撤销</Button>
      </p>
      <div style="margin-bottom:10px">
        <span>题目要求：</span>
        <Input v-model="question.data.topic_request" placeholder="输入题目要求" style="width: 300px"/>
      </div>
      <div style="margin-bottom:10px">
        <span>倒计时：</span>
        <Input v-model="question.data.count_down" placeholder="输入倒计时" style="width: 300px"/>
      </div>
      <div style="margin-bottom:10px">
        <span>通过率：</span>
        <Input v-model="question.data.pass_rate" placeholder="输入通过率" style="width: 300px"/>
      </div>
      <div style="margin-bottom:10px">
        <span>开始节拍：</span>
        <Input v-model="question.data.start_beat_index" placeholder="输入开始节拍" style="width: 300px"/>
      </div>
      <div style="margin-bottom:10px">
        <span>结束节拍：</span>
        <Input v-model="question.data.end_beat_index" placeholder="输入结束节拍" style="width: 300px"/>
      </div>
      <div style="margin-bottom:10px">
        <span>6/8拍：</span>
        <Input v-model.number="question.data.mult" placeholder="输入数值" style="width: 300px"/>
      </div>
      <div style="margin-bottom:10px">
        <span>模式：</span>
        <Select v-model="question.data.play_mode" placeholder="选择模式" style="width: 300px">
            <Option value="tempo">tempo</Option>
            <Option value="beat">beat</Option>
        </Select>
      </div>
      <div>
        <Upload
          style="display:inline-block;vertical-align: top;"
          name="material"
          accept="image/*"
          :before-upload="handleUpload"
          :on-success="uploadSuccess"
          :action="$store.state.uploadUrl"
        >
          <Button icon="ios-cloud-upload-outline">上传曲谱</Button>
        </Upload>
        <Upload
          style="display:inline-block;vertical-align: top;"
          name="material"
          accept="audio/*"
          :on-success="topicVoiceSuccess"
          :action="$store.state.uploadUrl"
        >
          <Button icon="ios-cloud-upload-outline">上传读题音频</Button>
        </Upload>

        <Upload
          style="display:inline-block;vertical-align: top;"
          name="material"
          accept="audio/*"
          :on-success="musicFileSuccess"
          :action="$store.state.uploadUrl"
        >
          <Button icon="ios-cloud-upload-outline">上传音乐文件</Button>
        </Upload>

        <Upload
          style="display:inline-block;vertical-align: top;"
          name="material"
          :on-success="topicBgtSuccess"
          :action="$store.state.uploadUrl"
        >
          <Button icon="ios-cloud-upload-outline">上传bgt</Button>
        </Upload>
      </div>

      <RadioGroup v-model="question.online">
        <Radio label="true">上线</Radio>
        <Radio label="false">不上线</Radio>
      </RadioGroup>
      <!-- <div>
        <span>位置：</span>
        <Select v-model="question.source" style="width:200px">
          <Option :value="0">默认</Option>
          <Option :value="1">知识点题库</Option>
          <Option :value="2">模拟题库</Option>
        </Select>
      </div>
      <div>
        <span>分类：</span>
        <Select v-model="question.tag" style="width:200px">
          <OptionGroup label="乐理">
            <Option v-for="item in tagList[0]" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </OptionGroup>
          <OptionGroup label="练耳">
            <Option v-for="item in tagList[1]" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </OptionGroup>
          <OptionGroup label="常识">
            <Option v-for="item in tagList[2]" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </OptionGroup>
          <OptionGroup label="视唱">
            <Option v-for="item in tagList[3]" :value="item.value" :key="item.value">{{ item.name }}</Option>
          </OptionGroup>
        </Select>
      </div>-->
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
          <Input v-model="answerDetail.difficult" ref="difficultAnswerDetail" style="width: 300px"/>
        </div>
      </div>
      <Button @click="handleSubmit">确定</Button>
      <Button @click="remove">删除</Button>
    </div>
  </div>
</template>
<script>
import BasicDisplay from "./../../components/QuestionBank/BasicDisplay";
import { getTagName } from "./../../common/util.js";
import AnswerDetailUpload from "./../../components/AnswerDetailUpload";
const uniqWith = require("lodash.uniqwith");
const isEqual = require("lodash.isequal");
export default {
  props: ["initQuestion", "tagList", "tagListAll"],
  data() {
    return {
      editShow: false,
      question: this.initQuestion,
      editShow: false,
      online: "false",
      startX: "",
      startY: "",
      dragging: "",
      wrapper: "",
      wrapperWidth: "",
      wrapperHeight: "",
      initArr: [],
      boxArr: [],
      previewUrl: "",
      fileUrl: "", // https://tkimg.yinji100.com/file/FB/2f06dce082d16488865ba885abf91798.png!iyinji
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
  mounted() {
    this.init();
  },
  components: {
    BasicDisplay,
    AnswerDetailUpload
  },
  methods: {
    init() {
      this.wrapper = this.$refs.mywrapper;
      this.dragging = false;
      this.previewUrl = this.question.data.music_img;
      //插入坐标区域数据
      this.bindEvent();
      if (typeof this.question.data.answer_detail !== "object") {
        this.answerDetail = {
          text: "",
          point: "",
          difficult: "",
          video: "",
          audio: "",
          img: ""
        };
      } else {
        this.answerDetail = this.question.data.answer_detail;
      }
    },
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
    remove() {
      if(process.env.NODE_ENV==='production'){
        alert('联系管理员删除')
        return
      }
      var id = this.question.question_id;
      this.axios
        .get(
          `${
            process.env.JINKANG
          }/${process.env.VERSION}/question/delete_material/?question_id=${id}`
        )
        .then(res => {
          this.$parent.getQuestionList();
        });
      //this.$emit("remove", this.question);
    },
    handleSubmit() {
      this.wrapper.querySelectorAll(".note_area").forEach(e => {
        var isCorrect = "0";
        if (e.classList.contains("crrect")) {
          isCorrect = "1";
        }

        var width = parseFloat(e.style.width);
        var height = parseFloat(e.style.height);
        //x,y以左下角作为了原点坐标
        var x = parseFloat(e.style.left);
        var y =
          this.wrapperHeight -
          parseFloat(e.style.top) -
          parseFloat(e.style.height);
        this.boxArr.push({
          x: (x / this.wrapperWidth).toFixed(4),
          y: (y / this.wrapperHeight).toFixed(4),
          width: (width / this.wrapperWidth).toFixed(4),
          height: (height / this.wrapperHeight).toFixed(4),
          isCorrect
        });
        this.boxArr = uniqWith(this.boxArr, isEqual);
      });
      //return
      var resultParam = JSON.parse(JSON.stringify(this.question));
      var data = {};
      data.music_img = resultParam.data.music_img;
      data.topic_request = resultParam.data.topic_request;
      data.count_down = resultParam.data.count_down
        ? resultParam.data.count_down
        : 0;
      data.pass_rate = resultParam.data.pass_rate;
      data.start_beat_index = resultParam.data.start_beat_index;
      data.end_beat_index = resultParam.data.end_beat_index;
      data.mult = resultParam.data.mult;
      data.play_mode = resultParam.data.play_mode;
      data.topic_voice = resultParam.data.topic_voice;
      data.music_file = resultParam.data.music_file;
      data.bgt = resultParam.data.bgt;
      data.target_area = this.boxArr;
      //答案解析
      this.answerDetail.difficult = Number(this.answerDetail.difficult);
      this.answerDetail.video_cover =
        "http://cdn.kids.immusician.com/app/resource/timg.jpeg";
      data.answer_detail = this.answerDetail;
      resultParam.data = JSON.stringify(data);
      if (resultParam.online == "true") {
        resultParam.online = 1;
      } else {
        resultParam.online = 0;
      }
      var resultParam = JSON.parse(JSON.stringify(resultParam));
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
      var newObj = {};
      [
        "answer",
        "answer_detail",
        "options",
        "topic_main",
        "topic_request",
        "topic_voice",
        "count_down"
      ].forEach(e => {
        newObj[e] = obj[e];
        delete obj[e];
      });
      obj.data = JSON.stringify(newObj);
      return obj;
    },
    handleUpload(file) {
      this.previewUrl = window.URL.createObjectURL(file);
    },
    uploadSuccess(response, file, fileList) {
      this.question.data.music_img = response.data;
    },
    topicVoiceSuccess(response, file, fileList) {
      this.question.data.topic_voice = response.data;
    },
    musicFileSuccess(response, file, fileList) {
      this.question.data.music_file = response.data;
    },
    topicBgtSuccess(response, file, fileList) {
      this.question.data.bgt = response.data;
    },
    insertBox(arr) {
      this.initArr = this.question.data.target_area;
      if (this.initArr) {
        this.initArr.forEach((e, i) => {
          var box = document.createElement("div");
          if (e.isCorrect == "1") {
            box.className = "note_area crrect";
          } else {
            box.className = "note_area";
          }
          box.style.top =
            this.wrapperHeight -
            e.y * this.wrapperHeight -
            e.height * this.wrapperHeight +
            "px";
          box.style.left = e.x * this.wrapperWidth + "px";
          box.style.height = e.height * this.wrapperHeight + "px";
          box.style.width = e.width * this.wrapperWidth + "px";

          this.wrapper.appendChild(box);
          box = null;
        });
      }
    },
    wrapperMouseup(e) {
      this.dragging = false;
      if (this.wrapper.querySelector("#active_note_area") !== null) {
        var ab = this.wrapper.querySelector("#active_note_area");
        ab.removeAttribute("id");
        // 如果长宽均小于 3px，移除 note_area
        if (ab.offsetWidth < 3 || ab.offsetHeight < 3) {
          this.wrapper.removeChild(ab);
        }
      }
    },
    wrapperMousemove(e) {
      if (this.wrapper.querySelector("#active_note_area") !== null) {
        var ab = this.wrapper.querySelector("#active_note_area");
        ab.style.width = e.offsetX - this.startX + "px";
        ab.style.height = e.offsetY - this.startY + "px";
      }

      // 移动，更新 note_area 坐标
      if (
        this.wrapper.querySelector("#moving_note_area") !== null &&
        this.dragging
      ) {
        var mb = this.wrapper.querySelector("#moving_note_area");
        mb.style.top = e.target.offsetTop + e.offsetY - this.startY + "px";
        mb.style.left = e.target.offsetLeft + e.offsetX - this.startX + "px";
      }
    },
    wrapperMouseDown(e) {
      //相对于wrapper内的坐标
      this.startX = e.offsetX;
      this.startY = e.offsetY;
      // 如果鼠标在 note_area 上被按下
      if (e.target.className.match(/note_area/)) {
        // 允许拖动
        this.dragging = true;

        // 设置当前 note_area 的 id 为 moving_note_area
        if (this.wrapper.querySelector("#moving_note_area") !== null) {
          this.wrapper.querySelector("#moving_note_area").removeAttribute("id");
        }
        e.target.id = "moving_note_area";
      } else {
        // 在页面创建 note_area
        var active_note_area = document.createElement("div");
        active_note_area.id = "active_note_area";
        active_note_area.className = "note_area";
        active_note_area.style.top = this.startY + "px";
        active_note_area.style.left = this.startX + "px";
        this.wrapper.appendChild(active_note_area);
        active_note_area = null;
      }
    },
    reset() {
      this.boxArr = [];
      this.wrapper.querySelectorAll(".note_area").forEach(e => {
        e.remove();
      });
    },
    undo() {
      var areaArr = this.wrapper.querySelectorAll(".note_area");
      areaArr[areaArr.length - 1].remove();
    },
    mark(e) {
      if (e.target.className.match(/note_area/)) {
        e.target.style.backgroundColor = "blue";
        e.target.classList.add("crrect");
      }
    },
    bindEvent() {
      document.body.addEventListener("dblclick", function(e) {
        if (e.target.className.match(/note_area/)) {
          e.target.style.backgroundColor = "blue";
          e.target.classList.add("crrect");
        }
      });
      var that = this;
      this.wrapper.querySelector(".myimg").onload = function() {
        that.wrapperWidth = that.wrapper.offsetWidth;
        that.wrapperHeight = that.wrapper.offsetHeight;
        that.insertBox();
        console.log("图片执行加载事件");
      };
    }
  },
  watch: {
    initQuestion() {
      this.question = this.initQuestion;
      //console.log("执行了reset");
      //this.reset();
      //this.init()
    }
  }
};
</script>
<style>
.crrect {
  background-color: blue !important;
}
.dragitem .tool_row {
  background-color: #f6f6f6;
  padding: 10px 0;
  margin: 15px 0;
}
.dragitem .preview_label {
  display: inline-block;
  vertical-align: top;
  font-weight: bold;
  font-size: 13px;
  width: 80px;
}
</style>


