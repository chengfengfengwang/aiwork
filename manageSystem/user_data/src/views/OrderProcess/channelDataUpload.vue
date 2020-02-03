<template>
  <div>
    <div>
      <h1>上传原始渠道表单</h1>
      <span>渠道：</span>
      <Select style="width: 160px" v-model="searchChannel" placeholder>
        <Option v-for="option in channelList" :key="option.id" :value="option.id">{{option.name}}</Option>
      </Select>
      <div>
        <span>文件：</span>
        <Upload
          style="display:inline-block;vertical-align:center"
          :before-upload="handleUpload"
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <Button icon="ios-cloud-upload-outline">选择文件</Button>
        </Upload>
        <div v-if="file !== null">
          <p>{{ file.name }}</p>
          <Button
            type="info"
            @click="uploadChannelFile"
            :loading="loadingStatus"
          >{{ loadingStatus ? 'Uploading' : '提交' }}</Button>
        </div>
      </div>
    </div>
    <div>
      <h1>下载发给厂商的表单(需要发货的实物)</h1>
      <span>厂商：</span>
      <Select style="width: 160px" v-model="searchFactory1" placeholder>
        <Option v-for="option in factoryList" :key="option.id" :value="option.id">{{option.name}}</Option>
      </Select>
      <span>开始时间</span>
      <DatePicker v-model="startTime1" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      <span>结束时间</span>
      <DatePicker v-model="endTime1" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      <span>状态：</span>
      <Select style="width: 160px" v-model="searchStatus1" placeholder>
        <Option
          v-for="status in statusList"
          :key="status.value"
          :value="status.value"
        >{{status.name}}</Option>
      </Select>
      <Button type="primary" @click="downloadFileToVendor1">下载</Button>
    </div>
    <div>
      <h1>上传厂商发货的表单（快递单号）</h1>
      <span>厂商：</span>
      <Select style="width: 160px" v-model="searchFactory2" placeholder>
        <Option v-for="option in factoryList" :key="option.id" :value="option.id">{{option.name}}</Option>
      </Select>
      <div>
        <span>文件：</span>
        <Upload
          style="display:inline-block;vertical-align:center"
          :before-upload="handleUpload1"
          action="//jsonplaceholder.typicode.com/posts/"
        >
          <Button icon="ios-cloud-upload-outline">选择文件</Button>
        </Upload>
        <div v-if="file1 !== null">
          <p>{{ file1.name }}</p>
          <Button
            type="info"
            @click="uploadChannelFile1"
            :loading="loadingStatus1"
          >{{ loadingStatus1 ? 'Uploading' : '提交' }}</Button>
        </div>
      </div>
    </div>
    <div>
      <h1>下载发给渠道的表单（附有快递单号）</h1>
      <span>渠道：</span>
      <Select style="width: 160px" v-model="searchChannel1" placeholder>
        <Option v-for="option in channelList" :key="option.id" :value="option.id">{{option.name}}</Option>
      </Select>
      <span>开始时间</span>
      <DatePicker v-model="startTime2" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      <span>结束时间</span>
      <DatePicker v-model="endTime2" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
      <span>状态：</span>
      <Select style="width: 160px" v-model="searchStatus2" placeholder>
        <Option
          v-for="status in statusList"
          :key="status.value"
          :value="status.value"
        >{{status.name}}</Option>
      </Select>
      <Button type="primary" @click="downloadFileToVendor2">下载</Button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      statusList: [
        {
          name: "未下载",
          value: 0
        },
        {
          name: "已下载",
          value: 1
        },
        {
          name: "全部",
          value: 2
        }
      ],
      channelList: [],
      factoryList: [],
      param: {},
      file: null,
      loadingStatus: false,
      searchChannel: "",
      ///
      startTime1: "",
      endTime1: "",
      searchStatus1: "",
      searchFactory1: "",
      ///
      searchFactory2: "",
      file1: null,
      loadingStatus1: false,
      ///
      searchChannel1: "",
      startTime2: "",
      endTime2: "",
      searchStatus2: ""
    };
  },
  components: {},
  mounted() {
    this.getChannels();
    this.getFactoryList();
  },
  methods: {
    getFactoryList() {
      this.axios
        .get(`${process.env.WULIU}/vendor/index?page=0&size=999&status=1`)
        .then(res => {
          this.tableLoading = false;
          this.factoryList = res.data.list;
        });
    },
    downloadFileToVendor1() {
      const formObj = {
        start_time: this.startTime1.valueOf() / 1000,
        end_time: this.endTime1.valueOf() / 1000,
        status: this.searchStatus1,
        id: this.searchFactory1
      };
      this.axios
        .post(`${process.env.WULIU}/form/channel/download`,formObj)
        .then(res => {
          //window.location.href = res.data;
          // this.tableLoading = false;
          // this.factoryList = res.data.list;
        });
    },
    downloadFileToVendor2() {
      const formObj = {
        start_time: this.startTime2.valueOf() / 1000,
        end_time: this.endTime2.valueOf() / 1000,
        status: this.searchStatus2,
        id: this.searchChannel1
      };
      console.log(formObj);
      this.axios
        .post(`${process.env.WULIU}/form/vendor/download`,formObj)
        .then(res => {
          //window.location.href = res.data;
          // this.tableLoading = false;
          // this.factoryList = res.data.list;
        });
    },
    handleUpload(file) {
      this.file = file;
      return false;
    },
    handleUpload1(file) {
      this.file1 = file;
      return false;
    },
    uploadChannelFile() {
      this.loadingStatus = true;
      const formObj = {
        action: 0,
        file: this.file,
        id: this.searchChannel
      };
      var formdata = new FormData();
      for (let key in formObj) {
        formdata.append(key, formObj[key]);
      }
      this.axios
        .post(`${process.env.WULIU}/form/channel/upload`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
           this.file = null;
        this.loadingStatus = false;
          this.modalShow = false;
          this.getTableList();
        });
    },
    uploadChannelFile1() {
      this.loadingStatus1 = true;
      const formObj = {
        action: 1,
        file: this.file1,
        id: this.searchFactory2
      };
      var formdata = new FormData();
      for (let key in formObj) {
        formdata.append(key, formObj[key]);
      }
      this.axios
        .post(`${process.env.WULIU}/form/vendor/upload`, formdata, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          this.file1 = null;
          this.loadingStatus1 = false;
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
    getChannels() {
      this.axios
        .get(`${process.env.WULIU}/channel/index?page=0&size=999&status=1`)
        .then(res => {
          this.channelList = res.data.list;
        });
    }
  }
};
</script>
