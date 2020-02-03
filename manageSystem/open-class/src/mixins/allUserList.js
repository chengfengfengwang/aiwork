export default {
    data() {
        return {
            userList: [],
            userListPromise: ''
        }
    },
    methods: {
        getUserList() {
            this.userListPromise =
                new Promise((resolve, reject) => {
                    this.axios.get(`${process.env.JINKANG}/v3/user2/show`).then(res => {
                        this.userList = res.data;
                        resolve()
                    }).catch(err => {
                        reject(err)
                    });
                })

        },
    },
    mounted() {
        //     <FormItem label="班级归属老师">
        //     <Select v-model="formValidate.user_id" style="width:200px">
        //       <Option v-for="user in userList" :value="user.uid" :key="user.uid">{{ user.username }}</Option>
        //     </Select>
        //   </FormItem>
        //this.getUserList();
    }
}