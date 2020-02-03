<template>
  <div class="card_wrapper">
    <div class="close_icon" @click="$emit('delete-grid')">
      <img src="./../assets/close.png" alt="删除卡片">
    </div>
    <GridItem :gridId="grid.id" :gridText="grid.left" position="左边" v-on:upload="upload('left',$event)"></GridItem>
    <GridItem :gridId="grid.id" :gridText="grid.right" position="右边" v-on:upload="upload('right',$event)"></GridItem>
  </div>
</template>
<script>
import GridItem from "./GridItem";
import { mapState, mapActions } from 'vuex';
export default {
  props: ['grid'],
  data() {
    return {
      gridData: {}
    };
  },
  components: {
    GridItem
  },
  mounted(){
      this.gridData = JSON.parse(JSON.stringify(this.grid))
  },
  methods: {
    ...mapActions(['editCard','editGrid']),
    upload(type, p) {
      this.$set(this.gridData, type, p);
      this.editGrid({
          id:this.grid.id,
          data:this.gridData
      })
    },
    radioChange(e) {
      this.$set(this.gridData, "status", e);
      this.editCard({
          id:this.grid.id,
          data:this.gridData
      })
    }
  }
};
</script>
<style lang="less" scoped>
.close_icon {
  display: none;
  position: absolute;
  right: 50px;
  top: 0;
  cursor: pointer;
  img {
    width: 20px;
  }
}
.card_wrapper:hover {
  .close_icon {
    display: block;
  }
  //background-color: rgba(0, 0, 0, 0.2)
}
</style>

