// 基准大小
const baseSize = 37.5

// 设置 rem 函数
function setRem () {
  document.documentElement.style.fontSize = baseSize + 'px'
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
