export default {
    plugins: [
        ['umi-plugin-react', {
            antd: true,
            dva: true,
        }],
    ],
    routes: [
        {
            path: '/single',
            name: '测试',
            component: './AppSingle',
            routes: [
                {path: '/single/course_date_stats', component: './single/course_date_stats', name: '课程学习统计'},
                {path: '/single/course_user_date_stats', component: './single/course_user_date_stats', name: '用户课程学习统计'},
                {path: '/single/lesson_table', component: './single/lesson_table', name: '课程小节统计'},
                {path: '/single/material_table', component: './single/material_table', name: '练习统计'},
                {path: '/single/course_date_stats_2', component: './single/course_date_stats_2', name: '课程学习统计2'},
                {path: '/single/lesson_table_2', component: './single/lesson_table_2', name: '课程小节统计2'},
            ]
        },
        {
            path: '/login',
            name: '登录',
            component: './login',
            routes: [
                {
                    path: '/login',
                    component: './login',
                },
            ]
        },
        {
            path: '/',
            component: './App',
            routes: [
                {
                    path: '/dashboard',
                    routes: [
                        {path: '/dashboard/total', component: './dashboard/dashboard', name: '整体统计'},
                        {path: '/dashboard', component: './dashboard/overview_stats', name: '渠道概览'},
                        {path: '/dashboard/table', component: './dashboard/total_table_stats'},
                    ]
                },
                {
                    path: '/user',
                    name: '用户统计',
                    routes: [
                        {path: '/user/user_device_stats', component: './user/user_device_stats', name: '设备频次统计'},
                        {path: '/user/user_version_stats', component: './user/user_version_stats', name: 'App版本统计'},
                        {path: '/user/users_table', component: './user/users_table', name: '用户列表'},
                        {path: '/user/payment_table', component: './user/payment_table', name: '订单列表'},
                        {path: '/user/course_instrument_stats', component: './course/course_instrument_stats', name: '试看转化率'},
                    ]
                },
                {
                    path: '/fee',
                    name: '付费统计',
                    routes: [
                        {path: '/fee/total_table_stats', component: './fee/total_table_stats', name: '概览'},
                        {path: '/fee/total_table_stats_wx', component: './fee/total_table_stats_wx', name: '概览-小程序'},
                        {path: '/fee/fee_day_stats', component: './fee/fee_day_stats', name: '实时统计-付费金额'},
                        {path: '/fee/number_day_stats', component: './fee/number_day_stats', name: '实时统计-付费人数'},
                        {path: '/fee/fee_date_stats', component: './fee/fee_date_stats', name: '实时统计-付费金额'},
                        {path: '/fee/number_date_stats', component: './fee/number_date_stats', name: '趋势统计-付费人数'},
                        {path: '/fee/fee_payment_stats', component: './fee/fee_payment_stats'},
                        {path: '/fee/fee_date_course_stats', component: './fee/fee_date_course_stats', name: '课程类别'},
                        {path: '/fee/fee_date_payment_stats', component: './fee/fee_date_payment_stats', name: '付费类别'},
                        {path: '/fee/re_date_stats', component: './fee/re_date_stats', name: '复购统计'},
                        {path: '/fee/fee_date_type_stats', component: './fee/fee_date_type_stats', name: '付费方式'},
                        {path: '/fee/fee_recharge_stats', component: './fee/fee_recharge_stats', name: '内购统计'},
                        {path: '/fee/coupon_use_table', component: './fee/coupon_use_table', name: '优惠券使用统计'},
                        {path: '/fee/coupon_stats', component: './fee/coupon_stats', name: '优惠券统计'},
                        {path: '/fee/active_code_stats', component: './fee/active_code_stats', name: '体验课统计'},
                        {path: '/fee/stats_course_pay', component: './fee/stats_course_pay', name: '课程购买统计'},
                    ]
                },
                {
                    path: '/course',
                    name: '课程统计',
                    routes: [
                        {path: '/course/course_date_stats', component: './course/course_date_stats', name: '课程学习统计'},
                        {path: '/course/course_user_date_stats', component: './course/course_user_date_stats', name: '用户课程学习统计'},
                        {path: '/course/lesson_table', component: './course/lesson_table', name: '课程小节统计'},
                        {path: '/course/material_table', component: './course/material_table', name: '练习统计'},
                        {path: '/course/course_date_stats_2', component: './course/course_date_stats_2', name: '课程学习统计2'},
                        {path: '/course/lesson_table_2', component: './course/lesson_table_2', name: '课程小节统计2'},
                        {path: '/course/test_guitar_course', component: './course/test_guitar_course', name: '吉他测试统计'},

                        {path: '/course/dashboard', component: './course/dashboard', name: 'dashboard'},
                        {path: '/course/stats_course', component: './course/stats_course', name: '课程学习统计'},
                    ]
                }, {
                    path: '/channel',
                    name: '渠道统计',
                    routes: [
                        {path: '/channel/table_stats', component: './channel/table_stats', name: '整体统计'},
                        {path: '/channel/platform_stats', component: './channel/platform_stats', name: '设备平台统计'},
                        {path: '/channel/channel_stats', component: './channel/channel_stats', name: '应用平台统计'},
                        {path: '/channel/channel_j_stats', component: './channel/channel_j_stats', name: '奖学金渠道'},
                        {path: '/channel/share_install_stats', component: './channel/share_install_stats', name: '厂商渠道'},
                        {path: '/channel/other_active_stats', component: './channel/other_active_stats', name: '第三方激活'},
                    ]
                }, {
                    path: '/vip',
                    name: 'Vip统计',
                    routes: [
                        {path: '/vip/date_type_stats', component: './vip/date_type_stats', name: '概览'},
                    ]
                }, {
                    path: '/score',
                    name: '曲谱统计',
                    routes: [
                        {path: '/score/date_type_stats', component: './score/date_type_stats', name: '概览'},
                    ]
                },{
                    path: '/ab_test',
                    name: 'AB测试统计',
                    routes: [
                        {path: '/ab_test/ex_test_stats', component: './ab_test/ex_test_stats', name: '试学课程统计'},
                        {path: '/ab_test/ex_test_fee_stats', component: './ab_test/ex_test_fee_stats', name: '试学课程购买统计'},
                    ]
                }
            ]
        },
    ],
    history: 'hash'
};