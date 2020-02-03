<template>
  <div>
    <div style="margin-bottom:5px">
      <Button type="primary" @click="handleCreate">创建班级</Button>
      <span style="margin-left:5px">排序：</span>
      <Select @on-change="sortChange" v-model="sort" style="width:200px">
        <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span style="margin-left:5px">按乐器筛选：</span>
      <Select @on-change="sortChange" v-model="instrument_type" style="width:200px">
        <Option
          v-for="(item,index) in myInstrumentList"
          :value="item.value"
          :key="index"
        >{{ item.label }}</Option>
      </Select>
      <span style="margin-left:5px">关键字筛选：</span>
      <Input style="width:200px" @input="sortChange" v-model="keyword" placeholder="按关键字筛选"/>
    </div>
    <Table :loading="tableLoading" :columns="columns1" :data="classList"></Table>
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
        <span>新增用户</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="班级名称" prop="name">
            <Input v-model="formValidate.name" placeholder="输入班级名称" style="width: 300px"/>
          </FormItem>
          <FormItem label="乐器">
            <Select v-model="formValidate.instrument_type" style="width:200px">
              <Option
                v-for="item in instrumentList"
                :value="item.value"
                :key="item.value"
              >{{ item.label }}</Option>
            </Select>
          </FormItem>
          <FormItem label="班级类型">
            <Input v-model="formValidate.class_type" placeholder="输入班级类型" style="width: 300px"/>
          </FormItem>
          <FormItem label="班级二维码">
            <Upload :before-upload="beforeUpload" action="//jsonplaceholder.typicode.com/posts/">
              <Button icon="ios-cloud-upload-outline">上传班级二维码</Button>
            </Upload>
            <img style="max-width:80%" :src="previewSrc" alt>
          </FormItem>
          <FormItem label="班级归属老师">
            <Select v-model="formValidate.user_id" style="width:200px">
              <Option v-for="user in userList" :value="user.uid" :key="user.uid">{{ user.username }}</Option>
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
import { mapGetters } from 'vuex'
import ClassTable from "./../components/ClassTable";
export default {
  inject: ["instrumentList","myInstrumentList"],
  data() {
    return {
      classList: [],
      tableLoading: true,
      page: 0,
      pageSize: 20,
      total: 0,
      sortList: [
        { label: "ID递增", value: "_id,+1" },
        { label: "ID递减", value: "_id,+-1" },
        { label: "名称递增", value: "name,+1" },
        { label: "名称递减", value: "name,+-1" },
        { label: "更新时间递增", value: "updated_at,+1" },
        { label: "更新时间递减", value: "updated_at,+-1" }
      ],
      sort: "_id,+-1",
      beginTime: "",
      endTime: "",
      instrument_type: "全部",
      modalShow: false,
      formValidate: {},
      columns1: [
        {
          title: "ID",
          key: "id"
        },
        {
          title: "班级名称",
          key: "name"
        },
        {
          title: "乐器类型",
          key: "instrument_type"
        },
        {
          title: "班级链接",
          key: "class_u",
          className: "cover_row",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.class_u
              },
              style: {
                width: "100%"
              }
            });
          }
        },
        {
          title: "点亮链接",
          key: "bright_u",
          className: "cover_row",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.bright_u
              },
              style: {
                width: "100%"
              }
            });
          }
        },
        {
          title: "微信群二维码",
          key: "wechat_qr",
          className: "cover_row",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.wechat_qr
              },
              style: {
                width: "100%"
              }
            });
          }
        },
        {
          title: "班级类型",
          key: "class_type"
        },
        {
          title: "过期时间",
          key: "expired_time"
        },
        {
          title: "加班人数",
          key: "j_class_num"
        },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          align: "center",
          render: (h, params) => {
            //if (this.role === 0) {
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
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.delete(params.row);
                    }
                  }
                },
                "删除"
              )
            ]);
            //}
          }
        }
      ],
      keyword: "",

      uploadedUrl: "",
      userList: [],
      curRow: { wechat_qr: "" }
    };
  },
  computed: {
    previewSrc: {
      get: function() {
        return this.curRow.wechat_qr
      },
      // setter
      set: function(newValue) {
        this.curRow.wechat_qr = newValue
      }
      //return this.curRow.wechat_qr
    },
    ...mapGetters([
      'permission'
    ])
  },
  components: {
    ClassTable
  },
  created() {
    console.log(this.instrumentList);
  },
  mounted() {
    this.getClassList();
    this.getUserList();
  },
  methods: {
    handleCreate(){
      this.modalShow=true;
      this.formValidate={}
    },
    handleSubmit() {
      if (this.modalStatus == "edit") {
        this.updateClass();
      } else {
        this.createClass();
      }
    },
    createClass() {
      console.log(this.formValidate)
      //return
      this.axios
        .post(
          `${process.env.XIAOPO}/v3/wechat/create_class`,
          this.formValidate
        )
        .then(res => {
          this.modalShow = false;
          this.getClassList()
          //this.$emit("upload", url);
          //this.imgUploadSuccess = true;
        });
    },
    updateClass() {
      console.log(this.formValidate);
      //return;
      this.axios
        .post(
          `${process.env.XIAOPO}/v3/wechat/class/${this.curRow.id}/`,
          this.formValidate
        )
        .then(res => {
           this.modalShow = false;
          this.getClassList()
          //this.$emit("upload", url);
          //this.imgUploadSuccess = true;
        });
    },
    getUserList() {
      this.tableLoading = true;
      // this.axios.get(`${process.env.JINKANG}/v3/user2/show`).then(res => {
      //   this.userList = res.data;
      // });
    },
    beforeUpload(file) {
      //console.log(file);
      this.previewSrc = window.URL.createObjectURL(file);
      console.log(this.previewSrc)
      var formdata = new FormData();
      formdata.append("img_qr_file", file);
      this.axios
        .post(`${process.env.XIAOPO}/v3/wechat/updata_qr`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.uploadedUrl = res.url;
          this.formValidate.wechat_qr = res.url;
          this.$Message.success("图片上传成功啦");
          //this.$emit("upload", url);
          //this.imgUploadSuccess = true;
        });
      return false;
    },
    delete(row) {
      this.axios
        .get(`${process.env.XIAOPO}/v3/wechat/delete_class/${row.id}`)
        .then(res => {
          this.$Message.success("删除成功啦");
          this.getClassList();
        });
    },
    resetPage() {
      this.page = 0;
    },
    sortChange() {
      this.resetPage();
      this.getClassList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getRoomList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getClassList();
    },
    allTimeSelectChange(value) {
      this.beginTime = value[0];
      this.endTime = value[1];
      this.resetPage();
      this.getClassList();
    },
    getClassList(b = "", e = "") {
      console.log(this.beginTime, this.endTime);
      this.tableLoading = true;
      if(this.instrument_type==='全部'){
        var instrument_type = ``
      }else{
        var instrument_type = `&instrument_type=${
            this.instrument_type
          }`
      }
      this.axios
        .get(
          `${process.env.XIAOPO}/v3/wechat/Classs?page=${this.page}&size=${
            this.pageSize
          }&sort=${this.sort}${instrument_type}&keyword=${
            this.keyword
          }`
        )
        .then(res => {
          this.classList = res.data;
          this.total = res.paging.total;
          this.tableLoading = false;
        });
    }
  }
};
</script>

