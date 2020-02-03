<template>
    <div>
        hello test
    </div>
</template>
<script>
export default {
    mounted(){
        this.axios
            .post(`https://yun.tim.qq.com/v5/tlssmssvr/get_template?sdkappid=xxxxx&random=xxxx`)
            .then(res => {
              this.getGradeList();
            });
    }
}
</script>

