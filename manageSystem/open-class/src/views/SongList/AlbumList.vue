<template>
  <div>
    <div style="margin-bottom:5px">
      <!-- <span>筛选：</span>
      <DatePicker
        type="daterange"
        placement="bottom-end"
        placeholder="按日期筛选"
        style="width: 200px"
        @on-change="timeSelectChange"
      ></DatePicker>-->
      <Button type="primary" @click="createNew" style="margin-right:30px">新建</Button>
    </div>

    <Table
      :loading="tableLoading"
      ref="mytable"
      class="mytable"
      :columns="columns"
      :data="tableData"
    ></Table>
    <Modal v-model="modalShow" width="760">
      <p slot="header" style>
        <span>专辑</span>
      </p>
      <div>
        <Form ref="formValidate" :label-width="100">
          <FormItem label="分类">
            <Select v-model="formValue.list_type" style="width:200px">
              <Option v-for="item in typeList" :value="item.key" :key="item.key">{{ item.title }}</Option>
            </Select>
          </FormItem>
          <FormItem label="封面">
            <MyUpload
              btnText="上传封面"
              :acceptType="0"
              :defaultFile="formValue.cover"
              v-on:upload-success="coverUploadSuccess"
            />
          </FormItem> 
          <FormItem label="播放页背景">
            <MyUpload
              btnText="上传播放页背景"
              :acceptType="0"
              :defaultFile="formValue.h5_bg"
              v-on:upload-success="h5BgUploadSuccess"
            />
          </FormItem>
          <FormItem label="专辑名称">
            <Input v-model="formValue.title"></Input>
          </FormItem>
        </Form>
      </div>
      <div slot="footer">
        <Button @click="handleSubmit" type="primary">确定</Button>
        <Button @click="modalShow = false;">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import { getDate, tableColumnsFilter } from "./../../common/util.js";
import MyUpload from "./../../components/Upload/Upload";

export default {
  data() {
    return {
      classId: "",
      classData: [],
      tableLoading: true,
      columns: [
        {
          title: "专辑",
          key: "title"
        },
        {
          title: "封面",
          key: "cover",
          minWidth: 200,
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.cover
              },
              style: {
                width:'100px'
              }
            });
          }
        },
        {
          title: "播放背景图",
          key: "h5_bg",
          minWidth: 200,
          render: (h, params) => {
            return h("img", {
              attrs: {
                src: params.row.h5_bg
              },
              style: {
                width:'100px'
              }
            });
          }
        },
        {
          title: " ",
          key: "action",
          minWidth: 50,
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
                      this.$router.push({
                        path: "AudioList",
                        query: { albumId: params.row.id }
                      });
                    }
                  }
                },
                "查看歌单"
              ),
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
                      this.modalShow = true;
                      this.song_list_id = params.row.id;
                      this.formValue.title = params.row.title;
                      this.formValue.cover = params.row.cover;
                      this.formValue.h5_bg = params.row.h5_bg;
                      this.formValue.list_type = params.row.list_type;
                      //song_id  title  url

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
                    type: "info",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.song_list_id = params.row.id;
                      this.removeAudio();
                    }
                  }
                },
                "删除"
              )
              //   h(
              //     "Button",
              //     {
              //       props: {
              //         type: "error",
              //         size: "small"
              //       },
              //       on: {
              //         click: () => {
              //           this.delete(params.row);
              //         }
              //       }
              //     },
              //     "删除"
              //   )
            ]);
          }
        }
      ],
      modalShow: false,
      tableData: [],
      expressState: "",
      typeList: [],
      formValue: {}
    };
  },
  components: {
    MyUpload
  },
  created() {
    delete this.axios.defaults.headers.common["key"];
    delete this.axios.defaults.headers.common["uid"];
    delete this.axios.defaults.headers.common["token"];
    this.getAlbumList();
    this.getTypes();
    //this.getSongList();
  },
  mounted() {},
  
  methods: {
    coverUploadSuccess(response, idx, position, file, fileList) {
      this.formValue.cover = response.data;
    },
    h5BgUploadSuccess(response, idx, position, file, fileList) {
      this.formValue.h5_bg = response.data;
    },
    createNew() {
      this.formValue = {};
      this.modalShow = true;
      this.modalStatus='create'
    },
    removeAudio() {
      this.axios
        .get(
          `http://api.yinji.immusician.com/v1/song/delete/?song_list_id=${this.song_list_id}`
        )
        .then(res => {
          if (!res.error) {
            this.$Message.success("操作成功");
          }
          this.getAlbumList();
        });
    },
    createAlbum(){
      //console.log(this.formValue)
      //return
      this.axios
        .post(`http://api.yinji.immusician.com/v1/song/`,this.formValue)
        .then(res => {
          this.modalShow = false;
          this.getAlbumList()
        });
    },
    updateAlbum() {
      const param = {
        //song_list_id:this.albumId,
        song_list_id: this.song_list_id,
        title: this.formValue.title,
        cover: this.formValue.cover,
        h5_bg:this.formValue.h5_bg,
      };
      this.axios
        .post(
          `http://api.yinji.immusician.com/v1/song/update/`,
          param
        )
        .then(res => {
          this.modalShow = false;
          this.getAlbumList();
        });
    },
    handleSubmit() {
      if (this.modalStatus == "edit") {
        this.updateAlbum();
      } else {
        this.createAlbum();
      }
    },
    getTypes() {
      this.axios
        .get(`http://api.yinji.immusician.com/v1/song/list_type/`)
        .then(res => {
          this.typeList = res.data;
        });
    },
    getAlbumList() {
      this.tableLoading = true;
      this.axios.get(`http://api.yinji.immusician.com/v1/song/`).then(res => {
        //return
        this.tableLoading = false;
        console.log(res.data);
        this.tableData = res.data;
      });
    },
    getSongList() {
      this.axios
        .get(`http://api.yinji.immusician.com/v1/song/songs/?song_list_id=16`)
        .then(res => {
          //return
          // this.tableLoading = false;
          // console.log(res.data);
          // this.tableData = res.data;
        });
    }
  }
};
</script>
