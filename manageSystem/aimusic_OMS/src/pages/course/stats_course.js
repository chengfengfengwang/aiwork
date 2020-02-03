import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table} from 'antd';
import {Link} from "react-router-dom";

const {RangePicker} = DatePicker;
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from '../course/course_stats.less'


export default class TableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        begin_date: moment(moment().year() + '-' + config.formatNumber((moment().month() + 1))).format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
        cur_instrument: '', cur_online: '1', cur_level: '1', cur_type: '', total: 0,
        fee_data_list: [],
        fee_data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`, width: 40, fixed: 'left',
            },
            {
                title: '名称', dataIndex: 'course_name', key: 'course_name',
                sorter: (a, b) => a.course_name.length - b.course_name.length, width: 200, fixed: 'left',
                render: (text, record, index) => <Link to={
                    {
                        pathname: '/course/lesson_table',
                        query: {
                            course_id: record.id,
                            begindate: this.state.begin_date, enddate: this.state.end_date,
                        },
                    }
                }>{text}</Link>,
            },
            {
                title: '课程级别', dataIndex: 'course_level', key: 'course_level',
                sorter: (a, b) => a.course_level - b.course_level, width: 100,
            },
            {
                title: '课程类型', dataIndex: 'course_type', key: 'course_type',
                sorter: (a, b) => a.course_type - b.course_type, width: 100,
            },
            {
                title: '激活情况',
                children: [
                    {
                        title: 'App内激活',
                        children: [
                            {
                                title: '激活人数', dataIndex: 'app_purchase_number', key: 'app_purchase_number',
                                sorter: (a, b) => a.app_purchase_number - b.app_purchase_number, width: 100,
                            },
                            {
                                title: '激活单数', dataIndex: 'app_purchase_count', key: 'app_purchase_count',
                                sorter: (a, b) => a.app_purchase_count - b.app_purchase_count, width: 100,
                            },
                        ],
                    },
                    {
                        title: '总激活',
                        children: [
                            {
                                title: '激活人数', dataIndex: 'other_purchase_number', key: 'other_purchase_number',
                                sorter: (a, b) => a.other_purchase_number - b.other_purchase_number, width: 100,
                            },
                            {
                                title: '激活单数', dataIndex: 'other_purchase_count', key: 'other_purchase_count',
                                sorter: (a, b) => a.other_purchase_count - b.other_purchase_count, width: 100,
                            },
                        ],
                    },
                ]
            },
            {
                title: '学习情况',
                children: [
                    {
                        title: '体验课件',
                        children: [
                            {
                                title: '学习人数', dataIndex: 'course_test_study_number', key: 'course_test_study_number',
                                sorter: (a, b) => a.course_test_study_number - b.course_test_study_number, width: 100,
                            },
                            {
                                title: '学习次数', dataIndex: 'course_test_study_played_count', key: 'course_test_study_played_count',
                                sorter: (a, b) => a.course_test_study_played_count - b.course_test_study_played_count, width: 100,
                            },
                        ],
                    },
                    {
                        title: '所有课件',
                        children: [
                            {
                                title: '学习人数', dataIndex: 'course_study_number', key: 'course_study_number',
                                sorter: (a, b) => a.course_study_number - b.course_study_number, width: 100,
                                defaultSortOrder:'descend'
                            },
                            {
                                title: '学习次数', dataIndex: 'course_study_played_count', key: 'course_study_played_count',
                                sorter: (a, b) => a.course_study_played_count - b.course_study_played_count, width: 100,
                            },
                        ],
                    },
                ]
            },
            {
                title: '学习时长',
                children: [
                    {
                        title: '总时间',
                        children: [
                            {
                                title: '总时长', dataIndex: 'total_duration', key: 'total_duration',
                                sorter: (a, b) => a.total_duration - b.total_duration, width: 100,
                            },
                            {
                                title: '人均学习时长', dataIndex: 'total_duration_avg_user', key: 'total_duration_avg_user',
                                sorter: (a, b) => a.total_duration_avg_user - b.total_duration_avg_user, width: 130,
                            },
                            {
                                title: '次均学习时长', dataIndex: 'total_duration_avg_count', key: 'total_duration_avg_count',
                                sorter: (a, b) => a.total_duration_avg_count - b.total_duration_avg_count, width: 130,
                            },
                        ],
                    },
                    {
                        title: '时间筛选下',
                        children: [
                            {
                                title: '总时长', dataIndex: 'duration', key: 'duration',
                                sorter: (a, b) => a.duration - b.duration, width: 100,
                            },
                            {
                                title: '人均学习时长', dataIndex: 'duration_avg_user', key: 'duration_avg_user',
                                sorter: (a, b) => a.duration_avg_user - b.duration_avg_user, width: 130,
                            },
                            {
                                title: '次均学习时长', dataIndex: 'duration_avg_count', key: 'duration_avg_count',
                                sorter: (a, b) => a.duration_avg_count - b.duration_avg_count, width: 130,
                            },
                        ],
                    },
                ],
            },
            {
                title: '完课人数',
                children: [
                    {
                        title: '总完课', dataIndex: 'completed_total_number', key: 'completed_total_number',
                        sorter: (a, b) => a.completed_total_number - b.completed_total_number, width: 110,
                    },
                    {
                        title: '时间筛选下完课', dataIndex: 'completed_number', key: 'completed_number',
                        sorter: (a, b) => a.completed_number - b.completed_number, width: 140,
                    },
                    {
                        title: '完课率(时间筛选下)', dataIndex: 'rate_complete_study', key: 'rate_complete_study',
                        sorter: (a, b) => a.rate_complete_study - b.rate_complete_study, width: 140,
                        render: (text, record, index) => <div>{text}%</div>,
                    }
                ],
            },
        ],
        loading_1: false, export_url: ''
    };

    componentDidMount() {
        this.get_data({type: 'share_channel'});
    }

    handleInstrumentChange(value) {
        this.setState({cur_instrument: value});
        this.get_data({instrument: value});
    }

    handleOnlineChange(value) {
        this.setState({cur_online: value});
        this.get_data({online: value});
    }

    handleLevelChange(value) {
        this.setState({cur_level: value});
        this.get_data({level: value});
    }

    handleTypeChange(value) {
        this.setState({cur_type: value});
        this.get_data({course_type: value});
    }

    handleDateChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_data({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    changePage = (page, pageSize) => {
        this.get_data({page: page - 1, need_count: pageSize});
    };

    showTotal = (total) => {
        return `总数 ${total} `;
    };

    get_data({
                 type = '', begin_date_tmp = '', end_date_tmp = '', page = 0,
                 instrument = 'false', need_count = 15, online = 'false', level = 'false', course_type = 'false'
             }) {
        const {
            begin_date, end_date, cur_instrument, cur_online, cur_level, cur_type
        } = this.state;
        if (begin_date_tmp.length === 0) {
            begin_date_tmp = begin_date;
        }
        if (end_date_tmp.length === 0) {
            end_date_tmp = end_date;
        }
        if (instrument === 'false') {
            instrument = cur_instrument;
        }
        if (online === 'false') {
            online = cur_online;
        }
        if (level === 'false') {
            level = cur_level;
        }
        if (course_type === 'false') {
            course_type = cur_type;
        }

        this.setState({loading_1: true});
        fetch(this.main_host + '/v3/operating/course_stats/' + '?begin_date=' + begin_date_tmp
            + '&end_date=' + end_date_tmp
            + '&instrument_type=' + instrument
            + '&online=' + online + '&page=' + page
            + '&level=' + level + '&size=' + need_count
            + '&type=' + course_type
            , {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    this.setState({loading_1: false});
                    this.setState({fee_data_list: json.data, total: json.total});
                }
            );
    }

    render() {
        const {
            fee_data_columns, loading_1, fee_data_list, total
        } = this.state;
        const paginationProps = {
            pageSize: 15, size: "small", total: total, showQuickJumper: true,
            showTotal: this.showTotal, onChange: this.changePage
        };
        return (
            <div>
                <Row style={{}}>
                    <div style={{float: 'left', marginRight: "10px"}}>
                        <span style={{marginRight: "10px"}}>是否上线</span>
                        <Select defaultValue="1" style={{width: 80,}}
                                onChange={(value) => this.handleOnlineChange(value)}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="0">否</Select.Option>
                            <Select.Option value="1">是</Select.Option>
                        </Select>
                    </div>

                    <div style={{float: 'left'}}>
                        <span style={{marginRight: "10px"}}>乐器类型</span>
                        <Select defaultValue="" style={{width: 120,}}
                                onChange={(value) => this.handleInstrumentChange(value)}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="0">吉他</Select.Option>
                            <Select.Option value="1">尤克里里</Select.Option>
                            <Select.Option value="2">卡林巴</Select.Option>
                            <Select.Option value="3">非洲鼓</Select.Option>
                            <Select.Option value="4">钢琴</Select.Option>
                            <Select.Option value="6">口琴</Select.Option>
                            <Select.Option value="6">口琴</Select.Option>
                        </Select>
                    </div>

                    <div style={{float: 'left', marginLeft: "10px"}}>
                        <span style={{marginRight: "10px"}}>课程级别</span>
                        <Select defaultValue="1" style={{width: 80,}}
                                onChange={(value) => this.handleLevelChange(value)}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="1">必修</Select.Option>
                            <Select.Option value="2">选修</Select.Option>
                        </Select>
                    </div>

                    <div style={{float: 'left', marginLeft: "10px"}}>
                        <span style={{marginRight: "10px"}}>课程类型</span>
                        <Select defaultValue="" style={{width: 120,}}
                                onChange={(value) => this.handleTypeChange(value)}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="0">初级</Select.Option>
                            <Select.Option value="2">进阶</Select.Option>
                            <Select.Option value="3">中级</Select.Option>
                            <Select.Option value="1">亲子</Select.Option>
                        </Select>
                    </div>

                    <div style={{float: 'left', marginLeft: '10px'}}>
                        <span style={{marginRight: "10px"}}>时间</span>
                        <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
                            this.handleDateChange(date, dateString);
                        }} locale={locale}
                                     defaultValue={[moment(moment().year() + '-' + (moment().month() + 1) + '-01'), moment().add(0, 'days')]}/>
                    </div>
                </Row>

                <Row style={{marginTop: 10}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="课程统计"
                            hoverable={true}
                        >
                            <Table dataSource={fee_data_list} loading={loading_1} bordered rowKey={record => record.id}
                                   scroll={{x: 2300, y: 500}} pagination={paginationProps}
                                   columns={fee_data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}