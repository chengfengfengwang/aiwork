<template>
  <div style="padding:30px">
    <div style="margin-bottom:50px">
      <h2>ai vip查询</h2>
      <Input v-model="aiForm.phone" placeholder="输入电话号" style="width: 300px" />
      <!-- <Select
        v-model="aiForm.goods_id"
        style="width:200px"
      >
        <Option
          v-for="(item, index) in aiVipList"
          :value="item.value"
          :key="index"
        >
          {{ item.name }}</Option
        >
      </Select> -->
      <Button type="info" @click="searchAi">查询</Button>
      <div style="margin-top:10px">{{aiResult}}</div>
    </div>

     <div>
      <h2>音乐壳 vip查询</h2>
      <Input v-model="yinjiForm.phone" placeholder="输入手机号" style="width: 300px" />
      <Button type="info" @click="searchYinji">查询</Button>
      <div style="margin-top:10px">{{yinjiResult}}</div>
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
      aiResult:'',
       yinjiResult:'',
    };
  },

  mounted() {
    //this.getGroupList();
    delete this.axios.defaults.headers.common['key'];
    delete this.axios.defaults.headers.common['uid'];
    delete this.axios.defaults.headers.common['token'];
  },
  methods: {
    searchYinji() {
      this.axios
        .get(
          `http://58.87.125.111:55555/v1/user/user_info_phone?phone=${this.yinjiForm.phone}`
        )
        .then(res => {
            console.log(res)
            this.yinjiResult = res.data.msg
          //this.$Message.success("查询成功");
          //this.getGroupList();
        });
    },
    searchAi() {
      this.axios
        .get(
          `http://123.206.51.140:2525/v3/users/user_info_phone?phone=${this.aiForm.phone}`
        )
        .then(res => {
            this.aiResult = res.data.msg
            console.log(res)
          //this.$Message.success("查询成功");
          //this.getGroupList();
        });
    }
  }
};
</script>
