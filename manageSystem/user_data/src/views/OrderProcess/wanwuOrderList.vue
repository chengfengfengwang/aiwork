<template>
  <div>
    <div class="table_top_tool">
      <span>项目：</span>
      <Select style="width: 160px" v-model="account" placeholder>
        <Option v-for="item in accountList" :key="item.value" :value="item.value">{{item.name}}</Option>
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
     <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>详情</span>
      </p>
      <div>
        <Table  border :columns="modalColumns" :data="modlaDataList"></Table>
      </div>
      <div slot="footer">
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { cutOffStr, formatTime, formatTimeY } from "./../../common/util.js";

export default {
  data() {
    return {
      searchChannel: "",
      startTime: "",
      endTime: "",
      status: '',
      tableLoading: false,
      total: 0,
      page: 0,
      pageSize: 10,
      columns: [
        {
          title: "收件人姓名",
          key: "receiver_name"
        },
        {
          title: "收货电话",
          key: "receiver_phone"
        },
        {
          title: "创建时间",
          key: "create_time"
        },
        {
          title: "地址",
          key: "receiver_address",
          render: (h, params) => {
            return h("div", cutOffStr(params.row.receiver_address,20));
          }
        },
        {
          title: "商品详情",
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
                    marginRight: "5px",
                    //display: this.editShow ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      this.modalShow = true;
                      this.modlaDataList = params.row.items;
                    }
                  }
                },
                "详情"
              )
            ]);
          }
        }
      ],
      account: "",
      accountList: [
        {
          name: "音乐荚",
          value: 0
        },
        {
          name: "大礼包",
          value: 1
        }
      ],
      statusList: [
        {
          name: "未发货",
          value: 1
        },
        {
          name: "部分发货",
          value: 2
        },
        {
          name: "全部发货",
          value: 3
        }
      ],
      channelList: [],
      dataList: [],
      phone: "",
      modalShow:false,
      modlaDataList:[],
      modalColumns:[
        {
          title: "sku",
          key: "outer_id"
        },
        {
          title: "课程",
          key: "title"
        },
        {
          title: "数量",
          key: "num"
        },
        {
          title: "价格",
          key: "cost_price",
        },
        {
          title: "数量",
          key: "num"
        },
         {
          title: "规格",
          key: "ship_city_property"
        },
      ]
    };
  },
  mounted() {
    //this.getTableList();
    //this.getChannels();
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
        account: this.account,
        start_time: this.startTime.valueOf() / 1000,
        end_time: this.endTime.valueOf() / 1000,
        status: this.status,
        page: this.page,
        size: this.pageSize
      };
      this.axios
        .post(`${process.env.WULIU}/third/wanwu/get_wanwu_all`, formObj)
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data;
        });
    }
  }
};
</script>
