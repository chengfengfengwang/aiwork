<template>
  <div>
    <h1>{{itemName}}</h1>
    <div class="table_tool">
      <Button
        type="primary"
        @click="myModalShow=true;formStatus='create';formValue={};"
        style="margin-right:30px"
      >添加{{itemName}}</Button>
    </div>

    <MTable :columns="formConfig" :dataList="tableDataList"/>
    <!-- 师训 -->
    <MForm
      :modalShow="myModalShow"
      :formConfig="formConfig"
      @toggleModal="myModalShow=$event"
      @submit="formSubmit"
      :formResult="formValue"
      :title="itemName"
    ></MForm>
  </div>
</template>
<script>
import MTable from "./../MTable/MTable";
import MForm from "./../MForm/MForm";
import MUpload from "./../MUpload/MUpload.vue";
const findIndex = require("lodash.findindex");

export default {
  props: {
    itemName: {
      type: String,
      default: ""
    },
    formConfig: {
      type: Array,
      default: function() {
        return [];
      }
    },
    tableConfig: {
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      formValue: {},
      myModalShow: false,
      tableDataList: [],
      formStatus: ""
    };
  },
  components: {
    MTable,
    MForm,
    MUpload
  },
  created() {
    console.log(this.formConfig);
    this.formConfig.forEach(e => {
      if (e.type === "edit") {
        this.formConfig.push({
          title: " ",
          key: "action",
          width: 250,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.myModalShow = true;
                      this.formStatus = "edit";
                      this.formValue = params.row;
                    }
                  }
                },
                "编辑"
              )
            ]);
          }
        });
      }
    });
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    formSubmit(formResult) {
      // console.log(this.formStatus)
      // return
      if (this.formStatus === "create") {
        const method = this.tableConfig.createData.method;
        const url = this.tableConfig.createData.url;
        this.axios[method](url, formResult).then(res => {
          this.myModalShow = false;
          this.getTableData();
        });
      } else if (this.formStatus === "edit") {
        const method = this.tableConfig.editData.method;
        const url = this.tableConfig.editData.url;
        this.axios[method](url, formResult).then(res => {
          this.myModalShow = false;
          this.getTableData();
        });
      }
    },

    getTableData() {
      this.axios.get(this.tableConfig.getData.url).then(res => {
        this.tableDataList = res.data;
      });
    }
  }
};
</script>
