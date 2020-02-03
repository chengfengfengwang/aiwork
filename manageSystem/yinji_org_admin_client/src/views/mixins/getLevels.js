var myMixin = {
    data() {
        return {
            levelList: []
        }
    },
    created() {
        this.getLevelList();
    },
    methods: {
        getLevelList() {
            this.axios
                .get(`${process.env.AGENTSV1}/proxy_stats/level`)
                .then(res => {
                    this.levelList = res.data;
                    this.disableLevel()
                });
        },
        disableLevel(){
            const level = this.$store.getters.level;
            this.levelList = this.levelList.map(e=>{
                if(e.key<level){
                    e.disabled = true
                }
                return e
            })
        }
    }
}
export default myMixin