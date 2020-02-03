import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Modal, Popconfirm, Button, Form, Input} from 'antd';
import {Link} from "react-router-dom";

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './group_stats.less'


export default class FeeTableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        day: moment().add(-1, 'days').format('YYYY-MM-DD'),
        begin_date: moment(moment().year() + '-' + config.formatNumber((moment().month() + 1))).format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'), cur_index: 0,
        choose_channels: [], cur_count: 0, confirmLoading: false, visible: false,
        choose_share_channels: [], cur_change_data: {name: '', key: ''},
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
                title: 'key', dataIndex: 'key', key: 'key',
                sorter: (a, b) => a.key.length - b.key.length,
            },
            {
                title: '分组名称', dataIndex: 'group_name', key: 'group_name',
                sorter: (a, b) => a.group_name.length - b.group_name.length,
            },
            {
                title: '组员数目', dataIndex: 'num', key: 'num',
                sorter: (a, b) => a.num - b.num,
                render: text => <Link to={
                    {
                        pathname: '/group/users_group_table',
                        query: {
                            type: text,
                            title: 'share_install',
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
                title: '创建日期', dataIndex: 'add_time', key: 'add_time',
                sorter: (a, b) => a.add_time - b.add_time,
            },
            {
                title: '操作', dataIndex: 'operation', key: 'operation',
                render: (text, record, index) => (
                    this.state.course_data_list.length >= 1
                        ? (
                            <div>
                                <Popconfirm title="确定删除?" onConfirm={() => this.handleDelete(record.key)}>
                                    <a href="javascript:;">删除</a>
                                </Popconfirm>
                                <a href="javascript:;" onClick={() => this.setState({visible: true, cur_index: index})}
                                   style={{marginLeft: '10px'}}>修改</a>
                            </div>
                        ) : null
                ),
            }
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
        fetch(this.main_host + '/v3/users/grouping/', {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    this.setState({loading_1: false});
                    this.setState({course_data_list: json.data})
                }
            );
    }

    handleDelete = (key) => {
        this.setState({loading_1: true});
        fetch(this.main_host + '/v3/users/grouping/delete_group/?group_keys=' + key, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    this.setState({loading_1: false});
                }
            );
        this.get_total_data({});
    };

    handleOk = (data) => {
        this.setState({
            confirmLoading: true,
        });
        fetch(this.main_host + '/v3/users/grouping/update_group/?group_keys=' + data.key + '&group_name=' + data.group_name, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    this.get_total_data({});
                    this.setState({
                        visible: false,
                        confirmLoading: false,
                    });
                }
            );
    };

    handleCancel = () => {
        this.get_total_data({});
        this.setState({
            visible: false,
        });
    };

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

    handleAdd = () => {
        const {cur_count} = this.state;
        this.setState({loading_1: true});
        fetch(this.main_host + '/v3/users/grouping/add_group/?group_keys=' + cur_count + '&group_name=' + '新分组', {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    this.setState({loading_1: false});
                }
            );
        this.get_total_data({});
        var aa = cur_count;
        aa += 1;
        this.setState({cur_count: aa});
    };

    handleChange = (value, index, key) => {
        const {course_data_list} = this.state;
        course_data_list[index][key] = value;
        this.setState({course_data_list: course_data_list});
    };

    render() {
        const {
            choose_channels, loading_1, choose_share_channels, course_data_list, course_data_columns, confirmLoading, visible, cur_index, cur_change_data
        } = this.state;

        return (
            <div>
                <Row style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110}}
                     className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>创建时间</span>
                            <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
                                this.onDateCourseTotalChange(date, dateString);
                            }} locale={locale}
                                         defaultValue={[moment(moment().year() + '-' + (moment().month() + 1) + '-01'), moment().add(0, 'days')]}/>
                        </div>

                        <Button onClick={this.handleAdd} type="primary" style={{marginLeft: '10px', float: 'right'}}>添加分组</Button>
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

                <Modal
                    title="修改信息"
                    visible={visible}
                    onOk={() => {
                        this.handleOk(course_data_list[cur_index])
                    }}
                    confirmLoading={confirmLoading}
                    onCancel={this.handleCancel}
                >
                    <Form layout="vertical">
                        <Form.Item label="名称">
                            {
                                this.state.course_data_list.length >= 1
                                    ? (
                                        <Input value={course_data_list[cur_index].group_name}
                                               onChange={(value) => this.handleChange(value.target.value, cur_index, 'group_name')}/>
                                    ) : null
                            }
                        </Form.Item>
                        <Form.Item label="key">{
                            this.state.course_data_list.length >= 1
                                ? (
                                    <Input value={course_data_list[cur_index].key} readOnly={true}
                                           onChange={(value) => this.handleChange(value.target.value, cur_index, 'key')}/>
                                ) : null
                        }
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}