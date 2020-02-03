import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Skeleton} from 'antd';
const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import {Link} from "react-router-dom";
moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './fee_stats.less'
import Field from "../../components/Charts/Field";
import {getPosition} from "../../utils/util";


export default class FeeTableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        day: moment().add(-1, 'days').format('YYYY-MM-DD'),
        begin_date: moment(moment().year() + '-' + config.formatNumber((moment().month() + 1))).format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
        choose_channels: [], choose_share_channels: [],
        cur_channel: '', cur_share_channel: '', cur_platform: '-1', cur_instrument: '-1',
        fee_platform_list: [], fee_instrument_list: [], fee_payment_type_list: [],
        fee_course_type_list: [], fee_course_type_list_1: [],
        total_data:{user_count: 0, amount: 0, count: 0, guitar: 0, ukulele: 0, kalimba: 0, piano: 0, feizhougu: 0},
        fee_instrument_data_columns: [
            {title: '项目名称', dataIndex: 'type', key: 'type',
            render: (text, record, index) => <Link to={
                    {
                        pathname: '/user/payment_table',
                        query: {
                            type: record.type,
                            title: 'total',
                            date_type: 'date',
                            sharechannel: this.state.cur_share_channel,
                            platform: this.state.cur_platform,
                            instrument: 0,
                            channel: this.state.cur_channel,
                            day: this.state.day, begindate: this.state.begin_date, enddate: this.state.end_date,
                        },
                    }
                }>{text}</Link>},
            {title: '付费人数', dataIndex: 'number', key: 'number',
            sorter: (a, b) => a.number - b.number},
            {title: '付费订单数', dataIndex: 'count', key: 'count',
            sorter: (a, b) => a.count - b.count},
            {title: '付费金额', dataIndex: 'fee', key: 'fee',
            sorter: (a, b) => a.fee - b.fee},
            ],
        fee_re_data_columns: [
            {title: '乐器名称', dataIndex: 'title', key: 'title'},
            {title: '只购买一次人数', dataIndex: 'count_1', key: 'count_1',
            sorter: (a, b) => a.count_1 - b.count_1, defaultSortOrder: 'descend',},
            {title: '复购一次人数', dataIndex: 'count_2', key: 'count_2',
            sorter: (a, b) => a.count_2 - b.count_2},
            {title: '复购两次人数', dataIndex: 'count_3', key: 'count_3',
            sorter: (a, b) => a.count_3 - b.count_3},
            {title: '复购三次以上人数', dataIndex: 'count_4', key: 'count_4',
            sorter: (a, b) => a.count_4 - b.count_4},
        ],
        fee_channel_data_columns: [
            {title: '乐器名称', dataIndex: 'title', key: 'title'},
            {title: '总数', children: [
                {title: '付费人数', dataIndex: 'count_total_num', key: 'count_total_num',
                sorter: (a, b) => a.count_total_num - b.count_total_num},
                {title: '付费订单数', dataIndex: 'count_total_count', key: 'count_total_count',
                sorter: (a, b) => a.count_total_count - b.count_total_count,
                render: (text, record, index) => <Link to={
                    {
                        pathname: '/user/payment_table',
                        query: {
                            type: '总数',
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
                {title: '付费金额', dataIndex: 'count_total_fee', key: 'count_total_fee',
                sorter: (a, b) => a.count_total_fee - b.count_total_fee,},
                ]},
            {title: '全额购买', children: [
                {title: '付费人数', dataIndex: 'count_a_num', key: 'count_a_num',
                sorter: (a, b) => a.count_a_num - b.count_a_num},
                {title: '付费订单数', dataIndex: 'count_a_count', key: 'count_a_count',
                sorter: (a, b) => a.count_a_count - b.count_a_count,
                render: (text, record, index) => <Link to={
                    {
                        pathname: '/user/payment_table',
                        query: {
                            type: '全额购买',
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
                {title: '付费金额', dataIndex: 'count_a_fee', key: 'count_a_fee',
                sorter: (a, b) => a.count_a_fee - b.count_a_fee,},
                ]},
            {title: '奖学金', children: [
                {title: '付费人数', dataIndex: 'count_b_num', key: 'count_b_num',
                sorter: (a, b) => a.count_b_num - b.count_b_num},
                {title: '付费订单数', dataIndex: 'count_b_count', key: 'count_b_count',
                    sorter: (a, b) => a.count_b_count - b.count_b_count,
                render: (text, record, index) => <Link to={
                    {
                        pathname: '/user/payment_table',
                        query: {
                            type: '奖学金',
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
                {title: '付费金额', dataIndex: 'count_b_fee', key: 'count_b_fee',
                sorter: (a, b) => a.count_b_fee - b.count_b_fee},
                ]},
           {title: '优惠券', children: [
                {title: '付费人数', dataIndex: 'count_c_num', key: 'count_c_num',
                sorter: (a, b) => a.count_c_num - b.count_c_num},
                {title: '付费订单数', dataIndex: 'count_c_count', key: 'count_c_count',
                    sorter: (a, b) => a.count_c_count - b.count_c_count,
                render: (text, record, index) => <Link to={
                    {
                        pathname: '/user/payment_table',
                        query: {
                            type: '优惠券',
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
                {title: '付费金额', dataIndex: 'count_c_fee', key: 'count_c_fee',
                sorter: (a, b) => a.count_c_fee - b.count_c_fee},
                ]},
            ],
        fee_plat_data_columns: [
            {title: '乐器名称', dataIndex: 'title', key: 'title'},
            {title: '总数', children: [
                {title: '注册人数', dataIndex: 'total_num', key: 'total_num',
                sorter: (a, b) => a.total_num - b.total_num},
                {title: '付费人数', dataIndex: 'count_total_num', key: 'count_total__num',
                sorter: (a, b) => a.count_total__num - b.count_total__num},
                {title: '付费订单数', dataIndex: 'count_total_count', key: 'count_total__count',
                sorter: (a, b) => a.count_total__count - b.count_total__count,
                render: (text, record, index) => <Link to={
                    {
                        pathname: '/user/payment_table',
                        query: {
                            type: 'plat_total',
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
                {title: '付费金额', dataIndex: 'count_total_fee', key: 'count_total_fee',
                sorter: (a, b) => a.count_total_fee - b.count_total_fee,},
                ]},
            {title: 'Android', children: [
                {title: '注册人数', dataIndex: 'android_num', key: 'android_num',
                sorter: (a, b) => a.android_num - b.android_num},
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
                {title: '注册人数', dataIndex: 'ios_num', key: 'ios_num',
                sorter: (a, b) => a.ios_num - b.ios_num},
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
            ],
        fee_payment_type_data_columns : [],
        loading_1: false, loading_2: false, loading_3: false
    };

    componentDidMount() {
        this.get_channels({});
        this.get_share_channels({});

        this.get_total_data({type:'total'});
        this.get_total_data({type:'platform'});
        this.get_total_data({type:'instrument'});
        this.get_total_data({type:'payment_type'});
        this.get_total_data({type:'course_type_1'});
        // this.get_total_data({type:'course_type_2'});
        this.get_total_data({type:'re'});

        this.topFixEvent()
    }

    topFixEvent(){
        const b = document.querySelector('.ant-breadcrumb');
        window.addEventListener('scroll',function(){
            if(document.querySelector('#topFixRow')){
                if(getPosition(b).y<50){
                    document.querySelector('#topFixRow').style.top="64px"
                }else{
                    document.querySelector('#topFixRow').style.top="110px"
                }
            }
        })
    };

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

        if (type === 'total'){
            fetch(this.main_host + `/v3/operating/total/`
            + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
            + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
            + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({
                    total_data: json.data
                });
            });
        }else if (type === 'platform'){
            this.setState({loading_1: true});
            fetch(this.main_host + `/v3/operating/date_total_platform/`
            + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
            + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
            + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({loading_1: false});
                this.setState({fee_platform_list: json.data});
            });
        }else if (type === 'instrument'){
            this.setState({loading_2: true});
            fetch(this.main_host + `/v3/operating/date_total_instrument/`
            + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
            + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
            + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({loading_2: false});
                this.setState({fee_instrument_list: json.data});
            });
        }else if (type === 'payment_type'){
            this.setState({loading_3: true});
            fetch(this.main_host + `/v3/operating/date_total_payment_type/`
            + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
            + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
            + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({loading_3: false});
                this.setState({fee_payment_type_list: json.data});
            });
        }else if (type === 'course_type_1'){
            this.setState({loading_4: true});
            fetch(this.main_host + `/v3/operating/course_kind/`
            + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
            + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
            + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({loading_4: false});
                this.setState({fee_course_type_list: json.data});
            });
        }else if (type === 'course_type_2'){
            this.setState({loading_5: true});
            fetch(this.main_host + `/v3/operating/course_bxq/`
            + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
            + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
            + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({loading_5: false});
                this.setState({fee_course_type_list_1: json.data});
            });
        }else if (type === 're'){
            this.setState({loading_6: true});
            fetch(this.main_host + `/v3/operating/date_total_re_purchase/`
            + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
            + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
            + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({loading_6: false});
                this.setState({fee_re_list: json.data});
            });
        }else if (type === 'share_channel'){
            this.setState({loading_2: true});
            fetch(this.main_host + `/v3/channel/date_share_channel/`
            + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
            + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
            + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({loading_2: false});
                this.setState({fee_share_channel_data_list: json.data});
            });
        }else{
        }
    }

    handlePlatformTotalChange(value) {
        this.setState({cur_platform: value});
        this.get_total_data({type:'total', platform: value});
        this.get_total_data({type:'platform', platform: value});
        this.get_total_data({type:'instrument', platform: value});
        this.get_total_data({type:'payment_type', platform: value});
        this.get_total_data({type:'course_type_1', platform: value});
        // this.get_total_data({type:'course_type_2', platform: value});
        this.get_total_data({type:'re', platform: value});
    }

    onDateCourseTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_total_data({type:'total', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type:'platform', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type:'instrument', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type:'payment_type', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type:'course_type_1', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        // this.get_total_data({type:'course_type_2', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type:'re', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    handleChannelChange(value) {
        value = `${value}`;
        this.setState({cur_channel: value});
        this.get_total_data({type:'total', channel: value});
        this.get_total_data({type:'platform', channel: value});
        this.get_total_data({type:'instrument', channel: value});
        this.get_total_data({type:'payment_type', channel: value});
        this.get_total_data({type:'course_type_1', channel: value});
        // this.get_total_data({type:'course_type_2', channel: value});
        this.get_total_data({type:'re', channel: value});
    }

    handleShareChannelChange(value) {
        value = `${value}`;
        this.setState({cur_share_channel: value});
        this.get_total_data({type:'total', share_channel: value});
        this.get_total_data({type:'platform', share_channel: value});
        this.get_total_data({type:'instrument', share_channel: value});
        this.get_total_data({type:'payment_type', share_channel: value});
        this.get_total_data({type:'course_type_1', share_channel: value});
        // this.get_total_data({type:'course_type_2', share_channel: value});
        this.get_total_data({type:'re', share_channel: value});
    }

    render() {
        const {
            fee_channel_data_columns, fee_plat_data_columns, choose_channels, fee_course_type_list, total_data,
            fee_instrument_data_columns, fee_payment_type_list, fee_re_list,
            loading_1, loading_2, loading_3, loading_4, loading_5, loading_6, fee_re_data_columns,
            choose_share_channels, fee_platform_list, fee_instrument_list, fee_course_type_list_1
        } = this.state;

        return (
            <div>
                <Row id="topFixRow" style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110,transition: 'top .5s',width:'100%'}} className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '10px', float: 'left'}}>
                            <span style={{marginRight: "5px"}}>渠道</span>
                            <Select mode="multiple" showSearch style={{width: 220,}} placeholder="请选择渠道"
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

                        <div style={{marginLeft: '10px', float: 'left'}}>
                            <span style={{marginRight: "5px"}}>来源渠道</span>
                            <Select mode="multiple" showSearch style={{width: 220,}} placeholder="请选择来源渠道"
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

                        <div style={{marginLeft: '10px', float: 'left'}}>
                            <span style={{marginRight: "5px"}}>平台</span>
                            <Select defaultValue="-1" style={{width: 90,}}
                                    onChange={(value) => this.handlePlatformTotalChange(value, 'total', '')}>
                                <Select.Option value="-1">全部</Select.Option>
                                <Select.Option value="1">Android</Select.Option>
                                <Select.Option value="0">IOS</Select.Option>
                            </Select>
                        </div>

                        <div style={{marginLeft: '10px', float: 'left'}}>
                            <RangePicker style={{float: 'right', marginLeft: 10, width: 230}} onChange={(date, dateString) => {
                                this.onDateCourseTotalChange(date, dateString);
                            }} locale={locale} defaultValue={[moment(moment().year() + '-' + (moment().month() + 1)), moment().add(0, 'days')]}/>
                        </div>
                    </Card>
                </Row>

                <Row style={{marginTop: '50px'}}>
                    <Col span={3}>
                        <Card title="累计付费人数" bordered={true} hoverable={true}
                              bodyStyle={{padding: '12px'}} className={styles.customCard}>
                            <h1>{total_data.user_count}</h1>
                        </Card>
                    </Col>
                   <Col span={3}>
                        <Card title="累计订单数" bordered={true} hoverable={true}
                              bodyStyle={{padding: '12px'}} className={styles.customCard}>
                            <h1><Link to={
                                    {
                                        pathname: '/user/payment_table',
                                        query: {
                                            title: 'total',
                                            date_type: 'date', instrument: -1,
                                            sharechannel: this.state.cur_share_channel,
                                            platform: this.state.cur_platform,
                                            channel: this.state.cur_channel,
                                            begindate: this.state.begin_date,
                                            enddate: this.state.end_date,
                                        },
                                    }
                                }>{total_data.count}</Link></h1>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card title="累计订单金额" bordered={true} hoverable={true}
                              bodyStyle={{padding: '12px'}} className={styles.customCard}>
                            <h1>{total_data.amount}</h1>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card title="激活吉他总人数" bordered={true} hoverable={true}
                              bodyStyle={{padding: '12px'}} className={styles.customCard}>
                            <h1>{total_data.guitar}</h1>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card title="激活UK总人数" bordered={true} hoverable={true}
                              bodyStyle={{padding: '12px'}} className={styles.customCard}>
                            <h1>{total_data.ukulele}</h1>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card title="激活卡林巴总人数" bordered={true} hoverable={true}
                              bodyStyle={{padding: '12px'}} className={styles.customCard}>
                            <h1>{total_data.kalimba}</h1>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card title="激活钢琴总人数" bordered={true} hoverable={true}
                              bodyStyle={{padding: '12px'}} className={styles.customCard}>
                            <h1>{total_data.piano}</h1>
                        </Card>
                    </Col>
                    <Col span={3}>
                        <Card title="激活非洲鼓人数" bordered={true} hoverable={true}
                              bodyStyle={{padding: '12px'}} className={styles.customCard}>
                            <h1>{total_data.feizhougu}</h1>
                        </Card>
                    </Col>
                </Row>

                <Row style={{marginTop: '10px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="按设备类型"
                            extra={<div><a style={{marginLeft: 20, float: 'right'}} href=""><Icon type="download"/>数据导出</a></div>}
                            hoverable={true}
                        >
                            <Skeleton active loading={this.state.loading_1}>
                                <Table dataSource={fee_platform_list} bordered pagination={false}
                                       columns={fee_plat_data_columns} size="small"/>
                            </Skeleton>
                        </Card>
                    </Col>
                </Row>

                {/*<Row style={{marginTop: '10px'}}>*/}
                    {/*<Col span={24}>*/}
                        {/*<Card*/}
                            {/*style={{width: '100%'}} className={styles.customCard}*/}
                            {/*title="按照乐器类型"*/}
                            {/*extra={<div><a style={{marginLeft: 20, float: 'right'}} href=""><Icon type="download"/>数据导出</a></div>}*/}
                            {/*hoverable={true}*/}
                        {/*>*/}
                            {/*<Table dataSource={fee_instrument_list} loading={loading_2} bordered pagination={false}*/}
                                   {/*columns={fee_instrument_data_columns} size="small"/>*/}
                        {/*</Card>*/}
                    {/*</Col>*/}
                {/*</Row>*/}

                <Row style={{marginTop: '10px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="按照付费类型"
                            extra={<div><a style={{marginLeft: 20, float: 'right'}} href=""><Icon type="download"/>数据导出</a></div>}
                            hoverable={true}
                        >
                            <Skeleton active loading={this.state.loading_3}>
                                <Table dataSource={fee_payment_type_list} bordered pagination={false}
                                   columns={fee_channel_data_columns} size="small"/>
                            </Skeleton>
                        </Card>
                    </Col>
                </Row>

                <Row style={{marginTop: '10px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="按照课程类型"
                            extra={<div><a style={{marginLeft: 20, float: 'right'}} href=""><Icon type="download"/>数据导出</a></div>}
                            hoverable={true}
                        >
                            <Skeleton active loading={this.state.loading_4}>
                                <Table dataSource={fee_course_type_list} bordered pagination={false}
                                   columns={fee_instrument_data_columns} size="small"/>
                            </Skeleton>
                        </Card>
                    </Col>
                </Row>

                {/*<Row style={{marginTop: '10px'}}>*/}
                    {/*<Col span={24}>*/}
                        {/*<Card*/}
                            {/*style={{width: '100%'}} className={styles.customCard}*/}
                            {/*title="按照课程类型"*/}
                            {/*extra={<div><a style={{marginLeft: 20, float: 'right'}} href=""><Icon type="download"/>数据导出</a></div>}*/}
                            {/*hoverable={true}*/}
                        {/*>*/}
                            {/*<Skeleton active loading={this.state.loading_5}>*/}
                                {/*<Table dataSource={fee_course_type_list_1} bordered pagination={false}*/}
                                   {/*columns={fee_instrument_data_columns} size="small"/>*/}
                            {/*</Skeleton>*/}
                        {/*</Card>*/}
                    {/*</Col>*/}
                {/*</Row>*/}

                <Row style={{marginTop: '10px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="按照复购次数"
                            extra={<div><a style={{marginLeft: 20, float: 'right'}} href=""><Icon type="download"/>数据导出</a></div>}
                            hoverable={true}
                        >
                            <Skeleton active loading={this.state.loading_6}>
                                <Table dataSource={fee_re_list} bordered pagination={false}
                                   columns={fee_re_data_columns} size="small"/>
                            </Skeleton>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}