<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="handleCreate" style="margin-right:30px">新建</Button>
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="gameList"></Table>
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>新增课程游戏素材</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="名称">
            <Input v-model="formValidate.name" placeholder="输入"></Input>
          </FormItem>
          <FormItem label="封面" prop="cover">
            <!-- <img v-show="modalCoverShow" style="max-width:400px" :src="formValidate.cover" alt> -->
            <MyUpload
              btnText="上传封面"
              :acceptType="0"
              :defaultFileList="cover"
              v-on:upload-success="coverSuccess"
            ></MyUpload>
          </FormItem>
          <FormItem label="游戏关卡">
            <div v-for="(round,index) in formValidate.data" :key="round.mini_game_id">
              <div>第{{index + 1}}关： <span style="margin-left:10px" @click="removeGame(index)">清空</span><span style="margin-left:10px" @click="deleteItem(index)">删除此关</span></div>
              <div v-for="game in round.game_data" :key="game.id">{{game.name}}{{game.sign?'--' + game.sign:''}}</div>
              <div @click="modalAObj[index]=true" style="color:blue">配置</div>
              <AllGameMaterial :allGameDataTotal="allGameDataTotal" :allGameData="allGameData" v-bind:selected.sync="round.game_data" ref="AllGameMaterial" v-model="modalAObj[index]"></AllGameMaterial>
            </div>
            <Button @click="addNewRound" type="info" style="margin-top:20px;width:400px">添加关卡</Button>
          </FormItem>
          <FormItem label="引导音频">
            <MyUpload
              btnText="上传引导音频"
              :acceptType="1"
              :defaultFileList="audio"
              v-on:upload-success="audioSuccess"
            ></MyUpload>
            <span class="my_delete" @click="deleteAudio">删除</span>
          </FormItem>
          <FormItem label="热度">
            <Input v-model.number="formValidate.order" placeholder="输入展示顺序"></Input>
          </FormItem>
          <FormItem label="类型">
            <Select style="width:300px" v-model="formValidate.show_type" placeholder>
                <Option :value="0">类型1</Option>
                <Option :value="1">类型2</Option>
                <Option :value="2">类型3</Option>
              </Select>
          </FormItem>
          <FormItem label="是否上线" prop="online">
            <RadioGroup v-model="formValidate.online">
              <Radio label="true">上线</Radio>
              <Radio label="false">不上线</Radio>
            </RadioGroup>
          </FormItem>
        </Form>
      </div>
      <div style="margin-top:100px"></div>
      <div slot="footer">
        <Button @click="handleSubmit('formValidate')" type="primary">确定</Button>
        <Button @click="modalShow = false;">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import AllGameMaterial from '../../components/AllGameMaterial'
