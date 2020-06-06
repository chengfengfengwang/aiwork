<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建机构</Button>
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
        <span>机构</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="机构名称">
            <Input
              style="width:300px"
              v-model="formValidate.institutions_name"
              placeholder="请输入机构名称"
            ></Input>
          </FormItem>
          <FormItem label="机构账号" v-show="modalStatus==='create'">
            <div v-for="(item,index) in accountArr" :key="index">
              <Input style="width:300px" v-model="item.value" placeholder="请输入手机号"></Input>
              <Icon
                @click="addAccount(index)"
                style="font-size:25px"
                type="ios-add-circle-outline"
              />
              <Icon
                @click="removeAccount(index)"
                style="font-size:25px"
                type="ios-close-circle-outline"
              />
            </div>
          </FormItem>
          <FormItem label="开放品类">
            <div v-for="(item,index) in courseTypeArr" :key="index">
              <Select v-model="item.type" placeholder style="width:200px">
                <Option
                  v-for="(course,idx) in courseTypes"
                  :key="idx"
                  :value="course.id"
                >{{course.name}}</Option>
              </Select>
              <Input style="width:100px" v-model.number="item.num" placeholder="请输入数量"></Input>

              <Icon
                @click="addCourseType(index)"
                style="font-size:25px"
                type="ios-add-circle-outline"
              />
              <Icon
                @click="removeCourseType(index)"
                style="font-size:25px"
                type="ios-close-circle-outline"
              />
            </div>
          </FormItem>
          <!-- {{trialList}} -->
          <FormItem label="体验课程">
           <Select multiple v-model="formValidate.trial_open" placeholder="选择体验课程" style="width:200px">
                <Option
                  v-for="(course,idx) in trialList"
                  :key="idx"
                  :value="course._id"
                >{{course.name}}</Option>
              </Select>
          </FormItem>
          <FormItem label="开始日期">
            <DatePicker
              v-model="formValidate.start_time"
              type="date"
              placeholder="开始日期"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="结束日期">
            <DatePicker
              v-model="formValidate.end_time"
              type="date"
              placeholder="结束日期"
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
    <Modal v-model="accountModalShow" width="760">
      <p slot="header" style>
        <span>新增教师账号</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="手机号">
            <Input v-model="accountForm.phone" placeholder></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="addTeacher('formValidate')" type="primary">确定</Button>
        <Button @click="accountModalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
