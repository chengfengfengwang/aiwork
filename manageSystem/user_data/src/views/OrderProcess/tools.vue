<template>
  <div>
    <section class="sec">
      <h1>万物订单/发货处理</h1>
      <div class="table_top_tool">
        <span>订单编号</span>
        <Input v-model="oid" style="width: 260px" placeholder="请输入订单编号"></Input>
        <span>处理方式：</span>
        <Select style="width: 160px" v-model="action" placeholder>
          <Option v-for="item in actionList" :key="item.value" :value="item.value">{{item.name}}</Option>
        </Select>
        <span>应用到：</span>
        <Select style="width: 160px" v-model="account" placeholder>
          <Option v-for="item in acountList" :key="item.value" :value="item.value">{{item.name}}</Option>
        </Select>
        <Button type="primary" @click="submit">提交</Button>
      </div>
    </section>
    <section class="sec">
      <h1>万物手动回传</h1>
      <div class="table_top_tool">
        <div style="margin-bottom:10px">
          <span>快递公司</span>
          <Input v-model="company" style="width: 260px" placeholder="请输入快递公司"></Input>
          <span>快递单号</span>
          <Input v-model="out_sid" style="width: 260px" placeholder="请输入快递单号"></Input>
          <span>订单编号</span>
          <Input v-model="oid2" style="width: 260px" placeholder="请输入订单编号"></Input>
        </div>
        <div>
          <span>sku</span>
          <Input v-model="order_items" style="width: 260px" placeholder="请输入sku"></Input>
          <span>应用到：</span>
          <Select style="width: 160px" v-model="account" placeholder>
            <Option v-for="item in acountList" :key="item.value" :value="item.value">{{item.name}}</Option>
          </Select>
          <Button type="primary" @click="submit1">提交</Button>
        </div>
      </div>
    </section>
  </div>
</template>
<script>
import { formatTime, formatTimeOnlyDate } from "./../../common/util.js";

export default {
  data() {
    return {
      actionList: [
        {
          name: "手动处理订单",
          value: 0
        },
        {
          name: "手动发货",
          value: 1
        }
      ],
      acountList: [
        {
          name: "音乐荚",
          value: 0
        },
        {
          name: "音乐荚大礼包",
          value: 1
        }
      ],
      action: "",
      account: "",
      oid: "",
      ///
      company: "",
      out_sid: "",
      order_items: "",
      oid2:''
    };
  },
  mounted() {},
  methods: {
    submit() {
      let form = {
        oid: this.oid,
        action: this.action,
        account: this.account
      };
      // console.log(form)
      // return
      this.axios
        .post(`${process.env.WULIU}/third/wanwu/process_order`, form)
        .then(res => {
          this.channelList = res.data.list;
        });
    },
    submit1() {
      let form = {
        company: this.company,
        out_sid: this.out_sid,
        order_items: this.order_items,
        account: this.account,
        oid2:this.oid2
      };
      // console.log(form)
      // return
      this.axios
        .post(`${process.env.WULIU}/third/wanwu/hand_wanwu_return`, form)
        .then(res => {
          this.channelList = res.data.list;
        });
    }
  }
};
</script>
<style lang="less" scoped>
.sec {
  margin-bottom: 70px;
}
</style>
