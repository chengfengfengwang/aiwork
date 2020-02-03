<template>
  <div>
    <Alluser ref="allUser"/>
  </div>
</template>
<script>
import Alluser from "./../../components/AllUsers";
export default {
  components: {
    Alluser
  },
  mounted() {
    // console.log('--')
    // console.log(this.$refs.allUser.columns)
    // return
    this.$refs.allUser.columns.splice(0,1)
    this.$refs.allUser.columns.push({
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
                type: "info",
                size: "small"
              },
              style: {
                marginRight: "5px"
              },
              on: {
                click: () => {
                  this.$router.push("/userDetail");
                  localStorage.setItem("uid", "400368173");
                }
              }
            },
            "查看详情"
          )
        ]);
      }
    });
  }
};
</script>
