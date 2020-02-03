import React from 'react';
import {Icon, Card, List, DatePicker, Select, Tabs} from 'antd';

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import {show_date_line_many} from "../../components/echarts_coms";
import echarts from 'echarts/lib/echarts';

const {TabPane} = Tabs;


export default class FeeDateStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        table_key: 'tab_channel_table', channel_count: [], need_show_count: 999, channel_type: 'channel',
        cur_instrument: '-1',
        list_loading: false, begin_date: '2019-01-01', end_date: moment().add(-1, 'days').format('YYYY-MM-DD'),
    };

    componentDidMount() {
        this.get_channel_list({});
    }

    get_channel_list({begin_date_tmp = '', end_date_tmp = '', channel_type_tmp = '', default_need_show_count = -1, instrument = 'false'}) {
        const {begin_date, end_date, channel_type, need_show_count, cur_instrument} = this.state;
        if (begin_date_tmp.length === 0) {
            begin_date_tmp = begin_date;
        }
        if (end_date_tmp.length === 0) {
            end_date_tmp = end_date;
        }
        if (channel_type_tmp.length === 0) {
            channel_type_tmp = channel_type;
        }
        if (default_need_show_count === -1) {
            default_need_show_count = need_show_count;
        }
        if (instrument === 'false') {
            instrument = cur_instrument;
        }

        fetch(this.main_host + `/v3/operating/date_channel_ranking/?cal_type=fee`
            + '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp
            + '&channel_type=' + channel_type_tmp + '&need_count=' + default_need_show_count + '&instrument=' + instrument, {
            method: 'GET'
        }).then(res => res.json()).then(
            json => {
                this.setState({channel_count: json.list});
            }
        )
    }

    get_channel_charts({begin_date_tmp = '', end_date_tmp = '', channel_type_tmp = '', default_need_show_count = -1, instrument = 'false'}) {
        const {begin_date, end_date, channel_type, need_show_count, cur_instrument} = this.state;
        if (begin_date_tmp.length === 0) {
            begin_date_tmp = begin_date;
        }
        if (end_date_tmp.length === 0) {
            end_date_tmp = end_date;
        }
        if (channel_type_tmp.length === 0) {
            channel_type_tmp = channel_type;
        }
        if (default_need_show_count === -1) {
            default_need_show_count = need_show_count;
        }
        if (instrument === 'false') {
            instrument = cur_instrument;
        }

        this.setState({list_loading: true});

        fetch(this.main_host + `/v3/operating/date_channel_detail/?cal_type=fee`
            + '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp
            + '&channel_type=' + channel_type_tmp + '&need_count=' + default_need_show_count + '&instrument=' + instrument, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    this.setState({list_loading: false});
                    const {begin_date, end_date} = this.state;
                    show_date_line_many(echarts.init(document.getElementById('channel_charts')), json, begin_date, end_date);
                }
            )
    }

    onTypeChange(key) {
        switch (key) {
            case 'tab_channel_table':
                this.setState({table_key: key});
                this.get_channel_list({});
                break;

            case 'tab_channel_charts':
                this.setState({table_key: key});
                this.get_channel_charts({});
                break;
        }
    }

    handleShowCountChange(value) {
        const {table_key} = this.state;
        this.setState({need_show_count: parseInt(value)});
        switch (table_key) {
            case 'tab_channel_table':
                this.get_channel_list({default_need_show_count: parseInt(value)});
                break;
            case 'tab_channel_charts':
                this.get_channel_charts({default_need_show_count: parseInt(value)});
                break;
        }
    }

    onDateChange(date, dateString) {
        const {table_key} = this.state;
        this.setState({begin_date: dateString[0], end_date: dateString[0]});
        switch (table_key) {
            case 'tab_channel_table':
                this.get_channel_list({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
                break;
            case 'tab_channel_charts':
                this.get_channel_charts({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
                break;
        }
    }

    handleChannelChange(value) {
        const {table_key} = this.state;
        this.setState({channel_type: value});
        switch (table_key) {
            case 'tab_channel_table':
                this.get_channel_list({channel_type_tmp: value});
                break;
            case 'tab_channel_charts':
                this.get_channel_charts({channel_type_tmp: value});
                break;
        }
    }

    handleInstrumentTotalChange(value) {
        const {table_key} = this.state;
        this.setState({cur_instrument: value});
        switch (table_key) {
            case 'tab_channel_table':
                this.get_channel_list({instrument: value});
                break;
            case 'tab_channel_charts':
                this.get_channel_charts({instrument: value});
                break;
        }
    }

    render() {
        const {channel_count, list_loading} = this.state;
        return (
            <div style={{background: '#fff', padding: '10px'}}>
                <Tabs defaultActiveKey="tab_channel_table"
                      tabBarExtraContent={
                          <div>
                              <RangePicker style={{marginLeft: 10}} onChange={(date, dateString) => {
                                  this.onDateChange(date, dateString);
                              }} locale={locale} defaultValue={[moment('2019-01-01'), moment().add(-1, 'days')]}/>
                              <Select defaultValue="channel" style={{width: 120, marginLeft: '10px'}}
                                      onChange={(value) => this.handleChannelChange(value)}>
                                  <Select.Option value="channel">渠道1</Select.Option>
                                  <Select.Option value="share_channel">渠道2</Select.Option>
                              </Select>
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
                                  <Select defaultValue="999" style={{width: 120, marginLeft: 10}}
                                          onChange={(value) => this.handleShowCountChange(value)}>
                                      <Select.Option value="5">显示5条</Select.Option>
                                      <Select.Option value="10">显示10条</Select.Option>
                                      <Select.Option value="20">显示20条</Select.Option>
                                      <Select.Option value="30">显示30条</Select.Option>
                                      <Select.Option value="50">显示50条</Select.Option>
                                      <Select.Option value="100">显示100条</Select.Option>
                                      <Select.Option value="999">全部显示</Select.Option>
                                  </Select>
                              </div>
                          </div>
                      }
                      onChange={(value) => this.onTypeChange(value)}>
                    <TabPane tab="渠道维度表格" key="tab_channel_table">
                        <List size="small" header={<div>排行前{channel_count.length}</div>}
                              bordered loading={list_loading} dataSource={channel_count}
                              renderItem={item => (<List.Item>{item.index} . {item.label} : {item.value}</List.Item>)}
                        />
                    </TabPane>
                    <TabPane tab="渠道维度图表" key="tab_channel_charts">
                        <div id="channel_charts" style={{width: '95%', height: '1000px'}}/>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}