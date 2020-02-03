var axios = require('axios');
axios.get('http://apis.juhe.cn/simpleWeather/query?city=%E8%8B%8F%E5%B7%9E&key=6fc3096e3e5ee9be2370c793621207a1').then(res=>{
    console.log(res)
})