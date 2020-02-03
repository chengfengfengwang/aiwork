<template>
  <div>
    <h1>渠道原始表上传</h1>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:10px">新建渠道</Button>
      <span>渠道管理</span>
      <i-switch v-model="editShow"/>
    </div>
    <Table height="400" :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <h1>渠道回单下载</h1>
    <Table height="400" :loading="tableLoading" border :columns="downloadColumns" :data="dataList"></Table>
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>渠道</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="名称">
            <Input v-model="formValidate.name" placeholder="请输入厂家名称"></Input>
          </FormItem>
          <FormItem label="公司名">
            <Input v-model="formValidate.c_name" placeholder="请输入公司名"></Input>
          </FormItem>
          <FormItem label="联系人">
            <Input v-model="formValidate.username" placeholder="请输入联系人"></Input>
          </FormItem>
          <FormItem label="手机号">
            <Input v-model="formValidate.phone" placeholder="请输入手机号"></Input>
          </FormItem>
          <FormItem label="权重">
            <Input v-model.number="formValidate.weight" placeholder="请输入展示权重"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="uploadModalShow" width="760">
      <p slot="header" style>
        <span>上传</span>
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
          <!-- <Button
            type="info"
            @click="uploadChannelFile"
            :loading="loadingStatus"
          >{{ loadingStatus ? 'Uploading' : '提交' }}</Button>-->
        </div>
      </div>
      <div slot="footer">
        <Button @click="uploadChannelFile" type="primary">确定</Button>
        <Button @click="uploadModalShow=false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="downloadModalShow" width="760">
      <p slot="header" style>
        <span>下载</span>
      </p>
      <div>
        <span>开始时间</span>
        <DatePicker
          v-model="downloadStartTime"
          type="date"
          placeholder="Select date"
          style="width: 200px"
        ></DatePicker>
        <span>结束时间</span>
        <DatePicker
          v-model="downloadEndTime"
          type="date"
          placeholder="Select date"
          style="width: 200px"
        ></DatePicker>
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
        //  {
        //   title: "公司名",
        //   key: "c_name"
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
          width: 400,
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
                    //display: this.editShow ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem("channelId", params.row.id);
                      localStorage.setItem("channelName", params.row.name);
                      localStorage.setItem("upItemName", 'channel');
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
                    //display: this.editShow ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem("channelId", params.row.id);
                      localStorage.setItem("channelName", params.row.name);
                      this.$router.push("/orderListToday");
                    }
                  }
                },
                "预览"
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
                      this.curChannelId = params.row.id;
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
      uploadModalShow: false,
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
      downloadModalShow: false,
      downloadStartTime: "",
      downloadEndTime: "",
      downloadStatus: ""
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
        id: this.curChannelId
      };
      console.log(formObj);
      this.axios
        .post(`${process.env.WULIU}/form/vendor/download`, formObj)
        .then(res => {
          window.open(res.data.down_url,'_blank');
        });
    },
    editTable() {
      console.log("editTable");
      this.editShow = !this.editShow;
    },
    downloadFileToVendor2() {
      const formObj = {
        start_time: this.startTime2.valueOf() / 1000,
        end_time: this.endTime2.valueOf() / 1000,
        status: this.searchStatus2,
      };
      console.log(formObj);
      this.axios
        .post(`${process.env.WULIU}/form/vendors/download`, formObj)
        .then(res => {
         window.open(res.data.down_url,'_blank');
        });
    },
    uploadChannelFile() {
      this.loadingStatus = true;
      const formObj = {
        action: 0,
        file: this.file,
        id: this.curChannelId
      };
      var formdata = new FormData();
      for (let key in formObj) {
        formdata.append(key, formObj[key]);
      }
      this.axios
        .post(`${process.env.WULIU}/form/channel/upload`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.file = null;
          this.loadingStatus = false;
          this.uploadModalShow = false;
        });
    },
    handleUpload(file) {
      this.file = file;
      return false;
    },
    remove(id) {
      this.axios
        .post(`${process.env.WULIU}/channel/delete`, {
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
          .post(`${process.env.WULIU}/channel/create`, this.formValidate)
          .then(res => {
            this.modalShow = false;
            this.getTableList();
          });
      } else {
        //console.log(this.formValidate);
        //return;
        this.axios
          .post(`${process.env.WULIU}/channel/update`, this.formValidate)
          .then(res => {
            //this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getTableList();
          });
      }
    },
    getTableList() {
      this.axios
        .get(`${process.env.WULIU}/channel/index?page=0&size=999&status=1`)
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