import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import Link from 'umi/link';

const {SubMenu} = Menu;
const {Sider} = Layout;


class MySider extends React.Component {
    state = {
        collapsed : 'menu-fold'
    };

    render() {
        return (
            <Sider width={200} style={{background: '#fff', overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultOpenKeys={['dashboard']}
                    defaultSelectedKeys={['dashboard']}
                    style={{height: '100%', borderRight: 0}}
                    inlineCollapsed={this.state.collapsed}
                >
                    <Menu.Item key="1"><Link to="/dashboard"><Icon type="dashboard"/>整体概览</Link></Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="money-collect"/><span>付费统计</span></span>}>
                        <Menu.Item key="2"><Link to="/fee/total_table_stats">概览</Link></Menu.Item>
                        <Menu.Item key="20"><Link to="/fee/total_table_stats_wx">概览-小程序</Link></Menu.Item>
                        {/*<Menu.Item key="fee_23"><Link to="/fee/stats_course">课程统计</Link></Menu.Item>*/}
                        <Menu.Item key="fee_24"><Link to="/fee/stats_course_pay">App购买</Link></Menu.Item>
                        <Menu.Item key="21"><Link to="/fee/fee_recharge_stats">音符币IOS内购</Link></Menu.Item>
                        {/*<Menu.Item key="3"><Link to="/fee/number_day_stats">实时统计-付费人数</Link></Menu.Item>*/}
                        {/*<Menu.Item key="4"><Link to="/fee/fee_day_stats">实时统计-付费金额</Link></Menu.Item>*/}
                        {/*<Menu.Item key="5"><Link to="/fee/fee_date_course_stats">趋势统计-课程类别</Link></Menu.Item>*/}
                        {/*<Menu.Item key="6"><Link to="/fee/fee_date_payment_stats">趋势统计-付费类别</Link></Menu.Item>*/}
                        {/*<Menu.Item key="7"><Link to="/fee/fee_date_stats">趋势统计-付费金额</Link></Menu.Item>*/}
                        {/*<Menu.Item key="8"><Link to="/fee/number_date_stats">趋势统计-付费人数</Link></Menu.Item>*/}
                        {/*<Menu.Item key="10.1"><Link to="/fee/fee_date_type_stats">付费方式</Link></Menu.Item>*/}
                        {/*<Menu.Item key="9"><Link to="/fee/re_date_stats">趋势统计-复购</Link></Menu.Item>*/}
                        <Menu.Item key="fee_21"><Link to="/fee/coupon_stats">优惠券使用</Link></Menu.Item>
                        <Menu.Item key="fee_22"><Link to="/fee/active_code_stats">体验课码使用</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub2" title={<span><Icon type="user"/><span>用户统计</span></span>}>
                        <Menu.Item key="10"><Link to="/user/user_device_stats">设备频次统计</Link></Menu.Item>
                        <Menu.Item key="19"><Link to="/user/course_instrument_stats">用户转化</Link></Menu.Item>
                        {/*<Menu.Item key="11"><Link to="/user/users_table">用户列表</Link></Menu.Item>*/}
                    </SubMenu>
                    <SubMenu key="sub3" title={<span><Icon type="gold"/><span>渠道统计</span></span>}>
                        {/*<Menu.Item key="12"><Link to="/channel/table_stats">整体统计</Link></Menu.Item>*/}
                        <Menu.Item key="13"><Link to="/channel/platform_stats">设备平台统计</Link></Menu.Item>
                        <Menu.Item key="14"><Link to="/channel/channel_stats">应用平台渠道</Link></Menu.Item>
                        <Menu.Item key="15"><Link to="/channel/channel_j_stats">奖学金卡渠道</Link></Menu.Item>
                        <Menu.Item key="16"><Link to="/channel/share_install_stats">渠道分析</Link></Menu.Item>
                        <Menu.Item key="17"><Link to="/channel/other_active_stats">第三方激活</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub4" title={<span><Icon type="robot"/><span>课程统计</span></span>}>
                        <Menu.Item key="course_1"><Link to="/course/stats_course">课程学习统计</Link></Menu.Item>
                        {/*<Menu.Item key="course_3"><Link to="/course/course_date_stats_2">试学课程统计</Link></Menu.Item>*/}
                        <Menu.Item key="course_2"><Link to="/course/course_user_date_stats">注册学习统计</Link></Menu.Item>
                        <Menu.Item key="course_4"><Link to="/course/test_guitar_course">吉他测试统计</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="vip" title={<span><Icon type="crown"/><span>vip统计</span></span>}>
                        <Menu.Item key="vip_1"><Link to="/vip/date_type_stats">概览</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="score" title={<span><Icon type="trophy"/><span>曲谱统计</span></span>}>
                        <Menu.Item key="score_1"><Link to="/score/date_type_stats">概览</Link></Menu.Item>
                    </SubMenu>
                    <SubMenu key="sub5" title={<span><Icon type="smile"/><span>ab测试统计</span></span>}>
                        <Menu.Item key="ab_test_1"><Link to="/ab_test/ex_test_stats">试学课程统计</Link></Menu.Item>
                        <Menu.Item key="ab_test_2"><Link to="/ab_test/ex_test_fee_stats">试学课程购买统计</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default MySider;

