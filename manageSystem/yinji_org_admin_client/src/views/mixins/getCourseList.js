var myMixin = {
    data() {
        return {
            courseList: []
        }
    },
    created() {
        this.getCourseList();
    },
    methods: {
        getCourseList() {
            this.axios
                .get(`${process.env.XIAOPO}/v9/courses/all?online=true`)
                .then(res => {
                    this.courseList = res.data.data;
                });
        },
    }
}
export default myMixin