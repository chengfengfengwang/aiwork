export default {
    data() {
        return {
            groupList: [],
        }
    },
    methods: {
        getGroupList() {
            this.axios.get(`${process.env.JINKANG}/v3/group`).then(res => {
                this.groupList = res.data;
            })
        },
    },
    mounted() {
        //     <FormItem label="班级归属老师">
        //     <Select v-model="formValidate.user_id" style="width:200px">
        //       <Option v-for="user in userList" :value="user.uid" :key="user.uid">{{ user.username }}</Option>
        //     </Select>
        //   </FormItem>
        this.getGroupList();
    }
}