<template>
  <div>
    <Nav
  title="地址"
  left-text="返回"
  left-arrow
/>
    <div class="my_cell px1-bottom-ddd">
      <div class="my_cell_label">
        <span>收货人</span>
      </div>
      <div class="my_cell_value">
        <input v-model="receiver" type="text" placeholder="请输入收件人姓名">
      </div>
    </div>
    <div class="my_cell px1-bottom-ddd">
      <div class="my_cell_label">
        <span>手机号码</span>
      </div>
      <div class="my_cell_value">
        <input v-model="phone" type="text" placeholder="请输入收件人手机号码">
      </div>
    </div>
    <div class="my_cell" @click="selectAddressShow=true">
      <div class="my_cell_label">
        <span style="color:#323233">所在地区</span>
      </div>
      <div class="my_cell_value"> 
        <span :style="{color:location==='请选择地址'?'#999':'#323233'}">{{location}}</span>
        <!-- <input v-model="location" type="text"> -->
      </div>
    </div>
    <van-cell-group>
      <van-field
        v-model="detailAddress"
        label="详细地址"
        type="textarea"
        placeholder="请输入详细地址"
        rows="2"
        autosize
      />
    </van-cell-group>
    <div class="btn_wrapper">
      <div class="save" @click="saveAdress">保存</div>
    </div>
    
    <van-popup v-model="selectAddressShow" position="bottom">
      <van-area @cancel="selectAddressShow=false" @confirm="addressConfirm" :area-list="areaList"/>
    </van-popup>
  </div>
</template>

<script>
import { Field, Cell, CellGroup } from "vant";
import Nav from '../components/Nav'
import areaList from "./../utils/area.js";
export default {
  data() {
    return {
      receiver:'',
      phone:'',
      location:'请选择地址',
      value: "",
      areaList: areaList,
      selectAddressShow: false,
      detailAddress:''
    };
  },
  components: {
    "van-field": Field,
    Nav
  },
  created(){
    this.getLocalAddress()
  },
  methods: {
    getLocalAddress(){
      var obj = {};
      if(localStorage.getItem('addressInfo')){
        obj = JSON.parse(localStorage.getItem('addressInfo'))
      };
      this.receiver = obj.receiver;
        this.phone = obj.phone;
        this.location = obj.location ? obj.location : '请选择地址';
        this.detailAddress = obj.detailAddress;
    },
    saveAdress(){
      var obj = {
        receiver:this.receiver,
        phone:this.phone,
        location:this.location,
        detailAddress:this.detailAddress
      }
      localStorage.setItem('addressInfo',JSON.stringify(obj));
      this.$router.go(-1)
    },
    addressConfirm(arr) {
      this.selectAddressShow = false;
      console.log(arr);
      this.location = arr.map((e)=>{
        return e.name
      }).join(' ')
    }
  }
};
</script>
<style lang="less" scoped>
@import url("./../assets/css/common.less");
.btn_wrapper{
  padding: 0 30px;
  text-align: center;
}
.save{
  margin-top:40px;
  display: inline-block;
  width: 100%;
  max-width: 900px;
  height: 70px;
  line-height: 70px;
  text-align: center;
  border-radius: 4px;
  color: #fff;
  background-color: #07c160;
}
.my_cell {
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  color: #323233;
  font-size: 26px;
  //line-height: 24px;
  background-color: #fff;
  padding: 20px 30px;
  align-items: center;
}
.my_cell_label {
  //max-width: 90px;
}
.my_cell_value {
  flex: 1;
  color: #323233;
  overflow: hidden;
  text-align: right;
  position: relative;
  vertical-align: middle;
  & > input {
    border: 0;
    margin: 0;
    padding: 0;
    width: 100%;
    resize: none;
    display: block;
    color: #323233;
    box-sizing: border-box;
    background-color: transparent;
    text-align: right;
  }
}
</style>