import MyUpload from "./../../components/Myupload";
export default {
  data() {
    return {
      allGameData:[],
      allGameDataTotal:'',
      modalAObj:{},
      modalAShow:false,
      tableLoading: true,
      formValidate: {
        data:[]
      },
      modalShow: false,
      courseList: [],
      gameList: [],
      modalStatus: "",
      modalCoverShow: "",
      roundArr: [],
      cover: [],
      columns: [
        {
          title: "游戏名称",
          key: "name"   
        },
        {
          title: "mini_game_id",
          key: "mini_game_id" 
        },
        {
          title: "展示顺序",
          key: "order"
        }, 
         {
          title: "引导音频",
          key: "guide_audio"
        },
        {
          title: "引导视频",
          key: "guide_video"
        },
        {
          title: "是否上线",
          key: "online"
        },
        {
          title: "封面",
          key: "cover",
          maxWidth: 260,
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.cover
              },
              style: {
                width: "100%"
              }
            });
          }
        },
        {
          title: " ",
          key: "action",
          width: 150,
          align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "primary",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modalShow = true;
                      //this.$refs.formValidate.resetFields();
                      this.modalCoverShow = true;
                      this.formValidate = this.formateRow(params.row);
                      this.modalStatus = "edit";
                    }
                  }
                },
                "编辑"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      var that = this;
                      this.$Modal.confirm({
                        title: "警告",
                        content: "确定要删除吗？",
                        onOk() {
                          that.remove(params.row);
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
      audio: [],
      video: [],
    };
  },
  components: {
    MyUpload,
    AllGameMaterial
  },
  mounted() {
    this.getGameList();
    this.getGameBankList();
  },
  methods: {
    deleteAudio(){
      this.audio.splice(0, 1, '');
      this.$Message.success('删除成功')
    },
    deleteVideo(){
      this.video.splice(0, 1, '');
      this.$Message.success('删除成功')
    },
    audioSuccess(response, file, fileList) {
      this.audio.splice(0, 1, response.data);
    },
    videoSuccess(response, file, fileList) {
      this.video.splice(0, 1, response.data);
      this.$Message.success('上传成功')
    },
    removeGame(index,game){
      this.formValidate.data[index].game_data  = []
    },
    deleteItem(index){
      this.formValidate.data.splice(index,1)
    },
    addNewRound(){
     var arr =  this.formValidate.data;
     arr.push({});
      this.formValidate = Object.assign({},this.formValidate,arr)
    },
    coverSuccess(response, file, fileList) {
      this.cover.splice(0, 1, response.data);
    },
    selectChange(value) {
      //console.log(this.$refs.select0[0].values)
      var resultArr = [];
      this.roundArr.forEach((e, index) => {
        var key = "select" + index;
        var values = this.$refs[key][0].values;
        //console.log(values)
        resultArr.push(values.map(e => e.value));
        //resultArr.push(values.map(e => {name:'wang'}));
      });
      this.roundArr = resultArr
    },
    getGameBankList() {
      this.axios
        .get(process.env.JINKANG + "/"+process.env.VERSION+"/ranking/get_all_game/")
        .then(res => {
          this.allGameData = res.data;
          this.allGameDataTotal = res.total
        });
    },
    handleSubmit() {
      var newForm = this.formatForm();
      console.log(newForm);
      //return;
      this.axios
        .post(process.env.JINKANG + "/"+process.env.VERSION+"/mini/games_create/", newForm)
        .then(res => {
          //this.$Message.success("创建成功啦!");
          this.modalShow = false;
          //this.file = "";
          this.getGameList();
        });

      return;
    },
    formateRow(row) {
      var newRow = JSON.parse(JSON.stringify(row));
      newRow.online = newRow.online ? "true" : "false";
      var arr = [];
      arr.push(newRow.cover);
      this.cover = arr;
      this.roundArr = [];

      var arr1 = [];
      var arr2 = [];
      arr1.push(newRow.guide_audio);
      this.audio = arr1;
      arr2.push(newRow.guide_video);
      this.video = arr2;
      // newRow.data.forEach((e, i) => {
      //   this.roundArr.push(e.game_data.map(e => e.game_id));
      // });
      return newRow;
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));

      if (this.modalStatus == "create") {
        ["material_id"].forEach(e => {
          delete newForm[e];
        });
      } else {
        ["data", "_index", "_rowKey"].forEach(e => {
          delete newForm[e];
        });
      }
      newForm.guide_audio = this.audio[0];
      newForm.guide_video = this.video[0];
      newForm.cover = this.cover[0];
      var tempArr = this.roundArr.map(e=>e.join());
      var tempArr1 = tempArr.map(e=>{return {ids:e}});
      var myArr = [];
      this.formValidate.data.map(e=>{
        var myArr1 = [];
        e.game_data.forEach(el=>{
          myArr1.push(el.game_id)
        })
        myArr.push({ids:myArr1.join()})
      })
      //console.log(tempArr1)
      //round: "[{"ids":"5c778b619a5f77119e8c7f35,5c7895a99a5f7722b10eddd6"},{"ids":"5c7f21e91f795f0321327e65,5c80
      newForm.round = JSON.stringify(myArr);
      newForm.online = newForm.online == "true" ? "1" : "0";
      return newForm;
    },
    handleCreate() {
      this.modalShow = true;
      this.modalStatus = "create";
      this.modalCoverShow = false;
      this.formValidate={data:[]};
      this.roundArr = [];
      this.cover=[];
      this.$refs.formValidate.resetFields();
    },
    handleUpload(file) {
      this.modalCoverShow = true;
      this.file = file;
      this.$set(this.formValidate, "cover", window.URL.createObjectURL(file));
      return false;
    },
    exceededHandle() {
      this.$Message.error("封面最大不能超过1M，请将图片进行压缩优化");
    },
    getGameList() {
      this.tableLoading = true;
      this.axios
        .get(process.env.JINKANG + "/"+process.env.VERSION+"/mini/get_many_games/")
        .then(res => {
          this.tableLoading = false;
          this.gameList = res.data;
        });
    },
    createCourseGame() {
      var params = {};
      this.axios
        .post(process.env.JINKANG + "/"+process.env.VERSION+"/game/create_material/")
        .then(res => {
          //this.tableLoading = false;
          //this.gameList = res.data;
        });
    },
    remove(row) {
      this.axios
        .get(
          process.env.JINKANG +
            "/"+process.env.VERSION+"/mini/delete_games/?mini_game_id=" +
            row.mini_game_id
        )
        .then(res => {
          this.getGameList();
        });
    }
  },
  watch:{
    formValidate(){
      var obj = {};
      this.formValidate.data.forEach((e,index)=>{
        //this.$set(this.modalAObj,index,false)
        obj[index] = false
      });
      this.modalAObj = obj
    }
  }
};
</script>

