<template>
  <div>
    <div style="margin-bottom:5px">
      <!-- <span>筛选：</span>
      <DatePicker
        type="daterange"
        placement="bottom-end"
        placeholder="按日期筛选"
        style="width: 200px"
        @on-change="timeSelectChange"
      ></DatePicker> -->
      <Button type="primary" @click="createNew" style="margin-right:30px">新建</Button>
    </div>

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
          <FormItem label="分类">
            <Select v-model="formValue.list_type" style="width:200px">
              <Option
                v-for="item in typeList"
                :value="item.key"
                :key="item.key"
              >{{ item.title }}</Option>
            </Select>
          </FormItem>
          <FormItem label="专辑名称">
            <Input v-model="formValue.title"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit" type="primary">确定</Button>
        <Button @click="modalShow = false;">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getDate, tableColumnsFilter } from "./../../common/util.js";
import Upload from "./../../components/Upload/Upload";

export default {
  data() {
    return {
      classId: "",
      classData: [],
      tableLoading: true,
      columns: [
          
          {
          title: "专辑",
          key: "title"
        },
        // {
        //   title: "顺序",
        //   key: "sort"
        // },
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
                      this.$router.push({
                        path: "AudioList",
                        query: { albumId: params.row.list_type }
                      });
                    }
                  }
                },
                "查看歌单"
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
      typeList: []
    };
  },
  created() {
    delete this.axios.defaults.headers.common["key"];
    this.getTableData();
    this.getTypes();
    this.getSongList()
  },
  mounted() {
  },
  beforeDestroy() {
      this.axios.defaults.headers.common['key'] = this.$store.state.userInfo.key;

  },
  methods: {
    createNew() {
      this.formValue = {};
      this.modalShow = true;
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
    getTypes(){
      this.axios
        .get(`http://api.yinji.immusician.com/v1/song/list_type/`)
        .then(res => {
           this.typeList = res.data;
        });
    },
    getTableData() {
      this.tableLoading = true;
      this.axios
        .get(`http://api.yinji.immusician.com/v1/song/`)
        .then(res => {
          //return
          this.tableLoading = false;
          console.log(res.data);
          this.tableData = res.data;
        });
    },
    getSongList(){
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
