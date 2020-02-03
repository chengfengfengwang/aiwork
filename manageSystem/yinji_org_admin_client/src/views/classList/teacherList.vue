<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">注册教师</Button>
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
          <FormItem label="手机号">
            <Input style="width:300px" v-model="formValidate.phone" placeholder="请输入手机号"></Input>
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
const uniq = require("lodash.uniq");
import { getDate } from "./../../common/util.js";
export default {
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "手机号",
          key: "phone"
        },
        // {
        //   title: " ",
        //   key: "action",
        //   minWidth: 50,
        //   width: 300,
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "info",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               this.modalShow = true;
        //               this.formValidate = this.formateRow(params.row);
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
        //             type: "success",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               localStorage.setItem(
        //                 "curOrgId",
        //                 params.row.institutions_id
        //               );
        //               localStorage.setItem("agentTreeStatus", "fromOrg");
        //               this.$router.push("agentTree");
        //             }
        //           }
        //         },
        //         "查看代理"
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "info",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               this.accountModalShow = true;
        //               this.modalStatus = "edit";
        //               this.curOrgId = params.row.institutions_id;
        //             }
        //           }
        //         },
        //         "新建账号"
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
        //               var that = this;
        //               this.$Modal.confirm({
        //                 title: "警告",
        //                 content: "确定要删除吗？",
        //                 onOk() {
        //                   that.delete(params.row.institutions_id);
        //                 }
        //               });
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
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
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
      this.axios.post(`${process.env.AGENTSV9}/query_teachers`,{
          institutions_id:this.$store.getters.orgId,
          page:0,
          size:999
      }).then(res => {
        this.tableLoading = false;
        this.dataList = res.data.users;
      });
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
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

      this.modalShow = true;
      this.modalStatus = "create";
    },
    handleSubmit(name) {
      var param = this.formatForm();
        // console.log(param)
        // return
      if (this.modalStatus == "create") {
        this.axios
          .post(`${process.env.AGENTSV9}/create_teacher`, param)
          .then(res => {
            this.modalShow = false;
            this.getTableData();
          });
      } else {
        param.is_delete = false;
        param.id = param.institutions_id;
        [
          "course_instrument_type",
          "course_name_list",
          "institutions_id",
          "phone",
          "_rowKey",
          "_index"
        ].forEach(e => {
          delete param[e];
        });
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
      newForm.institutions_id = this.$store.getters.orgId;
      return newForm;
    }
  }
};
</script>
<style lang="less">
</style>




