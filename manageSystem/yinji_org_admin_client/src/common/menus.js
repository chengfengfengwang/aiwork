//代理   0
//机构   2
//管理员  3
const menus = {
    2: [
        {
            name: "classList",
            text: "班级列表",
            link: "/classList"
        },
        {
            name: "teacherList",
            text: "教师",
            link: "/teacherList"
        },
        {
            name: "studentList",
            text: "学生列表",
            link: "/studentList"
        },
        {
            name: "register",
            text: "学生注册",
            link: "/register"
        }
    ],
    3: [
        {
            name: "agents",
            text: "代理人",
            link: "/agents"
        },
        {
            name: "orgList",
            text: "机构列表",
            link: "/orgList"
        },
        {
            name: "oClassList",
            text: "机构班级列表",
            link: "/oClassList"
        },
        {
            name: "teacherVideos",
            text: "师训",
            link: "/teacherVideos"
        },
        {
            name: "goods",
            text: "商品配置",
            link: "/goods"
        },
        {
            name: "config",
            text: "配置",
            link: "/config"
        },
        {
            name: "tpList",
            text: "教案列表",
            link: "/tpList"
        }
    ],
    0: [
        {
            name: "proxyOrgList",
            text: "我的机构",
            link: "/proxyOrgList"
        },
        // {
        //     name: "oClassList",
        //     text: "机构班级列表",
        //     link: "/oClassList"
        // },
        {
            name: "agents",
            text: "我的代理",
            link: "/agents"
        },
        {
            name: "checkList",
            text: "待审核",
            link: "/checkList",
            needCheckPower:true
        }
    ] 

};
export default menus;