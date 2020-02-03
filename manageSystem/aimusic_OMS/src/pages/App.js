import React from 'react';
import {
    Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, Select,
    Cascader, BackTop, Button, Dropdown, Popconfirm, message, Avatar, Badge
} from 'antd';
import MySider from "../components/slide_data";
import MyBread from './../components/MyBread'

const {Header, Content} = Layout;
import styles from './index.less'
import config from "../config/app_config";

export default class App extends React.Component {
    state = {
        auth_nickname: localStorage.getItem("auth_nickname")
    };

    componentDidMount() {
        if (!localStorage.getItem("auth_token") || this.props.history.location.pathname === '/') {
            this.props.history.push("/login");
        }
    }

    clear_cache() {
        let main_host = config.debug ? config.test_host : config.main_host;
        let url = main_host + `/v3/operating/clear_all_cache`;
        fetch(url, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                message.success(json.message);
            });
    }

    logout() {
        message.success('成功登出');
        this.props.history.push("/login");
    }

    render() {
        function cancel(e) {
            message.success('取消登出');
        }

        const ctrl_menu = (
            <Menu>
                <Menu.Item>
                    <Popconfirm
                        placement="bottomRight"
                        title="确定删除吗？"
                        onConfirm={() => this.clear_cache()}
                        okText="确定"
                        cancelText="取消"
                    >
                        <a href="javascript:void(0);">
                            清除缓存
                        </a>
                    </Popconfirm>
                </Menu.Item>
                <Menu.Item>
                    <Popconfirm
                        placement="bottomRight"
                        title="确定登出吗？"
                        onConfirm={() => this.logout()}
                        onCancel={cancel}
                        okText="确定"
                        cancelText="取消"
                    >
                        <a href="javascript:void(0);">
                            退出登录
                        </a>
                    </Popconfirm>

                </Menu.Item>
            </Menu>
        );

        const menu = (
            <Menu>
                <Menu.Item>
                    2019年11月13日：添加【用户】->【App版本分布】
                </Menu.Item>
                <Menu.Item>
                    2019年11月13日：更新【用户】->【设备频次分布】
                </Menu.Item>
            </Menu>
        );

        return (
            <Layout>
                <Header className="header" style={{background: '#fff', position: 'fixed', zIndex: 1, width: '100%'}}>
                    <img style={{height: '40px'}} src={'https://cdn3.iconfinder.com/data/icons/watercolorspring/512/daffodil.png'}/>
                    <span style={{marginLeft: 20}}/>
                    <img src={'http://s.immusician.com/static/website/imgs/nav-logo.png'}/>
                    <Dropdown overlay={ctrl_menu} placement="bottomCenter">
                        {/*<Button style={{float: 'right', marginTop: '15px'}}>其他功能</Button>*/}
                        <Avatar size="large" style={{
                            color: '#fff',
                            backgroundColor: '#77519c',
                            float: 'right',
                            marginTop: '15px'
                        }}>{this.state.auth_nickname}</Avatar>
                    </Dropdown>
                    <div style={{float: 'right', marginRight: '20px'}}>
                        <Dropdown overlay={menu}>
                            <Badge dot>
                                <a href="javascript:void(0);">
                                    更新提示
                                </a>
                            </Badge>
                        </Dropdown>
                    </div>

                </Header>
                <Layout style={{marginTop: '60px'}}>
                    <MySider/>
                    <Layout style={{padding: '0 20px 20px', height: '100%', marginLeft: '200px'}}>
                        <MyBread/>
                        <Content style={{background: 'rgb(242, 244, 246)', padding: '0px', margin: 0, minHeight: '85vh'}}>
                            {this.props.children}
                        </Content>
                        <BackTop/>
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}