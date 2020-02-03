import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table} from 'antd';
import {Link} from "react-router-dom";

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './course_stats.less'


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
        cur_platform: '-1',
        cur_instrument: '-1',
        loading_1: false,
        course_data_list: [],
        course_data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`, width: 50,
            },
            {
                title: '乐器类型', dataIndex: 'course_instrument', key: 'course_instrument', width: 110,
                sorter: (a, b) => a.course_instrument.length - b.course_instrument.length,
            },
            {
                title: '课程类型', dataIndex: 'course_type_show', key: 'course_type_show', width: 110,
                sorter: (a, b) => a.course_type_show.length - b.course_type_show.length,
            },
            {
                title: '课程名', dataIndex: 'course_name', key: 'course_name', width: 300,
                sorter: (a, b) => a.course_name.length - b.course_name.length,
                render: (text, record, index) => <Link to={
                    {
                        pathname: '/single/lesson_table_2',
                        query: {
                            course_id: record.course_id,
                            sharechidannel: this.state.cur_share_channel,
                            platform: -1,
                            instrument: this.state.cur_instrument,
                            channel: this.state.cur_channel,
                            day: this.state.day, begindate: this.state.begin_date, enddate: this.state.end_date,
                        },
                    }
                }>{text} ({record.course_id})</Link>,
            },
            // {
            //     title: '学习人数', dataIndex: 'number', key: 'number',
            //     sorter: (a, b) => a.number - b.number, width: 150,
            // },
            {
                title: '试学-》购买', dataIndex: 'test_cr', key: 'test_cr',
                sorter: (a, b) => a.test_cr - b.test_cr, width: 150,
                render: text => <Row style={{color: '#c959ff'}}>{text}%</Row>,
            },
            {
                title: '试学人数', dataIndex: 'start_count', key: 'start_count',
                sorter: (a, b) => a.start_count - b.start_count, width: 150,
            },
            {
                title: '购买人数', dataIndex: 'user_count', key: 'user_count', width: 150,
                sorter: (a, b) => a.user_count - b.user_count,
            },
            {
                title: '毕业人数', dataIndex: 'complete_count', key: 'complete_count',
                sorter: (a, b) => a.complete_count - b.complete_count, width: 150,
            },
            // {
            //     title: '平均毕业花费时间(不准、勿参考)', dataIndex: 'avg_complete_time', key: 'avg_complete_time',
            //     sorter: (a, b) => a.avg_complete_time - b.avg_complete_time, width: 150,
            //     render: text => <Row>{text}小时</Row>
            // },
            // {
            //     title: '平均毕业周期（总时间）', dataIndex: 'avg_complete_date', key: 'avg_complete_date',
            //     sorter: (a, b) => a.avg_complete_date - b.avg_complete_date, width: 150,
            //     render: text => <Row>{text}天</Row>
            // },
        ]
    };

    componentDidMount() {
        this.get_total_data({});
    }

    get_total_data({
                       type = '', begin_date_tmp = '', end_date_tmp = '', platform = 'false',
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

        this.setState({loading_1: true});
        fetch(this.main_host + '/v3/operating/course_detail/' + '?begin_date=' + begin_date_tmp
            + '&end_date=' + end_date_tmp + '&platform=' + platform
            + '&instrument=' + instrument + '&channel=' + channel
            + '&share_channel=' + share_channel, {method: 'GET'})
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
                        </div>

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>时间</span>
                            <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
                                this.onDateCourseTotalChange(date, dateString);
                            }} locale={locale}
                                         defaultValue={[moment(moment().year() + '-' + (moment().month() + 1) + '-01'), moment().add(0, 'days')]}/>
                        </div>
                    </Card>
                </Row>

                <Row style={{marginTop: '50px'}}>
                    <Col span={24}>
                        <Card style={{width: '100%'}} className={styles.customCard} title="课程" hoverable={true}>
                            <Table dataSource={course_data_list} loading={loading_1} pagination={false}
                                   scroll={{y: 580}}
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