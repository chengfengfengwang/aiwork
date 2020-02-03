<template>
  <div>
    <!-- <div class="table_top_tool">
      <span>手机号：</span>
      <Input v-model="tel" placeholder="输入手机号" style="width: 200px"/>
      <Select v-model="is_pay" placeholder="是否付费" style="width:200px">
        <Option value="true">是</Option>
        <Option value="false">否</Option>
      </Select>
      <Button type="info" @click="getTableData" style="margin-right:2px">搜索</Button>
      <Button type="info" @click="resetTableData" style="margin-right:10px">重置</Button>
    </div>-->
    <h1 class="table_title">课程</h1>
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <h1 class="table_title">曲谱</h1>
    <Table :loading="chartTableLoading" border :columns="chartColumns" :data="chartDataList"></Table>
    <!-- <div style="margin-top:10px">
      <Page
        @on-page-size-change="pageSizeChange"
        @on-change="pageChange"
        :total="total"
        :page-size="pageSize"
        show-sizer
        :page-size-opts="[5,10,15,20,30,40]"
        show-elevator
      />
    </div>-->
    <Modal v-model="modalShow" width="860">
      <p slot="header" style>
        <span>编辑</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="120">
          <FormItem label="活动标题">
            <Input v-model="formValidate.title" placeholder></Input>
          </FormItem>
          <FormItem label="活动描述">
            <Input type="textarea" :autosize="true" v-model="formValidate.desc" placeholder></Input>
          </FormItem>
          <FormItem label="活动开始时间">
            <DatePicker
              type="datetime"
              v-model="start_time"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="活动结束时间">
            <DatePicker
              type="datetime"
              v-model="end_time"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="用户注册时间">
            <DatePicker
              type="datetime"
              v-model="user_create_time"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="用户截止时间">
            <DatePicker
              type="datetime"
              v-model="user_end_time"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="是否付费用户">
            <Select style="width: 200px" v-model="formValidate.is_pay" placeholder>
              <Option :value="1">是</Option>
              <Option :value="0">不是</Option>
            </Select>
          </FormItem>
          <FormItem label="是否vip">
            <Select style="width: 200px" v-model="formValidate.is_vip" placeholder>
              <Option :value="1">是</Option>
              <Option :value="0">不是</Option>
            </Select>
          </FormItem>
          <FormItem label="展示课程1">
            <Input v-model="formValidate.course_show1" placeholder></Input>
          </FormItem>
          <FormItem label="展示课程2">
            <Input v-model="formValidate.course_show2" placeholder></Input>
          </FormItem>
          <FormItem label="不展示课程">
            <Input v-model="formValidate.course_not_show" placeholder></Input>
          </FormItem>
          <FormItem label="相关老师id">
            <Input v-model="formValidate.teacher_ids" placeholder></Input>
          </FormItem>
          <FormItem label="发送优惠券id列表">
            <Input v-model="formValidate.coupon_send_list" placeholder></Input>
          </FormItem>
          <FormItem label="禁止优惠券id列表">
            <Input v-model="formValidate.coupon_no_send_list" placeholder></Input>
          </FormItem>
          <FormItem label="活动是否开启">
            <Select style="width: 200px" v-model="formValidate.is_open" placeholder>
              <Option :value="1">是</Option>
              <Option :value="0">不是</Option>
            </Select>
          </FormItem>
          <FormItem label="适用乐器类型">
            <Select multiple v-model="formValidate.instrument_species" placeholder="适用乐器类型">
              <Option
                v-for="(item,index) in instrumentList"
                :key="index"
                :value="item.value"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="弹窗url">
            <Input v-model="formValidate.promotion_url" placeholder></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { formatTime } from "./../../common/util.js";
