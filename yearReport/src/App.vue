<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
//   data() {
//     return {
//       p1show: false,
//       p2show: true,
//       page2FadeIn: true
//     };
//   },
//   mounted() {
//     this.bindTouchEvent();
//   },
//   methods: {
//     bindTouchEvent() {
//       var that = this;
//       var startX, startY, moveEndX, moveEndY;
//       document
//         .querySelector("body")
//         .addEventListener("touchstart", function(e) {
//           //e.preventDefault();
//           startX = e.changedTouches[0].pageX;
//           startY = e.changedTouches[0].pageY;
//         });
//       document.querySelector("body").addEventListener("touchmove", function(e) {
//         moveEndX = e.changedTouches[0].pageX;
//         moveEndY = e.changedTouches[0].pageY;
//         var X = moveEndX - startX;
//         var Y = moveEndY - startY;
//         if (Math.abs(X) > Math.abs(Y) && X > 0) {
//           //alert("left 2 right");
//         } else if (Math.abs(X) > Math.abs(Y) && X < 0) {
//           //alert("right 2 left");
//         } else if (Math.abs(Y) > Math.abs(X) && Y > 0) {
//           //alert("top 2 bottom");
//         } else if (Math.abs(Y) > Math.abs(X) && Y < 0) {
//             that.fadeInPage2();
//           //alert("bottom 2 top");
//         } else {
//           //alert("just touch");
//         }
//       });
//     },
//     fadeInPage2() {
//       this.page2FadeIn = true;
//     }
//   }
};
</script>

