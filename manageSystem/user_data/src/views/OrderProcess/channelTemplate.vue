<template>
  <div @click="popVisible = false">
    <div class="table_top_tool">
      <Button type="primary" @click="createNewBank" style="margin-right:30px">新建渠道模版</Button>
    </div>
    <Modal v-model="modalShow" width="1060" :mask-closable="false">
      <p slot="header" style>
        <span>模版对照</span>
      </p>
      <div>
        <h1>选择渠道</h1>
        <span>渠道：</span>
        <Select style="width: 160px" v-model="searchChannel" placeholder>
          <Option v-for="option in channelList" :key="option.id" :value="option.id">{{option.name}}</Option>
        </Select>
      </div>
      <div>
        <h1>录入上传对照表</h1>
        <p>请选择原始表单中信息所在列的字母编号（例如：A、B），填入下面对应位置，如果没有找到对应信息，请输入-3,代表该列数据为空</p>
        <table>
          <tr>
            <th v-for="(item,index) in fileds" :key="index">{{item.name}}</th>
            <th>操作</th>
          </tr>
          <tr>
            <td v-for="(item,index) in uploadSourceData" :key="index">
              <div @click.stop="editUpload=true">
                <!-- <span>{{getTagName(item)}}</span> -->
                <span v-if="!editUpload">{{item}}</span>
                <Input  v-else placeholder v-model="uploadSourceData[index]" type="text"></Input>
              </div>
            </td>

            <td>
              <Button @click="editUpload=!editUpload" type="info">编辑</Button>
            </td>
          </tr>
        </table>
      </div>
      <div>
        <h1>录入返回对照表</h1>
        <p>请选取原始表单中信息，将信息所在列的字母编号，填入对应位置，-1代表快递公司，-2代表快递单号</p>
        <table>
          <tr>
            <th v-for="(item,index) in downloadTableHeaders" :key="index">
              <div v-show="editTable" class="icons">
                <Icon class="addi" @click="addColumn(index,'download')" type="ios-add"/>
                <Icon class="removei" @click="removeColumn(index,'download')" type="ios-close"/>
              </div>
              {{item}}
            </th>
            <th>操作</th>
          </tr>
          <tr>
            <td v-for="(item,index) in downloadSourceData" :key="index">
              <!-- <div @click.stop="editTd(item, index,'download',$event)"> -->
              <div>
                <!-- <span>{{getTagName(item)}}</span> -->
                <!-- <span v-if="!editUpload">{{item}}</span>
                <Input v-else v-model="uploadSourceData[index]"></Input>-->
                <Input v-model="downloadSourceData[index]"></Input>
                <!-- <span>{{item}}</span> -->
              </div>
            </td>

            <td>
              <Button @click="editTable=!editTable" type="info">新增/删除列</Button>
            </td>
          </tr>
        </table>
        <div style="margin:15px 0">
          <Button type="success" @click="handleSubmit">提交</Button>
        </div>
      </div>
      <div>
        <h1>上传渠道模版示例</h1>
        <div>
          <span>文件：</span>
          <Upload
            style="display:inline-block;vertical-align:center"
            :before-upload="handleUpload"
            action="//jsonplaceholder.typicode.com/posts/"
          >
            <Button icon="ios-cloud-upload-outline">选择文件</Button>
          </Upload>
          <div>
            <p>{{ file?file.name:'' }}</p>
            <Button
              type="success"
              @click="uploadChannelFile"
              :loading="loadingStatus"
            >{{ loadingStatus ? 'Uploading' : '上传' }}</Button>
          </div>
        </div>
        <div
          v-show="popVisible"
          class="popcontent"
          v-bind:style="{ top: popTop+10+'px', left: popLeft+10+'px' }"
        >
          <Icon class="close_icon" type="ios-close"/>
          <div
            @click.stop="choseTag(tag)"
            v-for="(tag,index) in fileds"
            class="tag"
            :key="index"
          >{{tag.name}}</div>
        </div>
      </div>
      <div slot="footer">
        <Button @click="modalShow=false">完成</Button>
      </div>
    </Modal>

    <Table :loading="tableLoading" border :columns="columns" :data="templates"></Table>
  </div>
