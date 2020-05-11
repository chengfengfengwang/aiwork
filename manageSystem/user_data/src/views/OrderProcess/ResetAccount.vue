<template>
  <div>
    <div class="table_top_tool">
      <h1>音乐壳账号还原</h1>
      <Input style="width:300px" v-model.number="phone" placeholder="请输入手机号"></Input>
      <Button type="primary" @click="reset">还原</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: '',
    };
  },
  methods:{
    reset(){
      this.axios
        .get(`http://58.87.125.111:55555'/v1/user/clear_data?phone=${phone}`)
        .then(res => {
          this.$Message.success("操作成功!");
        });
    }
  }
};
</script>

