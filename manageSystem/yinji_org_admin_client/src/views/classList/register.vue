<template>
  <div id="register">
    <Tabs>
      <TabPane label="注册">
        <div>
          <!-- <h2>学生注册二维码</h2> -->
          <img :src="qrSrc" alt>
        </div>
      </TabPane>
      <TabPane label="体验">
        <div>
          <!-- <h2>学生体验二维码</h2> -->
          <img :src="trialQrSrc" alt>
        </div>
      </TabPane>
    </Tabs>
  </div>
</template>
<script>
var QRCode = require("qrcode");

export default {
  data() {
    return {
      qrSrc: "",
      trialQrSrc: ""
    };
  },
  mounted() {
    this.generateQR("asd");
  },
  methods: {
    // generateQR: async text => {
    //     console.log(this)
    //   this.qrSrc = await QRCode.toDataURL(text);
    // }
    generateQR() {
      let qrUrl, trialQrSrc;
      if (process.env.NODE_ENV === "production") {
        qrUrl = `http://cdn.kids-web.immusician.com/yiji-org/regist.html?orgId=${
          this.$store.getters.user.institutions_id
        }`;
        trialQrSrc = `http://cdn.kids-web.immusician.com/yiji-org/regist.html?orgId=${
          this.$store.getters.user.institutions_id
        }&is_trial=1`;
      } else {
        qrUrl = `http://localhost:5556/regist.html?orgId=${
          this.$store.getters.user.institutions_id
        }`;
        trialQrSrc = `http://localhost:5556/regist.html?orgId=${
          this.$store.getters.user.institutions_id
        }&is_trial=1`;
        console.log(qrUrl, trialQrSrc);
      }
      QRCode.toDataURL(qrUrl)
        .then(url => {
          this.qrSrc = url;
        })
        .catch(err => {
          console.error(err);
        });
      QRCode.toDataURL(trialQrSrc)
        .then(url => {
          this.trialQrSrc = url;
        })
        .catch(err => {
          console.error(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
#register {
  h2 {
    margin-bottom: 20px;
  }
  text-align: center;
}
</style>
