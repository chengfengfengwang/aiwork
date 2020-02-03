<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:20px">新建渠道</Button>
      <Button type="info" @click="createCodes" style="margin-right:30px">生成激活码</Button>
    </div>
    <h1 style="margin:30px;text-align:center">渠道列表</h1>
    <Table :loading="tableLoading" border :columns="columns" :data="channelList"></Table>
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
        <span>添加渠道</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="名称">
            <Input v-model="formValidate.name" placeholder="请输入名称"></Input>
          </FormItem>
          <FormItem label="key">
            <Input v-model="formValidate.key" placeholder="请输入key"></Input>
          </FormItem>
          <FormItem label="用户">
            <div>id：{{formValidate.channel_user_id}}</div>
            <Button type="primary" @click="alluserModalShow=true" style="margin-right:10px">添加用户</Button>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit()" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="createModalShow" width="760">
      <p slot="header" style>
        <span>生成激活码</span>
      </p>
      <div>
        <Form :model="codeForm" :label-width="100">
          <FormItem label="app名称">
            <Input v-model="codeForm.app" placeholder="请输入app名称"></Input>
          </FormItem>
          <FormItem label="ai金额">
            <Input v-model="codeForm.support_default_amount.ai" placeholder=""></Input>
          </FormItem>
          <FormItem label="音乐壳金额">
            <Input v-model="codeForm.support_default_amount.yinji" placeholder=""></Input>
          </FormItem>
          <FormItem label="生成数量">
            <Input v-model="codeForm.count" placeholder="请输入生成数量"></Input>
          </FormItem>
          <FormItem label="渠道">
            <Select
              @on-change="selectChannel"
              v-model="curCreateChannel"
              placeholder="选择渠道"
              style="width:200px"
            >
              <Option v-for="item in channelList" :key="item.key" :value="item.key">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="submitCodeForm()" type="primary">确定</Button>
        <Button @click="createModalShow=false">关闭</Button>
      </div>
    </Modal>
    <Modal draggable v-model="alluserModalShow" width="1160" :styles="{top: '0px'}">
      <p slot="header" style>
        <span>用户列表</span>
      </p>
      <AllUser :fromArr="haveUsers"  ref="allUser"></AllUser>
      <div slot="footer">
        <Button @click="addUsers" type="primary">确定</Button>
        <Button @click="alluserModalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import AllUser from "./../../components/AllUsers";
