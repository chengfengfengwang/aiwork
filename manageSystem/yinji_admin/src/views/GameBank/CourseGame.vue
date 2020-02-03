<template>
  <div>
    <div class="table_top_tool">
      <Button type="primary" @click="handleCreate" style="margin-right:30px">新建</Button>
      <span style="margin-left:5px">按课程名称筛选：</span>
      <Input style="width:200px" @input="keywordChange" v-model="lessonName" placeholder="输入课程名称如：国院第二课"/>
      <span style="margin-left:5px">按id筛选：</span>
      <Input style="width:200px" @input="keywordChange" v-model="lessonId" placeholder="按id筛选"/>
    </div>
    <Table :loading="tableLoading" border :columns="columns" :data="courseList"></Table>
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
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>新增课程游戏素材</span>
      </p>
      <div>
        <Form ref="formValidate" :model="formValidate" :label-width="100">
          <FormItem label="名称">
            <Input v-model="formValidate.name" placeholder="输入"></Input>
          </FormItem>
          <FormItem label="游戏列表">
            <Button type="error" @click="formValidate.data=[]">清空</Button>
            <div
              v-for="game in formValidate.data"
              :key="game.id"
            >{{game.name}}{{game.sign?'--' + game.sign:''}}</div>
            <div @click="modalAShow=true" style="color:blue">配置</div>
            <AllGameMaterial
              :allGameDataTotal="allGameDataTotal"
              :allGameData="allGameData"
              v-bind:selected.sync="formValidate.data"
              ref="AllGameMaterial"
              v-model="modalAShow"
            ></AllGameMaterial>
          </FormItem>
          <FormItem label="视唱列表名字">
            <Input v-model="formValidate.sing_name" placeholder="输入视唱列表名字"></Input>
          </FormItem>
          <FormItem label="视唱列表所属">
            <Input v-model="formValidate.sing_belong" placeholder="输入视唱列表所属"></Input>
          </FormItem>
          <FormItem label="通过率">
            <Input v-model.number="formValidate.rate" placeholder="输入通过率"></Input>
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
          <FormItem label="是否是视唱">
            <Select v-model="isShichang" placeholder="是否是视唱">
              <Option :value="0">否</Option>
              <Option :value="1">是</Option>
            </Select>
          </FormItem>
          <FormItem label="引导视频">
            <MyUpload
              btnText="上传引导视频"
              :acceptType="-1"
              :defaultFileList="video"
              v-on:upload-success="videoSuccess"
            ></MyUpload>
            <span class="my_delete" @click="deleteVideo">删除</span>
          </FormItem>
          <FormItem label="展示位置">
            <Select v-model="formValidate.is_homework" placeholder="选择展示位置">
              <Option :value="0">课堂演示</Option>
              <Option :value="1">课后练习</Option>
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
import AllGameMaterial from "../../components/AllGameMaterial";
import MyUpload from "./../../components/Myupload";
export default {
  props:{
    from:{
      default:function(){
        return 'self'
      }
    }
  },
  data() {
    return {
      modalAShow: false,
      tableLoading: true,
      formValidate: {
        ids: []
      },
      modalShow: false,
      courseList: [],
      modalStatus: "",
      columns: [
        {
          title: "课程名称",
          key: "name"
        },
        {
          title: "是否上线",
          key: "online"
        },
        {
          title: "游戏素材",
          key: "data",
          //width: 150,
          //align: "center",
          render: (h, params) => {
            return h("div", [
              h(
                "div",
                {
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      console.log(params)
                      // this.modalShow = true;
                      // this.formValidate = this.formateRow(params.row);
                      // this.modalStatus = "edit";
                    }
                  }
                },
                //'qwe'
                params.row.data.map((e)=>{return `${e.name}--${e.sign}\n`})
              ),
            ]);
          }
        },
        // {
        //   title: "合格限制",
        //   key: "rate"
        // },
        {
          title: "material_id",
          key: "material_id"
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
      page: 0,
      pageSize: 10,
      total: 0,
      allGameData: [],
      allGameDataTotal: 0,
      audio: [],
      video: [],
      lessonName:'',
      lessonId:'',
      isShichang:0
    };
  },
  components: {
    AllGameMaterial,
    MyUpload
  },
  mounted() {
    this.getCourseList();
    this.getGameBankList();
  },
  methods: {
    keywordChange() {
      this.page = 0;
      this.getCourseList();
    },
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
    removeGame(index, game) {
      this.formValidate.data[index].game_data = [];
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getCourseList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getCourseList();
    },
    getGameBankList() {
      this.axios
        .get(`${process.env.JINKANG}/${process.env.VERSION}/ranking/get_all_game/`)
        .then(res => {
          this.allGameData = res.data;
          this.allGameDataTotal = res.total;
        });
    },
    handleSubmit() {
      var newForm = this.formatForm();
      if(this.from==='test'){
        newForm.is_test = 1
      }
      console.log(newForm);
      this.axios
        .post(process.env.JINKANG + "/"+process.env.VERSION+"/game/create_material/", newForm)
        .then(res => {
          //this.$Message.success("创建成功啦!");
          this.isShichang = 0;
          this.modalShow = false;
          //this.file = "";
          this.getCourseList();
        });

      return;
    },
    formateRow(row) {
      var newRow = JSON.parse(JSON.stringify(row));
      newRow.online = newRow.online ? "true" : "false";
      var arr = [];
      var arr1 = [];
      arr.push(newRow.guide_audio);
      this.audio = arr;
      arr1.push(newRow.guide_video);
      this.video = arr1;
      newRow.ids = row.data.map(e => {
        return e.game_id;
      });
      return newRow;
    },
    formatForm() {
      var newForm = JSON.parse(JSON.stringify(this.formValidate));

      if (this.modalStatus == "create") {
        ["material_id"].forEach(e => {
          delete newForm[e];
        });
      } else {
        ["_index", "_rowKey"].forEach(e => {
          delete newForm[e];
        });
      }
      //newForm.ids = newForm.ids.join();
      newForm.ids = newForm.data
        .map(e => {
          return e.game_id;
        })
        .join();
      newForm.guide_audio = this.audio[0];
      if(this.isShichang){
        newForm.guide_video = 'http://cdn.kids.immusician.com/app/resource/shichang_guide_video.mp4';
      }else{
        newForm.guide_video = this.video[0];
      }
      newForm.online = newForm.online == "true" ? "1" : "0";
      return newForm;
    },
    handleCreate() {
      this.modalShow = true;
      this.modalStatus = "create";
      this.$refs.formValidate.resetFields();
      this.formValidate = {};
    },
    getCourseList() {
      this.axios
        .get(
          `${process.env.JINKANG}/${process.env.VERSION}/game_many_material/?page=${
            this.page
          }&size=${this.pageSize}&name=${this.lessonName}&material_id=${this.lessonId}&is_test=${this.from==='test'?1:0}`
        )
        .then(res => {
          this.tableLoading = false;
          this.courseList = res.data;
          this.total = res.total;
        });
    },
    createCourseGame() {
      var params = {};
      if(this.from==='test'){
        params.is_test = 1
      }
      this.axios
        .post(process.env.JINKANG + "/"+process.env.VERSION+"/game/create_material/",params)
        .then(res => {
          //this.tableLoading = false;
          //this.gameList = res.data;
        });
    },
    remove(row) {
      this.axios
        .get(
          process.env.JINKANG +
            "/"+process.env.VERSION+"/game/delete_material/?material_id=" +
            row.material_id
        )
        .then(res => {
          this.getCourseList();
        });
    }
  }
};
</script>

