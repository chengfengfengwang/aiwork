<template>
  <div>
    <div style="margin-bottom:5px">
      <div class="row_item">
        <span style="margin-left:5px">渠道：</span>
        <Select @on-change="sortChange" v-model="channel" style="width:200px">
          <Option v-for="(val,name) in channelList" :value="val" :key="val">{{ name }}</Option>
        </Select>
        <span style="margin-left:5px">类型：</span>
        <Select @on-change="sortChange" v-model="instrument" style="width:200px">
          <Option v-for="(val,name) in instrumentList" :value="val" :key="val">{{ name }}</Option>
        </Select>
        <span style="margin-left:5px">课程：</span>
        <Select v-model="course" style="width:200px">
          <Option
            v-for="(item) in courseList"
            :value="item.course_id"
            :key="item.course_id"
          >{{ item.course_name }}</Option>
        </Select>
      </div>
      <div class="row_item">
        <span style="margin-left:5px">价格：</span>
        <Input v-model="price" placeholder="输入价格" style="width: 200px"/>
      </div>
      <div class="row_item">
        <span style="margin-left:5px">备注：</span>
        <Input v-model="desc" placeholder="输入备注" style="width: 200px"/>
      </div>
      <div class="row_item">
        <span style="margin-left:5px">手机号：</span>
        <Input v-model="phone" placeholder="输入手机号" style="width: 200px"/>
        <Button type="info" @click="activateSingle">开通</Button>
        <Button type="primary" style="margin-left:10px" @click="downloadAll">开通记录下载</Button>
      </div>
      <!-- <div class="row_item" style="margin-left:25px"> -->
      <div style="margin-top:15px">
        <span style="margin-left:5px">批量导入开通:</span>
        <Upload
          style="display:inline-block"
          :before-upload="beforeUpload"
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <Button type="success" icon="ios-cloud-upload-outline">批量导入开通</Button>
        </Upload>
        <Button type="success" style="margin-left:5px" @click="downloadSingle">导入模版下载</Button>
      </div>
    </div>
    <!-- 课程开通记录 -->
    <section>
      <h1 style="text-align:center;margin-top:40px">{{this.appName==='yinji'?'音基':'Ai'}}课程开通记录</h1>
      <div class="table_tool">
        <span>日期：</span>
        <DatePicker
          type="daterange"
          placement="bottom-end"
          placeholder="按日期筛选"
          style="width: 200px"
          @on-change="allTimeSelectChange"
        ></DatePicker>
        <span>手机号：</span>
        <Input v-model="searchTel" placeholder="按手机号筛选" style="width: 200px"/>
        <Button type="info" @click="getCourseRecords">查询</Button>
        <!-- <Button style="float:right" @click="downloadSingle">模版下载</Button> -->
        <!-- <Button type="primary" style="float:right;margin-right:5px" @click="downloadAll">开通记录下载</Button> -->
      </div>
      <Table :loading="tableLoading" :columns="columns" :data="dataList"></Table>
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
    </section>
    <!-- 题库开通记录 -->
    <section>
      <h1 style="text-align:center;margin-top:40px">{{this.appName==='yinji'?'音基':'Ai'}}题库开通记录</h1>
      <div class="table_tool">
        <span>日期：</span>
        <DatePicker
          type="daterange"
          placement="bottom-end"
          placeholder="按日期筛选"
          style="width: 200px"
          @on-change="allTimeSelectChange1"
        ></DatePicker>
        <span>手机号：</span>
        <Input v-model="searchTel1" placeholder="按手机号筛选" style="width: 200px"/>
        <Button type="info" @click="getQuestionRecords">查询</Button>
        <!-- <Button style="float:right" @click="downloadSingle">模版下载</Button> -->
        <!-- <Button style="float:right;margin-right:5px" @click="downloadAll">开通记录下载</Button> -->
      </div>
      <Table :loading="tableLoading1" :columns="columns" :data="dataList1"></Table>
      <div style="margin-top:10px">
        <Page
          @on-page-size-change="pageSizeChange1"
          @on-change="pageChange1"
          :total="total1"
          :page-size="pageSize1"
          show-sizer
          :page-size-opts="[5,10,15,20,30,40]"
          show-elevator
        />
      </div>
    </section>
  </div>
