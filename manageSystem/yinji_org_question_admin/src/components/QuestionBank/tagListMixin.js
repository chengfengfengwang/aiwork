export default {
    data() {
        return {
            tagList1: [],
            tagList2: [],
            tagList3: [],
            tagList4: [],
            tagList: [],
            tagListAll:[]
        }
    },
    methods: {
        getTagList() {
            this.axios.get(process.env.JINKANG + "/${process.env.VERSION}/question_bank/").then(res => {
                this.tagList1 = res.data.abc;
                this.tagList2 = res.data.def;
                this.tagList3 = res.data.ghi;
                this.tagList4 = res.data.jkl;
                this.tagList = [this.tagList1, this.tagList2, this.tagList3, this.tagList4];
                this.tagList.forEach(e=>{
                    e.forEach(el=>this.tagListAll.push(el))
                })
            });
        }
    },
    mounted() {
        this.getTagList()
    }
}