<style scoped>
.expand-row {
  margin-bottom: 16px;
}
</style>
<template>
    <div>
        <div v-for="(item,index) in list" :key="index">
            <Row class="expand-row">
                <Col span="8">
                    <span class="expand-key">{{item.item_type}}:</span>
                    <span class="expand-value">{{ item.item_name }}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key">购买方式:</span>
                    <span class="expand-value">{{ item.manual }}</span>
                </Col>
                <Col span="8">
                    <span class="expand-key">购买日期:</span>
                    <span class="expand-value">{{ item.paid_at }}</span>
                </Col>
            </Row>
        </div>
    </div>
</template>
<script>
export default {
  props: {
    list: Array
  }
};
</script>