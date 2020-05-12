<template>
  <div>
    <div class="my_cell px1-bottom-ebedf0">
      <div class="my_cell_label">
        <span>收货人</span>
      </div>
      <div class="my_cell_value">
        <input v-model="receiver" type="text" placeholder="请输入收件人姓名">
      </div>
    </div>
    <div class="my_cell px1-bottom-ebedf0">
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
      <div class="btn mbtn" @click="saveAdress">保存</div>
    </div>
    
    <van-popup v-model="selectAddressShow" position="bottom">
      <van-area @cancel="selectAddressShow=false" @confirm="addressConfirm" :area-list="areaList"/>
    </van-popup>
  </div>
</template>

<script>
import { Field, Cell, CellGroup, Popup, Area } from "vant";
import areaList from "../../../common/area.js";
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
    "van-cell-group": CellGroup,
    "van-popup":Popup,
    "van-area":Area
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
.btn_wrapper{
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%)
}
.mbtn{
  margin-top:20px;
  font-family:PingFangSC-Semibold,PingFang SC;
font-weight:600;
color:rgba(255,87,38,1);
background:rgba(255,203,62,1);

}
.my_cell {
  position: relative;
  display: flex;
  width: 100%;
  overflow: hidden;
  box-sizing: border-box;
  color: #323233;
  font-size: 14px;
  //line-height: 24px;
  background-color: #fff;
  padding: 13px 15px;
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

