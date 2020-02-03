import React from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table} from 'antd';

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './channel_stats.less'


export default class FeeTableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        day: moment().add(-1, 'days').format('YYYY-MM-DD'),
        begin_date: moment(moment().year() + '-' + config.formatNumber((moment().month() + 1))).format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
        cur_channel: '', cur_share_channel: '', cur_platform: '-1', cur_instrument: '-1', cur_sku: '',
        fee_channel_data_list: [], loading_1: false,
        choose_channels: [], choose_share_channels: [],
        fee_channel_data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`, width: 50,
            },
            {
                title: '第三方渠道名称', dataIndex: 'channel', key: 'channel',
            },
            {title: '订单数', dataIndex: 'count', key: 'count',
            sorter: (a, b) => a.count - b.count},
            {title: '人数', dataIndex: 'number', key: 'number',
            sorter: (a, b) => a.number - b.number},
            {title: '激活1次', dataIndex: 'number_1', key: 'number_1',
            sorter: (a, b) => a.number_1 - b.number_1},
            {title: '复购1次', dataIndex: 'number_2', key: 'number_2',
            sorter: (a, b) => a.number_2 - b.number_2},
            {title: '复购2次及以上', dataIndex: 'number_3', key: 'number_3',
            sorter: (a, b) => a.number_3 - b.number_3}
        ],
    };

    componentDidMount() {
        this.get_channels({});
        this.get_share_channels({});

        this.get_total_data({type: 'channel'});
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

    get_total_data({
                       type = '', begin_date_tmp = '', end_date_tmp = '', channel_type = 'false', platform = 'false',
                       instrument = 'false', channel = 'false', share_channel = 'false', sku = 'false', need_count = 15
                   }) {
        const {
            begin_date, end_date, date_channel_type, cur_platform,
            cur_instrument, cur_channel, cur_share_channel, cur_sku
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
        if (instrument === 'false') {
            instrument = cur_instrument;
        }
        if (sku === 'false') {
            sku = cur_sku;
        }
        if (channel === 'false') {
            channel = cur_channel;
        }
        if (share_channel === 'false') {
            share_channel = cur_share_channel;
        }

        if (type === 'channel') {
            this.setState({loading_1: true});
            fetch(this.main_host + `/v3/channel/pay_channel/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                + '&channel=' + channel + '&share_channel=' + share_channel + '&sku=' + sku, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                    this.setState({loading_1: false});
                    this.setState({fee_channel_data_list: json.data});
                });
        } else if (type === 'share_channel') {

        } else {
        }
    }

    handleChannelChange(value) {
        value = `${value}`;
        this.setState({cur_channel: value});
        this.get_total_data({type: 'channel', channel: value});
    }

    handleShareChannelChange(value) {
        value = `${value}`;
        this.setState({cur_share_channel: value});
        this.get_total_data({type: 'channel', share_channel: value});
    }

    handlePlatformTotalChange(value) {
        this.setState({cur_platform: value});
        this.get_total_data({platform: value});
        this.get_total_data({type: 'channel', platform: value});
    }

    onDateCourseTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_total_data({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type: 'channel', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    handleInstrumentTotalChange(value) {
        this.setState({cur_instrument: value});
        this.get_total_data({instrument: value});
        this.get_total_data({type: 'channel', instrument: value});
    }

    handleSkuTotalChange(value) {
        this.setState({cur_sku: value});
        this.get_total_data({sku: value});
        this.get_total_data({type: 'channel', sku: value});
    }

    render() {
        const {
            fee_channel_data_columns, loading_1, fee_channel_data_list, choose_share_channels, choose_channels
        } = this.state;

        return (
            <div>
                <Row style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110}}
                     className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '10px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>渠道1</span>
                            <Select mode="multiple" showSearch style={{width: 220,}} placeholder="请选择渠道1"
                                    onChange={(value) => this.handleChannelChange(value, 'total', '')}>
                                {
                                    choose_channels.map((item, index) => {
                                        return (
                                            <Select.Option key={index} rowkey={index}
                                                           value={item.value}>{item.label}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        <div style={{marginLeft: '10px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>渠道2</span>
                            <Select mode="multiple" showSearch style={{width: 220,}} placeholder="请选择渠道2"
                                    onChange={(value) => this.handleShareChannelChange(value, 'total', '')}>
                                {
                                    choose_share_channels.map((item, index) => {
                                        return (
                                            <Select.Option key={index} rowkey={index}
                                                           value={item.value}>{item.label}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        <div style={{marginLeft: '10px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>平台</span>
                            <Select defaultValue="-1" style={{width: 80,}}
                                    onChange={(value) => this.handlePlatformTotalChange(value, 'total', '')}>
                                <Select.Option value="-1">全部</Select.Option>
                                <Select.Option value="1">Android</Select.Option>
                                <Select.Option value="0">IOS</Select.Option>
                            </Select>
                        </div>

                        <div style={{marginLeft: '10px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>乐器</span>
                            <Select defaultValue="-1" style={{width: 90,}}
                                    onChange={(value) => this.handleInstrumentTotalChange(value)}>
                                <Option value="-1">全部</Option>
                                <Option value="0">吉他</Option>
                                <Option value="1">尤克里里</Option>
                                <Option value="2">卡林巴</Option>
                                <Option value="3">非洲鼓</Option>
                                <Option value="4">钢琴</Option>
                            </Select>
                        </div>

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>付费方式</span>
                            <Select defaultValue="" style={{width: 90,}}
                                    onChange={(value) => this.handleSkuTotalChange(value)}>
                                <Option value="">全部</Option>
                                <Option value="课程">课程</Option>
                                <Option value="优惠券">优惠券</Option>
                                <Option value="月续费">月续费</Option>
                                <Option value="年续费">年续费</Option>
                            </Select>
                        </div>

                        <div style={{marginLeft: '10px', float: 'left'}}>
                            <RangePicker style={{float: 'left', width: 250,}} onChange={(date, dateString) => {
                                this.onDateCourseTotalChange(date, dateString);
                            }} locale={locale} defaultValue={[moment(moment().year() + '-' + (moment().month() + 1) + '-01'), moment().add(-1, 'days')]}/>
                        </div>
                    </Card>
                </Row>

                <Row style={{marginTop: '70px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="整体统计"
                            hoverable={true}
                        >
                            <Table dataSource={fee_channel_data_list} loading={loading_1} bordered pagination={false}
                                   columns={fee_channel_data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}