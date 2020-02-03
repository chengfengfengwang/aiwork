<template>
  <div>
    <Modal draggable v-model="modalShow"  width="560" :styles="{top: '0px'}">
      <p slot="header" style>
        <span>已配置游戏列表</span>
      </p>
      <div @click="modalAShow= true ">
        <div>
           <span style="margin-left:5px">按课程名称筛选：</span>
          <Input
            style="width:200px"
            @input="keywordChange"
            v-model="lessonName"
            placeholder="输入课程名称如：国院第二课"
          />
        </div>
        <Table
          @on-selection-change="selectionChange"
          height="550"
          border
          ref="selection"
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
        <Button @click="modalASubmit()" type="primary">确定</Button>
        <Button @click="modalShow=false">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  props: {
    from: {
      default: function() {
        return 'self';
      }
    },
    selected: {
      type: Array,
      default: function() {
        return [];
      }
    },
    value: {
      type: Boolean,
      default: false
    },
    allGameData:{
      type: Array,
      default: function() {
        return [];
      }
    },
    allGameDataTotal:{

    }
  },
  data() {
    return {
      lessonName: "",
      columns: [
        {
          type: "selection",
          width: 60,
          align: "center"
        },
        {
          title: "game_id",
          key: "game_id"
        },
        {
          title: "游戏名称",
          key: "name"
        },
        {
          title: "标记",
          key: "sign"
        }
      ],
      tableData: this.allGameData,
      selections: this.selected,
      modalShow: this.value,
       page: 0,
      pageSize: 10,
      total: this.allGameDataTotal,
      tempSelect:[]
    };
  },
  created() {
    this.getGameList();
    this.updateChecked();
  },
  methods: {
    keywordChange() {
      this.page = 0;
      this.getGameList();
    },
    pageChange(page) {
      this.page = page - 1;
      this.getGameList();
    },
    pageSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.page = 0;
      this.getGameList();
    },
    getGameList() {
      this.axios
        .get(`${process.env.JINKANG}/${process.env.VERSION}/ranking/get_all_game/?page=${this.page}&size=${
            this.pageSize
          }&is_test=${this.from==='test'?1:0}&name=${this.lessonName}`)
        .then(res => {
          this.tableData = res.data;
          this.updateChecked();
          this.total = res.total
        });
    },
    selectionChange(allSelection,select) {
      // console.log(allSelection,select);
      // this.tempSelect = allSelection;
      //this.selections.push(select);
      this.ifPush(allSelection,this.selections);
      console.log(this.selections)
    },
    ifPush(arr1,arr2){
      //遍历arr1 推到arr2里面
      for(var i=0;i<arr1.length;i++){
        var onOff = true
        for(var j=0;j<arr2.length;j++){
          if(arr1[i].game_id===arr2[j].game_id){
            onOff = false
          }
        }
        if(onOff){
          arr2.push(arr1[i])
        }
      }
    },
    ifDelete(arr1,arr2){
      //遍历arr1 推到arr2里面
      for(var i=0;i<arr1.length;i++){
        var onOff = true
        for(var j=0;j<arr2.length;j++){
          if(arr1[i].game_id===arr2[j].game_id){
            onOff = false
          }
        }
        if(onOff){
          arr2.push(arr1[i])
        }
      }
    },
    modalASubmit() {
      //   const ids = this.selections.map(e => {
      //     return e.game_id;
      //   });
      this.$emit("update:selected", this.selections);
      this.modalShow = false;
    },
    updateChecked() {
      var myTableData = JSON.parse(JSON.stringify(this.tableData));
      this.selectedData = [];
      for (var i = 0; i < myTableData.length; i++) {
        myTableData[i]._checked = false;
        for (var j = 0; j < this.selected.length; j++) {
          if (this.selected[j].game_id === myTableData[i].game_id) {
            myTableData[i]._checked = true;
            this.selectedData.push(myTableData[i])
          }
        }
      }
      this.tableData = myTableData;
      // console.log('----')
      // console.log(this.selectedData)
      // console.log('----')
    }
  },
  watch: {
    value() {
      this.modalShow = this.value;
    },
    modalShow() {
      this.$emit("input", this.modalShow);
    },
    selected() {
      this.selections = this.selected;
      this.updateChecked();
    },
    allGameDataTotal(){  
      this.total = this.allGameDataTotal
    },
    allGameData(){  
      this.tableData = this.allGameData
    }
  }
};
</script>

