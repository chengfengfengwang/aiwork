<template>
  <div>
    <Breadcrumb style="margin-bottom:10px">
      <BreadcrumbItem to="/instrumentFactory">厂商</BreadcrumbItem>
      <BreadcrumbItem to="/instrumentFactory">{{factoryName}}</BreadcrumbItem>
      <BreadcrumbItem>子商品</BreadcrumbItem>
    </Breadcrumb>
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建子商品</Button>
    </div>
    <!-- <Select style="width: 160px" @on-change="getTableList" v-model="searchFactory" placeholder>
      <Option v-for="option in factoryList" :key="option.id" :value="option.id">{{option.name}}</Option>
    </Select>-->
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <Modal v-model="modalShow" width="760" :mask-closable="false">
      <p slot="header" style>
        <span>厂家</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <!-- <FormItem label="厂商">
            <Select style="width: 260px" v-model="formValidate.vendor_id" placeholder>
              <Option
                v-for="option in factoryList"
                :key="option.id"
                :value="option.id"
              >{{option.name}}</Option>
            </Select>
          </FormItem>-->
          <FormItem label="类型">
            <Select style="width: 260px" v-model="formValidate.type" placeholder>
              <Option :value="0">课程</Option>
              <Option :value="1">题库</Option>
              <Option :value="2">琴</Option>
              <Option :value="3">VIP</Option>
              <Option :value="4">训练营</Option>
            </Select>
          </FormItem>
          <FormItem label="名称">
            <Input v-model="formValidate.name" placeholder="请输入子商品名称"></Input>
          </FormItem>
          <div v-if="formValidate.type==0 || formValidate.type==1">
            <FormItem label="课程所属">
              <Select style="width: 260px" v-model="appName" placeholder>
                <Option :value="1">AI</Option>
                <Option :value="2">音乐壳</Option>
              </Select>
            </FormItem>
            <FormItem label="课程id">
              <span>{{formValidate.course_name}}</span>
              <Button @click="yinjiModalShow=true;">选择课程</Button>
            </FormItem>
            <FormItem label="开课天数">
              <Input v-model.number="formValidate.value" placeholder="请输入开课天数"></Input>
            </FormItem>
            <FormItem label="原价">
              <Input v-model.number="formValidate.old_price" placeholder="单位：元"></Input>
            </FormItem>
            <FormItem label="现价">
              <Input v-model.number="formValidate.price" placeholder="单位：元"></Input>
            </FormItem>
          </div>
          <div v-if="formValidate.type==2">
            <FormItem label="颜色">
              <Input v-model="formValidate.spec_1" placeholder="请输入颜色"></Input>
            </FormItem>
            <FormItem label="规格">
              <Input v-model="formValidate.spec_2" placeholder="请输入规格"></Input>
            </FormItem>
            <FormItem label="成本">
              <Input v-model.number="formValidate.value" placeholder="单位：元"></Input>
            </FormItem>
          </div>
          <div v-if="formValidate.type==3">
            <FormItem label="乐器类型">
              <Select v-model="formValidate.spec_1" placeholder style="width:200px">
                <Option
                  v-for="instrument in vipInstruments"
                  :value="instrument.value"
                  :key="instrument.value"
                >{{instrument.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="VIP">
              <Select v-model="formValidate.spec_2" placeholder style="width:200px">
                <Option v-for="tuid in tuids" :value="tuid.tuid" :key="tuid.tuid">{{tuid.name}}</Option>
              </Select>
            </FormItem>
          </div>
          <div v-if="formValidate.type==4">
            <FormItem label="训练营">
              <Select v-model="formValidate.spec_1" placeholder style="width:200px">
                <Option v-for="train in trains" :value="train._id" :key="train._id">{{train.name}}</Option>
              </Select>
            </FormItem>
            <FormItem label="课程id">
              <span>{{formValidate.course_name}}</span>
              <Button @click="yinjiModalShow=true;appName=2">选择课程</Button>
            </FormItem>
            <FormItem label="开课天数">
              <Input v-model.number="formValidate.value" placeholder="请输入开课天数"></Input>
            </FormItem>
          </div>
          <FormItem label="备注">
            <Input v-model="formValidate.note" placeholder="请输入备注"></Input>
          </FormItem>
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
      <AllCourseAi
        :fromDataArr="fromCourseArr"
        ref="allYinjiCourse"
        v-if="yinjiModalShow && appName===1"
      />
      <AllCourseYinji
        :fromDataArr="fromCourseArr"
        ref="allYinjiCourse"
        v-if="yinjiModalShow && appName===2"
      />
      <div slot="footer">
        <Button @click="yinjiCourseSubmit" type="primary">确定</Button>
        <Button @click="yinjiModalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
const instruments = [
  {
    name: "吉他",
    value: "guitar"
  },
  {
    name: "尤克里里",
    value: "ukulele"
  },
  {
    name: "卡林吧",
    value: "kalimba"
  },
  {
    name: "非洲鼓",
    value: "djembe"
  },
  {
    name: "钢琴",
    value: "piano"
  }
];
const vipInstruments = [
  {
    name: "吉他",
    value: 0
  },
  {
    name: "尤克里里",
    value: 1
  }
];
import AllCourseAi from "./../../components/Allcourse/myAllcourseAi";
import AllCourseYinji from "./../../components/Allcourse/myAllcourse";
export default {
  data() {
    return {
      vipInstruments,
      instruments: instruments,
      appName: "",
      modalShow: false,
      formValidate: {},
      columns: [
        {
          title: "名称",
          key: "name"
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
                      this.appName = this.formValidate.vendor_id;
                      delete this.formValidate._index;
                      delete this.formValidate._rowKey;
                      if (
                        this.formValidate.type === 0 ||
                        this.formValidate.type === 1
                      ) {
                        this.formValidate.old_price = this.formValidate
                          .old_price
                          ? this.formValidate.old_price / 100
                          : "";
                        this.formValidate.price = this.formValidate.price
                          ? this.formValidate.price / 100
                          : "";
                      } else if (this.formValidate.type === 2) {
                        this.formValidate.value = this.formValidate.value
                          ? this.formValidate.value / 100
                          : "";
                      }
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
      dataList: [],
      factoryList: [],
      tableLoading: true,
      searchFactory: 4,
      yinjiModalShow: false,
      factoryId: localStorage.getItem("factoryId")
        ? localStorage.getItem("factoryId")
        : "",
      factoryName: localStorage.getItem("factoryName")
        ? localStorage.getItem("factoryName")
        : "",
      fromCourseArr: [],
      tuids: [],
      allTuid: {},
      trains: []
    };
  },
  mounted() {
    this.getTableList();
    this.getTuids();
    this.getTrainList();
    //this.getFactoryList();
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
      this.formValidate.item_id = selected.id;
      this.formValidate.course_name = selected.name;
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
      this.$refs.formValidate.resetFields();
      this.modalShow = true;
      this.modalStatus = "create";
    },
    handleSubmit() {
      //   console.log(this.formValidate);
      //   return
      this.formValidate.vendor_id = this.factoryId;
      delete this.formValidate.course_name;
      if (this.formValidate.type === 0 || this.formValidate.type === 1) {
        this.formValidate.old_price = this.formValidate.old_price
          ? this.formValidate.old_price * 100
          : 0;
        this.formValidate.price = this.formValidate.price
          ? this.formValidate.price * 100
          : 0;
      } else if (this.formValidate.type === 2) {
        this.formValidate.value = this.formValidate.value
          ? this.formValidate.value * 100
          : 0;
      }
      if (this.modalStatus == "create") {
        //return
        this.axios
          .post(`${process.env.WULIU}/cgoods/create`, this.formValidate)
          .then(res => {
            this.modalShow = false;
            this.getTableList();
          });
      } else {
        //console.log(this.formValidate);
        //return;
        this.axios
          .post(`${process.env.WULIU}/cgoods/update`, this.formValidate)
          .then(res => {
            //this.$Message.success("修改成功啦!");
            this.modalShow = false;
            this.getTableList();
          });
      }
    },
    getTableList(vendor_id = this.factoryId) {
      if (!vendor_id) {
        return;
      }

      this.axios
        .get(
          `${
            process.env.WULIU
          }/cgoods/index?page=0&size=999&status=1&vendor_id=${vendor_id}`
        )
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.list;
        });
    }
  },
  components: {
    AllCourseYinji,
    AllCourseAi
  },
  watch: {
    formValidate: {
      deep: true,
      handler() {
        if (this.formValidate.item_id) {
          this.fromCourseArr = [
            {
              name: this.formValidate.course_name,
              id: this.formValidate.item_id
            }
          ];
        } else {
          this.fromCourseArr = [];
        }
        //console.log(this.formValidate.spec_1)
        if (this.formValidate.spec_1 === 0) {
          this.tuids = this.allTuid[0];
        } else if (this.formValidate.spec_1 === 1) {
          this.tuids = this.allTuid[1];
        } else {
          this.tuids = [];
        }
      }
    }
  }
};
</script>
