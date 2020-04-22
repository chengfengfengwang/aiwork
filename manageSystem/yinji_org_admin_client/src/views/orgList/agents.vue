<template>
  <div>
    <!-- <div>
      <h1>地区代理信息</h1>
      <AreaAgent/>
    </div> -->
    <div>
      <h1>我的代理</h1>
      <div class="table_top_tool">
        <Button type="primary" @click="createNewBank" style="margin-right:30px">新建代理人</Button>
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
          <span>代理人</span>
        </p>
        <div>
          <Form ref="formValidate" :model="formValidate" :label-width="100">
            <!-- <FormItem label="代理" v-show="modalStatus==='edit'">
              <Input
                disabled
                style="width:300px"
                @click="handleSelectAgent"
                v-model="formValidate.superior"
                placeholder
              ></Input>
              <Button type="success" @click="handleSelectAgent">选择代理</Button>
            </FormItem>-->
            <FormItem label="名字">
              <Input style="width:300px" v-model="formValidate.username" placeholder="请输入名字"></Input>
            </FormItem>
            <FormItem label="等级">
              <Select v-model="formValidate.level" placeholder style="width:200px">
                <Option
                  v-for="(level,idx) in levelList"
                  :key="idx"
                  :value="level.key"
                  :disabled="level.disabled"
                >{{level.label}}</Option>
              </Select>
            </FormItem>
            <FormItem label="登陆账号">
              <Input style="width:300px" v-model="formValidate.phone" placeholder="请输入手机号"></Input>
            </FormItem>
            <!-- <FormItem label="学生数量">
              <Input
                style="width:300px"
                v-model.number="formValidate.student_count"
                placeholder="请输入学生数量"
              ></Input>
            </FormItem>
            <FormItem label="代理机构">
              <div v-for="(item,index) in formValidate.institutions_ids" :key="index">
                <Select v-model="item.institutions_id" placeholder style="width:200px">
                  <Option
                    v-for="(org,idx) in formOrgList"
                    :key="idx"
                    :value="org.id"
                  >{{org.institutions_name}}</Option>
                </Select>
                <span>学生数量</span>
                <Input style="width:100px" v-model.number="item.student_count" placeholder="请输入数量"></Input>

                <Icon @click="addOrg(index)" style="font-size:25px" type="ios-add-circle-outline"/>
                <Icon
                  @click="removeOrg(index)"
                  style="font-size:25px"
                  type="ios-close-circle-outline"
                />
              </div>
            </FormItem>-->
            <FormItem label="课程">
              <div v-for="(item,index) in studentCounts" :key="index">
                <Select v-model="item.id" placeholder style="width:200px">
                  <Option
                    v-for="(goods,idx) in goodsList"
                    :key="idx"
                    :value="goods._id"
                  >{{goods.name}}</Option>
                </Select>
                <span>数量</span>
                <Input style="width:100px" v-model.number="item.num" placeholder="请输入数量"></Input>

                <Icon
                  @click="studentCounts.splice(index + 1, 0, {id: -1,num: ''})"
                  style="font-size:25px"
                  type="ios-add-circle-outline"
                />
                <Icon
                  @click="studentCounts.length>1 ? studentCounts.splice(index, 1) : ''"
                  style="font-size:25px"
                  type="ios-close-circle-outline"
                />
              </div>
            </FormItem>
            <!-- <FormItem label="老师">
              <div v-for="(item,index) in teacherCounts" :key="index">
                <Select v-model="item.id" placeholder style="width:200px">
                  <Option
                    v-for="(goods,idx) in goodsList"
                    :key="idx"
                    :value="goods._id"
                  >{{goods.name}}</Option>
                </Select>
                <span>数量</span>
                <Input style="width:100px" v-model.number="item.num" placeholder="请输入数量"></Input>

                <Icon @click="teacherCounts.splice(index + 1, 0, {id: '',num: ''})" style="font-size:25px" type="ios-add-circle-outline"/>
                <Icon
                  @click="teacherCounts.length>1 ? teacherCounts.splice(index, 1) : ''"
                  style="font-size:25px"
                  type="ios-close-circle-outline"
                />
              </div>
            </FormItem>-->
            <FormItem label="地区">
              <al-selector
                @on-change="areaChange"
                data-type="all"
                v-model="areaArr"
                :level="arearLevel"
              />
              <!-- <al-cascader style="width:300px" data-type="all" v-model="areaArr" level="2"/> -->
            </FormItem>
          </Form>
        </div>
        <div slot="footer">
          <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
          <Button @click="modalShow=false">关闭</Button>
        </div>
      </Modal>
    </div>
  </div>
