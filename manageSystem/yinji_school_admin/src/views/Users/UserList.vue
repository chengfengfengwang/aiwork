<template>
  <div>
    <div class="table_top_tool">
      <!-- <Button type="primary" @click="createNewAc" style="margin-right:30px">新建</Button> -->
      <span>手机号：</span>
      <Input v-model="tel" placeholder="输入手机号" style="width: 200px"/>
      <Select v-model="is_pay" placeholder="是否付费" style="width:200px">
        <Option value="true">是</Option>
        <Option value="false">否</Option>
      </Select>
      <DatePicker @on-change="daterangeChange" v-model="daterange" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px"></DatePicker>
      <Button type="info" @click="getTableData" style="margin-right:2px">搜索</Button>
      <Button type="info" @click="resetTableData" style="margin-right:10px">重置</Button>
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
import { formatTime } from "./../../common/util.js";
export default {
  data() {
    return {
      tel: "",
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "序号",
          key: "rank"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "昵称",
          key: "nickname"
        },
        {
          title: "id",
          key: "id"
        },
        {
          title: "注册时间",
          key: "reg_time",
          render: (h, params) => {
            return h("span", formatTime(params.row.reg_time));
          }
        },
        {
          title: "最后登录时间",
          key: "last_start_time",
          render: (h, params) => {
            return h("span", params.row.last_start_time ? formatTime(params.row.last_start_time) : '');
          }
        },
        {
          title: "备注",
          key: "remark"
        },
        // {
        //   title: "开始时间",
        //   key: "goods_name",
        //   render: (h, params) => {
        //     return h("span", params.row.start_time == 0 ? '' : formatTime(params.row.start_time));
        //   }
        // },
        // {
        //   title: "结束时间",
        //   key: "goods_name",
        //   render: (h, params) => {
        //     return h("span", params.row.end_time == 0 ? '' : formatTime(params.row.end_time));
        //   }
        // },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          //width: 130,
          //maxWidth: 300,
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
                      this.$router.push("/userDetail");
                      localStorage.setItem("uid", "400368173");
                    }
                  }
                },
                "查看详情"
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
      activityId: "",
      searchOrder: "",
      instrumentList: [
        {
          name: "吉他",
          value: 0
        },
        {
          name: "尤克里里",
          value: 1
        },
        {
          name: "卡林巴",
          value: 2
        },
        {
          name: "非洲鼓",
          value: 3
        },
        {
          name: "钢琴",
          value: 4
        }
      ],
      userDate: [],
      start_time: "",
      end_time: "",
      user_create_time: "",
      user_end_time: "",
      is_pay: "",
      start_time: 0,
      end_time: 1567410490,
      daterange:''

    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    daterangeChange(v){
      this.start_time = parseInt(new Date(v[0]).valueOf()/1000);
      this.end_time = parseInt(new Date(v[1]).valueOf()/1000);
    },
    resetTableData() {
      this.tel = "";
      this.is_pay = "";
      this.getTableData();
    },
    search() {
      this.axios
        .get(
          `${process.env.JINKANG}/v3/activity/single/?activity_id=${
            this.activityId
          }`
        )
        .then(res => {
          this.tableLoading = false;
          if (res.data) {
            this.dataList = [];
            this.dataList.push(res.data);
          } else {
            this.dataList = [];
          }

          this.total = res.total;
        });
    },
    pageChange(page) {
      this.page = page - 1;
      this.getTableData();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getTableData();
    },
    getTableData() {
      this.tableLoading = true;
      this.activityId = "";
      if (this.activityId) {
        this.page = 0;
      }
      this.axios
        .get(
          `${process.env.YINGCHUN}/v3/users/grouping/show_user_many/?page=${
            this.page
          }&pageSize=${this.pageSize}&tel=${this.tel}&is_pay=${this.is_pay}&start_time=${this.start_time}&end_time=${this.end_time}`
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
    },
    delete(id) {
      this.axios
        .get(
          process.env.process.env.JINKANG +
            "/v1/new_question/deleted/?_id=" +
            id
        )
        .then(res => {
          this.getTableData();
        });
    }
  }
};
</script>