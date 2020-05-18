<template>
  <div>
    <img v-show="bookShow" src="../../../assets/img/anvs/book.png" alt class="imgw100">
    <img v-show="djembeShow" src="../../../assets/img/anvs/djembe.png" alt class="imgw100">
    <img v-show="ukShow" src="../../../assets/img/anvs/uk.png" alt class="imgw100">
  </div>
</template>
<script>
import { getQueryVariable } from "../../../common/util.js";

export default {
  data() {
    return {
      uk: [],
      djembe: [],
      book: [],
      djembeShow: false,
      bookShow: false,
      ukShow: false
    };
  },
  created() {
    let s = getQueryVariable("s");
    if (s == "ukulele") {
      this.ukShow = true;
    } else if (s == "book") {
      this.bookShow = true;
    } else if (s == "djembe") {
      this.djembeShow = true;
    }
    //if(s=='')
  }
};
</script>
