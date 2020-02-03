<template>
  <div>
    <div class="table_top_tool">
        <Button type="primary" @click="createNewAc" style="margin-right:30px">新建</Button>
      <span>活动id：</span>
      <Input v-model="activityId" placeholder="输入活动id" style="width: 200px" />
      <Button type="info" @click="search" style="margin-right:2px">搜索</Button>
      <Button type="info" @click="getTableData" style="margin-right:10px">重置</Button>
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
    <Modal v-model="modalShow" width="860">
      <p slot="header" style>
        <span>编辑</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="120">
          <FormItem label="活动标题">
            <Input v-model="formValidate.title" placeholder=""></Input>
          </FormItem>
          <FormItem label="活动描述">
            <Input type="textarea" :autosize="true" v-model="formValidate.desc" placeholder=""></Input>
          </FormItem>
          <FormItem label="活动开始时间">
              <DatePicker type="datetime" v-model="start_time"  placeholder="Select date" style="width: 200px"></DatePicker>
           </FormItem>
           <FormItem label="活动结束时间">
              <DatePicker type="datetime" v-model="end_time"  placeholder="Select date" style="width: 200px"></DatePicker>
           </FormItem>
           <FormItem label="用户注册时间">
              <DatePicker type="datetime" v-model="user_create_time"  placeholder="Select date" style="width: 200px"></DatePicker>
           </FormItem>
           <FormItem label="用户截止时间">
              <DatePicker type="datetime" v-model="user_end_time"  placeholder="Select date" style="width: 200px"></DatePicker>
           </FormItem>
           <FormItem label="是否付费用户">
            <Select style="width: 200px" v-model="formValidate.is_pay" placeholder="">
              <Option :value="1">是</Option>
              <Option :value="0">不是</Option>
            </Select>
           </FormItem>
           <FormItem label="是否vip">
            <Select style="width: 200px" v-model="formValidate.is_vip" placeholder="">
              <Option :value="1">是</Option>
              <Option :value="0">不是</Option>
            </Select>
           </FormItem>
           <FormItem label="展示课程1">
            <Input v-model="formValidate.course_show1" placeholder=""></Input>
          </FormItem>
           <FormItem label="展示课程2">
            <Input v-model="formValidate.course_show2" placeholder=""></Input>
          </FormItem>
          <FormItem label="不展示课程">
            <Input v-model="formValidate.course_not_show" placeholder=""></Input>
          </FormItem>
          <FormItem label="相关老师id">
            <Input v-model="formValidate.teacher_ids" placeholder=""></Input>
          </FormItem>
          <FormItem label="发送优惠券id列表">
            <Input v-model="formValidate.coupon_send_list" placeholder=""></Input>
          </FormItem>
          <FormItem label="禁止优惠券id列表">
            <Input v-model="formValidate.coupon_no_send_list" placeholder=""></Input>
          </FormItem>
          <FormItem label="活动是否开启">
            <Select style="width: 200px" v-model="formValidate.is_open" placeholder="">
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
            <Input v-model="formValidate.promotion_url" placeholder=""></Input>
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
import { formatTime } from './../common/util.js'
export default {
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "标题",
          key: "title"
        },
        {
          title: "开始时间",
          key: "goods_name",
          render: (h, params) => {
            return h("span", params.row.start_time == 0 ? '' : formatTime(params.row.start_time));
          }
        },
        {
          title: "结束时间",
          key: "goods_name",
          render: (h, params) => {
            return h("span", params.row.end_time == 0 ? '' : formatTime(params.row.end_time));
          }
        },
        {
          title: "弹窗URL",
          key: "promotion_url"
        },
        {
          title: "活动id",
          key: "id"
        },
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
                      this.modalShow = true;
                      this.formValidate = this.formatRow(params.row);
                      this.modalStatus = "edit";
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
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                        var that = this;
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定要删除吗？",
                        onOk() {
                          this.axios
                            .get(
                            `${process.env.JINKANG}/v3/activity/delete/${params.row.id}/`
                            )
                            .then(res => {
                                that.getTableData()
                            });
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
      dataList: [],
      page: 0,
      pageSize: 10,
      total: 0,
      modalStatus: "",
      activityId:"",
      searchOrder:"",
      instrumentList: [
        {
          name: '吉他',
          value: 0
        },
        {
          name: '尤克里里',
          value: 1
        },
        {
          name: '卡林巴',
          value: 2
        },
        {
          name: '非洲鼓',
          value: 3
        },
        {
          name: '钢琴',
          value: 4
        }
      ],
      userDate:[],
      start_time:'',
      end_time:'',
      user_create_time:'',
      user_end_time:''
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    search(){
        this.axios
      .get(
        `${process.env.JINKANG}/v3/activity/single/?activity_id=${this.activityId}`
      )
      .then(res => {
        this.tableLoading = false;
        if(res.data){
          this.dataList = [];
          this.dataList.push(res.data)
        }else{
          this.dataList = []
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
      this.activityId = '';
      if(this.activityId){
          this.page = 0
      }
      this.axios
        .get(
          `${process.env.JINKANG}/v3/activity/show`
        )
        .then(res => {
          this.tableLoading = false;
          if(res.data && res.data.length>0){
            this.dataList = res.data;
          }else{
            this.dataList = []
          }
          
          this.total = res.total;
        });
    },
    formatRow(row) {
      var newRow = Object.assign({}, row);
      ['start_time','end_time'].forEach(e=>{
        this[e] = newRow[e]==0?'':new Date(newRow[e]*1000)
      })
      this.user_create_time = newRow.user_range.create_time==0?'':new Date(newRow.user_range.create_time*1000);
      this.user_end_time = newRow.user_range.end_time==0?'':new Date(newRow.user_range.end_time*1000);
      newRow.is_pay = newRow.user_range.is_pay;
      newRow.is_vip = newRow.user_range.is_vip;
      newRow.teacher_ids = newRow.teacher_ids.join(',');
      newRow.course_show1 = newRow.course_related.show1.join(',');
      newRow.course_show2 = newRow.course_related.show2.join(',');
      newRow.course_not_show = newRow.course_related.not_show.join(',');
      newRow.coupon_send_list = newRow.coupon_related.send.join(',');
      newRow.coupon_no_send_list = newRow.coupon_related.no_send.join(',');
      return newRow;
    },
    delete(id) {
      this.axios
        .get(process.env.process.env.JINKANG + "/v1/new_question/deleted/?_id=" + id)
        .then(res => {
          this.getTableData();
        });
    },
    createNewAc() {
      this.modalCoverShow = false;
      this.formValidate = {};
      ['start_time','end_time','user_create_time','user_end_time'].forEach(e=>{
          this[e] = ''
      })
      this.modalShow = true;
      this.modalStatus = "create";
      //上线记得删除
        if(process.env.NODE_ENV==='development'){
            this.formValidate = JSON.parse(localStorage.getItem('param')) || {}
            console.log('zzz')
        }
    },
    handleSubmit(name) {
      if (this.modalStatus == "create") {
        var param = this.formatForm();
        console.log(param)
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
        console.log(param)
        //return
        this.axios
          .post(`${process.env.JINKANG}/v3/activity/create`,param)
          .then(res => {
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.activityId = '';
            this.getTableData();
          });
      }
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      ['start_time','end_time','user_create_time','user_end_time'].forEach(e=>{
                  newForm[e] = new Date(this[e]).valueOf()/1000
              })
      return newForm;
    }
  }
};
//5cac75e8b9db4b4db384d56d
</script>


