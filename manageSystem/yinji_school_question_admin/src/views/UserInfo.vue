<template>
  <div>
    <!-- <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建</Button>
    </div> -->
    <div class="table_top_tool">
      <span>手机号：</span>
      <Input v-model="searchTel" placeholder="输入手机号" style="width: 200px" />
      <Button type="primary" @click="getTableData" style="margin-right:30px">搜索</Button>
      <span>日期：</span>
        <DatePicker
          type="daterange"
          placement="bottom-end"
          placeholder="按日期筛选"
          style="width: 200px"
          @on-change="allTimeSelectChange"
        ></DatePicker>
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
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>编辑</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="手机号" prop="name">
            <Input v-model="formValidate.phone" placeholder="请输入手机号"></Input>
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
import {formatTime} from './../common/util.js'
export default {
  props:{
    type:{
      
    }
  },
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "昵称",
          key: "nickname"
        },
        {
          title: "手机号码",
          key: "phone"
        },
        // {
        //   title: "商品封面",
        //   key: "goods_name",
        //   render: (h, params) => {
        //     return h("img", {
        //       attrs: {
        //         src: typeof params.row.goods_cover=='string' ? params.row.goods_cover : params.row.goods_cover[0]
        //       },
        //       style: {
        //         width: "100%"
        //       }
        //     });
        //   }
        // },
        {
          title: "注册时间",
          key: "registered_dt"
        },
        {
          title: "金币",
          key: "currency"
        },
        {
          title: "性别",
          key: "sex_show"
        },
         {
          title: "软件版本号",
          key: "extra_info",
          render: (h, params) => {
            return h("span", params.row.extra_info.device.version);
          }
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
                      this.formValidate = this.formateRow(params.row);
                      this.modalStatus = "edit";
                    }
                  }
                },
                "编辑"
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
      searchTel:"",
      searchOrder:"",
      beginTime: "",
      endTime: "",
    };
  },
  mounted() {
    this.getTableData();
  },
  methods: {
      allTimeSelectChange(value) {
      this.beginTime = value[0];
      this.endTime = value[1];
      this.page = 0;
      this.getTableData();
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
      if(this.searchTel){
          this.page = 0
      }
      this.axios
        .get(
          `http://hot.test.immusician.com:8051/v2/users/details/?begin_date=${this.beginTime}&end_date=${this.endTime}&channel_type=undefined&need_count=${this.pageSize}&platform=-1&instrument=undefined&channel=&share_channel=&title=undefined&data_type=undefined&item_id=0&phone=${this.searchTel}&page=${this.page}&size=${this.pageSize}`
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
    formateRow(row) {
      var newRow = Object.assign({}, row);
      return newRow;
    },
    getProductDetail(id) {
      this.axios.get(process.env.XIANSHANG + "/v2/goods?id=" + id).then(res => {
        this.tableLoading = false;
        this.getTableData();
      });
    },
    delete(id) {
      this.axios
        .get(process.env.XIANSHANG + "/v2/new_question/deleted/?_id=" + id)
        .then(res => {
          this.getTableData();
        });
    },
    createNewBank() {
      this.modalCoverShow = false;
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
      //上线记得删除
      //   if(localStorage.getItem('wang')){
      //       this.formValidate = JSON.parse(localStorage.getItem('form')) || {}
      //   }
    },
    handleSubmit(name) {
      if (this.modalStatus == "create") {
        var param = this.formatForm();
        param.label_one_id = this.type;
        //console.log(param)
        //return
        this.axios
          .post(process.env.XIANSHANG + "/v2/new_question/create/", param)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getTableData();
          });
      } else {
        var param = this.formatForm();
        //console.log(`http://api.yinji.immusician.com:8051/v2/user/update/?god=${param.uid}&phone=${param.phone}`)
        //return
        this.axios
          .get(`http://api.yinji.immusician.com:8051/v2/user/admin/update/?uid=${param.uid}&phone=${param.phone}`)
          .then(res => {
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.file = "";
            this.searchTel = '';
            this.getTableData();
          });
      }
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      
      return newForm;
    }
  },
  beforeDestroy() {
    this.axios.defaults.headers.common[
      "token"
    ] = this.$store.state.userInfo.token;
    this.axios.defaults.headers.common["uid"] = this.$store.state.userInfo.uid;
  }
};
//5cac75e8b9db4b4db384d56d
</script>


