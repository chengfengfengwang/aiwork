import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Avatar, Tabs, Modal} from 'antd';
import {Link} from "react-router-dom";

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

const {TabPane} = Tabs;
moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './lesson_stats.less'
import {show_material_bar} from "../../components/echarts_coms";
import echarts from 'echarts/lib/echarts';


export default class UsersTable extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;

    constructor(props) {
        super(props);
        let data = this.props.location.query;
        this.state = {
            day: data.day, begin_date: '2017-01-01',
            end_date: data.enddate, visible: true,
            cur_channel: data.channel, cur_share_channel: data.sharechannel,
            cur_platform: data.platform, cur_instrument: data.instrument,
            cur_device_models: '', date_type: data.date_type, lesson_id: data.lesson_id,
            data_list: [], material_id: 0, data_list2: [],
            data_columns: [
                {
                    title: '序号',
                    render: (text, record, index) => `${index + 1}`, width: 50,
                },
                {title: '名称', dataIndex: 'title', key: 'title', width: 150},
                {
                    title: '练习总次数', dataIndex: 'total', key: 'total', width: 150,
                    sorter: (a, b) => a.total - b.total,
                },
                {
                    title: '练习人数', dataIndex: 'user_count', key: 'user_count',
                    sorter: (a, b) => a.user_count - b.user_count, width: 150,
                },
                {
                    title: '人均练习次数', dataIndex: 'avg_count', key: 'avg_count', width: 150,
                    sorter: (a, b) => a.avg_count - b.avg_count,
                },
            ],
            loading_1: false, total: 0, export_url: '',
        };
    }

    componentDidMount() {
        document.querySelector('#myBread').style.display = 'none';
        this.get_data({});
        this.get_data_1({});
    }

    componentWillUnmount() {
        document.querySelector('#myBread').style.display = 'block'
    }

    get_data({
                 type = '', begin_date_tmp = '', end_date_tmp = '', channel_type = 'false', platform = 'false',
                 instrument = 'false', channel = 'false', share_channel = 'false', need_count = 9999, page = 0,
             }) {
        const {
            begin_date, end_date, date_channel_type, cur_platform, day,
            cur_instrument, cur_channel, cur_share_channel, lesson_id, date_type
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

        this.setState({loading_1: true});
        if (date_type === 'date') {
            let url = this.main_host + `/v3/operating/material_detail/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                + '&channel=' + channel + '&share_channel=' + share_channel + '&page=' + page + '&size=' + need_count
                + '&lesson_id=' + lesson_id;
            this.setState({export_url: url + '&need_export=' + true});
            fetch(url, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                    this.setState({loading_1: false});
                    this.setState({data_list: json.data, total: json.total});
                });
        } else {
            let url = this.main_host + `/v3/operating/material_detail/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                + '&channel=' + channel + '&share_channel=' + share_channel + '&page=' + page + '&size=' + need_count
                + '&lesson_id=' + lesson_id;
            this.setState({export_url: url + '&need_export=' + true});
            fetch(url, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                    this.setState({loading_1: false});
                    this.setState({data_list: json.data, total: json.total});
                });
        }
    }

    get_data_1({
                 type = '', begin_date_tmp = '', end_date_tmp = '', channel_type = 'false', platform = 'false',
                 instrument = 'false', channel = 'false', share_channel = 'false', need_count = 9999, page = 0, material_id_tmp=-1,
             }) {
        const {
            begin_date, end_date, date_channel_type, cur_platform, day,
            cur_instrument, cur_channel, cur_share_channel, material_id, date_type
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
        if (material_id_tmp === '-1') {
            material_id_tmp = material_id;
        }

        if (date_type === 'date') {
            let url = this.main_host + `/v3/operating/material_count_stats/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                + '&channel=' + channel + '&share_channel=' + share_channel + '&page=' + page + '&size=' + need_count
                + '&material_id=' + material_id_tmp;
            this.setState({export_url: url + '&need_export=' + true});
            fetch(url, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                });
        } else {
            let url = this.main_host + `/v3/operating/material_count_stats/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                + '&channel=' + channel + '&share_channel=' + share_channel + '&page=' + page + '&size=' + need_count
                + '&material_id=' + material_id_tmp;
            this.setState({export_url: url + '&need_export=' + true});
            fetch(url, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                    show_material_bar(echarts.init(document.getElementById('channel_charts')), json, begin_date, end_date);
                });
        }
    }

    changePage = (page, pageSize) => {
        this.get_data({page: page - 1, need_count: pageSize});
    };

    showTotal = (total) => {
        return `总数 ${total} `;
    };

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

    onTypeChange = () => {

    };

    onDateTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_data({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    render() {
        const {data_columns, loading_1, data_list, total, export_url} = this.state;
        const paginationProps = {pageSize: 9999, total: total, showTotal: this.showTotal, onChange: this.changePage};
        return (
            <div style={{padding: '10px'}}>
                <Breadcrumb style={{padding: '15px 0 10px 0'}}>
                    <Breadcrumb.Item><a href="/dashbord">主页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>课程统计</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/#/course/course_date_stats">课程学习统计</a></Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/#/course/lesson_table">课件统计</a></Breadcrumb.Item>
                    <Breadcrumb.Item>练习统计</Breadcrumb.Item>
                </Breadcrumb>
                <div>
                    <span style={{marginRight: "10px"}}>时间</span>
                    <RangePicker style={{marginLeft: 10}} onChange={(date, dateString) => {
                        this.onDateTotalChange(date, dateString);
                    }} locale={locale}
                                 defaultValue={[moment('2017' + '-' + (moment().month() + 1) + '-01'), moment().add(0, 'days')]}/>
                </div>
                <Row>
                    <Col span={24} style={{marginTop: '20px'}}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="存在记录的练习列表"
                            extra={<div><a style={{marginLeft: 20, float: 'right'}} href={export_url}><Icon
                                type="download"/>数据导出</a>
                            </div>}
                            hoverable={true}
                        >
                            <Table dataSource={data_list} loading={loading_1} bordered
                                   pagination={paginationProps} scroll={{y: 580}}
                                   columns={data_columns} size="small"
                                   onRow={(record, index) => {
                                       return {
                                           onClick: () => {
                                               console.log(11111, record);
                                               this.get_data_1({material_id_tmp: record.id});
                                               this.setState({
                                                   visible: true,
                                                   material_id: record.id
                                               });
                                           }
                                       }
                                   }}
                            />
                        </Card>
                    </Col>
                </Row>
                <Modal
                    title="练习次数分布"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    width={'900px'}
                >
                    <div id="channel_charts" style={{width: '100%', height: '500px'}}/>
                </Modal>
            </div>
        );
    }
}