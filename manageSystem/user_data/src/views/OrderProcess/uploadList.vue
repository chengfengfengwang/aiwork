<template>
  <div>
    <Breadcrumb style="margin-bottom:10px">
      <BreadcrumbItem v-show="upItemName==='channel'" to="/channels">渠道</BreadcrumbItem>
      <BreadcrumbItem v-show="upItemName==='factory'" to="/instrumentFactory">厂商</BreadcrumbItem>
      <BreadcrumbItem v-show="upItemName==='channel'">{{channelName}}</BreadcrumbItem>
      <BreadcrumbItem v-show="upItemName==='factory'">{{factoryName}}</BreadcrumbItem>
    </Breadcrumb>
    <div class="table_top_tool">
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
      <Button type="primary" @click="getUploadList">搜索</Button>
    </div>

    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <Modal v-model="detailModalShow" width="760" :mask-closable="false">
      <p slot="header" style>
        <span>详情数据</span>
      </p>
      <Table border :columns="detailColumns" :data="detailList"></Table>
      <div slot="footer">
        <Button @click="detailModalShow=false">关闭</Button>
      </div>
    </Modal>
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
import { formatTime, formatTimeOnlyDate } from "./../../common/util.js";

export default {
  data() {
    return {
      searchChannel: "",
      startTime: "",
      endTime: "",
      status: -1,
      tableLoading: false,
      total: 0,
      page: 0,
      pageSize: 10,
      columns: [
        {
          title: "excel名称",
          key: "file_name"
        },
        {
          title: "上传时间",
          key: "create_time",
          render: (h, params) => {
            return h("div", formatTime(params.row.create_time));
          }
        },
        {
          title: "处理状态",
          key: "status_msg"
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
                      this.modalShow = true;
                      //this.modalStatus = "edit";
                      this.getDetail(params.row.id);
                    }
                  }
                },
                "详情"
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
          value: -1
        }
      ],
      channelList: [],
      dataList: [],
      upItemName: localStorage.getItem("upItemName"),
      channelName: localStorage.getItem("channelName"),
      channelId: localStorage.getItem("channelId"),
      factoryName: localStorage.getItem("factoryName"),
      factoryId: localStorage.getItem("factoryId"),
      detailList: [],
      detailColumns: [
        {
          title: "序号",
          key: "create_time",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  width: "25px",
                }
              },
              params.index + 1
            );
          }
        },
        {
          title: "渠道",
          key: "channel_name"
        },
        {
          title: "sku",
          key: "name"
        },
         {
          title: "姓名",
          key: "username"
        },
         {
          title: "地址",
          key: "address"
        },
        {
          title: "开课手机号",
          key: "app_account"
        },
        {
          title: "收件人手机号",
          key: "receive_phone"
        },
        {
          title: "快递公司",
          key: "courier_name"
        },
         {
          title: "快递单号",
          key: "courier_number"
        },
        {
          title: "创建时间",
          key: "create_time"
        },
        {
          title: "处理状态",
          key: "msg"
        }
      ],
      detailModalShow: false
    };
  },
  mounted() {
    this.getUploadList();
  },
  methods: {
    getDetail(id) {
      this.axios
        .post(`${process.env.WULIU}/form/order/query`, {
          id
        })
        .then(res => {
          this.detailList = res.data.list;
          this.detailModalShow = true;
        });
    },
    getUploadList() {
      this.axios
        .post(`${process.env.WULIU}/form/history/index`, {
          start_time: this.startTime.valueOf() / 1000,
          end_time: this.endTime.valueOf() / 1000,
          status: this.status,
          id:
            this.upItemName === "channel"
              ? Number(this.channelId)
              : Number(this.factoryId),
          page: 0,
          size: 999,
          type: this.upItemName === "channel" ? 0 : 1
        })
        .then(res => {
          this.dataList = res.data.list;
        });
    },
    pageChange(page) {
      this.page = page - 1;
      this.getUploadList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getUploadList();
    }
  }
};
</script>
