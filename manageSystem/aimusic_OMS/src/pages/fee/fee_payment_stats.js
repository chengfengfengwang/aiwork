import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select} from 'antd';
const {RangePicker} = DatePicker;
import echarts from 'echarts/lib/echarts';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
moment.locale('zh-cn');
import {show_payment_bar_many} from "../../components/echarts_coms";
import config from "../../config/app_config";


export default class FeeDayStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        key: 'tab_1',
        begin_date: '2018-12-01', end_date: moment().add(-1, 'days').format('YYYY-MM-DD'),
        date_channel_type: 'channel', list_loading: false
    };

    componentDidMount() {
        this.get_count({});
    }

    get_count({begin_date_tmp='', end_date_tmp='', channel=''}) {
        const {begin_date, end_date, date_channel_type} = this.state;
        if (begin_date_tmp.length === 0){
            begin_date_tmp = begin_date;
        }
        if (end_date_tmp.length === 0){
            end_date_tmp = end_date;
        }
        if (channel.length === 0){
            channel = date_channel_type;
        }

        fetch(this.main_host + `/v3/operating/payment_channel_detail/?cal_type=count`
            + '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp
            + '&channel_type=' + channel + '&need_count=99999', {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                show_payment_bar_many(echarts.init(document.getElementById('chart_1')), json);
            }
        )
    }

    get_fee({begin_date_tmp='', end_date_tmp='', channel=''}) {
        const {begin_date, end_date, date_channel_type} = this.state;
        if (begin_date_tmp.length === 0){
            begin_date_tmp = begin_date;
        }
        if (end_date_tmp.length === 0){
            end_date_tmp = end_date;
        }
        if (channel.length === 0){
            channel = date_channel_type;
        }

        fetch(this.main_host + `/v3/operating/payment_channel_detail/?cal_type=fee`
            + '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp
            + '&channel_type=' + channel + '&need_count=99999', {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                show_payment_bar_many(echarts.init(document.getElementById('chart_2')), json);
            }
        )
    }

    onTabChange = (key, type) => {
        this.setState({key: key});
        if (key === 'tab_1'){
            this.get_count({});
        }else{
            this.get_fee({});
        }
    };

    onDateChange(date, dateString, key) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        if (key === 'tab_1'){
            this.get_count({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        }else{
            this.get_fee({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        }
    }

    onChannelChange(value, key) {
        this.setState({date_channel_type: value});
        if (key === 'tab_1'){
            this.get_count({channel: value});
        }else{
            this.get_fee({channel: value});
        }
    }

    render() {
        const {key} = this.state;
        const tab_day_list = [{
            key: 'tab_1',
            tab: '数目',
        }, {
            key: 'tab_2',
            tab: '费用',
        }];

        const content_day_list = {
            tab_1: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <div id="chart_1" style={{width: '95%', height: '2000px'}}/>
                    </Col>
                </Row>
            </div>,
            tab_2: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <div id="chart_2" style={{width: '95%', height: '2000px'}}/>
                    </Col>
                </Row>
            </div>,
        };

        return (
            <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}}
                            title="当日统计"
                            extra={<div>
                            <Select defaultValue="channel" style={{width: 120}}
                                    onChange={(value) =>this.onChannelChange(value, key)}>
                                <Option value="channel">渠道1</Option>
                                <Option value="share_channel">渠道2</Option>
                            </Select>
                            <RangePicker onChange={(date, dateString) => {
                                this.onDateChange(date, dateString, key);
                            }} locale={locale} defaultValue={[moment('2018-01-01'), moment().add(-1, 'days')]}/>
                            </div>}
                            tabList={tab_day_list}
                            bodyStyle={{padding: '12px'}}
                            hoverable={true}
                            activeTabKey={this.state.key}
                            onTabChange={(key) => {
                                this.onTabChange(key, 'key');
                            }}
                        >
                            {content_day_list[this.state.key]}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}