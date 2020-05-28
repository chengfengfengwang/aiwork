<template>
  <div>
    <!-- <div style="margin-bottom:5px">
      <span>筛选：</span>
      <DatePicker
        type="daterange"
        placement="bottom-end"
        placeholder="按日期筛选"
        style="width: 200px"
        @on-change="timeSelectChange"
      ></DatePicker>
    </div>-->

    <Table
      :loading="tableLoading"
      ref="mytable"
      class="mytable"
      :columns="columns"
      :data="tableData"
    ></Table>
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>修改发货状态</span>
      </p>
      <div>
        <Form ref="formValidate" :label-width="100">
          <FormItem label="状态">
            <Select v-model="expressState" style="width:200px">
              <Option
                v-for="item in expressStateList"
                :value="item.value"
                :key="item.value"
              >{{ item.name }}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow = false;">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getDate, tableColumnsFilter } from "./../common/util.js";
export default {
  data() {
    return {
      classId: "",
      classData: [],
      tableLoading: true,
      columns: [
          
          {
          title: "分享有效数",
          key: "valid_count"
        },
        {
          title: "商品名称",
          key: "goods_name"
        },
        {
          title: "姓名",
          key: "name"
        },
        {
          title: "电话",
          key: "phone"
        },
        {
          title: "地区",
          key: "zone"
        },
        {
          title: "详细地址",
          key: "address"
        },
        {
          title: "状态",
          key: "state_show"
        },
        {
          title: "创建日期",
          key: "created_at"
        },
        {
          title: " ",
          key: "action",
          minWidth: 50,
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
                      this.curRow = params.row;
                      this.modalStatus = "edit";
                    }
                  }
                },
                "修改发货状态"
              )
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "error",
              //         size: "small"
              //       },
              //       on: {
              //         click: () => {
              //           this.delete(params.row);
              //         }
              //       }
              //     },
              //     "删除"
              //   )
            ]);
          }
        }
      ],
      modalShow: false,
      tableData: [],
      expressState: "",
      expressStateList: [
        {
          name: "未发货",
          value: 0
        },
        {
          name: "已发货",
          value: 5
        },
        {
          name: "驳回",
          value: -1
        }
      ]
    };
  },
  created() {
    delete this.axios.defaults.headers.common["key"];
    this.getTableData();
  },
  mounted() {
      console.log(this.$store.state)
  },
  beforeDestroy() {
      this.axios.defaults.headers.common['key'] = this.$store.state.userInfo.key;

  },
  methods: {
    timeSelectChange(value) {
      this.getClassDetail(this.classData.class_id, value[0], value[1]);
    },
    handleSubmit() {
      this.axios
        .get(
          `http://58.87.125.111:55555/v1/share/update_main_address_state?id=${this.curRow.id}&state=${this.expressState}`
        )
        .then(res => {
          this.getTableData()
        });
    },
    getTableData() {
      this.tableLoading = true;
      this.axios
        .get(`http://58.87.125.111:55555/v1/share/main_address_list`)
        .then(res => {
          //return
          this.tableLoading = false;
          console.log(res.data);
          this.tableData = res.data;
        });
    }
  }
};
</script>
