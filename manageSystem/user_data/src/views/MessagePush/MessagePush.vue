
<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建信息</Button>
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
    <Modal v-model="userGroupModalShow" width="760">
      <GroupList ref="groupList" v-on:confirm="getGroupRes" from="MessagePush"/>
    </Modal>
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>题库</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <!-- <FormItem label="所属题库" prop="status">
            <Select v-model="formValidate.questionBank" placeholder="选择所属题库">
              <Option v-for="item in editBankList" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>-->
          <FormItem label="推送内容">
            <Input type="textarea" :autosize="true" v-model="formValidate.content" placeholder></Input>
          </FormItem>
          <FormItem label="推送时间">
            <DatePicker
              type="datetime"
              v-model="pushTime"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="推送乐器类型">
            <Select style="width: 200px" v-model="formValidate.instrument_type" placeholder>
              <Option value="-1">全部</Option>
              <Option value="0">吉他</Option>
              <Option value="1">尤克里里</Option>
              <Option value="2">卡林巴</Option>
              <Option value="3">非洲鼓</Option>
              <Option value="4">钢琴</Option>
            </Select>
          </FormItem>
          <FormItem label="推送类型">
            <Select style="width: 200px" v-model="formValidate.push_type" placeholder>
              <Option value="0">站内信</Option>
              <Option value="1">站外消息</Option>
              <Option value="2">短信</Option>
            </Select>
          </FormItem>
          <FormItem label="跳转链接">
            <Input v-model="formValidate.link" placeholder></Input>
          </FormItem>
          <FormItem label="名称">
            <Input v-model="formValidate.title" placeholder></Input>
          </FormItem>
          <FormItem label="推送用户">
            <Input v-model="formValidate.from_user" placeholder></Input>
          </FormItem>
          <FormItem label="跳转类型">
            <Input v-model.number="formValidate.link_type" placeholder></Input>
          </FormItem>
          <FormItem label="标签">
            <Input v-model="formValidate.tag_type" placeholder></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
    <h1 style="margin:30px;text-align:center">短信推送</h1>
    <div>
      <div>
        <span>test_tel:</span>
        <Input style="width:300px" v-model="test_tel"></Input>
        <span>push_id:</span>
        <Input style="width:300px" v-model="push_id"></Input>
        <Button type="primary" @click="pushSms">推送</Button>
      </div>
    </div>
  </div>
