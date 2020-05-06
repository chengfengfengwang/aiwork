<template>
  <div>
    <!-- <vue-json-editor
    height="400px"
      v-model="configObj"
      :show-btns="false"
      :exapndedOnStart="true"
      @json-change="onJsonChange"
    ></vue-json-editor> -->
    <v-jsoneditor v-model="configObj" :options="options"  :plus="true" height="700px" @error="onError" />

    <Button style="margin-top:10px" type="primary" @click="submit">提交</Button>
  </div>
</template>
 
<script>
// import vueJsonEditor from "vue-json-editor";
import VJsoneditor from 'v-jsoneditor'

export default {
  data() {
    return {
      json: {
        msg: "demo of jsoneditor"
      },
      configObj: {},
      options:{
        modes:['tree','form','code'],
        mode:'code'
      }
    };
  },
  mounted() {
    this.getconfigObj();
  },
  components: {
    //vueJsonEditor
    VJsoneditor
  },

  methods: {
    onError() {
        alert('请检查json')
    },
    submit() {
      console.log(this.configObj);
      //return
      this.axios
        .post(`${process.env.JINKANG}/${process.env.VERSION}/config/update_content_config`, this.configObj)
        .then(res => {
          this.getconfigObj();
        });
    },
    onJsonChange(value) {
      //console.log("value:", value);
    },
    getconfigObj() { 
       this.axios.get(`${process.env.JINKANG}/${process.env.VERSION}/config/get_content_config`).then(res => {
        this.configObj = res.data;
      });
    }
  }
};
</script>
<style lang="less">

</style>