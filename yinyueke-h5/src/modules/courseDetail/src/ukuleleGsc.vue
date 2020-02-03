<template>
  <!-- 尤克里里古诗词弹唱课 -->
  <div id="ukuleleGsc">
    <img class="page_img" src="../../../assets/img/courseDetail/ukuleleGsc/gsc1.png" alt>
    <img class="page_img" src="../../../assets/img/courseDetail/ukuleleGsc/gsc2.png" alt>
    <img class="page_img" src="../../../assets/img/courseDetail/ukuleleGsc/gsc3.png" alt>
    <img class="page_img" src="../../../assets/img/courseDetail/ukuleleGsc/gsc4.png" alt>
    <img class="page_img" src="../../../assets/img/courseDetail/ukuleleGsc/gsc5.png" alt>
    <div class="section6">
      <div class="title_row">
        <div class="title_img_wrapper">
          <img src="../../../assets/img/courseDetail/ukuleleGsc/title_img.png" alt>
        </div>
        <div class="title_wrapper">
          <div class="title">丰富多彩的课堂模式</div>
          <div class="title">让孩子体会趣味学习音乐的乐趣</div>
        </div>
      </div>
      <div class="dec">松涛叔叔的课堂气氛永远是特别欢乐的，整体的课程内容设计非常符合孩子们的认知规律，活泼有趣，绝不枯燥。</div>
      <div class="item">
        <div class="title_wrapper">
          <div class="item_title">唱诗歌</div>
        </div>
        <div class="item_img_wrapper">
          <img src="../../../assets/img/courseDetail/ukuleleGsc/i1.png" alt>
          <img src="../../../assets/img/courseDetail/ukuleleGsc/i2.png" alt>
        </div>
      </div>
      <div class="item">
        <div class="title_wrapper">
          <div class="item_title">看动画</div>
        </div>
        <div class="item_img_wrapper">
          <img src="../../../assets/img/courseDetail/ukuleleGsc/i3.png" alt>
          <img src="../../../assets/img/courseDetail/ukuleleGsc/i4.png" alt>
        </div>
      </div>
      <div class="item">
        <div class="title_wrapper">
          <div class="item_title">听故事</div>
        </div>
        <div class="item_img_wrapper">
          <img src="../../../assets/img/courseDetail/ukuleleGsc/i5.png" alt>
          <img src="../../../assets/img/courseDetail/ukuleleGsc/i6.png" alt>
        </div>
      </div>
      <div class="item">
        <div class="title_wrapper">
          <div class="item_title">学习唱</div>
        </div>
        <div class="item_img_wrapper">
          <img src="../../../assets/img/courseDetail/ukuleleGsc/i7.png" alt>
          <img src="../../../assets/img/courseDetail/ukuleleGsc/i8.png" alt>
        </div>
      </div>
      <div class="item">
        <div class="title_wrapper">
          <div class="item_title two">学和弦</div>
          <div class="item_title two">练节奏</div>
        </div>
        <div class="item_img_wrapper">
          <img src="../../../assets/img/courseDetail/ukuleleGsc/i9.png" alt>
          <img src="../../../assets/img/courseDetail/ukuleleGsc/i10.png" alt>
        </div>
      </div>
      <div class="item">
        <div class="title_wrapper">
          <div class="item_title two">唱一唱</div>
          <div class="item_title two">弹一弹</div>
        </div>
        <div class="item_img_wrapper">
          <img src="../../../assets/img/courseDetail/ukuleleGsc/i11.png" alt>
          <img src="../../../assets/img/courseDetail/ukuleleGsc/i12.png" alt>
        </div>
      </div>
    </div>
    <div class="bottom">
        <img src="../../../assets/img/courseDetail/ukuleleGsc/footer.png" alt="">
    </div>
  </div>
</template>
<script>
export default {};
</script>
<style lang="less" scoped>
#ukuleleGsc {
  font-size: 0;
  background-color: rgba(255, 248, 240, 1);
  //padding-bottom: 100px;
}
.page_img {
  width: 100%;
}
.section6 {
  width: 348px;
  //width: 365px;
  margin: auto;
  padding: 20px 15px;
  border-radius: 15px;
  background-color: #fff;
  box-shadow: 0 0 5px 5px #f6f2ed;
//   background: url("../../../assets/img/courseDetail/ukuleleGsc/box.png")
//     no-repeat center/cover;
//     background-position: 0 0;
//   background-color: rgba(255, 248, 240, 1);
  
  font-size: 12px;
  font-family: PingFangSC;
  font-weight: 400;
  color: rgba(102, 102, 102, 1);

  .title_row {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    .title_img_wrapper {
      width: 30px;
      margin-right: 8px;

      img {
        width: 100%;
      }
    }
    .title {
      font-size: 14px;
      font-family: PingFangSC;
      font-weight: 500;
      color: rgba(51, 51, 51, 1);
    }
  }
  .item {
    .title_wrapper {
      margin: 30px 0 10px 0;
      .item_title {
        text-align: center;
        position: relative;
        font-size: 14px;
        font-family: PingFangSC;
        font-weight: 500;
        color: rgba(51, 51, 51, 1);
      }
      .item_title:after {
        content: "";
        position: absolute;
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #fec612;
        left: 39%;
        top: 50%;
        transform: translateY(-50%);
      }
      .item_title.two {
        width: 50%;
        display: inline-block;
      }
      .item_title.two:after {
        left: 28%;
      }
    }

    .item_img_wrapper {
      img {
        width: 153px;
        height: 85px;
      }
      display: flex;
      justify-content: space-between;
    }
  }
}
.bottom{
    img{
        width: 100%;
    }
}
</style>

