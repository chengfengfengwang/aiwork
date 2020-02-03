<template>
  <div class="singitem">
    <div>
      <div>序号：{{question.index}}</div>
      <span class="preview_label">题目要求：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.topic_request"></BasicDisplay>
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
      <span class="preview_label">倒计时提示音频：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.count_down_voice"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">音乐文件：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.music_file"></BasicDisplay>
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
      <span class="preview_label">节拍：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.beat"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">速度：</span>
      <BasicDisplay style="display:inline-block" :content="question.data.speed"></BasicDisplay>
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
      <span class="preview_label">视唱/模唱：</span>
      {{question.data.mode}}
    </div>
    <div>
      <span class="preview_label">间隔时间：</span>
      {{question.data.interval}}
    </div>
    <div
      @mousemove="wrapperMousemove"
      @mousedown="wrapperMouseDown"
      @mouseup="wrapperMouseup"
      class="mywrapper"
      ref="mywrapper"
    >
      <img v-show="showArea" class="myimg" ondragstart="return false;" :src="previewUrl" alt>
    </div>
    <div
      @mousemove="wrapperMousemove1"
      @mousedown="wrapperMouseDown1"
      @mouseup="wrapperMouseup1"
      class="mywrapper"
      ref="mywrapper1"
    >
      <img v-show="showArea" class="myimg" ondragstart="return false;" :src="previewUrl1" alt>
    </div>
    <!-- preview部分 -->
    <div v-if="!isPreview">
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
      <!-- <div class="question_item" style="margin-bottom:0" v-if="tagListAll.length>0">
        <span class="select_label">知识分类：</span>
        <div class="select_content">{{getTagName(this.tagListAll,question.tag)}}</div>
      </div>
      <div>
        <span class="select_label">位置：</span>
        <span class="select_content">{{question.source | Qposition}}</span>
      </div>-->
      <div>
        <Button @click="editShow = !editShow">编辑</Button>
      </div>
      <div class="tool_row" v-if="editShow">
        <div style="margin-bottom:10px">
          <Button @click="reset">重置五线谱</Button>
          <Button @click="undo">撤销五线谱</Button>
          <Button @click="reset1">重置简谱</Button>
          <Button @click="undo1">撤销简谱</Button>
        </div>
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
          <span>倒计时节拍数：</span>
          <Input v-model="question.data.beat" placeholder="输入倒计时节拍数，如4" style="width: 300px"/>
        </div>
        <div style="margin-bottom:10px">
          <span>速度：</span>
          <Input v-model="question.data.speed" placeholder="输入速度,如70" style="width: 300px"/>
        </div>
        <div style="margin-bottom:10px">
          <span>开始节拍：</span>
          <Input
            v-model="question.data.start_beat_index"
            placeholder="输入开始节拍"
            style="width: 300px"
          />
        </div>
        <div style="margin-bottom:10px">
          <span>结束节拍：</span>
          <Input v-model="question.data.end_beat_index" placeholder="输入结束节拍" style="width: 300px"/>
        </div>
        <div style="margin-bottom:10px">
          <span>视唱/模唱：</span>
          <RadioGroup v-model="question.data.mode">
            <Radio label="1">
              <span>视唱</span>
            </Radio>
            <Radio label="2">
              <span>模唱</span>
            </Radio>
          </RadioGroup>
        </div>
        <div style="margin-bottom:10px">
          <span>间隔时间：</span>
          <Input v-model="question.data.interval" placeholder="输入间隔时间" style="width: 300px"/>
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
            <Button icon="ios-cloud-upload-outline">上传五线谱</Button>
          </Upload>
          <Upload
            style="display:inline-block;vertical-align: top;"
            name="material"
            accept="image/*"
            :before-upload="handleUpload1"
            :on-success="uploadSuccess1"
            :action="$store.state.uploadUrl"
          >
            <Button icon="ios-cloud-upload-outline">上传简谱</Button>
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
            :on-success="countDownVoiceSuccess"
            :action="$store.state.uploadUrl"
          >
            <Button icon="ios-cloud-upload-outline">倒计时提示音频</Button>
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
        <div v-if="tagList.length>0">
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
            <Input
              v-model="answerDetail.difficult"
              ref="difficultAnswerDetail"
              style="width: 300px"
            />
          </div>
        </div>
        <Button @click="handleSubmit">确定</Button>
        <Button @click="remove">删除</Button>
      </div>
    </div>
    <!-- preview部分 -->
  </div>
