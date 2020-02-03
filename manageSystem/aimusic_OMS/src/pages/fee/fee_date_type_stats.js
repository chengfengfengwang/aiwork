import React from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table} from 'antd';

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './fee_stats.less'


export default class FeeTableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        day: moment().add(-1, 'days').format('YYYY-MM-DD'),
        begin_date: moment(moment().year() + '-' + config.formatNumber((moment().month() + 1))).format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
        choose_channels: [],
        choose_share_channels: [],
        cur_channel: '',
        cur_share_channel: '',
        cur_platform: '-1',
        cur_pay_type: '',
        fee_channel_data_list: [],
        fee_channel_data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`, width: 40,
            },
            {
                title: '乐器类型', dataIndex: 'instrument_type', key: 'instrument_type',
                width: 200,
            },
            {
                title: '订单数目', dataIndex: 'order_count', key: 'order_count',
                sorter: (a, b) => a.order_count - b.order_count, width: 150,
            },
            {
                title: '用户数目', dataIndex: 'user_count', key: 'user_count',
                sorter: (a, b) => a.user_count - b.user_count, width: 150,
            },
            {
                title: '费用', dataIndex: 'amount', key: 'amount',
                sorter: (a, b) => a.amount - b.amount, width: 150,
            }
        ],
        loading_1: false, export_url: ''
    };

    componentDidMount() {
        this.get_share_channels({});
        this.get_total_data({type: 'share_channel'});
    }

    get_share_channels({}) {
        fetch(this.main_host + '/v3/operating/share_channels/', {
            method: 'GET'
        }).then(res => res.json()).then(
            json => {
                this.setState({choose_share_channels: json.data});
            }
        )
    }

    get_total_data({
                       type = '', begin_date_tmp = '', end_date_tmp = '', channel_type = 'false', platform = 'false',
                       pay_type = 'false', channel = 'false', share_channel = 'false', need_count = 15
                   }) {
        const {
            begin_date, end_date, date_channel_type, cur_platform,
            cur_pay_type, cur_channel, cur_share_channel
        } = this.state;
        if (begin_date_tmp.length === 0) {
            begin_date_tmp = begin_date;
        }
        if (end_date_tmp.length === 0) {
            end_date_tmp = end_date;
        }
        if (channel_type === 'false') {
            channel_type = date_channel_type;
        }
        if (platform === 'false') {
            platform = cur_platform;
        }
        if (pay_type === 'false') {
            pay_type = cur_pay_type;
        }
        if (channel === 'false') {
            channel = cur_channel;
        }
        if (share_channel === 'false') {
            share_channel = cur_share_channel;
        }

        if (type === 'share_channel') {
            let url = this.main_host + `/v3/operating/payment_channel/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&payment_channel=' + pay_type
                + '&channel=' + channel + '&share_channel=' + share_channel;
            this.setState({loading_1: true, export_url: url + '&need_export=' + true});
            fetch(url, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                    this.setState({loading_1: false});
                    this.setState({fee_channel_data_list: json.data});
                });
        } else {
        }
    }

    onDateCourseTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_total_data({type: 'share_channel', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    handleShareChannelChange(value) {
        value = `${value}`;
        this.setState({cur_share_channel: value});
        this.get_total_data({type: 'share_channel', share_channel: value});
    }

    handlePaymentTypeChange(value) {
        this.setState({cur_instrument: value});
        this.get_total_data({type: 'share_channel', pay_type: value});
    }

    render() {
        const {
            fee_channel_data_columns, loading_1, choose_share_channels, fee_channel_data_list, export_url
        } = this.state;
        const paginationProps = {pageSize: 100};
        return (
            <div>
                <Row style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110}}
                     className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>付费类型</span>
                            <Select defaultValue="" style={{width: 120,}}
                                    onChange={(value) => this.handlePaymentTypeChange(value)}>
                                <Option value="">全部</Option>
                                <Option value="wx">微信</Option>
                                <Option value="alipay">支付宝</Option>
                            </Select>
                        </div>

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
                                this.onDateCourseTotalChange(date, dateString);
                            }} locale={locale}
                                         defaultValue={[moment(moment().year() + '-' + (moment().month() + 1) + '-01'), moment().add(0, 'days')]}/>
                        </div>
                    </Card>
                </Row>

                <Row style={{marginTop: '50px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="付费方式渠道统计"
                            hoverable={true}
                        >
                            <Table dataSource={fee_channel_data_list} loading={loading_1} bordered
                                   pagination={false} scroll={{y: 580}}
                                   columns={fee_channel_data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}