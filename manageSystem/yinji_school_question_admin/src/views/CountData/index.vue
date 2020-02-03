<template>
  <div>
    <div class="table_top_tool">
      <Button
        type="primary"
        @click="createNewCourse"
        style="margin-right:30px"
      >新建{{type==='activity'? '活动' : '课程'}}</Button>
      <!-- <span style="margin-left:5px">按课程名称筛选：</span>
      <Input
        style="width:200px"
        @input="keywordChange"
        v-model="lessonName"
        placeholder="输入课程名称如：国院第二课"
      />-->
    </div>
    <!-- 统计项 -->
    <Modal v-model="indiModalShow" width="760">
      <p slot="header" style>
        <span>统计项</span>
      </p>
      <div>
        <Form :model="indiForm" width="1060" :label-width="200">
          <!-- <FormItem label="json配置">
            <Input v-model="indiForm.json" type="textarea" :rows="20" placeholder="Enter something..." />
          </FormItem>-->
          <FormItem label="统计项名称">
            <Input v-model="indiForm.name" placeholder="请输入统计项名称"></Input>
          </FormItem>
          <FormItem label="构成指标">
            <CheckboxGroup v-model="indicatorArr">
              <Checkbox
                v-for="(item,index) in allIndicators"
                :label="item.id"
                :key="index"
              >{{item.name}}--{{item.id}}</Checkbox>
            </CheckboxGroup>
          </FormItem>
          <!-- 指标填写区域 -->
          <div id="writeWrapper">
            <div
              :data-id="item.id"
              :data-ratio="item.is_ratio"
              class="myitem"
              v-for="(item,index) in testArr"
              :key="index"
            >
              <h4 style="text-align:center">{{item.name}}</h4>
              <FormItem
                v-if="value.required"
                v-for="(value, name) in item.select_args"
                :key="name"
                :label="value.description"
              >
                <Input
                  v-if="!value.is_show_list"
                  class="required"
                  :data-name="name"
                  :value="name=='course_id'?curRow.course_id:''"
                  type="textarea"
                  :rows="4"
                  placeholder="Enter something..."
                />
                <!-- <Select v-if="curRow.is_show_list" v-model="testVal" placeholder="">
                  <Option v-for="(li,idx) in list" :key="idx" :value="li._id">乐理</Option>
                  <Option :value="1">练耳</Option>
                  <Option :value="2">常识</Option>
                  <Option :value="3">视唱</Option>
                </Select>-->
                <CheckboxGroup
                  :data-name="name"
                  v-if="value.is_show_list"
                  v-model="testVal"
                  @on-change="checkAllGroupChange"
                >
                  <Checkbox
                    :data-value="li._id"
                    :data-name="name"
                    v-for="(li,idx) in value.select_list"
                    :key="idx"
                    :label="li._id"
                  >
                    <span :data-name="name">{{li.event_name}}</span>
                    <img style="width:150px" :src="li.phone_img_url" alt>
                  </Checkbox>
                </CheckboxGroup>
              </FormItem>
            </div>
          </div>
          <!-- <FormItem v-for="(item,index) in testArr" :key="index" :label="item.name">
            <Input value="" :ref="'item' + index"  type="textarea" :rows="4" placeholder="Enter something..." />
          </FormItem>-->
        </Form>
      </div>
      <div slot="footer">
        <Button @click="submitProject" type="primary">确定</Button>
        <Button @click="indiModalShow=false">关闭</Button>
      </div>
    </Modal>
    <!-- 课程 -->
    <Modal v-if="type==='course'" v-model="courseModalShow" width="760">
      <p slot="header" style>
        <span>新建课程</span>
      </p>
      <div>
        <Form :model="courseForm" :label-width="100">
          <FormItem label="所属课程">
            <Select v-model="courseForm.id" placeholder="选择所属课程">
              <Option v-for="item in allCourseList" :key="item.id" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmitCourse" type="primary">确定</Button>
        <Button @click="courseModalShow=false">关闭</Button>
      </div>
    </Modal>
    <!-- 活动 -->
    <Modal v-if="type==='activity'" v-model="courseModalShow" width="760">
      <p slot="header" style>
        <span>新建活动</span>
      </p>
      <div>
        <Form :model="courseForm" :label-width="100">
          <FormItem label="活动名称">
            <!-- <Select
              v-model="courseForm.id"
              placeholder="选择所属课程"
            >
              <Option
                v-for="item in allCourseList"
                :key="item.id"
                :value="item.id"
              >{{item.name}}</Option>
            </Select>-->
            <Input v-model="courseForm.activity_name" placeholder="输入活动名称"/>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmitAc" type="primary">确定</Button>
        <Button @click="courseModalShow=false">关闭</Button>
      </div>
    </Modal>
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
  </div>
