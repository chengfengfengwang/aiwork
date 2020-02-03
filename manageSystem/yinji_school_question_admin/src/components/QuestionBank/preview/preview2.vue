<template>
  <div>
    <div
      class="mywrapper"
      ref="mywrapper"
    >
      <img class="myimg" ondragstart="return false;" :src="previewUrl" alt>
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
    </div>
  </div>
</template>
<script>
import mixins_edit from "./previewMixin.js";

export default {
  props: {
    initQuestion:{},
    showEdit:{
      default: true
    }
  },
  mixins: [mixins_edit],
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
      tagList1: [],
      tagList2: [],
      tagList3: [],
      previewUrl: "",
      fileUrl: "" // https://tkimg.yinji100.com/file/FB/2f06dce082d16488865ba885abf91798.png!iyinji
    };
  },
  mounted() {
    //this.getTagList();
    this.wrapper = this.$refs.mywrapper;
    
    this.dragging = false;
    this.previewUrl = this.question.data.music_img;
    //插入坐标区域数据
    this.bindEvent();
  },
  methods: {
    getTagList() {
      this.axios
        .get(process.env.JINKANG + "/v2/question_bank/")
        .then(res => {
          this.tagList1 = res.data.abc;
          this.tagList2 = res.data.def;
          this.tagList3 = res.data.ghi;
        });
    },
    insertBox(arr) {
      this.initArr = this.question.data.target_area;
      if (this.initArr) {
        this.initArr.forEach((e, i) => {
          var box = document.createElement("div");
          if (e.isCorrect=='1') {
            box.className = "note_area crrect";
          } else {
            box.className = "note_area";
          }
          box.style.top = this.wrapperHeight - e.y * this.wrapperHeight - e.height * this.wrapperHeight + "px";
          box.style.left = e.x * this.wrapperWidth + "px";
          box.style.height = e.height * this.wrapperHeight + "px";
          box.style.width = e.width * this.wrapperWidth + "px";
          this.wrapper.appendChild(box);
          box = null;
        });
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
      this.wrapper.querySelector('.myimg').onload = function() {
        that.wrapperWidth = that.wrapper.offsetWidth;
        that.wrapperHeight = that.wrapper.offsetHeight;
        that.insertBox();
            //console.log('图片执行加载事件')
        }
    }
  }
};
</script>
<style>
.crrect{
  background-color: blue !important
}
</style>


