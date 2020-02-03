
<template>
  <div>
    <!-- <Breadcrumb style="margin-bottom:20px">
      <BreadcrumbItem>年级</BreadcrumbItem>
      <BreadcrumbItem style="color:#333;font-weight:400">班级</BreadcrumbItem>
      <BreadcrumbItem style="color:#333;font-weight:400">学生</BreadcrumbItem>
    </Breadcrumb>-->
    <h1 style="text-align:center;margin:10px 0;">年级列表</h1>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建年级</Button>
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
        <span>年级</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="名称">
            <Input v-model="formValidate.name" placeholder></Input>
          </FormItem>
          <FormItem label="领导">
            <Input v-model="formValidate.leader_name" placeholder></Input>
          </FormItem>
          <FormItem label="电话">
            <Input v-model="formValidate.leader_phone" placeholder></Input>
          </FormItem>
          <FormItem label="班级信息">
            <Input type="textarea" :rows="4" v-model="formValidate.classes_info" placeholder></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="formValidate.desc" placeholder></Input>
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

export default {
  props: {
    type: {}
  },
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "id",
          key: "_id"
        },
        {
          title: "学校名称",
          key: "name"
        },
        {
          title: "领导",
          key: "leader_name"
        },
        {
          title: "领导电话",
          key: "leader_phone"
        },
        {
          title: "班级数量",
          key: "classes_counts"
        },
        {
          title: " ",
          key: "action",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modalShow = true;
                      this.formValidate = params.row;
                      this.formValidate.classes_info = JSON.stringify(this.formValidate.classes_info);
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
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem("grade_id", params.row._id);
                      localStorage.setItem("grade_name", params.row.name);
                      this.$store.dispatch("updateschoolInfo", {
                        school_id: localStorage.getItem("school_id"),
                        school_name: localStorage.getItem("school_name"),
                        grade_id: params.row._id,
                        grade_name: params.row.name
                      });
                      this.$router.push("/ScloolClass");
                    }
                  }
                },
                "查看班级"
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
                      this.remove(params.row);
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
      editBankList: [],
      searchBank: 0,
      modalCoverShow: "",
      previewSrc: "",
      schoolCategoryList: [
        { name: "幼儿园", value: 0 },
        { name: "小学", value: 1 },
        { name: "中学", value: 2 },
        { name: "大学", value: 3 }
      ]
    };
  },

  mounted() {
    this.school_id = localStorage.getItem("school_id");
    this.getGradeList();
  },
  methods: {
    remove(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        onOk: () => {
          this.axios
            .get(`${process.env.PEILUN}/v2/grade/delete/?id=${row._id}`)
            .then(res => {
              this.$Message.success("删除成功");
              this.getGradeList();
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
      this.getGradeList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getGradeList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getGradeList();
    },
    getGradeList() {
      this.tableLoading = true;
      this.axios
        .get(
          `${process.env.PEILUN}/v2/grade/index/?page=${this.page}&size=${
            this.pageSize
          }&school_id=${this.school_id}`
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
        this.getGradeList();
      });
    },
    delete(id) {
      this.axios
        .get(process.env.PEILUN + "/v1/new_question/deleted/?_id=" + id)
        .then(res => {
          this.getGradeList();
        });
    },
    createNewBank() {
      this.modalCoverShow = false;
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
    },
    handleSubmit(name) {
      var param = Object.assign({},this.formValidate);
      param.school_id = localStorage.getItem('school_id');
      if (this.modalStatus == "create") {
        this.axios
          .post(`${process.env.PEILUN}/v2/grade/create/`, param)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getGradeList();
          });
      } else {
          this.formValidate.id = this.formValidate._id;
        this.axios
          .post(
            `${
              process.env.PEILUN
            }/v2/grade/update/`,this.formValidate
          )
          .then(res => {
            //this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getGradeList();
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







