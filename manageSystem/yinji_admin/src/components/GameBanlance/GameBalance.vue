<template>
  <div>
    <GameBalanceItem v-for="(item,index) in myArr" :key="index" :data="item"></GameBalanceItem>
    <Button type="info" @click="myArr.push({url:'',value:''})">添加音符</Button>
  </div>
</template>
<script>
import GameBalanceItem from "./GameBalanceItem";
export default {
  props: {
    arr: {
      default: []
    }
  },
  data() {
    return {
      myArr: this.arr,
      resultArr:[]
    };
  },
  mounted() {
      
  },
  components: {
    GameBalanceItem
  },
  methods: {
    submit() {
      this.$children.forEach((e)=>{
        // console.log('----')
        // console.log(e.$options.name)
        // console.log('----')
        if(e.$options.name === 'GameBalanceItem'){
          //console.log(e.myData);
          this.resultArr.push(e.myData)
        }
      })
      return this.resultArr
    }
  },
  watch:{
      arr(){
          this.myArr = this.arr
      }
  }
};
</script>
