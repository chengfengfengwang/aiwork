import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import Link from 'umi/link';

const {SubMenu} = Menu;
const {Sider} = Layout;


class MySider extends React.Component {
    render() {
        return (
            <Sider width={200} style={{background: '#fff', overflow: 'auto', height: '100vh', position: 'fixed', left: 0}}>
                <Menu
                    mode="inline"
                    theme="dark"
                    defaultOpenKeys={['course']}
                    defaultSelectedKeys={['course_1']}
                    style={{height: '100%', borderRight: 0}}
                >
                    <SubMenu key="course" title={<span><Icon type="robot"/><span>课程统计</span></span>}>
                        <Menu.Item key="course_1"><Link to="/single/course_date_stats">课程学习统计</Link></Menu.Item>
                        <Menu.Item key="course_3"><Link to="/single/course_date_stats_2">试学课程统计</Link></Menu.Item>
                        <Menu.Item key="course_2"><Link to="/single/course_user_date_stats">注册学习统计</Link></Menu.Item>
                    </SubMenu>
                </Menu>
            </Sider>
        );
    }
}

export default MySider;

