
<template>
  <div>
    <!-- <Breadcrumb style="margin-bottom:20px">
      <BreadcrumbItem>学校和年级</BreadcrumbItem>
      <BreadcrumbItem style="color:#333;font-weight:400">班级</BreadcrumbItem>
      <BreadcrumbItem style="color:#333;font-weight:400">学生</BreadcrumbItem>
    </Breadcrumb>-->
    <h1 style="text-align:center;margin:10px 0;">学校列表</h1>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建学校</Button>
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
        <span>创建学校</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="学校名称">
            <Input v-model="formValidate.name" placeholder></Input>
          </FormItem>
          <FormItem label="学校领导">
            <Input v-model="formValidate.leader_name" placeholder></Input>
          </FormItem>
          <FormItem label="电话">
            <Input v-model="formValidate.leader_phone" placeholder></Input>
          </FormItem>
          <FormItem label="学校类别">
            <Select v-model="formValidate.category" placeholder style="width:300px">
              <Option
                v-for="item in schoolCategoryList"
                :key="item.name"
                :value="item.value"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否需要付费">
            <Select v-model="formValidate.need_pay" placeholder style="width:300px">
              <Option :value="1">是</Option>
              <Option :value="0">否</Option>
            </Select>
          </FormItem>
          <FormItem label="默认乐器">
            <Select v-model="formValidate.default_instrument" placeholder style="width:300px">
              <Option v-for="ins in  instrumentList" :key="ins.value" :value="ins.value">{{ins.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="默认课程">  
             <Select v-model="formValidate.default_course" placeholder style="width:300px">
              <Option
                v-for="item in courseList"
                :key="item.name"
                :value="item.value"
              >{{item.name}}</Option>
            </Select>
          </FormItem>
          <!-- <FormItem label="年级信息">
            <Input type="textarea" :rows="4" v-model="formValidate.grade_info" placeholder></Input>
          </FormItem> -->
          <FormItem label="备注">
            <Input v-model="formValidate.desc" placeholder></Input>
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
import expandRow from "./TableExpand";
const instrumentList = [
  {name:'吉他',value:0},
  {name:'尤克里里',value:1},
  {name:'卡林吧',value:2},
  {name:'非洲鼓',value:3},
  {name:'钢琴',value:4},
  {name:'音基',value:5},
  // {name:'口琴',value:6},
  {name:'启蒙',value:7}
]
const courseList = [
  {name:'音基启蒙',value:26},
  {name:'尤克里里亲子启蒙',value:29},
  {name:'尤克里里古诗词弹唱',value:30},
  {name:'尤克里里英文童谣弹唱',value:31},
  {name:'非洲鼓亲子课',value:23},
  {name:'非洲鼓亲子课进阶',value:25}
]
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
        // {
        //   type: "expand",
        //   width: 50,
        //   render: (h, params) => {
        //     return h(expandRow, {
        //       props: {
        //         grade_info: params.row.grade_info,
        //         row: params.row
        //       }
        //     });
        //   }
        // },
        {
          title: "id",
          key: "_id"
        },
        {
          title: "学校名称",
          key: "name"
        },
        {
          title: "领导",
          key: "leader_name"
        },
        {
          title: "领导电话",
          key: "leader_phone"
        },
        {
          title: "年级数量",
          key: "grade_counts"
        },
        {
          title: "是否需要付费",
          key: "need_pay",
          render: (h, params) => {
            return h("div", [
              h("span", params.row.need_pay === 0 ? "否" : "是")
            ]);
          }
        },
        {
          title: "默认乐器",
          key: "default_instrument",
          render: (h, params) => {
            return h("div", [
              h("span",  this.getInstrument(params.row.default_instrument))
            ]);
          }
        },
         {
          title: "默认课程",
          key: "default_instrument",
          render: (h, params) => {
            return h("div", [
              h("span",  this.getCourse(params.row.default_course))
            ]);
          }
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
                      if (typeof this.formValidate.grade_info !== "string") {
                        this.formValidate.grade_info = JSON.stringify(
                          this.formValidate.grade_info
                        );
                      }
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
                      localStorage.setItem("school_id", params.row._id);
                      localStorage.setItem("school_name", params.row.name);
                      this.$store.dispatch("updateschoolInfo", {
                        school_id: params.row._id,
                        school_name: params.row.name
                      });
                      this.$router.push("/Grades");
                    }
                  }
                },
                "查看年级"
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
      previewSrc: "",
      schoolCategoryList: [
        { name: "幼儿园", value: 0 },
        { name: "小学", value: 1 },
        { name: "中学", value: 2 },
        { name: "大学", value: 3 }
      ],
      instrumentList:instrumentList,
      courseList:courseList
    };
  },

  mounted() {
    this.getSchooList();
  },
  methods: {
    getCourse(v){
      if(v===undefined){return ''}
      var item = this.courseList.find((item)=>{
        return item.value===v
      })
      return item.name
    },
    getInstrument(v){
      if(v===undefined){return ''}
      var item = this.instrumentList.find((item)=>{
        return item.value===v
      })
      return item.name
    },
    remove(row) {
      this.$Modal.confirm({
        title: "提示",
        content: "<p>确认删除吗？</p>",
        onOk: () => {
          this.axios
            .get(`${process.env.PEILUN}/v2/school/delete/?id=${row._id}`)
            .then(res => {
              this.$Message.success("删除成功");
              this.getSchooList();
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
        .post(`${process.env.PEILUN}/v1/upload_material/`, formdata, {
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
      this.getSchooList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getSchooList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getSchooList();
    },
    getSchooList() {
      this.tableLoading = true;
      this.axios
        .get(
          `${process.env.PEILUN}/v2/school/index/?page=${this.page}&pageSize=${
            this.pageSize
          }`
        )
        .then(res => {
          this.tableLoading = false;
          if (res.data && res.data.length > 0) {
            this.dataList = res.data;
          } else {
            this.dataList = [];
          }

          //this.total = res.paging.total;
        });
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      newRow.game_id = newRow.game_id.join();
      return newRow;
    },
    getProductDetail(id) {
      this.axios.get(process.env.PEILUN + "/v1/goods?id=" + id).then(res => {
        this.tableLoading = false;
        this.getSchooList();
      });
    },
    delete(id) {
      this.axios
        .get(process.env.PEILUN + "/v1/new_question/deleted/?_id=" + id)
        .then(res => {
          this.getSchooList();
        });
    },
    createNewBank() {
      this.modalCoverShow = false;
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
    },
    handleSubmit(name) {
      //console.log(param)
      if (this.modalStatus == "create") {
        this.axios
          .post(`${process.env.PEILUN}/v2/school/create/`, this.formValidate)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getSchooList();
          });
      } else {
        this.formValidate.id = this.formValidate._id;
        //this.formValidate.leader_phone = Number(this.formValidate.leader_phone)
        this.axios
          .post(`${process.env.PEILUN}/v2/school/update/`, this.formValidate)
          .then(res => {
            //this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getSchooList();
          });
      }
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







