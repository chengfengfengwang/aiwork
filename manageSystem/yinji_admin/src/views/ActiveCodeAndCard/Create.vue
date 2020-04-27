<template>
  <div>
    <div class="table_top_tool">
      <div style="margin-bottom:10px">
        <Button type="primary" @click="createNewBank" style="margin-right:30px">新建激活码/奖学金</Button>
      </div>

      <div class="search_item_wrapper">
        <span>渠道来源</span>
        <Select class="search_item" v-model="searchValue.channel_source" placeholder="选择渠道来源">
          <Option :value="name" v-for="(value,name) in channel_source_name" :key="name">{{value}}</Option>
        </Select>
      </div>
      <div class="search_item_wrapper">
        <span>渠道类型</span>
        <Select class="search_item" v-model="searchValue.channel_type" placeholder="选择渠道类型">
          <Option :value="name" v-for="(value,name) in cur_channel_type_name1" :key="name">{{value}}</Option>
        </Select>
      </div>
      <div class="search_item_wrapper">
        <span>课程类型</span>
        <Select class="search_item" v-model="searchValue.course_type" placeholder="选择课程类型">
          <Option :value="name" v-for="(value,name) in course_type_name" :key="name">{{value}}</Option>
        </Select>
      </div>
      <div class="search_item_wrapper">
        <span>课程套餐</span>
        <Select class="search_item" v-model="searchValue.goods_ids" placeholder="选择渠道类型">
          <Option :value="name" v-for="(value,name) in goods_ids_name" :key="name">{{value}}</Option>
        </Select>
      </div>
      <div class="search_item_wrapper">
        <span>卡片类型</span>
        <Select class="search_item" v-model="searchValue.type" placeholder="选择创建类型">
          <Option value="0">课程激活码</Option>
          <Option value="1">奖学金卡</Option>
        </Select>
      </div>
      <div class="search_item_wrapper">
        <span>使用状态</span>
        <Select class="search_item" v-model="searchValue.is_deleted" placeholder="选择创建类型">
          <Option :value="0">已启用</Option>
          <Option :value="1">已禁用</Option>
        </Select>
      </div>
      <div class="search_item_wrapper">
        <span>渠道名称</span>
        <Input class="search_item" v-model="searchValue.channel"></Input>
      </div>
      <div class="search_item_wrapper">
        <span>负责人名称</span>
        <Input class="search_item" v-model="searchValue.principal"></Input>
      </div>
      <div class="search_item_wrapper">
        <span>渠道</span>
        <Select
          filterable
          @on-change="channelChangeSearch"
          v-model="searchValue.channel_id"
          style="width:200px"
        >
          <Option v-for="(item,index) in channelList" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>
      </div>
      <div class="search_item_wrapper">
        <span>sku</span>
        <Select filterable v-model="searchValue.sku_id" style="width:200px">
          <Option v-for="(item,index) in skuList" :value="item.id" :key="index">{{ item.name }}</Option>
        </Select>
      </div>
      <Button type="primary" @click="search" style="margin-left:20px">查询</Button>
      <Button type="info" @click="reset">重置</Button>
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <div style="margin-top:10px">
      <Page
        @on-page-size-change="pageSizeChange"
        @on-change="pageChange"
        :total="total"
        :page-size="pageSize"
        show-sizer
        :page-size-opts="[10,20,40,80,120,160,200]"
        show-elevator
      />
    </div>
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>题库</span>
      </p>
      <div>
        <Form :model="formValue" label-position="right" :label-width="100">
          <FormItem label="创建类型">
            <Select v-model="formValue.type" placeholder="选择创建类型">
              <Option value="0">课程激活码</Option>
              <Option value="1">奖学金卡</Option>
            </Select>
          </FormItem>
          <FormItem label="渠道来源">
            <Select v-model="formValue.channel_source" placeholder="选择渠道来源">
              <Option
                :value="name"
                v-for="(value,name) in channel_source_name"
                :key="name"
              >{{value}}</Option>
            </Select>
          </FormItem>
          <FormItem label="渠道类型">
            <Select v-model="formValue.channel_type" placeholder="选择渠道类型">
              <Option
                :value="name"
                v-for="(value,name) in cur_channel_type_name"
                :key="name"
              >{{value}}</Option>
            </Select>
          </FormItem>
          <FormItem v-show="showArea" label="地域位置">
            <al-selector level="2" gutter="0" v-model="location"/>
          </FormItem>
          <FormItem label="渠道名称">
            <Input v-model="formValue.channel"></Input>
          </FormItem>
          <FormItem label="渠道">
            <Select
              filterable
              @on-change="channelChange"  
              v-model="formValue.channel_id"
              style="width:200px"
            >
              <Option
                v-for="(item,index) in channelList"
                :value="item.id"
                :key="index"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="sku">
            <Select filterable v-model="formValue.sku_id" style="width:200px">
              <Option v-for="(item,index) in skuList" :value="item.id" :key="index">{{ item.name }}</Option>
            </Select>
          </FormItem>
          <FormItem label="课程类型">
            <Select v-model="formValue.course_type" placeholder="选择课程类型">
              <Option :value="name" v-for="(value,name) in course_type_name" :key="name">{{value}}</Option>
            </Select>
          </FormItem>
          <FormItem label="课程套餐">
            <Select v-model="formValue.goods_ids" placeholder="选择渠道类型">
              <Option :value="name" v-for="(value,name) in goods_ids_name" :key="name">{{value}}</Option>
            </Select>
          </FormItem>
          <FormItem label="课程期限">
            <Input placeholder="请填写课程期限（非小数）单位：天" v-model.number="formValue.course_deadline"></Input>
          </FormItem>
          <FormItem label="激活码期限">
            <Input placeholder="请填写激活码期限（非小数）单位：天" v-model.number="formValue.deadline"></Input>
          </FormItem>
          <FormItem label="奖学金卡金额" v-show="showAmount">
            <Input placeholder="请填写奖学金卡金额（非小数）单位：元" v-model.number="formValue.amount"></Input>
          </FormItem>
          <FormItem label="负责人">
            <Input placeholder="请填写相关负责人名称" v-model="formValue.principal"></Input>
          </FormItem>
          <FormItem label="厂商手机号">
            <Input placeholder="请填写厂商手机号" v-model="formValue.phone"></Input>
          </FormItem>
          <FormItem label="生成数量">
            <Input placeholder="请填写生成数量" v-model.number="formValue.count"></Input>
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
import { findkey, encodeSearchParams } from "./../../common/util.js";
export default {
  props: {
    type: {
      default: 1
    }
  },
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      formValue: {},
      location: [],
      columns: [
        {
          title: "渠道名称",
          key: "channel",
          render: (h, params) => {
            return h(
              "div",
              {
                style: {
                  color: "blue",
                  textDecoration: "underline"
                },
                on: {
                  click: () => {
                    this.$router.push({
                      path: "ActivedList",
                      query: { channel: params.row.channel }
                    });
                  }
                }
              },
              params.row.channel
            );
          }
        },
        {
          title: "渠道来源",
          key: "channel_source",
          render: (h, params) => {
            return h(
              "div",
              this.channel_source_name[params.row.channel_source]
            );
          }
        },
        {
          title: "渠道类型",
          key: "channel_type",
          render: (h, params) => {
            return h("div", this.channel_type_name[params.row.channel_type]);
          }
        },
        {
          title: "编号",
          key: "start",
          render: (h, params) => {
            var str = params.row.start + "--" + params.row.end;
            return h("div", str);
          }
        },

        {
          title: "课程套餐",
          key: "goods_ids",
          render: (h, params) => {
            return h("div", this.goods_ids_name[params.row.goods_ids]);
          }
        },
        {
          title: "课程期限(天)",
          key: "course_deadline"
        },
        {
          title: "激活码期限(天)",
          key: "deadline"
        },
        {
          title: "负责人",
          key: "principal"
        },
        {
          title: "生成数量",
          key: "count"
        },
        {
          title: "激活数量",
          key: "used_count"
        },
        {
          title: "金额(元)",
          key: "amount"
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
                      this.downLoad(params.row.id);
                    }
                  }
                },
                "导出"
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
                      if (params.row.is_deleted) {
                        this.stop(params.row.id, false);
                      } else {
                        this.stop(params.row.id, true);
                      }
                    }
                  }
                },
                params.row.is_deleted ? "启用" : "禁用"
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
      bankList: [],
      searchBankList: [],
      editBankList: [],
      searchBank: 0,
      modalCoverShow: "",
      previewSrc: "",
      goods_ids_name: [],
      course_type_name: [],
      channel_type_name: [],
      channel_type_name1: [],
      channel_type_name2: [],
      channel_source_name: [],
      searchValue: {
        //channel_source:'',
        //channel_type:''
      },
      channelList: [],
      skuList: []
    };
  },
  computed: {
    showArea() {
      return this.formValue.channel_source === "1";
    },
    showAmount() {
      return this.formValue.type === "1";
    },
    cur_channel_type_name() {
      console.log(this.formValue.channel_source);
      if (this.formValue.channel_source === "0") {
        console.log("0");
        return this.channel_type_name1;
      } else if (this.formValue.channel_source === "1") {
        console.log("1");
        return this.channel_type_name2;
      } else {
        return this.channel_type_name;
      }
    },
    cur_channel_type_name1() {
      if (this.searchValue.channel_source === "0") {
        return this.channel_type_name1;
      } else if (this.searchValue.channel_source === "1") {
        return this.channel_type_name2;
      } else {
        return this.channel_type_name;
      }
    }
  },
  created() {},
  mounted() {
    //delete this.axios.defaults.headers.common.uid;
    //delete this.axios.defaults.headers.common.token;
    this.getChannels();
    this.get();
  },
  methods: {
    channelChange() {
      this.getSkus(this.formValue.channel_id);
    },
    channelChangeSearch() {
      this.getSkus(this.searchValue.channel_id);
    },
    getSkus(id) {
      this.axios
        .get(
          `http://58.87.125.111:6363/v1/fgoods/index?page=0&size=10000&status=1&channel_id=${
            id
          }&key=`
        )
        .then(res => {
          this.skuList = res.data.list;
        });
    },
    getChannels() {
      this.axios
        .get(
          `http://58.87.125.111:6363/v1/channel/index?page=0&size=999&status=1`
        )
        .then(res => {
          this.channelList = res.data.list;
        });
    },
    downLoad(id) {
      window.location.href = `${process.env.XIAOPO}/${
        process.env.VERSION
      }/code_csv/${id}`;
      // this.axios
      //   .get(`${process.env.XIAOPO}/${process.env.VERSION}/code_csv/${id}`)
      //   .then(res => {
      //     this.get();
      //   });
    },
    handleUpload(file) {
      this.modalCoverShow = true;
      this.previewSrc = window.URL.createObjectURL(file);
      var type;
      var formdata = new FormData();
      formdata.append("material", file);

      formdata.append("type", 0);

      //return false
      this.axios
        .post(
          `${process.env.JINKANG}/${process.env.VERSION}/upload_material/`,
          formdata,
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(res => {
          this.formValidate.cover = res.data;
        });
      return false;
    },
    findBankName(id) {
      var name;
      this.bankList.forEach((e, i) => {
        if (id === e.id) {
          if (id === 0) {
            name = "无";
          } else {
            name = e.name;
          }
        }
      });
      return name;
    },
    handleSearchBank() {
      this.get();
    },
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
      var search = JSON.parse(JSON.stringify(this.searchValue));
      var paramString = "?";

      console.log(typeof search.is_deleted);
      if (typeof search.is_deleted !== "undefined") {
        search.is_deleted = Boolean(search.is_deleted);
      }

      if (Object.keys(search).length > 0) {
        var url =
          `${process.env.XIAOPO}/${process.env.VERSION}/code?page=${
            this.page
          }&size=${this.pageSize}&` + encodeSearchParams(search);
      } else {
        var url = `${process.env.XIAOPO}/${process.env.VERSION}/code?page=${
          this.page
        }&size=${this.pageSize}`;
      }

      //return;
      this.axios.get(url).then(res => {
        this.tableLoading = false;
        if (res.data && res.data.length > 0) {
          this.dataList = res.data;
        } else {
          this.dataList = [];
        }
        this.modalShow = false;
        this.goods_ids_name = res.goods_ids_name;
        this.course_type_name = res.course_type_name;
        console.log(
          Object.assign({}, res.channel_type_name, res.channel_type_name2)
        );
        this.channel_type_name = Object.assign(
          {},
          res.channel_type_name,
          res.channel_type_name2
        );
        this.channel_type_name1 = res.channel_type_name;
        this.channel_type_name2 = res.channel_type_name2;
        this.channel_source_name = res.channel_source_name;
        this.total = res.total;
      });
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      newRow.game_id = newRow.game_id.join();
      return newRow;
    },
    stop(id, status) {
      this.axios
        .put(
          `${process.env.XIAOPO}/${
            process.env.VERSION
          }/code/${id}?is_deleted=${status}`
        )
        .then(res => {
          this.get();
        });
    },
    createNewBank() {
      this.modalCoverShow = false;
      this.formValue = {};
      this.modalShow = true;
    },
    handleSubmit() {
      //console.log(this.location);
      if (this.formValue.channel_source === "1") {
        var myLocation = "";
        this.location.forEach(e => {
          myLocation += e.name + " ";
        });
        this.formValue.location = myLocation.trim();
      }
      console.log(this.formValue);
      //return;
      this.axios
        .post(
          process.env.XIAOPO + "/" + process.env.VERSION + "/code",
          this.formValue
        )
        .then(res => {
          this.$Message.success("生成成功啦!");
          //this.modalShow = false;
          //this.file = "";
          this.get();
        });
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      return newForm;
    },
    search() {
      this.get();
    },
    reset() {
      this.searchValue = {};
      this.get();
    }
  },
  //   watch: {
  //     searchValue: {
  //       handler() {
  //         console.log(this.searchValue);
  //         return;

  //       },
  //       deep: true
  //     }
  //   },
  beforeDestroy() {
    this.axios.defaults.headers.common[
      "token"
    ] = this.$store.state.userInfo.token;
    this.axios.defaults.headers.common["uid"] = this.$store.state.userInfo.uid;
  }
};
//5cac75e8b9db4b4db384d56d
</script>
<style lang="less">
.cover_row {
  img {
    max-height: 100px;
  }
}
.search_item {
  width: 120px !important;
}
.search_item_wrapper {
  display: inline-block;
  margin: 5px 2px;
}
</style>


