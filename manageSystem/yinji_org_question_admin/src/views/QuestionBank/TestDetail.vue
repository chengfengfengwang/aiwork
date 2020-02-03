<template>
  <div>
    <Spin size="large" fix v-show="loadingShow"></Spin>
    <div style="margin-bottom:10px">
      <Button @click="$router.go(-1)">返回</Button>
    </div>

    <Button @click="modalShow=true;selectedtArr=[]">从素材库导入</Button>
    <Button @click="remove">删除</Button>
    <Button @click="changeOrder">交换顺序</Button>
    <h1 style="text-align:center">{{mock.name}}</h1>
    <Modal v-model="modalShow" width="1260">
      <p slot="header" style>
        <span>从题库倒入</span>
      </p>
      <div class="modal_bank_wrapper">
        <div class="left">
          <div v-bind:class="[showType==1 ? 'active' : '', 'type_item']" @click="showType=1;curType=0;getAllTypeArr()">选择题</div>
          <div v-bind:class="[showType==2 ? 'active' : '', 'type_item']" @click="showType=2;curType=1;getAllTypeArr()">拖拽小节线</div>
          <div v-bind:class="[showType==3 ? 'active' : '', 'type_item']" @click="showType=3;curType=2;getAllTypeArr()">敲击单位拍</div>
          <div v-bind:class="[showType==4 ? 'active' : '', 'type_item']" @click="showType=4;curType=3;getAllTypeArr()">视唱</div>
        </div>
        <div class="right">
          <div v-if="showType==1">
            <div v-for="(type1,index) in type1Arr" :key="type1.question_id" class="item_wrapper">
              <div class="index_label" @click="choose(type1)">
                <Checkbox v-model="type1.check"></Checkbox>
                第{{index+1}}题：
              </div>
              <Preview1 :showEdit="false" :initQuestion="type1"></Preview1>
            </div>
          </div>
          <div v-if="showType==2">
            <div v-for="(type2,index) in type2Arr" class="item_wrapper">
              <div class="index_label" @click="choose(type2)">
                <Checkbox v-model="type2.check"></Checkbox>
                第{{index+1}}题：
              </div>
              <Preview2 :initQuestion="type2"></Preview2>
            </div>
          </div>
          <div v-if="showType==3">
            <div v-for="(type3,index) in type3Arr" class="item_wrapper">
              <div class="index_label" @click="choose(type3)">
                <Checkbox v-model="type3.check"></Checkbox>
                第{{index+1}}题：
              </div>
              <Preview3 :initQuestion="type3"></Preview3>
            </div>
          </div>
          <div v-if="showType==4">
            <div v-for="(type4,index) in type4Arr" class="item_wrapper">
              <div class="index_label" @click="choose(type4)">
                <Checkbox v-model="type4.check"></Checkbox>
                第{{index+1}}题：
              </div>
              <Preview4 :isPreview="true" :initQuestion="type4"></Preview4>
            </div>
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
      </div>
      <div slot="footer">
        <Button @click="add" type="primary">提交</Button>
        <Button @click="modalShow = false;">关闭</Button>
      </div>
    </Modal>
    <div class="preview_item" v-for="(question,index) in questions" :key="question.question_id">
      <div class="index_label">
        <Checkbox v-model="question.check"></Checkbox>
        第{{index+1}}题：
      </div>
      <div class="preview_wrapper">
        <div v-if="question.type==0">
          <Preview1 v-on:change-score="ChangeScore" :initQuestion="question"></Preview1>
        </div>
        <div v-if="question.type==1">
          <Preview2 v-on:change-score="ChangeScore" :initQuestion="question"></Preview2>
        </div>
        <div v-if="question.type==2">
          <Preview3 v-on:change-score="ChangeScore" :initQuestion="question"></Preview3>
        </div>
        <div v-if="question.type==3">
          <Preview4 v-on:change-score="ChangeScore" :initQuestion="question"></Preview4>
        </div>
      </div>
    </div>
    <!-- <div style="margin-top:10px">
      <Page
        @on-page-size-change="pageSizeChange1"
        @on-change="pageChange1"
        :total="total1"
        :page-size="pageSize1"
        show-sizer
        :page-size-opts="[5,10,15,20,30,40]"
        show-elevator
      />
    </div> -->
  </div>
