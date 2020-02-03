<template>
  <div>
    <Modal v-model="myModalShow" width="760">
      <p slot="header" style>
        <span>{{title}}</span>
      </p>
      <Form :model="myFormResult" :label-width="100">
        <FormItem v-for="item in formConfig" :key="item.key" :label="item.title">
          <template v-if="item.type==='String'">
            <Input style="width:300px" v-model="myFormResult[item.key]" :placeholder="item.key"></Input>
          </template>
          <template v-if="item.type==='Array'">
            <Select v-model="myFormResult[item.key]" style="width:200px" placeholder>
              <Option
                v-for="(option,index) in item.options"
                :key="index"
                :value="option.id"
              >{{option.name}}</Option>
            </Select>
          </template>
          <template v-if="item.type==='img'">
            <MUpload
              :defaultFile="myFormResult[item.key]"
              btnText="上传"
              :acceptType="0"
              v-on:upload-success="myFormResult[item.key]=$event"
            />
          </template>
          <template v-if="item.type==='video'">
            <MUpload
              :defaultFile="myFormResult[item.key]"
              btnText="上传"
              :acceptType="2"
              v-on:upload-success="myFormResult[item.key]=$event"
            />
          </template>
          <template v-if="item.type==='Number'">
            <Input
              style="width:300px"
              v-model.number="myFormResult[item.key]"
              placeholder="instrument_type"
            ></Input>
          </template>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="submit" type="primary">确定</Button>
        <Button @click="$emit('toggleModal',false)">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import MUpload from "./../MUpload/MUpload.vue";
export default {
  props: {
    title: {
      type: String,
      default: "标题"
    },
    formConfig: {
      type: Array,
      default: function() {
        return [];
      }
    },
    modalShow:{
      type: Boolean,
      default: false
    },
    formResult:{
      type: Object,
      default: function() {
        return {};
      }
    }
  },
  data() {
    return {
      myModalShow: this.modalShow,
      myFormResult: {}
    };
  },
  components: {
    MUpload
  },
  mounted() {
    // console.log("--------");
    // console.log(this.formConfig);
  },
  methods: {
    submit(){
      delete this.myFormResult._index;
      delete this.myFormResult._rowKey;
      this.$emit('submit',this.myFormResult)
    }
  },
  watch: {
    modalShow: {
      handler(newV, oldV) {
        this.myModalShow = newV;
      }
    },
    myModalShow: {
      handler(newV) {
        this.$emit('toggleModal',newV)
      }
    },
    formResult: {
      handler(newV, oldV) {
        this.myFormResult = newV;
      },
      deep:true
    },
  }
};
</script>

