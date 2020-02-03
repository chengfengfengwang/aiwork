import axios from 'axios';
//import store from './../store/index'
//axios.defaults.headers.common['token'] = store.state.userInfo.token;
//axios.defaults.headers.common['uid'] = store.state.userInfo.uid;
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
        return res;
    }else{
        alert('请求出错了')
    }
    
  }, function (error) {
    if (error && error.response) {
      if (error.response.status == 400) {
        alert(error.response.data.message)
      } else {
        if(process.env.NODE_ENV==='production'){
          alert('请求出错，状态码' + error.response.status)
        }
      }
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default axios