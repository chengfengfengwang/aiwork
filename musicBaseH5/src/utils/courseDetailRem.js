// 基准大小
const baseSize = 36
console.log(document.documentElement.clientWidth)
// 设置 rem 函数
window.onresize = null;
function setRem () {
  // 当前页面宽度相对于 750 宽的缩放比例，可根据自己需要修改。
  if(document.documentElement.clientWidth<765){
    document.documentElement.style.fontSize = '32px'
  }else{
      console.log('aaa')
    document.documentElement.style.fontSize = '48px'
  }
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
// window.onresize = function () {
//   setRem()
// }
