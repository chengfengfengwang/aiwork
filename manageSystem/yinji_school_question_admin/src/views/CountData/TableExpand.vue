<style scoped>
.expand-row {
  margin-top: 10px;
  padding-top: 10px;
  margin-bottom: 0px;
  clear: both;
}
</style>
<template>
    <div>
        <!-- {{this.course.project_info}} -->
        <div>
          <div style="text-align:center">
            <span>时间：</span>
            <DatePicker  @on-change="handleTimeChange" :value="timeRange" format="yyyy/MM/dd" type="daterange" placement="bottom-end" placeholder="Select date" style="width: 200px;"></DatePicker>
          </div>
          <Row class="expand-row">
              <Col span="4" v-for="(item,index) in resultList" :key="index">
                  <span class="expand-key">{{item.name}}:</span>
                  <span class="expand-value">{{ item.value }}</span>
              </Col>
          </Row>
        </div>
        <!-- <div v-for="(item,index) in resultList" :key="index">
            <Row class="expand-row">
                <Col span="8">
                    <span class="expand-key">{{item.item_type}}:</span>
                    <span class="expand-value">{{ item.item_name }}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key">购买方式:</span>
                    <span class="expand-value">{{ item.manual }}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key">购买日期:</span>
                    <span class="expand-value">{{ item.paid_at }}</span>
                </Col>
            </Row>
        </div>-->
    </div>
</template>
<script>
export default {
  props: {
    course: Object,
    app:String
  },
  data() {
    return {
      itemList: [],
      resultList:[],
      timeRange: ['2010-01-01', '2020-02-15']
    };
  },
  mounted() {
    if(this.app==='ai'){
      this.host = process.env.LIDONG_AI
    }else{
      this.host = process.env.LIDONG_YINJI
    }
    this.itemList = this.course.project_info;
    this.getAllData();
  },
  methods: {
    getAllData(timeArr){
      this.itemList.forEach((e,index)=>{
        this.getCourseIndiData(e.id,e.name,timeArr)
      })
    },
    handleTimeChange(timeArr){
      this.getAllData(timeArr)
    },
    getCourseIndiData(id,name,timeArr=['2010-01-01', '2020-02-15']) {
      this.axios
        .get(
          `${this.host}/get_project_data?project_id=${id}
            &start_time=${timeArr[0]}&end_time=${timeArr[1]}
            `
        )
        .then(res => {
          //console.log(res);
          this.resultList.push({name:name,value:res.data.compute_ratio})
        });
    }
  }
};
</script>