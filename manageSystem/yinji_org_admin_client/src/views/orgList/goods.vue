<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建商品</Button>
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>商品</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="商品名称">
            <Input style="width:300px" v-model="formValidate.name" placeholder="请输入商品名称"></Input>
          </FormItem>
          <FormItem label="乐器类型">
            <Select  @on-change="getCourseList" multiple v-model="formValidate.instrument">
              <Option v-for="(value,name,idx) in instruments" :key="idx" :value="value">{{name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="课程">
            <Select  multiple v-model="formValidate.course_list">
              <Option v-for="(item,index) in courseList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="题库">
            <Select multiple v-model="formValidate.test_list">
              <Option v-for="(item,index) in qBankList" :key="index" :value="item._id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否是体验">
            <Select  v-model="formValidate.is_trial">
              <Option  :value="0">不是</Option>
              <Option  :value="1">是</Option>
            </Select>
          </FormItem>
          <FormItem v-if="formValidate.is_trial==1" label="体验时间">
            <Input style="width:300px" v-model.number="formValidate.trial_time" placeholder="单位：天"></Input>
          </FormItem>
          <FormItem v-if="formValidate.is_trial==1" label="解锁节数">
            <Input style="width:300px" v-model.number="formValidate.course_locks" placeholder="请输入解锁节数"></Input>
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
const instruments = require("./../../common/instruments.js");
const isEqual = require('lodash.isequal');
export default {
  data() {
    return {
      tableLoading: true,
      columns: [
        {
          title: "id",
          key: "_id"
        },
        {
          title: "名称",
          key: "name"
        },
        {
          title: "instrument",
          key: "instrument"
        },
        {
          title: "course_list",
          key: "course_list"
        },
        {
          title: "test_list",
          key: "test_list"
        },
        // {
        //   title: "课程名称",
        //   key: "course_name_list",
        //   render: (h, params) => {
        //     return h("div", params.row.course_name_list.join("/"));
        //   }
        // },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          width: 300,
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
                      this.formValidate = this.formateRow(params.row);
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
                  on: {
                    click: () => {
                      var that = this;
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定要删除吗？",
                        onOk() {
                          that.delete(params.row.institutions_id);
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
      modalShow: false,
      formValidate: {},
      dataList: [],
      instruments,
      courseList: [],
      qBankList: [],
      page: 0
    };
  },
  mounted() {
    this.getGoods();
    this.getQBankList();
    this.getCourseList();
  },
  methods: {
    // courseOpenChange(onOff){
    //   let oldValue,newValue;
    //   if(onOff){
    //      oldValue = JSON.parse(JSON.stringify(this.formValidate.course_list));
    //   }else{
    //      newValue = JSON.parse(JSON.stringify(this.formValidate.course_list));
    //     if(!isEqual(oldValue,newValue)){
    //       this.getQBankList(undefined,true)
    //     }
    //   }
    // },
    // instrumentOpenChange(onOff){
    //   let oldValue,newValue;
    //   if(onOff){
    //      oldValue = JSON.parse(JSON.stringify(this.formValidate.instrument));
    //   }else{
    //      newValue = JSON.parse(JSON.stringify(this.formValidate.instrument));
    //     if(!isEqual(oldValue,newValue)){
    //       this.getCourseList(undefined,true)
    //     }
    //   }
    // },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      // this.getCourseList(row.instrument);
      // this.getQBankList(row.course_list);
      return newRow;
    },
    //题库
    getQBankList(course_ids = this.formValidate.course_list, manual = false) {
      console.log("请求题库",manual);
      if (manual) {
        this.qBankList = [];
        this.formValidate.test_list = [];
      }

      this.axios
        .post(`${process.env.COURSE_LIST}/new_question/course_list`)
        .then(res => {
          this.qBankList = res.data;
        });
    },
    //课程
    getCourseList(instrument = this.formValidate.instrument, manual = false) {
      console.log("请求课程",manual);
      if (manual) {
        this.courseList = [];
        this.qBankList = [];
        this.formValidate.course_list = [];
        this.formValidate.test_list = [];
      }
      if(instrument===undefined){
        return
      }
      this.axios
        .post(
          `${
            process.env.AGENTSV9
          }/courses/all`,{
            online:true,
            instrument_type:instrument
          }
        )
        .then(res => {
            this.courseList = res.data.data;
        });
    },
    delete(id) {
      var param = {
        id: id,
        is_delete: true
      };
      this.axios.get(`${process.env.AGENTSV9}/goods/del`, param).then(res => {
        this.modalShow = false;
        this.getGoods();
      });
    },
    createNewBank() {
      this.formValidate = {};
      this.modalShow = true;
      this.modalStatus = "create";
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      return newForm;
    },
    handleSubmit(name) {
      var param = this.formatForm();
      console.log(param)
      // return
      if (this.modalStatus == "create") {
        //return
        this.axios
          .post(`${process.env.AGENTSV9}/goods/create`, param)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getGoods();
          });
      } else {
        
        param.is_delete = false;
        param.id = param.institutions_id;
        [
          "price",
          "_rowKey",
          "_index",
          "is_delete",
          "created_at",
          "updated_at"
        ].forEach(e => {
          delete param[e];
        });
        this.axios
          .post(`${process.env.AGENTSV9}/goods/modify`, param)
          .then(res => {
            this.modalShow = false;
            this.getGoods();
          });
      }
    },
    getGoods() {
      this.tableLoading = true;
      this.axios
        .get(`${process.env.AGENTSV9}/goods/?page=${this.page}&size=999`)
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.goods;
          //this.total = res.total;
        });
    }
  },
  watch: {
    formValidate: {
      handler(newName, oldName) {
        // console.log('---this.formValidate---')
        // console.log(this.formValidate)
      },
      deep: true
    }
  }
};
</script>
