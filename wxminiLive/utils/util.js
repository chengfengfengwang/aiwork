const formatTime = date => {
  date = date* 1000;
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join("/") +
    " " +
    [hour, minute, second].map(formatNumber).join(":")
  );
};

const formatNumber = n => {
  n = n.toString();
  return n[1] ? n : "0" + n;
};
let uid = wx.getStorageSync("uid")?wx.getStorageSync("uid"):'';
let token = wx.getStorageSync("token")?wx.getStorageSync("token"):'';
const $get = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data,
      header: { 
        "Content-Type": "json",
        uid,
        token
      },
      success: function(res){
        resDataHandler(res,resolve,reject)
      },
      fail: reject
    });
  });
};
const $post = (url, data) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      method: "POST",
      header: { 
        uid,
        token
      },
      data,
      success: function(res) {
        resDataHandler(res,resolve,reject)
      },
      fail: reject
    });
  });
};
const resDataHandler = function(res,resolve,reject){
  var res = res.data;
  if (res.error) {
    wx.showToast({
      title: res.msg,
      icon: 'none',
      duration: 2000
    });
  } else {
    resolve(res);
  }
}
const findInstrumentType = function(id){
  let myInstruments = JSON.parse(wx.getStorageSync("myInstruments"));
  if(!myInstruments && !id){
    return
  }
  for(var i=0;i<myInstruments.length;i++){
    for(var k=0;k<myInstruments[i].courses.length;k++){
      if(id==myInstruments[i].courses[k].id){
        return myInstruments[i].value
      }
    }
  }
};
module.exports = {
  formatTime,
  $get,
  $post,
  findInstrumentType
};
