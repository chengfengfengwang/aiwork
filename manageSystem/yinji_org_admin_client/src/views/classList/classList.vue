<template>
  <div>
    <div class="table_top_tool">
      <Button
        v-show="from==='self'"
        type="primary"
        @click="createNewBank"
        style="margin-right:30px"
      >新建班级</Button>
      <span>按课程筛选：</span>
      <Select
        style="width:220px"
        @on-change="getTableData"
        v-model="searchCourses"
        placeholder="课程"
      >
        <Option v-for="item in courseList" :key="item.id" :value="item.id">{{item.name}}</Option>
      </Select>
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
        <span>班级</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="班级名称">
            <Input v-model="formValidate.class_name" placeholder="请输入班级名称"></Input>
          </FormItem>
          <FormItem label="班级人数">
            <Input v-model.number="formValidate.class_num" placeholder="输入班级人数"></Input>
          </FormItem>
          <FormItem label="适用课程">
            <Select v-model="formValidate.course_apply" placeholder="选择适用课程">
              <Option
                v-for="item in formCourseApplyList"
                :key="item.id"
                :value="item.id"
              >{{item.name}}</Option>
            </Select>
          </FormItem>  
          <FormItem label="适用题库">
            <Select multiple v-model="formValidate.question_apply" placeholder="选择适用题库">
              <Option
                v-for="item in qBankList"
                :key="item.id"
                :value="item._id"
              >{{item.name}}</Option>
            </Select>
          </FormItem> 
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
// 正常在班级路由下，班级列表页面。班级下的学生页面引用了，机构下的列表也引用了
import courseApply from "./../mixins/courseApply.js";
import orgMixin from "./../mixins/getOrgList.js";
export default {
  props: {
    from: {
      type: String,
      default: "self"
    },
    fromStatus: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [],
      dataList: [],
      page: 0,
      pageSize: 10,
      total: 0,
      modalStatus: "",
      bankList: [],
      searchBankList: [],
      editBankList: [],
      searchBank: 0,
      searchCourses: "-1",
      searchOrg: "-1",
      qBankList: []
    };
  },
  mixins: [courseApply, orgMixin],
  mounted() {
    this.showTableColumns();
    this.getTableData();
    this.getQBankList()
  },
  methods: {
    getQBankList() {
      this.axios
        .post(`${process.env.AGENTSV9}/class_info/get_test_apply`, {
          institutions_id: this.$store.getters.orgId
        })
        .then(res => {
          this.qBankList = res.data;
        });
    },
    showTableColumns() {
      if (this.from === "studentList") {
        this.columns = [
          {
            title: "班级名称",
            key: "class_name"
          },
          {
            title: "班级id",
            key: "id"
          },
          {
            title: "剩余人数",
            key: "class_num",
            render: (h, params) => {
              return h("div", params.row.class_num - params.row.student_num);
            }
          },
          {
            title: "课程名称",
            key: "course_name_list",
            render: (h, params) => {
              return h("div", params.row.course_name_list.join("/"));
            }
          },
          {
            title: " ",
            key: "action",
            minWidth: 50,
            width: 130,
            align: "center",
            render: (h, params) => {
              var btnName;
              if (params.row.haveIn) {
                btnName = "已加入";
              } else if (params.row.courseNoIn) {
                btnName = "课程不相同";
              } else if (params.row.canIn) {
                btnName = "加入";
              }
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "info",
                      disabled:
                        params.row.haveIn === true ||
                        params.row.courseNoIn === true ||
                        params.row.class_num - params.row.student_num <= 0
                    },
                    style: {
                      marginRight: "5px"
                    },
                    on: {
                      click: () => {
                        this.putInClass(params.row.id, params.row.course_apply);
                      }
                    }
                  },
                  btnName
                )
              ]);
            }
          }
        ];
      } else if (this.from === "self") {
        this.columns = [
          {
            title: "班级名称",
            key: "class_name"
          },
          {
            title: "班级预计人数",
            key: "class_num"
          },
          {
            title: "班级实招人数",
            key: "student_num"
          },
          {
            title: "课程名称",
            key: "course_name_list",
            render: (h, params) => {
              return h("div", params.row.course_name_list.join("/"));
            }
          },
          {
            title: " ",
            key: "action",
            minWidth: 50,
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
                            that.delete(
                              params.row.id,
                              params.row.institutions_id
                            );
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
        ];
      }
    },
    changeClassCheck() {
      var oldClassId = sessionStorage.getItem("oldClassId");
      var regCourseName = sessionStorage.getItem("regCourseName");

      this.dataList.forEach((e, i) => {
        if (oldClassId === e.id) {
          e.haveIn = true;
        } else if (e.course_name_list.indexOf(regCourseName) === -1) {
          e.courseNoIn = true;
        } else {
          e.canIn = true;
        }
      });
    },
    putInClass(classId, courseIds) {
      var students = JSON.parse(sessionStorage.getItem("mulStudents"));
      if (students) {
        var uids = students.map(res => res.uid);
      }
      if (this.fromStatus === "changeClass") {
        var arr = [];
        arr.push(sessionStorage.getItem("uid"));
        var param = {
          uids: arr,
          class_id: classId,
          course_id: courseIds[0],
          old_course_id: sessionStorage.getItem("oldCourseId"),
          old_class_id: sessionStorage.getItem("oldClassId")
        };
      } else {
        var param = {
          uids: uids,
          class_id: classId,
          course_id: courseIds[0]
        };
      }

      this.axios
        .post(`${process.env.AGENTSV9}/class_info/class_manage`, param)
        .then(res => {
          this.$Message.success("操作成功");
          this.$parent.$parent.classModal = false;
          this.$parent.$parent.getTableData();
          this.$parent.$parent.selected = [];
        });
    },
    findBankName(id) {
      var name;
      this.bankList.forEach((e, i) => {
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
      var courseParam =
        this.searchCourses !== "-1" ? `&course_id=${this.searchCourses}` : "";
      var orgParam = `&institutions_id=${
        this.$store.state.userInfo.institutions_id
      }`;
      this.axios
        .get(
          `${process.env.AGENTSV9}/institutional/class_infos?page=${
            this.page
          }&size=${this.pageSize}${orgParam}${courseParam}`
        )
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.data;
          this.total = res.total;
          if (
            this.from === "studentList" &&
            this.fromStatus === "changeClass"
          ) {
            this.changeClassCheck();
          }
          if (
            this.from === "studentList" &&
            this.fromStatus === "singleSetClass"
          ) {
            this.changeClassCheck();
          }
          if (
            this.from === "studentList" &&
            this.fromStatus === "mulSetClass"
          ) {
            this.changeClassCheck();
          }
        });
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      return newRow;
    },
    delete(classId, institutionsId) {
      this.axios
        .post(`${process.env.AGENTSV9}/class_info/up_class`, {
          id: classId,
          is_delete: true,
          institutions_id: institutionsId
        })
        .then(res => {
          this.getTableData();
        });
    },
    createNewBank() {
      this.modalCoverShow = false;
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
      var param = this.formatForm();
      if (!(param.course_apply instanceof Array)) {
        var arr = [];
        arr.push(param.course_apply);
        param.course_apply = arr;
      }

      if (this.modalStatus == "create") {
        param.institutions_id = this.$store.state.userInfo.institutions_id;
        //return
        this.axios
          .post(`${process.env.AGENTSV9}/class_info/add_class`, param)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getTableData();
          });
      } else {
        [
          "course_instrument_type",
          "course_name_list",
          "course_schedule",
          "student",
          "student_num",
          "_rowKey",
          "_index"
        ].forEach(e => {
          delete param[e];
        });
        param.is_delete = false;
        console.log(param);
        //return
        this.axios
          .post(`${process.env.AGENTSV9}/class_info/up_class`, param)
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
  }
};
</script>
<style lang="less">
</style>





