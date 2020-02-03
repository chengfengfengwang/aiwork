
<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建</Button>
      <!-- <span>筛选：</span>
      <Select
        @on-change="handleSearchBank"
        v-model="searchBank"
        placeholder="选择所属题库"
        style="width:200px"
      >
        <Option v-for="item in searchBankList" :key="item.id" :value="item.id">{{item.name}}</Option>
      </Select>-->
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
          <!-- <FormItem label="所属题库" prop="status">
            <Select v-model="formValidate.questionBank" placeholder="选择所属题库">
              <Option v-for="item in editBankList" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>-->
          <FormItem label="组名称" prop="name">
            <Input v-model="formValidate.group_name" placeholder="请输入组名称"></Input>
          </FormItem>
          <!-- <FormItem label="组成员" prop="name">
            <Button @click="showAllUser">选择成员</Button>
          </FormItem>-->
          <!-- <FormItem label="封面">
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
            <Input v-model.trim="formValidate.game_id" placeholder="输入配置id"></Input>
          </FormItem>-->
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
import AllUser from "./../components/AllUsers";
export default {
  props: {
    type: {}
  },
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "组名",
          key: "group_name"
        },
        {
          title: "创建时间",
          key: "add_time"
        },
        {
          title: " ",
          key: "action",
          width: 250,
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
                      this.modalShow = true;
                      //this.formValidate = this.formateRow(params.row);
                      this.formValidate = params.row;
                      this.modalStatus = "edit";
                    }
                  }
                },
                "编辑"
              ),
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
                        name: "GroupUserList",
                        params: {
                          row: params.row
                        }
                      });
                      localStorage.setItem("curKey", params.row.group_keys);
                      localStorage.setItem("curName", params.row.group_name);
                    }
                  }
                },
                "查看详情"
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
                      this.remove(params.row);
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
  components: {
    AllUser
  },
  mounted() {
    this.getGroupList();
  },
  methods: {
    remove(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        onOk: () => {
          this.axios
            .get(
              `${
                process.env.YINGCHUN
              }/v3/users/grouping/delete_group/?group_keys=${row.group_keys}`
            )
            .then(res => {
              this.$Message.success("删除成功");
              this.getGroupList();
            });
        },
        onCancel: () => {
          //this.$Message.info('Clicked cancel');
        }
      });
    },
    showAllUser() {
      this.$refs.allUser.modalShow = !this.$refs.allUser.modalShow;
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
        .post(`${process.env.YINGCHUN}/v1/upload_material/`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.formValidate.cover = res.data;
        });
      return false;
    },

    handleSearchBank() {
      this.getGroupList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getGroupList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getGroupList();
    },
    getGroupList() {
      this.tableLoading = true;
      this.axios.get(`${process.env.YINGCHUN}/v3/users/grouping/?page=${
            this.page
          }&pageSize=${this.pageSize}`).then(res => {
        this.tableLoading = false;
        if (res.data && res.data.length > 0) {
          this.dataList = res.data;
        } else {
          this.dataList = [];
        }

        this.total = res.paging.total;
      });
      return;

      //var url = `${process.env.YINGCHUN}/v1/new_question/get_many/?type=${this.type}&questionBank=&page=${this.page}&size=${this.pageSize}`;
      this.axios.get(url).then(res => {
        this.tableLoading = false;
        if (res.data && res.data.length > 0) {
          this.dataList = res.data[0].question_data;
        } else {
          this.dataList = [];
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
      this.axios.get(process.env.YINGCHUN + "/v1/goods?id=" + id).then(res => {
        this.tableLoading = false;
        this.getGroupList();
      });
    },
    delete(id) {
      this.axios
        .get(process.env.YINGCHUN + "/v1/new_question/deleted/?_id=" + id)
        .then(res => {
          this.getGroupList();
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
      //console.log(param)
      if (this.modalStatus == "create") {
        //var param = this.formatForm();
        //console.log(param)
        //return
        this.axios
          .get(
            `${process.env.YINGCHUN}/v3/users/grouping/add_group/?group_name=${
              this.formValidate.group_name
            }`
          )
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getGroupList();
          });
      } else {
        //var param = this.formatForm();
        //console.log('zzz')
        //return
        this.axios
          .get(
            `${
              process.env.YINGCHUN
            }/v3/users/grouping/update_group_name/?group_name=${
              this.formValidate.group_name
            }&group_keys=${this.formValidate.group_keys}`
          )
          .then(res => {
            //this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getGroupList();
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







