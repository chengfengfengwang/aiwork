<template>
  <div class="row">
    <div class="col-2">
      <button class="btn btn-secondary button" @click="sort">
        To original order
      </button>
    </div>

    <div class="col-6">
      <h3>Transition</h3>
      <draggable
        class="list-group"
        tag="ul"
        v-model="list"
        v-bind="dragOptions"
        @start="isDragging = true"
        @end="isDragging = false"
      >
        <transition-group type="transition" name="flip-list">
          <li
            class="list-group-item"
            v-for="element in list"
            :key="element.order"
          >
            <img :src="element.name" alt="">
          </li>
        </transition-group>
      </draggable>
    </div>

    <!-- <rawDisplayer class="col-3" :value="list" title="List" /> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
const message = [
  "https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a9e671b9a551f3dedcb2bf64a4eff0ec/4610b912c8fcc3cef70d70409845d688d53f20f7.jpg",
  "https://ss1.baidu.com/-4o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=907f6e689ddda144c5096ab282b6d009/dc54564e9258d1092f7663c9db58ccbf6c814d30.jpg",
  "https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=0cc74ef9a3773912db268361c8188675/9922720e0cf3d7ca810f3732f81fbe096a63a9fd.jpg",
  "https://ss0.baidu.com/94o3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=a62e824376d98d1069d40a31113eb807/838ba61ea8d3fd1fc9c7b6853a4e251f94ca5f46.jpg"
];

export default {
  name: "transition-example",
  display: "Transition",
  order: 6,
  components: {
    draggable
  },
  data() {
    return {
      list: message.map((name, index) => {
        return { name, order: index + 1 };
      })
    };
  },
  methods: {
    sort() {
      this.list = this.list.sort((a, b) => a.order - b.order);
    }
  },
  computed: {
    dragOptions() {
      return {
        animation: 0,
        group: "description",
        disabled: false,
        ghostClass: "ghost"
      };
    }
  }
};
</script>

<style>
.button {
  margin-top: 35px;
}

.flip-list-move {
  transition: transform 0.5s;
}

.no-move {
  transition: transform 0s;
}

.ghost {
  opacity: 0.5;
  background: #c8ebfb;
}

.list-group {
  min-height: 20px;
}

.list-group-item {
  display: inline-block;
  width: 40%;
  cursor: move;
}

.list-group-item i {
  cursor: pointer;
}
img{
  width: 200px;
  height: 200px;
}
</style>
