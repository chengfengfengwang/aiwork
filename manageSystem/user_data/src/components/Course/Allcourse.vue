<template>
  <div>
    <!-- <Modal draggable v-model="modalShow" width="1160" :styles="{top: '0px'}">
      <p slot="header" style>
        <span>用户列表</span>
    </p>-->
    <div>
      <div class="table_top_tool">
        <div style="margin-bottom:5px;">
          <span>乐器类型：</span>
          <Select v-model="instrument_type" placeholder="" style="width:200px">
            <Option v-for="instrument in instruments" :value="instrument.value" :key="instrument.value">{{instrument.name}}</Option>
          </Select>
          <Button type="info" @click="getTableData" style="margin-right:2px">搜索</Button>
        </div>
        <!-- <div style="margin-bottom:5px;">
          <Button type="info" @click="resetTableData" style="margin-right:10px">重置</Button>
        </div> -->
      </div>
      <Table
        @on-select-all-cancel="handleCancelSelectAll"
        @on-select-all="handleSelectAll"
        @on-select="handleSelect"
        @on-select-cancel="handleCancel"
        height="400"
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
    <!-- <div slot="footer">
        <Button @click="submit" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>-->
  </div>
</template>
<script>
import { formatTime, formatTimeY } from "./../../common/util.js";
const uniqBy = require("lodash.uniqby");
const uniq = require("lodash.uniq");
const remove = require("lodash.remove");
const differenceBy = require("lodash.differenceby");
const endTime = parseInt(new Date().valueOf() / 1000);
//guitar, ukulele, kalimba, djembe, piano
const instruments=[
  {  
    name:'音乐壳',
    value:'music_basis'
  },
  {  
    name:'吉他',
    value:'guitar'
  },
  {  
    name:'尤克里里',
    value:'ukulele'
  },
  {  
    name:'卡林吧',
    value:'kalimba'
  },
  {  
    name:'非洲鼓',
    value:'djembe'
  },
  {  
    name:'钢琴',
    value:'piano'
  }
]
export default {
  props: {
    //id列表
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
      instruments:instruments,
      columns: [
        { type: "selection", width: 70 },
        {
          title: "课程名称",
          key: "name"
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
   
      instrument_type:'music_basis'
    };
  },
  created() {
    this.getTableData();
  },
  methods: {
    resetTableData() {
      this.instrument_type="";
      this.getTableData();
    },
  
    pageChange(page) {
      this.page = page - 1;
      this.getTableData();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getTableData();
    },
    getTableData() {
      var url = `${
        process.env.XIAOPO
      }/v1/courses?online=true&page=${this.page}&size=${
        this.pageSize
      }
      &instrument_type=${this.instrument_type}`;
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
        return n === row.id;
      });
    },
    handleSelect(selection, row) {
      //添加到已选项
      this.selected.push(row.id);
    },
    handleSelectAll(selection) {
      //数组合并，有可能用户先选择了某几项，已经被我们push进去，因此数组合并需要去重一下
      console.log('全选')
      console.log(this.selected.concat(selection.map(e=>e.id)))
      this.selected = uniq(this.selected.concat(selection.map(e=>e.id)));
    },
    handleCancelSelectAll(selection) {
      //从已选项中移除当页数据
      this.selected = differenceBy(this.selected, this.tableData.map(e=>e.id));
    },
    //把源数据加上_checked字段，遍历已选项数据，更新选中状态
    updateChecked() {
      console.log("updateChecked---");
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i]._checked = false;
        for (var j = 0; j < this.selected.length; j++) {
          if (this.selected[j] === this.tableData[i].id) {
            this.tableData[i]._checked = true;
          }
        }
      }
    },
    submit() {
      this.selected = uniqBy(this.selected, "id");
      return this.selected.map(e => e.id);
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