</template>
<script>
const excelHeaders = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];
import { mapState } from "vuex";
const find = require("lodash.find");
export default {
  data() {
    return {
      editUpload: false,
      modalShow: false,
      excelHeaders,
      uploadSourceData: [""],
      downloadSourceData: [""],
      editTable: false,
      popVisible: false,
      tags: [
        {
          name: "商品名称",
          value: 1
        },
        {
          name: "付款金额",
          value: 2
        },
        {
          name: "收货人",
          value: 3
        },
        {
          name: "name1",
          value: 4
        },
        {
          name: "name2",
          value: 5
        },
        {
          name: "订单号",
          value: 6
        }
      ],
      popTop: 0,
      popLeft: 0,
      msg: "hello world",
      channelList: [],
      searchChannel: "",
      templates: [],
      columns: [
        {
          title: "id",
          key: "id",
          render: (h, params) => {
            return h("div", this.getChannelName(params.row.channel_id));
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
                      this.modalShow = true;
                      this.modalStatus = "edit";
                      const row = JSON.parse(JSON.stringify(params.row));
                      this.uploadSourceData = this.acceptHeader(row.in_indexs);
                      this.downloadSourceData = this.acceptHeader(row.out_indexs);
                      
                      //this.uploadSubmitHeader = row.in_indexs;
                      //this.downloadSubmitHeader = row.out_indexs;

                      this.searchChannel = row.channel_id;
                      //this.isUploadTemplate = row.channel_id;
                      //this.downloadSourceData = row.out_indexs;
                    }
                  }
                },
                "查看"
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
              //           var that = this;
              //           this.$Modal.confirm({
              //             title: "警告",
              //             content: "确定要删除吗？",
              //             onOk() {
              //               that.remove(params.row.id);
              //             }
              //           });
              //         }
              //       }
              //     },
              //     "删除"
              //   )
            ]);
          }
        }
      ],
      tableLoading: true,
      fileds: [],
      file: null,
      loadingStatus: false,
      isUploadTemplate:false
    };
  },
  computed: {
    uploadTableHeaders() {
      return this.excelHeaders.slice(0, this.uploadSourceData.length);
    },
    downloadTableHeaders() {
      return this.excelHeaders.slice(0, this.downloadSourceData.length);
    },
    // uploadSubmitHeader: {
    //   get: function() {
    //     let newArr = [];
    //     this.uploadSourceData.forEach((e, i) => {
    //       if (e !== "" && e !== null) {
    //         newArr[i] = excelHeaders.indexOf(e);
    //       }
    //     });
    //     return newArr;
    //   },
    //   set: function(newValue) {
    //     newValue.forEach((e, i) => {
    //       if (e != -3) {
    //         this.uploadSourceData[i] = excelHeaders[e];
    //       }
    //     });
    //   }
    // },
    downloadSubmitHeader: {
      get: function() {
        let newArr = [];
        this.downloadSourceData.forEach((e, i) => {
          if (e !== "" && e !== null) {
            newArr[i] = excelHeaders.indexOf(e);
          }
        });
        return newArr;
      },
      set: function(newValue) {
        newValue.forEach((e, i) => {
          if (e != -1 || e != -2) {
            this.downloadSourceData[i] = excelHeaders[e];
          } else {
            this.downloadSourceData[i] = e;
          }
        });
      }
    }
  },
  mounted() {
    this.getTableList();
    this.getItems();
    this.getChannels();
  },
  components: {},
  methods: {
    submitHeader(arr) {
      let newArr = [];
      arr.forEach((e, i) => {
        if(e==-1||e==-2||e==-3){
          newArr[i] = Number(e);
        }else if (e !== "" && e !== null) {
          newArr[i] = excelHeaders.indexOf(e);
        }
      });
      return newArr;
    },
    acceptHeader(arr){
      let newArr = [];
      arr.forEach((e, i) => {
        if(e==-1||e==-2||e==-3){
          newArr[i] = Number(e);
        }else if (e !== "" && e !== null) {
          newArr[i] = excelHeaders[e];
        }
      });
      return newArr;
    },
    submitDownloadHeader(arr) {
      let newArr = [];
      arr.forEach((e, i) => {
        if(e==-3){
          newArr[i] = -3;
        }else if (e !== "" && e !== null) {
          newArr[i] = excelHeaders.indexOf(e);
        }
      });
      return newArr;
    },
    handleUpload(file) {
      this.file = file;
      return false;
    },
    uploadChannelFile() {
      this.loadingStatus = true;
      const formObj = {
        file: this.file,
        channel_id: this.searchChannel
      };
      var formdata = new FormData();
      for (let key in formObj) {
        formdata.append(key, formObj[key]);
      }
      this.axios
        .post(`${process.env.WULIU}/model/titles/upload`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.file = null;
          this.loadingStatus = false;
          this.$Message.success("Success");
          // this.modalShow = false;
          // this.getTableList();
        });
    },
    handleSubmit() {
      let formObj = {};
      formObj.in_indexs = this.submitHeader(this.uploadSourceData).join();
      formObj.out_indexs = this.submitHeader(this.downloadSourceData).join();
      formObj.channel_id = this.searchChannel;
      if (this.modalStatus == "create") {
        this.createTemplate(formObj);
      } else {
        this.updateTemplate(formObj);
      }
    },
    createTemplate(formObj) {
      //return
      this.axios
        .post(`${process.env.WULIU}/model/channel/create`, formObj)
        .then(res => {
          //this.modalShow = false;
          this.getTableList();
        });
    },
    updateTemplate(formObj) {
      // console.log(formObj)
      // return
      this.axios
        .post(`${process.env.WULIU}/model/channel/update`, formObj)
        .then(res => {
          //this.modalShow = false;
          this.getTableList();
        });
    },
    createNewBank() {
      this.downloadSourceData = [""];
      this.uploadSourceData = new Array(this.fileds.length);
      this.searchChannel = "";
      this.modalShow = true;
      this.modalStatus = "create";
    },
    getChannels() {
      this.axios
        .get(`${process.env.WULIU}/channel/index?page=0&size=999&status=1`)
        .then(res => {
          this.channelList = res.data.list;
        });
    },
    getItems() {
      this.axios.get(`${process.env.WULIU}/model/channel/fields`).then(res => {
        this.fileds = res.data.fileds;
        this.uploadSourceData = new Array(this.fileds.length);
      });
    },
    getTableList() {
      this.axios
        .get(`${process.env.WULIU}/model/channel/index?page=0&size=999`)
        .then(res => {
          this.tableLoading = false;
          this.templates = res.data.list;
        });
    },
    getChannelName(id) {
      if (id) {
        const item = find(this.channelList, ["id", id]);
        return item ? item.name : "";
      } else {
        return "";
      }
    },
    choseTag(tag) {
      this.popVisible = false;
      if (this.curPosition === "upload") {
        this.uploadSourceData.splice(this.curIndex, 1, tag.value);
      } else {
        this.downloadSourceData.splice(this.curIndex, 1, tag.value);
      }
    },
    editTd(name, index, position, event) {
      this.curPosition = position;
      this.curIndex = index;
      this.popVisible = true;
      this.popLeft = event.clientX;
      this.popTop = event.clientY;
    },
    addColumn(index, position) {
      if (position === "upload") {
        this.uploadSourceData.splice(index + 1, 0, "");
      } else {
        this.downloadSourceData.splice(index + 1, 0, "");
      }
    },
    removeColumn(index, position) {
      if (position === "upload") {
        this.uploadSourceData.splice(index, 1);
      } else {
        this.downloadSourceData.splice(index, 1);
      }
    }
  }
};
</script>
<style lang="less" scoped>
table {
  border-collapse: collapse;
  width: 90%;
}

table,
td,
th {
  min-width: 100px;
  text-align: center;
  border: 1px solid black;
}
td,
th {
  line-height: 40px;
}
td > div {
  width: 100%;
  height: 40px;
}
.tag {
  display: inline-block;
  border: 1px solid #333;
  text-align: center;
  margin: 5px 5px;
  padding: 5px 5px;
  cursor: pointer;
}
th {
  position: relative;
  .icons {
    line-height: normal;
    position: absolute;
    width: 100%;
    left: 50%;
    top: 0;
    transform: translateX(-50%);
    .addi,
    .removei {
      font-size: 23px;
      color: red;
      cursor: pointer;
    }
  }
}
.popcontent {
  padding: 15px 15px 10px;
  background-color: #fff;
  position: fixed;
  z-index: 9999;
  border: 1px solid #333;
  .close_icon {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 20px;
    cursor: pointer;
  }
}
</style>
