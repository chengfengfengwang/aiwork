import axios from 'axios';
import { Dialog } from 'vant';
//import store from './../store/index'
// localStorage.setItem('token','user_e5ba9b56460e926d2e9f80eb2df4c4ae');
// localStorage.setItem('uid','25')
// axios.defaults.headers.common['token'] = localStorage.getItem('token');
// axios.defaults.headers.common['uid'] = localStorage.getItem('uid');

// 添加请求拦截器
// axios.interceptors.request.use(function (config) {
//     // 在发送请求之前做些什么
//     return config;
//   }, function (error) {
//     // 对请求错误做些什么
//     return Promise.reject(error);
//   });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    //return response;
    if(response.status==200 || response.status==204){
        const res = response.data;
        if(res.error){Dialog.alert({message: res.msg})}
        return res;
    }else{
        Dialog.alert({message: '请求出错了'})
    }
    
  }, function (error) {
    if(error && error.response){
        if(error.response.status == 400){
            Dialog.alert({message: error.response.data.message})
            //alert(error.response.data.message)
        } else{
            Dialog.alert({message: '请求出错，状态码' + error.response.status})
            //alert('请求出错，状态码' + error.response.status)
        }
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default axios