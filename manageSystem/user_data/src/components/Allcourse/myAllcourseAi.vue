<template>
  <div>
    <!-- <Modal  v-model="modalShow" width="760" :styles="{top: '0px'}">
      <p slot="header" style>
        <span>用户列表</span>
    </p>-->

    <div class="table_top_tool">
      <div style="margin-bottom:5px;">
        <span>乐器类型：</span>
        <Select v-model="instrument_type" placeholder style="width:200px">
          <Option
            v-for="instrument in instrumentsLetter"
            :value="instrument.value"
            :key="instrument.value"
          >{{instrument.name}}</Option>
        </Select>
        <Button type="info" @click="getTableData" style="margin-right:2px">搜索</Button>
      </div>
      <!-- <div style="margin-bottom:5px;">
          <Button type="info" @click="resetTableData" style="margin-right:10px">重置</Button>
      </div>-->
    </div>
    <!-- <div>{{selected}}</div> -->
    <div style="padding:5px 0;">
      <Tag
        type="dot"
        color="primary"
        v-for="item in selected"
        :key="item.id"
        closable
        @on-close="handleCloseTag(item.id)"
      >{{item.name}}</Tag>
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

export default {
  props: {
    //id列表
    fromDataArr: {
      type: Array,
      default: function() {
        return [];
      }
    },
    value: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      instruments: this.instrumentsLetter,
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
      selected: this.fromDataArr,
      loading: true,
      instrument_type: "guitar",
      nameKey: "name",
      idKey: "goods_id"
    };
  },
  created() {
    console.log(this.instrumentsLetter)
    this.getTableData();
  },
  methods: {
    handleCloseTag(id) {
      let myArr = JSON.parse(JSON.stringify(this.selected));
      remove(myArr, n => {
        return n.id === id;
      });
      this.selected = myArr;
      this.getTableData();
    },
    resetTableData() {
      this.instrument_type = "";
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
      var url = `http://iguitar.immusician.com:2525/v3/courses?page=${
        this.page
      }&size=${this.pageSize}&keyword=&instrument_type=${
        this.instrument_type
      }&level=all&sort=_id,1&online=true`;
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
      let myArr = JSON.parse(JSON.stringify(this.selected));
      remove(myArr, n => {
        return n.id === row[this.idKey];
      });
      this.selected = myArr;
    },
    handleSelect(selection, row) {
      //添加到已选项
      this.selected.push({
        id: row[this.idKey],
        name: row[this.nameKey]
      });
    },
    handleSelectAll(selection) {
      //数组合并，有可能用户先选择了某几项，已经被我们push进去，因此数组合并需要去重一下
      this.selected = uniqBy(
        this.selected.concat(
          selection.map(e => {
            return {
              id: e[this.idKey],
              name: e[this.nameKey]
            };
          })
        ),
        "id"
      );
      //console.log(this.selected)
    },
    handleCancelSelectAll(selection) {
      //从已选项中移除当页数据
      this.selected = differenceBy(
        this.selected,
        this.tableData.map(e => {
          return {
            id: e[this.idKey],
            name: e[this.nameKey]
          };
        }),
        "id"
      );
      console.log(this.selected);
    },
    //把源数据加上_checked字段，遍历已选项数据，更新选中状态
    updateChecked() {
      console.log("updateChecked---");
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i]._checked = false;
        for (var j = 0; j < this.selected.length; j++) {
          if (this.selected[j].id == this.tableData[i][this.idKey]) {
            this.tableData[i]._checked = true;
          }
        }
      }
    },
    submit() {
      this.selected = uniqBy(this.selected, "id");
      return this.selected;
      //return this.selected.map(e => e.id);
    }
  },
  watch: {
    value(newVal) {
      this.modalShow = newVal;
    },
    fromDataArr(arr) {
      this.selected = arr;
    }
  }
};
</script>


