<template>
  <div>
    <!-- <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建</Button>
      <span>筛选：</span>
      <Select
        @on-change="handleSearchBank"
        v-model="searchBank"
        placeholder="选择所属题库"
        style="width:200px"
      >
        <Option v-for="item in searchBankList" :key="item.id" :value="item.id">{{item.name}}</Option>
      </Select>
    </div>-->
    <h1 style="margin:30px;text-align:center">批号列表</h1>
    <div style="margin-bottom:10px">
      <Button @click="download" type="info">下载</Button>
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="tableDataList"></Table>
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
          <FormItem label="所属题库" prop="status">
            <Select v-model="formValidate.questionBank" placeholder="选择所属题库">
              <Option v-for="item in editBankList" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="二级分类" prop="name">
            <Input v-model="formValidate.label_two_name" placeholder="请输入二级分类名称"></Input>
          </FormItem>

          <FormItem label="封面">
            <img v-show="modalCoverShow" style="max-width:400px" :src="previewSrc" alt>
            <Upload
              accept="image/*"
              :before-upload="handleUpload"
              :max-size="1024"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button icon="ios-cloud-upload-outline">选择封面</Button>
            </Upload>
            <Input
              :style="{visibility:'hidden',height:'0px',display: 'block'}"
              v-model="formValidate.cover"
              placeholder="输入题库封面地址"
            ></Input>
          </FormItem>
          <FormItem label="权重">
            <Input v-model.number="formValidate.weight" placeholder="输入权重"></Input>
          </FormItem>
          <FormItem label="游戏数量">
            <Input v-model.number="formValidate.other_count" placeholder="输入游戏数量"></Input>
          </FormItem>
          <FormItem label="配置id">
            <Input
              type="textarea"
              :autosize="true"
              v-model.trim="formValidate.game_id"
              placeholder="输入配置id"
            ></Input>
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
export default {
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "批号",
          key: "value"
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
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.$router.push({
                        name: "CodeList",
                        params: {
                          row: params.row
                        }
                      });
                      localStorage.setItem(
                        "batchNumber",
                        JSON.stringify(params.row)
                      );
                    }
                  }
                },
                "查看编码"
              )
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "info",
              //         size: "small"
              //       },
              //       style: {
              //         marginRight: "5px"
              //       },
              //       on: {
              //         click: () => {
              //           this.modalShow = true;
              //           this.formValidate = this.formateRow(params.row);
              //           this.modalStatus = "edit";
              //           this.modalCoverShow = true;
              //           this.previewSrc = this.formValidate.cover;
              //         }
              //       }
              //     },
              //     "编辑"
              //   ),
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "error",
              //         size: "small"
              //       },
              //       on: {
              //         click: () => {
              //           var that = this;
              //           this.$Modal.confirm({
              //             title: "警告",
              //             content: "确定要删除吗？",
              //             onOk() {
              //               that.delete(params.row._id);
              //             }
              //           });
              //         }
              //       }
              //     },
              //     "删除"
              //   )
            ]);
          }
        }
      ],
      tableDataList: [],
      page: 0,
      pageSize: 10,
      total: 0,
      modalStatus: "",
      bankList: [],
      searchBankList: [],
      editBankList: [],
      searchBank: 0,
      modalCoverShow: "",
      previewSrc: ""
    };
  },
  mounted() {
    this.channel = JSON.parse(localStorage.getItem("channel"));
    this.getTableData();
  },
  methods: {
    download() {
      location.href = `${process.env.XIAOPO}/v1/code/channel/batch_number?app=ai&channel=${
            this.channel.name
          }&user_id=${this.channel.channel_user_id}&need_export=true&page=${
            this.page
          }&size=${this.pageSize}`;
    },
    formateBatchList(arr) {
      return arr.map(e => {
        return { value: e };
      });
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
        .post(`${process.env.XIAOPO}/v1/upload_material/`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
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
      //return;
      this.axios
        .get(
          `${process.env.XIAOPO}/v1/code/channel/batch_number?app=ai&channel=${
            this.channel.name
          }&user_id=${this.channel.channel_user_id}&need_export=false&page=${
            this.page
          }&size=${this.pageSize}`
        )
        .then(res => {
          this.tableLoading = false;
          if (res.data && res.data.length > 0) {
            console.log(res.data);
            this.tableDataList = this.formateBatchList(res.data);
            console.log(this.tableDataList);
          } else {
            this.tableDataList = [];
          }

          this.total = res.total;
        });
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      newRow.game_id = newRow.game_id.join();
      return newRow;
    },
    getProductDetail(id) {
      this.axios.get(process.env.XIAOPO + "/v1/goods?id=" + id).then(res => {
        this.tableLoading = false;
        this.getTableData();
      });
    },
    delete(id) {
      this.axios
        .get(process.env.XIAOPO + "/v1/new_question/deleted/?_id=" + id)
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
          .post(process.env.XIAOPO + "/v1/new_question/create/", param)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getTableData();
          });
      } else {
        var param = this.formatForm();
        //console.log(param)
        //return
        this.axios
          .post(process.env.XIAOPO + "/v1/new_question/update/", param)
          .then(res => {
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.file = "";
            this.getTableData();
          });
      }
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      return newForm;
    }
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
</style>



