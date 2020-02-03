<template>
  <div>
    <Table :loading="tableLoading" border :columns="myColumns" :data="dataList"></Table>
  </div>
</template>
<script>
export default {
  props: {
    columns: {
      type: Array,
      default: function() {
        return [];
      }
    },
    dataList: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      tableLoading: false,
      myColumns: this.columns
    };
  },
  created() {
    // console.log(this.columns)
    // let copyArr = JSON.parse(JSON.stringify(this.columns));
    // console.log(copyArr)
    this.columns.forEach(e => {
      if (e.type === "img") {
        e.render = (h, params) => {
          return h("img", {
            attrs: {
              src: params.row[e.key]
            },
            style: {
              width: "150px"
            }
          });
        };
      } else if (e.type === "video") {
        e.render = (h, params) => {
          return h("video", {
            attrs: {
              src: params.row[e.key],
              controls: true
            },
            style: {
              width: "150px",
              display: params.row[e.key] ? "block" : "none"
            }
          });
        };
      }
      // else if (e.type === "action") {
      //   const haveEdit = this.columns.some((item, index, array) => {
      //     return item.edit;
      //   });
      //   const haveRemove = this.columns.some((item, index, array) => {
      //     return item.remove;
      //   });
      //   console.log(e)
      //   e.render = (h, params) => {
      //     return h("div", [
      //       haveEdit
      //         ? h(
      //             "Button",
      //             {
      //               props: {
      //                 type: "primary",
      //                 size: "small"
      //               },
      //               style: {
      //                 marginRight: "5px"
      //               },
      //               on: {
      //                 click: e.editCallback
      //               }
      //             },
      //             "编辑"
      //           )
      //         : "",
      //       haveRemove
      //         ? h(
      //             "Button",
      //             {
      //               props: {
      //                 type: "error",
      //                 size: "small"
      //               },
      //               on: {
      //                 click: () => {
      //                   var that = this;
      //                   this.$Modal.confirm({
      //                     title: "警告",
      //                     content: "确定要删除吗？",
      //                     onOk() {
      //                       that.remove(params.row);
      //                     }
      //                   });
      //                 }
      //               }
      //             },
      //             "删除"
      //           )
      //         : ""
      //     ]);
      //   };
      // }
    });
    //this.myColumns = copyArr;
    this.columns = this.myColumns
  },
  watch: {
    // columns: {
    //   handler(newV) {
    //     console.log('---zz')
    //     this.myColumns = newV;
    //   },
    //   deep:true
    // },
  }
};
</script>
