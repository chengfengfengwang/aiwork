<template>
  <div style="padding:30px">
    <div style="margin-bottom:50px">
      <h2>ai vip开通</h2>
      <Input v-model="aiForm.uid" placeholder="输入uid" style="width: 300px" />
      <Select v-model="aiForm.goods_id" style="width:200px">
        <Option v-for="(item, index) in aiVipList" :value="item.value" :key="index">{{ item.name }}</Option>
      </Select>
      <Button type="info" @click="acAi">开通</Button>
    </div>

    <div style="margin-bottom:50px">
      <h2>音乐壳 vip开通</h2>
      <Input v-model="yinjiForm.phone" placeholder="输入手机号" style="width: 300px" />
      <Button type="info" @click="acYinji">开通</Button>
    </div>
    <div style="margin-bottom:50px">
      <h2>ai手动开通会员</h2>
      <Input v-model="aiHandOpenPhone" placeholder="输入手机号" style="width: 300px" />
      <Select v-model="aiHandOpenInstrument" placeholder="选择乐器类型" style="width:200px">
        <Option value="0">吉他</Option>
        <Option value="1">尤克里里</Option>
        <Option value="2">卡林巴</Option>
        <Option value="3">非洲鼓</Option>
        <Option value="4">钢琴</Option>
        <Option value="6">口琴</Option>
      </Select>
      <Input v-model="aiHandOpenChannelDays" placeholder="输入开通天数" style="width: 300px" />
      <Input v-model="aiHandOpenChannelId" placeholder="输入渠道id" style="width: 300px" />
      <Button type="info" @click="submitAiHandOpen">开通</Button>
    </div>
    <div style="margin-bottom:50px">
      <h2>ai手动关闭会员</h2>
      <Input v-model="aiHandOpenPhone" placeholder="输入手机号" style="width: 300px" />
      <Select v-model="aiHandOpenInstrument" placeholder="选择乐器类型" style="width:200px">
        <Option value="0">吉他</Option>
        <Option value="1">尤克里里</Option>
        <Option value="2">卡林巴</Option>
        <Option value="3">非洲鼓</Option>
        <Option value="4">钢琴</Option>
        <Option value="6">口琴</Option>
      </Select>
      <Button type="info" @click="submitAiHandClose">关闭</Button>
    </div>
  </div>
</template>
<script>
import { formatPermission, formatAscription } from "../common/util.js";
export default {
  data() {
    return {
      aiForm: {},
      yinjiForm: {},
      aiVipList: [
        {
          name: "超级vip",
          value: "5e44b0bb0cada6b76aa6347f"
        },
        {
          name: "超级vip2",
          value: "5e47b3349fc3c8bd8577aec0"
        },
        {
          name: "超级vip2(减)",
          value: "5e4fe8c29fc3c8bd8577fabb"
        },
        {
          name: "超级vip(减)",
          value: "5e4fe8d49fc3c8bd8577fabe"
        }
      ],
      aiHandOpenPhone: "",
      aiHandOpenInstrument: "",
      aiHandOpenChannelId:'',
      aiHandOpenChannelDays:'',

      aiHandClosePhone: "",
      aiHandCloseInstrument: "",
    };
  },

  mounted() {
    //this.getGroupList();
    delete this.axios.defaults.headers.common["key"];
    delete this.axios.defaults.headers.common["uid"];
    delete this.axios.defaults.headers.common["token"];
  },
  methods: {
    acYinji() {
      this.axios
        .get(
          `http://58.87.125.111:55555/v1/user/update_vip/?phone=${this.yinjiForm.phone}`
        )
        .then(res => {
          console.log(res);
          this.$Message.success("开通成功");
          //this.getGroupList();
        });
    },
    acAi() {
      this.axios
        .post(
          `http://api.iguitar.immusician.com:2525/v3/users/svip/payment_callback`,
          {
            uid: this.aiForm.uid,
            order_id: "1",
            goods_id: this.aiForm.goods_id
          }
        )
        .then(res => {
          this.$Message.success("开通成功");
          //this.getGroupList();
        });
    },
    submitAiHandOpen() {
      this.axios
        .post(
          `http://api.iguitar.immusician.com:2525/v3/users/svip/hand_operation/`,
          {
            phone:this.aiHandOpenPhone,
            instrument:this.aiHandOpenInstrument,
            time_long:this.aiHandOpenChannelDays * 3600 * 24,
            channel_id:this.aiHandOpenChannelId,
            status:true
          }
        )
        .then(res => {
          this.$Message.success("操作成功");
        });
    },
    submitAiHandClose() {
      this.axios
        .post(
          `http://api.iguitar.immusician.com:2525/v3/users/svip/hand_operation/`,
          {
            phone:this.aiHandClosePhone,
            instrument:this.aiHandCloseInstrument,
            status:false
          }
        )
        .then(res => {
          this.$Message.success("操作成功");
        });
    }
  }
};
</script>
