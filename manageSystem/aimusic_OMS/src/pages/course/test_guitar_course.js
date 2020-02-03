import React from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table} from 'antd';

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './course_stats.less'


export default class TableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        cur_people: '-1',
        fee_channel_data_list: [],
        fee_channel_data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`, width: 40,
            },
            {
                title: '测试完成人数', dataIndex: 'evaluate_complete_count_list', key: 'evaluate_complete_count_list',
                sorter: (a, b) => a.evaluate_complete_count_list - b.evaluate_complete_count_list, width: 150,
            },
            {
                title: '对照组人数', dataIndex: 'contrast_payment_count', key: 'contrast_payment_count',
                sorter: (a, b) => a.contrast_payment_count - b.contrast_payment_count, width: 150,
            },
            {
                title: '对照组订单数', dataIndex: 'contrast_count', key: 'contrast_count',
                sorter: (a, b) => a.contrast_count - b.contrast_count, width: 150,
            },
            {
                title: '对照组购买人数', dataIndex: 'contrast_buy_people_count', key: 'contrast_buy_people_count',
                sorter: (a, b) => a.contrast_buy_people_count - b.contrast_buy_people_count, width: 150,
            },
            {
                title: '对照组产生金额', dataIndex: 'contrast_payment_price', key: 'contrast_payment_price',
                sorter: (a, b) => a.contrast_payment_price - b.contrast_payment_price, width: 150,
            },
            {
                title: '测试组人数', dataIndex: 'test_payment_count', key: 'test_payment_count',
                sorter: (a, b) => a.test_payment_count - b.test_payment_count, width: 150,
            },
            {
                title: '测试组订单数', dataIndex: 'test_count', key: 'test_count',
                sorter: (a, b) => a.test_count - b.test_count, width: 150,
            },
            {
                title: '测试组购买人数', dataIndex: 'buy_people_count', key: 'buy_people_count',
                sorter: (a, b) => a.buy_people_count - b.buy_people_count, width: 150,
            },
            {
                title: '测试组产生金额', dataIndex: 'test_payments_price', key: 'test_payments_price',
                sorter: (a, b) => a.test_payments_price - b.test_payments_price,
            }
        ],
        loading_1: false, export_url: ''
    };

    componentDidMount() {
        this.get_total_data({type: 'share_channel'});
    }

    get_total_data({
                       type = '', people='false'
                   }) {
        const {cur_people} = this.state;
        if (people === 'false') {
            people = cur_people;
        }

        if (type === 'share_channel') {
            let url = this.main_host + `/v3/evaluate_data` + '?is_buy=' + people;
            if (people === '-1'){
                url = this.main_host + `/v3/evaluate_data`;
            }
            this.setState({loading_1: true});
            fetch(url, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                    this.setState({loading_1: false});
                    this.setState({fee_channel_data_list: [json.data]});
                });
        } else {
        }
    }

    handlePeopleTotalChange(value) {
        this.setState({cur_people: value});
        this.get_total_data({type: 'share_channel', people: value});
    }

    render() {
        const {
            fee_channel_data_columns, loading_1, fee_channel_data_list
        } = this.state;
        const expandedRowRender = (record, index) => {
            const columns = [
                {title: '账号', dataIndex: 'phone', key: 'phone'},
                {title: '第一次是否有乐器', dataIndex: 'one_evaluate.has_instrument', key: 'one_evaluate.has_instrument'},
                {title: '第一次时长', dataIndex: 'one_evaluate.play_duration', key: 'one_evaluate.play_duration'},
                {title: '第一次得分', dataIndex: 'one_evaluate.evaluate_score', key: 'one_evaluate.evaluate_score'},
                {title: '第二次是否有乐器', dataIndex: 'two_evaluate.has_instrument', key: 'two_evaluate.has_instrument'},
                {title: '第二次时长', dataIndex: 'two_evaluate.play_duration', key: 'two_evaluate.play_duration'},
                {title: '第二次得分', dataIndex: 'two_evaluate.evaluate_score', key: 'two_evaluate.evaluate_score'},
                {title: '购买记录', dataIndex: 'payment_data', key: 'payment_data'},
            ];
            return (
                <Table
                    columns={columns}
                    dataSource={record.user_data}
                    pagination={false}
                />
            );
        };
        return (
            <div>
                <Row style={{}}>
                <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>是否购买过</span>
                            <Select defaultValue="-1" style={{width: 120,}}
                                    onChange={(value) => this.handlePeopleTotalChange(value, 'total', '')}>
                                <Select.Option value="-1">全部</Select.Option>
                                <Select.Option value="1">是</Select.Option>
                                <Select.Option value="0">否</Select.Option>
                            </Select>
                        </div>
                </Row>

                <Row style={{marginTop: 10}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="吉他测试相关统计"
                            hoverable={true}
                        >
                            <Table dataSource={fee_channel_data_list} loading={loading_1} bordered
                                   pagination={false} scroll={{y: 580}} expandedRowRender={expandedRowRender}
                                   columns={fee_channel_data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}