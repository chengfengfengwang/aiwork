<template>
  <div>
    <Modal draggable v-model="modalShow" width="1160" :styles="{top: '0px'}">
      <p slot="header" style>
        <span>用户列表</span>
      </p>
      <div @click="modalAShow= true ">
        <div>
          <span>性别：</span>
          <Select
            @on-change="getUserList"
            v-model="sSex"
            placeholder="选择性别"
            style="width:200px"
          >
            <Option :value="3">男</Option>
            <Option :value="4">女</Option>
            <Option :value="2">未知</Option>
          </Select>
          <span>手机号：</span>
          <Input  v-model="sTel" placeholder="请输入手机号" style="width:200px"></Input>
          <span>设备类型：</span>
          <Input @on-change="getUserList" v-model="sDevice" placeholder="设备类型" style="width:200px"></Input>
          <span>日期：</span>
          <DatePicker
            type="daterange"
            placement="bottom-end"
            placeholder="按日期筛选"
            style="width: 200px"
            @on-change="allTimeSelectChange"
          ></DatePicker>
          <Button @click="getUserList">查询</Button>
        </div>

        <Table
          @on-select-all-cancel="handleCancelSelectAll"
          @on-select-all="handleSelectAll"
          @on-select="handleSelect"
          @on-select-cancel="handleCancel"
          height="550"
          border
          ref="selection"
          :loading="loading"
          :columns="columns"
          :data="tableData"
        ></Table>
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
      <div slot="footer">
        <Button @click="modalASubmit" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
const uniqBy = require("lodash.uniqby");
const remove = require("lodash.remove");
const differenceBy = require("lodash.differenceby");
const endTime = parseInt(new Date().valueOf()/1000);
export default {
  props: {
    fromArr: {
      type: Array,
      default: function() {
        return [];
      }
    },
    value: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      columns: [
        { type: "selection" },
        {
          title: "用户id",
          key: "id"
        },
        {
          title: "昵称",
          key: "nickname"
        },
        {
          title: "设备",
          key: "device_model"
        },
        {
          title: "注册时间",
          key: "registered_at_"
        },
         {
          title: "最后登录",
          key: "last_logined_at_"
        }
      ],
      tableData: [],
      modalShow: this.value,
      page: 0,
      pageSize: 10,
      total: 0,
      selected: this.fromArr,
      curPageSelected: [],
      loading: true,
      sTel:'',
      sSex:0,
      sBeginTime:0,
      sEndTime:endTime,
      sDevice:''
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    allTimeSelectChange(value) {
      this.sBeginTime = new Date(value[0]).valueOf()/1000;
      this.sEndTime = new Date(value[1]).valueOf()/1000;
      this.page = 0;
      this.getUserList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getUserList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getUserList();
    },
    getUserList() {
      var url = `${process.env.YINGCHUN}/v3/users/grouping/show_user_many/?page=${
        this.page
      }&size=${
        this.pageSize
        }&start_time=${
        this.sBeginTime
        }&end_time=${
          this.sEndTime
        }&sex=${
          this.sSex
        }&device_model=${
          this.sDevice
        }&tel=${
          this.sTel
        }`;
      //return
      this.loading = true;
      
      this.axios.get(url).then(res => {
        this.loading = false;
        this.tableData = res.data;
        this.total = res.paging.total;
        this.updateChecked();
      });
    },
    handleCancel(selection, row) {
      //从已选项中去除取消项
      remove(this.selected, n => {
        return n.id === row.id;
      });
    },
    handleSelect(selection, row) {
      console.log('handleSelect')
      //添加到已选项
      this.selected.push(row);
    },
    handleSelectAll(selection) {
      console.log('handleSelectAll')
      //数组合并，有可能用户先选择了某几项，已经被我们push进去，因此数组合并需要去重一下
      this.selected = uniqBy(this.selected.concat(selection), "id");
    },
    handleCancelSelectAll(selection) {
      //从已选项中移除当页数据
      this.selected = differenceBy(this.selected, this.tableData, "id");
    },
    //把源数据加上_checked字段，遍历已选项数据，更新选中状态
    updateChecked() {
      console.log('updateChecked---')
      console.log(this.selected)
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i]._checked = false;
        for (var j = 0; j < this.selected.length; j++) {
          if (this.selected[j].id === this.tableData[i].id) {
            this.tableData[i]._checked = true;
          }
        }
      }
      console.log(this.tableData)
    },
    modalASubmit() {
      this.selected = uniqBy(this.selected, "id");
      //return;
      this.$emit("selected", this.selected.map(e => e.id));
      this.modalShow = false;
    }
  },
  watch: {
    value(newVal) {
      this.modalShow = newVal;
    },
    fromArr(arr) {
      this.selected = arr;
    }
  }
};
</script>


