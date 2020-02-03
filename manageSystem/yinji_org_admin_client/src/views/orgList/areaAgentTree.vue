<template>
  <div>
    <div style="margin-bottom:20px">
      <span style="display:inline-block;vertical-align:middle;">地区：</span>
      <al-selector style="width:600px;display:inline-block;vertical-align:middle;"    data-type="all" v-model="areaArr" level="2" />
      <Button type="primary" @click="selectChange">搜索</Button>
    </div>
    <Tree :data="treeData"></Tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      treeData: [],
      areaArr: [],
      searchCode: ""
    };
  },
  mounted() {
    //this.getTree();
    let arr
    if(this.$store.getters.wholeArea){
      arr = this.$store.getters.wholeArea.map(e => e.name);
    }
    
    this.areaArr = arr;
  },
  methods: {
    selectChange(value, selectedData) {
      console.log('zz--')
      this.searchCode = value[value.length - 1].code;
      this.getTree();
    },
    getTree() {
      this.axios
        .get(
          `${process.env.AGENTSV9}/proxy_stats/region_proxy_tree?region_id=${
            this.searchCode
          }`
        )
        .then(res => {
          this.treeData = res.data;
        });
    }
  }
};
</script>

