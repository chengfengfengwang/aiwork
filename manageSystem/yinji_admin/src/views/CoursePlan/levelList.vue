<template>
  <div>
    <Breadcrumb style="margin-bottom:20px;">
        <BreadcrumbItem to="/CoursePlan">课程列表</BreadcrumbItem>
        <BreadcrumbItem>{{courseName}}</BreadcrumbItem>
    </Breadcrumb>
    <Row>
      <Col span="6">
        <div class="list_box">
          <div class="label_info">
            level列表
            <!-- <Icon @click="addLv" class="add" type="ios-add-circle-outline"/>
            <Icon @click="removeLv" class="close" type="ios-close-circle-outline"/> -->
          </div>
          <div class="list_wrapper">
            <div
              @click="selectLevel(index)"
              :class="{active:curLevelIndex==index}"
              v-for="(item,index) in levelList"
              :key="index"
              class="list_item"
            >{{item.name}}</div>
          </div>
        </div>
        <div class="list_box">
          <div class="label_info">
            周列表
            <Icon @click="addWeek" class="add" type="ios-add-circle-outline"/>
            <Icon @click="removeWeek" class="close" type="ios-close-circle-outline"/>
          </div>
          <div class="list_wrapper">
            <div
              @click="selectWeek(index)"
              :class="{active:curWeekIndex==index}"
              v-for="(item,index) in weekList"
              :key="index"
              class="list_item"
            >{{item.name}}</div>
          </div>
        </div>
      </Col>
      <Col span="18">
        <!-- LV form -->
        <Form
          class="lvform"
          v-show="lvFormShow"
          :model="lvFormValue"
          label-position="right"
          :label-width="100"
        >
          <FormItem label="名称">
            <Input v-model="lvFormValue.name"></Input>
          </FormItem>
          <FormItem label="顺序">
            <Input v-model.number="lvFormValue.order"></Input>
          </FormItem>
          <FormItem label="学习人数">
            <Input v-model.number="lvFormValue.studied_count"></Input>
          </FormItem>
          <FormItem label="课时数量">
            <Input v-model.number="lvFormValue.lesson_count"></Input>
          </FormItem>
          <FormItem label="学习周期">
            <Input v-model="lvFormValue.study_duration"></Input>
          </FormItem>
          <FormItem label="封面">
            <MyUpload
              btnText="选择文件"
              :acceptType="0"
              :defaultFile="lvFormValue.cover"
              v-on:upload-success="coverUploadSuccess"
            />
          </FormItem>
          <FormItem label="背景色">
            <Input v-model="lvFormValue.color"></Input>
          </FormItem>
          <FormItem label="建议">
            <Input v-model="lvFormValue.suggest"></Input>
          </FormItem>
          <FormItem label="描述">
            <Input
              type="textarea"
              :autosize="true"
              v-model.trim="lvFormValue.desc"
              placeholder="输入描述"
            ></Input>
          </FormItem>
          <FormItem label="是否有周列表">
            <Select v-model="lvFormValue.has_week" placeholder="是否有周列表">
              <Option
                :value="0"
              >否</Option>
              <Option
                :value="1"
              >是</Option>
            </Select>
          </FormItem> 
          <FormItem label="合集类型">
            <Input v-model.number="lvFormValue.collection_type"></Input>
          </FormItem>
          <FormItem>
            <Button type="success" @click="lvFormSubmit" style="width:100px">提交</Button>
          </FormItem>
        </Form>
        <!-- 周form -->
        <Form
          class="weekform"
          v-show="weekFormShow"
          :model="lvFormValue"
          label-position="right"
          :label-width="100"
        >
          <FormItem label="名称">
            <Input v-model="weekFormValue.name"></Input>
          </FormItem>
          <FormItem label="主题名称">
            <Input v-model="weekFormValue.sub_name"></Input>
          </FormItem>
          <FormItem label="课程章节">
            <Select filterable v-model="weekFormValue.lesson_list" multiple placeholder="选择课程章节">
              <Option v-for="item in lessonList" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="顺序">
            <Input v-model.number="weekFormValue.order"></Input>
          </FormItem>
          <FormItem label="背景图">
            <MyUpload
              btnText="选择文件"
              :acceptType="0"
              :defaultFile="weekFormValue.background_url"
              v-on:upload-success="weekBgUploadSuccess"
            />
          </FormItem>
          <FormItem label="学习报告">
            <Select v-model="weekFormValue.has_report" placeholder="是否有学习报告">
              <Option :value="0">没有</Option>
              <Option :value="1">有</Option>
            </Select>
          </FormItem>
          <FormItem
            v-for="(item, index) in weekFormValue.knowledge_list"
            :key="index"
            :label="'知识点 ' + (index+1)"
          >
            <Row>
              <Col span="18">
                <Input type="text" v-model="item.value" placeholder="Enter something..."></Input>
              </Col>
              <Col span="4" offset="1">
                <Button @click="handleRemoveKnowledge(index)">Delete</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12">
                <Button type="dashed" long @click="handleAddKnowledge" icon="md-add">知识点</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="课外曲谱">
            <Select filterable v-model="weekFormValue.score_list" multiple placeholder="选择课外曲谱">
              <Option v-for="item in qupuList" :key="item._id" :value="item._id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="success" @click="weekFormSubmit" style="width:100px">提交</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>