export default {
  data() {
    return {
      alluserModalShow:false,
      codeForm: {
        app: "ai",
        code_type: 0,
        limit_times:0,
        "support_default_amount": {
          "ai": 0,
          "yinji": 0,
        },
      },
      createModalShow: false,
      channelList: [],
      haveUsers: [],
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      curCreateChannel: "",
      columns: [
        {
          title: "channel_user_id",
          key: "channel_user_id"
        },
        {
          title: "key",
          key: "key"
        },
        {
          title: "名称",
          key: "name"
        },

        {
          title: " ",
          key: "action",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "primary",
              //         size: "small"
              //       },
              //       style: {
              //         marginRight: "5px"
              //       },
              //       on: {
              //         click: () => {
              //           this.modalShow = true;
              //           //this.formValidate = this.formateRow(params.row);
              //           this.formValidate = params.row;
              //           this.modalStatus = "edit";
              //         }
              //       }
              //     },
              //     "编辑"
              //   ),
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
                      this.$router.push({
                        name: "BatchList",
                        params: {
                          row: params.row
                        }
                      });
                      localStorage.setItem(
                        "channel",
                        JSON.stringify(params.row)
                      );
                    }
                  }
                },
                "查看批号"
              )
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "error",
              //         size: "small"
              //       },
              //       on: {
              //         click: () => {
              //           this.remove(params.row);
              //         }
              //       }
              //     },
              //     "删除"
              //   )
            ]);
          }
        }
      ],
      dataList: [],
      page: 0,
      pageSize: 10,
      total: 0,
      modalStatus: "",
      searchBank: 0,
      modalCoverShow: "",
      previewSrc: ""
    };
  },
  components: {
    AllUser
  },
  mounted() {
    //渠道列表
    this.getChannels();
    //获取渠道下的批号
    //批号下的编码接口
    //this.batchNumberDetail(20190919114950);
  },
  methods: {
    selectChannel(){
      var item = this.channelList[this.channelList.findIndex(e=>{
        return e.key === this.curCreateChannel
      })]
        this.codeForm.user_id = item.channel_user_id;
       this.codeForm.channel = item.name;
    },
    submitCodeForm() {
      console.log(this.codeForm);
       this.axios
        .post(`${process.env.XIAOPO}/v1/code/`, this.codeForm)
        .then(res => {
          this.createModalShow = false
          //this.formValidate.cover = res.data;
        });
    },
    addUsers(v) {
      var userIds = this.$refs.allUser.submit();
      if (userIds.length > 1) {
        alert("只能选择一个用户");
        return;
      }
      this.$set(this.formValidate, "channel_user_id", userIds[0]);
    },
    // showAllUSerModal() {
    // },
    getChannels() {
      this.tableLoading = true;
      this.axios
        .get(`${process.env.XIAOPO}/v1/factory_code/channels`)
        .then(res => {
          this.channelList = res.data.data;
          this.tableLoading = false;
        });
    },
    batchNumberDetail(batch_number) {
      this.axios
        .get(`${process.env.XIAOPO}/v1/code/batch_number/${batch_number}`)
        .then(res => {
          //this.$Message.success("推送成功");
        });
    },
    pushMessage(keys) {
      this.axios
        .get(
          `${
            process.env.XIAOPO
          }/v3/push/sms_notifica_push/?push_type=1&push_id=${keys}&test_tel=`
        )
        .then(res => {
          this.$Message.success("推送成功");
        });
    },
    remove(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        onOk: () => {
          this.axios
            .get(
              `${
                process.env.XIAOPO
              }/v3/users/grouping/delete_group/?group_keys=${row.group_keys}`
            )
            .then(res => {
              this.$Message.success("删除成功");
              this.getChannels();
            });
        },
        onCancel: () => {
          //this.$Message.info('Clicked cancel');
        }
      });
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
        .post(`${process.env.XIAOPO}/v1/upload_material/`, formdata, {
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
      this.getChannels();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getChannels();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getChannels();
    },
    
    formateRow(row) {
      var newRow = Object.assign({}, row);
      newRow.game_id = newRow.game_id.join();
      return newRow;
    },
    getProductDetail(id) {
      this.axios.get(process.env.XIAOPO + "/v1/goods?id=" + id).then(res => {
        this.tableLoading = false;
        this.getChannels();
      });
    },
    delete(id) {
      this.axios
        .get(process.env.XIAOPO + "/v1/new_question/deleted/?_id=" + id)
        .then(res => {
          this.getChannels();
        });
    },
    createCodes() {
      this.createModalShow = true;
    },
    createNewBank() {
      this.modalCoverShow = false;
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
      //上线记得删除
      //   if(localStorage.getItem('wang')){
      //       this.formValidate = JSON.parse(localStorage.getItem('form')) || {}
      //   }
    },
    handleSubmit() {
      //console.log(param)
      if (this.modalStatus == "create") {
        //var param = this.formatForm();
        console.log("create");
        //return
        this.axios
          .put(
            `${process.env.XIAOPO}/v1/factory_code/channel`,
            this.formValidate
          )
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getChannels();
          });
      } else {
        //var param = this.formatForm();
        console.log("edit");
        return;
        this.axios
          .get(
            `${
              process.env.XIAOPO
            }/v3/users/grouping/update_group_name/?group_name=${
              this.formValidate.group_name
            }&group_keys=${this.formValidate.group_keys}`
          )
          .then(res => {
            //this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getChannels();
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







