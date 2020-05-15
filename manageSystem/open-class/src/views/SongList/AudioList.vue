<template>
  <div>
    <Table
      :loading="tableLoading"
      ref="mytable"
      class="mytable"
      :columns="columns"
      :data="tableData"
    ></Table>
    <!-- <Modal v-model="modalShow" width="760">
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
    </Modal>-->
  </div>
</template>
<script>
import { getDate, tableColumnsFilter } from "./../../common/util.js";
export default {
  data() {
    return {
      albumId: "",
      classData: [],
      tableLoading: true,
      columns: [
        {
          title: "专辑",
          key: "title"
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
                "查看歌单"
              )
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
    this.albumId = this.$route.query.albumId;
  },
  mounted() {
  },
  beforeDestroy() {
    this.axios.defaults.headers.common["key"] = this.$store.state.userInfo.key;
  },
  methods: {
    handleSubmit() {
      this.axios
        .get(
          `http://58.87.125.111:55555/v1/share/update_main_address_state?id=${
            this.curRow.id
          }&state=${this.expressState}`
        )
        .then(res => {
          this.getTableData();
        });
    },
    getTypes() {
      this.axios
        .get(`http://api.yinji.immusician.com/v1/song/list_type/`)
        .then(res => {
          //return
          // this.tableLoading = false;
          // console.log(res.data);
          // this.tableData = res.data;
        });
    },
    getTableData() {
      this.tableLoading = true;
      this.axios.get(`http://api.yinji.immusician.com/v1/song/`).then(res => {
        //return
        this.tableLoading = false;
        console.log(res.data);
        this.tableData = res.data;
      });
    },
    getSongList() {
      this.axios
        .get(`http://api.yinji.immusician.com/v1/song/songs/?song_list_id=16`)
        .then(res => {
          //return
          // this.tableLoading = false;
          // console.log(res.data);
          // this.tableData = res.data;
        });
    }
  }
};
</script>
