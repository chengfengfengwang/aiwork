import React from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table} from 'antd';

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './fee_stats.less'


export default class TableStats extends React.Component {
    constructor(props) {
        super(props);
        let data = this.props.location.query;

        this.main_host = config.debug ? config.test_host : config.main_host;
        this.state = {
            token: localStorage.getItem("auth_token"),
            uid: localStorage.getItem("auth_uid"),
            cur_coupon_id: data.coupon_id || '', total: 0,
            fee_channel_data_list: [],
            fee_channel_data_columns: [
                {
                    title: '序号',
                    render: (text, record, index) => `${index + 1}`, width: 40,
                },
                {
                    title: '名称', dataIndex: 'name', key: 'name', width: 150,
                },
                {
                    title: '有效期', dataIndex: 'end_time', key: 'end_time', width: 150,
                },
                {
                    title: '发放量', dataIndex: 'total_count', key: 'total_count',
                    sorter: (a, b) => a.total_count - b.total_count, width: 150,
                },
                {
                    title: '使用量', dataIndex: 'total_used_count', key: 'total_used_count',
                    sorter: (a, b) => a.total_used_count - b.total_used_count, width: 150,
                    render: (text, record, index) => <Link to={
                        {
                            pathname: '/fee/coupon_use_table',
                            query: {
                                type: record.type,
                                title: 'total',
                                coupon_id: record.id,
                                begindate: this.state.begin_date, enddate: this.state.end_date,
                            },
                        }
                    }>{text}</Link>
                }
            ],
            loading_1: false, export_url: ''
        };
    }

    componentDidMount() {
        document.querySelector('#myBread').style.display = 'none';
        this.get_total_data({});
    }

    componentWillUnmount() {
        document.querySelector('#myBread').style.display = 'block'
    }


    get_total_data({
                       type = '', coupon_id='false', need_count = 15, page = 0,
                   }) {
        let url = this.main_host + `/v3/coupon/coupons/` + '?page=' + page + '&size=' + need_count;
        this.setState({loading_1: true});
        fetch(url, {method: 'GET', headers: {"token": this.state.token, 'uid': this.state.uid}})
            .then(res => res.json())
            .then(json => {
                this.setState({loading_1: false});
                this.setState({fee_channel_data_list: json.data, total: json.total});
            });
    }

    changePage = (page, pageSize) => {
        this.get_total_data({page: page - 1, need_count: pageSize});
    };

    showTotal = (total) => {
        return `总数 ${total} `;
    };

    render() {
        const {
            fee_channel_data_columns, loading_1, fee_channel_data_list, total
        } = this.state;
        const paginationProps = {pageSize: 15, total: total, showTotal: this.showTotal, onChange: this.changePage};
        return (
            <div>
                <Breadcrumb style={{padding: '15px 0 10px 0'}}>
                    <Breadcrumb.Item><a href="/dashbord">主页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>优惠券统计</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{marginTop: 10}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="优惠券用户使用"
                            hoverable={true}
                        >
                            <Table dataSource={fee_channel_data_list} loading={loading_1} bordered
                                   scroll={{y: 580}} pagination={paginationProps}
                                   columns={fee_channel_data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}