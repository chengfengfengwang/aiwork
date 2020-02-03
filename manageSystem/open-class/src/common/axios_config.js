import axios from 'axios';
import store from './../store/index'
import { Message } from 'iview'
axios.defaults.headers.common['token'] = store.state.userInfo.token;
axios.defaults.headers.common['uid'] = store.state.userInfo.uid;
axios.defaults.headers.common['key'] = store.state.userInfo.key;
// 添加请求拦截器
axios.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.status==200 || response.status==204){
        const res = response.data;
        if(res.error && res.error){
          Message.error(res.msg)
        }
        if(res.error == 10006){
          localStorage.clear();
          location.hash = '#/Login'
        }
        return res;
    }else{
        alert('请求出错了')
    }
    
  }, function (error) {
    console.log('error')
    console.log(error)
    console.log(error.response)
    if (error.response) {
      // 请求已发出，但服务器响应的状态码不在 2xx 范围内
      Message.error(error.response.data.message);
    } else {
      // Something happened in setting up the request that triggered an Error
      Message.error('请求出错了');
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default axios