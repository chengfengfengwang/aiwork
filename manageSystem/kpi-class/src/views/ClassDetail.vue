<template>
  <div>
    <h1 style="text-align:center">{{classData.length>0?classData[0].class_name:''}}</h1>
    <div style="margin-bottom:5px">
      <span>筛选：</span>
      <DatePicker
        type="daterange"
        placement="bottom-end"
        placeholder="按日期筛选"
        style="width: 200px"
        @on-change="timeSelectChange"
      ></DatePicker>
    </div>

    <Table
      :loading="tableLoading"
      ref="mytable"
      class="mytable"
      :columns="columns1"
      :data="classData"
    ></Table>
    <Table
      style="margin-top:50px"
      :loading="tableLoading"
      class="mytable"
      :columns="columns2"
      :data="studentsData"
    ></Table>
  </div>
</template>
<script>
import { getDate, tableColumnsFilter } from "./../common/util.js";
export default {
  data() {
    return {
      classId: "",
      classData: [],
      tableLoading: true,
      columns1: [
        {
          title: "入群人数",
          key: "group_length",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    //color: params.row.data ? "blue" : "",
                    cursor: "pointer"
                  }
                },
                params.row.data
                  ? params.row.data.length
                  : params.row.group_length
              )
            ]);
          }
        },
        {
          title: "初级毕业人数",
          key: "one_graduated",
          className: "cover_row"
        },
        {
          title: "中级毕业人数",
          key: "two_graduated"
        },
        {
          title: "复购人数",
          key: "fugou_persons"
        },
        {
          title: "复购订单数",
          key: "fugou_order_count"
        },
        {
          title: "复购总金额 (元)",
          key: "fugou_total_price",
          permission:0,
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                params.row.fugou_total_price > 0
                  ? params.row.fugou_total_price / 100
                  : params.row.fugou_total_price
              )
            ]);
          }
        },
        {
          title: "订单总金额 (元)",
          key: "total_price",
          permission:0,
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                params.row.total_price > 0
                  ? params.row.total_price / 100
                  : params.row.total_price
              )
            ]);
          }
        },
        {
          title: "备注",
          key: "describe",
          width: 350
        },
      ],
      columns2: [
        {
          title: "用户",
          key: "user",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    color: params.row.data ? "blue" : "",
                    cursor: "pointer"
                  }
                },
                params.row.user.user_name
              )
            ]);
          }
        },
        {
          title: "手机号",
          key: "user",
          render: (h, params) => {
            var fakePhone =
              params.row.user.phone.slice(0, 3) +
              Array.apply(null, { length: 5 })
                .map(function() {
                  return "*";
                })
                .join("") +
              params.row.user.phone.slice(-3);
            return h("div", [
              h(
                "div",
                {
                  style: {
                    color: params.row.data ? "blue" : "",
                    cursor: "pointer"
                  }
                },
                this.$store.getters.permission == 0
                  ? params.row.user.phone
                  : fakePhone
              )
            ]);
          }
        },
        {
          title: "购买信息",
          key: "payments",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    color: params.row.data ? "blue" : "",
                    cursor: "pointer"
                  }
                },
                // [
                //   h("div", "一则头条"),
                //   h("div", "er则头条"),
                // ]
                params.row.payments.map(e =>
                  h("div", `${e.goods}---${getDate(e.time)}`)
                )
              )
            ]);
          }
        },
        {
          title: "购买数量",
          key: "payments_amount",
          render: (h, params) => {
            return h("div", [h("div", params.row.payments.length)]);
          }
        },
        {
          title: "总金额 (元)",
          key: "total_amount",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                params.row.total_amount > 0
                  ? params.row.total_amount / 100
                  : params.row.total_amount
              )
            ]);
          }
        }
      ],
      studentsData: []
    };
  },
  mounted() {
    this.classId = localStorage.getItem("curClassId");
    this.getClassDetail();
    //订单总金额是管理员可见
    tableColumnsFilter.call(this,this.columns1)
  },
  methods: {
    timeSelectChange(value) {
      this.getClassDetail(this.classData.class_id, value[0], value[1]);
    },
    getClassDetail(id = this.classId, b = "", e = "") {
      this.tableLoading = true;
      this.axios
        .get(
          `${
            process.env.XIAOPO_SEARCH
          }/v3/wechat/get_class_payment_data?class_id=${id}&b=${b}&e=${e}`
        )
        .then(res => {
          //return
          this.tableLoading = false;
          //this.$Message.success("数据更新成功啦");
          this.classData.push(res);
          this.studentsData = res.data;
        });
    }
  }
};
</script>
