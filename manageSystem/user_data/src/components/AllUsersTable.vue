<template>
  <div>
    <div class="table_top_tool">
      <span>手机号：</span>
      <Input v-model="tel" placeholder="输入手机号" style="width: 200px"/>
      <Select v-model="is_pay" placeholder="是否付费" style="width:200px">
        <Option value="true">是</Option>
        <Option value="false">否</Option>
      </Select>
      <span>注册日期：</span>
      <DatePicker v-model="startRegtime" type="date" placeholder="注册开始日期" style="width: 200px"></DatePicker>
      <span>截止注册日期：</span>
      <DatePicker v-model="endRegtime" type="date" placeholder="注册结束日期" style="width: 200px"></DatePicker>
      <span>最后登录日期：</span>
      <DatePicker
        v-model="startLastlogintime"
        type="date"
        placeholder="最后登录日期"
        style="width: 200px"
      ></DatePicker>
      <span>截止登录日期：</span>
      <DatePicker v-model="endLastlogintime" type="date" placeholder="截止登录日期" style="width: 200px"></DatePicker>
      <Button type="info" @click="getTableData" style="margin-right:2px">搜索</Button>
      <Button type="info" @click="resetTableData" style="margin-right:10px">重置</Button>
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
</template>
<script>
export default {
  data() {
    return {
      columns: [
        { type: "selection" },
        {
          title: "手机号",
          key: "tel",
          render: (h, params) => {
            return h("span", params.row._source.tel);
          }
        },
        {
          title: "昵称",
          key: "nickname",
          render: (h, params) => {
            return h("span", params.row._source.nickname);
          }
        },
        {
          title: "uid",
          key: "uid",
          render: (h, params) => {
            return h("span", params.row._source.uid);
          }
        },
        {
          title: "注册时间",
          key: "regtime",
          render: (h, params) => {
            return h("span", params.row._source.regtime);
          }
        }
      ],
      tableData: [],
      page: 0,
      pageSize: 10,
      total: 0,
      selected: this.fromArr,
      curPageSelected: [],
      loading: true,
      sTel: "",
      sSex: 0,
      sBeginTime: 0,
      sEndTime: endTime,
      sDevice: "",
      /////
      tel: "",
      is_pay: "",
      startRegtime: "",
      endRegtime: "",
      startLastlogintime: "",
      endLastlogintime: ""
    };
  },
  computed: {
    start_regtime() {
      if (this.startRegtime === "") {
        return "";
      } else {
        return formatTimeY(this.startRegtime.valueOf() / 1000);
      }
    },
    end_regtime() {
      if (this.endRegtime === "") {
        return "";
      } else {
        return formatTimeY(this.endRegtime.valueOf() / 1000);
      }
    },
    start_lastlogintime() {
      if (this.startLastlogintime === "") {
        return "";
      } else {
        return formatTimeY(this.startLastlogintime.valueOf() / 1000);
      }
    },
    end_lastlogintime() {
      if (this.endLastlogintime === "") {
        return "";
      } else {
        return formatTimeY(this.endLastlogintime.valueOf() / 1000);
      }
    }
  },
  created() {
    this.getTableData();
  },
  methods: {
    resetTableData() {
      this.tel = "";
      this.is_pay = "";
      this.startRegtime = "";
      this.endRegtime = "";
      this.getTableData();
    },
    allTimeSelectChange(value) {
      this.sBeginTime = new Date(value[0]).valueOf() / 1000;
      this.sEndTime = new Date(value[1]).valueOf() / 1000;
      this.page = 0;
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
        process.env.YINGCHUN
      }/v3/users/grouping/new_show_user/?page=${this.page}&size=${
        this.pageSize
      }&tel=${this.tel}&is_pay=${this.is_pay}&start_regtime=${
        this.start_regtime
      }&end_regtime=${this.end_regtime}&start_lastlogintime=${
        this.start_lastlogintime
      }&end_lastlogintime=${this.end_lastlogintime}`;
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
      console.log("handleSelect");
      //添加到已选项
      this.selected.push(row);
    },
    handleSelectAll(selection) {
      console.log("handleSelectAll");
      //数组合并，有可能用户先选择了某几项，已经被我们push进去，因此数组合并需要去重一下
      this.selected = uniqBy(this.selected.concat(selection), "id");
    },
    handleCancelSelectAll(selection) {
      //从已选项中移除当页数据
      this.selected = differenceBy(this.selected, this.tableData, "id");
    },
    //把源数据加上_checked字段，遍历已选项数据，更新选中状态
    updateChecked() {
      console.log("updateChecked---");
      console.log(this.selected);
      for (var i = 0; i < this.tableData.length; i++) {
        this.tableData[i]._checked = false;
        for (var j = 0; j < this.selected.length; j++) {
          if (this.selected[j].id === this.tableData[i].id) {
            this.tableData[i]._checked = true;
          }
        }
      }
      console.log(this.tableData);
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
