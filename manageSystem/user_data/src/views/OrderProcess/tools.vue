<template>
  <div>
    <section class="sec">
      <h1>订单同步处理、订单回传(已上传发货单)</h1>
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
    <section class="sec">
      <h1>万物一键导单</h1>
      <div class="table_top_tool">
        <div style="margin-bottom:10px">
          <span>项目：</span>
          <Select style="width: 160px" v-model="d_account" placeholder>
            <Option
              v-for="item in d_account_list"
              :key="item.value"
              :value="item.value"
            >{{item.name}}</Option>
          </Select>
          <span>筛选：</span>
          <Select style="width: 160px" v-model="d_status" placeholder>
            <Option v-for="item in d_status_list" :key="item.value" :value="item.value">{{item.name}}</Option>
          </Select>
          <span>开始日期</span>
          <DatePicker
            v-model="d_start_time"
            type="date"
            placeholder="Select date"
            style="width: 200px"
          ></DatePicker>
          <span>结束日期</span>
          <DatePicker
            v-model="d_end_time"
            type="date"
            placeholder="Select date"
            style="width: 200px"
          ></DatePicker>
          
        </div>
        <div>
         <span>从第</span>
          <Input v-model="d_page" style="width: 60px" placeholder=""></Input>
          <span>页开始，</span>
          <Input v-model="d_size" style="width: 60px" placeholder=""></Input>
          <span>条</span>
          
          <Button type="primary" @click="submit_download">下载</Button>
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
      oid2: "",
      ///
      d_account: "",
      d_account_list: [
        {
          name: "大礼包",
          value: 0
        },
        {
          name: "音乐壳",
          value: 1
        }
      ],
      d_start_time: "",
      d_end_time: "",
      d_page: 0,
      d_size: 300,
      d_status: "",
      d_status_list: [
        {
          name: "未发货",
          value: 1
        },
        {
          name: "部分发货",
          value: 1
        },
        {
          name: "全部发货",
          value: 1
        }
      ]
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
          this.$Message.success("操作成功");
        });
    },
    submit1() {
      let form = {
        company: this.company,
        out_sid: this.out_sid,
        order_items: this.order_items,
        account: this.account,
        oid2: this.oid2
      };
      // console.log(form)
      // return
      this.axios
        .post(`${process.env.WULIU}/third/wanwu/hand_wanwu_return`, form)
        .then(res => {
          this.channelList = res.data.list;
          this.$Message.success("操作成功");
        });
    },
    submit_download(){
       let form = {
        account: this.d_account,
        start_time: this.d_start_time.valueOf() / 1000,
        end_time: this.d_end_time.valueOf() / 1000,
        page: this.d_page,
        size: this.d_size,
        status: this.d_status,
      };
      console.log(form)
      //return
      this.axios 
        .post(`${process.env.WULIU}/third/wanwu/down_wanwu_all`, form)
        .then(res => {
           window.open(res.data.down_url,'_blank');
          //this.$Message.success("操作成功");
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
