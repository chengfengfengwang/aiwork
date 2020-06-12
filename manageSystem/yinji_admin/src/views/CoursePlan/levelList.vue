<template>
  <div>
    <span>渠道：</span>
    <Select v-model="searchChannel" placeholder="选择渠道" style="width:200px">
      <Option v-for="item in channelList" :key="item.id" :value="item.id">{{item.name}}</Option>
    </Select>
    <span>状态：</span>
    <Select style="width: 160px" v-model="status" placeholder>
      <Option v-for="status in statusList" :key="status.value" :value="status.value">{{status.name}}</Option>
    </Select>
    <span>开始时间</span>
    <DatePicker v-model="startTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
    <span>结束时间</span>
    <DatePicker v-model="endTime" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
    <Button type="primary" @click="getTableList">搜索</Button>
    <Button type="primary" @click="createNewBank">新建</Button>
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
        <Form :model="formValue" label-position="right" :label-width="100">
          <FormItem label="创建类型">
            <Select v-model="formValue.type" placeholder="选择创建类型">
              <Option value="0">课程激活码</Option>
              <Option value="1">奖学金卡</Option>
            </Select>
          </FormItem>
          <FormItem label="渠道名称">
            <Input v-model="formValue.channel"></Input>
          </FormItem>
          <!-- <FormItem label="课程套餐">
            <Select v-model="formValue.goods_ids" placeholder="选择渠道类型">
              <Option :value="name" v-for="(value,name) in goods_ids_name" :key="name">{{value}}</Option>
            </Select>
          </FormItem> -->
          <FormItem label="课程期限">
            <Input placeholder="请填写课程期限（非小数）单位：天" v-model.number="formValue.course_deadline"></Input>
          </FormItem>
          <FormItem label="激活码期限">
            <Input placeholder="请填写激活码期限（非小数）单位：天" v-model.number="formValue.deadline"></Input>
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
export default {
  data() {
    return {
      searchChannel: "",
      startTime: "",
      endTime: "",
      status: "",
      tableLoading: false,
      total: 0,
      page: 0,
      pageSize: 10,
      columns: [
        {
          title: "名称",
          key: "name"
        },

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
                      this.uploadModalShow = true;
                      this.curChannelId = params.row.id;
                    }
                  }
                },
                "上传"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: this.editShow ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem("channelId", params.row.id);
                      localStorage.setItem("channelName", params.row.name);
                      this.$router.push("/goodsPackage");
                    }
                  }
                },
                "sku"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: this.editShow ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      this.modalShow = true;
                      this.modalStatus = "edit";
                      this.formValidate = JSON.parse(
                        JSON.stringify(params.row)
                      );
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
                  style: {
                    marginRight: "5px",
                    display: this.editShow ? "inline-block" : "none"
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
      statusList: [
        {
          name: "未处理",
          value: 0
        },
        {
          name: "已下载",
          value: 1
        },
        {
          name: "已回执",
          value: 2
        },
        {
          name: "全部",
          value: 3
        }
      ],
      channelList: [],
      dataList: [],
      modalShow: false,
      formValue:{}
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
       createNewBank() {
      this.modalCoverShow = false;
      this.formValue = {};
      this.modalShow = true;
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
   
    getTableList() {
      const formObj = {
        start_time: this.startTime.valueOf() / 1000,
        end_time: this.endTime.valueOf() / 1000,
        status: this.status,
        channel_id: this.searchChannel
      };
      this.axios.get(`${process.env.JINKANG}/v1/courses_lv/show/?course_id=27`).then(res => {
        this.tableLoading = false;
        this.dataList = res.data.list;
      });
    }
  }
};
</script>


