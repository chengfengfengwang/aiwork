// 基准大小
const baseSize = 37.5

// 设置 rem 函数
function setRem () {
  document.documentElement.style.fontSize = baseSize + 'px'
  if(document.documentElement.clientWidth>750){
    document.documentElement.style.fontSize = '50px'
  }else{
    document.documentElement.style.fontSize = '37.5px'
  }
}
// 初始化
setRem()
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
}