const uniq = require("lodash.uniq");
import { getDate } from "./../../common/util.js";
import orgMixin from "./../mixins/getOrgList.js";
import courseTypeMixin from "./../mixins/getCourseTypes.js";
export default {
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [
        // {
        //   title: "机构id",
        //   key: "id"
        // },
        {
          title: "账号名称",
          key: "course_name_list",
          render: (h, params) => {
            return h("div", params.row.user.map(e => e.phone).join("/"));
          }
        },
        {
          title: "机构名称",
          key: "institutions_name"
        },
        // {
        //   title: "course_open",
        //   key: "course_open"
        // },
        // {
        //   title: "student_count",
        //   key: "student_count"
        // },
        // {
        //   title: "课程名称",
        //   key: "course_name_list",
        //   render: (h, params) => {
        //     return h("div", params.row.course_name_list.join("/"));
        //   }
        // },
        {
          title: "生效时间",
          key: "experience_int",
          render: (h, params) => {
            const startTime = params.row.start_time
              ? getDate(params.row.start_time)
              : "";
            return h("div", startTime);
          }
        },
        {
          title: "结束时间",
          key: "experience_int",
          render: (h, params) => {
            const endTime = params.row.start_time
              ? getDate(params.row.end_time)
              : "";
            return h("div", endTime);
          }
        },
        // {
        //   title: "学生数量",
        //   key: "student_count",
        //   render: (h, params) => {
        //     let contArr = [],
        //       str = "";
        //     for (let key in params.row.student_count) {
        //       contArr.push(params.row.student_count[key]);
        //     }
        //     for (let i = 0; i < contArr.length; i++) {
        //       if (i < contArr.length - 1) {
        //         str += `${params.row.course_name_list[i]}:${contArr[i]} / `;
        //       } else {
        //         str += `${params.row.course_name_list[i]}:${contArr[i]}`;
        //       }
        //     }
        //     return h("div", str);
        //   }
        // },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          width: 300,
          //maxWidth: 300,
          align: "center",
          render: (h, params) => {
            const noCheck = params.row.audit;
            const checkText = noCheck ? "未审核" : "已审核";
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

              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "info",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "5px",
              //       display: params.row.open_audit===0 ? 'none' : 'inline-block'
              //     },
              //     on: {
              //       click: () => {
              //         if(checkText==='未审核'){
              //           this.checkOrg(params.row.institutions_id,this.$store.getters.proxyId)
              //         }
              //       }
              //     }
              //   },
              //   checkText
              // ),
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "error",
              //       size: "small"
              //     },
              //     on: {
              //       click: () => {
              //         var that = this;
              //         this.$Modal.confirm({
              //           title: "警告",
              //           content: "确定要删除吗？",
              //           onOk() {
              //             that.delete(params.row.institutions_id);
              //           }
              //         });
              //       }
              //     }
              //   },
              //   "删除"
              // )
            ]);
          }
        }
      ],
      dataList: [],
      page: 0,
      pageSize: 10,
      total: 0,
      modalStatus: "",
      searchOrg: "-1",
      accountArr: [
        {
          id: 0,
          value: ""
        }
      ],
      courseTypeArr: [
        {
          id: new Date().valueOf()
        }
      ],
      trialArr: [
        {
          id: new Date().valueOf()
        }
      ],
      accountModalShow: false,
      accountForm: {
        phone: ""
      },
      trialList: []
    };
  },
  mixins: [courseTypeMixin],
  mounted() {
    this.getTableData();
    this.getTrialList();
  },
  methods: {
    getTrialList() {
      this.axios
        .get(`${process.env.AGENTSV9}/institutional/instrument_type?is_trial=1`)
        .then(res => {
          this.trialList = res.data;
        });
    },
    addTeacher() {
      this.accountForm.institutions_id = this.curOrgId;
      this.axios
        .post(`${process.env.AGENTSV9}/create_user`, this.accountForm)
        .then(res => {
          this.accountModalShow = false;
          this.getTableData();
        });
    },
    addAccount(index) {
      this.accountArr.splice(index + 1, 0, {
        id: new Date().valueOf(),
        value: ""
      });
    },
    removeAccount(index) {
      this.accountArr.splice(index, 1);
    },
    addCourseType(index) {
      this.courseTypeArr.splice(index + 1, 0, {
        id: new Date().valueOf()
      });
    },
    removeCourseType(index) {
      this.courseTypeArr.splice(index, 1);
    },
    addTrial(index) {
      this.trialArr.splice(index + 1, 0, {
        id: new Date().valueOf()
      });
    },
    removeTrial(index) {
      this.trialArr.splice(index, 1);
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
      //   var idParam =
      //     this.searchOrg !== "-1" ? `&institutions_id=${this.searchOrg}` : "";
      this.axios.get(`${process.env.AGENTSV9}/proxy/institutions`).then(res => {
        this.tableLoading = false;
        this.dataList = res.data;
      });
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      ["start_time", "end_time"].forEach(e => {
        if (typeof newRow[e] === "number") {
          newRow[e] = new Date(newRow[e] * 1000);
        }
      });

      var arr = [];
      for (let key in newRow.student_count) {
        arr.push({
          id: new Date().valueOf(),
          num: Number(newRow.student_count[key]),
          type: Number(key)
        });
      }
      this.courseTypeArr = arr;
      return newRow;
    },
    delete(id) {
      var param = {
        id: id,
        is_delete: true
      };
      this.axios
        .post(`${process.env.AGENTSV9}/institutional/up_institutions`, param)
        .then(res => {
          this.modalShow = false;
          this.getTableData();
        });
    },
    createNewBank() {
      this.formValidate = {};
      this.courseTypeArr = [
        {
          id: new Date().valueOf()
        }
      ];
      this.trialArr = [
        {
          id: new Date().valueOf()
        }
      ];
      this.modalShow = true;
      this.modalStatus = "create";
    },
    handleSubmit(name) {
      var param = this.formatForm();
      let student_count = {};
      for (const value of this.courseTypeArr) {
        student_count[value.type] = value.num;
      }
      param.student_count = student_count;
      ["start_time", "end_time"].forEach(e => {
        if (typeof param[e] === "string") {
          param[e] = new Date(param[e]).valueOf() / 1000;
        }
      });
      // console.log(param)
      // return
      if (this.modalStatus == "create") {
        param.phone = this.accountArr.map(e => e.value);
        param.phone = this.accountArr.map(e => e.value);
        this.axios
          .post(`${process.env.AGENTSV9}/institutional/reg_institutions`, param)
          .then(res => {
            this.modalShow = false;
            this.getTableData();
          });
      } else {
        param.is_delete = false;
        [
          "course_instrument_type",
          "course_name_list",
          "institutions_id",
          "phone",
          "_rowKey",
          "_index",
          "audit",
          "open_audit",
          "proxy_id",
          "user"
        ].forEach(e => {
          delete param[e];
        });
        // console.log(param)
        // return
        this.axios
          .post(`${process.env.AGENTSV9}/institutional/up_institutions`, param)
          .then(res => {
            this.modalShow = false;
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




