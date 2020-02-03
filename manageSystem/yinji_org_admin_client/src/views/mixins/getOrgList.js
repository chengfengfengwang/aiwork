var myMixin = {
    data() {
        return {
            orgList: []
        }
    },
    computed:{
        formOrgList(){
            var myOrgList = JSON.parse(JSON.stringify(this.orgList));
            myOrgList.forEach((e)=>{
                if(e.id==='-1'){
                    myOrgList.shift()
                }
            })
            return myOrgList
        }
    },
    created() {
        if(this.$store.getters.role===3){
            this.getOrgList();
        }
        
    },
    methods: {
        getOrgList() {
            this.axios
              .get(`${process.env.AGENTSV9}/institutional/get_institutions_name`)
              .then(res => {
                this.orgList = res.data.data;
                this.orgList.unshift({ id: "-1", institutions_name: "全部" });
              });
          },
    }
}
export default myMixin