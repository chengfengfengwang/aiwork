<template>
  <div>
    <!-- <Breadcrumb style="margin-bottom:20px;">
        <BreadcrumbItem to="/CoursePlan">课程列表</BreadcrumbItem>
        <BreadcrumbItem>{{courseName}}</BreadcrumbItem>
    </Breadcrumb>-->
    <h1>发送优惠券</h1>
    <Row>
      <Col span="6"></Col>
      <Col span="18">
        <!-- LV form -->
        <Form
          class="lvform"
          :model="formValue"
          :rules="ruleValidate"
          ref="yhqform"
          :label-width="100"
        >
          <FormItem label="所有用户" prop="all_user">
            <RadioGroup v-model="formValue.all_user">
              <Radio label="1">
                <span>是</span>
              </Radio>
              <Radio label="0">
                <span>否</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="注册开始时间">
            <DatePicker
              v-model="formValue.regist_stime"
              type="date"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="注册结束时间">
            <DatePicker
              v-model="formValue.regist_etime"
              type="date"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="购买课程">
            <Select filterable v-model="formValue.buy_courses" multiple placeholder="选择购买课程">
              <Option v-for="(item,index) in courseList" :key="index" :value="item.id">{{item.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="是否付费">
            <RadioGroup v-model="formValue.is_pay">
              <Radio label="1">
                <span>是</span>
              </Radio>
              <Radio label="0">
                <span>否</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="是否会员">
            <RadioGroup v-model="formValue.is_vip">
              <Radio label="1">
                <span>是</span>
              </Radio>
              <Radio label="0">
                <span>否</span>
              </Radio>
            </RadioGroup>
          </FormItem>
          <FormItem label="会员过期时间">
            <DatePicker
              v-model="formValue.vip_expiretime"
              type="date"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="付费开始时间">
            <DatePicker
              v-model="formValue.pay_stime"
              type="date"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="付费结束时间">
            <DatePicker
              v-model="formValue.pay_etime"
              type="date"
              placeholder="Select date"
              style="width: 200px"
            ></DatePicker>
          </FormItem>
          <FormItem label="优惠券id" prop="coupon_id">
            <Input v-model="formValue.coupon_id"></Input>
          </FormItem>
          <FormItem>
            <Button type="success" @click="formSubmit" style="width:100px">提交</Button>
          </FormItem>
        </Form>
      </Col>
    </Row>
  </div>
</template>
<script>
import Upload from "../../components/UploadGroup/UploadItem";
import { getQueryVariable, getDateDMY } from "../../common/util.js";

export default {
  data() {
    return {
      courseList: [],
      formValue: {},
      courseName: "",
      ruleValidate: {
        all_user: [
          {
            required: true,
            message: "请选择是否适用于所有会员",
            trigger: "change"
          }
        ],
        coupon_id: [
          {
            required: true,
            message: "请输入优惠券id",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {
    this.getCourseList();
  },
  components: {
    MyUpload: Upload
  },
  methods: {
    getCourseList() {
      //http://hot.test.immusician.com:55555/v1/courses/18/?is_admin=1
      this.axios
        .get(`${process.env.YHQ}/v1/courses/find_course?name=all`)
        .then(res => {
          this.courseList = res.data;
        });
    },

    formSubmit() {
      this.$refs["yhqform"].validate(valid => {
        let copyForm = {};
        for (let key in this.formValue) {
          if (this.formValue[key] instanceof Date) {
            console.log(getDateDMY(this.formValue[key]));
            copyForm[key] = getDateDMY(this.formValue[key]);
          } else if (this.formValue[key] !== "") {
            //时间不选的话会自动带上空字符串
            copyForm[key] = this.formValue[key];
          }
        }
        if (valid) {
          this.axios
            .post(`${process.env.YHQ}/v1/coupon/send_coupon`, copyForm)
            .then(res => {
              if (!res.error) {
                this.$Message.success("提交成功");
              }
            });
        }
      });
    }
  }
};
</script>
<style lang="less">
.ivu-select-dropdown {
  max-height: 320px;
}
.list_box {
  //width: 200px;
  margin-bottom: 30px;
  .label_info {
    color: #fff;
    font-size: 16px;
    margin-bottom: 10px;
    border-radius: 2px;
    padding: 5px;
    background-color: #5bc0de;
    .add,
    .close {
      color: #fff;
      font-size: 25px;
    }
  }
  .list_wrapper {
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.075);
    .list_item {
      &.active {
        color: #fff;
        background-color: #337ab7;
      }
      &:first-child {
        border-top-left-radius: 4px;
        border-top-right-radius: 4px;
      }
      &:last-child {
        margin-bottom: 0;
        border-bottom-right-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      padding: 6px;
      margin-bottom: -1px;
      background-color: #fff;
      border: 1px solid #ddd;
    }
  }
}
</style>


