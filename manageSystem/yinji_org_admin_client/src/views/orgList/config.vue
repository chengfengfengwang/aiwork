<template>
  <div>
    <vue-json-editor
      v-model="configObj"
      :show-btns="false"
      :exapndedOnStart="true"
      @json-change="onJsonChange"
    ></vue-json-editor>
    <Button style="margin-top:10px" type="primary" @click="submit">提交</Button>
  </div>
</template>
 
<script>
import vueJsonEditor from "vue-json-editor";

export default {
  data() {
    return {
      json: {
        msg: "demo of jsoneditor"
      },
      configObj: {}
    };
  },
  mounted() {
    this.getconfigObj();
  },
  components: {
    vueJsonEditor
  },

  methods: {
    submit() {
      console.log(this.configObj);
      //return
      this.axios
        .post(`${process.env.AGENTSV9}/config/update`, this.configObj)
        .then(res => {
          this.getconfigObj();
        });
    },
    onJsonChange(value) {
      //console.log("value:", value);
    },
    getconfigObj() {
      this.axios.get(`${process.env.AGENTSV9}/config/info`).then(res => {
        this.configObj = res.data;
      });
    }
  }
};
</script>