</template>
<script>
import { formatTime } from "../../common/util.js";
import GroupList from "./../GroupList";
export default {
  props: {
    type: {}
  },
  data() {
    return {
      test_tel: "",
      push_id: "",
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "内容",
          key: "content"
        },
        {
          title: "推送时间",
          key: "push_time",
          render: (h, params) => {
            return h("span", formatTime(params.row.push_time));
          }
        },
        {
          title: "推送类型",
          key: "push_type",
          render: (h, params) => {
            return h("span", this.getPushType(params.row.push_type));
          }
        },
        {
          title: "link_type",
          key: "link_type"
        },
        {
          title: " ",
          key: "action",
          width: 350,
          align: "center",
          render: (h, params) => {
            return h("div", [
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "primary",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "5px",
              //       display: params.row.push_type == 1 ? "inline-block" : "none"
              //     },
              //     on: {
              //       click: () => {
              //         this.pushMessage(params.row._id.$oid);
              //       }
              //     }
              //   },
              //   "推送"
              // ),
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
                      //this.formValidate = this.formateRow(params.row);
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
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem("messageId", params.row._id.$oid);
                      this.userGroupModalShow = true;
                    }
                  }
                },
                "添加进分组"
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
      pushTime: "",
      userGroupModalShow: false
    };
  },
  components: {
    GroupList
  },
  mounted() {
    this.getMessageList();
  },
  methods: {
    pushMessage(messageId) {
      this.axios
        .get(
          `${
            process.env.YINGCHUN
          }/v3/push/sms_notifica_push/?push_type=1&push_id=${messageId}`
        )
        .then(res => {
          this.$Message.success("删除成功");
          this.getMessageList();
        });
    },
    pushSms() {
      this.axios
        .get(
            `${process.env.YINGCHUN}/v3/push/sms_notifica_push/?test_tel=${
            this.test_tel
          }&push_type=2&push_id=${this.push_id}`
        )
        .then(res => {
          this.$Message.success("推送成功");
        });
    },
    addMessageIntoGroup(messageId, groupKey) {
      this.axios
        .get(
          `${
            process.env.YINGCHUN
          }/v3/users/grouping/add_message_group/?message_id=${messageId}&group_keys=${groupKey}`
        )
        .then(res => {
          this.$Message.success("添加成功");
          this.getMessageList();
        });
    },
    getGroupRes(key) {
      this.userGroupModalShow = false;
      this.messageId = localStorage.getItem("messageId");
      this.addMessageIntoGroup(this.messageId, key);
      console.log(key);
    },

    getPushType(v) {
      switch (v) {
        case 0:
          return "站内信";
          break;
        case 1:
          return "站外消息";
          break;
        case 2:
          return "短信";
          break;
      }
    },
    remove(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        onOk: () => {
          this.axios
            .get(
              `${process.env.YINGCHUN}/v3/message/del_message/?message_id=${
                row._id.$oid
              }`
            )
            .then(res => {
              this.$Message.success("删除成功");
              this.getMessageList();
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
        .post(`${process.env.YINGCHUN}/v1/upload_material/`, formdata, {
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
      this.getMessageList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getMessageList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getMessageList();
    },
    getMessageList() {
      this.tableLoading = true;
      this.axios
        .get(
          `${process.env.YINGCHUN}/v3/message/show_message/?page=${
            this.page
          }&size=${this.pageSize}`
        )
        .then(res => {
          this.tableLoading = false;
          if (res.data && res.data.length > 0) {
            this.dataList = res.data;
          } else {
            this.dataList = [];
          }

          this.total = res.paging.total;
        });
      return;

      //var url = `${process.env.YINGCHUN}/v1/new_question/get_many/?type=${this.type}&questionBank=&page=${this.page}&size=${this.pageSize}`;
      this.axios.get(url).then(res => {
        this.tableLoading = false;
        if (res.data && res.data.length > 0) {
          this.dataList = res.data[0].question_data;
        } else {
          this.dataList = [];
        }

        this.total = res.total;
      });
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      newRow.game_id = newRow.game_id.join();
      return newRow;
    },
    getProductDetail(id) {
      this.axios.get(process.env.YINGCHUN + "/v1/goods?id=" + id).then(res => {
        this.tableLoading = false;
        this.getMessageList();
      });
    },
    delete(id) {
      this.axios
        .get(process.env.YINGCHUN + "/v1/new_question/deleted/?_id=" + id)
        .then(res => {
          this.getMessageList();
        });
    },
    createNewBank() {
      this.modalCoverShow = false;
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.formValidate = {
        content: "rrr",
        instrument_type: "-1",
        push_time: 1568768400,
        push_type: "1",
        title: "ccc"
      };
      this.modalShow = true;
      this.modalStatus = "create";
      //上线记得删除
      //   if(localStorage.getItem('wang')){
      //       this.formValidate = JSON.parse(localStorage.getItem('form')) || {}
      //   }
    },
    handleSubmit(name) {
      if (this.modalStatus == "create") {
        this.formValidate.push_time = this.pushTime / 1000;
        //console.log(this.formValidate)
        //return
        this.axios
          .post(
            `${process.env.YINGCHUN}/v3/message/add_message/`,
            this.formValidate
          )
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getMessageList();
          });
      } else {
        //var param = this.formatForm();
        //console.log('zzz')
        //return
        this.axios
          .get(
            `${
              process.env.YINGCHUN
            }/v3/users/grouping/update_group_name/?group_name=${
              this.formValidate.group_name
            }&group_keys=${this.formValidate.group_keys}`
          )
          .then(res => {
            //this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getMessageList();
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







