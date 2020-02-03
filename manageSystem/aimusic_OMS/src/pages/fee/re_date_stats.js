import React from 'react';
import {Icon, Card, List, DatePicker, Select, Tabs} from 'antd';
const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
moment.locale('zh-cn');
import config from "../../config/app_config";
import {show_total_bar} from "../../components/echarts_coms";
import echarts from 'echarts/lib/echarts';
const {TabPane} = Tabs;


export default class FeeDateStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        table_key: '', channel_count: [], channel_type: 'channel',
        cur_channel: '', cur_share_channel: '', cur_platform: '-1', cur_instrument: '-1',
        list_loading: false, begin_date: '2019-01-01', end_date: moment().add(-1, 'days').format('YYYY-MM-DD'),
    };

    componentDidMount() {
        this.get_re_charts({});
    }

    get_re_charts({begin_date_tmp='', end_date_tmp='',
                      platform = 'false', instrument = 'false', channel = 'false', share_channel = 'false'}) {
        const {begin_date, end_date, cur_channel, cur_share_channel, cur_platform, cur_instrument} = this.state;
        if (begin_date_tmp.length === 0) {
            begin_date_tmp = begin_date;
        }
        if (end_date_tmp.length === 0) {
            end_date_tmp = end_date;
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
        this.setState({list_loading: true});

        fetch(this.main_host + '/v3/operating/re_purchase/?cal_type=' + ''
            + '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&platform=' + platform
            + '&instrument=' + instrument + '&channel=' + channel
            + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                show_total_bar(echarts.init(document.getElementById('re_charts')), json.data);
            }
        );
    }

    onDateChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[0]});
        this.get_re_charts({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]})
    }

    handlePlatformTotalChange(value) {
        this.setState({cur_platform: value});
        this.get_re_charts({platform: value})
    }

    handleInstrumentTotalChange(value) {
        this.setState({cur_instrument: value});
        this.get_re_charts({instrument: value})
    }

    render() {
        const {} = this.state;
        return (
            <div style={{background: '#fff', padding: '10px'}}>
                <Tabs defaultActiveKey="tab_channel_table"
                      tabBarExtraContent={
                          <div>
                              <RangePicker style={{marginLeft: 10}} onChange={(date, dateString) => {
                                    this.onDateChange(date, dateString);
                                }} locale={locale} defaultValue={[moment('2019-01-01'), moment().add(-1, 'days')]}/>
                                <span style={{marginRight: "10px", marginLeft: 10}}>平台</span>
                                <Select defaultValue="-1" style={{width: 120,}}
                                        onChange={(value) => this.handlePlatformTotalChange(value, 'total', '')}>
                                    <Option value="-1">全部</Option>
                                    <Option value="1">Android</Option>
                                    <Option value="0">IOS</Option>
                                </Select>
                            <span style={{marginRight: "10px", marginLeft: 10}}>乐器</span>
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
                      }
                      onChange={(value) => this.onTypeChange(value)}>
                    <TabPane tab="复购图表" key="tab_channel_charts">
                        <div id="re_charts" style={{width: '95%', height: '420px'}}/>
                    </TabPane>
              </Tabs>
            </div>
        );
    }
}