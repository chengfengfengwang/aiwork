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
            cur_coupon_id: data.coupon_id || '', total: 0,
            fee_channel_data_list: [],
            fee_channel_data_columns: [
                {
                    title: '序号',
                    render: (text, record, index) => `${index + 1}`, width: 40,
                },
                {
                    title: '账号', dataIndex: 'phone', key: 'phone',
                    sorter: (a, b) => a.phone - b.phone, width: 150,
                },
                {
                    title: '激活课程', dataIndex: 'course_name', key: 'course_name',
                    sorter: (a, b) => a.course_name - b.course_name, width: 150,
                },
                {
                    title: '激活时间', dataIndex: 'time_paid', key: 'time_paid',
                    sorter: (a, b) => a.time_paid - b.time_paid, width: 150,
                },
                {
                    title: '订单号', dataIndex: 'order_no', key: 'order_no',
                    sorter: (a, b) => a.order_no - b.order_no, width: 150,
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
        const {cur_coupon_id} = this.state;
        if (coupon_id === 'false') {
            coupon_id = cur_coupon_id;
        }

        let url = this.main_host + `/v3/operating/coupon` + '?coupon_id=' + coupon_id + '&page=' + page + '&size=' + need_count;
        this.setState({loading_1: true});
        this.setState({export_url: url + '&need_export=' + true});
        fetch(url, {method: 'GET'})
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
            fee_channel_data_columns, loading_1, fee_channel_data_list, total, export_url
        } = this.state;
        const paginationProps = {pageSize: 15, total: total, showTotal: this.showTotal, onChange: this.changePage};
        return (
            <div>
                <Breadcrumb style={{padding: '15px 0 10px 0'}}>
                    <Breadcrumb.Item><a href="/dashbord">主页</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/#/fee/coupon_stats">优惠券统计</a></Breadcrumb.Item>
                    <Breadcrumb.Item>优惠券使用列表</Breadcrumb.Item>
                </Breadcrumb>

                <Row style={{marginTop: 10}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="优惠券用户使用"
                            extra={<div><a style={{marginLeft: 20, float: 'right'}} href={export_url}><Icon
                                type="download"/>数据导出</a>
                            </div>}
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