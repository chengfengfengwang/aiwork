import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table} from 'antd';
const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './channel_stats.less'
import {Link} from "react-router-dom";


export default class FeeTableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        day: moment().add(-1, 'days').format('YYYY-MM-DD'), begin_date: '2019-01-01',
        end_date: moment().add(-1, 'days').format('YYYY-MM-DD'),
        choose_channels: [], choose_share_channels: [],
        cur_channel: '', cur_share_channel: '', cur_platform: '-1', cur_instrument: '-1',
        fee_channel_data_list: [],
        fee_channel_data_columns_1: [
            {title: '乐器名称', dataIndex: 'title', key: 'title'},
            {title: 'Android', children: [
                {title: '付费人数', dataIndex: 'count_android_num', key: 'count_android_num',
                sorter: (a, b) => a.count_android_num - b.count_android_num},
                {title: '付费订单数', dataIndex: 'count_android_count', key: 'count_android_count',
                sorter: (a, b) => a.count_android_count - b.count_android_count,
                render: (text, record, index) => <Link to={
                    {
                        pathname: '/user/payment_table',
                        query: {
                            type: 'Android',
                            title: 'total',
                            date_type: 'date',
                            sharechannel: this.state.cur_share_channel,
                            platform: this.state.cur_platform,
                            instrument: record.type,
                            channel: this.state.cur_channel,
                            day: this.state.day, begindate: this.state.begin_date, enddate: this.state.end_date,
                        },
                    }
                }>{text}</Link>},
                {title: '付费金额', dataIndex: 'count_android_fee', key: 'count_android_fee',
                sorter: (a, b) => a.count_android_fee - b.count_android_fee,},
                ]},
            {title: 'IOS', children: [
                {title: '付费人数', dataIndex: 'count_ios_num', key: 'count_ios_num',
                sorter: (a, b) => a.count_ios_num - b.count_ios_num},
                {title: '付费订单数', dataIndex: 'count_ios_count', key: 'count_ios_count',
                    sorter: (a, b) => a.count_ios_count - b.count_ios_count,
                render: (text, record, index) => <Link to={
                    {
                        pathname: '/user/payment_table',
                        query: {
                            type: 'IOS',
                            title: 'total',
                            date_type: 'date',
                            sharechannel: this.state.cur_share_channel,
                            platform: this.state.cur_platform,
                            instrument: record.type,
                            channel: this.state.cur_channel,
                            day: this.state.day, begindate: this.state.begin_date, enddate: this.state.end_date,
                        },
                    }
                }>{text}</Link>},
                {title: '付费金额', dataIndex: 'count_ios_fee', key: 'count_ios_fee',
                sorter: (a, b) => a.count_ios_fee - b.count_ios_fee},
                ]},
           {title: '其他', children: [
                {title: '付费人数', dataIndex: 'count_other_num', key: 'count_other_num',
                sorter: (a, b) => a.count_other_num - b.count_other_num},
                {title: '付费订单数', dataIndex: 'count_other_count', key: 'count_other_count',
                    sorter: (a, b) => a.count_other_count - b.count_other_count,
                render: (text, record, index) => <Link to={
                    {
                        pathname: '/user/payment_table',
                        query: {
                            type: '其他',
                            title: 'total',
                            date_type: 'date',
                            sharechannel: this.state.cur_share_channel,
                            platform: this.state.cur_platform,
                            instrument: record.type,
                            channel: this.state.cur_channel,
                            day: this.state.day, begindate: this.state.begin_date, enddate: this.state.end_date,
                        },
                    }
                }>{text}</Link>},
                {title: '付费金额', dataIndex: 'count_other_fee', key: 'count_other_fee',
                sorter: (a, b) => a.count_other_fee - b.count_other_fee},
                ]},
            ],
        loading_1: false
    };

    componentDidMount() {
        this.get_channels({});
        this.get_share_channels({});

        this.get_total_data({type:'channel'});
    }

    get_channels({}) {
        fetch(this.main_host + '/v3/operating/channels/', {
            method: 'GET'
        }).then(res => res.json()).then(
            json => {
                this.setState({choose_channels: json.data});
            }
        )
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

     get_total_data({type='', begin_date_tmp = '', end_date_tmp = '', channel_type = 'false', platform = 'false',
                       instrument = 'false', channel = 'false', share_channel = 'false', need_count = 15})
    {
        const {begin_date, end_date, date_channel_type, cur_platform,
            cur_instrument, cur_channel, cur_share_channel} = this.state;
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
        if (instrument === 'false') {
            instrument = cur_instrument;
        }
        if (channel === 'false') {
            channel = cur_channel;
        }
        if (share_channel === 'false') {
            share_channel = cur_share_channel;
        }

        if (type === 'channel'){
            this.setState({loading_1: true});
            fetch(this.main_host + `/v3/operating/date_total_platform/`
            + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
            + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
            + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({loading_1: false});
                this.setState({fee_channel_data_list: json.data});
            });
        }else{
        }
    }

    onDateCourseTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_total_data({type:'channel', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    handleChannelChange(value) {
        value = `${value}`;
        this.setState({cur_channel: value});
        this.get_total_data({type:'channel', channel: value});
    }

    handleShareChannelChange(value) {
        value = `${value}`;
        this.setState({cur_share_channel: value});
        this.get_total_data({type:'channel', share_channel: value});
    }

    render() {
        const {
            fee_channel_data_columns_1, choose_channels,
            loading_1, choose_share_channels, fee_channel_data_list
        } = this.state;

        return (
            <div>
                <Row style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110}} className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>渠道</span>
                            <Select mode="multiple" showSearch style={{width: 400,}} placeholder="请选择渠道"
                                    onChange={(value) => this.handleChannelChange(value, 'total', '')}>
                                {
                                    choose_channels.map((item, index) => {
                                        return (
                                            <Select.Option key={index} rowkey={index} value={item.value}>{item.label}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>来源渠道</span>
                            <Select mode="multiple" showSearch style={{width: 400,}} placeholder="请选择来源渠道"
                                    onChange={(value) => this.handleShareChannelChange(value, 'total', '')}>
                                {
                                    choose_share_channels.map((item, index) => {
                                        return (
                                            <Select.Option key={index} rowkey={index} value={item.value}>{item.label}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
                                this.onDateCourseTotalChange(date, dateString);
                            }} locale={locale} defaultValue={[moment('2019-01-01'), moment().add(-1, 'days')]}/>
                        </div>
                    </Card>
                </Row>

                <Row style={{marginTop: '50px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="整体统计-市场维度"
                            extra={<div><a style={{marginLeft: 20, float: 'right'}} href=""><Icon type="download"/>数据导出</a></div>}
                            hoverable={true}
                        >
                            <Table dataSource={fee_channel_data_list} loading={loading_1} bordered
                                   columns={fee_channel_data_columns_1} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}