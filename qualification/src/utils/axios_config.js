import axios from 'axios';


// 添加响应拦截器
axios.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if(response.status==200 || response.status==204){
        const res = response.data;
        if(res.error===1){alert(res.msg)}
        return res;
    }else{
        alert('请求出错了')
    }
    
  }, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  });

  export default axios