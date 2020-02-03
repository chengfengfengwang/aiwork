import React from 'react';
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
        day: moment().add(-1, 'days').format('YYYY-MM-DD'), begin_date: '2019-01-01',
        end_date: moment().add(-1, 'days').format('YYYY-MM-DD'),
        choose_channels: [], choose_share_channels: [],
        cur_channel: '', cur_share_channel: '', cur_platform: '-1', cur_instrument: '-1',
        fee_channel_data_list: [],
        fee_channel_data_columns: [
            {title: '渠道名称', dataIndex: 'type', key: 'type'},
            {
                title: '注册数', dataIndex: 'reg_count', key: 'reg_count',
                sorter: (a, b) => a.reg_count - b.reg_count
            },
            {
                title: '付费人数', dataIndex: 'user_count', key: 'user_count',
                sorter: (a, b) => a.user_count - b.user_count
            },
            {
                title: '付费订单数', dataIndex: 'order_count', key: 'order_count',
                sorter: (a, b) => a.order_count - b.order_count, defaultSortOrder: 'descend'
            },
            {
                title: '付费金额', dataIndex: 'fee', key: 'fee',
                sorter: (a, b) => a.fee - b.fee
            },
        ],
        loading_1: false
    };

    componentDidMount() {
        this.get_channels({});
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

    get_total_data({
                       type = '', begin_date_tmp = '', end_date_tmp = '', channel_type = 'false', platform = 'false',
                       instrument = 'false', channel = 'false', share_channel = 'false', need_count = 15
                   }) {
        const {
            begin_date, end_date, date_channel_type, cur_platform,
            cur_instrument, cur_channel, cur_share_channel
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
        if (channel === 'false') {
            channel = cur_channel;
        }
        if (share_channel === 'false') {
            share_channel = cur_share_channel;
        }

        if (type === 'channel') {
            this.setState({loading_1: true});
            fetch(this.main_host + `/v3/channel/date_channel/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
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
        this.get_total_data({type: 'channel', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    handleChannelChange(value) {
        value = `${value}`;
        this.setState({cur_channel: value});
        this.get_total_data({type: 'channel', channel: value});
    }

    handleInstrumentTotalChange(value) {
        this.setState({cur_instrument: value});
        this.get_total_data({type: 'share_channel', instrument: value});
    }

    render() {
        const {
            fee_channel_data_columns, choose_channels,
            loading_1, fee_channel_data_list
        } = this.state;
        const paginationProps = {pageSize: 40};

        return (
            <div>
                <Row style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110}}
                     className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>渠道</span>
                            <Select mode="multiple" showSearch style={{width: 400,}} placeholder="请选择渠道"
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

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>乐器</span>
                            <Select defaultValue="-1" style={{width: 120,}}
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
                            extra={<div><a style={{marginLeft: 20, float: 'right'}} href=""><Icon type="download"/>数据导出</a>
                            </div>}
                            hoverable={true}
                        >
                            <Table dataSource={fee_channel_data_list} loading={loading_1} bordered
                                   pagination={paginationProps}
                                   columns={fee_channel_data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}