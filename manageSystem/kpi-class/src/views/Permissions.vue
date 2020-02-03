<template>
  <div>
    <div style="margin-bottom:5px">
      <Button type="primary" @click="modalShow=true;modalStatus='create'" v-show="permission===0">新建</Button>
      <span style="margin-left:15px">查找：</span>
      <Input v-model="serchValue" placeholder="输入用户账号" style="width: 200px"/>
    </div>
    <Table :loading="tableLoading" :columns="columns" :data="userList"></Table>
    <!-- <div style="margin-top:10px">
      <Page
        @on-page-size-change="pageSizeChange"
        @on-change="pageChange"
        :total="total"
        :page-size="pageSize"
        show-sizer
        :page-size-opts="[5,10,15,20,30,40]"
        show-elevator
      />
    </div>-->
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>新增用户</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="用户账号" prop="start_time">
            <Input :disabled="modalStatus=='edit'" v-model="formValidate.username" placeholder="输入用户账号" style="width: 300px"/>
          </FormItem>
          <FormItem label="归属" prop="end_time">
            <Select v-model="formValidate.ascription" style="width:200px">
              <Option v-for="group in groupList" :key="group.uid" :value="group.uid">{{group.groupname}}</Option>
            </Select>
          </FormItem>
          <FormItem label="权限" prop="end_time">
            <Select v-model="formValidate.permission" style="width:200px">
              <Option :value="0">管理员</Option>
              <Option :value="1">组长</Option>
              <Option :value="2">组员</Option>
            </Select>
          </FormItem>
          <Button style="margin-left:50px" @click="resetPassword">重置密码</Button>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow = false;">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { formatPermission, formatAscription } from '../common/util.js'
import mixin_group_list from '../mixins/allGroupList.js'
export default {
  mixins:[mixin_group_list],
  data() {
    return {
      userList: [],
      page: 0,
      pageSize: 5,
      total: 0,
      modalShow: false,
      tableLoading: true,
      columns: [
        {
          title: "username",
          key: "username"
        },
        {
          title: "权限",
          key: "permission",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                formatPermission(params.row.permission)
              ),
            ]);
          }
        },
        {
          title: "归属",
          key: "groupname",
          // render: (h, params) => {
          //   return h("div", [
          //     h(
          //       "span",
          //       formatAscription(params.row.ascription)
          //     ),
          //   ]);
          // }
        },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          align: "center",
          render: (h, params) => {
            if (this.permission === 0) {
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
                        this.curRow = params.row;
                        this.formValidate = params.row;
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
                        this.delete(params.row);
                      }
                    }
                  },
                  "删除"
                )
              ]);
            }
          }
        }
      ],
      formValidate: {},
      serchValue: "",
      curRow: {},
      modalStatus:""
    };
  },
  computed: {
    ...mapGetters(["role","permission"])
  },
  mounted() {
    this.getUserList();
  },
  methods: {
    resetPassword() {
      this.curRow;
      this.axios
        .post(`${process.env.JINKANG}/v3/user/reset_pwd`, {
          username: row.username,
          password: 123456
        })
        .then(res => {
          this.$Message.success("已经重置为初始密码啦");
          //this.getUserList();
        });
    },
    searchUser(name) {
      if (this.serchValue.trim() === "") {
        this.getUserList();
      } else {
        this.tableLoading = true;
        this.axios
          .get(
            `${process.env.JINKANG}/v3/user/search_user?username=${
              this.serchValue
            }`
          )
          .then(res => {
            var arr = [];
            if (res.data) arr.push(res.data);
            this.userList = arr;
            this.tableLoading = false;
          });
      }
    },
    handleSubmit() {
      // console.log(this.formValidate);
      // console.log(this.modalStatus);
      // return
      if (this.modalStatus === "edit") {
        this.edit();
      } else {
        this.creat();
      }
    },
    delete(row) {
      this.axios
        .post(`${process.env.JINKANG}/v3/user/delete_user/`, {
          username: row.username
        })
        .then(res => {
          this.$Message.success("删除成功啦");
          this.getUserList();
        });
    },
    edit() {
      this.axios
        .post(
          `${process.env.JINKANG}/v3/user/update_ascription_permission`,
          this.formValidate
        )
        .then(res => {
          this.$Message.success("修改成功啦");
          this.getUserList();
          this.modalShow = false;
        });
    },
    creat() {
      this.axios
        .post(`${process.env.JINKANG}/v3/user/add_user`, this.formValidate)
        .then(res => {
          this.$Message.success("添加成功啦");
          this.getUserList();
          this.modalShow = false;
        });
    },
    resetPage() {
      this.page = 0;
    },
    sortChange() {
      this.resetPage();
      this.getClassList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getRoomList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getClassList();
    },
    getUserList() {
      this.tableLoading = true;
      this.axios.get(`${process.env.JINKANG}/v3/user/`).then(res => {
        this.userList = res.data;
        this.tableLoading = false;
      });
    }
  },
  watch: {
    serchValue() {
      this.searchUser();
    }
  }
};
</script>

