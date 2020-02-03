<template>
  <div>
    <Tree @on-select-change="handleClickTree" :data="treeData"></Tree>
  </div>
</template>
<script>
export default {
  data() {
    return {
      orgId: localStorage.getItem("curOrgId"),
      agentId: localStorage.getItem("curAgentId"),
      treeData: [],
      fromStatus: ""
    };
  },
  created() {
    this.fromStatus = localStorage.getItem("AGENTSV9Status");
  },
  mounted() {
    this.getTree();
  },
  methods: {
    getTree() {
      switch (this.fromStatus) {
        case "fromOrg":
          this.axios
            .get(
              `${
                process.env.AGENTSV9
              }/proxy_stats/institution_proxy_tree?institution_id=${this.orgId}`
            )
            .then(res => {
              this.treeData = res.data;
            });
          break;
        case "fromAgent":
          this.axios
            .get(
              `${
                process.env.AGENTSV9
              }/proxy_stats/proxy_tree?proxy_id=${this.agentId}`
            )
            .then(res => {
              this.treeData = res.data;
            });
          break;
      }
    },
    handleClickTree(e){
      console.log(e)
    }
  }
};
</script>

