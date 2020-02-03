<template>
  <div class="card_wrapper">
    <div class="show_area">
      <div>
        <div>左边：</div>
        <TopicBasicItem :content="grid.left"></TopicBasicItem>
      </div>
      <div>
        <div>右边：</div>
        <TopicBasicItem :content="grid.right"></TopicBasicItem>
      </div>
      <div class="tool_row">
        <Button @click="editShow=!editShow">编辑</Button>
        <Button @click="$emit('delete-grid')">删除</Button>
      </div>
    </div>
    <div class="edit_area" v-show="editShow">
      <GridItem
        :gridId="grid.id"
        :gridText="grid.left"
        position="左边"
        v-on:upload="upload('left',$event)"
      ></GridItem>
      <GridItem
        :gridId="grid.id"
        :gridText="grid.right"
        position="右边"
        v-on:upload="upload('right',$event)"
      ></GridItem>
    </div>
  </div>
</template>
<script>
import GridItem from "./NewGridItem";
import { mapState, mapActions } from "vuex";
import TopicBasicItem from "./../components/TopicBasicItem";

export default {
  props: ["grid"],
  data() {
    return {
      gridData: {},
      editShow: false
    };
  },
  components: {
    GridItem,
    TopicBasicItem
  },
  mounted() {
    this.gridData = JSON.parse(JSON.stringify(this.grid));
  },
  methods: {
    ...mapActions(["editGrid"]),
    upload(type, p) {
      this.$set(this.gridData, type, p);
      this.editGrid({
        id: this.grid.id,
        data: this.gridData
      });
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
.edit_area {
  background-color: #f2f2f2;
}
.tool_row {
  visibility: hidden
}
.card_wrapper:hover {
  .tool_row {
    visibility: visible;
    background-color: #f9f9f9;
  }
}
</style>

