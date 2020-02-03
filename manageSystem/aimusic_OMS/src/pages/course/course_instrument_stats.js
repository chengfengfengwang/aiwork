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
        visible: false,
        loading_1: false,
        instrument_list: [0, 1, 2, 3, 4, 6],
        data_list: [], course_stats_data_list: [],
        course_data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`, width: 50,
            },
            {
                title: '首选乐器名称', dataIndex: 'name', key: 'name', width: 150,
                sorter: (a, b) => a.name.length - b.name.length,
            },
            {
                title: '注册人数', dataIndex: 'reg_number', key: 'reg_number', width: 150,
                sorter: (a, b) => a.reg_number - b.reg_number,
            },
            {
                title: '首选该乐器人数', dataIndex: 'user_first_count', key: 'user_first_count',
                sorter: (a, b) => a.user_first_count - b.user_first_count, width: 150, defaultSortOrder: 'descend',
            },
            {
                title: '试学人数', dataIndex: 'test_study_number', key: 'test_study_number',
                sorter: (a, b) => a.test_study_number - b.test_study_number, width: 150,
            },
            {
                title: '学习人数', dataIndex: 'study_number', key: 'study_number', width: 150,
                sorter: (a, b) => a.study_number - b.study_number,
            },
            {
                title: '购买人数', dataIndex: 'pay_number', key: 'pay_number',
                sorter: (a, b) => a.pay_number - b.pay_number,
            }
        ]
    };

    componentDidMount() {
        const {instrument_list, data_list} = this.state;
        instrument_list.forEach((item, index)=>{
            this.get_total_data({type: 'default', instrument:item, data_list:data_list});
        });
    }

    get_total_data({
                       begin_date_tmp = '', end_date_tmp = '', instrument = '', data_list = []
                   }) {
        const {begin_date, end_date} = this.state;
        if (begin_date_tmp.length === 0) {
            begin_date_tmp = begin_date;
        }
        if (end_date_tmp.length === 0) {
            end_date_tmp = end_date;
        }

        fetch(this.main_host + '/v3/operating/user_change_stats/'
            + '?begin_date=' + begin_date_tmp
            + '&end_date=' + end_date_tmp
            + '&instrument_type=' + instrument, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    this.setState({loading_1: false, visible: false});
                    data_list.push(json.data);
                    this.setState({data_list: data_list});
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

    onDateCourseTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1], data_list: []});
        const {instrument_list, data_list} = this.state;
        let temp = data_list;
        temp = [];
        instrument_list.forEach((item, index)=>{
            this.get_total_data({instrument:item, data_list:temp, begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        });
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
            loading_1, data_list, course_data_columns
        } = this.state;

        return (
            <div>
                <Row style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110}}
                     className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>注册时间</span>
                            <RangePicker onChange={(date, dateString) => {
                                this.onDateCourseTotalChange(date, dateString);
                            }} locale={locale}
                                         defaultValue={[moment(moment().year() + '-' + (moment().month() + 1) + '-01'), moment().add(0, 'days')]}/>
                        </div>
                    </Card>
                </Row>

                <Row style={{marginTop: '50px'}}>
                    <Col span={24}>
                        <Card style={{width: '100%'}} className={styles.customCard} title="用户转化统计"
                              hoverable={true}
                              extra={<div><a style={{marginLeft: 20, float: 'right'}} href="javascript:void(0)" onClick={() => this.showModal()}><Icon
                                  type="appstore"/>查看月分布</a></div>}>
                            <Table dataSource={data_list} loading={loading_1} pagination={false}
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
                            <span>乐器</span>
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