export default {
  data() {
    return {
      tel: "",
      tableLoading: true,
      chartTableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "乐器",
          key: "instrument_type"
        },
        {
          title: "课程名称",
          key: "course_name"
        },
        {
          title: "点击次数",
          key: "total"
        },
        {
          title: "首次点击时间",
          key: "first_click_time",
          render: (h, params) => {
            return h(
              "span",
              params.row.first_click_time == 0
                ? ""
                : formatTime(params.row.first_click_time)
            );
          }
        },
        {
          title: "最新点击时间",
          key: "last_click_time",
          render: (h, params) => {
            return h(
              "span",
              params.row.last_click_time == 0
                ? ""
                : formatTime(params.row.last_click_time)
            );
          }
        },
        {
          title: "是否试学",
          key: "experience_status",
          render: (h, params) => {
            return h("span", params.row.experience_status ? "是" : "否");
          }
        },
        {
          title: "是否购买",
          key: "purchase_status",
          render: (h, params) => {
            return h("span", params.row.purchase_status ? "是" : "否");
          }
        }
        // {
        //   title: " ",
        //   key: "action",
        //   minWidth: 50,
        //   //width: 130,
        //   //maxWidth: 300,
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "info",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               this.modalShow = true;
        //               this.formValidate = this.formatRow(params.row);
        //               this.modalStatus = "edit";
        //             }
        //           }
        //         },
        //         "查看详情"
        //       )
        //     ]);
        //   }
        // }
      ],
      chartColumns: [
        {
          title: "乐器",
          key: "instrument_type"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "点击次数",
          key: "total"
        },
        {
          title: "首次点击时间",
          key: "first_click_time",
          render: (h, params) => {
            return h(
              "span",
              params.row.first_click_time == 0
                ? ""
                : formatTime(params.row.first_click_time)
            );
          }
        },
        {
          title: "最新点击时间",
          key: "last_click_time",
          render: (h, params) => {
            return h(
              "span",
              params.row.last_click_time == 0
                ? ""
                : formatTime(params.row.last_click_time)
            );
          }
        },
        {
          title: "是否试学",
          key: "experience_status",
          render: (h, params) => {
            return h("span", params.row.experience_status ? "是" : "否");
          }
        },
        {
          title: "是否购买",
          key: "purchase_status",
          render: (h, params) => {
            return h("span", params.row.purchase_status ? "是" : "否");
          }
        }
        // {
        //   title: " ",
        //   key: "action",
        //   minWidth: 50,
        //   //width: 130,
        //   //maxWidth: 300,
        //   align: "center",
        //   render: (h, params) => {
        //     return h("div", [
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "info",
        //             size: "small"
        //           },
        //           style: {
        //             marginRight: "5px"
        //           },
        //           on: {
        //             click: () => {
        //               this.modalShow = true;
        //               this.formValidate = this.formatRow(params.row);
        //               this.modalStatus = "edit";
        //             }
        //           }
        //         },
        //         "查看详情"
        //       )
        //     ]);
        //   }
        // }
      ],
      dataList: [],
      chartDataList: [],
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
      is_pay: ""
    };
  },
  mounted() {
    this.curUid = localStorage.getItem("uid");
    console.log(this.curUid);
    this.getTableData();
    this.getChartTableData();
  },
  methods: {
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
    getChartTableData() {
      this.chartTableLoading = true;
      if (process.env.NODE_ENV === "development") {
        var indicator_id = "5d6c89444a1dd4000ac9146b";
      } else {
        var indicator_id = "5d6dd659ea56aa000d9ffed3";
      }

      this.axios
        .get(
          `${process.env.LIDONG}/v3/get_single_user_statics_info?uid=${
            this.curUid
          }&indicator_id=${indicator_id}`
        )
        .then(res => {
          this.chartTableLoading = false;
          // if(res.data && res.data.length>0){
          //   this.dataList = res.data.;
          // }else{
          //   this.dataList = []
          // }
          this.chartDataList = res.data.info_list;
          //this.total = res.paging.total;
        });
    },
    getTableData() {
      this.tableLoading = true;
      this.activityId = "";
      if (this.activityId) {
        this.page = 0;
      }

      
      if (process.env.NODE_ENV === "development") {
        var indicator_id = "5d663bcf8538bacf6454666c";
      } else {
        var indicator_id = "5d6dd680ea56aa037fe818ef";
      }
      this.axios
        .get(
          `${process.env.LIDONG}/v3/get_single_user_statics_info?uid=${
            this.curUid
          }&indicator_id=${indicator_id}`
        )
        .then(res => {
          this.tableLoading = false;
          // if(res.data && res.data.length>0){
          //   this.dataList = res.data.;
          // }else{
          //   this.dataList = []
          // }
          this.dataList = res.data.info_list;
          //this.total = res.paging.total;
        });
    },
    formatRow(row) {
      var newRow = Object.assign({}, row);
      ["start_time", "end_time"].forEach(e => {
        this[e] = newRow[e] == 0 ? "" : new Date(newRow[e] * 1000);
      });
      this.user_create_time =
        newRow.user_range.create_time == 0
          ? ""
          : new Date(newRow.user_range.create_time * 1000);
      this.user_end_time =
        newRow.user_range.end_time == 0
          ? ""
          : new Date(newRow.user_range.end_time * 1000);
      newRow.is_pay = newRow.user_range.is_pay;
      newRow.is_vip = newRow.user_range.is_vip;
      newRow.teacher_ids = newRow.teacher_ids.join(",");
      newRow.course_show1 = newRow.course_related.show1.join(",");
      newRow.course_show2 = newRow.course_related.show2.join(",");
      newRow.course_not_show = newRow.course_related.not_show.join(",");
      newRow.coupon_send_list = newRow.coupon_related.send.join(",");
      newRow.coupon_no_send_list = newRow.coupon_related.no_send.join(",");
      return newRow;
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
    },
    createNewAc() {
      this.modalCoverShow = false;
      this.formValidate = {};
      ["start_time", "end_time", "user_create_time", "user_end_time"].forEach(
        e => {
          this[e] = "";
        }
      );
      this.modalShow = true;
      this.modalStatus = "create";
      //上线记得删除
      if (process.env.NODE_ENV === "development") {
        this.formValidate = JSON.parse(localStorage.getItem("param")) || {};
        console.log("zzz");
      }
    },
    handleSubmit(name) {
      if (this.modalStatus == "create") {
        var param = this.formatForm();
        console.log(param);
        //localStorage.setItem('param',JSON.stringify(param))
        //return
        this.axios
          .post(`${process.env.JINKANG}/v3/activity/create`, param)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getTableData();
          });
      } else {
        var param = this.formatForm();
        console.log(param);
        //return
        this.axios
          .post(`${process.env.JINKANG}/v3/activity/create`, param)
          .then(res => {
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.activityId = "";
            this.getTableData();
          });
      }
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      ["start_time", "end_time", "user_create_time", "user_end_time"].forEach(
        e => {
          newForm[e] = new Date(this[e]).valueOf() / 1000;
        }
      );
      return newForm;
    }
  }
};
//5cac75e8b9db4b4db384d56d
</script>