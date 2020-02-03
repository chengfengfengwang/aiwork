<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewProduct" style="margin-right:30px">新建</Button>
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="bankList"></Table>
    <!-- <div style="margin-top:10px">
      <Page
        @on-page-size-change="pageSizeChange"
        @on-change="pageChange"
        :total="total"
        :page-size="pageSize"
        show-sizer
        :page-size-opts="[5,10,15,20,30,40]"
        show-elevator
      />
    </div>-->
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>题库</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="分组">
            <Select v-model="formValidate.group" placeholder="选择分组" style="width:200px">
              <Option v-for="item in groupList" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>

          <FormItem label="题库名称">
            <Input v-model="formValidate.name" placeholder="请输入题库名称"></Input>
          </FormItem>
          <FormItem label="原始价格">
            <Input v-model.number="formValidate.old_price" placeholder="输入原始价格，单位：元"></Input>
          </FormItem>
          <FormItem label="价格">
            <Input v-model.number="formValidate.price" placeholder="输入价格，单位：元"></Input>
          </FormItem>
          <FormItem label="手机封面">
            <img v-show="modalCoverShow1" style="max-width:400px" :src="previewSrc1" alt>
            <Upload
              accept="image/*"
              :before-upload="handleUpload1"
              :max-size="1024"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button icon="ios-cloud-upload-outline">选择封面</Button>
            </Upload>
            <!-- <Input
              :style="{visibility:'hidden',height:'0px',display: 'block'}"
              v-model="formValidate.cover"
              placeholder="输入题库封面地址"
            ></Input>-->
          </FormItem>
          <FormItem label="pad封面">
            <img v-show="modalCoverShow2" style="max-width:400px" :src="previewSrc2" alt>
            <Upload
              accept="image/*"
              :before-upload="handleUpload2"
              :max-size="1024"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button icon="ios-cloud-upload-outline">选择封面</Button>
            </Upload>
            <!-- <Input
              :style="{visibility:'hidden',height:'0px',display: 'block'}"
              v-model="formValidate.cover[1]"
              placeholder="输入题库封面地址"
            ></Input>-->
          </FormItem>
          <FormItem label="引导视频">
            <MyUpload
              btnText="上传引导视频文件"
              :acceptType="-1"
              :defaultFileList="guideVideo"
              v-on:upload-success="guideVideoSuccess"
            ></MyUpload>
          </FormItem>
          <FormItem label="权重">
            <Input v-model.number="formValidate.order" placeholder="输入顺序值"></Input>
          </FormItem>
          <FormItem label="有效期">
            <Input v-model.number="formValidate.deadline" placeholder="输入有效期"></Input>
          </FormItem>
          <FormItem label="专家版信息" v-show="formValidate.is_experience===1">
            <Select v-model="formValidate.other_id" placeholder="选择专家版信息" style="width:200px">
              <Option v-for="item in proBankList" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="所属课程">
            <Select v-model="formValidate.course_id" placeholder="" style="width:200px">
              <Option v-for="item in courseList" :key="item._id" :value="item._id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否上线">
            <RadioGroup v-model="formValidate.is_online">
              <Radio :label="1">上线</Radio>
              <Radio :label="0">不上线</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="体验课">
            <RadioGroup v-model="formValidate.is_experience">
              <Radio :label="1">是</Radio>
              <Radio :label="0">不是</Radio>
            </RadioGroup>
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
import MyUpload from "../../components/Myupload";
export default {
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: {
        cover: []
      },
      columns: [
        {
          title: "题库名称",
          key: "name"
        },
        {
          title: "goods_id",
          key: "goods_id"
        },
        {
          title: "原始价格（元）",
          key: "old_price",
          render: (h, params) => {
            return h("div", params.row.old_price / 100);
          }
        },
        {
          title: "价格（元）",
          key: "price",
          render: (h, params) => {
            return h("div", params.row.price / 100);
          }
        },
        {
          title: "是否上线",
          key: "is_online",
          render: (h, params) => {
            return h("div", params.row.is_online ? "是" : "否");
          }
        },
        {
          title: "体验课",
          key: "price",
          render: (h, params) => {
            return h("div", params.row.is_experience ? "是" : "否");
          }
        },
        {
          title: "手机封面",
          key: "cover",
          className: "cover_row",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.cover[0]
              },
              style: {
                //width: "100%"
              }
            });
          }
        },
        {
          title: "pad封面",
          key: "cover",
          className: "cover_row",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.cover[1]
              },
              style: {
                //width: "100%"
              }
            });
          }
        },
        {
          title: "所属分组",
          key: "group",
          render: (h, params) => {
            return h("div", this.findGroupName(params.row.group));
          }
        },
        {
          title: "权重",
          key: "order"
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
                      this.modalShow = true;
                      this.modalCoverShow1 = true;
                      this.modalCoverShow2 = true;
                      //this.$refs.formValidate.resetFields();
                      this.formValidate = this.formateRow(params.row);
                      this.previewSrc1 = this.formValidate.cover[0];
                      this.previewSrc2 = this.formValidate.cover[1];
                      console.log(this.formValidate);
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
      bankList: [],
      page: 0,
      pageSize: 10,
      total: 0,
      modalCoverShow1: "",
      modalCoverShow2: "",
      modalStatus: "",
      previewSrc1: "",
      previewSrc2: "",
      groupList: [
        { name: "体验题库", id: 0 },
        { name: "中国音乐学院音基题库", id: 1 },
        { name: "中央音乐学院音基题库", id: 2 },
        { name: "趣味乐理题库", id: 3 }
      ],
      guideVideo: [],
      courseList:[]
    };
  },
  components: {
    MyUpload
  },
  mounted() {
    this.getBankList();
    this.getCourseList()
  },
  computed: {
    proBankList() {
      return this.bankList.filter(e => {
        return e.is_experience === 0;
      });
    }
  },
  methods: {
    getCourseList(){
      this.axios
        .get(`${process.env.YINCHUN}/${process.env.VERSION}/new_question/common_courses/`)
        .then(res => {
          this.courseList = res.data;
          //this.tableLoading = false;
          //this.bankList = res.data;
          //this.total = res.paging.total;
        });
    },
    guideVideoSuccess(response, file, fileList) {
      this.guideVideo.splice(0, 1, response.data);
    },
    findGroupName(id) {
      var name;
      this.groupList.forEach((e, i) => {
        if (id === e.id) {
          name = e.name;
        }
      });
      return name;
    },
    pageChange(page) {
      this.page = page - 1;
      this.getBankList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getBankList();
    },
    getBankList() {
      this.tableLoading = true;
      this.axios
        .get(`${process.env.YINCHUN}/${process.env.VERSION}/new_question/list/`)
        .then(res => {
          this.tableLoading = false;
          this.bankList = res.data;
          //this.total = res.paging.total;
        });
    },
    handleUpload1(file) {
      this.modalCoverShow1 = true;
      this.previewSrc1 = window.URL.createObjectURL(file);
      var type;
      var formdata = new FormData();
      formdata.append("material", file);

      formdata.append("type", 0);

      //return false
      this.axios
        .post(`${process.env.YINCHUN}/${process.env.VERSION}/upload_material/`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.formValidate.cover[0] = res.data;
        });
      return false;
    },
    handleUpload2(file) {
      this.modalCoverShow2 = true;
      this.previewSrc2 = window.URL.createObjectURL(file);
      var type;
      var formdata = new FormData();
      formdata.append("material", file);

      formdata.append("type", 0);

      //return false
      this.axios
        .post(`${process.env.YINCHUN}/${process.env.VERSION}/upload_material/`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.formValidate.cover[1] = res.data;
          console.log(this.formValidate)
        });
      return false;
    },
    exceededHandle() {
      this.$Message.error("封面最大不能超过1M，请将图片进行压缩优化");
    },
    uploadSuccess(e) {
      console.log(e);
    },
    uploadError(e) {
      console.log(e);
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      newRow.price = newRow.price / 100;
      newRow.old_price = newRow.old_price / 100;
      var arr = [];
      arr[0] = newRow.guide_video;
      this.guideVideo = arr;
      return newRow;
    },
    getProductDetail(id) {
      this.axios.get(process.env.YINCHUN + "/${process.env.VERSION}/goods?id=" + id).then(res => {
        this.tableLoading = false;
        this.getBankList();
      });
    },
    remove(id) {
      this.axios
        .get(process.env.YINCHUN + "/${process.env.VERSION}/new_question/del/?id=" + id)
        .then(res => {
          this.getBankList();
        });
    },
    createNewProduct() {
      this.modalCoverShow1 = false;
      this.modalCoverShow2 = false;
      this.formValidate = {cover: []};
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
        var params = this.formatForm();
        console.log(params);
        //return
        this.axios
          .post(process.env.YINCHUN + "/${process.env.VERSION}/new_question/", params)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.file = "";
            this.getBankList();
          });
      } else {
        var params = this.formatForm();
        console.log(params);
        //return
        this.axios
          .post(`${process.env.YINCHUN}/${process.env.VERSION}/new_question/`, params)
          .then(res => {
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.file = "";
            this.getBankList();
          });
      }
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      newForm.price = newForm.price * 100;
      newForm.old_price = newForm.old_price * 100;
      newForm.cover = JSON.stringify(newForm.cover);
      newForm.guide_video = this.guideVideo[0];
      return newForm;
    }
  }
};
</script>
<style lang="less">
.cover_row {
  img {
    max-height: 100px;
  }
}
</style>


