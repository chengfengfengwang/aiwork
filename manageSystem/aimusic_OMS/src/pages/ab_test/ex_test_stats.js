import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Modal} from 'antd';
import {Link} from "react-router-dom";

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './test_stats.less'
import echarts from 'echarts/lib/echarts';
import {show_lesson_bar} from "../../components/echarts_coms";


export default class FeeTableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        day: moment().add(-1, 'days').format('YYYY-MM-DD'),
        begin_date: moment(moment().year() + '-' + config.formatNumber((moment().month() + 1))).format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
        choose_channels: [],
        choose_share_channels: [],
        cur_channel: '',
        cur_share_channel: '',
        cur_platform: '-1', cur_people: '0',
        cur_instrument: '1',
        loading_1: false,
        course_data_list: [], course_stats_data_list: [],
        course_data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`,
            },
            {
                title: '课程名称', dataIndex: 'course_name', key: 'course_name',
                sorter: (a, b) => a.course_name.length - b.course_name.length,
                render: (text, record, index) => <Link to={
                    {
                        pathname: '/user/payment_table',
                        query: {
                            type: record.stats_type,
                            title: 'ab_test',
                            date_type: 'date',
                            sharechannel: this.state.cur_share_channel,
                            platform: this.state.cur_platform,
                            instrument: this.state.cur_instrument,
                            channel: this.state.cur_channel,
                            day: this.state.day, begindate: this.state.begin_date, enddate: this.state.end_date,
                        },
                    }
                }>{text}</Link>,
            },
            {
                title: '分组名称', dataIndex: 'group', key: 'group',
                sorter: (a, b) => a.group.length - b.group.length,
            },
            {
                title: '开始日期', dataIndex: 'start_date', key: 'start_date',
                sorter: (a, b) => a.start_date.length - b.start_date.length,
            },
            {
                title: '注册人数', dataIndex: 'reg_number', key: 'reg_number',
                sorter: (a, b) => a.reg_number - b.reg_number,
            },
            {
                title: '推广人数', dataIndex: 'sample_number', key: 'sample_number',
                sorter: (a, b) => a.sample_number - b.sample_number,
            },
                        {
                title: '练习人数', dataIndex: 'study_played_count', key: 'study_played_count',
                sorter: (a, b) => a.study_played_count - b.study_played_count,
            },
            {
                title: '试学人数', dataIndex: 'study_number', key: 'study_number',
                sorter: (a, b) => a.study_number - b.study_number,
            },
            // {
            //     title: '平均试学课目数', dataIndex: 'lesson_count', key: 'lesson_count',
            //     sorter: (a, b) => a.lesson_count - b.lesson_count,
            // },
            {
                title: '试学次数', dataIndex: 'study_count', key: 'study_count',
                sorter: (a, b) => a.study_count - b.study_count,
            },
            {
                title: '购买人数', dataIndex: 'pay_number', key: 'pay_number',
                sorter: (a, b) => a.pay_number - b.pay_number,
            },
            // {
            //     title: '购买人次', dataIndex: 'pay_count', key: 'pay_count',
            //     sorter: (a, b) => a.pay_count - b.pay_count,
            //     render: (text, record, index) => <Link to={
            //         {
            //             pathname: '/user/payment_table',
            //             query: {
            //                 type: record.stats_type,
            //                 title: 'ab_test',
            //                 date_type: 'date',
            //                 sharechannel: this.state.cur_share_channel,
            //                 platform: this.state.cur_platform,
            //                 instrument: this.state.cur_instrument,
            //                 channel: this.state.cur_channel,
            //                 day: this.state.day, begindate: this.state.begin_date, enddate: this.state.end_date,
            //             },
            //         }
            //     }>{text}</Link>,
            // },
            // {
            //     title: '试学人数->购买人数', dataIndex: 'ra', key: 'ra',
            //     sorter: (a, b) => a.ra - b.ra, width: 150,
            //     render: text => <Row style={{color: '#c959ff'}}>{text}%</Row>,
            // },
        ]
    };

    componentDidMount() {
        this.get_total_data({});
    }

    get_total_data({
                       type = '', begin_date_tmp = '', end_date_tmp = '', platform = 'false',
                       instrument = 'false', people = 'false', need_count = 15
                   }) {
        const {
            begin_date, end_date, date_channel_type, cur_platform,
            cur_instrument, cur_people
        } = this.state;
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
        if (people === 'false') {
            people = cur_people;
        }

        this.setState({loading_1: true});
        fetch(this.main_host + '/v3/ab_test/ex/' + '?begin_date=' + begin_date_tmp
            + '&end_date=' + end_date_tmp + '&platform=' + platform
            + '&instrument=' + instrument + '&people=' + people, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    this.setState({loading_1: false});
                    this.setState({course_data_list: json.data})
                }
            );
    }

    handlePlatformTotalChange(value) {
        this.setState({cur_platform: value});
        this.get_total_data({platform: value});
    }

    onDateCourseTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_total_data({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    handleChannelChange(value) {
        value = `${value}`;
        this.setState({cur_channel: value});
        this.get_total_data({channel: value});
    }

    handleShareChannelChange(value) {
        value = `${value}`;
        this.setState({cur_share_channel: value});
        this.get_total_data({share_channel: value});
    }

    handleInstrumentTotalChange(value) {
        this.setState({cur_instrument: value});
        this.get_total_data({instrument: value});
    }

    handlePeopleTotalChange(value) {
        this.setState({cur_people: value});
        this.get_total_data({people: value});
    }

    render() {
        const {
            choose_channels, loading_1, choose_share_channels, course_data_list, course_data_columns
        } = this.state;

        return (
            <div>
                <Row style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110}}
                     className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>时间</span>
                            <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
                                this.onDateCourseTotalChange(date, dateString);
                            }} locale={locale}
                                         defaultValue={[moment(moment().year() + '-' + (moment().month() + 1) + '-01'), moment().add(0, 'days')]}/>
                        </div>

                        <div style={{marginLeft: '10px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>推广人群选择</span>
                            <Select defaultValue="0" style={{width: 150,}}
                                    onChange={(value) => this.handlePeopleTotalChange(value)}>
                                <Option value="-1">所有人群</Option>
                                <Option value="0">首选该乐器人群</Option>
                                <Option value="1">选择该乐器人群</Option>
                            </Select>
                        </div>

                        <div style={{marginLeft: '10px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>乐器</span>
                            <Select defaultValue="1" style={{width: 110,}}
                                    onChange={(value) => this.handleInstrumentTotalChange(value)}>
                                <Option value="-1">全部</Option>
                                <Option value="0">吉他</Option>
                                <Option value="1">尤克里里</Option>
                                <Option value="2">卡林巴</Option>
                                <Option value="3">非洲鼓</Option>
                                <Option value="4">钢琴</Option>
                            </Select>
                        </div>
                    </Card>
                </Row>

                <Row style={{marginTop: '50px'}}>
                    <Col span={24}>
                        <Card style={{width: '100%'}} className={styles.customCard} title="试学课程统计"
                              hoverable={true}>
                            <Table dataSource={course_data_list} loading={loading_1} pagination={false}
                                   className={styles.customTable} columns={course_data_columns} size="small"
                                   onRow={(record, index) => {

                                       return {
                                           onClick: () => {
                                           }
                                       }
                                   }}
                            />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}