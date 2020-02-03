<template>
  <div>
    <Breadcrumb style="margin-bottom:10px">
      <BreadcrumbItem to="/channels">渠道</BreadcrumbItem>
      <BreadcrumbItem to="/channels">{{channelName}}</BreadcrumbItem>
      <BreadcrumbItem>sku</BreadcrumbItem>
    </Breadcrumb>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建sku</Button>
    </div>
    <!-- <Select style="width: 160px" @on-change="getTableList" v-model="searchChannel" placeholder>
      <Option v-for="option in channelList" :key="option.id" :value="option.id">{{option.name}}</Option>
    </Select>-->
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <Modal v-model="modalShow" width="760" :mask-closable="false">
      <p slot="header" style>
        <span>sku</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <!-- <FormItem label="渠道">
            <Select style="width: 260px" v-model="formValidate.channel_id" placeholder>
              <Option
                v-for="option in channelList"
                :key="option.id"
                :value="option.id"
              >{{option.name}}</Option>
            </Select>
          </FormItem>-->
          <FormItem label="sku名称">
            <Input v-model="formValidate.name" placeholder="请输入子商品名称"></Input>
          </FormItem>
          <!-- <FormItem label="第三方sku编号">
            <Input v-model="formValidate.third_id" placeholder="请输入第三方sku编号"></Input>
          </FormItem> -->
          <FormItem label="商品列表">
            <span
              v-for="(goods,idx) in courseSlectList"
              :key="idx"
            >({{goods.name}})  </span>
            <Button @click="childGoodsModalShow=true">选择子商品</Button>
            <!-- <Input v-model="formValidate.goods_list" placeholder="请输入商品列表"></Input> -->
          </FormItem>
          <FormItem label="合作方式">
            <Select v-model="formValidate.pay_way" placeholder style="width:200px">
              <Option :value="0">返佣模式</Option>
              <Option :value="1">供销模式</Option>
            </Select>
          </FormItem>
          <FormItem v-if="formValidate.pay_way===0" label="返佣比例">
            <Input v-model="formValidate.bro_percent" placeholder="请输入百分比数值"></Input>
          </FormItem>
          <FormItem v-if="formValidate.pay_way===0" label="团购价">
            <Input v-model="formValidate.group_price" placeholder="单位：元"></Input>
          </FormItem>
          <FormItem v-if="formValidate.pay_way===1" label="供货价格">
            <Input v-model="formValidate.supply_price" placeholder="单位：元"></Input>
          </FormItem>
          <FormItem label="备注">
            <Input v-model="formValidate.note" placeholder="请输入备注"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="childGoodsModalShow" width="760" :mask-closable="false">
      <p slot="header" style>
        <span>音乐壳课程</span>
      </p>
      <AllChildGoods
        :fromDataArr="courseSlectList"
        ref="allChildGoods"
        v-if="childGoodsModalShow"
      />
      <div slot="footer">
        <Button @click="yinjiCourseSubmit" type="primary">确定</Button>
        <Button @click="childGoodsModalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import AllChildGoods from "./../../components/AllChildGoods/AllChildGoods";
export default {
  data() {
    return {
      childGoodsModalShow: false,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "名称",
          key: "name"
        },
        // {
        //   title: "联系人",
        //   key: "username"
        // },
        // {
        //   title: "电话",
        //   key: "phone"
        // },
        // {
        //   title: "权重",
        //   key: "weight"
        // },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          width: 300,
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
                      this.modalStatus = "edit";
                      this.formValidate = JSON.parse(
                        JSON.stringify(params.row)
                      );
                      this.formValidate.group_price = this.formValidate
                        .group_price
                        ? this.formValidate.group_price / 100
                        : "";
                      this.formValidate.supply_price = this.formValidate
                        .supply_price
                        ? this.formValidate.supply_price / 100
                        : "";
                      delete this.formValidate._index;
                      delete this.formValidate._rowKey;
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
                          that.remove(params.row.id);
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
      channelList: [],
      tableLoading: true,
      searchChannel: "",
      channelId: localStorage.getItem("channelId")
        ? localStorage.getItem("channelId")
        : "",
      channelName: localStorage.getItem("channelName")
        ? localStorage.getItem("channelName")
        : "",
      courseSlectList:[]
    };
  },
  components: {
    AllChildGoods
  },
  mounted() {
    this.getTableList();
    //this.getChannelList();
  },
  methods: {
    yinjiCourseSubmit() {
      this.formValidate.goods_map = this.$refs.allChildGoods.selected.map(e=>{
        return {
          id:e.id,
          course_name:e.name
        }
      });
      //console.log(this.courseSlectList)
      this.formValidate.goods_list = this.$refs.allChildGoods.selected.map(e=>e.id);
      this.childGoodsModalShow = false;
    },
    getChannelList() {
      this.axios
        .get(`${process.env.WULIU}/channel/index?page=0&size=999&status=1`)
        .then(res => {
          this.tableLoading = false;
          this.channelList = res.data.list;
        });
    },
    remove(id) {
      this.axios
        .post(`${process.env.WULIU}/fgoods/delete`, {
          id
        })
        .then(res => {
          this.getTableList();
        });
    },
    createNewBank() {
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
    },
    handleSubmit() {
      this.formValidate.channel_id = this.channelId;
      let param = JSON.parse(JSON.stringify(this.formValidate));
      // param.bro_percent
      console.log(typeof param.bro_percent);
      if (param.bro_percent && param.bro_percent.toString().indexOf("%") != -1) {
        param.bro_percent = param.bro_percent.slice(
          0,
          param.bro_percent.length - 1
        );
      }
      param.group_price = param.group_price ? param.group_price * 100 : 0;
      param.supply_price = param.supply_price ? param.supply_price * 100 : 0;
      param.goods_list = param.goods_list.join();
      delete this.formValidate.goods_map;
      // console.log(param);
      // return
      if (this.modalStatus == "create") {
        //return
        this.axios
          .post(`${process.env.WULIU}/fgoods/create`, param)
          .then(res => {
            this.modalShow = false;
            this.getTableList();
          });
      } else {
        //console.log(this.formValidate);
        //return;
        this.axios
          .post(`${process.env.WULIU}/fgoods/update`, param)
          .then(res => {
            //this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getTableList();
          });
      }
    },
    getTableList(channel_id = this.channelId) {
      if (!channel_id) {
        return;
      }

      this.axios
        .get(
          `${
            process.env.WULIU
          }/fgoods/index?page=0&size=999&status=1&channel_id=${channel_id}`
        )
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.list;
        });
    }
  },
  watch:{
    formValidate:{
      deep:true,
      handler(){
        if(this.formValidate.goods_map){
          this.courseSlectList = this.formValidate.goods_map.map(e=>{
            return{
              id:e.id,
              name:e.course_name
            }
          })
        }else{
          this.courseSlectList = []
        }
      }
    }
  }
};
</script>
