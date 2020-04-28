<template>
  <div>
    <select required>
      <option disabled value selected>- please choose -</option>
      <option v-for="item in arr" :key="item.id" :value="item.id">{{item.name}}</option>
    </select>
    {{courseList}}
    <router-view/>
  </div>
</template>
<script>
import { getQueryVariable } from "../../common/util.js";
require('chengfengsleep');
export default {
  data() {
    return {
      previewSrc: "",
      arr: [{ name: "a", id: 0 }, { name: "b", id: 1 }, { name: "c", id: 2 }],
      courseList:[]
    };
  },
  created() {
    new Dialog({
      id:'qwe'
    }).show()
    this.axios
      .post(`${process.env.VUE_APP_ORG}/v9/class_info/get_course_apply`, {
        institutions_id: "5dbaa163887437b3610adbee"
      })
      .then(res => {
        this.courseList = res.data;
        console.log("---");
        console.log(this.courseList);
        //this.courseList.unshift({ id: "-1", name: "全部" });
      });
  }
};
</script>
<style lang="less">
select:invalid {
  color: red;
}
</style>