</template>
<script>
import Upload from "./../components/Upload/Upload";
export default {
  props: {
    appName: {
      default: "yinji"
    }
  },
  data() {
    return {
      dataList: [],
      dataList1: [],
      tableLoading: true,
      tableLoading1: true,
      page: 0,
      pageSize: 5,
      total: 0,
      page1: 0,
      pageSize1: 5,
      total1: 0,
      modalShow: false,
      formValidate: {},
      columns: [
        // {
        //   title: "序号",
        //   key: "id"
        // },
        {
          title: "渠道",
          key: "channel"
        },
        {
          title: "用户账号",
          key: "phone"
        },
        {
          title: "乐器",
          key: "item_instrument"
        },
        {
          title: "课程类型",
          key: "goods_type"
        },
        {
          title: "课程",
          key: "item_name"
        },
        {
          title: "开通时间",
          key: "updated_at"
        },
        {
          title: "课程有效期",
          key: "expiration_time"
        },
        {
          title: "归属",
          key: "ctrl_user"
        },
        {
          title: "备注",
          key: "remarks"
        },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          align: "center",
          render: (h, params) => {
            //if (this.role === 0) {
            return h("div", [
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "info",
              //       size: "small"
              //     },
              //     style: {
              //       marginRight: "5px"
              //     },
              //     on: {
              //       click: () => {
              //         this.modalShow = true;
              //         this.curRow = params.row;
              //         this.formValidate = params.row;
              //         this.modalStatus = "edit";
              //       }
              //     }
              //   },
              //   "编辑"
              // ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.delete(params.row);
                    }
                  }
                },
                "取消激活"
              )
            ]);
            //}
          }
        }
      ],
      keyword: "",
      uploadedUrl: "",
      userList: [],
      channelList: {},
      instrumentList: {},
      courseList: [],
      channel: "",
      instrument: "",
      course: "",
      phone: "",
      price: "",
      desc: "",
      beginTime: "",
      endTime: "",
      beginTime1: "",
      endTime1: "",
      searchTel: "",
      searchTel1: ""
    };
  },
  mounted() {
    this.getInstruments();
    this.getCourseRecords();
    this.getQuestionRecords();
  },
  methods: {
    downloadSingle() {
      window.location.href = `${
        process.env.JINKANG
      }/v3/course_activation/excel_download/`;
    },
    downloadAll() {
      this.axios
        .get(
          `${process.env.JINKANG}/v3/course_activation/excel_export?app=${
            this.appName
          }`
        )
        .then(res => {
          window.location.href = res.data;
        });
    },
    allTimeSelectChange(value) {
      this.beginTime = value[0];
      this.endTime = value[1];
      this.resetPage();
      this.getCourseRecords();
    },
    allTimeSelectChange1(value) {
      this.beginTime1 = value[0];
      this.endTime1 = value[1];
      this.resetPage1();
      this.getQuestionRecords();
    },
    getInstruments(instrument = 5) {
      this.axios
        .get(
          `${
            process.env.JINKANG
          }/v3/course/?app=yinji&instrument_type=${instrument}`
        )
        .then(res => {
          console.log(res.data);
          this.channelList = res.data[0].channel;
          this.instrumentList = res.data[1].instrument;
          this.courseList = res.data[2].course_list;
        });
    },
    getQuestionRecords() {
      this.tableLoading1 = true;
      this.axios
        .get(
          `${process.env.JINKANG}/v3/course_activation/?app=${
            this.appName
          }&beginTime=${this.beginTime1}&endTime=${this.endTime1}&page=${
            this.page1
          }&size=${this.pageSize1}&phone=${
            this.searchTel1
          }&purchase_type=question`
        )
        .then(res => {
          this.dataList1 = res.data;
          this.total1 = res.total;
          this.tableLoading1 = false;
        });
    },
    getCourseRecords() {
      this.tableLoading = true;
      this.axios
        .get(
          `${process.env.JINKANG}/v3/course_activation/?app=${
            this.appName
          }&beginTime=${this.beginTime}&endTime=${this.endTime}&page=${
            this.page
          }&size=${this.pageSize}&phone=${this.searchTel}&purchase_type=course`
        )
        .then(res => {
          //this.$Message.success("查询成功");
          this.dataList = res.data;
          this.total = res.total;
          this.tableLoading = false;
        });
    },
    beforeUpload(file) {
      var that = this;
      this.$Modal.confirm({
        title: "提示",
        content: "确认要批量开通课程吗？",
        onOk() {
          that.activateMulti(file);
        }
      });

      return false;
    },
    activateMulti(file) {
      var formdata = new FormData();
      formdata.append("excel_file", file);
      formdata.append("channel", this.channel);
      formdata.append("course_id", this.course);
      formdata.append("app", this.appName);
      if (this.channel == "" || this.course == "") {
        this.$Message.error("请先选择渠道和课程");
        return;
      }
      this.axios
        .post(`${process.env.JINKANG}/v3/course_activation/multi/`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          if (res.error !== 0) {
            this.$Message.error(res.msg);
          } else {
            this.$Message.success(res.data.msg);
          }
        });
    },
    activateSingle() {
      var param = {
        course_id: this.course,
        phone: this.phone,
        desc: this.desc,
        channel: this.channel,
        price: this.price
      };
      console.log(param);
      //return;
      this.axios
        .post(`${process.env.JINKANG}/v3/course_activation/single/`, param)
        .then(res => {
          console.log(res.error);
          if (res.error === 0) {
            this.$Message.success(res.data.msg);
            this.getQuestionRecords();
            this.getCourseRecords();
          }
        });
    },
    handleSubmit() {
      if (this.modalStatus == "edit") {
      } else {
      }
    },
    delete(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "确认要取消激活当前课程吗？",
        onOk() {
          this.axios
            .get(
              `${
                process.env.JINKANG
              }/v3/course_activation/deactivate/?app=yinji` +
                "&purchase_type=" +
                row.purchase_type +
                "&phone=" +
                row.phone +
                "&course_id=" +
                row.item_id
            )
            .then(res => {
              this.$Message.success("取消激活成功");
              this.getQuestionRecords();
              this.getCourseRecords();
            });
        }
      });
    },
    resetPage() {
      this.page = 0;
    },
    resetPage1() {
      this.page1 = 0;
    },
    sortChange() {
      this.getInstruments();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getCourseRecords();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getCourseRecords();
    },
    pageSizeChange1(pageSize1) {
      this.pageSize1 = pageSize1;
      this.getQuestionRecords();
    },
    pageChange1(page1) {
      this.page1 = page1 - 1;
      this.getQuestionRecords();
    }
  }
};
</script>
<style lang="less" scoped>
.row_item {
  display: inline-block;
  margin-top: 5px;
}
.table_tool {
  margin: 20px 0 10px 0;
}
</style>

