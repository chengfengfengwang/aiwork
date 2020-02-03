<template>
  <div>
    {{fullName}}
    <input type="text" v-model="obj.name">
    <input type="text" v-model="obj.age">
  </div>
</template>
<script>
import zc from "../components/ZC/index";
export default {
  data() {
    return {
      obj: {},
      firstName: "Foo",
      lastName: "Bar"
    };
  },
  computed: {
    fullName: {
      // getter
      get: function() {
        return this.firstName + " " + this.lastName;
      },
      // setter
      set: function(newValue) {
        console.log('aaa')
        var names = newValue.split(" ");
        this.firstName = 'zzz';
        // this.lastName = names[names.length - 1];
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.lastName = "qwe";
      //this.obj.gg=15
      // this.obj = {age:14}
    }, 1000);
    setTimeout(() => {
        this.fullName = 'John Doe'
    }, 2000);
  },
  methods: {}
  // watch: {
  //   obj: {
  //     handler(newVal, oldVal) {
  //       console.log('---');
  //       console.log(newVal);
  //     },
  //     deep: true
  //   }
  // }
};
</script>

