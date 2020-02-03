import React from 'react';
import {Layout, Menu, Breadcrumb, Icon} from 'antd';
import Link from 'umi/link';
import config from "../config/app_config";

const {SubMenu} = Menu;
const {Sider} = Layout;


class MySider extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        collapsed: 'menu-fold',
        token: localStorage.getItem("auth_token"),
        uid: localStorage.getItem("auth_uid"),
        menus: []
    };

    componentDidMount() {
        this.get_data({});
    }

    get_data({}) {
        let url = this.main_host + `/v3/users/admin_menus/`;
        this.setState({loading_1: true});
        fetch(url, {method: 'GET', headers: {"token": this.state.token, 'uid': this.state.uid}})
            .then(res => res.json())
            .then(json => {
                this.setState({loading_1: false});
                this.setState({menus: json.data});
            });
    }

    render() {
        const {menus} = this.state;
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
                    {
                        menus.map((item, index) => {
                            const parent_key = 'menu_' + index;
                            return (
                                <SubMenu key={parent_key} title={<span><Icon type={item.icon}/><span>{item.title}</span></span>}>
                                    {
                                        item.children.map((child_item, child_index) => {
                                            return (
                                                <Menu.Item key={parent_key + child_index}><Link
                                                    to={child_item.link}>{child_item.title}</Link></Menu.Item>
                                            )
                                        })
                                    }
                                </SubMenu>
                            )
                        })
                    }
                </Menu>
            </Sider>
        );
    }
}

export default MySider;

