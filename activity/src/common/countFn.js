import axios from './axios_config'
function uvRequest(
    site_type = -1, //位置
    stats_type = -1, //统计类型
    song_list_id = -1, //合集id
    song_id = -1, //单个歌曲id
  ) {
    axios
      .post(`http://api.yinji.immusician.com/v1/coco_stats`, {
        site_type,
        stats_type,
        song_list_id,
        song_id,
        open_id:sessionStorage.getItem('open_id')==='undefined'?-1:sessionStorage.getItem('open_id'),
        app_type: 1,
        
      })
      .then(res => {
        console.log(res)
      });
  }
export  {
    uvRequest
}