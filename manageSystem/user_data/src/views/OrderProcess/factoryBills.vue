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
          title: "厂商名称",
          key: "vendor_name"
        },
        {
          title: "公司名称",
          key: "company_name"
        },
        {
          title: "乐器名称",
          key: "goods_name"
        },
        {
          title: "乐器规格",
          key: "spec_2"
        },
        {
          title: "乐器颜色",
          key: "spec_1"
        },
         {
          title: "商品单价",
          key: "price",
          render: (h, params) => {
            return h("div", params.row.price / 100);
          }
        },
         {
          title: "商品数量",
          key: "count"
        },
        {
          title: "实际支出",
          key: "real_expend",
          render: (h, params) => {
            return h("div", params.row.real_expend / 100);
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
        .post(`${process.env.WULIU}/order/statistics/vendor`, formObj)
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.list;
        });
    }
  }
};
</script>

