<template>
  <div>
    {{data}}{{values}}
    <Table :columns="columns" :data="data">
      <template v-for="(item,idx) in columns"  slot-scope="{ row, column, index }" :slot="item.title">
       <Input :key="idx" type="text" v-model="values[idx]" v-if="editIndex === index"/>
        <span :key="idx" v-else>{{ row[item.title] }}</span>
      </template>
      <!-- <template slot-scope="{ row, index }" slot="A">
        <Input type="text" v-model="editAge" v-if="editIndex === index"/>
        <span v-else>{{ row.A }}</span>
      </template>
      <template slot-scope="{ row, index }" slot="B">
        <Input type="text" v-model="editAge" v-if="editIndex === index"/>
        <span v-else>{{ row.B }}</span>
      </template> -->
      <!-- <template slot-scope="{ row, index }" slot="age">
        <Input type="text" v-model="editAge" v-if="editIndex === index"/>
        <span v-else>{{ row.age }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="birthday">
        <Input type="text" v-model="editBirthday" v-if="editIndex === index"/>
        <span v-else>{{ getBirthday(row.birthday) }}</span>
      </template>

      <template slot-scope="{ row, index }" slot="address">
        <Input type="text" v-model="editAddress" v-if="editIndex === index"/>
        <span v-else>{{ row.address }}</span>
      </template>-->

      <template slot-scope="{ row, index }" slot="action">
        <div v-if="editIndex === index">
          <Button @click="handleSave(index)">保存</Button>
          <Button @click="editIndex = -1">取消</Button>
        </div>
        <div v-else>
          <Button @click="handleEdit(row, index)">操作</Button>
        </div>
      </template>
    </Table>
  </div>
</template>
<script>
// const excelHeaders = [
//   "A",
//   "B",
//   "C",
//   "D",
//   "E",
//   "F",
//   "G",
//   "H",
//   "I",
//   "J",
//   "K",
//   "L",
//   "M",
//   "N",
//   "O",
//   "P",
//   "Q",
//   "R",
//   "S",
//   "T",
//   "U",
//   "V",
//   "W",
//   "X",
//   "Y",
//   "Z"
// ];
const excelHeaders = [
  "A",
  "B",
];
export default {
  data() {
    return {
      msg: "hello world",
      values:['a','b','c','d'],
      columns: [
        {
          title: "A",
          slot: "A"
        },
        {
          title: "B",
          slot: "B"
        },
        {
          title: "操作",
          slot: "action"
        }
      ],
      data: [
        {
          A: "王小明",
          B: 18,
          C: "919526400000",
          D: "北京市朝阳区芍药居"
        }
        // {
        //   name: "张小刚",
        //   age: 25,
        //   birthday: "696096000000",
        //   address: "北京市海淀区西二旗"
        // },
        // {
        //   name: "李小红",
        //   age: 30,
        //   birthday: "563472000000",
        //   address: "上海市浦东新区世纪大道"
        // },
        // {
        //   name: "周小伟",
        //   age: 26,
        //   birthday: "687024000000",
        //   address: "深圳市南山区深南大道"
        // }
      ],
      editIndex: -1, // 当前聚焦的输入框的行数
      editName: "", // 第一列输入框，当然聚焦的输入框的输入内容，与 data 分离避免重构的闪烁
      editAge: "", // 第二列输入框
      editBirthday: "", // 第三列输入框
      editAddress: "" // 第四列输入框
    };
  },
  mounted() {
    // this.columns = excelHeaders.map(e => {
    //   return { title: e, slot: e };
    // });
    // console.log(this.columns)
  },
  components: {},
  methods: {
    handleEdit(row, index) {
      this.editName = row.name;
      this.editAge = row.age;
      this.editAddress = row.address;
      this.editBirthday = row.birthday;
      this.editIndex = index;
    },
    handleSave(index) {
      this.data[index].name = this.editName;
      this.data[index].age = this.editAge;
      this.data[index].birthday = this.editBirthday;
      this.data[index].address = this.editAddress;
      this.editIndex = -1;
    },
    getBirthday(birthday) {
      const date = new Date(parseInt(birthday));
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      return `${year}-${month}-${day}`;
    }
  }
};
</script>