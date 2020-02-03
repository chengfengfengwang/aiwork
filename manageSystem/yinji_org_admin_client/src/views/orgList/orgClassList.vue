<template>
  <div>
    <div class="table_top_tool">
      <span>按机构筛选：</span>
      <Select @on-change="getTableData" v-model="searchOrg" placeholder style="width:200px">
        <Option v-for="item in orgList" :key="item.id" :value="item.id">{{item.institutions_name}}</Option>
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
    <!-- <Modal v-model="modalShow" width="760">
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
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>-->
  </div>
</template>
<script>
// 正常在班级路由下，班级列表页面。班级下的学生页面引用了，机构下的列表也引用了
import courseApply from "./../mixins/courseApply.js";
import orgMixin from "./../mixins/getOrgList.js";
export default {
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "班级名称",
          key: "class_name"
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
      searchCourses: "-1",
      searchOrg: "-1"
    };
  },
  mixins: [orgMixin],
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
      var courseParam =
        this.searchCourses !== "-1" ? `&course_id=${this.searchCourses}` : "";
      var orgParam =
        this.searchOrg !== "-1" ? `&institutions_id=${this.searchOrg}` : "";
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





