<template>
    <div>
        <input style="width:300px" type="text" v-model="v1">
        <div class="btn" @click="go">跳转</div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            v1:'open://',
        }
    },
    methods:{
        go(){
            location.href = this.v1;
        }
    }
}
</script>
<style lang="less">
input{
    border: 1px solid #333;
    line-height: 40px;
}
.btn{
    line-height: 50px;
    margin-top: 20px;
    text-align: center;
    border: 1px solid #333;
}
</style>

