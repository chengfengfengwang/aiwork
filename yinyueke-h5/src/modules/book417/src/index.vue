<template>
  <div id="main">
    <!-- {{book}} -->
    <div class="play_section">
      <div class="book">
        <div class="book_cover">
          <img src="../../../assets/img/book417/0.png" alt>
        </div>
        <div class="book_name">儿童古典绘本</div>
      </div>
      <div class="scan_btn">点击扫码，听完整版</div>
    </div>
    <div class="content_section">
      <img class="cover" src="../../../assets/img/book417/0.png" alt>
      <div class="content">
        <div class="content_item">国家新闻出版署推荐图书</div>
      </div>
    </div>
    <div class="catalog_section">
      <div class="catalog_header">
        <div class="left">
          <img src="../../../assets/img/book417/0.png" alt>
        </div>
        <div class="middle">
          <div class="middle_title">《儿童古典绘本》</div>
          <div class="middle_info">
            <span class="sub">1340订阅</span>
            <span class="all_num">8集</span>
          </div>
        </div>
        <div class="right">
          <div class="icon">
            <img src="../../../assets/img/book417/headset.png" alt>
          </div>
          <div>收听</div>
        </div>
      </div>
      <div class="catalog_item">
        <div class="play_icon">
          <img src="../../../assets/img/book417/itemplay.png" alt>
        </div>
        <div class="name">01.四季</div>
        <div class="more_icon">
          <img src="../../../assets/img/book417/more.png" alt>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";
import bookDir from "../bookDir.js";
export default {
  data() {
    return {
      book: ""
    };
  },
  created() {
    console.log(bookDir);
    this.book = bookDir[getQueryVariable("index")];
    console.log(this.book);
  },

  methods: {}
};
</script>
<style lang="less">
#main {
  position: relative;
  font-size: 16px;
}
.play_section {
  text-align: center;
  .book {
    margin-top: 30px;
    margin-bottom: 28px;
    .book_cover {
      margin: 0 auto 15px auto;
      width: 115px;
      height: 115px;
      box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.5);
      border-radius: 11px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .book_name {
      font-size: 20px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 255, 255, 1);
    }
  }
  .scan_btn {
    display: inline-block;
    width: 243px;
    height: 44px;
    line-height: 44px;
    background: rgba(255, 183, 17, 1);
    border-radius: 22px;
    font-size: 18px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
    text-align: center;
  }
}
.content_section {
  padding: 0 24px 0 15px;
  img.cover {
    width: 100%;
  }
}
.catalog_section {
  .catalog_header {
    padding: 0 15px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid #eeeeee;
    .left {
      margin-right: 5px;
      width: 45px;
      height: 45px;
      background: rgba(216, 216, 216, 1);
      border-radius: 4px;
      overflow: hidden;
      img {
        width: 100%;
      }
    }
    .middle {
      .middle_title {
        margin-bottom: 3px;
        font-size: 18px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .middle_info {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: rgba(153, 153, 153, 1);
        .sub {
          padding-left: 6px;
        }
        .all_num {
          padding-right: 6px;
          float: right;
        }
      }
    }
    .right {
      flex-grow: 1;
      text-align: right;
      img {
        width: 20px;
        margin-bottom: 2px;
      }
      font-size: 11px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(255, 183, 17, 1);
    }
  }
  .catalog_item {
    display: flex;
    align-items: center;
    .play_icon {
      margin-right: 14px;
      width: 22px;
      height: 22px;
      img {
        width: 100%;
      }
    }
    .name {
      flex-grow: 1;
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: rgba(51, 51, 51, 1);
    }
    .more_icon{
      img{
        width: 16px;
      }
    }
  }
}
</style>
