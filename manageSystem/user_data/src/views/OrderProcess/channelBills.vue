<template>
  <div>
    <div class="table_top_tool">
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
          title: "渠道",
          key: "channel_name"
        },
        {
          title: "公司名称",
          key: "company_name"
        },
        {
          title: "合同类型",
          key: "pay_way"
        },
        {
          title: "商品规格",
          key: "goods_name"
        },
        {
          title: "团购价格",
          key: "group_price",
          render: (h, params) => {
            return h("div", params.row.group_price / 100);
          }
        },
        {
          title: "供货价格",
          key: "supply_price",
          render: (h, params) => {
            return h("div", params.row.supply_price / 100);
          }
        },
        {
          title: "采购数量",
          key: "all_count"
        },
        {
          title: "交货数量",
          key: "done_coune"
        },
         {
          title: "未交货数量",
          key: "not_count"
        },
        {
          title: "营收款",
          key: "income_money",
          render: (h, params) => {
            return h("div", params.row.income_money / 100);
          }
        },
         {
          title: "供货结算",
          key: "supply_money",
          render: (h, params) => {
            return h("div", params.row.supply_money / 100);
          }
        },
        {
          title: "返佣比例",
          key: "bro_percent"
        },
        {
          title: "佣金",
          key: "commission",
          render: (h, params) => {
            return h("div", params.row.commission / 100);
          }
        },
        {
          title: "实际收入",
          key: "reality_money",
          render: (h, params) => {
            return h("div", params.row.reality_money / 100);
          }
        },
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
      dataList: []
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
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
      const formObj = {
        start_time: this.startTime.valueOf() / 1000,
        end_time: this.endTime.valueOf() / 1000
      };
      this.axios
        .post(`${process.env.WULIU}/order/statistics/channel`, formObj)
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.list;
        });
    }
  }
};
</script>

