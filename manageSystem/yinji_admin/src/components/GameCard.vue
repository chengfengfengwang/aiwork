<template>
  <div class="card_wrapper">
    <div class="show_area">
      <div>
        <div>上部：</div>
        <TopicBasicItem :content="card.topic"></TopicBasicItem>
      </div>
      <div>
        <div>下部：</div>
        <TopicBasicItem :content="card.answer"></TopicBasicItem>
      </div>
      <div>
        <div>提示答案：</div>
        <TopicBasicItem :content="card.respondence"></TopicBasicItem>
      </div>
      <div>
        <div>默认答案：</div>
        <TopicBasicItem :content="card.status"></TopicBasicItem>
      </div>
      <div class="tool_row">
        <Button @click="editShow=!editShow">编辑</Button>
        <Button @click="$emit('delete-card')">删除</Button>
      </div>
    </div>

    <div class="edit_area" v-show="editShow">
      <CardItem
        :cardId="card.id"
        :cardText="card.topic"
        position="上部"
        v-on:upload="upload('topic',$event)"
      ></CardItem>
      <CardItem
        :cardId="card.id"
        :cardText="card.answer"
        position="下部"
        v-on:upload="upload('answer',$event)"
      ></CardItem>
      <span>答案：</span>
      <RadioGroup style="margin-left:2em" @on-change="radioChange" :value="card.status+''">
        <Radio label="true">正确</Radio>
        <Radio label="false">不正确</Radio>
      </RadioGroup>
      <CardItem
        style
        :cardId="card.id"
        :cardText="card.respondence"
        v-on:upload="upload('respondence',$event)"
        position="展示答案"
      ></CardItem>
    </div>
  </div>
</template>
<script>
import CardItem from "./GameCardItem";
import TopicBasicItem from "./../components/TopicBasicItem";
import { mapState, mapActions } from "vuex";
export default {
  props: ["card"],
  data() {
    return {
      cardAnswer: "",
      cardData: {},
      editShow:false
    };
  },
  components: {
    CardItem,
    TopicBasicItem
  },
  mounted() {
    console.log("card初始化mounted");
    this.cardData = JSON.parse(JSON.stringify(this.card));
  },
  methods: {
    ...mapActions(["editCard"]),
    upload(type, p) {
      this.$set(this.cardData, type, p);
      this.editCard({
        id: this.card.id,
        data: this.cardData
      });
    },
    radioChange(e) {
      this.$set(this.cardData, "status", e);
      this.editCard({
        id: this.card.id,
        data: this.cardData
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

