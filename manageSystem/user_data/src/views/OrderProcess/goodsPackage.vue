<template>
  <div>
    <Breadcrumb style="margin-bottom:10px">
      <BreadcrumbItem to="/channels">渠道</BreadcrumbItem>
      <BreadcrumbItem to="/channels">{{channelName}}</BreadcrumbItem>
      <BreadcrumbItem>sku</BreadcrumbItem>
    </Breadcrumb>
    <div class="table_top_tool">
      <span>搜索：</span>
      <Input style="width:160px" v-model="searchKey" placeholder="请输入关键字搜索"></Input>
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建sku</Button>
    </div>
    <!-- <Select style="width: 160px" @on-change="getTableList" v-model="searchChannel" placeholder>
      <Option v-for="option in channelList" :key="option.id" :value="option.id">{{option.name}}</Option>
    </Select>-->
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <div style="margin-top:10px">
      <Page
        @on-page-size-change="pageSizeChange"
        @on-change="pageChange"
        :total="total"
        :page-size="pageSize"
        show-sizer
        :page-size-opts="[10,30,40,60,80,100]"
        show-elevator
      />
    </div>
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
          </FormItem>-->
          <FormItem label="商品列表">
            <span v-for="(goods,idx) in courseSlectList" :key="idx">({{goods.name}})</span>
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
          <FormItem label="标记名称">
            <Input v-model="formValidate.show_name" placeholder="请输入备注"></Input>
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
    <Modal v-model="downloadModalShow" width="760" :mask-closable="false">
      <p slot="header" style>
        <span>导单</span>
      </p>
      <div>
        <Form ref="formValidate" :label-width="100">
          <FormItem label="开始时间">
            <DatePicker
              v-model="startTime1"
              type="date"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="结束时间">
            <DatePicker
              v-model="endTime1"
              type="date"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="downloadModalSubmit" type="primary">确定</Button>
        <Button @click="downloadModalShow=false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="smsModalShow" width="760" :mask-closable="false">
      <p slot="header" style>
        <span>短信编辑</span>
      </p>
      <div>
        <Form :label-width="100">
          <FormItem label="短信内容">
            <Input type="textarea" :rows="4" v-model="smsContent"></Input>
            <div>提示：点击提交进入短信审核</div>
          </FormItem>
          
        </Form>
      </div>
      <div slot="footer">
        <Button @click="smsModalSubmit" type="primary">提交审核</Button>
        <Button @click="smsModalShow=false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="smsFileModalShow" width="760" :mask-closable="false">
      <p slot="header" style>
        <span>批量发送短信</span>
      </p>
      <div>
        <Form :label-width="100">
          <FormItem label="上传文件">
            <Upload
              accept="*"
              :before-upload="beforeUpload"
              :max-size="1024"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button icon="ios-cloud-upload-outline">上传文件</Button>
            </Upload>
            <div>{{fileName}}</div>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="smsFileModalSubmit" type="primary">确定</Button>
        <Button @click="smsFileModalShow=false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="childGoodsModalShow" width="760" :mask-closable="false">
      <p slot="header" style>
        <span>音乐壳课程</span>
      </p>
      <AllChildGoods :fromDataArr="courseSlectList" ref="allChildGoods" v-if="childGoodsModalShow"/>
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
          key: "show_name"
        },
        {
          title: "短信状态",
          key: "state"
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
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.downloadModalShow = true;
                      this.name = params.row.name;
                      this.channel_id = params.row.channel_id;
                    }
                  }
                },
                "导单"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.smsModalShow = true;
                      this.skuId = params.row.id;
                      this.smsContent = params.row.content;
                    }
                  }
                },
                "短信"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.smsFileModalShow = true;
                      this.smsId = params.row.sms_id;
                    }
                  }
                },
                "发送短信"
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
      courseSlectList: [],
      page: 0,
      pageSize: 100,
      total: 0,
      downloadModalShow: false,
      smsModalShow: false,
      smsFileModalShow: false,
      startTime1: "",
      endTime1: "",
      searchKey: "",
      smsContent: "",
      fileName:''
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
    beforeUpload(file) {
      this.fileName = file.name;
      this.file = file;
      return false;
    },
    smsModalSubmit() {
      const formObj = {
        content: this.smsContent,
        goods_id: this.skuId
      };
      this.axios.post(`${process.env.WULIU}/sms/create`, formObj).then(res => {
        if (!res.error) {
          this.smsModalShow = false;
        }
      });
    },
    smsFileModalSubmit() {
      var formdata = new FormData();
      formdata.append("file", this.file);
      formdata.append("template_id", this.smsId);
      this.axios
        .post(`${process.env.WULIU}/sms/upload_form`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          if (!res.error) {
            this.smsFileModalShow = false;
          }
        });
    },
    downloadModalSubmit() {
      const formObj = {
        start_time: this.startTime1.valueOf() / 1000,
        end_time: this.endTime1.valueOf() / 1000,
        channel_id: this.channel_id,
        name: this.name
      };
      this.axios
        .post(`${process.env.WULIU}/tongji/order_down`, formObj)
        .then(res => {
          window.open(res.data.down_url, "_blank");
        });
    },
    pageChange(page) {
      this.page = page - 1;
      this.getTableList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getTableList();
    },
    yinjiCourseSubmit() {
      this.formValidate.goods_map = this.$refs.allChildGoods.selected.map(e => {
        return {
          id: e.id,
          course_name: e.name
        };
      });
      //console.log(this.courseSlectList)
      this.formValidate.goods_list = this.$refs.allChildGoods.selected.map(
        e => e.id
      );
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
      if (
        param.bro_percent &&
        param.bro_percent.toString().indexOf("%") != -1
      ) {
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
          `${process.env.WULIU}/fgoods/index?page=${this.page}&size=${
            this.pageSize
          }&status=1&channel_id=${channel_id}&key=${this.searchKey}`
        )
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.list;
          this.total = res.data.total;
        });
    }
  },
  watch: {
    formValidate: {
      deep: true,
      handler() {
        if (this.formValidate.goods_map) {
          this.courseSlectList = this.formValidate.goods_map.map(e => {
            return {
              id: e.id,
              name: e.course_name
            };
          });
        } else {
          this.courseSlectList = [];
        }
      }
    },
    searchKey() {
      this.getTableList();
    }
  }
};
</script>