</template>
<script>
import BasicDisplay from "./../../components/QuestionBank/BasicDisplay";
import AnswerDetailUpload from "./../../components/AnswerDetailUpload";
import { getTagName } from "./../../common/util.js";
const uniqWith = require("lodash.uniqwith");
const isEqual = require("lodash.isequal");
export default {
  props: {
    showArea: {
      default: true
    },
    isPreview: {
      default: false
    },
    initQuestion: {},
    tagList: {
      default: function() {
        return [];
      }
    },
    tagListAll: {
      default: function() {
        return [];
      }
    }
  },
  //props: ["initQuestion","tagList","tagListAll"],
  data() {
    return {
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
      startX1: "",
      startY1: "",
      dragging1: "",
      wrapper1: "",
      wrapperWidth1: "",
      wrapperHeight1: "",
      initArr1: [],
      boxArr1: [],
      previewUrl: "",
      previewUrl1: "",
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
    getTagName: getTagName,
    init() {
      this.wrapper = this.$refs.mywrapper;
      this.wrapper1 = this.$refs.mywrapper1;
      this.dragging = false;
      this.dragging1 = false;
      this.previewUrl = this.question.data.music_img;
      this.previewUrl1 = this.question.data.music_img1;
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
      if (process.env.NODE_ENV === "production") {
        alert("联系管理员删除");
        return;
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
        let isCorrect = "0";
        if (e.classList.contains("crrect")) {
          isCorrect = "1";
        }

        let width = parseFloat(e.style.width);
        let height = parseFloat(e.style.height);
        //x,y以左下角作为了原点坐标
        let x = parseFloat(e.style.left);
        let y =
          this.wrapperHeight -
          parseFloat(e.style.top) -
          parseFloat(e.style.height);
        //console.log(parseFloat(e.style.top) + parseFloat(e.style.height))
        this.boxArr.push({
          x: (x / this.wrapperWidth).toFixed(4),
          y: (y / this.wrapperHeight).toFixed(4),
          width: (width / this.wrapperWidth).toFixed(4),
          height: (height / this.wrapperHeight).toFixed(4),
          isCorrect
        });
        this.boxArr = uniqWith(this.boxArr, isEqual);
      });
      this.wrapper1.querySelectorAll(".note_area").forEach(e => {
        let isCorrect = "0";
        if (e.classList.contains("crrect")) {
          isCorrect = "1";
        }

        let width = parseFloat(e.style.width);
        let height = parseFloat(e.style.height);
        //x,y以左下角作为了原点坐标
        let x = parseFloat(e.style.left);
        let y =
          this.wrapperHeight1 -
          parseFloat(e.style.top) -
          parseFloat(e.style.height);
        //console.log(parseFloat(e.style.top) + parseFloat(e.style.height))
        this.boxArr1.push({
          x: (x / this.wrapperWidth1).toFixed(4),
          y: (y / this.wrapperHeight1).toFixed(4),
          width: (width / this.wrapperWidth1).toFixed(4),
          height: (height / this.wrapperHeight1).toFixed(4),
          isCorrect
        });
        this.boxArr1 = uniqWith(this.boxArr1, isEqual);
      });
      var resultParam = JSON.parse(JSON.stringify(this.question));
      var data = {};
      data.music_img = resultParam.data.music_img;
      data.music_img1 = resultParam.data.music_img1;
      data.topic_request = resultParam.data.topic_request;
      data.count_down = resultParam.data.count_down
        ? resultParam.data.count_down
        : 0;
      data.pass_rate = resultParam.data.pass_rate;
      data.beat = resultParam.data.beat;
      data.speed = resultParam.data.speed;
      data.start_beat_index = resultParam.data.start_beat_index;
      data.end_beat_index = resultParam.data.end_beat_index;
      data.interval = resultParam.data.interval;
      data.mode = resultParam.data.mode;
      data.topic_voice = resultParam.data.topic_voice;
      data.count_down_voice = resultParam.data.count_down_voice;
      data.music_file = resultParam.data.music_file;
      data.bgt = resultParam.data.bgt;
      data.target_area = this.boxArr;
      data.target_area1 = this.boxArr1;
      //答案解析
      this.answerDetail.difficult = Number(this.answerDetail.difficult);
      this.answerDetail.video_cover =
        "http://cdn.kids.immusician.com/app/resource/timg.jpeg";
      data.answer_detail = this.answerDetail;
      resultParam.data = JSON.stringify(data);
      console.log(resultParam.data);
      if (resultParam.online == "true") {
        resultParam.online = 1;
      } else {
        resultParam.online = 0;
      }
      var that = this;
      this.$Modal.confirm({
        title: "提示",
        content: "请确认你的提交数据，确定要提交？",
        onOk() {
          that.axios
            .post(
              `${process.env.JINKANG}/${process.env.VERSION}/question/create_material/`,
              resultParam
            )
            .then(res => {
              that.$Message.success("修改成功");
              that.boxArr = [];
              that.boxArr1 = [];
              that.$parent.getQuestionList();
            });
        }
      });
    },
    handleUpload(file) {
      this.previewUrl = window.URL.createObjectURL(file);
    },
    uploadSuccess(response, file, fileList) {
      this.question.data.music_img = response.data;
    },
    handleUpload1(file) {
      this.previewUrl1 = window.URL.createObjectURL(file);
    },
    uploadSuccess1(response, file, fileList) {
      this.question.data.music_img1 = response.data;
    },
    topicVoiceSuccess(response, file, fileList) {
      this.question.data.topic_voice = response.data;
    },
    countDownVoiceSuccess(response, file, fileList) {
      this.question.data.count_down_voice = response.data;
    },
    musicFileSuccess(response) {
      this.question.data.music_file = response.data;
    },
    topicBgtSuccess(response, file, fileList) {
      this.question.data.bgt = response.data;
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
    wrapperMouseup1(e) {
      this.dragging1 = false;
      if (this.wrapper1.querySelector("#active_note_area") !== null) {
        var ab = this.wrapper1.querySelector("#active_note_area");
        ab.removeAttribute("id");
        // 如果长宽均小于 3px，移除 note_area
        if (ab.offsetWidth < 3 || ab.offsetHeight < 3) {
          this.wrapper1.removeChild(ab);
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
    wrapperMousemove1(e) {
      if (this.wrapper1.querySelector("#active_note_area") !== null) {
        var ab = this.wrapper1.querySelector("#active_note_area");
        ab.style.width = e.offsetX - this.startX1 + "px";
        ab.style.height = e.offsetY - this.startY1 + "px";
      }

      // 移动，更新 note_area 坐标
      if (
        this.wrapper1.querySelector("#moving_note_area") !== null &&
        this.dragging1
      ) {
        var mb = this.wrapper1.querySelector("#moving_note_area");
        mb.style.top = e.target.offsetTop + e.offsetY - this.startY1 + "px";
        mb.style.left = e.target.offsetLeft + e.offsetX - this.startX1 + "px";
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

    wrapperMouseDown1(e) {
      //相对于wrapper内的坐标
      this.startX1 = e.offsetX;
      this.startY1 = e.offsetY;
      // 如果鼠标在 note_area 上被按下
      if (e.target.className.match(/note_area/)) {
        // 允许拖动
        this.dragging1 = true;

        // 设置当前 note_area 的 id 为 moving_note_area
        if (this.wrapper1.querySelector("#moving_note_area") !== null) {
          this.wrapper1
            .querySelector("#moving_note_area")
            .removeAttribute("id");
        }
        e.target.id = "moving_note_area";
      } else {
        // 在页面创建 note_area
        var active_note_area = document.createElement("div");
        active_note_area.id = "active_note_area";
        active_note_area.className = "note_area";
        active_note_area.style.top = this.startY1 + "px";
        active_note_area.style.left = this.startX1 + "px";
        this.wrapper1.appendChild(active_note_area);
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
    reset1() {
      this.boxArr1 = [];
      this.wrapper1.querySelectorAll(".note_area").forEach(e => {
        e.remove();
      });
    },
    undo1() {
      var areaArr = this.wrapper1.querySelectorAll(".note_area");
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
      };
      this.wrapper1.querySelector(".myimg").onload = function() {
        that.wrapperWidth1 = that.wrapper1.offsetWidth;
        that.wrapperHeight1 = that.wrapper1.offsetHeight;
        that.insertBox1();
      };
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
    insertBox1(arr) {
      this.initArr = this.question.data.target_area1;
      if (this.initArr) {
        this.initArr.forEach((e, i) => {
          var box = document.createElement("div");
          if (e.isCorrect == "1") {
            box.className = "note_area crrect";
          } else {
            box.className = "note_area";
          }
          box.style.top =
            this.wrapperHeight1 -
            e.y * this.wrapperHeight1 -
            e.height * this.wrapperHeight1 +
            "px";
          box.style.left = e.x * this.wrapperWidth1 + "px";
          box.style.height = e.height * this.wrapperHeight1 + "px";
          box.style.width = e.width * this.wrapperWidth1 + "px";

          this.wrapper1.appendChild(box);
          box = null;
        });
      }
    }
  },
  watch: {
    initQuestion(v) {
      this.question = this.initQuestion;
      // this.reset();
      // this.reset1();
      // this.init();
    }
  }
};
</script>
<style>
.crrect {
  background-color: blue !important;
}
.singitem .tool_row {
  background-color: #f6f6f6;
  padding: 10px 0;
  margin: 15px 0;
}
.singitem .preview_label {
  display: inline-block;
  vertical-align: top;
  font-weight: bold;
  font-size: 13px;
  width: 80px;
}
</style>


