<template>
  <div>
    <div class="table_top_tool">自采机型配置：</div>
    <Input
      v-model="self_collect_phones"
      type="textarea"
      :autosize="{minRows: 2,maxRows: 5}"
      placeholder="Enter something..."
    />
    <Button type="primary" @click="submit" style="margin-top:10px;margin-right:30px">确定</Button>
  </div>
</template>
<script>
import {
  getTime,
  timeToTimeStamp,
  getDate,
  compare
} from "./../common/util.js";
export default {
  data() {
    return {
      self_collect_phones: ""
    };
  },
  mounted() {
    this.getPhoneTypeList();
    return;
    
  },
  methods: {
    getPhoneTypeList() {
      this.axios.get(`${this.baseUrl}/${process.env.VERSION}/config/get_live_config`).then(res => {
        this.self_collect_phones = res.data.self_collect_phones;
      });
    },
    submit() {
      this.axios
      .post(`${this.baseUrl}/${process.env.VERSION}/config/set_live_config`, {
        self_collect_phones: this.self_collect_phones
      })
      .then(res => {
        this.$Message.success("更新成功啦!");
        this.getPhoneTypeList();
      });
    }
  }
};
</script>
