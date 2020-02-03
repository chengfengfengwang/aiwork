<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewRoom" style="margin-right:30px">新建直播间</Button>
      <span>筛选：</span>
      <Input @input="keyWordsChange" v-model="keyWords" placeholder="输入关键字" style="width: 200px"/>
      <!-- <DatePicker
        @on-change="dateChange"
        type="daterange"
        split-panels
        placeholder="Select date"
        style="width: 200px"
      ></DatePicker>-->
      <Select
        @on-change="searchStatusChange"
        style="width:200px"
        v-model="search.status"
        placeholder="选择房间状态"
      >
        <Option :value="-2">所有房间</Option>
        <Option :value="-1">已删除</Option>
        <Option :value="0">未上线</Option>
        <Option :value="1">已上线</Option>
        <Option :value="2">人数已满</Option>
        <Option :value="3">已结束</Option>
        <Option :value="4">正在直播</Option>
      </Select>
      <!-- <Button type="info">搜索</Button> -->
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="roomList"></Table>
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
        <span>{{modalStatus=='create'?'新建直播间':'编辑直播间'}}</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="直播间名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入直播间名称"></Input>
          </FormItem>
          <!-- <FormItem label="价格" prop="price">
            <Input v-model.number="formValidate.price" placeholder="输入直播间展示价格"></Input>
          </FormItem>-->
          <FormItem label="课程id">
            <Select style="width:200px" v-model="formValidate.course_id">
              <Option v-for="item in courseList" :key="item.key" :value="item.key">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="老师id">
            <Select style="width:200px" v-model="formValidate.teacher_id">
              <Option v-for="item in teacherList" :key="item.key" :value="item.key">{{item.label}}</Option>
            </Select>
          </FormItem>
          <FormItem label="课程id">
            <Select style="width:200px" v-model="formValidate.lesson_id">
              <Option v-for="item in lessonList" :key="item.key" :value="item.key">{{item.label}}</Option>
            </Select>
          </FormItem>
          <!-- <FormItem label="房间类型" prop="room_type">
            <Select v-model="formValidate.room_type" placeholder="请选择房间类型">
              <Option :value="0">默认</Option>
            </Select>
          </FormItem>-->
          <FormItem label="房间状态" prop="status">
            <Select v-model="formValidate.status" placeholder="选择房间状态">
              <Option disabled :value="-2">所有房间</Option>
              <Option disabled :value="-1">已删除</Option>
              <Option :value="0">未上线</Option>
              <Option :value="1">已上线</Option>
              <Option disabled :value="2">人数已满</Option>
              <Option disabled :value="3">已结束</Option>
              <Option disabled :value="4">正在直播</Option>
            </Select>
          </FormItem>
          <FormItem label="封面" prop="cover">
            <img v-show="modalCoverShow" style="max-width:400px" :src="formValidate.cover" alt>
            <Upload
              accept="image/*"
              @on-exceeded-size="exceededHandle"
              :before-upload="handleUpload"
              :max-size="1024"
              @on-error="uploadError"
              @on-success="uploadSuccess"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button icon="ios-cloud-upload-outline">选择封面</Button>
            </Upload>
            <Input
              :style="{visibility:'hidden',height:'0px',display: 'block'}"
              v-model="formValidate.cover"
              placeholder="输入直播间封面地址"
            ></Input>
          </FormItem>

          <FormItem label="最大人数" prop="limit_number">
            <Input v-model.number="formValidate.limit_number" placeholder="输入房间最大人数"></Input>
          </FormItem>
          <!-- <FormItem v-if="rangeTimeShow" label="时间段" prop="time_range">
            <Select
              @on-change="timeRangeChange"
              v-model="formValidate.time_range"
              placeholder="选择直播时间段"
            >
              <Option v-for="(item,index) in rangeTimeList" :key="index" :value="item">{{item}}</Option>
            </Select>
          </FormItem>-->
          <FormItem label="开始时间" prop="start_time_date">
            <Row>
              <Col span="6">
                <FormItem prop="start_time_date">
                  <DatePicker
                    type="date"
                    placeholder="Select date"
                    v-model="formValidate.start_time_date"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
                <FormItem prop="start_time_time">
                  <TimePicker
                    confirm
                    @on-ok="startTimeSelectOk"
                    @on-change="startTimeSelectOk"
                    type="time"
                    format="HH:mm"
                    placeholder="Select time"
                    @on-open-change="handleEditTimeChange"
                    v-model="formValidate.start_time_time"
                  ></TimePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <FormItem label="结束时间" prop="end_time_date">
            <Row>
              <Col span="6">
                <FormItem prop="end_time_date">
                  <DatePicker
                    type="date"
                    placeholder="Select date"
                    v-model="formValidate.end_time_date"
                  ></DatePicker>
                </FormItem>
              </Col>
              <Col span="2" style="text-align: center">-</Col>
              <Col span="11">
                <FormItem prop="end_time_time">
                  <TimePicker
                    confirm
                    @on-ok="endTimeSelectOk"
                    @on-change="endTimeSelectOk"
                    type="time"
                    format="HH:mm"
                    placeholder="Select time"
                    @on-open-change="handleEditTimeChange"
                    v-model="formValidate.end_time_time"
                  ></TimePicker>
                </FormItem>
              </Col>
            </Row>
          </FormItem>
          <!-- <FormItem label="是否推荐" prop="recommend">
            <RadioGroup v-model="formValidate.recommend">
              <Radio label="true">推荐</Radio>
              <Radio label="false">不推荐</Radio>
            </RadioGroup>
          </FormItem>-->
          <!-- <FormItem label="房间权重" prop="weight">
            <Input v-model.number="formValidate.weight" placeholder="输入直播间权重"></Input>
          </FormItem>-->
          <!-- <FormItem label="Hobby" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
              <Checkbox label="Eat"></Checkbox>
              <Checkbox label="Sleep"></Checkbox>
              <Checkbox label="Run"></Checkbox>
              <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
          </FormItem>-->
          <FormItem label="描述" prop="desc">
            <Input
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="输入房间描述"
            ></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="closeModal">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { Table, Button } from "iview";