</template>
<script>
import expandRow from "./TableExpand";
import { find } from "../../common/util";
export default {
  props: {
    app: "",
    type: {
      default: "activity"
    },
  },
  data() {
    return {
      tableLoading: true,
      columns: [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                course: params.row,
                app: this.app
              }
            });
          }
        },
        {
          title: "id",
          key: "course_id"
        },
        {
          title: "课程名称",
          key: "course_name"
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
                      this.curRow = params.row;
                      this.createIndi();
                    }
                  }
                },
                "配置统计项"
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
              //             that.delete(params.row._id);
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
      allCourseList: [],
      dataList: [],
      courseModalShow: false,
      indiModalShow: false,
      courseForm: {},
      indiForm: {},
      allIndicators: [],
      indicatorArr: [],
      testArr: [],
      testVal: [],
    };
  },
  methods: {
    checkAllGroupChange(e, el) {
      console.log(e, el);
    },
    submitProject() {
      var param = {};
      var arr = [];
      var arr1 = [];
      //每一个指标
      var items = document.querySelectorAll(".myitem");
      items.forEach(e => {
        var obj = {};
        //指标id
        obj.indicator_id = e.getAttribute("data-id");
        //指标需要输入的多个项
        var inputs = e.querySelectorAll("textarea");
        inputs.forEach(e => {
          //从textarea的父元素上拿到key，从textarea上拿到value
          var key = e.parentElement.getAttribute("data-name");
          obj[key] = e.value;
        });
        var selects = e.querySelectorAll(".ivu-checkbox-wrapper-checked");
        selects.forEach(e => {
          //从textarea的父元素上拿到key，从textarea上拿到value
          var key = e.getAttribute("data-name");
          obj[key] = e.getAttribute("data-value");
        });
        if (e.getAttribute("data-ratio")) {
          arr1.push(obj);
        } else {
          arr.push(obj);
        }
      });
      // console.log(arr)
      console.log(this.curRow);
      param.name = this.indiForm.name;
      if(this.type==='course'){
          param.course_id = this.curRow.course_id;
            param.course_name = this.curRow.course_name;
      }else if(this.type==='activity'){
        param.activity_name  = this.curRow.activity_name;
      }
      
      param.indicator_select_args_list = arr;
      param.ratio_indicator_list = arr1;
      param.has_ratio = arr1.length > 0 ? 1 : 0;
      console.log(param);

      //return
      this.axios.post(`${this.host}/create_project`, param).then(res => {
        this.indiModalShow = false;
        //重置输入
        this.indiForm = {};
        this.indicatorArr = [];
        items.forEach(e => {
          var inputs = e.querySelectorAll("textarea");
          inputs.forEach(e => {
            e.value = "";
          });
        });
        location.reload();
      });
    },
    createIndi() {
      this.indiModalShow = true;
    },
    getAllCourses() {
      if (this.app === "ai") {
        var url = `${this.host}/courses/?page=0&size=999`;
      } else if (this.app === "yinji") {
        var url = `${this.host}/courses/?page=0&size=999`;
      }
      this.axios.get(url).then(res => {
        this.allCourseList = res.data;
        //console.log(res);
      });
    },
    getConfigedCourses() {
        console.log(this.type)
      if (this.type === "activity") {
        var url = `${this.host}/get_activity`;
      } else if (this.type === "course") {
        var url = `${this.host}/get_course`;
      }
      this.axios.get(url).then(res => {
        this.tableLoading = false;
        this.dataList = res.data;
      });
    },
    handleSubmitAc() {
      this.axios
        .post(`${this.host}/create_activity`, this.courseForm)
        .then(res => {
          this.courseModalShow = false;
          this.getConfigedCourses();
        });
    },
    handleSubmitCourse() {
      console.log("123");
      var findItem = this.allCourseList.find(item => {
        return item.id === this.courseForm.id;
      });
      console.log("456");
      var param = {
        course_id: findItem.id,
        course_name: findItem.name
      };
      console.log(param);
      //return
      this.axios.post(`${this.host}/create_course`, param).then(res => {
        this.courseModalShow = false;
        this.getConfigedCourses();
      });
    },
    createNewCourse() {
      this.courseForm = {};
      this.courseModalShow = true;
      this.modalStatus = "create";
    }
  },
  mounted() {
    if (this.type == "course") {
      this.columns = [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                course: params.row,
                app: this.app
              }
            });
          }
        },
        {
          title: "id",
          key: "course_id"
        },
        {
          title: "课程名称",
          key: "course_name"
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
                      this.curRow = params.row;
                      this.createIndi();
                    }
                  }
                },
                "配置统计项"
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
              //             that.delete(params.row._id);
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
      ];
    } else if (this.type == "activity") {
      this.columns = [
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            return h(expandRow, {
              props: {
                course: params.row,
                app: this.app
              }
            });
          }
        },
        {
          title: "id",
          key: "course_id"
        },
        {
          title: "活动名称",
          key: "activity_name"
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
                      this.curRow = params.row;
                      this.createIndi();
                    }
                  }
                },
                "配置统计项"
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
              //             that.delete(params.row._id);
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
      ];
    }
    if (this.app === "ai") {
      this.host = process.env.LIDONG_AI;
    } else if (this.app === "yinji") {
      this.host = process.env.LIDONG_YINJI;
    }

    //获取已经配置的课程
    this.getConfigedCourses();
    //获取所有课程
    this.getAllCourses();
    //获取指标
    this.axios.get(`${this.host}/get_all_indicator`).then(res => {
      this.allIndicators = res.data;
      //console.log(res);
    });
  },
  watch: {
    indicatorArr(valArr) {
      this.testArr = [];
      valArr.forEach((val, index) => {
        var item = this.allIndicators.find(e => {
          return e.id === val;
        });
        var args = item.select_args;
        var obj = {};
        for (var key in args) {
          //console.log(key + ': ')
          //console.log(args[key])
        }
        this.testArr.push(item);
      });
      //console.log(this.testArr)
    }
  }
};
</script>
