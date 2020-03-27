<template>
  <div>
    <div class="table_top_tool">
      <span>oid：</span>
      <Input v-model="oid" style="width: 260px" placeholder="请输入oid"></Input>
      <span>处理方式：</span>
      <Select style="width: 160px" v-model="action" placeholder>
        <Option
          v-for="item in actionList"
          :key="item.value"
          :value="item.value"
        >{{item.name}}</Option>
      </Select>
      <span>应用到：</span>
      <Select style="width: 160px" v-model="account" placeholder>
        <Option
          v-for="item in acountList"
          :key="item.value"
          :value="item.value"
        >{{item.name}}</Option>
      </Select>
      <Button type="primary" @click="submit">提交</Button>
    </div>
  </div>
</template>
<script>
import { formatTime, formatTimeOnlyDate } from "./../../common/util.js";

export default {
  data() {
    return {
        actionList:[
            {
                name:'手动处理订单',
                value:0
            },
            {
                name:'手动发货',
                value:1
            }
        ],
        acountList:[
            {
                name:'音乐荚',
                value:0
            },
            {
                name:'音乐荚大礼包',
                value:1
            }
        ],
        action:'',
        account:'',
        oid:''
    };
  },
  mounted() {},
  methods: {
    submit() {
        let form = {
            oid:this.oid,
            action:this.action,
            account:this.account
        }
        // console.log(form)
        // return
      this.axios
        .post(`${process.env.WULIU}/third/wanwu/process_order`,form)
        .then(res => {
          this.channelList = res.data.list;
        });
    }
  }
};
</script>
