import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select} from 'antd';
const { RangePicker } = DatePicker;
import echarts from 'echarts/lib/echarts';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import config from "../../config/app_config";
moment.locale('zh-cn');
import {show_date_line_many} from "../../components/echarts_coms";


export default class FeeDateStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        key_date: 'tab_date_1', date_channel_count: [], date_channel_fee: [],
        begin_date: '2018-12-01', end_date: moment().add(-1, 'days').format('YYYY-MM-DD'),
        date_channel_type: 'channel', list_loading: false
    };

    componentDidMount() {
        this.get_date_channel_count({});
    }

    onDateTabChange = (key, type) => {
        this.setState({[type]: key});
        if (key === 'tab_date_1'){
            this.get_date_channel_count({});
        }else{
            this.get_date_count({});
        }
    };

    get_date_count({begin_date_tmp='', end_date_tmp='', channel=''}) {
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

        fetch(this.main_host + `/v3/operating/date_channel_detail/?cal_type=count` +
            '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel
            + '&need_count=99999', {
            method: 'GET'
        }).then(res => res.json()).then(
            json => {
                const {begin_date, end_date} = this.state;
                show_date_line_many(echarts.init(document.getElementById('date_tab_1')), json, begin_date, end_date);
            }
        )
    }

    get_date_channel_count({begin_date_tmp='', end_date_tmp='', channel=''}) {
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
        this.setState({list_loading: true});

        fetch(this.main_host + `/v3/operating/date_channel_ranking/?cal_type=count` +
            '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel
            + '&need_count=99999', {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({list_loading: false});
                this.setState({date_channel_count: json.list});
            }
        )
    }

    onDateChange(date, dateString, key) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        if (key === 'tab_date_1'){
            this.get_date_channel_count({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        }else{
            this.get_date_count({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        }
    }

    handleDateChange(value, key) {
        this.setState({date_channel_type: value});
        if (key === 'tab_date_1'){
            this.get_date_channel_count({channel: value});
        }else{
            this.get_date_count({channel: value});
        }
    }

    render() {
        const {date_channel_count, key_date, list_loading} = this.state;
        const tab_date_list = [{
            key: 'tab_date_1',
            tab: '排行',
        }, {
            key: 'tab_date_2',
            tab: '数据',
        }];

        const content_date_list = {
            tab_date_1: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <List
                            size="small"
                            header={<div>今日渠道【付费】排行前{date_channel_count.length}</div>}
                            bordered
                            loading={list_loading}
                            dataSource={date_channel_count}
                            renderItem={item => (<List.Item>{item.index} . {item.label} : {item.value}</List.Item>)}
                        />
                    </Col>
                </Row>
            </div>,
            tab_date_2: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <div id="date_tab_1" style={{width: '95%', height: '2000px'}}/>
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
                            title="周期统计"
                            hoverable={true}
                            extra={<div><RangePicker onChange={(date, dateString) => {
                                this.onDateChange(date, dateString, key_date);
                            }} locale={locale} defaultValue={[moment('2018-01-01'), moment().add(-1, 'days')]}/>
                            <Select defaultValue="channel" style={{width: 120, marginLeft: 10}}
                                    onChange={(value) =>this.handleDateChange(value, key_date)}>
                                <Option value="channel">渠道1</Option>
                                <Option value="share_channel">渠道2</Option>
                            </Select>
                            </div>}
                            tabList={tab_date_list}
                            activeTabKey={this.state.key_date}
                            onTabChange={(key) => {
                                this.onDateTabChange(key, 'key_date');
                            }}
                        >
                            {content_date_list[this.state.key_date]}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}