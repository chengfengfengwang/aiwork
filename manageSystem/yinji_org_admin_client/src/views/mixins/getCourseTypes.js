var myMixin = {
    data() {
        return {
            courseTypes: []
        }
    },
    created() {
        this.getCourseTypes();
    },
    methods: {
        getCourseTypes() {
            this.axios
                .post(`${process.env.AGENTSV9}/goods/multi`,{
                    ids:this.$store.getters.lessonTypes
                })
                .then(res => {
                    this.courseTypes = res.data;
                });
        },
    }
}
export default myMixin