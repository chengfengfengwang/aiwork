<template>
  <div>
    <div class="table_top_tool">
      <span>渠道：</span>
      <Select v-model="searchChannel" placeholder="选择渠道" style="width:200px">
        <Option v-for="item in channelList" :key="item.id" :value="item.id">{{item.name}}</Option>
      </Select>
      <span>状态：</span>
      <Select style="width: 160px" v-model="status" placeholder>
        <Option
          v-for="status in statusList"
          :key="status.value"
          :value="status.value"
        >{{status.name}}</Option>
      </Select>
      <span>开始时间</span>
      <DatePicker v-model="startTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      <span>结束时间</span>
      <DatePicker v-model="endTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      <span>手机号</span>
      <Input style="width:150px" v-model="phone" placeholder="输入手机号"></Input>
      <Button type="primary" @click="getTableList">搜索</Button>
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
  </div>
</template>
<script>
import { formatTime, formatTimeY } from "./../../common/util.js";

export default {
  data() {
    return {
      searchChannel: "",
      startTime: "",
      endTime: "",
      status: 3,
      tableLoading: false,
      total: 0,
      page: 0,
      pageSize: 10,
      columns: [
        // {
        //   title: "name",
        //   key: "name"
        // },
        {
          title: "渠道",
          key: "channel_id",
          render: (h, params) => {
            return h("div", this.findChannel(params.row.channel_id));
          }
        },
        {
          title: "username",
          key: "username"
        },
        {
          title: "province",
          key: "province"
        },
        {
          title: "city",
          key: "city"
        },
        {
          title: "收货电话",
          key: "receive_phone"
        },
        {
          title: "创建时间",
          key: "create_time",
          render: (h, params) => {
            return h("div", formatTime(params.row.create_time));
          }
        }
        // {
        //   title: " ",
        //   key: "action",
        //   minWidth: 50,
        //   width: 300,
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       // h(
        //       //   "Button",
        //       //   {
        //       //     props: {
        //       //       type: "info",
        //       //       size: "small"
        //       //     },
        //       //     style: {
        //       //       marginRight: "5px"
        //       //     },
        //       //     on: {
        //       //       click: () => {
        //       //         this.uploadModalShow = true;
        //       //         this.curChannelId = params.row.id;
        //       //       }
        //       //     }
        //       //   },
        //       //   "上传"
        //       // ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "success",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px",
        //             display: this.editShow ? "inline-block" : "none"
        //           },
        //           on: {
        //             click: () => {
        //               localStorage.setItem("channelId", params.row.id);
        //               localStorage.setItem("channelName", params.row.name);
        //               this.$router.push("/goodsPackage");
        //             }
        //           }
        //         },
        //         "sku"
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "info",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px",
        //             display: this.editShow ? "inline-block" : "none"
        //           },
        //           on: {
        //             click: () => {
        //               this.modalShow = true;
        //               this.modalStatus = "edit";
        //               this.formValidate = JSON.parse(
        //                 JSON.stringify(params.row)
        //               );
        //               delete this.formValidate._index;
        //               delete this.formValidate._rowKey;
        //             }
        //           }
        //         },
        //         "编辑"
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "error",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px",
        //             display: this.editShow ? "inline-block" : "none"
        //           },
        //           on: {
        //             click: () => {
        //               var that = this;
        //               this.$Modal.confirm({
        //                 title: "警告",
        //                 content: "确定要删除吗？",
        //                 onOk() {
        //                   that.remove(params.row.id);
        //                 }
        //               });
        //             }
        //           }
        //         },
        //         "删除"
        //       )
        //     ]);
        //   }
        // }
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
      phone:''
    };
  },
  mounted() {
    //this.getTableList();
    this.getChannels();
  },
  methods: {
    findChannel(id) {
      var name;
      this.channelList.forEach((e, i) => {
        if (id === e.id) {
          if (id === 0) {
            name = "无";
          } else {
            name = e.name;
          }
        }
      });
      return name;
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
    getChannels() {
      this.axios
        .get(`${process.env.WULIU}/channel/index?page=0&size=999&status=1`)
        .then(res => {
          this.channelList = res.data.list;
        });
    },
    getTableList() {
      const formObj = {
        start_time: this.startTime.valueOf() / 1000,
        end_time: this.endTime.valueOf() / 1000,
        status: this.status,
        channel_id: this.searchChannel,
        phone:this.phone,
        page:this.page,
        pageSize:this.pageSize
      };
      this.axios
        .post(`${process.env.WULIU}/order/system/index`, formObj)
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.list;
        });
    }
  }
};
</script>
