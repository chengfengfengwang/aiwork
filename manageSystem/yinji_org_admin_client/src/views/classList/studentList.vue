<template>
  <div>
    <div class="table_top_tool">
      <span>筛选：</span>
      <Select v-model="searchParam.has_class" placeholder="选择分班信息" style="width:200px">
        <Option :value="0">未分班</Option>
        <Option :value="1">已分班</Option>
        <Option :value="2">全部</Option>
      </Select>
      <span>是否是体验：</span>
      <Select v-model="searchParam.is_trial" placeholder="选择分班信息" style="width:200px">
        <Option :value="0">不是</Option>
        <Option :value="1">是</Option>
        <Option :value="-1">全部</Option>
      </Select>
      <span>学生手机号：</span>
      <Input style="width:200px" v-model="searchParam.phone" placeholder="请输入学生手机号"></Input>
      <span>课程名称：</span>
      <Select style="width:200px" v-model="searchParam.course_id" placeholder="选择课程">
        <Option v-for="item in courseList" :key="item.id" :value="item.id">{{item.name}}</Option>
      </Select>
      <Button type="success" @click="reset" style="margin-right:0px">重置搜索</Button>
      <Button type="primary" @click="getTableData" style="margin-right:0px">搜索</Button>
      <Button type="info" @click="handleMultiPut" style="margin-right:0px">批量分班</Button>
    </div>
    <Table
      @on-select-all-cancel="handleCancelSelectAll"
      @on-select-all="handleSelectAll"
      @on-select="handleSelect"
      @on-select-cancel="handleCancel"
      :loading="tableLoading"
      border
      :columns="columns"
      :data="tableData"
    ></Table>
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
    <Modal v-model="classModal" width="760">
      <p slot="header" style>
        <span>班级列表</span>
      </p>
      <ClassList v-if="classModal" :fromStatus="fromStatus" from="studentList"/>
      <div slot="footer">
        <Button @click="classModal=false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>日志</span>
      </p>
      <div class="log_wrapper">
        <div>
          <span>姓名：</span>
          <span>{{logInfo['nick_name']}}</span>
        </div>
        <div>
          <span>学习课程：</span>
          <span>{{logInfo['course_name']}}</span>
        </div>
        <div>
          <span>当前班级：</span>
          <span>{{logInfo['class_name']}}</span>
        </div>
        <div>
          <span>调班详情：</span>
          <span
            v-if="logInfo['change_class_log'] && logInfo['change_class_log'].length>0"
          >{{logInfo['change_class_log']}}</span>
          <span v-else>无</span>
        </div>
      </div>
      <div slot="footer">
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
const uniqBy = require("lodash.uniqby");
const remove = require("lodash.remove");
const differenceBy = require("lodash.differenceby");
import ClassList from "./classList";
import courseApply from "./../mixins/courseApply.js";

