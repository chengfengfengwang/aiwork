import React from 'react';
import {Icon, Card, List, DatePicker, Select, Tabs} from 'antd';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
moment.locale('zh-cn');
import config from "../../config/app_config";
import {show_day_line_many} from "../../components/echarts_coms";
import echarts from 'echarts/lib/echarts';
const {TabPane} = Tabs;


export default class FeeDayStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        table_key: 'tab_channel_table',
        day_channel_count: [], need_show_count: 999,
        day: moment().add(-1, 'days').format('YYYY-MM-DD'), day_channel_type: 'channel', list_loading: false
    };

    componentDidMount() {
        this.get_day_channel_list({});
    }

    get_day_channel_list({day_tmp='', channel_type='', default_need_show_count=-1}) {
        const {day, day_channel_type, need_show_count} = this.state;
        if (day_tmp.length === 0){
            day_tmp = day;
        }
        if (channel_type.length === 0){
            channel_type = day_channel_type;
        }
        if (default_need_show_count === -1) {
            default_need_show_count = need_show_count;
        }

        fetch(this.main_host + `/v3/operating/day_channel_ranking/?cal_type=fee`
            + '&day=' + day_tmp + '&channel_type=' + channel_type + '&need_count=' + default_need_show_count, {
            method: 'GET'
        }).then(res => res.json()).then(
            json => {
                this.setState({day_channel_count: json.list});
            }
        )
    }

    get_day_channel_charts({day_tmp='', channel_type='', default_need_show_count=-1}) {
        const {day, day_channel_type, need_show_count} = this.state;
        if (day_tmp.length === 0){
            day_tmp = day;
        }
        if (channel_type.length === 0){
            channel_type = day_channel_type;
        }
        if (default_need_show_count === -1) {
            default_need_show_count = need_show_count;
        }
        this.setState({list_loading: true});

        fetch(this.main_host + `/v3/operating/day_channel_detail/?cal_type=fee`
            + '&day=' + day_tmp + '&channel_type=' + channel_type + '&need_count=' + default_need_show_count, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({list_loading: false});
                show_day_line_many(echarts.init(document.getElementById('day_channel_charts')), json);
            }
        )
    }

    onTypeChange(key){
        switch (key) {
            case 'tab_channel_table':
                this.setState({table_key: key});
                this.get_day_channel_list({});
                break;

            case 'tab_channel_charts':
                this.setState({table_key: key});
                this.get_day_channel_charts({});
                break;
        }
    }

    handleShowCountChange(value){
        const {table_key} = this.state;
        this.setState({need_show_count: parseInt(value)});
        switch (table_key) {
            case 'tab_channel_table':
                this.get_day_channel_list({default_need_show_count: parseInt(value)});
                break;
            case 'tab_channel_charts':
                this.get_day_channel_charts({default_need_show_count: parseInt(value)});
                break;
        }
    }

    onDayChange(date, dateString) {
        const {table_key} = this.state;
        this.setState({day: dateString});
        switch (table_key) {
            case 'tab_channel_table':
                this.get_day_channel_list({day_tmp: dateString});
                break;
            case 'tab_channel_charts':
                this.get_day_channel_charts({day_tmp: dateString});
                break;
        }
    }

    handleChannelDayChange(value){
        const {table_key} = this.state;
        this.setState({day_channel_type: value});
        switch (table_key) {
            case 'tab_channel_table':
                this.get_day_channel_list({channel_type: value});
                break;
            case 'tab_channel_charts':
                this.get_day_channel_charts({channel_type: value});
                break;
        }
    }

    render() {
        const {day_channel_count, list_loading} = this.state;
        return (
            <div style={{background: '#fff', padding: '10px'}}>
                <Tabs defaultActiveKey="tab_channel_table"
                      tabBarExtraContent={
                          <div>
                              <DatePicker style={{marginLeft: 10}}
                                onChange={(date, dateString) => {this.onDayChange(date, dateString);
                                }} locale={locale} defaultValue={moment().add(-1, 'days')}/>
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
                            <Select defaultValue="channel" style={{width: 120, marginLeft: '10px'}}
                                    onChange={(value) => this.handleChannelDayChange(value)}>
                                <Select.Option value="channel">渠道1</Select.Option>
                                <Select.Option value="share_channel">渠道2</Select.Option>
                            </Select>
                          </div>
                      }
                      onChange={(value) => this.onTypeChange(value)}>
                    <TabPane tab="渠道维度表格" key="tab_channel_table">
                        <List size="small" header={<div>排行前{day_channel_count.length}</div>}
                              bordered loading={list_loading}  dataSource={day_channel_count}
                              renderItem={item => (<List.Item>{item.index} . {item.label} : {item.value}</List.Item>)}
                        />
                    </TabPane>
                    <TabPane tab="渠道维度图表" key="tab_channel_charts">
                        <div id="day_channel_charts" style={{width: '95%', height: '600px'}}/>
                    </TabPane>
              </Tabs>
            </div>
        );
    }
}