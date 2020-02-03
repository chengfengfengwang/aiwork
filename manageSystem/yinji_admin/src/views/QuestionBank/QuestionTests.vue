<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewTest" style="margin-right:30px">新建</Button>
      <span>筛选：</span>
      <Select
        @on-change="handleSearchBank"
        v-model="searchBank"
        placeholder="选择所属题库"
        style="width:200px"
      >
        <Option v-for="item in searchBankList" :key="item.id" :value="item.id">{{item.name}}</Option>
      </Select>
    </div>
    <Table :loading="tableLoading" border :columns="tableHeader" :data="testList"></Table>
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
        <span>新增预约时间</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="所属题库" prop="status">
            <Select v-model="formValidate.questionBank" placeholder="选择所属题库">
              <Option v-for="item in editBankList" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="名称">
            <Input v-model="formValidate.name" placeholder="请输入测试题名称"></Input>
          </FormItem>
          <FormItem label="时长">
            <Input v-model="formValidate.during" placeholder="请输入时长，单位分钟"></Input>
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
          <FormItem label="笔试题描述">
            <Input v-model="formValidate.type0_description" placeholder="请输入笔试题描述"></Input>
          </FormItem>
          <FormItem label="视唱题描述">
            <Input v-model="formValidate.type3_description" placeholder="请输入视唱题描述"></Input>
          </FormItem>
          <FormItem label="排序权重">
            <Input v-model.number="formValidate.weight" placeholder="请输入排序权重"></Input>
          </FormItem>
          <!-- <FormItem label="拖拽小节线描述">
            <Input v-model="formValidate.type1_description" placeholder="请输入拖拽小节线描述"></Input>
          </FormItem>
          <FormItem label="敲击单位拍描述">
            <Input v-model="formValidate.type2_description" placeholder="请输入敲击单位拍描述"></Input>
          </FormItem>-->
          <FormItem label="是否上线" prop="online">
            <RadioGroup v-model="formValidate.online">
              <Radio label="true">上线</Radio>
              <Radio label="false">不上线</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
      <!-- <Button @click="goDetail">查看详情</Button> -->
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow = false;">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableHeader: [
        {
          title: "题库名称",
          key: "name"
        },
        {
          title: "mock_id",
          key: "mock_id"
        },
        {
          title: "是否上线",
          key: "online"
        },
        {
          title: "所属题库",
          key: "questionBank",
          render: (h, params) => {
            return h("div", this.findBankName(params.row.questionBank));
          }
        },
        {
          title: "封面",
          key: "cover",
          className: "cover_row",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.cover
              },
              style: {
                //width: "100%"
              }
            });
          }
        },
        {
          title: "权重",
          key: "weight"
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
                      this.formValidate = this.formateRow(params.row);
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
                        name: "TestDetail",
                        params: {
                          row: params.row
                        }
                      });
                      localStorage.setItem("curMockId", params.row.mock_id);
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
                      var that = this;
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定要删除吗？",
                        onOk() {
                          that.remove(params.row);
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
      testList: [],
      formValidate: {
        type1_description: "",
        type2_description: ""
      },
      modalShow: false,
      tableLoading: true,
      editBankList: [],
      searchBank: "",
      searchBankList: [],
      modalCoverShow: "",
      previewSrc: "",
      page: 0,
      pageSize: 10,
      total: 0
    };
  },
  mounted() {
    this.get();
  },
  methods: {
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getTestList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getTestList();
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
        .post(`${process.env.JINKANG}/${process.env.VERSION}/upload_material/`, formdata, {
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
      this.getTestList();
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
    get() {
      this.tableLoading = true;

      this.axios
        .get(`${process.env.JINKANG}/${process.env.VERSION}/new_question/list/`)
        .then(res => {
          this.getTestList();
          this.tableLoading = false;
          this.bankList = res.data;
          this.editBankList = JSON.parse(JSON.stringify(res.data));
          this.editBankList.unshift({ id: 0, name: "无归属" });
          this.searchBankList = JSON.parse(JSON.stringify(res.data));
          this.searchBankList.unshift({ id: 0, name: "全部" });
          // if(res.data && res.data.length>0){
          //   this.searchBank = res.data[0].id
          // }
          //this.get();
          //this.total = res.paging.total;
        });
    },
    goDetail() {},
    formateRow(row) {
      row.online = row.online + "";
      console.log(row.during);
      row.during = row.during ? row.during / 60 : "";
      return row;
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      newForm.online = newForm.online == "true" ? "1" : "0";
      newForm.during = newForm.during * 60;
      // if(this.modalStatus == "create"){
      //   newForm.ids=JSON.stringify([]);
      // }else{
      //   newForm.ids= JSON.stringify(this.getIds(this.formValidate.mock_material));
      // }
      //只更新名字和online
      newForm.update_name = "1";

      return newForm;
    },
    remove(row) {
      this.axios
        .get(
          `${process.env.JINKANG}/${process.env.VERSION}/mock/delete_mock/?mock_id=${row.mock_id}`
        )
        .then(res => {
          this.getTestList();
        });
    },
    handleSubmit(name) {
      var params = this.formatForm();
      console.log(params);
      //return
      this.axios
        .post(`${process.env.JINKANG}/${process.env.VERSION}/mock/create/`, params)
        .then(res => {
          this.tableLoading = false;
          this.modalShow = false;
          this.getTestList();
        });
    },
    getIds(arr) {
      return arr.map(e => e.question_id);
    },
    createNewTest() {
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
    },
    getTestList() {
      this.tableLoading = true;
      if (this.searchBank === 0) {
        var url = `${process.env.JINKANG}/${process.env.VERSION}/mock/get_many_mock/`;
      } else {
        var url = `${
          process.env.JINKANG
        }/${process.env.VERSION}/mock/get_many_mock/?questionBank=${this.searchBank}&page=${
          this.page
        }&size=${this.pageSize}`;
      }
      this.axios.get(url).then(res => {
        this.total = res.total;
        this.tableLoading = false;
        this.testList = res.data;
      });
    }
  }
};
</script>