</template>
<script>
const uniq = require("lodash.uniq");
const uniqBy = require("lodash.uniqby");
const remove = require("lodash.remove");
const differenceBy = require("lodash.differenceby");
const formValidate = {
  institutions_ids: [
    {
      institutions_id: "",
      student_count: ""
    }
  ]
};
import orgMixin from "./../mixins/getOrgList.js";
import levelMixin from "./../mixins/getLevels.js";
import AreaAgent from "./areaAgentTree";
export default {
  mixins: [orgMixin, levelMixin],
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      formValidate: formValidate,

      columns: [
        // {
        //   title: "proxy_id",
        //   key: "proxy_id"
        // },
        // {
        //   title: "user_id",
        //   key: "user_id"
        // },
        {
          title: "名字",
          key: "username"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "等级",
          key: "level"
        },
        {
          title: "学生数量",
          key: "student_count"
        },
        {
          title: "代理机构",
          key: "institutions_ids",
          render: (h, params) => {
            //return h("div", params.row.institutions_ids.map(e => `${e.institution_name}:${e.student_count}`).join("/"));
            return h(
              "div",
              params.row.institutions_ids
                .map(e => `${e.institution_name}`)
                .join("/")
            );
          }
        },
        {
          title: "地区",
          key: "whole_area",
          render: (h, params) => {
            return h("div", params.row.whole_area.map(e => e.name).join("/"));
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
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display:
                      this.$store.getters.role === 3 ? "none" : "inline-block"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem("curAgentId", params.row.proxy_id);
                      localStorage.setItem("agentTreeStatus", "fromAgent");
                      //this.$router.push("agentTree");
                      this.$router.push("agentDetail");
                    }
                  }
                },
                "查看"
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
                      this.formValidate = this.formateRow(params.row);
                      this.modalStatus = "edit";
                    }
                  }
                },
                "编辑"
              )
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "info",
              //         size: "small"
              //       },
              //       style: {
              //         marginRight: "5px"
              //       },
              //       on: {
              //         click: () => {
              //           this.accountModalShow = true;
              //           this.modalStatus = "edit";
              //           this.curOrgId = params.row.institutions_id;
              //         }
              //       }
              //     },
              //     "新建账号"
              //   )
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "error",
              //         size: "small"
              //       },
              //       on: {
              //         click: () => {
              //           var that = this;
              //           this.$Modal.confirm({
              //             title: "警告",
              //             content: "确定要删除吗？",
              //             onOk() {
              //               that.delete(params.row.institutions_id);
              //             }
              //           });
              //         }
              //       }
              //     },
              //     "删除"
              //   )
            ]);
          }
        }
      ],
      selectColumns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "proxy_id",
          key: "proxy_id"
        },
        {
          title: "user_id",
          key: "user_id"
        },
        {
          title: "名字",
          key: "username"
        },
        {
          title: "等级",
          key: "level"
        },
        {
          title: "学生数量",
          key: "student_count"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "代理机构",
          key: "institutions_ids",
          render: (h, params) => {
            //return h("div", params.row.institutions_ids.map(e => `${e.institution_name}:${e.student_count}`).join("/"));
            return h(
              "div",
              params.row.institutions_ids
                .map(e => `${e.institution_name}`)
                .join("/")
            );
          }
        },
        {
          title: "地区",
          key: "whole_area",
          render: (h, params) => {
            return h("div", params.row.whole_area.map(e => e.name).join("/"));
          }
        }
      ],
      dataList: [],
      page: 0,
      pageSize: 10,
      total: 0,
      modalStatus: "",
      searchOrg: "-1",
      accountArr: [
        {
          id: 0,
          value: ""
        }
      ],
      courseTypeArr: [
        {
          id: new Date().valueOf()
        }
      ],
      accountModalShow: false,
      accountForm: {
        phone: ""
      },
      orgs: [],
      areaArr: [],
      selected: [],
      tempAgent: "",
      goodsList: [],
      studentCounts: [
        {
          id: -1,
          num: ""
        }
      ],
      teacherCounts: [
        {
          id: new Date().valueOf(),
          num: ""
        }
      ],
      arearLevel: 0
    };
  },
  components: {
    AreaAgent
  },
  mounted() {
    this.getAgents();
    this.getGoods();
  },
  methods: {
    areaChange(v) {
      //console.log(v);
      this.formValidate.whole_area = v;
    },
    getGoods() {
      this.axios
        .get(`${process.env.AGENTSV9}/proxy/goods?page=0&size=999`)
        .then(res => {
          this.goodsList = res.data.goods;
        });
    },
    addOrg(index) {
      this.formValidate.institutions_ids.splice(index + 1, 0, {
        institutions_id: "",
        student_count: ""
      });
    },
    removeOrg(index) {
      this.formValidate.institutions_ids.splice(index, 1);
    },
    pageChange(page) {
      this.page = page - 1;
      this.getAgents();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getAgents();
    },
    getAgents() {
      this.tableLoading = true;
      this.axios
        .get(`${process.env.AGENTSV9}/proxy/all?page=${this.page}&size=999`)
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.data;
          this.total = res.total;
        });
    },
    formateRow(row) {
      var newRow = Object.assign({}, row);
      this.areaArr = newRow.whole_area.map(e => e.name);
      console.log(this.areaArr);
      this.studentCounts = [];
      this.teacherCounts = [];
      for (let key in newRow.student_count) {
        this.studentCounts.push({
          id: Number(key),
          num: newRow.student_count[key]
        });
      }
      return newRow;
    },
    delete(id) {
      var param = {
        id: id,
        is_delete: true
      };
      this.axios
        .post(process.env.AGENTS + "/v9/institutional/up_institutions", param)
        .then(res => {
          this.modalShow = false;
          this.getAgents();
        });
    },
    createNewBank() {
      this.formValidate = {
        institutions_ids: [
          {
            institutions_id: "",
            student_count: ""
          }
        ]
      };
      this.teacherCounts = [
        {
          id: new Date().valueOf(),
          num: ""
        }
      ];
      (this.studentCounts = [
        {
          id: -1,
          num: ""
        }
      ]),
        (this.modalShow = true);
      this.modalStatus = "create";
    },
    handleSubmit(name) {
      var param = this.formatForm();
      // console.log(this.areaArr);
      // console.log(param.whole_area);
      // return;
      const lastRegion = this.areaArr[this.areaArr.length - 1];
      param.area = lastRegion.name;
      param.regional_code = lastRegion.code;

      param.student_count = {};
      for (const e of this.studentCounts) {
        if (e.id !== -1 && e.id != undefined && !isNaN(e.id)) {
          param.student_count[e.id] = e.num;
        }
      }
      // console.log(this.studentCounts);

      if (this.modalStatus == "create") {
        //超级管理员
        if (this.$store.getters.role === 3) {
          param.proxy_id = -1;
        } else if (this.$store.getters.role === 0) {
          param.proxy_id = this.$store.getters.user.proxy_id;
        }
        if (
          param.institutions_ids[0] &&
          param.institutions_ids[0].institutions_id === ""
        ) {
          delete param.institutions_ids;
        }

        this.axios.post(`${process.env.AGENTSV9}/proxy/`, param).then(res => {
          this.$Message.success("创建成功啦!");
          this.modalShow = false;
          this.getAgents();
        });
      } else {
        ["_rowKey", "_index"].forEach(e => {
          delete param[e];
        });
        if (
          param.institutions_ids[0] &&
          param.institutions_ids[0].institutions_id === ""
        ) {
          delete param.institutions_ids;
        }
        //console.log(param)
        //return
        this.axios.put(`${process.env.AGENTSV9}/proxy/`, param).then(res => {
          this.modalShow = false;
          this.getAgents();
        });
      }
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));
      return newForm;
    }
  },
  watch: {
    formValidate: {
      handler() {
        if (0 < this.formValidate.level && this.formValidate.level < 3) {
          this.arearLevel = this.formValidate.level;
        } else if (this.formValidate.level > 2) {
          this.arearLevel = 2;
        } else {
          this.arearLevel = 0;
        }
        //studentcount
        if (
          typeof this.formValidate.student_count === "object" &&
          Object.keys(this.formValidate.student_count).length == 0
        ) {
          this.studentCounts = [
            {
              id: -1,
              num: ""
            }
          ];
        }
      },
      deep: true
    }
  }
};
</script>
<style lang="less">
h1 {
  margin: 50px auto;
}
</style>




