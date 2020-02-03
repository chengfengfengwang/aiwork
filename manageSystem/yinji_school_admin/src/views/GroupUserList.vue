<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="showModal('create')" style="margin-right:10px">添加用户</Button>
      <!-- <Button type="success" @click="showModal('delete')" style="margin-right:30px">删除用户</Button> -->
      <Button type="success" @click="deletUsers" style="margin-right:30px">删除用户</Button>
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
    <Table @on-selection-change="handleSelectChange" :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
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
    <AllUser :fromArr="dataList" v-on:selected="addUsers" ref="allUser"></AllUser>
  </div>
</template>

<script>
import AllUser from "./../components/AllUsers";
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
        { type: "selection" },
        {
          title: "用户id",
          key: "id"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "昵称",
          key: "nickname"
        },
        {
          title: "设备",
          key: "device_model"
        },
        {
          title: "注册时间",
          key: "registered_at_"
        },
         {
          title: "最后登录",
          key: "last_logined_at_"
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
      curKey: localStorage.getItem("curKey"),
      curName: localStorage.getItem("curName")
    };
  },
  components: {
    AllUser
  },
  mounted() {
    this.getGroupUsers();
    //this.$refs.allUser.modalShow = true
  },
  methods: {
    deletUsers(){
      this.axios
          .post(`${process.env.YINGCHUN}/v3/users/grouping/delete_user/`, {
            user_id: this.curSelectArr,
            group_name: this.curName,
            group_keys: this.curKey
          })
          .then(res => {
            this.getGroupUsers();
          });
    },
    handleSelectChange(selection, row) {
      //console.log('handleSelectChange')
      //console.log(selection.map(e => e.id))
      this.curSelectArr=selection.map(e => e.id)
    
    },
    addUsers(v) {
      //console.log(this.modalStatus);
      //console.log("zzz", v);
      //return;
      if (this.modalStatus == "create") {
        this.axios
          .post(`${process.env.YINGCHUN}/v3/users/grouping/add_user_group/`, {
            user_id: v,
            group_name: this.curName,
            group_keys: this.curKey
          })
          .then(res => {
            this.getGroupUsers();
          });
      } else if (this.modalStatus == "delete") {
        this.axios
          .post(`${process.env.YINGCHUN}/v3/users/grouping/delete_user/`, {
            user_id: v,
            group_name: this.curName,
            group_keys: this.curKey
          })
          .then(res => {
            this.getGroupUsers();
          });
      }
    },

    handleSearchBank() {
      this.getGroupUsers();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getGroupUsers();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getGroupUsers();
    },
    getGroupUsers() {
      this.tableLoading = true;
      var url = `${
        process.env.YINGCHUN
      }/v3/users/grouping/show_user_group/?group_keys=${this.curKey}&page=${
        this.page
      }&size=${this.pageSize}`;
      //var url = `${process.env.YINGCHUN}/v1/new_question/get_many/?type=${this.type}&questionBank=&page=${this.page}&size=${this.pageSize}`;
      this.axios.get(url).then(res => {
        this.tableLoading = false;
        if (res.data && res.data.length > 0) {
          this.dataList = res.data;
        } else {
          this.dataList = [];
        }

        this.total = res.paging.total;
      });
    },
    delete(id) {
      this.axios
        .get(process.env.YINGCHUN + "/v1/new_question/deleted/?_id=" + id)
        .then(res => {
          this.getGroupUsers();
        });
    },
    showModal(status) {
      this.modalStatus = status;
      this.$refs.allUser.modalShow = !this.$refs.allUser.modalShow;
    },
    handleSubmit(name) {
      if (this.modalStatus == "create") {
        var param = this.formatForm();
        param.label_one_id = this.type;
        //console.log(param)
        //return
        this.axios
          .post(process.env.YINGCHUN + "/v1/new_question/create/", param)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getGroupUsers();
          });
      } else if (this.modalStatus == "delete") {
        var param = this.formatForm();
        //console.log(param)
        //return
        this.axios
          .post(process.env.YINGCHUN + "/v1/new_question/update/", param)
          .then(res => {
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.file = "";
            this.getGroupUsers();
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


