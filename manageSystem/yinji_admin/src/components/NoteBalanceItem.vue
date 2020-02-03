<template>
  <div>
    <CheckboxGroup v-model="social">
      <Checkbox label="facebook">
        <Icon type="logo-facebook"></Icon>
        <span>Facebook</span>
      </Checkbox>
      <Checkbox label="github">
        <Icon type="logo-github"></Icon>
        <span>Github</span>
      </Checkbox>
      <Checkbox label="snapchat">
        <Icon type="logo-snapchat"></Icon>
        <span>Snapchat</span>
      </Checkbox>
    </CheckboxGroup>
  </div>
</template>
<script>
export default {
  data() {
    return {
      social: ["facebook", "github"]
    };
  }
};
</script>

