<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewProduct" style="margin-right:30px">新建</Button>
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
    <Modal v-model="modalShow" width="860">
      <p slot="header" style>
        <span>分享配置</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="130">
          <FormItem label="分享类型">
            <Select v-model="formValidate.type" placeholder="请选择分享类型">
              <Option v-for="type in shareTypes" :key="type.value" :value="type.value">{{type.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="课程">
            <Select
              style="width:200px"
              @on-change="courseChange"
              filterable
              v-model="formValidate.course_id"
              placeholder="请选择课程"
            >
              <Option
                v-for="course in courseList"
                :key="course.id"
                :value="course.id"
              >{{course.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="章节">
            <Select
              style="width:200px"
              filterable
              v-model="formValidate.lesson_id"
              placeholder="请选择章节"
            >
              <Option
                v-for="lessen in lessonList"
                :key="lessen.id"
                :value="lessen.id"
              >{{lessen.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否解锁整套课程">
            <Select v-model="formValidate.unlock_all" placeholder="请选择商品类型">
              <Option :value="0">否</Option>
              <Option :value="1">是</Option>
            </Select>
          </FormItem>
          <FormItem label="解锁前几节课程">
            <Input v-model.number="formValidate.unlock_count" placeholder="请输入解锁节数"></Input>
          </FormItem>
          <FormItem label="需要注册人数">
            <Input v-model.number="formValidate.need_reg_count" placeholder="请输入需要注册人数"></Input>
          </FormItem>
          <FormItem label="需要购买人数">
            <Input v-model.number="formValidate.need_purchased_count" placeholder="请输入需要购买人数"></Input>
          </FormItem>
          <FormItem label="需要试听人数">
            <Input v-model.number="formValidate.need_audition_count" placeholder="请输入需要购买人数"></Input>
          </FormItem>

          <FormItem label="分享名称">
            <Input v-model="formValidate.title" placeholder="输入分享名称"></Input>
          </FormItem>
          <FormItem label="分享封面">
            <MyUpload
              btnText="上传分享封面"
              :acceptType="0"
              :defaultFile="formValidate.cover"
              v-on:upload-success="coverUploadSuccess"
            />
          </FormItem>

          <FormItem label="分享链接">
            <Input v-model="formValidate.link" placeholder="输入分享链接"></Input>
          </FormItem>
          <FormItem label="分享内容">
            <Input
              v-model="formValidate.content"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="输入分享内容"
            ></Input>
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
import MyUpload from "../components/UploadGroup/UploadItem";
let baseUrl = "http://192.168.2.16:55555";
export default {
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      shareTypes: [
        {
          name: "course",
          value: 1
        },
        {
          name: "lesson",
          value: 2
        }
      ],
      formValidate: {
        cover: []
      },
      columns: [
        {
          title: "分享类型",
          key: "type",
          render: (h, params) => {
            return h("div", params.row.type == 1 ? "course" : "lesson");
          }
        },
        {
          title: "course_id",
          key: "course_id"
        },
        {
          title: "lesson_id",
          key: "lesson_id"
        },
        {
          title: "有效期",
          key: "limt_time"
        },
        {
          title: "是否解锁整套课程",
          key: "unlock_all",
          render: (h, params) => {
            return h("div", params.row.type == 1 ? "是" : "否");
          }
        },
        {
          title: "解锁前几节课程",
          key: "unlock_count"
        },
        {
          title: "需要注册人数",
          key: "need_reg_count"
        },
        {
          title: "需要购购买人数",
          key: "need_purchased_count"
        },
        {
          title: "需要试听人数",
          key: "need_audition_count"
        },
        {
          title: "名称",
          key: "title"
        },
        {
          title: "链接",
          key: "link"
        },
        {
          title: "内容",
          key: "content"
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
                      this.formValidate = this.formateRow(params.row);
                      this.curItemId = params.row.id;
                      this.getLessons(this.formValidate.course_id);
                      this.modalStatus = "edit";
                      console.log(this.formValidate)
                      return
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
                          that.removeItem(params.row.id);
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
      tableDataList: [],
      page: 0,
      pageSize: 10,
      total: 0,
      instruments: [
        {
          label: "吉他",
          value: 0
        },
        {
          label: "尤克里里",
          value: 1
        },
        {
          label: "卡林巴",
          value: 2
        },
        {
          label: "非洲鼓",
          value: 3
        },
        {
          label: "钢琴",
          value: 4
        },
        {
          label: "音基",
          value: 5
        }
      ],
      courseList: [],
      lessonList: [],
      courseId: "",
      lessenId: ""
    };
  },
  components: {
    MyUpload
  },
  mounted() {
    this.getTableList();
    //this.getCourseList();
    // (r'/v1/home/create_home_list', HomeHandler, dict(action=HomeHandler.create_home_list)),
    // (r'/v1/home/update_home_list', HomeHandler, dict(action=HomeHandler.update_home_list)),
    // (r'/v1/home/home_list', HomeHandler, dict(action=HomeHandler.home_list)),
  },
  methods: {
    coverUploadSuccess(response, idx, position, file, fileList) {
      this.formValidate.cover = response.data;
    },
    courseChange() {
      this.formValidate.lesson_id = "";
      this.getLessons(this.formValidate.course_id);
    },
    getLessons(courseId) {
      this.axios
        .get(`http://hot.test.immusician.com:55555/v1/courses/${courseId}/`, {
          headers: {
            uid: 31,
            token:
              "teacher_2%7C1%3A0%7C10%3A1577068095%7C8%3Ausername%7C8%3AYWRtaW4%3D%7C39a2dab40b6eca18200f23039a5229f85ece63e5599238a8351540bbb5193763"
          }
        })
        .then(res => {
          this.lessonList = res.data.lessons;
        });
    },
    getCourseList() {
      var url = `http://hot.test.immusician.com:55555/v1/courses?page=0&size=9999&online=true&instrument_type=music_basis`;
      this.axios
        .get(url, {
          headers: {
            uid: 31,
            token:
              "teacher_2%7C1%3A0%7C10%3A1577068095%7C8%3Ausername%7C8%3AYWRtaW4%3D%7C39a2dab40b6eca18200f23039a5229f85ece63e5599238a8351540bbb5193763"
          }
        })
        .then(res => {
          this.courseList = res.data;
          //this.loading = false;
        });
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
      this.tableLoading = true;
      this.axios.get(`${baseUrl}/v1/home/home_list`).then(res => {
        this.tableLoading = false;
        this.tableDataList = res.data;
        this.total = res.paging.total;
      });
    },
    formateRow(row) {
      var arr = [
        "updated_at_",
        "start_time",
        "updated_at",
        "deleted_at",
        "created_at",
        "created_at_",
        "end_time"
      ];
      arr.forEach(e => {
        delete row[e];
      });
      return row;
    },
    removeItem(id) {
      this.axios
        .get(`${baseUrl}/v1/share/deleted_share_config/${id}`)
        .then(res => {
          this.getTableList();
        });
    },
    createNewProduct() {
      this.formValidate = {};
      this.modalShow = true;
      this.modalStatus = "create";
      this.formValidate = JSON.parse(localStorage.getItem("temp"));
    },
    handleSubmit(name) {
      if (this.modalStatus == "create") {
        this.axios
          .post(`${baseUrl}/v1/share/create_share_config`, this.formValidate)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getTableList();
          });
      } else {
        //return
        this.axios
          .post(
            `${baseUrl}/v1/share/update_share_config/${this.curItemId}`,
            this.formValidate
          )
          .then(res => {
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getTableList();
          });
      }
    }
  }
};
</script>

