<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewProduct" style="margin-right:30px">新建</Button>
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="productList"></Table>
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
        <span>商品详情</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="商品名称" prop="name">
            <Input v-model="formValidate.name" placeholder="请输入商品名称"></Input>
          </FormItem>
          <FormItem label="原价" prop="old_price">
            <Input v-model.number="formValidate.old_price" placeholder="输入商品展示价格"></Input>
          </FormItem>
          <FormItem label="现价" prop="price">
            <Input v-model.number="formValidate.price" placeholder="输入商品展示价格"></Input>
          </FormItem>
          <FormItem label="course_list" prop="course_list">
            <Input v-model="formValidate.course_list" placeholder="输入course_list用英文逗号隔开,如 1,2,3"></Input>
          </FormItem>
          <FormItem label="库存" prop="stock">
            <Input v-model.number="formValidate.stock" placeholder="输入商品库存"></Input>
          </FormItem>
          <FormItem label="乐器类型" prop="instrument_type">
            <Select v-model="formValidate.instrument_type" placeholder="请选择商品类型">
              <Option v-for="item in instruments" :key="item.value" :value="item.value">{{item.label}}</Option>
            </Select>
          </FormItem>
          <!-- <FormItem label="商品状态" prop="status">
            <Select v-model="formValidate.status" placeholder="选择商品状态">
              <Option disabled :value="-2">所有商品</Option>
              <Option disabled :value="-1">已删除</Option>
              <Option :value="0">未上线</Option>
              <Option :value="1">已上线</Option>
              <Option disabled :value="2">人数已满</Option>
              <Option disabled :value="3">已结束</Option>
              <Option disabled :value="4">正在直播</Option>
            </Select>
          </FormItem>-->
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

          <FormItem label="是否推荐" prop="recommend">
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
          </FormItem>
          <FormItem label="商品权重" prop="weight">
            <Input v-model.number="formValidate.weight" placeholder="输入商品权重"></Input>
          </FormItem>
          <FormItem label="附赠题库">
            <Input v-model="formValidate.question_id" placeholder="输入题库id"></Input>
          </FormItem>
          <!-- <FormItem label="Hobby" prop="interest">
            <CheckboxGroup v-model="formValidate.interest">
              <Checkbox label="Eat"></Checkbox>
              <Checkbox label="Sleep"></Checkbox>
              <Checkbox label="Run"></Checkbox>
              <Checkbox label="Movie"></Checkbox>
            </CheckboxGroup>
          </FormItem>-->
          <FormItem label="商品提示" prop="reminder">
            <Input
              v-model="formValidate.reminder"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="输入商品提示"
            ></Input>
          </FormItem>
          <FormItem label="描述" prop="desc">
            <Input
              v-model="formValidate.desc"
              type="textarea"
              :autosize="{minRows: 2,maxRows: 5}"
              placeholder="输入商品描述"
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
          title: "商品ID",
          key: "_id"
        },
        {
          title: "题库ID",
          key: "question_id"
        },
        {
          title: "商品名称",
          key: "name"
        },
        {
          title: "乐器类型",
          key: "instrument_type"
          //   render: (h, params) => {
          //     return h("div", formatTime(params.row.start_time));
          //   }
        },
        {
          title: "原价（元）",
          key: "old_price",
          render: (h, params) => {
            return h("div", params.row.old_price / 100);
          }
        },
        {
          title: "现价（元）",
          key: "price",
          render: (h, params) => {
            return h("div", params.row.price / 100);
          }
        },
        {
          title: "是否上线",
          key: "online",
          render: (h, params) => {
            return h("div", params.row.online ? "是" : "否");
          }
        },
        // {
        //   title: "是否推荐",
        //   key: "recommend",
        //   render: (h, params) => {
        //     return h("div", params.row.recommend == "true" ? "是" : "否");
        //   }
        // },
        {
          title: "权重",
          key: "weight"
        },

        {
          title: "手机封面",
          key: "cover",
          className: "cover_row",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src:
                  typeof params.row.cover == "string"
                    ? params.row.cover
                    : params.row.cover[0]
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
                src:
                  typeof params.row.cover == "string"
                    ? params.row.cover
                    : params.row.cover[1]
              },
              style: {
                //width: "100%"
              }
            });
          }
        },
        // {
        //   title: "描述",
        //   key: "desc"
        // },
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
                      this.formValidate = this.formateRow(params.row);
                      if (this.formValidate.cover instanceof Array) {
                        this.previewSrc1 = this.formValidate.cover[0];
                        this.previewSrc2 = this.formValidate.cover[1];
                      } else {
                        this.previewSrc1 = this.formValidate.cover;
                      }

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
                          that.removeProduct(params.row._id);
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
      productList: [],
      page: 0,
      pageSize: 10,
      total: 0,
      modalCoverShow: "",
      modalStatus: "",
      modalCoverShow1: "",
      modalCoverShow2: "",
      previewSrc1: "",
      previewSrc2: "",
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
      ]
    };
  },
  mounted() {
    this.getProductList();
  },
  methods: {
    handleUpload1(file) {
      this.modalCoverShow1 = true;
      this.previewSrc1 = window.URL.createObjectURL(file);
      var type;
      var formdata = new FormData();
      formdata.append("material", file);

      formdata.append("type", 0);

      //return false
      this.axios
        .post(`${process.env.JINKANG}/v2/upload_material/`, formdata, {
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
        .post(`${process.env.JINKANG}/v2/upload_material/`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.formValidate.cover[1] = res.data;
        });
      return false;
    },
    pageChange(page) {
      this.page = page - 1;
      this.getProductList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getProductList();
    },
    getProductList() {
      this.tableLoading = true;
      this.axios
        .get(
          `${process.env.JINKANG}/v2/goods/get_goods?page=${this.page}&size=${
            this.pageSize
          }`
        )
        .then(res => {
          this.tableLoading = false;
          this.productList = res.data;
          this.total = res.paging.total;
        });
    },
    handleUpload(file) {
      this.modalCoverShow = true;
      this.file = file;
      this.$set(this.formValidate, "cover", window.URL.createObjectURL(file));
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
      if (!(newRow.cover instanceof Array)) {
        this.previewSrc1 = newRow.cover;
        newRow.cover = [newRow.cover];
      }
      newRow.price = newRow.price / 100;
      newRow.old_price = newRow.old_price / 100;
      newRow.recommend = newRow.recommend ? "true" : "false";
      newRow.online = newRow.online ? "true" : "false";
      newRow.course_list = newRow.course_list.join();
      newRow.weight = Number(newRow.weight);
      newRow.stock = Number(newRow.stock);
      newRow.question_id = newRow.question_id;
      return newRow;
    },
    removeProduct(id) {
      this.axios
        .get(process.env.JINKANG + "/v2/goods/delete_goods?id=" + id)
        .then(res => {
          this.getProductList();
        });
    },
    createNewProduct() {
      this.modalCoverShow1 = false;
      this.modalCoverShow2 = false;
      this.formValidate = { cover: [] };
      this.modalShow = true;
      this.modalStatus = "create";
    },
    handleSubmit(name) {
      var formdata = this.formatForm();
      console.log(formdata);
      //return
      if (this.modalStatus == "create") {
        var formdata = this.formatForm();
        //return
        this.axios
          .post(process.env.JINKANG + "/v2/goods/update_goods", formdata)
          .then(res => {
            this.$Message.success("创建成功啦!");
            this.modalShow = false;
            this.file = "";
            this.getProductList();
          });
      } else {
        var formdata = this.formatForm();
        console.log(formdata);
        //return
        this.axios
          .post(`${process.env.JINKANG}/v2/goods/update_goods`, formdata)
          .then(res => {
            this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.file = "";
            this.getProductList();
          });
      }
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      var tempArr = newForm.course_list.split(",");
      newForm.course_list = tempArr.map(e => parseInt(e.trim()));
      newForm.recommend = newForm.recommend == "true";
      newForm.online = newForm.online == "true";
      newForm.price = newForm.price * 100;
      newForm.old_price = newForm.old_price * 100;
      //newForm.cover = JSON.stringify(newForm.cover);
      newForm.cover = newForm.cover;
      [
        "course_name_list",
        "create_time",
        "pictures",
        "room_id",
        "share",
        "sku",
        "sku_list",
        "transport",
        "transport_fee",
        "update_time",
        "_index",
        "_rowKey"
      ].forEach(e => {
        delete newForm[e];
      });

      if (this.modalStatus == "edit") {
        newForm.id = newForm._id;
        delete newForm._id;
      }
      return newForm;
    }
  }
};
</script>

