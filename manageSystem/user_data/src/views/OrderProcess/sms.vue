<template>
  <div>
    <div class="table_top_tool">
      <span>状态：</span>
      <Select style="width: 160px" v-model="status" placeholder>
        <Option
          v-for="status in statusList"
          :key="status.value"
          :value="status.value"
        >{{status.name}}</Option>
      </Select>
      <Button type="primary" @click="getTableList">搜索</Button>
      <Button type="success" @click="createNew">新建</Button>
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
        <span>短信模版</span>
      </p>
      <div>
        <Form ref="formValidate" :label-width="100">
          <FormItem label="内容">
            <Input type="textarea" :rows="4" v-model="content"></Input>
            <div>提示：变量采用：${n,m}的格式，匹配n到m个文字，n&lt;m，必填</div>
            <div>示例：你好，这是白模板${1,10}示例</div>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit" type="primary">确定</Button>
        <Button @click="modalShow = false;">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { cutOffStr, formatTime, formatTimeY } from "./../../common/util.js";
export default {
  data() {
    return {
      status: 2,
      tableLoading: false,
      total: 0,
      page: 0,
      pageSize: 10,
      columns: [
        {
          title: "内容",
          key: "content"
        },
        {
          title: "状态",
          key: "state"
        },
        {
          title: "描述",
          key: "desc"
        },
        {
          title: "创建时间",
          key: "create_time",
          render: (h, params) => {
            return h("div", formatTime(params.row.create_time));
          }
        }
        // {
        //   title: "地址",
        //   key: "receiver_address",
        //   render: (h, params) => {
        //     return h("div", cutOffStr(params.row.receiver_address,20));
        //   }
        // },
        // {
        //   title: "商品详情",
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
        //             //display: this.editShow ? "inline-block" : "none"
        //           },
        //           on: {
        //             click: () => {
        //               this.modalShow = true;
        //             }
        //           }
        //         },
        //         "详情"
        //       )
        //     ]);
        //   }
        // }
      ],
      dataList: [],
      modalShow: false,
      content: "", 
      statusList:[
        {
          name:'未审核',
          value:0
        },
        {
          name:'审核过',
          value:1
        },
        {
          name:'全部',
          value:2
        },
      ]
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    handleSubmit() {
      this.createSms();
      //   if (this.modalStatus == "edit") {
      //     this.updateAudio();
      //   } else {
      //     this.createAudio();
      //   }
    },
    createSms() {
      this.axios 
        .post(`${process.env.SMS}/sms/create`, {
          content: this.content
        })
        .then(res => {
          this.modalShow = false;
          this.getTableList();
        });
    },
    createNew() {
      this.formValue = {};
      this.modalShow = true;
      this.modalStatus = "create";
    },
    pageChange(page) {
      this.page = page - 1;
      this.getTableList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getTableList();
    },
    getTableList() {
      this.tableLoading = true;
      this.axios
        .get(
          `${process.env.SMS}/sms/index?page=${this.page}&size=${
            this.pageSize
          }&status=${this.status}`
        )
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.list;
        });
    }
  }
};
</script>
