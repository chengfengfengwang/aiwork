import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Avatar, Tabs} from 'antd';
import {Link} from "react-router-dom";
const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

const {TabPane} = Tabs;
moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './lesson_stats.less'
import {show_course_bar} from "../../components/echarts_coms";
import echarts from 'echarts/lib/echarts';


export default class UsersTable extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;

    constructor(props) {
        super(props);
        let data = this.props.location.query;
        this.state = {
            day: data.day, begin_date: data.begindate,
            end_date: data.enddate,
            cur_channel: data.channel || '', cur_share_channel: data.sharechannel || '',
            cur_platform: data.platform || -1, cur_instrument: data.instrument || -1,
            cur_device_models: '', date_type: data.date_type, course_id: data.course_id,
            data_list: [], cur_studied_at: 0,
            data_columns: [
                {
                    title: '序号',
                    render: (text, record, index) => `${index + 1}`, width: 50,
                },
                {title: '名称', dataIndex: 'name', key: 'name', width: 150},
                {
                    title: '课程类型', dataIndex: 'experience', key: 'experience', width: 150,
                    render: text =>
                        <Row style={{color: '#ff6b0c'}}>{text}</Row>
                },
                // {
                //     title: '包含练习数目', dataIndex: 'material_num', key: 'material_num', width: 150,
                //     sorter: (a, b) => a.material_num - b.material_num,
                //     render: text => <Link to={
                //         {
                //             pathname: '/course/material_table',
                //             query: {
                //                 lesson_id: text.split('_')[0],
                //                 sharechidannel: this.state.cur_share_channel,
                //                 platform: -1,
                //                 instrument: this.state.cur_instrument,
                //                 channel: this.state.cur_channel,
                //                 day: this.state.day, begindate: this.state.begin_date, enddate: this.state.end_date,
                //             },
                //         }
                //     }>{text.split('_')[1]}</Link>,
                // },
                {
                    title: '学习人数', dataIndex: 'study_count', key: 'study_count', width: 120,
                    sorter: (a, b) => a.study_count - b.study_count,
                },
                {
                    title: '通过人数', dataIndex: 'complete_count', key: 'complete_count',
                    sorter: (a, b) => a.complete_count - b.complete_count, width: 150,
                },
                {
                    title: '通过率', dataIndex: 'complete_cr', key: 'complete_cr',
                    sorter: (a, b) => a.complete_cr - b.complete_cr, width: 150,
                    render: text => <Row style={{color: '#c959ff'}}>{text}%</Row>,
                },
                {
                    title: 'App购买学习人数', dataIndex: 'study_buy_count', key: 'study_buy_count', width: 120,
                    sorter: (a, b) => a.study_buy_count - b.study_buy_count,
                },
                // {
                //     title: '未激活学习人数', dataIndex: 'study_none_count', key: 'study_none_count', width: 120,
                //     sorter: (a, b) => a.study_none_count - b.study_none_count,
                // },
                {
                    title: '其他激活学习人数', dataIndex: 'study_other_count', key: 'study_other_count', width: 120,
                    sorter: (a, b) => a.study_other_count - b.study_other_count,
                },
            ],
            loading_1: false, total: 0, export_url: '',
        };
    }

    componentDidMount() {
        document.querySelector('#myBread').style.display = 'none';
        this.get_data({});
    }

    componentWillUnmount() {
        document.querySelector('#myBread').style.display = 'block'
    }

    get_data({
                 type = '', begin_date_tmp = '', end_date_tmp = '', channel_type = 'false', platform = 'false', studied_at = 'false',
                 instrument = 'false', channel = 'false', share_channel = 'false', need_count = 9999, page = 0,
             }) {
        const {
            begin_date, end_date, date_channel_type, cur_platform, day,
            cur_instrument, cur_channel, cur_share_channel, course_id, date_type, cur_studied_at
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
        if (studied_at === 'false') {
            studied_at = cur_studied_at;
        }

        this.setState({loading_1: true});
        if (date_type === 'date') {
            let url = this.main_host + `/v3/operating/lesson_detail/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                + '&channel=' + channel + '&share_channel=' + share_channel + '&page=' + page + '&size=' + need_count
                + '&course_id=' + course_id + '&studied_at=' + studied_at;

            let my_echart = echarts.init(document.getElementById('channel_charts'));
            my_echart.showLoading();
            this.setState({export_url: url + '&need_export=' + true});
            fetch(url, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                    this.setState({loading_1: false});
                    this.setState({data_list: json.data, total: json.total});
                    if (json.total < 20) {
                        document.querySelector('#channel_charts').style.height = "1000px";
                    }else if (json.total >= 20 && json.total < 30) {
                        document.querySelector('#channel_charts').style.height = "1500px";
                    } else if (json.total >= 30 && json.total < 50) {
                        document.querySelector('#channel_charts').style.height = "1700px";
                    } else if (json.total >= 50 && json.total < 60) {
                        document.querySelector('#channel_charts').style.height = "1800px";
                    } else if (json.total >= 60) {
                        document.querySelector('#channel_charts').style.height = "2200px";
                    }
                    show_course_bar(my_echart, json, begin_date, end_date);
                });
        } else {
            let url = this.main_host + `/v3/operating/lesson_detail/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                + '&channel=' + channel + '&share_channel=' + share_channel + '&page=' + page + '&size=' + need_count
                + '&course_id=' + course_id + '&studied_at=' + studied_at;

            let my_echart = echarts.init(document.getElementById('channel_charts'));
            my_echart.showLoading();
            this.setState({export_url: url + '&need_export=' + true});
            fetch(url, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                    this.setState({loading_1: false});
                    this.setState({data_list: json.data, total: json.total});
                    if (json.total < 20) {
                        document.querySelector('#channel_charts').style.height = "1000px";
                    }else if (json.total >= 20 && json.total < 30) {
                        document.querySelector('#channel_charts').style.height = "1500px";
                    } else if (json.total >= 30 && json.total < 50) {
                        document.querySelector('#channel_charts').style.height = "1700px";
                    } else if (json.total >= 50 && json.total < 60) {
                        document.querySelector('#channel_charts').style.height = "1800px";
                    } else if (json.total >= 60) {
                        document.querySelector('#channel_charts').style.height = "2200px";
                    }
                    show_course_bar(my_echart, json, begin_date, end_date);
                });
        }
    }

    changePage = (page, pageSize) => {
        this.get_data({page: page - 1, need_count: pageSize});
    };

    showTotal = (total) => {
        return `总数 ${total} `;
    };

    onTypeChange = () => {

    };

    onDateTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_data({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    handleDateTypeTotalChange(value){
        this.setState({cur_studied_at: value});
        this.get_data({studied_at: value});
    }

    render() {
        const {data_columns, loading_1, data_list, total, export_url} = this.state;
        const paginationProps = {pageSize: 9999, total: total, showTotal: this.showTotal, onChange: this.changePage};
        return (
            <div style={{padding: '10px'}}>
                <Breadcrumb style={{padding: '15px 0 10px 0'}}>
                    <Breadcrumb.Item><a href="/dashbord">主页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>课程统计</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/#/course/stats_course">课程学习统计</a></Breadcrumb.Item>
                    <Breadcrumb.Item>课件统计</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <Select defaultValue="0" style={{width: 200,}}
                            onChange={(value) => this.handleDateTypeTotalChange(value, 'total', '')}>
                        <Select.Option value="0">最后练习时间</Select.Option>
                        <Select.Option value="1">最初练习时间</Select.Option>
                    </Select>
                    <RangePicker style={{marginLeft: 10}} onChange={(date, dateString) => {
                        this.onDateTotalChange(date, dateString);
                    }} locale={locale}
                                 defaultValue={[moment(moment().year() + '-' + (moment().month() + 1) + '-01'), moment().add(0, 'days')]}/>
                </div>
                <Tabs defaultActiveKey="tab_channel_table"
                      onChange={(value) => this.onTypeChange(value)}>
                    <TabPane tab="课件图表" key="tab_channel_table">
                        <Row style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110}}
                             className={styles.customThin}>
                        </Row>
                        <div id="channel_charts" style={{width: '95%', height: '1000px'}}/>
                    </TabPane>
                    <TabPane tab="课件表格" key="tab_channel_charts">
                        <Row>
                            <Col span={24}>
                                <Card
                                    style={{width: '100%'}} className={styles.customCard}
                                    title="小节列表（倒序）"
                                    extra={<div><a style={{marginLeft: 20, float: 'right'}} href={export_url}><Icon
                                        type="download"/>数据导出</a>
                                    </div>}
                                    hoverable={true}
                                >
                                    <Table dataSource={data_list.reverse()} loading={loading_1} bordered
                                           pagination={paginationProps} scroll={{y: 550}}
                                           columns={data_columns} size="small"
                                    />
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}