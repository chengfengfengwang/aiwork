<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建商品</Button>
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <Modal v-model="modalShow" width="860">
      <p slot="header" style>
        <span>编辑</span>
      </p>
      <div>
        <Form ref="formObj" :model="formObj" :label-width="80">
          <FormItem label="名称">
            <Input v-model="formValidate.name" placeholder></Input>
          </FormItem>
          <FormItem label="第三方渠道">
            <Input v-model="formValidate.channel" placeholder></Input>
          </FormItem>
          <FormItem label="第三方id">
            <Input v-model="formValidate.third_id" placeholder></Input>
          </FormItem>
          <FormItem v-for="(item, index) in lessonItemArr" :key="item.id" label="课程">
            <Select style="width: 260px" v-model="item.item_id" placeholder>
              <Option
                v-for="option in lessonFromArr"
                :key="option.id"
                :value="option.id"
              >{{option.name}}</Option>
            </Select>
            <span>天数</span>
            <Input style="width:300px" type="text" v-model="item.time_limit" placeholder></Input>
            <Icon
              @click="removeLessonItem(index)"
              style="font-size:25px"
              type="ios-close-circle-outline"
            />
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12">
                <Button type="dashed" long @click="addLessonItem" icon="md-add">新增课程</Button>
              </Col>
            </Row>
          </FormItem>
          <FormItem v-for="(item, index) in qBankItemArr" :key="item.id" label="题库">
            <Select style="width: 260px" v-model="item.item_id" placeholder>
              <Option
                v-for="option in qBankFromArr"
                :key="option.goods_id"
                :value="option.goods_id"
              >{{option.name}}</Option>
            </Select>
            <span>天数</span>
            <Input style="width:300px" type="text" v-model="item.time_limit" placeholder></Input>
            <Icon
              @click="removeLessonItem(index)"
              style="font-size:25px"
              type="ios-close-circle-outline"
            />
          </FormItem>
          <FormItem>
            <Row>
              <Col span="12">
                <Button type="dashed" long @click="addQBankitemItem" icon="md-add">新增题库</Button>
              </Col>
            </Row>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>

    <Modal v-model="modalDetailShow" width="460">
      <p slot="header" style>
        <span>详情</span>
      </p>
      <div>
        <Form ref="formObj" :model="formObj" :label-width="80">
          <div>
            <div>名称：{{formValidate.name}}</div>
            <div>渠道：{{formValidate.channel}}</div>
            <div
              v-for="item in lessonItemArr"
              :key="item.item_id"
            >{{item.name}}：{{item.time_limit}}天</div>
            <div v-for="item in qBankItemArr" :key="item.item_id">{{item.name}}：{{item.time_limit}}天</div>
          </div>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="modalDetailShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      modalShow: false,
      modalDetailShow: false,
      formValidate: {},
      index: 1,
      formObj: {},
      lessonItemArr: [
        {
          id: new Date().valueOf()
        }
      ],
      qBankItemArr: [
        {
          id: new Date().valueOf() + 2
        }
      ],
      lessonFromArr: [],
      qBankFromArr: [],
      tableLoading: true,
      columns: [
        // {
        //   title: "机构id",
        //   key: "id"
        // },

        {
          title: "名称",
          key: "name"
        },
        {
          title: "交易id",
          key: "third_id"
        },
        {
          title: "渠道",
          key: "channel"
        },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          width: 300,
          //maxWidth: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.getDetail(params.row.id);
                      this.tempRow = params.row;
                      console.log(this.tempRow);
                      this.modalDetailShow = true;
                    }
                  }
                },
                "查看详情"
              ),
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
                      this.getDetail(params.row.id);
                      this.modalStatus = "edit";
                      this.tempRow = params.row;
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
      dataList: []
    };
  },
  mounted() {
    this.getGoodsIndex();
    this.getLessons();
    this.getQBanks();
    this.getDetail("5dfb55bc8e46d68218e3e9b7");
  },
  methods: {
      delete(id){
          this.axios
          .post(`${process.env.PEILUN}/v1/third/goods_delete`, {
              id
          })
          .then(res => {
            this.getGoodsIndex();
          });
      },
    getDetail(id) {
      this.axios
        .get(`${process.env.PEILUN}/v1/third/goods_detail?id=${id}`)
        .then(res => {
          let myRes = res.data;
          let { goods_list } = myRes;
          this.lessonItemArr = [];
          this.qBankItemArr = [];
          goods_list.forEach((e, index) => {
            if (e.goods_type === "0") {
              this.lessonItemArr.push({
                id: new Date().valueOf() + index,
                item_id: e.item_id,
                time_limit: e.time_limit,
                name: e.name
              });
            } else if (e.goods_type === "1") {
              this.qBankItemArr.push({
                id: new Date().valueOf() + index,
                item_id: e.item_id,
                time_limit: e.time_limit,
                name: e.name
              });
            }
          });
          this.formValidate = Object.assign({}, this.tempRow);
        });
    },
    handleSubmit() {
      let goodsList = [];
      goodsList = goodsList
        .concat(
          this.lessonItemArr.map(e => {
            return {
              item_id: e["item_id"],
              time_limit: e["time_limit"],
              goods_type: "0"
            };
          })
        )
        .concat(
          this.qBankItemArr.map(e => {
            return {
              item_id: e["item_id"],
              time_limit: e["time_limit"],
              goods_type: "1"
            };
          })
        );

      let param = Object.assign(
        {},
        {
          goods_list: goodsList
        },
        this.formValidate
      );
      console.log(param);
      //return;
      if (this.modalStatus === "create") {
        this.axios
          .post(`${process.env.PEILUN}/v1/third/goods_create`, param)
          .then(res => {
            this.modalShow = false;
            this.getGoodsIndex();
          });
      } else {
          this.axios
          .post(`${process.env.PEILUN}/v1/third/goods_update`, param)
          .then(res => {
            this.modalShow = false;
            this.getGoodsIndex();
          });
      }
    },
    createNewBank() {
      this.formObj = {};
      this.lessonItemArr = [
        {
          id: new Date().valueOf()
        }
      ];
      this.modalShow = true;
      this.modalStatus = "create";
    },
    addLessonItem(index) {
      this.lessonItemArr.push({
        id: new Date().valueOf()
      });
    },
    addQBankitemItem(index) {
      this.qBankItemArr.push({
        id: new Date().valueOf()
      });
    },
    removeLessonItem(index) {
      this.courseTypeArr.splice(index, 1);
    },
    getGoodsIndex() {
      this.axios
        .post(`${process.env.PEILUN}/v1/third/goods_index`, {
          status: 2,
          page: 0,
          size: 999
        })
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.list;

          this.total = res.total;
        });
    },
    getQBanks() {
      this.axios
        .get("http://58.87.125.111:55555/v1/new_question/list/", {
          headers: {
            token:
              "teacher_2%7C1%3A0%7C10%3A1576460599%7C8%3Ausername%7C8%3AYWRtaW4%3D%7C15622fe1708b4d0d098f43460a4a796cea52d2fbe9e9cee81e1c2cdd0da10450",
            uid: 31
          }
        })
        .then(res => {
          if (res.data) {
            this.qBankFromArr = res.data;
          } else {
            this.qBankFromArr = [];
          }
        });
    },
    getLessons() {
      this.axios
        .get(
          "http://hot.test.immusician.com:55555/v1/courses?page=0&size=999&keyword=&instrument_type=music_basis&level=all&sort=_id,1&online=true"
        )
        .then(res => {
          if (res.data) {
            this.lessonFromArr = res.data;
          } else {
            this.lessonFromArr = [];
          }
        });
    }
  }
};
</script>

