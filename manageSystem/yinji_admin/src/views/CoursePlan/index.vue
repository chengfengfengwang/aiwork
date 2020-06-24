<template>
  <div>
    <!-- <RadioGroup v-model="searchForm.online">
        <Radio label="true">
                <span>是</span>
              </Radio>
              <Radio label="false">
                <span>否</span>
              </Radio>
    </RadioGroup> -->
    <span>是否上线：</span>
    <i-Switch v-model="searchForm.online" />
    <Button type="success" @click="getTableList" style="width:100px">搜索</Button>
    <Table :loading="tableLoading" border :columns="columns" :data="dataList"></Table>
    <div style="margin-top:10px">
      <Page
        @on-page-size-change="pageSizeChange"
        @on-change="pageChange"
        :total="total"
        :page-size="pageSize"
        show-sizer
        :page-size-opts="[5,10,15,20,30,40]"
        show-elevator
      />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableLoading: false,
      total: 0,
      page: 0,
      pageSize: 10,
      searchForm: {
        online: true
      },
      columns: [
        {
          title: "课程名称",
          key: "name"
        },
        {
          title: "封面",
          key: "cover",
          className: "cover_row",
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.cover_url
              },
              style: {
                //width: "100%"
              }
            });
          }
        },
        {
          title: " ",
          key: "action",
          minWidth: 50,
          width: 300,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      let courseId = encodeURIComponent(params.row.id);
                      //let courseId = 27;
                      let courseName = encodeURIComponent(params.row.name);
                      let instrumentType = encodeURIComponent(
                        params.row.instrument_type
                      );
                      location.href = `${location.origin}${
                        location.pathname
                      }?course_id=${courseId}&course_name=${courseName}&instrument_type=${instrumentType}#/CoursePlanLevelList`;
                      //this.$router.push({ path: '/CoursePlanLevelList', query: { course_id: '27' }})
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: this.editShow ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      localStorage.setItem("courseId", params.row.id);
                      this.$router.push("/goodsPackage");
                    }
                  }
                },
                "sku"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px",
                    display: this.editShow ? "inline-block" : "none"
                  },
                  on: {
                    click: () => {
                      var that = this;
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定要删除吗？",
                        onOk() {
                          that.remove(params.row.id);
                        }
                      });
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],

      dataList: [],
      modalShow: false,
      formValue: {}
    };
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    pageChange(page) {
      this.page = page - 1;
      this.getTableList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getTableList();
    },

    getTableList() {
      this.axios
        .get(
          `http://hot.test.immusician.com:55555/v1/courses?page=0&size=100&keyword=&instrument_type=piano&level=all&sort=_id,1&online=${
            this.searchForm.online
          }`
        )
        .then(res => {
          this.tableLoading = false;
          this.dataList = res.data;
        });
    }
  }
};
</script>


