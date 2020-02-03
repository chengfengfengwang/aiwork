<template>
  <div>
    <h1>厂商回传单上传</h1>
    <div class="table_top_tool">
      <!-- <Tabs type="card">
        <TabPane @click="createNewBank" label="新建厂商" name="name1"></TabPane>
        <TabPane @click="editTable" label="厂商管理" name="name2"></TabPane>
        <TabPane label="标签三" name="name3"></TabPane>
      </Tabs>-->
      <Button type="primary" @click="createNewBank" style="margin-right:10px">新建厂商</Button>
      <span>厂商管理</span>
      <i-switch v-model="editShow"/>
      <!-- <span>子商品</span>
      <i-switch v-model="childGoodShow"  />-->
      <!-- <Button type="success" @click="editTable" style="margin-right:10px">{{editShow?'收起':'厂商管理'}}</Button> -->
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <h1>厂商发货单下载</h1>
    <Table :loading="tableLoading" border :columns="downloadColumns" :data="dataList"></Table>
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>厂家</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="名称">
            <Input v-model="formValidate.name" placeholder="请输入厂家名称"></Input>
          </FormItem>
          <FormItem label="公司名称">
            <Input v-model="formValidate.c_name" placeholder="请输入公司名称"></Input>
          </FormItem>
          <FormItem label="联系人">
            <Input v-model="formValidate.username" placeholder="请输入联系人"></Input>
          </FormItem>
          <FormItem label="手机号">
            <Input v-model="formValidate.phone" placeholder="请输入手机号"></Input>
          </FormItem>
          <!-- <FormItem label="权重">
            <Input v-model.number="formValidate.weight" placeholder="请输入展示权重"></Input>
          </FormItem> -->
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="uploadModalShow" width="760">
      <p slot="header" style>
        <span>上传渠道原始表单</span>
      </p>
      <div>
        <span>文件：</span>
        <Upload
          style="display:inline-block;vertical-align:center"
          :before-upload="handleUpload"
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <Button icon="ios-cloud-upload-outline">选择文件</Button>
        </Upload>
        <div v-if="file !== null">
          <p>{{ file.name }}</p>
        </div>
      </div>
      <div slot="footer">
        <Button @click="uploadFactoryFile" type="primary">确定</Button>
        <Button @click="uploadModalShow=false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="downloadModalShow" width="760">
      <p slot="header" style>
        <span>下载</span>
      </p>
      <div>
        <span>开始时间</span>
        <DatePicker v-model="downloadStartTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
        <span>结束时间</span>
        <DatePicker v-model="downloadEndTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
        <div style="margin:10px 0">
          <span>状态：</span>
          <Select style="width: 160px" v-model="downloadStatus" placeholder>
            <Option
              v-for="status in statusList"
              :key="status.value"
              :value="status.value"
            >{{status.name}}</Option>
          </Select>
          <Button type="info" @click="downloadSingleFile">下载</Button>
        </div>

        
      </div>
      <div slot="footer">
        <!-- <Button @click="uploadFactoryFile" type="primary">确定</Button> -->
        <Button @click="downloadModalShow=false">关闭</Button>
      </div>
    </Modal>
    <div style="margin-top:10px">
      <span>开始时间</span>
      <DatePicker v-model="startTime2" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      <span>结束时间</span>
      <DatePicker v-model="endTime2" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      <span>状态：</span>
      <Select style="width: 160px" v-model="searchStatus2" placeholder>
        <Option
          v-for="status in statusList"
          :key="status.value"
          :value="status.value"
        >{{status.name}}</Option>
      </Select>
      <Button type="primary" @click="downloadFileToVendor2">批量下载</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      editShow: false,
      childGoodShow: false,
      downloadShow: false,
      uploadShow: false,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "名称",
          key: "name"
        },
        // {
        //   title: "联系人",
        //   key: "username"
        // },
        // {
        //   title: "电话",
        //   key: "phone"
        // },
        // {
        //   title: "权重",
        //   key: "weight"
        // },
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
                      this.curFactoryId = params.row.id;
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
                    //display: this.editShow ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem("factoryId", params.row.id);
                      localStorage.setItem("factoryName", params.row.name);
                      localStorage.setItem("upItemName", 'factory');
                      this.$router.push("/uploadList");
                    }
                  }
                },
                "上传记录"
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
                      localStorage.setItem("factoryId", params.row.id);
                      localStorage.setItem("factoryName", params.row.name);
                      this.$router.push("/childGoods");
                    }
                  }
                },
                "子商品"
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
      downloadColumns: [
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
                      this.downloadModalShow = true;
                      this.curFactoryId = params.row.id;
                    }
                  }
                },
                "下载"
              )
            ]);
          }
        }
      ],
      dataList: [],
      tableLoading: true,
      ///
      uploadModalShow: false,
      downloadModalShow: false,
      file: null,
      loadingStatus: false,
      ///
      startTime2: "",
      endTime2: "",
      searchStatus2: "",
      statusList: [
        {
          name: "未下载",
          value: 0
        },
        {
          name: "已下载",
          value: 1
        },
        {
          name: "全部",
          value: 2
        }
      ],
      ///
      downloadStartTime:'',
      downloadEndTime:'',
      downloadStatus:''
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    downloadSingleFile() {
      const formObj = {
        start_time: this.downloadStartTime.valueOf() / 1000,
        end_time: this.downloadEndTime.valueOf() / 1000,
        status: this.downloadStatus,
        id: this.curFactoryId
      };
      console.log(formObj);
      this.axios
        .post(`${process.env.WULIU}/form/channel/download`, formObj)
        .then(res => {
          window.open(res.data.down_url,'_blank');
        });
    },
    editTable() {
      this.editShow = !this.editShow;
    },
    downloadFileToVendor2() {
      const formObj = {
        start_time: this.startTime2.valueOf() / 1000,
        end_time: this.endTime2.valueOf() / 1000,
        status: this.searchStatus2
      };
      console.log(formObj);
      this.axios
        .post(`${process.env.WULIU}/form/channels/download`, formObj)
        .then(res => {
          window.open(res.data.down_url,'_blank');
        });
    },
    handleUpload(file) {
      this.file = file;
      return false;
    },
    uploadFactoryFile() {
      this.loadingStatus1 = true;
      const formObj = {
        action: 1,
        file: this.file,
        id: this.curFactoryId
      };
      var formdata = new FormData();
      for (let key in formObj) {
        formdata.append(key, formObj[key]);
      }
      this.axios
        .post(`${process.env.WULIU}/form/vendor/upload`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.file1 = null;
          this.loadingStatus1 = false;
          this.uploadModalShow = false;
        });
    },
    remove(id) {
      this.axios
        .post(`${process.env.WULIU}/vendor/delete`, {
          id
        })
        .then(res => {
          this.getTableList();
        });
    },
    createNewBank() {
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
    },
    handleSubmit() {
      //console.log(this.formValidate);
      if (this.modalStatus == "create") {
        //return
        this.axios
          .post(`${process.env.WULIU}/vendor/create`, this.formValidate)
          .then(res => {
            this.modalShow = false;
            this.getTableList();
          });
      } else {
        //console.log(this.formValidate);
        //return;
        this.axios
          .post(`${process.env.WULIU}/vendor/update`, this.formValidate)
          .then(res => {
            //this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getTableList();
          });
      }
    },
    getTableList() {
      this.axios
        .get(
          `${process.env.WULIU}/vendor/index?page=0&size=999&status=1`,
          this.codeForm
        )
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.list;
        });
    }
  }
};
</script>
<style lang="less" scoped>
h1 {
  text-align: center;
}
</style>

