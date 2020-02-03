<template>
  <div>
    <div style="margin-bottom:5px">
      <Button
        type="primary"
        @click="modalShow=true;modalStatus='create'"
        v-show="permission===0"
      >新建组</Button>
    </div>
    <Table :loading="tableLoading" :columns="columns" :data="groupList"></Table>
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
        <span>新增组</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="组名称">
            <Input
              v-model="formValidate.groupname"
              placeholder="输入组名称"
              style="width: 300px"
            />
          </FormItem>
          <FormItem label="描述">
            <Input
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="输入组描述"
            ></Input>
          </FormItem>
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
import { formatPermission, formatAscription } from "../common/util.js";
export default {
  data() {
    return {
      groupList: [],
      page: 0,
      pageSize: 5,
      total: 0,
      modalShow: false,
      tableLoading: true,
      columns: [
        {
          title: "组名称",
          key: "groupname"
        },
        {
          title: "描述",
          key: "desc"
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
      modalStatus: ""
    };
  },
  computed: {
    ...mapGetters(["role", "permission"])
  },
  mounted() {
    this.getGroupList();
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
          //this.getGroupList();
        });
    },
    searchUser(name) {
      if (this.serchValue.trim() === "") {
        this.getGroupList();
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
            this.groupList = arr;
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
        .post(`${process.env.JINKANG}/v3/group/delete`, {
          uid: row.uid
        })
        .then(res => {
          this.$Message.success("删除成功啦");
          this.getGroupList();
        });
    },
    edit() {
      this.axios
        .post(
          `${process.env.JINKANG}/v3/group/update`,
          this.formValidate
        )
        .then(res => {
          this.$Message.success("修改成功啦");
          this.getGroupList();
          this.modalShow = false;
        });
    },
    creat() {
      this.axios
        .post(`${process.env.JINKANG}/v3/group/add`, this.formValidate)
        .then(res => {
          this.$Message.success("添加成功啦");
          this.getGroupList();
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
    getGroupList() {
      this.tableLoading = true;
      this.axios.get(`${process.env.JINKANG}/v3/group`).then(res => {
        this.groupList = res.data;
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

