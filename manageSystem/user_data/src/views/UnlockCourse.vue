<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建</Button>
      <!-- <span>筛选：</span>
      <Select
        @on-change="handleSearchBank"
        v-model="searchBank"
        placeholder="选择所属题库"
        style="width:200px"
      >
        <Option v-for="item in searchBankList" :key="item.id" :value="item.id">{{item.name}}</Option>
      </Select>-->
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
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
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>新建</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="名称">
            <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
          </FormItem>
          <!-- <FormItem label="渠道">
            <Select v-model="formValidate.channel" placeholder="选择渠道">
              <Option v-for="(value,name) in channelList" :key="value" :value="name">{{value}}</Option>
            </Select>
          </FormItem>-->
          <FormItem label="解锁课程节数">
            <Input v-model.number="formValidate.unlock_lessons" placeholder="请输入解锁课程节数"></Input>
          </FormItem>
          <!-- <FormItem label="解锁天数">
            <Input v-model.number="formValidate.unlock_period" placeholder="请输入解锁课程天数"></Input>
          </FormItem>-->
          <FormItem label="开放天数">
            <Input v-model.number="formValidate.unlock_period" placeholder="请输入天数"></Input>
          </FormItem>
          <!-- <FormItem label="开始时间">
            <DatePicker v-model.number="starTime"  type="date" placeholder="Select date" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="结束时间">
            <DatePicker v-model.number="endTime"  type="date" placeholder="Select date" style="width: 200px"></DatePicker>
          </FormItem>
          <FormItem label="课程类型">
            <Button type="info" @click="courseModalShow=true">选择课程</Button>
            {{courseType}}
          </FormItem>-->
          <FormItem label="解锁文案">
            <Input
              type="textarea"
              :autosize="true"
              v-model.trim="formValidate.unlock_text"
              placeholder="解锁文案"
            ></Input>
          </FormItem>
          <FormItem label="生效时间">
            <DatePicker
              v-model.number="starTime"
              type="date"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
    <Modal draggable v-model="courseModalShow" width="760">
      <p slot="header" style>
        <span>新建</span>
      </p>
      <AllCourses v-if="courseModalShow" :fromArr="formValidate.course_type" ref="allCourse"/>
      <div slot="footer">
        <Button @click="courseSubmit" type="primary">确定</Button>
        <Button @click="courseModalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { formatTime, formatTimeOnlyDate } from "./../common/util.js";
import AllCourses from "./../components/Course/Allcourse";
export default {
  data() {
    return {
      tableLoading: true,

      formValidate: {},
      columns: [
        // {
        //   title: "渠道",
        //   key: "channel",
        //   render: (h, params) => {
        //     return h("div", this.channelList[params.row.channel]);
        //   }
        // },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "创建日期",
          key: "created_at",
          render: (h, params) => {
            return h("div", formatTime(params.row.created_at));
          }
        },
        {
          title: "开放天数",
          key: "unlock_period"
        },
        {
          title: "开放课时",
          key: "unlock_lessons"
        },
        {
          title: "解锁文案",
          key: "unlock_text"
        },
        {
          title: "开始时间",
          key: "start_time",
          render: (h, params) => {
            return h("div", formatTime(params.row.start_time));
          }
        },
        // {
        //   title: "结束时间",
        //   key: "start_time",
        //   render: (h, params) => {
        //     return h("div", formatTimeOnlyDate(params.row.end_time));
        //   }
        // },
        // {
        //   title: "用户类型",
        //   key: "user_type"
        // },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          //width: 130,
          //maxWidth: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modalShow = true;
                      this.formValidate = this.formateRow(params.row);
                      //this.courseType = params.row.course_type
                      this.curRow = params.row;
                      this.modalStatus = "edit";
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      var that = this;
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定要删除吗？",
                        onOk() {
                          that.delete(params.row._id);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      dataList: [],
      page: 0,
      pageSize: 10,
      total: 0,
      modalStatus: "",
      bankList: [],
      searchBankList: [],
      channelList: [],
      courseList: [],
      searchBank: 0,
      modalShow: false,
      courseModalShow: false,
      courseType: [],
      starTime: "",
      endTime: ""
    };
  },
  mounted() {
    this.getChannelList();
    this.getTableData();
    //this.getCourseList()
  },
  components: {
    AllCourses
  },
  methods: {
    courseSubmit() {
      this.courseType = this.$refs.allCourse.selected;
      console.log(this.courseType);
      this.courseModalShow = false;
    },
    getCourseList() {
      //instrument_type ukulele
      this.axios
        .get(`${process.env.XIAOPO}/v1/courses?online=true&page=0&size=15`)
        .then(res => {
          this.courseList = res.data;
        });
    },
    getChannelList() {
      this.axios
        .get(`${process.env.XIAOPO}/v1/unlock/get_channels`)
        .then(res => {
          this.channelList = res.data;
        });
    },
    findChannel(id) {
      var name;
      this.channelList.forEach((e, i) => {
        if (id === e.id) {
          if (id === 0) {
            name = "无";
          } else {
            name = e.name;
          }
        }
      });
      return name;
    },
    handleSearchBank() {
      this.getTableData();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getTableData();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getTableData();
    },
    getTableData() {
      this.tableLoading = true;
      //return;
      this.axios
        .get(
          `${process.env.XIAOPO}/v1/unlock/?page=${this.page}&size=${
            this.pageSize
          }`
        )
        .then(res => {
          this.tableLoading = false;
          if (res.data && res.data.length > 0) {
            this.dataList = res.data;
          } else {
            this.dataList = [];
          }

          this.total = res.total;
        });
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      newRow.channel = newRow.channel + "";
      this.starTime = new Date(newRow.start_time * 1000);
      //this.endTime = new Date(newRow.end_time*1000);
      return newRow;
    },
    getProductDetail(id) {
      this.axios.get(process.env.XIAOPO + "/v1/goods?id=" + id).then(res => {
        this.tableLoading = false;
        this.getTableData();
      });
    },
    delete(id) {
      this.axios.delete(process.env.XIAOPO + "/v1/unlock/" + id).then(res => {
        this.getTableData();
      });
    },
    createNewBank() {
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
      //上线记得删除
      //   if(localStorage.getItem('wang')){
      //       this.formValidate = JSON.parse(localStorage.getItem('form')) || {}
      //   }
    },
    handleSubmit(name) {
      //this.formValidate.course_type=JSON.stringify(this.courseType);
      if (this.modalStatus == "create") {
        const formObj = Object.assign({}, this.formValidate);
        //formObj.start_time = formObj.start_time.replace(/-/,'/')
        //  console.log(this.starTime);
        //         console.log(formObj);
        //         return;
        this.axios
          .post(process.env.XIAOPO + "/v1/unlock/", formObj)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getTableData();
          });
      } else {
        var param = this.formValidate;
        //console.log(param)
        //return
        this.axios
          .put(process.env.XIAOPO + "/v1/unlock/" + this.curRow._id, param)
          .then(res => {
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.file = "";
            this.getTableData();
          });
      }
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      return newForm;
    }
  },
  watch: {
    starTime(v) {
      this.formValidate.start_time = formatTimeOnlyDate(v.valueOf() / 1000);
    },
    endTime(v) {
      this.formValidate.end_time = formatTimeOnlyDate(v.valueOf() / 1000);
    }
  }
};
//5cac75e8b9db4b4db384d56d
</script>
<style lang="less">
.cover_row {
  img {
    max-height: 100px;
  }
}
</style>




