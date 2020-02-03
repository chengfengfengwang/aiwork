
<template>
  <div>
    <!-- <Breadcrumb style="margin-bottom:20px">
      <BreadcrumbItem style="color:#333;font-weight:400">学校和年级</BreadcrumbItem>
      <BreadcrumbItem>班级</BreadcrumbItem>
      <BreadcrumbItem style="color:#333;font-weight:400">学生</BreadcrumbItem>
    </Breadcrumb>-->
    <h1 style="text-align:center;margin:10px 0;">学生列表</h1>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">创建学生</Button>
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
        <span>题库</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="出生日期">
            <DatePicker
              v-model="birthday"
              type="date"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="电话">
            <Input v-model="formValidate.phone" placeholder></Input>
          </FormItem>
          <FormItem label="密码">
            <Input v-model="formValidate.password" placeholder></Input>
          </FormItem>
          <FormItem label="国家">
            <Select v-model="formValidate.zone" placeholder style="width:300px">
              <Option value="86">中国</Option>
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
import expandRow from "./TableExpand";
import { formatTimeOnlyDate } from "./../../common/util.js";
export default {
  props: {
    type: {}
  },
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {
        zone: "86"
      },
      birthday: "",

      columns: [
        {
          title: "头像",
          key: "avatar_url",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.avatar_url
              },
              style: {
                width: "50px"
              }
            });
          }
        },
        {
          title: "名字",
          key: "nickname"
        },
        {
          title: "班级名称",
          key: "classes_name"
        },
        {
          title: "性别",
          key: "sex",
          render: (h, params) => {
            return h(
              "span",
              this.getSex(params.row.sex)
            );
          }
        },
        {
          title: "生日",
          key: "birthday",
          render: (h, params) => {
            return h(
              "span",
              params.row.birthday == 0
                ? ""
                : formatTimeOnlyDate(params.row.birthday)
            );
          }
        },
        {
          title: "电话",
          key: "phone"
        },
        {
          title: "邀请码",
          key: "id"
        },
        // {
        //   title: " ",
        //   key: "action",
        //   width: 250,
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "primary",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               this.modalShow = true;
        //               //this.formValidate = this.formateRow(params.row);
        //               this.formValidate = params.row;
        //               this.modalStatus = "edit";
        //             }
        //           }
        //         },
        //         "编辑"
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "primary",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               this.$router.push({
        //                 name: "GroupUserList",
        //                 params: {
        //                   row: params.row
        //                 }
        //               });
        //               localStorage.setItem("curKey", params.row.group_keys);
        //               localStorage.setItem("curName", params.row.group_name);
        //             }
        //           }
        //         },
        //         "查看详情"
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "error",
        //             size: "small"
        //           },
        //           on: {
        //             click: () => {
        //               this.remove(params.row);
        //             }
        //           }
        //         },
        //         "删除"
        //       )
        //     ]);
        //   }
        // }
      ],
      dataList: [],
      page: 0,
      pageSize: 10,
      total: 0,
      modalStatus: "",
      bankList: [],
      searchBankList: [],
      editBankList: [],
      searchBank: 0,
      modalCoverShow: "",
      previewSrc: ""
    };
  },

  mounted() {
    this.school_id = localStorage.getItem("school_id");
    this.grade_id = localStorage.getItem("grade_id");
    this.classes_id = localStorage.getItem("classes_id");
    this.getStudentList();
  },
  methods: {
    getSex(v) {
      switch (v) {
        case 0:
          return "其他";
          break;
        case 1:
          return "男";
          break;
        case 2:
          return "女";
          break;
        case 3:
          return "未知";
          break;
      }
    },
    remove(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        onOk: () => {
          this.axios
            .get(`${process.env.PEILUN}/v2/classes/delete/?id=${row._id}`)
            .then(res => {
              this.$Message.success("删除成功");
              this.getStudentList();
            });
        },
        onCancel: () => {
          //this.$Message.info('Clicked cancel');
        }
      });
    },
    showAllUser() {
      this.$refs.allUser.modalShow = !this.$refs.allUser.modalShow;
    },
    handleUpload(file) {
      this.modalCoverShow = true;
      this.previewSrc = window.URL.createObjectURL(file);
      var type;
      var formdata = new FormData();
      formdata.append("material", file);

      formdata.append("type", 0);

      //return false
      this.axios
        .post(`${process.env.PEILUN}/v1/upload_material/`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.formValidate.cover = res.data;
        });
      return false;
    },

    handleSearchBank() {
      this.getStudentList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getStudentList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getStudentList();
    },
    getStudentList() {
      this.tableLoading = true;
      this.axios
        .get(
          `${process.env.PEILUN}/v2/student/index/?page=${this.page}&size=${
            this.pageSize
          }&classes_id=${this.classes_id}&grade_id=${this.grade_id}`
        )
        .then(res => {
          this.tableLoading = false;
          if (res.data && res.data.length > 0) {
            this.dataList = res.data;
          } else {
            this.dataList = [];
          }

          //this.total = res.paging.total;
        });
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      newRow.game_id = newRow.game_id.join();
      return newRow;
    },
    getProductDetail(id) {
      this.axios.get(process.env.PEILUN + "/v1/goods?id=" + id).then(res => {
        this.tableLoading = false;
        this.getStudentList();
      });
    },
    delete(id) {
      this.axios
        .get(process.env.PEILUN + "/v1/new_question/deleted/?_id=" + id)
        .then(res => {
          this.getStudentList();
        });
    },
    createNewBank() {
      this.modalCoverShow = false;
      this.formValidate = { zone: "86" };
      this.modalShow = true;
      this.modalStatus = "create";
      //上线记得删除
      //   if(localStorage.getItem('wang')){
      //       this.formValidate = JSON.parse(localStorage.getItem('form')) || {}
      //   }
    },
    handleSubmit(name) {
      //console.log(param)
      var param = Object.assign({}, this.formValidate);
      //param.student_info = JSON.parse(this.formValidate.student_info);
      param.school_id = localStorage.getItem("school_id");
      param.school_name = localStorage.getItem("school_name");
      param.birthday = formatTimeOnlyDate(this.birthday / 1000);
      if (this.modalStatus == "create") {
        this.axios
          .post(`${process.env.PEILUN}/v2/student/create/`, param)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getStudentList();
          });
      } else {
        //var param = this.formatForm();
        //console.log('zzz')
        //return
        this.axios
          .get(
            `${
              process.env.PEILUN
            }/v3/users/grouping/update_group_name/?group_name=${
              this.formValidate.group_name
            }&group_keys=${this.formValidate.group_keys}`
          )
          .then(res => {
            //this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getStudentList();
          });
      }
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      return newForm;
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







