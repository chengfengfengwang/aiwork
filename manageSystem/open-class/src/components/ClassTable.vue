<template>
  <div class="mytable_wrapper">
    <div class="table_title">
      <h1>{{classData.class_name}}</h1>
      <h2 class="create_time">
        <span>创建时间：{{classData.class_created | formateTime}}</span>
        <span class="duraing">时长记录：{{classData.class_duration | stampToDay}}天</span>
      </h2>
    </div>

    <div class="tool_row">
      <DatePicker
        type="daterange"
        placement="bottom-end"
        placeholder="按日期筛选"
        style="width: 200px"
        @on-change="timeSelectChange"
      ></DatePicker>
      <!-- <Button style="margin-left:10px">导出数据</Button> -->
    </div>
    <Table
      :loading="tableLoading"
      ref="mytable"
      class="mytable"
      :columns="columns1"
      :data="classTableData"
    ></Table>
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>编辑</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="备注">
            <Input
              v-model="formValidate.describe"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="输入备注"
            ></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow = false;">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { formatTime, tableColumnsFilter } from "./../common/util.js";
import { mapGetters } from "vuex";
export default {
  props: {
    myclass: {}
  },
  data() {
    return {
      classData: this.myclass,
      tableLoading: false,
      modalShow: false,
      formValidate: {},
      curRow: {},
      columns1: [
        {
          title: "入群人数",
          key: "day_jcount",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    color: "blue",
                    cursor: "pointer"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem("curClassId", params.row.class_id);
                      this.$router.push({
                        name: "ClassDetail"
                      });
                    }
                  }
                },
                params.row.day_jcount
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
          title: "初级毕业率",
          key: "one_graduated_rate",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                params.row.day_jcount === 0
                  ? 0
                  : Math.round(
                      (params.row.one_graduated / params.row.day_jcount) * 10000
                    ) /
                      100 +
                      "%"
              )
            ]);
          }
        },
        {
          title: "中级毕业率",
          key: "two_graduated_rate",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                params.row.day_jcount === 0
                  ? 0
                  : Math.round(
                      (params.row.two_graduated / params.row.day_jcount) * 10000
                    ) /
                      100 +
                      "%"
              )
            ]);
          }
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
          //permission: 0,
          key: "fugou_total_price",
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
          //permission: 0,
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
        // {
        //   title: "备注",
        //   key: "describe",
        //   'max-width': 50
        // },
        {
          title: " ",
          key: "action",
         // minWidth: 50,
          align: "center",
          render: (h, params) => {
            //if (this.role === 0) {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modalShow = true;
                      this.curRow = params.row;
                      this.formValidate = params.row;
                      this.modalStatus = "edit";
                    }
                  }
                },
                "编辑备注"
              )
            ]);
            //}
          }
        }
      ]
    };
  },
  computed: {
    classTableData: function() {
      var arr = [];
      arr.push(this.classData);
      return arr;
    },
    ...mapGetters(["permission"])
  },
  mounted() {
    this.$nextTick(function() {
      this.insertRow();
    });
    tableColumnsFilter.call(this, this.columns1);
  },
  methods: {
    handleSubmit() {
      // return;
      this.axios
        .post(
          `${process.env.XIAOPO}/v3/wechat/class/${this.curRow.class_id}/`,
          { describe: this.formValidate.describe }
        )
        .then(res => {
          this.modalShow = false;
        });
    },
    timeSelectChange(value) {
      this.getClassDetail(this.classData.class_id, value[0], value[1]);
    },
    getClassDetail(id, b, e) {
      this.tableLoading = true;
      this.axios
        .get(
          `${
            process.env.XIAOPO_SEARCH
          }/v3/wechat/get_class_payment_data?class_id=${id}&b=${b}&e=${e}`
        )
        .then(res => {
          this.classData = res;
          this.tableLoading = false;
          this.$Message.success("数据更新成功啦");
          //this.classList = res.data;
          //this.loadingShow = false
        });
    },
    insertRow() {
      var table = this.$refs.mytable.$el;
      var tbody = table.querySelector("tbody");

      var tr = document.createElement("tr");
      tr.setAttribute("class", "insert_tr");

      //if (this.permission === 0) {
        tr.innerHTML = `
      <td>有赞</td>
      <td colspan="100">
        <span style="margin-right:100px">复购人数：${
          this.classData.youzan_fugou_persons
        }</span>
        <span style="margin-right:100px">复购金额：${this.classData
          .youzan_fugou_price / 100}</span>
        <span style="margin-right:100px">订单数量：${this.classData.youzan_order_count}</span>
        <span style="margin-right:100px">订单金额：${this.classData
          .youzan_price / 100}</span>
      </td>`;
      // } else {
      //   tr.innerHTML = `
      // <td>有赞</td>
      // <td colspan="100">
      //   <span style="margin-right:100px">复购人数：${
      //     this.classData.youzan_fugou_persons
      //   }</span>
      //   <span>订单数量：${this.classData.youzan_order_count}</span>
      // </td>`;
      // }

      tbody.appendChild(tr);

      var tr = document.createElement("tr");
      tr.setAttribute("class", "insert_tr");

      //if (this.permission === 0) {
        tr.innerHTML = `
      <td>淘宝</td>
      <td colspan="80">
         <span style="margin-right:100px">复购人数：${
           this.classData.taobao_fugou_persons
         }</span>
         <span style="margin-right:100px">复购金额：${this.classData
           .taobao_fugou_price / 100}</span>
         <span style="margin-right:100px">订单数量：${this.classData.taobao_order_count}</span>
         <span style="margin-right:100px">订单金额：${this.classData
          .taobao_price / 100}</span>
        </td>`;
      // } else {
      //   tr.innerHTML = `
      // <td>淘宝</td>
      // <td colspan="80">
      //    <span style="margin-right:100px">复购人数：${
      //      this.classData.taobao_fugou_persons
      //    }</span>
      //    <span>订单数量：${this.classData.taobao_order_count}</span>
      //   </td>`;
      // }

      tbody.appendChild(tr);

      var tr = document.createElement("tr");
      tr.setAttribute("class", "insert_tr");
      tr.innerHTML = `
      <td colspan="100">
         <span style="margin-right:100px">备注：${
           this.classData.describe
         }</span>
        </td>`;
      tbody.appendChild(tr);
    }
  }
};
</script>
<style lang="less">
.mytable_wrapper {
  position: relative;
  text-align: center;
  margin-top: 50px;
  margin-bottom: 70px;
  table {
    font-size: 14px;
  }
  .table_title {
    text-align: center;
    .create_time {
      text-align: right;
      margin: 10px 0 20px 0;
      .duraing {
        margin-left: 40px;
        margin-right: 30px;
      }
    }
  }
  .tool_row {
    position: absolute;
    top: 45px;
    left: 0;
  }
}
.mytable {
  font-size: 14px;
}
.insert_tr {
  td {
    padding: 0 19px;
  }
}
</style>


