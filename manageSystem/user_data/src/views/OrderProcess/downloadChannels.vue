<template>
  <div>
    <div class="table_top_tool">
      <span>渠道：</span>
      <Select
        @on-change="channelChange"
        style="width: 160px"
        v-model="channelId"
        filterable
        placeholder
      >
        <Option
          v-for="channel in channelList"
          :key="channel.id"
          :value="channel.id"
        >{{channel.name}}</Option>
      </Select>
      <span>sku：</span>
      <Select v-model="skuName" style="width: 160px" filterable>
        <Option v-for="item in skuList" :value="item.name" :key="item.name">{{ item.show_name }}</Option>
      </Select>
      <span>开始时间</span>
      <DatePicker v-model="startTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      <span>结束时间</span>
      <DatePicker v-model="endTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      <Button type="primary" @click="getTableList(0)">搜索</Button>
      <Button type="success" @click="downloadTableList">下载</Button>
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
          title: "渠道名称",
          key: "channel_name"
        },
        {
          title: "公司名称",
          key: "company_name"
        },
        {
          title: "返佣类型",
          key: "pay_way"
        },
        {
          title: "商品名称",
          key: "goods_name"
        },
        {
          title: "数量",
          key: "all_count"
        },
        {
          title: "数量(去重)",
          key: "set_count"
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
          title: "返佣比例",
          key: "bro_percent"
        }
      ],

      channelList: [],
      dataList: [],
      skuList: [],
      channelId: "",
      skuName: ""
    };
  },
  created() {
    this.getChannelList();
  },
  mounted() {
    //this.getTableList();
  },
  methods: {
    channelChange() {
      this.skuName = "";
      this.getSkuList();
    },
    getSkuList(channel_id = this.channelId) {
      if (!channel_id) {
        return;
      }

      this.axios
        .get(
          `${
            process.env.WULIU
          }/fgoods/index?page=0&size=9999&status=1&channel_id=${channel_id}`
        )
        .then(res => {
          this.skuList = res.data.list;
          this.skuList.unshift({
            name:'全部',
            id:-1
          })
        });
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
    getChannelList() {
      this.axios
        .get(`${process.env.WULIU}/channel/index?page=0&size=999&status=1`)
        .then(res => {
          this.tableLoading = false;
          this.channelList = res.data.list;
        });
    },
    downloadTableList() {
      this.getTableList(1);
    },
    getTableList(need_down) {
      if (!need_down) {
        need_down = 0;
      }
      const formObj = {
        name: this.skuName=='全部'?'':this.skuName,
        channel_id: this.channelId,
        need_down: need_down,
        start_time: this.startTime.valueOf() / 1000,
        end_time: this.endTime.valueOf() / 1000
      };
      console.log(formObj);
      //return
      this.axios
        .post(`${process.env.WULIU}/order/statistics/channel_form`, formObj)
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.data_list;
          if (res.data.down_url) {
            window.open(res.data.down_url, "_blank");
          }
        });
    }
  }
};
</script>

