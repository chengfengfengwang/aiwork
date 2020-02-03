import React from 'react';
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
        day: moment().add(-1, 'days').format('YYYY-MM-DD'), begin_date: '2019-01-01',
        end_date: moment().add(-1, 'days').format('YYYY-MM-DD'),
        choose_channels: [], choose_share_channels: [],
        cur_channel: '', cur_share_channel: '', cur_platform: '-1', cur_instrument: '-1',
        fee_total_data_list: [], loading_1: false,
        fee_total_data_columns: [
            {title: '', dataIndex: 'type', key: 'type'},
            {title: '付费人数', dataIndex: 'user_count', key: 'user_count'},
            {title: '付费订单数', dataIndex: 'order_count', key: 'order_count'},
            {title: '付费金额', dataIndex: 'fee', key: 'fee'}],
    };

    componentDidMount() {
        this.get_channels({});
        this.get_share_channels({});

        this.get_total_data({});
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

        this.setState({loading_1: true});
        fetch(this.main_host + `/v3/operating/payment_type/`
        + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
        + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
        + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
        .then(res => res.json())
        .then(json => {
            this.setState({loading_1: false});
            this.setState({fee_total_data_list: json.list});
        });
    }

    handlePlatformTotalChange(value) {
        this.setState({cur_platform: value});
        this.get_total_data({type:'course', platform: value});
        this.get_total_data({type:'payment', platform: value});
    }

    onDateCourseTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_total_data({type:'course', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type:'payment', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    handleChannelChange(value) {
        value = `${value}`;
        this.setState({cur_channel: value});
        this.get_total_data({type:'course', channel: value});
        this.get_total_data({type:'payment', channel: value});
    }

    handleShareChannelChange(value) {
        value = `${value}`;
        this.setState({cur_share_channel: value});
        this.get_total_data({type:'course', share_channel: value});
        this.get_total_data({type:'payment', share_channel: value});
    }

    handleInstrumentTotalChange(value) {
        this.setState({cur_instrument: value});
        this.get_total_data({type:'course', instrument: value});
        this.get_total_data({type:'payment', instrument: value});
    }

    render() {
        const {
            fee_total_data_columns, choose_channels, loading_1, choose_share_channels, fee_total_data_list
        } = this.state;

        return (
            <div>
                <Row style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110}} className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>渠道1</span>
                            <Select mode="multiple" showSearch style={{width: 250,}} placeholder="请选择渠道1"
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
                            <span style={{marginRight: "10px"}}>渠道2</span>
                            <Select mode="multiple" showSearch style={{width: 250,}} placeholder="请选择渠道2"
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
                            <span style={{marginRight: "10px"}}>平台</span>
                            <Select defaultValue="-1" style={{width: 120,}}
                                    onChange={(value) => this.handlePlatformTotalChange(value, 'total', '')}>
                                <Select.Option value="-1">全部</Select.Option>
                                <Select.Option value="1">Android</Select.Option>
                                <Select.Option value="0">IOS</Select.Option>
                            </Select>
                        </div>

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>乐器</span>
                            <Select defaultValue="-1" style={{width: 120,}}
                                    onChange={(value) => this.handleInstrumentTotalChange(value)}>
                                <Select.Option value="-1">全部</Select.Option>
                                <Select.Option value="0">吉他</Select.Option>
                                <Select.Option value="1">尤克里里</Select.Option>
                                <Select.Option value="2">卡林巴</Select.Option>
                                <Select.Option value="3">非洲鼓</Select.Option>
                                <Select.Option value="4">钢琴</Select.Option>
                                <Select.Option value="6">口琴</Select.Option>
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
                            title="付费课程"
                            hoverable={true}
                        >
                            <Table dataSource={fee_total_data_list} loading={loading_1}
                                   className={styles.customTable}
                                   columns={fee_total_data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}