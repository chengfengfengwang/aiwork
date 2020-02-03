import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Modal} from 'antd';
import {Link} from "react-router-dom";

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './course_stats.less'
import echarts from 'echarts/lib/echarts';
import {show_lesson_bar} from "../../components/echarts_coms";


export default class FeeTableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        day: moment().add(-1, 'days').format('YYYY-MM-DD'),
        begin_date: moment(moment().year() + '-' + config.formatNumber((moment().month() + 1))).format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
        choose_channels: [], visible: false,
        choose_share_channels: [],
        cur_channel: '',
        cur_share_channel: '',
        cur_platform: '-1',
        cur_instrument: '-1',
        loading_1: false,
        course_data_list: [], course_stats_data_list: [],
        course_data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`, width: 50,
            },
            {
                title: '乐器名称', dataIndex: 'course_name', key: 'course_name', width: 300,
                sorter: (a, b) => a.course_name.length - b.course_name.length,
            },
            {
                title: '首选该乐器人数', dataIndex: 'user_first_count', key: 'user_first_count',
                sorter: (a, b) => a.user_first_count - b.user_first_count, width: 150,
            },
            {
                title: '试学人数', dataIndex: 'user_count', key: 'user_count',
                sorter: (a, b) => a.user_count - b.user_count, width: 150,
            },
            {
                title: '试学次数', dataIndex: 'play_count', key: 'play_count', width: 150,
                sorter: (a, b) => a.play_count - b.play_count,
            },
            {
                title: '购买人数', dataIndex: 'course_pay_count', key: 'course_pay_count', width: 150,
                sorter: (a, b) => a.course_pay_count - b.course_pay_count,
            },
            {
                title: '试学人数->购买人数', dataIndex: 'reg_cr', key: 'reg_cr',
                sorter: (a, b) => a.reg_cr - b.reg_cr, width: 150,
                render: text => <Row style={{color: '#c959ff'}}>{text}%</Row>,
            },
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
        fetch(this.main_host + '/v3/course_stats/instrument/test/' + '?begin_date=' + begin_date_tmp
            + '&end_date=' + end_date_tmp + '&platform=' + platform
            + '&instrument=' + instrument + '&channel=' + channel
            + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    this.setState({loading_1: false, visible: false});
                    this.setState({course_data_list: json.data})
                }
            );
    }

    get_total_stats_data({}) {
        fetch(this.main_host + '/v3/operating/lesson_test_stats/', {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    if (document.getElementById('channel_charts')) {
                        show_lesson_bar(echarts.init(document.getElementById('channel_charts')), json.data)
                    }
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
        this.get_total_stats_data({});
    }

    handleOk = (e) => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    };

    showModal() {
        this.get_total_stats_data({});
        this.setState({visible: true});
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
                    </Card>
                </Row>

                <Row style={{marginTop: '50px'}}>
                    <Col span={24}>
                        <Card style={{width: '100%'}} className={styles.customCard} title="课程（试学人数-》购买人数，其中首选乐器的人数为独立数据）"
                              hoverable={true}
                              extra={<div><a style={{marginLeft: 20, float: 'right'}} href="javascript:void(0)" onClick={() => this.showModal()}><Icon
                                  type="appstore"/>查看月分布</a></div>}>
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

                <Modal
                    title="试看人数月分布"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width={'900px'}
                >
                    <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>乐器</span>
                            <Select defaultValue="2019" style={{width: 120,}}
                                    onChange={(value) => this.handleInstrumentTotalChange(value)}>
                                <Select.Option value="2019">2019年</Select.Option>
                                <Select.Option value="2018">2018年</Select.Option>
                                <Select.Option value="2017">2017年</Select.Option>
                            </Select>
                        </div>
                    <div id="channel_charts" style={{width: '100%', height: '500px', float: 'right'}}/>
                </Modal>
            </div>
        );
    }
}