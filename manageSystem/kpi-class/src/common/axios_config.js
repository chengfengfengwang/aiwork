import axios from 'axios';
import store from './../store/index'
axios.defaults.headers.common['token'] = store.state.userInfo.token;
axios.defaults.headers.common['uid'] = store.state.userInfo.uid;
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
        if(res.error && res.msg=='没有该用户'){
          location.href = 'http://s.immusician.com/web/admin/class_admin/index.html#/Login'
        }
        return res;
    }else{
        alert('请求出错了')
    }
    
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default axios