<template>
  <div>
    <!-- <span>渠道：</span>
    <Select v-model="searchChannel" placeholder="选择渠道" style="width:200px">
      <Option v-for="item in channelList" :key="item.id" :value="item.id">{{item.name}}</Option>
    </Select>
    <span>状态：</span>
    <Select style="width: 160px" v-model="status" placeholder>
      <Option v-for="status in statusList" :key="status.value" :value="status.value">{{status.name}}</Option>
    </Select>
    <span>开始时间</span>
    <DatePicker v-model="startTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
    <span>结束时间</span>
    <DatePicker v-model="endTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
    <Button type="primary" @click="getTableList">搜索</Button>-->
    <Button type="primary" @click="createNew">新建</Button>
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
          title: "名称",
          key: "title"
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
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                  },
                  on: {
                    click: () => {
                      localStorage.setItem("tpId", params.row.id);
                      localStorage.setItem("tpTitle", params.row.title);
                      localStorage.setItem("tpData", params.row.data);
                      localStorage.setItem("tpStatus", 'edit');
                      this.$router.push("/tpDetail");
                    }
                  }
                },
                "详情"
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
    //this.getChannels();
  },
  methods: {
      createNew(){
          localStorage.setItem("tpStatus", 'create');
                      this.$router.push("/tpDetail");
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
        channel_id: this.searchChannel
      };
      this.axios
        .get(
          `http://api.yinji.immusician.com/v1/materials/pre_guides?page=${
            this.page
          }&size=${this.pageSize}`
        )
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data;
        });
    }
  }
};
</script>

