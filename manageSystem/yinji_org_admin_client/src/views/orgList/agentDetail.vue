<template>
  <div>
    <h1>代理人</h1>
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <h1>代理机构</h1>
    <Table :loading="tableLoading" border :columns="orgColumns" :data="orgList"></Table>
  </div>
</template>
<script>
import { getDate } from "./../../common/util.js";
export default {
  data() {
    return {
      tableLoading: true,
      modalShow: false,
      dataList: [],
      columns: [
        {
          title: "名字",
          key: "username"
        },
        {
          title: "手机号",
          key: "phone"
        },
        {
          title: "等级",
          key: "level"
        },
        {
          title: "学生数量",
          key: "student_count"
        },
        {
          title: "代理机构",
          key: "institutions_ids",
          render: (h, params) => {
            //return h("div", params.row.institutions_ids.map(e => `${e.institution_name}:${e.student_count}`).join("/"));
            return h(
              "div",
              params.row.institutions_ids
                .map(e => `${e.institution_name}`)
                .join("/")
            );
          }
        },
        {
          title: "地区",
          key: "whole_area",
          render: (h, params) => {
            return h("div", params.row.whole_area.map(e => e.name).join("/"));
          }
        },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          //width: 130,
          //maxWidth: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem("curAgentId", params.row.user_id);
                      localStorage.setItem("agentTreeStatus", "fromAgent");
                      this.$router.push("agentTree");
                    }
                  }
                },
                "查看代理"
              )
            ]);
          }
        }
      ],
      orgList: [],
      orgColumns: [
        // {
        //   title: "机构id",
        //   key: "id"
        // },
        {
          title: "账号名称",
          key: "phone"
        },
        {
          title: "机构名称",
          key: "institutions_name"
        },
        {
          title: "course_open",
          key: "course_open"
        },
        {
          title: "student_count",
          key: "student_count"
        },
        {
          title: "生效时间",
          key: "experience_int",
          render: (h, params) => {
            const startTime = params.row.start_time
              ? getDate(params.row.start_time)
              : "";
            return h("div", startTime);
          }
        },
        {
          title: "结束时间",
          key: "experience_int",
          render: (h, params) => {
            const endTime = params.row.start_time
              ? getDate(params.row.end_time)
              : "";
            return h("div", endTime);
          }
        }
      ]
    };
  },
  mounted() {
    this.agentId = localStorage.getItem("curAgentId");
    this.getAgents();
    this.getOrgs();
  },
  methods: {
    getOrgs() {
      this.tableLoading = true;
      this.axios
        .get(
          `${process.env.AGENTSV9}/proxy/institutions?proxy_id=${this.agentId}`
        )
        .then(res => {
          this.tableLoading = false;
          this.orgList = res.data;
        });
    },
    getAgents() {
      this.tableLoading = true;
      this.axios
        .get(
          `${process.env.AGENTSV9}/proxy/all?lower_proxy_id=${
            this.agentId
          }&page=0&size=999`
        )
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data.data;
          this.total = res.total;
        });
    },
    getData() {}
  }
};
</script>

