import React from 'react';
import { Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, Select, Cascader, BackTop } from 'antd';
import MySider from "../components/slide_course";
import MyBread from './../components/MyBread'

const { Header, Content } = Layout;
import styles from './index.less'
import routes from './../../config/config';

export default class App extends React.Component {
    render() {
        function handleChange(value) {
            console.log(`selected ${value}`);
        }

        function onChange(value, selectedOptions) {
            console.log(value, selectedOptions);
        }

        function filter(inputValue, path) {
            return (path.some(option => (option.label).toLowerCase().indexOf(inputValue.toLowerCase()) > -1));
        }

        return (
            <Layout>
                <Header className="header" style={{ background: '#fff', position: 'fixed', zIndex: 1, width: '100%' }}>
                    <img style={{height: '40px'}} src={'https://cdn3.iconfinder.com/data/icons/watercolorspring/512/daffodil.png'}/>
                    <span style={{marginLeft: 20}}/>
                    <img src={'http://s.immusician.com/static/website/imgs/nav-logo.png'} />
                </Header>
                <Layout style={{ marginTop: '60px' }}>
                    <MySider />
                    <Layout style={{ padding: '0 24px 24px', height: '100%', marginLeft: '200px' }}>
                        <MyBread />
                        <Content style={{ background: 'rgb(242, 244, 246)', padding: '0px', margin: 0, minHeight: '85vh' }}>
                            {this.props.children}
                        </Content>
                        <BackTop />
                    </Layout>
                </Layout>
            </Layout>
        );
    }
}