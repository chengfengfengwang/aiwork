var myMixin = {
    data() {
        return {
            courseList: []
        }
    },
    computed:{
        formCourseApplyList(){
            var myCourseList = JSON.parse(JSON.stringify(this.courseList));
            myCourseList.forEach((e)=>{
                if(e.id==='-1'){
                    myCourseList.shift()
                }
            })
            return myCourseList
        }
    },
    created() {
        if(this.from !== 'orgClassList'){
            this.getCourses();
        }
    },
    methods: {
        getCourses() {
            this.axios
                .post(`${process.env.AGENTSV9}/class_info/get_course_apply`, {
                    institutions_id: this.$store.state.userInfo.institutions_id
                })
                .then(res => {
                    this.courseList = res.data;
                    this.courseList.unshift({ id: "-1", name: "全部" });
                });
        },
    }
}
export default myMixin