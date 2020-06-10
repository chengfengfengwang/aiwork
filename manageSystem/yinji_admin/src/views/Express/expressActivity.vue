<template>
  <div>
    <Button type="primary" @click="createNewBank">新建活动</Button>
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
        <span>活动</span>
      </p>
      <div>
        <Form :model="formValue" label-position="right" :label-width="100">
          <FormItem label="部门">
            <Select v-model="formValue.type" placeholder="选择活动所属部门">
              <Option value="0">0</Option>
              <Option value="1">1</Option>
            </Select>
          </FormItem>
          <FormItem label="活动名称">
            <Input v-model="formValue.channel"></Input>
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
export default {
  data() {
    return {
      searchChannel: "",
      startTime: "",
      endTime: "",
      status: "",
      tableLoading: false,
      total: 0,
      page: 0,
      pageSize: 10,
      columns: [
        {
          title: "名称",
          key: "name"
        },

        {
          title: " ",
          key: "action",
          minWidth: 50,
          width: 300,
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
                      this.uploadModalShow = true;
                      this.curChannelId = params.row.id;
                    }
                  }
                },
                "上传"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: this.editShow ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem("channelId", params.row.id);
                      localStorage.setItem("channelName", params.row.name);
                      this.$router.push("/goodsPackage");
                    }
                  }
                },
                "sku"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: this.editShow ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      this.modalShow = true;
                      this.modalStatus = "edit";
                      this.formValidate = JSON.parse(
                        JSON.stringify(params.row)
                      );
                      delete this.formValidate._index;
                      delete this.formValidate._rowKey;
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
                  style: {
                    marginRight: "5px",
                    display: this.editShow ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      var that = this;
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定要删除吗？",
                        onOk() {
                          that.remove(params.row.id);
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
      ],
      statusList: [
        {
          name: "未处理",
          value: 0
        },
        {
          name: "已下载",
          value: 1
        },
        {
          name: "已回执",
          value: 2
        },
        {
          name: "全部",
          value: 3
        }
      ],
      channelList: [],
      dataList: [],
      modalShow: false,
      formValue: {}
    };
  },
  mounted() {
    this.getTableData();
    //this.getChannels();
  },
  methods: {
    handleSubmit(name) {
      if (this.modalStatus == "create") {
        this.axios
          .post(
            `${process.env.PEILUN}/activity/create`,
            this.formValidate
          )
          .then(res => {
            this.modalShow = false;
            this.getTableData();
          });
      } else {
        this.axios
          .post(
            `${process.env.PEILUN}/activity/update`,this.formValidate
          )
          .then(res => {
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getTableData();
          });
      }
    },
    createNewBank() {
      this.formValue = {};
      this.modalShow = true;
      this.modalStatus = "create"
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
    getChannels() {
      this.axios
        .get(`${process.env.WULIU}/channel/index?page=0&size=999&status=1`)
        .then(res => {
          this.channelList = res.data.list;
        });
    },
    getTableData() {
      this.axios
        .get(`${process.env.PEILUN}/activity/index`, {
            params:{
                page:0,
                size:999,
                status:0
            }
        })
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.list;
        });
    }
  }
};
</script>

