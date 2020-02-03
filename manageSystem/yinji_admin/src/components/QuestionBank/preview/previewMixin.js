export default {
    data() {
        return {
            test: '',
            editShow: false,
        }
    },
    methods: {
        submit() {
            this.$emit('change-score',{
                id:this.question.question_id,
                score:this.question.score
            })
        }
    },
    mounted() {
        
    }
}