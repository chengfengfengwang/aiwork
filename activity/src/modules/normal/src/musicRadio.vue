<template>
  <div id="main">
    <img src="../../../assets/img/normal/musicRadio/bg1.png" alt class="imgw100">
    <img src="../../../assets/img/normal/musicRadio/bg2.png" alt class="imgw100">
    <img src="../../../assets/img/normal/musicRadio/bg3.png" alt class="imgw100">
    <div class="content_wrapper">
      <div class="section" v-for="(section,index) in dataList" :key="index">
        <div class="section_title">
          <img :src="section.title" alt>
        </div>
        <div
          @click="goSongList(item.id)"
          class="item"
          v-for="(item,idx) in section.song_list"
          :key="idx"
        >
          <div class="cover">
            <img :src="item.cover" alt>
          </div>
          <div class="item_title">{{item.title}}</div>
        </div>
      </div>
    </div>

    <Download :countCallBack="downloadClickCount" />
  </div>
</template>
<script>
import Download from "components/bottomDownload";
import { getQueryVariable } from "common/util.js";
import { uvRequest } from "common/countFn.js";

let countData = {
  位置: [
    {
      h5歌单合辑列表页: 100,
      h5具体合辑页: 101,
      h5具体音频页: 102
    }
  ],
  类型: [
    {
      页面访问: 110,
      点击:111
    }
  ]
};
export default {
  data() {
    return {
      dataList: [],
      openid: "",
      isWatchWechat: ""
    };
  },
  components: {
    Download
  },
  created() {
    document.title = "coco音乐电台";
    this.getDataList();
    this.getWechatInfo();
  },
  methods: {
    downloadClickCount(){
      uvRequest(100,111)
    },
    goSongList(id) {
      location.href = `normal.html?listId=${id}#/songList`;
    },
    getDataList() {
      this.axios
        .get(`http://api.yinji.immusician.com/v1/song/home?activity=h5`)
        .then(res => {
          if (!res.error) {
            let list = res.data;
            list.forEach(e => {
              switch (e.title) {
                case "原创歌曲":
                  e.title = require("../../../assets/img/normal/musicRadio/t_ycgq.png");
                  break;
                case "音乐故事":
                  e.title = require("../../../assets/img/normal/musicRadio/t_yygs.png");
                  break;
                case "家长课":
                  e.title = require("../../../assets/img/normal/musicRadio/t_jzk.png");
                  break;
                case "课程歌单":
                  e.title = require("../../../assets/img/normal/musicRadio/t_kcgd.png");
                  break;
              }
            });
            this.dataList = list;
            console.log(list);
          }
        });
    },
    getWechatInfo() {
      if (this.openid) {
        return;
      }
      this.axios
        .get(
          `http://api.yinji.immusician.com/v1/wechat/is_watch/?code=${getQueryVariable(
            "code"
          )}`
        )
        .then(res => {
          this.openid = res.open_id;
          if (this.openid) {
            sessionStorage.setItem("open_id", this.openid);
            uvRequest(100, 110);
          }
        });
    }
  }
};
</script>
<style lang="less">
#main {
  font-size: 0;
  .content_wrapper {
    position: absolute;
    width: 100%;
    left: 0;
    top: 390px;
    background-color: #74950e;
  }
}
.section {
  position: relative;
  margin: 40px auto 80px auto;
  padding: 16px 8px;
  width: 356px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  display: flex;
  flex-wrap: wrap;
  //justify-content: space-evenly;
  .section_title {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: -38px;
    width: 202px;
    img {
      width: 100%;
    }
  }
  .item {
    margin: 0 6px 6px 6px;
    .cover {
      position: relative;
      width: 100px;
      height: 100px;
      margin-bottom: 6px;
      overflow: hidden;
      img {
        width: 100%;
      }
      .play {
        position: absolute;
        right: 10px;
        bottom: 6px;
        width: 24px;
      }
    }
    .item_title {
      width: 100px;
      font-size: 14px;
      font-family: PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
  }
}
</style>
