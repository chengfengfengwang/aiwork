<template>
  <div>
    {{msg}}
    <i-switch v-model="editShow"  />
  </div>
</template>
<script>
export default {
  data(){
    return{
      editShow:true,
      msg:'asd'
    }
  }
}
</script>

