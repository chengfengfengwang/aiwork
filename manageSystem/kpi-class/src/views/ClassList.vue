<template>
  <div>
    <Spin size="large" fix v-show="loadingShow"></Spin>
    <div style="margin-bottom:5px">
      <span>筛选：</span>
      <DatePicker
        type="daterange"
        placement="bottom-end"
        placeholder="按日期筛选"
        style="width: 200px"
        @on-change="allTimeSelectChange"
      ></DatePicker>
      <span style="margin-left:5px">按教师筛选：</span>
      <Select  v-model="fakeSearchTeacherId" style="width:200px">
        <Option v-for="user in userList" :value="user.uid" :key="user.username">{{ user.username }}</Option>
      </Select>
      <span style="margin-left:5px">排序：</span>
      <Select @on-change="sortChange" v-model="sortId" style="width:200px">
        <Option v-for="item in sortList" :value="item.value" :key="item.value">{{ item.label }}</Option>
      </Select>
      <span style="margin-left:5px">按乐器筛选：</span>
      <Select @on-change="sortChange" v-model="instrument_type" style="width:200px">
        <Option v-for="(item,index) in instrumentList" :value="item" :key="index">{{ item }}</Option>
      </Select>
    </div>
    <Nodata v-show="!loadingShow && classList.length===0"></Nodata>
    <ClassTable :myclass="myclass" v-for="(myclass,index) in classList" :key="myclass.class_id"></ClassTable>
    <div style="margin-top:10px">
      <Page
        @on-page-size-change="pageSizeChange"
        @on-change="pageChange"
        :total="total"
        :page-size="pageSize"
        show-sizer
        :page-size-opts="[5,10,15,20,30,40]"
        show-elevator
      />
    </div>
  </div>
</template>
<script>
import ClassTable from "./../components/ClassTable";
import Nodata from "./../components/Nodata";
import mixin_user_list from "../mixins/allUserList.js";
export default {
  name: "classList",
  mixins: [mixin_user_list],
  data() {
    return {
      classList: [],
      loadingShow: true,
      page: 0,
      pageSize: 10,
      total: 0,
      sortList: [{ label: "正序", value: 1 }, { label: "倒序", value: -1 }],
      sortId: -1,
      beginTime: "",
      endTime: "",
      instrument_type: "全部",
      instrumentList: ["全部","guitar", "ukulele"],
      fakeSearchTeacherId: "",
      searchTeacherId:""
    };
  },
  components: {
    ClassTable,
    Nodata
  },
  mounted() {
    this.getClassList();
    this.userListPromise.then(res=>{
      this.userList.unshift({username: "全部", token: "", ascription: '', uid: 'all'})
    })
    
  },
  methods: {
    resetPage() {
      this.page = 0;
    },
    sortChange() {
      this.resetPage();
      this.getClassList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.getClassList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getClassList();
    },
    allTimeSelectChange(value) {
      this.beginTime = value[0];
      this.endTime = value[1];
      this.resetPage();
      this.getClassList();
    },
    getClassList(b = "", e = "") {
      this.loadingShow = true;
      if(this.instrument_type==='全部'){
        var instrument_type = ``
      }else{
        var instrument_type = `&instrument_type=${
            this.instrument_type
          }`
      }
      this.axios
        .get(
          `${process.env.XIAOPO_SEARCH}/v3/wechat/op_data/list?page=${
            this.page
          }&size=${this.pageSize}${
            instrument_type
          }&sort=_id,${this.sortId}&b=${this.beginTime}&e=${
            this.endTime
          }&user_id=${this.searchTeacherId}`
        )
        .then(res => {
          this.classList = res.data;
          this.total = res.total;
          this.loadingShow = false;
        });
    }
  },
  watch:{
    fakeSearchTeacherId(val){
      if(val==='all'){
        this.searchTeacherId = '';
      }else{
        this.searchTeacherId = val;
      }
      this.sortChange()
    }
  },
  activated(){
    document.querySelector('.ivu-layout-content').scrollTop = localStorage.getItem('classListScrollTop')
  },
  beforeRouteLeave(to,from,next){
      localStorage.setItem('classListScrollTop',document.querySelector('.ivu-layout-content').scrollTop)
      next()
  }
};
</script>

