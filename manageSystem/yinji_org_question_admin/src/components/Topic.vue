<template>
  <div>
    <div>
        <div>
            <div>
                <div>上部：</div>
                <TopicBasicItem :content="grid.left"></TopicBasicItem>
            </div>
            <div>
                <div>下部：</div>
                <TopicBasicItem :content="grid.right"></TopicBasicItem>
            </div>
            <div>
                <Button>编辑</Button><Button @click="$emit('delete-grid')">删除</Button>
            </div>
        </div>
    </div>

    <div>
      <GridItem :gridId="grid.id" :gridText="grid.left" position="左边" v-on:upload="upload('left',$event)"></GridItem>
    <GridItem :gridId="grid.id" :gridText="grid.right" position="右边" v-on:upload="upload('right',$event)"></GridItem>
    </div>
  </div>
  <!-- <div>
    <MyUpload
      btnText="我的上传"
      :acceptType="0"
      :defaultFileList="myFileList"
      v-on:upload-success="uploadSuccess"
    ></MyUpload>
  </div>-->
</template>
<script>
import TopicBasicItem from './../components/TopicBasicItem'
import MyUpload from "./../components/Myupload";
import GridItem from "./GridItem";
export default {
  data() {
    return {
      vertical: "",
      myFileList: [],
      grid: {
        id: "1551858483212",
        left: "方格1左边_txt",
        right:
          "http://pnil6bhr3.bkt.clouddn.com/cover/game_material1551953651_pic"
      }
    };
  },
  mounted() {
    setTimeout(() => {
      this.myFileList = [
        "http://pnil6bhr3.bkt.clouddn.com/cover/game_material1551792689_pic"
      ];
    }, 500);
  },
  components: {
    MyUpload,
    TopicBasicItem,
    GridItem
  },
  methods: {
    //   handleSubmit(name) {
    //             this.$refs[name].validate((valid) => {
    //                 if (valid) {
    //                     this.$Message.success('Success!');
    //                 } else {
    //                     this.$Message.error('Fail!');
    //                 }
    //             })
    //         },
    uploadSuccess(response, file, fileList) {
      //this.myFileList.push(response.data);
      this.myFileList.splice(0, 1, response.data);
    },
    upload(type, p) {
      this.$set(this.gridData, type, p);
      this.editGrid({
          id:this.grid.id,
          data:this.gridData
      })
    },
  }
};
</script>
