<template>
  <div>
    <div style="margin-bottom:5px">
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
          <FormItem label="音频">
            <MyUpload
              btnText="上传音频"
              :acceptType="1"
              :defaultFile="formValue.url"
              v-on:upload-success="audioUploadSuccess"
            />
          </FormItem>
          <FormItem label="歌曲名称">
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
      albumId: "",
      classData: [],
      tableLoading: true,
      columns: [
        {
          title: "歌曲",
          key: "title"
        },
        // {
        //   title: "顺序",
        //   key: "sort"
        // },
        {
          title: "音频",
          key: "url",
          minWidth: 200,
          render: (h, params) => {
            return h("audio", {
              attrs: {
                controls: "controls",
                src: params.row.url
              },
              style: {}
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
                    type: "success",
                    size: "small"
                  },
                  style: {
                    marginRight: "5px"
                  },
                  on: {
                    click: () => {
                      this.modalShow = true;
                      this.song_id = params.row.id;
                      this.formValue.title = params.row.title;
                      this.formValue.url = params.row.url;
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
                      this.song_id = params.row.id;
                      this.removeAudio();
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ],
      modalShow: false,
      tableData: [],
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
    this.albumId = this.$route.query.albumId;
    this.getSongList();
  },
  mounted() {},
  methods: {
    audioUploadSuccess(response, idx, position, file, fileList) {
      this.formValue.url = response.data;
    },
    createNew() {
      this.formValue = {};
      this.modalShow = true;
      this.modalStatus = "create";
    },
    removeAudio() {
      this.axios
        .get(
          `http://api.yinji.immusician.com/v1/song/songs/delete/?song_list_id=${
            this.albumId
          }&song_id=${this.song_id}`
        )
        .then(res => {
          if (!res.error) {
            this.$Message.success("操作成功");
          }
          this.getSongList();
        });
    },
    createAudio() {
      this.formValue.song_list_id = this.albumId;
      this.axios
        .post(
          `http://api.yinji.immusician.com/v1/song/songs/add/`,
          this.formValue
        )
        .then(res => {
          this.modalShow = false;
          this.getSongList();
        });
    },
    updateAudio() {
      const param = {
        //song_list_id:this.albumId,
        song_id: this.song_id,
        title: this.formValue.title,
        url: this.formValue.url
      };
      this.axios
        .post(
          `http://api.yinji.immusician.com/v1/song/songs/update/`,
          param
        )
        .then(res => {
          this.modalShow = false;
          this.getSongList();
        });
    },
    handleSubmit() {
      if (this.modalStatus == "edit") {
        this.updateAudio();
      } else {
        this.createAudio();
      }
    },
    getTypes() {
      this.axios
        .get(`http://api.yinji.immusician.com/v1/song/list_type/`)
        .then(res => {
          //return
          // this.tableLoading = false;
          // console.log(res.data);
          // this.tableData = res.data;
        });
    },
    getSongList() {
      this.axios
        .get(
          `http://api.yinji.immusician.com/v1/song/songs/?song_list_id=${
            this.albumId
          }`
        )
        .then(res => {
          this.tableLoading = false;
          this.tableData = res.data;
        });
    }
  }
};
</script>