</template>
<script>
import Preview1 from "./../../components/QuestionBank/preview/preview1";
import Preview2 from "./../../components/QuestionBank/preview/preview2";
import Preview3 from "./../../components/QuestionBank/preview/preview3";
import Preview4 from "./../../components/QuestionBank/preview/preview4";
//import Preview4 from "./../../components/QuestionBank/SightSingItem";
import { getIndex } from "./../../common/util.js";
export default {
  data() {
    return {
      test: "",
      editShow: false,
      single: false,
      modalShow: false,
      showType: 1,
      type1Arr: [
        {
          topic_request: "topic_request11",
          topic_main: "topic_main11",
          topic_voice: "topic_voice11",
          options: ["oo1", "oo2", "oo3"],
          answer: "0",
          answer_detail: "detail1111.mp3",
          online: "false",
          type: 0,
          tag: ""
        }
      ],
      type2Arr: [],
      type3Arr: [],
      type4Arr: [],
      resultArr: [],
      questions: [],
      mock: {},
      mock_id: "",
      ids: [],
      loadingShow: true,
      page: 0,
      pageSize: 5,
      total: 0,
      page1: 0,
      pageSize1: 5,
      total1: 0,
      curType:0,
      selectedtArr:[]
    };
  },
  components: {
    Preview1,
    Preview2,
    Preview3,
    Preview4
  },
  mounted() {
    this.mock_id = localStorage.getItem("curMockId");
    this.getCurQuestionBank();
    this.getAllTypeArr();
  },
  methods: {
    changeOrder(){
      var arr = [];
      this.questions.forEach((e,index) => {
        if (e.check) {
          console.log(index)
          arr.push(index);
        }
      });
      if(arr.length!==2){
        alert('选择两个进行交换')
        return
      }
      
      var temp = this.changeIds[arr[0]];
      this.changeIds[arr[0]] = this.changeIds[arr[1]];
      this.changeIds[arr[1]] = temp;
      console.log(this.changeIds);
      var changeIds = JSON.stringify(this.changeIds);
      this.axios
        .get(
          `${process.env.JINKANG}/${process.env.VERSION}/mock/create/?update_ids=1&mock_id=${this.mock_id}&ids=${changeIds}`
        )
        .then(res => {
          this.getCurQuestionBank()
        });

    },
    choose(data){
      if(!data.check){
        this.selectedtArr.push(data)
      }
      
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getAllTypeArr();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getAllTypeArr();
    },
    pageSizeChange1(pageSize) {
      this.pageSize1 = pageSize;
      this.page1 = 0;
      this.getCurQuestionBank();
    },
    pageChange1(page) {
      this.page1 = page - 1;
      this.getCurQuestionBank();
    },
    ChangeScore(obj) {
      var index = getIndex(this.ids, obj.id);
      this.ids.splice(index, 1, obj);
      this.submit();
    },
    remove() {
      var ids = [];
      this.questions.forEach(e => {
        if (!e.check) {
          ids.push({
            id: e.question_id,
            score: e.score
          });
        }
      });
      this.ids = ids;

      var that = this;
      this.$Modal.confirm({
        title: "警告",
        content: "确定要删除吗？",
        onOk() {
          that.submit();
        }
      });
    },
    getCurQuestionBank() {
      this.axios
        .get(
          `${process.env.JINKANG}/${process.env.VERSION}/mock/get_mock/?mock_id=${
            this.mock_id
          }&page=${this.page1}&size=${this.pageSize1}`
        )
        .then(res => {
          this.loadingShow = false;
          //模拟题库所有信息
          this.mock = res.data;
          this.changeIds = res.data.ids;
          //取得试题集
          this.questions = this.formateAllIncomingData(this.mock.mock_material);
          //取得所有ids
          this.ids = this.getIds(res.data.mock_material);
          
          this.total1 = res.total;
        });
    },
    getIds(arr) {
      return arr.map(e => {
        return { id: e.question_id, score: e.score };
      });
    },
    add() {
      //取得从题库素材选中的
      this.selectedtArr.forEach(e => {
        if (e.check) {
          this.questions.push({
            question_id: e.question_id,
            score: e.score ? e.score : 0
          });
        }
      });
      // this.type2Arr.forEach(e => {
      //   if (e.check) {
      //     this.questions.push({
      //       question_id: e.question_id,
      //       score: e.score ? e.score : 0
      //     });
      //   }
      // });
      // this.type3Arr.forEach(e => {
      //   if (e.check) {
      //     this.questions.push({
      //       question_id: e.question_id,
      //       score: e.score ? e.score : 0
      //     });
      //   }
      // });
      // this.type4Arr.forEach(e => {
      //   if (e.check) {
      //     this.questions.push({
      //       question_id: e.question_id,
      //       score: e.score ? e.score : 0
      //     });
      //   }
      // });
      this.questions = this.$util.uniqBy(this.questions,'question_id');
      this.ids = [];
      this.questions.forEach(e => {
        this.ids.push({id:e.question_id,score:e.score});
      });
      //return

      this.submit();
    },
    submit(params) {
      var params = {
        mock_id: this.mock.mock_id,
        online: this.mock.online,
        ids: JSON.stringify(this.ids),
        name: this.mock.name
      };
      this.axios
        .post(`${process.env.JINKANG}/${process.env.VERSION}/mock/create/`, params)
        .then(res => {
          this.modalShow = false;
          this.$Message.success("更新成功");
          this.getCurQuestionBank();
        });
    },
    changeShowType() {
      console.log("xxxx");
    },
    getAllTypeArr() {
      this.axios
        .get(`${process.env.JINKANG}/${process.env.VERSION}/question/get_many_material/?source=2&type=${this.curType}&page=${this.page}&size=${this.pageSize}`)
        .then(res => {
          var type1 = res.data.filter(e => e.type == 0 && e.online);
          var type2 = res.data.filter(e => e.type == 1 && e.online);
          var type3 = res.data.filter(e => e.type == 2 && e.online);
          var type4 = res.data.filter(e => e.type == 3 && e.online);
          this.type1Arr = this.formateIncomingType1(type1);
          this.type2Arr = this.formateIncomingType2(type2);
          this.type3Arr = this.formateIncomingType3(type3);
          this.type4Arr = this.formateIncomingType4(type4);
          this.total = res.total
        });
    },
    formateAllIncomingData(arr) {
      var arr = JSON.parse(JSON.stringify(arr));
      arr.forEach(e => {
        if (e.type == 0) {
          for (var key in e.data) {
            e[key] = e.data[key];
            e.score = e.score;
          }
          e.online = e.online + "";
        } else if (e.type == 1) {
        } else if (e.type == 2) {
        } else {
          e.check = false;
        }
      });
      return arr;
    },
    formateIncomingType1(arr) {
      arr.forEach((e, index) => {
        for (var key in e.data) {
          arr[index][key] = e.data[key];
        }
        arr[index].online = arr[index].online + "";
        arr[index].check = false;
      });
      return arr;
    },
    formateIncomingType2(arr) {
      arr.forEach((e, index) => {
        arr[index].check = false;
      });
      return arr;
    },
    formateIncomingType3(arr) {
      arr.forEach((e, index) => {
        arr[index].check = false;
      });
      return arr;
    },
    formateIncomingType4(arr) {
      arr.forEach((e, index) => {
        arr[index].check = false;
      });
      return arr;
    }
  }
};
</script>
<style lang="less">
.modal_bank_wrapper {
  display: flex;
  .left {
    min-width: 112px;
    margin-right: 20px;
  }
}
.type_item {
  text-align: center;
  line-height: 30px;
  padding: 5px 20px;
  &.active {
    background-color: #f2f2f2;
    color: blueviolet;
  }
}
.item_wrapper {
  display: flex;
}
.index_label {
  font-size: 18px;
  display: inline-block;
}
.preview_item {
  margin: 20px 0;
}
.preview_wrapper {
  margin-left: 30px;
}
</style>


