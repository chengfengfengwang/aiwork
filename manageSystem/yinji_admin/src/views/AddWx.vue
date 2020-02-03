<template>
  <div>
    <div class="table_top_tool">
        <Button type="primary" @click="createNew" style="float:left">新建</Button>
        <h1 style="text-align:center;">添加老师微信列表</h1>
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
          <FormItem label="应用位置" prop="status">
            <Select v-model="formValidate.goods_ids" multiple placeholder="选择应用位置">
              <Option v-for="item in goodsList" :key="item._id" :value="item._id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="老师微信号">
            <Input v-model="formValidate.teacher_wechat_id" placeholder="请输入老师微信号"></Input>
          </FormItem>
          <FormItem label="加入标题-手机">
            <Input v-model="formValidate.teacher_name_title" placeholder="请输入加入标题"></Input>
          </FormItem>
          <FormItem label="加入标题-pad">
            <Input v-model="formValidate.teacher_name_title_pad" type="textarea" :autosize="true" placeholder="请输入加入标题"></Input>
          </FormItem>
          <FormItem label="课程服务">
            <Input v-model="formValidate.course_serve" type="textarea" :autosize="true" placeholder="课程服务" />
          </FormItem>
          <FormItem label="温馨提示">
            <Input v-model="formValidate.warm_prompt" type="textarea" :autosize="true" placeholder="温馨提示" />
          </FormItem>
          <FormItem label="老师头像">
            <img v-show="modalCoverShow" style="max-width:400px" :src="previewSrc" alt>
            <Upload
              accept="image/*"
              :before-upload="handleUpload"
              :max-size="1024"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button icon="ios-cloud-upload-outline">选择老师头像</Button>
            </Upload>
          </FormItem>
          <FormItem label="微信二维码">
            <img v-show="modalCoverShow1" style="max-width:400px" :src="previewSrc1" alt>
            <Upload
              accept="image/*"
              :before-upload="handleUpload1"
              :max-size="1024"
              action="//jsonplaceholder.typicode.com/posts/"
            >
              <Button icon="ios-cloud-upload-outline">上传微信二维码</Button>
            </Upload>
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
          title: "标题",
          key: "teacher_name_title"
        },
        {
          title: "头像",
          key: "teacher_avatar",
          align:'center',
          className: "cover_row",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.teacher_avatar
              },
              style: {
                //width: "100%"
              }
            });
          }
        },
        {
          title: "二维码",
          key: "group_qr",
          align:'center',
          className: "cover_row",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.group_qr
              },
              style: {
                //width: "100%"
              }
            });
          }
        },
        {
          title: "微信号",
          key: "teacher_wechat_id"
        },
        {
          title: "所属课程/题库",
          key: "questionBank",
          render: (h, params) => {
            return h("div", this.findGoodsName(params.row.goods_ids));
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
                      this.modalStatus = "edit";
                      this.modalCoverShow = true;
                      this.modalCoverShow1 = true;
                      this.group_qr = '';
                      this.teacher_avatar = '';
                      this.previewSrc = this.formValidate.teacher_avatar;
                      this.previewSrc1 = this.formValidate.group_qr;
                      this.curId = params.row.id
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
                          that.delete(params.row.id);
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
      modalCoverShow1: "",
      previewSrc: "",
      previewSrc1: "",
      goodsList:[]
    };
  },
  mounted() {
    this.getGoodsList();
    this.getTableData();
  },
  methods: {
    handleUpload(file) {
      this.modalCoverShow = true;
      this.previewSrc = window.URL.createObjectURL(file);
      this.teacher_avatar = file;
      return false;
    },
    handleUpload1(file) {
      this.modalCoverShow1 = true;
      this.previewSrc1 = window.URL.createObjectURL(file);
      this.group_qr = file;
      return false;
    },
    findGoodsName(idArr) {
      var name = [];
      this.goodsList.forEach((e, i) => {
          idArr.forEach((id,idx)=>{
              if(id==e._id){
                  name.push( idArr.length>0 && idx != (idArr.length-1) ? e.name+' / ' : e.name)
              }
          })
      });
      return name;
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
      var url = `${process.env.XIAOPO}/${process.env.VERSION}/group/buy_group_index/`;
      this.axios.get(url).then(res => {
        this.tableLoading = false;
        if (res.data && res.data.length > 0) {
          this.dataList = res.data;
        } else {
          this.dataList = [];
        }
        this.total = res.paging.total;
      });
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      return newRow;
    },
    getProductDetail(id) {
      this.axios.get(process.env.XIAOPO + "/"+process.env.VERSION+"/goods?id=" + id).then(res => {
        this.tableLoading = false;
        this.getTableData();
      });
    },
    delete(id) {
      this.axios
        .get(`${process.env.XIAOPO}/${process.env.VERSION}/group/deleted_buy_group/${id}/`)
        .then(res => {
          this.getTableData();
        });
    },
    createNew() {
      this.modalCoverShow = false;
      this.modalCoverShow1 = false;
      this.group_qr = '';
      this.teacher_avatar = '';
      this.formValidate = {};
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
      
    },
    handleSubmit(name) {
      var myForm = this.formValidate;
      if (this.modalStatus == "create") {
        var formdata = new FormData();
        for (var key in myForm){
            formdata.append(key, myForm[key]);
        }
        formdata.append('teacher_avatar', this.teacher_avatar);
        formdata.append('group_qr', this.group_qr);
        // console.log(myForm)
        // return
        this.axios
          .post(process.env.XIAOPO + "/"+process.env.VERSION+"/group/buy_group/", formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.getTableData();
          });
      } else {
        var formdata = new FormData();
        for (var key in myForm){
            formdata.append(key, myForm[key]);
        }
        if(this.teacher_avatar){
formdata.append('teacher_avatar', this.teacher_avatar);
        }
        if(this.group_qr){
formdata.append('group_qr', this.group_qr);
        }
        
        //console.log(formdata)
        //return
        this.axios
          .post(`${process.env.XIAOPO}/${process.env.VERSION}/group/update_buy_group/${this.curId}/`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
            }
            })
          .then(res => {
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getTableData();
          });
      }
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      return newForm;
    },
    getGoodsList() {
      this.axios
        .get(`http://58.87.125.111:55555/${process.env.VERSION}/goods/get_goods?page=0&size=999`)
        .then(res => {
          this.goodsList = res.data
        });
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