import {
  formatTime,
  getTime,
  timeToTimeStamp,
  getDate
} from "./../common/util.js";
export default {
  data() {
    return {
      date: new Date(),
      time: new Date(),
      keyWords: "",
      columns: [
        {
          title: "房间ID",
          key: "id"
          // render: (h, params) => {
          //   return h("div", this.roomTypeChange(params.row.room_type));
          //   //return h("div", [h("strong", this.roomTypeChange(params.row.room_type))]);
          // }
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "开始时间",
          key: "start_time",
          render: (h, params) => {
            return h("div", formatTime(params.row.start_time));
          }
        },
        {
          title: "结束时间",
          key: "end_time",
          render: (h, params) => {
            return h("div", formatTime(params.row.end_time));
          }
        },
        // {
        //   title: "价格（元）",
        //   key: "price",
        //   render: (h, params) => {
        //     return h("div", params.row.price);
        //   }
        // },
        // {
        //   title: "是否推荐",
        //   key: "recommend",
        //   render: (h, params) => {
        //     return h("div", params.row.recommend == "true" ? "是" : "否");
        //   }
        // },
        {
          title: "teacher_id",
          key: "teacher_id"
        },
        {
          title: "course_id",
          key: "course_id"
        },
        {
          title: "lesson_id",
          key: "lesson_id"
        },
        // {
        //   title: "限制人数",
        //   key: "limit_number"
        // },
        {
          title: "在线学生",
          key: "live_users",
          render: (h, params) => {
            var renderValue;
            if (params.row.live_users.length == 0) {
              renderValue = "无";
            } else {
              renderValue = params.row.live_users.join("、");
            }
            return h("div", renderValue);
          }
        },
        {
          title: "预约人员",
          key: "appointment_users",
          render: (h, params) => {
            var renderValue;
            if (params.row.appointment_users.length == 0) {
              renderValue = "无";
            } else {
              renderValue = params.row.appointment_users.join("、");
            }
            return h("div", renderValue);
          }
        },
        {
          title: "学生评价",
          key: "students_evaluate",
          render: (h, params) => {
            var renderValue;
            if (params.row.students_evaluate.length == 0) {
              renderValue = "无";
            } else {
              renderValue = params.row.students_evaluate.join("、");
            }
            return h("div", renderValue);
          }
        },
        {
          title: "状态",
          key: "status",
          render: (h, params) => {
            return h("div", this.roomStatus(params.row.status));
          }
        },
        {
          title: "封面",
          key: "cover",
          className: "cover_row",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.cover
              },
              style: {
                width: "100%"
              }
            });
          }
        },
        {
          title: "描述",
          key: "desc"
        },
        {
          title: "记录",
          key: "record_url",
          render: (h, params) => {
            return h("div", [
              h(
                "span",
                {},
                params.row.record_url
                  ? params.row.record_url.slice(0, 4) +
                      "..." +
                      params.row.record_url.slice(-4)
                  : ""
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    display: params.row.record_url ? "block" : "none"
                  },
                  on: {
                    click: () => {
                      var that = this;
                      this.$Modal.info({
                        title: "记录链接",
                        content: params.row.record_url
                      });
                    }
                  }
                },
                "查看"
              )
            ]);
          }
        },
        {
          title: " ",
          key: "action",
          width: 130,
          maxWidth: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modalShow = true;
                      this.modalCoverShow = true;
                      this.$refs.formValidate.resetFields();
                      this.formValidate = this.formateRow(params.row);
                      this.modalStatus = "edit";
                      this.rangeTimeShow = false;
                      //this.show(params.index);
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      var that = this;
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定要删除吗？",
                        onOk() {
                          that.removeRoom(params.row.id);
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
      roomList: [],
      formValidate: {
        name: "",
        room_type: "",
        cover: "",
        price: "",
        start_time_date: "",
        start_time_time: "",
        end_time_date: "",
        end_time_time: "",
        // start_time:"",
        // end_time:"",
        recommend: "",
        weight: "",
        date: "",
        time: "",
        desc: ""
      },
      ruleValidate: {
        name: [
          {
            required: true,
            message: "直播间名称不能为空",
            trigger: "change"
          }
        ],
        price: [
          {
            required: true,
            type: "number",
            message: "价格不能为空",
            trigger: "change"
          }
        ],
        room_type: [
          {
            required: true,
            type: "number",
            message: "房间类型不能为空",
            trigger: "change"
          }
        ],
        status: [
          {
            required: true,
            type: "number",
            message: "房间状态不能为空",
            trigger: "change"
          }
        ],
        time_range: [
          {
            required: true,
            //type: "string",
            message: "直播时间段不能为空",
            trigger: "change"
          }
        ],
        cover: [
          {
            required: true,
            message: "封面不能为空",
            trigger: "change"
          }
        ],

        limit_number: [
          {
            required: true,
            type: "number",
            message: "限制人数不能为空",
            trigger: "change"
          },
          {
            type: "number",
            message: "请输入数字",
            trigger: "change"
          }
        ],
        recommend: [
          { required: true, message: "请选择是否推荐", trigger: "change" }
        ],
        weight: [
          {
            required: true,
            type: "number",
            message: "请输入房间权重",
            trigger: "change"
          }
        ],
        // interest: [
        //   {
        //     required: true,
        //     type: "array",
        //     min: 1,
        //     message: "Choose at least one hobby",
        //     trigger: "change"
        //   },
        //   {
        //     type: "array",
        //     max: 2,
        //     message: "Choose two hobbies at best",
        //     trigger: "change"
        //   }
        // ],
        start_time_date: [
          {
            required: true,
            type: "date",
            message: "请选择开始日期",
            trigger: "change"
          }
        ],
        start_time_time: [
          {
            required: true,
            type: "string",
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        end_time_date: [
          {
            required: true,
            type: "date",
            message: "请选择结束日期",
            trigger: "change"
          }
        ],
        end_time_time: [
          {
            required: true,
            type: "string",
            message: "请选择结束时间",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "请输入房间描述",
            trigger: "change"
          },
          {
            type: "string",
            min: 2,
            message: "Introduce no less than 2 words",
            trigger: "change"
          }
        ]
      },
      modalShow: false,
      tableLoading: true,
      page: 0,
      pageSize: 10,
      total: 0,
      modalCoverShow: "",
      modalStatus: "",
      search: {
        status: -2
      },
      rangeTimeList: [],
      rangeTime: "",
      fullHoursArr: [],
      disabledHoursStart: [],
      disabledHoursEnd: [],
      rangeTimeShow: true,
      courseList: [],
      lessonList: [],
      teacherList: []
    };
  },
  components: {
    Table,
    Button
  },
  mounted() {
    this.initDisableHours();
    this.getRoomList();
    this.getRangeTimeList();
    this.getCourseList();
    this.getTeacherList();
    this.getLessonList();
  },
  methods: {
    getLessonList() {
      this.axios
        .get(
          `${process.env.JINKANG}/${process.env.VERSION}/liveroom/lesson_labels`
        )
        .then(res => {
          this.lessonList = res.data;
        });
    },
    getCourseList() {
      this.axios
        .get(
          `${process.env.JINKANG}/${process.env.VERSION}/liveroom/course_labels`
        )
        .then(res => {
          this.courseList = res.data;
        });
    },
    getTeacherList() {
      this.axios
        .get(
          `${process.env.JINKANG}/${
            process.env.VERSION
          }/liveroom/teacher_labels`
        )
        .then(res => {
          this.teacherList = res.data;
        });
    },
    startTimeSelectOk(e) {
      var rangeStart = timeToTimeStamp(this.rangeStart);
      var rangeEnd = timeToTimeStamp(this.rangeEnd);
      var choseStart = timeToTimeStamp(this.formValidate.start_time_time);
      if (rangeStart > choseStart || choseStart > rangeEnd) {
        this.formValidate.start_time_time = "";
        this.$Message.error({
          content: "开始时间需要在时间段范围内哦~",
          duration: 3
        });
      }
    },
    endTimeSelectOk(e) {
      var rangeStart = timeToTimeStamp(this.rangeStart);
      var rangeEnd = timeToTimeStamp(this.rangeEnd);
      var choseEnd = timeToTimeStamp(this.formValidate.end_time_time);
      if (choseEnd > rangeEnd || choseEnd < rangeStart) {
        this.formValidate.end_time_time = "";
        this.$Message.error({
          content: "结束时间需要在时间段范围内哦~",
          duration: 3
        });
      }
    },
    handleEditTimeChange(status) {
      if (this.modalStatus == "edit" && status) {
        if (!this.rangeTimeShow) {
          //只在rangeTimeShow为false时提示
          this.$Message.info({
            content: "修改直播时间需要先选择时间段",
            duration: 2
          });
          this.rangeTimeShow = true;
        }
      }
    },
    initDisableHours() {
      var arr = [];
      for (var i = 0; i < 25; i++) {
        arr.push(i);
      }
      this.fullHoursArr = arr;
      this.disabledHoursStart = JSON.parse(JSON.stringify(arr));
      this.disabledHoursEnd = JSON.parse(JSON.stringify(arr));
    },
    timeRangeChange(e) {
      if (!e) {
        return;
      }
      this.rangeStart = e.split("至")[0].trim();
      this.rangeEnd = e.split("至")[1].trim();
      this.formValidate.start_time_time = e.split("至")[0].trim();
      this.formValidate.end_time_time = e.split("至")[1].trim();
      console.log(this.formValidate);
    },
    getRangeTimeList() {
      this.axios
        .get(
          `${process.env.JINKANG}/${process.env.VERSION}/config/get_live_config`
        )
        .then(res => {
          var appintment_times = res.data.appintment_times;
          this.rangeTimeList = JSON.parse(appintment_times);
          this.rangeTimeList = this.formatTimeList();
        });
    },
    formatTimeList() {
      return this.rangeTimeList.map(function(obj) {
        // var rObj = {};
        // rObj.start_time = getTime(obj.start_time, "incomeTime");
        // rObj.end_time = getTime(obj.end_time, "incomeTime");
        // return rObj;
        return `${getTime(
          obj.start_time,
          "incomeTime"
        )} 至 ${getTime(obj.end_time, "incomeTime")}`;
      });
    },
    keyWordsChange() {
      this.getRoomList();
    },
    removeRoom(id) {
      this.axios
        .get(
          `${process.env.JINKANG}/${
            process.env.VERSION
          }/liveroom/delete_room?room_id=${id}`
        )
        .then(res => {
          this.$Message.success("删除成功了");
          this.getRoomList();
        });
    },
    searchStatusChange() {
      this.getRoomList();
    },
    handleUpload(file) {
      this.modalCoverShow = true;
      this.file = file;
      this.$set(this.formValidate, "cover", window.URL.createObjectURL(file));
      return false;
    },
    exceededHandle() {
      this.$Message.error("封面最大不能超过1M，请将图片进行压缩优化");
    },
    uploadSuccess(e) {
      console.log(e);
    },
    uploadError(e) {
      console.log(e);
    },
    dateChange(d, c) {
      console.log(d, c);
    },
    getRoomList(status) {
      this.tableLoading = true;
      this.axios
        .get(
          `${process.env.JINKANG}/${
            process.env.VERSION
          }/liveroom/all_rooms?page=${this.page}&size=${this.pageSize}&status=${
            this.search.status
          }&keyword=${this.keyWords}`
        )
        .then(res => {
          this.tableLoading = false;
          this.total = res.paging.total;
          this.roomList = res.data;
        });
    },
    closeModal() {
      this.modalShow = false;
    },
    handleSubmit(name) {
      // if (this.modalStatus == "create") {
      //       var formdata = this.formatForm();
      //       return
      //       this.axios
      //         .post(`${process.env.JINKANG}/${process.env.VERSION}/liveroom/create_room`, formdata,{ headers: {'Content-Type': 'multipart/form-data' }})
      //         .then(res => {
      //           console.log(res);
      //         });
      //     }
      //console.log(this.formValidate);
      if (this.modalStatus == "create") {
        var formdata = this.formatForm();
        this.axios
          .post(
            `${process.env.JINKANG}/${
              process.env.VERSION
            }/liveroom/create_room`,
            formdata,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          )
          .then(res => {
            console.log(res);
            this.$Message.success("房间创建成功啦!");
            this.modalShow = false;
            this.file = "";
            this.getRoomList();
          });
      } else {
        var formdata = this.formatForm();
        this.axios
          .post(
            `${process.env.JINKANG}/${
              process.env.VERSION
            }/liveroom/update_room`,
            formdata,
            {
              headers: { "Content-Type": "multipart/form-data" }
            }
          )
          .then(res => {
            console.log(res);
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.file = "";
            this.getRoomList();
          });
      }
      return;
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalStatus == "create") {
            var formdata = this.formatForm();
            this.axios
              .post(
                `${process.env.JINKANG}/${
                  process.env.VERSION
                }/liveroom/create_room`,
                formdata,
                {
                  headers: { "Content-Type": "multipart/form-data" }
                }
              )
              .then(res => {
                console.log(res);
                this.$Message.success("房间创建成功啦!");
                this.modalShow = false;
                this.file = "";
                this.getRoomList();
              });
          } else {
            var formdata = this.formatForm();
            this.axios
              .post(
                `${process.env.JINKANG}/${
                  process.env.VERSION
                }/liveroom/update_room`,
                formdata,
                {
                  headers: { "Content-Type": "multipart/form-data" }
                }
              )
              .then(res => {
                console.log(res);
                this.$Message.success("修改成功啦!");
                this.modalShow = false;
                this.file = "";
                this.getRoomList();
              });
          }
        } else {
          this.$Message.error("请将信息填写完整!");
          return;
        }
      });
    },
    handleReset(name) {
      this.$refs[name].resetFields();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getRoomList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getRoomList();
    },
    roomTypeChange(type) {
      switch (type) {
        case 0:
          return "默认";
      }
    },
    roomStatus(status) {
      var status = status + "";
      switch (status) {
        case "-2":
          return "所有房间";
        case "-1":
          return "已删除";
        case "0":
          return "未上线";
        case "1":
          return "已上线";
        case "2":
          return "人数已满";
        case "3":
          return "已结束";
        case "4":
          return "正在直播";
      }
    },
    formateRow(row) {
      var newRow = JSON.parse(JSON.stringify(row));
      newRow.start_time_date = new Date(newRow.start_time * 1000);
      //newRow.start_time_time = new Date(newRow.start_time * 1000);
      newRow.start_time_time = getTime(newRow.start_time);
      newRow.end_time_date = new Date(newRow.end_time * 1000);
      //newRow.end_time_time = new Date(newRow.end_time * 1000);
      newRow.end_time_time = getTime(newRow.end_time);
      return newRow;
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      newForm.recommend = newForm.recommend == "true";
      newForm.start_time =
        Date.parse(
          getDate(Date.parse(newForm.start_time_date) / 1000) +
            " " +
            newForm.start_time_time
        ) / 1000;
      newForm.end_time =
        Date.parse(
          getDate(Date.parse(newForm.start_time_date) / 1000) +
            " " +
            newForm.end_time_time
        ) / 1000;
      [
        "start_time_date",
        "start_time_time",
        "end_time_date",
        "end_time_time",
        "appointment_counts",
        "appointment_users",
        "create_time",
        "live_teachers",
        "live_users",
        "students_evaluate",
        "_index",
        "_rowKey"
      ].forEach(e => {
        delete newForm[e];
      });

      newForm.cover = this.file;
      //编辑时的上传参数
      if (!this.file && this.modalStatus == "edit") {
        delete newForm.cover;
      }
      if (this.modalStatus == "edit") {
        newForm.room_id = newForm.id;
        delete newForm.id;
      }
      //添加到formdata
      var myFormData = new FormData();
      for (var key in newForm) {
        myFormData.append(key, newForm[key]);
      }
      return myFormData;
    },
    createNewRoom() {
      this.modalCoverShow = false;
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
      this.rangeTimeShow = true;
    }
  }
};
</script>
<style lang="less">
.cover_row {
  .ivu-table-cell {
    padding: 0 5px;
  }
}
</style>
