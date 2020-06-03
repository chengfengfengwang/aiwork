<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建</Button>
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <Modal v-model="modalShow" width="760" :mask-closable="false">
      <p slot="header" style>
        <span>课程</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <div>
            <FormItem label="二维码">
              <MyUpload
                v-if="modalShow"
                btnText="上传二维码"
                :acceptType="0"
                :defaultFile="formValidate.qr"
                v-on:upload-success="qrUploadSuccess"
              />
            </FormItem>
            <!-- <FormItem label="课程id"  v-show="modalStatus!='edit'">
              <Input v-model.number="formValidate.course_id" placeholder="请输入course_id"></Input>
            </FormItem> -->
            <FormItem label="课程id" v-show="modalStatus!='edit'">
              <span>{{course_name}}</span>
              <Button @click="yinjiModalShow=true;">选择课程</Button>
            </FormItem>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
    <Modal v-model="yinjiModalShow" width="760" :mask-closable="false">
      <p slot="header" style>
        <span>音乐壳课程</span>
      </p>

      <AllCourseYinjiCourse :fromDataArr="fromCourseArr" ref="allYinjiCourse" v-if="yinjiModalShow"/>

      <div slot="footer">
        <Button @click="yinjiCourseSubmit" type="primary">确定</Button>
        <Button @click="yinjiModalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
let baseUrl = "http://api.yinji.immusician.com";
//let baseUrl = 'http://192.168.2.16:55555';
import AllCourseYinjiCourse from "./../components/Allcourse/myAllcourseYinjiCourse";
import MyUpload from "../components/UploadGroup/UploadItem";

export default {
  data() {
    return {
      modalShow: false,
      formValidate: {},
      columns: [ 
        {
          title: "课程id",
          key: "course_id"
        },
        {
          title: "课程",
          key: "course_name"
        },
        //http://api.yinji.immusician.com/v1/operate/redirect_code_url?url=http://cdn.kids-web.immusician.com/yinji/wxbind.html?course_id=32
        {
          title: "链接",
          key: "url",
          
          render: (h, params) => {
            return h("span", {},
            `http://api.yinji.immusician.com/v1/operate/redirect_code_url?url=http://cdn.kids-web.immusician.com/yinji/wxbind.html?course_id=${params.row.course_id}`);
          }
        },
        {
          title: "二维码",
          key: "qr",
          className: "cover_row",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.qr
              },
              style: {
                width: "200px"
              }
            });
          }
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
                      this.modalShow = true;
                      this.modalStatus = "edit";
                      this.formValidate = JSON.parse(
                        JSON.stringify(params.row)
                      );
                    }
                  }
                },
                "编辑"
              )
              // h(
              //   "Button",
              //   {
              //     props: {
              //       type: "error",
              //       size: "small"
              //     },
              //     on: {
              //       click: () => {
              //         var that = this;
              //         this.$Modal.confirm({
              //           title: "警告",
              //           content: "确定要删除吗？",
              //           onOk() {
              //             that.remove(params.row.id);
              //           }
              //         });
              //       }
              //     }
              //   },
              //   "删除"
              // )
            ]);
          }
        }
      ],
      dataList: [],
      tableLoading: true,
      yinjiModalShow: false,
      course_name: ""
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    getTrainList() {
      this.axios.get(`http://58.87.125.111:55555/v1/unlock/`).then(res => {
        this.trains = res.data;
      });
    },
    getTuids() {
      this.axios
        .get(`http://123.206.51.140:2525/v3/users/vip/show_teacher/`)
        .then(res => {
          this.allTuid = res.data;
        });
    },
    yinjiCourseSubmit() {
      //console.log(this.$refs.allYinjiCourse.selected)
      const selected = this.$refs.allYinjiCourse.selected[0];
      console.log(selected)
      this.course_name = selected.name;
      this.formValidate.course_id = selected.id;
      this.yinjiModalShow = false;
    },
    getFactoryList() {
      this.axios
        .get(`${process.env.WULIU}/vendor/index?page=0&size=999&status=1`)
        .then(res => {
          this.tableLoading = false;
          this.factoryList = res.data.list;
        });
    },
    remove(id) {
      this.axios
        .post(`${process.env.WULIU}/cgoods/delete`, {
          id
        })
        .then(res => {
          this.getTableList();
        });
    },
    createNewBank() {
      this.formValidate = {};
      this.course_name = "";
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
    },
    handleSubmit() {
      console.log(this.formValidate);
      //return;

      if (this.modalStatus == "create") {
        //return
        this.axios
          .post(`${baseUrl}/v1/wechat/create_record `, this.formValidate)
          .then(res => {
            this.modalShow = false;
            this.getTableList();
          });
      } else {
        //console.log(this.formValidate);
        //return;
        this.axios
          .post(`${baseUrl}/v1/wechat/update_record`, {
            record_id: this.formValidate.id,
            qr_file: this.formValidate.qr_file
          })
          .then(res => {
            //this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getTableList();
          });
      }
    },
    getTableList() {
      this.axios.get(`${baseUrl}/v1/wechat/get_records`).then(res => {
        this.tableLoading = false;
        this.dataList = res.data;
      });
    },
    qrUploadSuccess(response, idx, position, file, fileList) {
      this.formValidate.qr_file = response.data;
    }
  },
  components: {
    AllCourseYinjiCourse,
    MyUpload
  }
};
</script>
