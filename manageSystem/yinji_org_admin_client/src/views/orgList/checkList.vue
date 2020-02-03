<template>
  <div>
    <!-- <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建机构</Button>
    </div> -->
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
    <!-- <Modal v-model="modalShow" width="760">
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
                  :value="course._id"
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
    </Modal> -->
  </div>
</template>
<script>
const uniq = require("lodash.uniq");
import { getDate } from "./../../common/util.js";
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
        // {
        //   title: "账号名称",
        //   key: "phone"
        // },
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
            const endTime = params.row.end_time
              ? getDate(params.row.end_time)
              : "";
            return h("div", endTime);
          }
        },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          width: 300,
          //maxWidth: 300,
          align: "center",
          render: (h, params) => {
            const noCheck = params.row.audit;
            //const checkText = noCheck ? '未审核' : '已审核';
            return h("div", [
            //   h(
            //     "Button",
            //     {
            //       props: {
            //         type: "info",
            //         size: "small"
            //       },
            //       style: {
            //         marginRight: "5px"
            //       },
            //       on: {
            //         click: () => {
            //           this.modalShow = true;
            //           this.formValidate = this.formateRow(params.row);
            //           this.modalStatus = "edit";
            //         }
            //       }
            //     },
            //     "编辑"
            //   ),
             
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: params.row.open_audit===0 ? 'none' : 'inline-block'
                  },
                  on: {
                    click: () => {
                        this.checkOrg(params.row.id)
                    //   if(checkText==='未审核'){
                    //     this.checkOrg(params.row.id)
                    //   }
                    }
                  }
                },
                '审核'
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
      accountModalShow: false,
      accountForm: {
        phone: ""
      }
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    checkOrg(orgId){
      const param = {
        "id": orgId,
        "audit_pass": 1,
      }
      this.axios
        .post(`${process.env.AGENTSV9}/institutional/up_institutions`, param)
        .then(res => {
          this.getTableData();
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
      this.axios
        .get(
          `${process.env.AGENTSV9}/proxy/institutions_audits`
        )
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.data;
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

      if (this.modalStatus == "create") {
        param.phone = this.accountArr.map(e => e.value);
        param.phone = this.accountArr.map(e => e.value);
        this.axios
          .post(
            `${process.env.AGENTSV9}/institutional/reg_institutions`,
            param
          )
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
          "open_audit"
        ].forEach(e => {
          delete param[e];
        });
        // console.log(param)
        // return
        this.axios
          .post(
            `${process.env.AGENTSV9}/institutional/up_institutions`,
            param
          )
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




