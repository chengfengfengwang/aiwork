<template>
  <div class="dragitem">
    <div>
      <span class="preview_label">游戏类型：{{question.type}}</span>
    </div>
    <div>
      <div class="preview_label">音频版选项：{{question.options}}</div>
    </div>
    <!-- <div>
      <span class="preview_label">题目id：</span>
      <span>{{question.question_id}}</span>
    </div> -->
    <div>
      <span class="preview_label">倒计时：</span>
      <BasicDisplay style="display:inline-block" :content="question.count_down"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">右图片：</span>
      <BasicDisplay style="display:inline-block" :content="question.imgRight"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">左音频：</span>
      <BasicDisplay style="display:inline-block" :content="question.audioLeft"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">右音频：</span>
      <BasicDisplay style="display:inline-block" :content="question.audioRight"></BasicDisplay>
    </div>
    <div>
      <span class="preview_label">音频版标题：</span>
      <BasicDisplay style="display:inline-block" :content="question.audioTopic"></BasicDisplay>
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
      <Button @click="editShow = !editShow">编辑</Button>
    </div>
    <div class="tool_row" v-show="editShow">
      <p>
        <Button @click="reset">重置</Button>
        <Button @click="undo">撤销</Button>
      </p>
      <div style="margin-bottom:10px">
        <span>类型：</span>
        <Select style="width:200px" v-model="question.type" placeholder="">
          <Option :value="0">音频版</Option>
          <Option :value="1">图片版</Option>
        </Select>
      </div>
      <div style="margin-bottom:10px">
        <span>倒计时：</span>
        <Input v-model="question.count_down" placeholder="输入倒计时" style="width: 300px"/>
      </div> 
      <div style="margin-bottom:10px">
        <span>音频版选项：</span>
        <Input v-model="options" placeholder="输入选项，用英文逗号隔开" style="width: 300px"/>
      </div> 
      <div style="margin-bottom:10px">
        <span>音频版答案：</span>
        <Select style="width:200px" v-model="question.answer" placeholder="">
          <Option v-for="(n,index) in 9" :key="index" :value="n-1">{{n}}处</Option>
        </Select>
      </div>
      <div style="margin-bottom:10px">
        <span>提示次数：</span>
        <Input v-model.number="question.tips_num" placeholder="输入提示次数" style="width: 300px"/>
      </div>
      <!-- <div style="margin-bottom:10px">
        <span>右图片：</span>
        <Input v-model="question.beat" placeholder="输入右图片，如3/4" style="width: 300px"/>
      </div> -->
      <div>
        <Upload
          style="display:inline-block;vertical-align: top;"
          name="material"
          accept="image/*"
          :before-upload="handleUpload"
          :on-success="uploadSuccess"
          :action="$store.state.uploadUrl"
        >
          <Button icon="ios-cloud-upload-outline">上传左图片</Button>
        </Upload>
        <Upload
          style="display:inline-block;vertical-align: top;"
          name="material"
          accept="image/*"
          :on-success="imgRightSuccess"
          :action="$store.state.uploadUrl"
        >
          <Button icon="ios-cloud-upload-outline">上传右图片</Button>
        </Upload>
        <Upload
          style="display:inline-block;vertical-align: top;"
          name="material"
          accept="audio/*"
          :on-success="audioLeftSuccess"
          :action="$store.state.uploadUrl"
        >
          <Button icon="ios-cloud-upload-outline">上传左音频</Button>
        </Upload>
        <Upload
          style="display:inline-block;vertical-align: top;"
          name="material"
          accept="audio/*"
          :on-success="audioRightSuccess"
          :action="$store.state.uploadUrl"
        >
          <Button icon="ios-cloud-upload-outline">上传右音频</Button>
        </Upload>
        <Upload
          style="display:inline-block;vertical-align: top;"
          name="material"
          accept="audio/*"
          :on-success="audioTopicSuccess"
          :action="$store.state.uploadUrl"
        >
          <Button icon="ios-cloud-upload-outline">上传标题音频</Button>
        </Upload>
      </div>
      <!-- <Button @click="handleSubmit">确定</Button> -->
    </div>
  </div>
</template>
<script>
import BasicDisplay from "./../../components/QuestionBank/BasicDisplay";
import { getTagName } from "./../../common/util.js";
const uniqWith = require("lodash.uniqwith");
const isEqual = require("lodash.isequal");
export default {
  props: ["initQuestion"],
  data() {
    return {
      question: this.initQuestion,
      editShow: false,
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
      resultObj:{},
      options:''
    };
  },
  created() {},
  mounted() {
    this.wrapper = this.$refs.mywrapper;

    this.dragging = false;
    // this.initArr = [
    //     {
    //       height: "0.0951",
    //       isCorrect: false,
    //       width: "0.0312",
    //       x: "0.1417",
    //       y: "0.6295"
    //     }
    //   ];
    this.previewUrl = this.question.imgLeft;
    //插入坐标区域数据
    this.bindEvent();
  },
  components: {
    BasicDisplay
  },
  methods: {
    getTagName: getTagName,
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
      //return
      var resultParam = JSON.parse(JSON.stringify(this.question));
      var data = {};
      data.imgLeft = resultParam.imgLeft;
      data.type = resultParam.type;
      data.count_down = resultParam.count_down?resultParam.count_down:0;
      data.imgRight = resultParam.imgRight?resultParam.imgRight:'';
      data.audioLeft = resultParam.audioLeft;
      data.audioRight = resultParam.audioRight;
      data.audioTopic = resultParam.audioTopic;
      data.options = resultParam.options;
      data.answer = resultParam.answer;
      data.tips_num = resultParam.tips_num;
      data.area = this.boxArr;
    return data;
    // this.$Message.success('可以提交了')
    // this.resultObj = data;
      
    },
    handleUpload(file) {
      this.previewUrl = window.URL.createObjectURL(file);
    },
    uploadSuccess(response, file, fileList) {
      this.question.imgLeft = response.data;
    },
    audioLeftSuccess(response, file, fileList) {
      this.question.audioLeft = response.data;
    },
    audioRightSuccess(response, file, fileList) {
      this.question.audioRight = response.data;
    },
    audioTopicSuccess(response, file, fileList) {
      this.question.audioTopic = response.data;
    },
    imgRightSuccess(response, file, fileList) {
      this.question.imgRight = response.data;
    },
    insertBox(arr) {
      this.initArr = this.question.area;
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
    initQuestion:{
      handler(newVal, oldVal) {
        this.question = this.initQuestion;
        this.options = this.question.options.join(',')
      },
      immediate:true
    },
    options: {
      handler(newVal, oldVal) {
        this.question.options = newVal.split(',')
      },
    }
  } 
};
</script>
<style lang="less">
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



