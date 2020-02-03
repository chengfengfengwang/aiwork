import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table} from 'antd';
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
        fee_payment_type_data_columns : [],
        loading_1: false, loading_2: false, loading_3: false
    };

    componentDidMount() {
        this.get_total_data({type:'total'});

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
            fetch(this.main_host + `/v3/operating/total/wx/`
            + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
            + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
            + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({
                    total_data: json.data,
                });
            });
        }else{
        }
    }

    onDateCourseTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_total_data({type:'total', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type:'platform', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type:'instrument', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type:'payment_type', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type:'course_type_1', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type:'course_type_2', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_total_data({type:'re', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    render() {
        const {fee_plat_data_columns, total_data, loading_1, fee_platform_list} = this.state;
        return (
            <div>
                <Row id="topFixRow" style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110,transition: 'top .5s',width:'100%'}} className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '10px', float: 'left'}}>
                            <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
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
                                            title: 'wx',
                                            date_type: 'total', instrument: -1,
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
                </Row>
            </div>
        );
    }
}