export default {
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "姓名",
          key: "nick_name"
        }, 
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "所在班级",
          key: "class_name"
        },
        {
          title: "注册课程",
          key: "course_name"
        },
        {
          title: "分班状态",
          key: "has_class"
        }, 
        {
          title: "身份",
          key: "is_trial"
        },
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
                      this.setStudenInfoToSession(params.row);
                      if (params.row.has_class === "已分班") {
                        //调班
                        this.fromStatus = "changeClass";
                      } else if (params.row.has_class === "未分班") {
                        //分班
                        this.fromStatus = "singleSetClass";
                        var arr = [];
                        arr.push({ uid: params.row.uid });
                        sessionStorage.setItem(
                          "mulStudents",
                          JSON.stringify(arr)
                        );
                      }

                      this.classModal = true;
                    }
                  }
                },
                params.row.has_class === "未分班" ? "分班" : "调班"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      var that = this;
                      this.modalShow = true;
                      this.getLog(params.row.uid, params.row.class_id);
                    }
                  }
                },
                "日志"
              )
            ]);
          }
        }
      ],
      tableData: [],
      page: 0,
      pageSize: 100,
      total: 0,
      modalStatus: "",
      bankList: [],
      searchBankList: [],
      editBankList: [],
      searchBank: 0,
      courseList: [],
      searchParam: {
        is_trial:-1,
        has_class: 2,
        uid: "",
        phone: "",
        //class_id: localStorage.getItem('classId'),
        course_id: "",
        institutions_id: this.$store.state.userInfo.institutions_id
      },
      logInfo: {},
      mulKey: "uid",
      selected: [],
      classModal: false,
      fromStatus: ""
    };
  },
  mixins: [courseApply],
  components: {
    ClassList
  },
  mounted() {
    this.getTableData();
    this.getCourses();
  },
  methods: {
    setStudenInfoToSession(row) {
      sessionStorage.setItem("uid", row.uid);
      sessionStorage.setItem("oldClassId", row.class_id);
      sessionStorage.setItem("oldCourseId", row.course_id);
      sessionStorage.setItem("regCourseName", row.course_name);
    },

    reset() {
      this.page = 0;
      this.size = 100;
      this.searchParam = {
        has_class: 2,
        uid: "",
        course_id: "",
        phone: "",
        institutions_id: this.$store.state.userInfo.institutions_id
      };
      this.getTableData();
    },
    handleMultiPut() {
      if (this.selected.length === 0) {
        this.$Message.error("请先选择学生");
        return;
      }
      //包含有已分班的
      if (this.selected.some(e => e.has_class === "已分班")) {
        this.$Message.error("批量分班仅支持操作未分班学生");
        return;
      }
      if (uniqBy(this.selected, "course_id").length > 1) {
        this.$Message.error("批量分班仅支持操作相同课程的学生");
        return;
      }
      this.fromStatus = "mulSetClass";
      this.classModal = true;
      sessionStorage.setItem("mulStudents", JSON.stringify(this.selected));
      this.setStudenInfoToSession(this.selected[0]);
    },
    //把源数据加上_checked字段，遍历已选项数据，更新选中状态
    updateChecked() {
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i]._checked = false;
        for (var j = 0; j < this.selected.length; j++) {
          if (
            this.selected[j][this.mulKey] === this.tableData[i][this.mulKey]
          ) {
            this.tableData[i]._checked = true;
          }
        }
      }
    },
    handleCancel(selection, row) {
      //监听取消选中某一项，从已选项中删除取消项，row代表取消选择的项数据
      remove(this.selected, n => {
        return n[this.mulKey] === row[this.mulKey];
      });
    },
    handleSelect(selection, row) {
      //监听选中某一项，添加到已选项
      this.selected.push(row);
    },
    handleSelectAll(selection) {
      //监听全选，有可能用户先单独选择了某几项，被我们push进去，然后再点了全选，因此数组合并需要去重一下
      this.selected = uniqBy(this.selected.concat(selection), this.mulKey);
    },
    handleCancelSelectAll(selection) {
      //监听取消全选，从已选项中移除当页数据
      this.selected = differenceBy(this.selected, this.tableData, this.mulKey);
    },
    getLog(uid, calssId) {
      this.axios
        .post(`${process.env.AGENTSV9}/get_user`, {
          uid,
          class_id: calssId
        })
        .then(res => {
          this.logInfo = res.data;
        });
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
      var sendParam = JSON.parse(JSON.stringify(this.searchParam));
      sendParam.page = this.page;
      sendParam.size = this.pageSize;
      for (var name in sendParam) {
        if (sendParam[name] === "" || sendParam[name] == "-1") {
          delete sendParam[name];
        }
      }
      this.axios
        .post(`${process.env.AGENTSV9}/query_class`, sendParam)
        .then(res => {
          this.tableLoading = false;
          this.tableData = res.data.data_list;
          this.total = res.total;
          this.updateChecked();
        });
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      return newRow;
    },
    delete(id) {
      this.axios
        .post(`${process.env.AGENTSV9}/class_info/up_class`, {
          _id: id,
          is_delete: true,
          institutions_id: id
        })
        .then(res => {
          this.getTableData();
        });
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      return newForm;
    }
  }
};
</script>
<style lang="less">
.log_wrapper {
  margin: 0 auto;
  width: 60%;
  font-size: 14px;
}
</style>