<script>
import Upload from "../../components/UploadGroup/UploadItem";
import BgList from "../../components/BgList/index";
import { getQueryVariable } from "../../common/util.js";

export default {
  data() {
    return {
      lessonList: [],
      levelList: [],
      weekList: [],
      curLevelIndex: 0,
      curWeekIndex: -1,
      weekFormValue: {},
      lvFormValue: {},
      lvFormShow: true,
      weekFormShow: false,
      index: 0,
      courseName:'',
      qupuList:[]
    };
  },
  mounted() {
    this.courseId = getQueryVariable("course_id");
     this.courseName = decodeURIComponent(getQueryVariable("course_name"));
    this.getLevelList();
    this.getLessonList();
    this.getQupuList();
  },
  components: {
    MyUpload: Upload,
    BgList
  },
  methods: {
    getQupuList(){
       this.axios 
        .get(`${process.env.JINKANG}/v1/score/?page=0&szie=999&instrument_type=${getQueryVariable('instrument_type')}`)
        .then(res => {
          this.qupuList = res.data;
        });
    },
    handleRemoveKnowledge(index) {
      this.weekFormValue.knowledge_list.splice(index, 1);
    },
    handleAddKnowledge() {
      this.index++;
      this.weekFormValue.knowledge_list.push({
        value: "",
        index: this.index,
        status: 1
      });
    },
    getLessonList() {
      //http://hot.test.immusician.com:55555/v1/courses/18/?is_admin=1
      this.axios
        .get(
          `http://hot.test.immusician.com:55555/v1/courses/${
            this.courseId
          }/?is_admin=1`
        )
        .then(res => {
          this.lessonList = res.data.lessons;
        });
    },
    weekBgUploadSuccess(response, idx, position, file, fileList) {
      this.weekFormValue.background_url = response.data;
    },
    coverUploadSuccess(response, idx, position, file, fileList) {
      this.lvFormValue.cover = response.data;
    },
    removeLv() {
      const id = this.levelList[this.curLevelIndex].id;
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要删除此level吗</p>",
        onOk: () => {
          this.axios
            .get(`${process.env.JINKANG}/v1/courses_lv/delete?id=${id}`)
            .then(res => {
              if (!res.error) {
                this.curLevelIndex = 0;
                this.$Message.success("删除成功");
              }
              this.getLevelList();
              //this.lvFormValue = res.data;
            });
        },
        onCancel: () => {}
      });
    },
    removeWeek() {
      const id = this.weekList[this.curWeekIndex].id;
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确定要删除此周吗</p>",
        onOk: () => {
          this.axios
            .get(`${process.env.JINKANG}/v1/lv_week/delete?id=${id}`)
            .then(res => {
              if (!res.error) {
                this.curWeekIndex = 0;
                this.$Message.success("删除成功");
              }
              this.getWeekList(this.levelList[this.curLevelIndex].id);
              //this.lvFormValue = res.data;
            });
        },
        onCancel: () => {}
      });
    },
    lvFormSubmit() {
      this.lvFormValue.course_id = this.courseId;
      this.axios
        .post(
          `${process.env.JINKANG}/v1/courses_lv/create_and_update`,
          this.lvFormValue
        )
        .then(res => {
          if (!res.error) {
            this.$Message.success("提交成功");
          }
          this.getLevelList();
          //this.lvFormValue = res.data;
        });
    },
    weekFormSubmit() {
      let submitFormValue = JSON.parse(JSON.stringify(this.weekFormValue));
      submitFormValue.knowledge_list = submitFormValue.knowledge_list.map(
        e => e.value
      );
      console.log(submitFormValue);
      //return;
      this.axios
        .post(
          `${process.env.JINKANG}/v1/lv_week/create_and_update`,
          submitFormValue
        )
        .then(res => {
          if (!res.error) {
            this.$Message.success("提交成功");
          }
          this.getWeekList(this.levelList[this.curLevelIndex].id);
          //this.lvFormValue = res.data;
        });
    },
    getLvDetail(level_id) {
      if (!level_id) {
        if (process.env.NODE_ENV !== "production") {
          this.lvFormValue = {
            course_id: this.courseId,
            color: "red",
            cover:
              "http://image.yinji.immusician.com/material/c8753c3c5097f53af7677d9fac6282f2.png",
            desc: "认识五线谱上10个音，可双手弹奏。学会弹奏贝多芬《小星星》",
            lesson_count: 3,
            name: "LV3",
            order: 3,
            studied_count: 300,
            study_duration: "三个月",
            suggest: "建议年龄：4-5岁"
          };
        } else {
          this.lvFormValue = {
            course_id: this.courseId
          };
        }
        return;
      }
      this.axios
        .get(`${process.env.JINKANG}/v1/courses_lv/show/?id=${level_id}`)
        .then(res => {
          this.lvFormValue = res.data;
        });
    },
    getWeekDetail(id) {
      if (!id) {
        if (process.env.NODE_ENV !== "production") {
          // this.weekFormValue = {
          //   lv_id: this.levelList[this.curLevelIndex].id,
          //   background_url:
          //     "http://image.yinji.immusician.com/material/fc56c56e2f03990b27d8d57fbc53e4ad.png",
          //   has_report: 1,
          //   knowledge_list: [{value:'知识点111'},{value:'知识点222'}],
          //   lesson_list: [254, 261, 260, 259],
          //   name: "第三周",
          //   order: 2,
          //   sub_name: "制作中"
          // };
           this.weekFormValue = {
            lv_id: this.levelList[this.curLevelIndex].id,
            knowledge_list: [{value:''}]
          };
        } else {
          this.weekFormValue = {
            lv_id: this.levelList[this.curLevelIndex].id,
            knowledge_list: [{value:''}]
          };
        }
        return;
      }
      //lv_week/show/?page=0&size=10&lv_id=5ee1fab49d84f62cfd7236e1
      this.axios
        .get(`${process.env.JINKANG}/v1/lv_week/show/?id=${id}`)
        .then(res => {
          this.weekFormValue = res.data;
          this.weekFormValue.knowledge_list = this.weekFormValue.knowledge_list.map(
            e => {
              return {
                value: e
              };
            }
          );
        });
    },
    getWeekList(level_id) {
      this.axios
        .get(
          `${
            process.env.JINKANG
          }/v1/lv_week/show/?page=0&size=999&lv_id=${level_id}`
        )
        .then(res => {
          this.weekList = res.data;
        });
    },
    getLevelList() {
      this.axios
        .get(
          `${process.env.JINKANG}/v1/courses_lv/show/?course_id=${
            this.courseId
          }`
        )
        .then(res => {
          this.levelList = res.data;
          if(this.levelList.length>0){
            this.getLvDetail(this.levelList[0].id);
            this.getWeekList(this.levelList[0].id);
          }
          
        });
    },
    addLv() {
      console.log("add level");
      this.levelList.push({
        name: "未命名"
      });
    },
    addWeek() {
      this.weekList.push({
        name: "未命名"
      });
    },
    selectWeek(index) {
      this.lvFormShow = false;
      this.weekFormShow = true;
      this.curWeekIndex = index;
      this.getWeekDetail(this.weekList[index].id);
    },
    selectLevel(index) {
      this.lvFormShow = true;
      this.weekFormShow = false;
      this.curLevelIndex = index;
      this.curWeekIndex = -1;
      const levelId = this.levelList[index].id;
      this.getLvDetail(levelId);
      this.getWeekList(levelId);
    }
  }
};
</script>
<style lang="less">
.ivu-select-dropdown {
  max-height: 320px;
}
.list_box {
  //width: 200px;
  margin-bottom: 30px;
  .label_info {
    color: #fff;
    font-size: 16px;
    margin-bottom: 10px;
    border-radius: 2px;
    padding: 5px;
    background-color: #5bc0de;
    .add,
    .close {
      color: #fff;
      font-size: 25px;
    }
  }
  .list_wrapper {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075);
    .list_item {
      &.active {
        color: #fff;
        background-color: #337ab7;
      }
      &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      &:last-child {
        margin-bottom: 0;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      padding: 6px;
      margin-bottom: -1px;
      background-color: #fff;
      border: 1px solid #ddd;
    }
  }
}
</style>


