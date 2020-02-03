<template>
  <div>
    <!-- <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建</Button>
    </div> -->
    <div class="table_top_tool">
      <span>手机号：</span>
      <Input v-model="searchTel" placeholder="输入手机号" style="width: 200px" />
      <span style="margin-left:20px">订单号：</span>
      <Input v-model="searchOrder" placeholder="输入订单号" style="width: 200px" />
      <Button type="primary" @click="get" style="margin-right:30px">搜索</Button>
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
        <span>题库</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <!-- <FormItem label="一级分类" prop="status">
            <Select v-model="formValidate.label_one" placeholder="选择商品状态">
              <Option :value="0">乐理</Option>
              <Option :value="1">练耳</Option>
              <Option :value="2">常识</Option>
              <Option :value="3">视唱</Option>
            </Select>
          </FormItem> -->
          <FormItem label="二级分类" prop="name">
            <Input v-model="formValidate.label_two_name" placeholder="请输入二级分类名称"></Input>
          </FormItem>
          <FormItem label="权重" prop="old_price">
            <Input v-model.number="formValidate.weight" placeholder="输入权重"></Input>
          </FormItem>
          <FormItem label="配置id" prop="price">
            <Input type="textarea" :autosize="true" v-model="formValidate.game_id" placeholder="输入配置id"></Input>
          </FormItem>
          <!-- <FormItem label="是否推荐" prop="recommend">
            <RadioGroup v-model="formValidate.recommend">
              <Radio label="true">推荐</Radio>
              <Radio label="false">不推荐</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="是否上线" prop="online">
            <RadioGroup v-model="formValidate.online">
              <Radio label="true">上线</Radio>
              <Radio label="false">不上线</Radio>
            </RadioGroup>
          </FormItem>-->
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
          title: "订单编号",
          key: "_id"
        },
        {
          title: "商品名称",
          key: "goods_name"
        },
        {
          title: "商品封面",
          key: "goods_name",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: typeof params.row.goods_cover=='string' ? params.row.goods_cover : params.row.goods_cover[0]
              },
              style: {
                width: "100%"
              }
            });
          }
        },
        {
          title: "买家uid",
          key: "uid"
        },
        {
          title: "收货人",
          key: "phone"
        },
        {
          title: "规格",
          key: "sku"
        },
        {
          title: "购买数量",
          key: "count"
        },
        {
          title: "单价(元)",
          key: "goods_price",
          render: (h, params) => {
             return h("div", params.row.goods_price/100);
           }
        },
         {
          title: "支付金额(元)",
          key: "pay_amount",
          render: (h, params) => {
             return h("div", params.row.pay_amount/100);
           }
        },
         {
          title: "下单时间",
          key: "pay_time",
          render: (h, params) => {
             return h("div", formatTime(params.row.pay_time));
           }
        },
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
        //               this.formValidate = this.formateRow(params.row);
        //               this.modalStatus = "edit";
        //             }
        //           }
        //         },
        //         "编辑"
        //       ),
        //       h(
        //         "Button",
        //         {
        //           props: {
        //             type: "error",
        //             size: "small"
        //           },
        //           on: {
        //             click: () => {
        //               this.delete(params.row._id);
        //             }
        //           }
        //         },
        //         "删除"
        //       )
        //     ]);
        //   }
        // }
      ],
      dataList: [],
      page: 0,
      pageSize: 10,
      total: 0,
      modalStatus: "",
      searchTel:"",
      searchOrder:""
    };
  },
  mounted() {
    delete this.axios.defaults.headers.common.uid;
    delete this.axios.defaults.headers.common.token;
    this.get();
  },
  methods: {
    pageChange(page) {
      this.page = page - 1;
      this.get();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.get();
    },
    get() {
      this.tableLoading = true;
      this.axios
        .get(
          `${process.env.XIANSHANG}/${process.env.VERSION}/payment/list/?page=${this.page}&size=${
            this.pageSize
          }&phone=${this.searchTel}&id=${this.searchOrder}`
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
      this.axios.get(process.env.XIANSHANG + "/${process.env.VERSION}/goods?id=" + id).then(res => {
        this.tableLoading = false;
        this.get();
      });
    },
    delete(id) {
      this.axios
        .get(process.env.XIANSHANG + "/${process.env.VERSION}/new_question/deleted/?_id=" + id)
        .then(res => {
          this.get();
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
          .post(process.env.XIANSHANG + "/${process.env.VERSION}/new_question/create/", param)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.get();
          });
      } else {
        var param = this.formatForm();
        //console.log(param)
        //return
        this.axios
          .post(process.env.XIANSHANG + "/${process.env.VERSION}/new_question/update/", param)
          .then(res => {
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.file = "";
            this.get();
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


