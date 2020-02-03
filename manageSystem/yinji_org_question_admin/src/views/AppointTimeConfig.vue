<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewTime" style="margin-right:30px">新建时间</Button>
    </div>
    <Table :loading="tableLoading" border="" :columns="columns7" :data="timeList"></Table>
    <Modal v-model="modalShow" width="760">
      <p slot="header" style="">
        <span>新增预约时间</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
          <FormItem label="开始时间" prop="start_time">
            <TimePicker
              type="time"
              format="HH:mm"
              placeholder="Select time"
              v-model="formValidate.start_time"
            ></TimePicker>
          </FormItem>
          <FormItem label="结束时间" prop="end_time">
            <TimePicker
              type="time"
              format="HH:mm"
              placeholder="Select time"
              v-model="formValidate.end_time"
            ></TimePicker>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow = false;">关闭</Button>
      </div>
    </Modal>
    <Row style="margin-left:10px" class="other_config">
      <Col span="24" class="common_row">
        <span>超时未加入直播时长：</span>
        <Input style="width:200px"  v-model.number="live_room_timeout" placeholder="单位：秒"/>
      </Col>
      <Col span="24" class="common_row">
        <span>房间学生人数限制：</span>
        <Input style="width:200px"  v-model.number="live_room_counts" placeholder="单位：人"/>
      </Col>
      <div ref="wrapper" class="wrapper">
        <div class="common_row" v-for="(item,index) in gradeArr" :key="item.id">
          <span>等级{{index+1}}：</span>
          <Input v-model="item.value" class="grade_input" style="width:200px"  />
          <Icon @click="removeGrade(item)" size=25 type="ios-close-circle-outline" />
        </div>
        <Button type="info" @click="addGrade">新增等级</Button>
      </div>
    </Row>
    <div  class="common_row"><Button type="primary" @click="submitOtherConfig">提交</Button></div>
  </div>
</template>
<script>
var findIndex = require("lodash.findindex");
import {
  getTime,
  timeToTimeStamp,
  getDate,
  compare
} from "./../common/util.js";
export default {
  data() {
    return {
      columns7: [
        {
          title: "开始时间",
          key: "start_time",
          sortable: true
        },
        {
          title: "结束时间",
          key: "end_time",
          sortable: true
        },
        {
          title: " ",
          key: "action",
          width: 150,
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
                      this.edit(params.index, params.row);
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
                          that.remove(params.index);
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
      timeList: [],
      formValidate: {},
      modalShow: false,
      ruleValidate: {
        start_time: [
          {
            required: true,
            type: "string",
            message: "请选择开始时间",
            trigger: "change"
          }
        ],
        end_time: [
          {
            required: true,
            type: "string",
            message: "请选择结束时间",
            trigger: "change"
          }
        ]
      },
      editIndex: "",
      tableLoading: true,
      testVal:'',
      gradeArr:[],
      live_room_timeout:'',
      live_room_counts:''
    };
  },
  computed:{
    grade_number_map(){
      var obj = {};
      this.gradeArr.forEach((e,index)=>{
        obj[index] = e.value
      })
      return obj
    }
  },
  mounted() {
    this.getTimeList();
    return;
    this.axios
      .post(`${this.baseUrl}/${process.env.VERSION}/config/set_live_config`, {
        self_collect_phones: "iphone7"
      })
      .then(res => {
        console.log(res);
        this.$Message.success("更新成功啦!");
        this.modalShow = false;
        this.getTimeList();
      });
  },
  methods: {
    addGrade(){
      this.gradeArr.push({
        id : new Date().valueOf(),
        value:''
      })
    },
    removeGrade(item) {
      console.log(this.gradeArr)
      var fileList = JSON.parse(JSON.stringify(this.gradeArr));
      var index = findIndex(fileList, function(o) {
        return o.id == item.id;
      });
      fileList.splice(index, 1);
      this.gradeArr = fileList;
    },
    submitOtherConfig(){
      // console.log(this.gradeArr)
      // console.log(this.grade_number_map)
      this.submit()
    },
    edit(index, row) {
      this.modalStatus = "edit";
      this.modalShow = true;
      this.editIndex = index;
      this.formValidate = row;
    },
    remove(index) {
      this.timeList.splice(index, 1);
      this.submit();
    },
    handleSubmit(name) {
      this.$refs[name].validate(valid => {
        if (valid) {
          if (this.modalStatus == "edit") {
            this.timeList.splice(this.editIndex, 1, this.formValidate);
            this.submit();
          } else {
            this.timeList.push(this.formValidate);
            this.submit();
          }
        } else {
          this.$Message.error("请将信息填写完整!");
          return;
        }
      });
    },
    createNewTime() {
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
    },
    getTimeList() {
      this.tableLoading = true;
      this.axios.get(`${this.baseUrl}/${process.env.VERSION}/config/get_live_config`).then(res => {
        this.tableLoading = false;
        var res = res.data;
        var appintment_times = res.appintment_times;
        this.timeList = JSON.parse(appintment_times);
        this.timeList = this.sortTimeList(this.timeList);
        this.timeList = this.formatTimeList();
        this.live_room_timeout = res.live_room_timeout;
        this.live_room_counts = res.live_room_counts;
        this.gradeArr = this.formatGrade(JSON.parse(res.grade_number_map));
        console.log(this.gradeArr)
      });
    },
    formatTimeList() {
      return this.timeList.map(function(obj) {
        var rObj = {};
        rObj.start_time = getTime(obj.start_time, "incomeTime");
        rObj.end_time = getTime(obj.end_time, "incomeTime");
        return rObj;
      });
    },
    formatStringTime(arr) {
      var newArr = arr.map(function(obj) {
        //console.log(timeToTimeStamp)
        var rObj = {};
        rObj.start_time = timeToTimeStamp(obj.start_time);
        rObj.end_time = timeToTimeStamp(obj.end_time);
        return rObj;
      });
      return this.sortTimeList(newArr);
    },
    submit() {
      var resultedTimeSteamp = JSON.stringify(
        this.formatStringTime(this.timeList)
      );
      var param = {
          appintment_times: resultedTimeSteamp,
          live_room_timeout: this.live_room_timeout,
          live_room_counts: this.live_room_counts,
          grade_number_map : JSON.stringify(this.grade_number_map) 
        }
      //console.log(param)
      //return
      this.axios
        .post(`${this.baseUrl}/${process.env.VERSION}/config/set_live_config`, param)
        .then(res => {
          console.log(res);
          this.$Message.success("更新成功啦!");
          this.modalShow = false;
          this.getTimeList();
        });
    },
    sortTimeList(arr) {
      return arr.sort(compare("start_time"));
    },
    formatGrade(obj){
      var arr = [];
      for(var key in obj){
        arr.push({
          id : key,
          value : obj[key]
        })
      }
      return  arr
    }
  }
};
</script>
<style lang="less" scoped>
.other_config{
  margin-top: 20px;
}
</style>

