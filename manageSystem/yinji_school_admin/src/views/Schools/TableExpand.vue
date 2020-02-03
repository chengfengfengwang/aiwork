<style scoped>
.expand-row {
  margin-top: 10px;
  padding-top: 10px;
  margin-bottom: 0px;
  clear: both;
}
</style>
<template>
  <div>
    <!-- {{this.course.project_info}} -->
    <div>
      <Row class="expand-row">
        <Col span="4" v-for="(value,name) in row.grade_info" :key="name">
          <a href="javascript:;" @click="goClass(row._id,name,row.name,row.key)">
            <span class="expand-key">{{name}}:</span>
            <span class="expand-value">{{ value }}</span>
          </a>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    grade_info: Object,
    row: Object
  },
  data() {
    return {
      itemList: [],
      resultList: [],
      timeRange: ["2010-01-01", "2020-02-15"]
    };
  },
  mounted() {},
  methods: {
    goClass(school_id, grade_id, school_name, grade_name) {
      localStorage.setItem("school_id", school_id);
      localStorage.setItem("grade_id", grade_id);
      localStorage.setItem("school_name", school_name);
      localStorage.setItem("grade_name", grade_name);
      this.$store.dispatch("updateschoolInfo", {
        school_id, grade_id, school_name, grade_name
      });
      this.$router.push("/ScloolClass");
    }
  }
};
</script>