import React from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Modal, Tabs} from 'antd';

const {TabPane} = Tabs;
const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './channel_stats.less'
import {show_date_share_many, show_date_share_funnel, show_date_line_many, show_channel_dui_2} from "../../components/echarts_coms";
import echarts from 'echarts/lib/echarts';


export default class FeeTableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        day: moment().add(-1, 'days').format('YYYY-MM-DD'),
        begin_date: moment(moment().year() + '-' + config.formatNumber((moment().month() + 1))).format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
        choose_channels: [], date_total_visible: false, funnel_visible: false,
        choose_share_channels: [],
        cur_channel: '',
        cur_share_channel: '', cur_needs_field: 'user_count',
        cur_platform: '-1',
        cur_instrument: '-1',
        fee_channel_data_list: [], fee_channel_data_list_1: [],
        fee_channel_data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`, width: 60,
            },
            {
                title: '渠道名称', dataIndex: 'type', key: 'type',
                render: text => <Link to={
                    {
                        pathname: '/user/payment_table',
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
                width: 200,
            },
            {
                title: 'h5访问量', dataIndex: 'h5_visit_cnt', key: 'h5_visit_cnt',
                sorter: (a, b) => a.h5_visit_cnt - b.h5_visit_cnt, width: 120,
            },
            {
                title: 'App安装量', dataIndex: 'install_cnt', key: 'install_cnt',
                sorter: (a, b) => a.install_cnt - b.install_cnt, width: 120,
            },
            {
                title: '访问量->安装量', dataIndex: 'install_cr', key: 'install_cr',
                sorter: (a, b) => a.install_cr - b.install_cr, width: 150,
                render: text => <Row style={{color: '#c959ff'}}>{text}%</Row>,
            },
            {
                title: '注册数', dataIndex: 'reg_count', key: 'reg_count',
                sorter: (a, b) => a.reg_count - b.reg_count, width: 120, defaultSortOrder: 'descend'
            },
            {
                title: '安装量->注册数', dataIndex: 'reg_cr', key: 'reg_cr',
                sorter: (a, b) => a.reg_cr - b.reg_cr, width: 150,
                render: text => <Row style={{color: '#c959ff'}}>{text}%</Row>
            },
            {
                title: '试学人数', dataIndex: 'user_test_count', key: 'user_test_count',
                sorter: (a, b) => a.user_test_count - b.user_test_count, width: 120,
            },
            {
                title: '付费人数', dataIndex: 'user_count', key: 'user_count',
                sorter: (a, b) => a.user_count - b.user_count, width: 120,
            },
            {
                title: '注册数->付费人数', dataIndex: 'user_cr', key: 'user_cr',
                sorter: (a, b) => a.user_cr - b.user_cr, width: 150,
                render: text => <Row style={{color: '#c959ff'}}>{text}%</Row>,
            },
            {
                title: '付费订单数', dataIndex: 'order_count', key: 'order_count',
                sorter: (a, b) => a.order_count - b.order_count, width: 150
            },
            {
                title: '付费金额', dataIndex: 'fee', key: 'fee',
                sorter: (a, b) => a.fee - b.fee, width: 150,
            },
            {
                title: '操作', dataIndex: 'operation', key: 'operation', width: 150,
                render: (text, record, index) => (
                    this.state.fee_channel_data_list.length >= 1
                        ? (
                            <div>
                                <a href="javascript:;" onClick={() => this.show_date_total(record.key)}>趋势查看</a>
                                <br/>
                                <a href="javascript:;" onClick={() => this.show_channel_total(record.key)}>转化漏斗</a>
                                <br/>
                            </div>
                        ) : null
                ),
            }
        ],
        fee_channel_total_data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`, width: 40,
            },
            {
                title: '品类', dataIndex: 'type', key: 'type', width: 200,
            },
            {
                title: '威伯', dataIndex: 'we_count', key: 'we_count',
                sorter: (a, b) => a.we_count - b.we_count, width: 120,
            },
            {
                title: '安德鲁', dataIndex: 'ad_count', key: 'ad_count',
                sorter: (a, b) => a.ad_count - b.ad_count, width: 120,
            },
            {
                title: '文森特', dataIndex: 'wen_count', key: 'wen_count',
                sorter: (a, b) => a.wen_count - b.wen_count, width: 150,
            },
            {
                title: '美音', dataIndex: 'mei_count', key: 'mei_count',
                sorter: (a, b) => a.mei_count - b.mei_count, width: 120,
            },
            {
                title: '哆哆咪', dataIndex: 'dd_count', key: 'dd_count',
                sorter: (a, b) => a.dd_count - b.dd_count, width: 120,
            },
            {
                title: '其他', dataIndex: 'other_count', key: 'other_count',
                sorter: (a, b) => a.other_count - b.other_count,
            },
        ],
        loading_1: false, loading_2: false, export_url: ''
    };

    componentDidMount() {
        this.get_share_channels({});
        this.get_total_data({type: 'share_channel'});
        this.get_channel_total_data({type: 'share_channel'});
    }

    get_share_channels({}) {
        fetch(this.main_host + '/v3/operating/share_channels/', {
            method: 'GET'
        }).then(res => res.json()).then(
            json => {
                this.setState({choose_share_channels: json.data});
            }
        )
    }

    get_total_stats_data({share_channel: share_channel}) {
        const {begin_date, end_date} = this.state;
        fetch(this.main_host + '/v3/channel/share_install/stats/?share_channel=' + share_channel
            + '&begin_date=' + begin_date + '&end_date=' + end_date, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    if (document.getElementById('date_charts')) {
                        show_date_share_many(echarts.init(document.getElementById('date_charts')), json.data, begin_date, end_date)
                    }
                }
            );
    }

    get_channel_stats_data({share_channel: share_channel}) {
        const {begin_date, end_date} = this.state;
        fetch(this.main_host + '/v3/channel/share_install/funnel_stats/?share_channel=' + share_channel
            + '&begin_date=' + begin_date + '&end_date=' + end_date, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    if (document.getElementById('funnel_charts')) {
                        show_date_share_funnel(echarts.init(document.getElementById('funnel_charts')), json.data, begin_date, end_date)
                    }
                }
            );
    }

    show_date_total(share_channel) {
        this.get_total_stats_data({share_channel: share_channel});
        this.setState({date_total_visible: true});
    }

    show_channel_total(share_channel) {
        this.get_channel_stats_data({share_channel: share_channel});
        this.setState({funnel_visible: true});
    }

    get_total_data({
                       type = '', begin_date_tmp = '', end_date_tmp = '', channel_type = 'false', platform = 'false',
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

        if (type === 'share_channel') {
            let url = this.main_host + `/v3/channel/date_share_channel/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                + '&channel=' + channel + '&share_channel=' + share_channel;
            this.setState({loading_1: true, export_url: url + '&need_export=' + true});
            fetch(url, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                    this.setState({loading_1: false});
                    this.setState({fee_channel_data_list: json.data});
                });
        } else {
        }
    }

    get_channel_total_data({
                               type = '', begin_date_tmp = '', end_date_tmp = '', channel_type = 'false', platform = 'false',
                               instrument = 'false', channel = 'false', share_channel = 'false', need_count = 15, needs_field = 'false'
                           }) {
        const {
            begin_date, end_date, date_channel_type, cur_platform,
            cur_instrument, cur_channel, cur_share_channel, cur_needs_field
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
        if (needs_field === 'false') {
            needs_field = cur_needs_field;
        }

        if (type === 'share_channel') {
            let url = this.main_host + `/v3/channel/date_share_channel_total/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                + '&channel=' + channel + '&share_channel=' + share_channel + '&needs_field=' + needs_field;
            this.setState({loading_2: true});
            let my_echart = null;
            if (my_echart == null && document.getElementById('total_line')) {
                my_echart = echarts.init(document.getElementById('total_line'));
                my_echart.showLoading();
            }
            fetch(url, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                    this.setState({loading_2: false});
                    this.setState({fee_channel_data_list_1: json.data.data});
                    if (my_echart) {
                        show_channel_dui_2(my_echart, json.data, begin_date, end_date);
                    }
                });
        } else {
        }
    }

    get_date_data({
                      face_type = '', data_type = 'count', ele_id = '', begin_date_tmp = '', end_date_tmp = '',
                      channel_type = 'false', platform = 'false', instrument = 'false', channel = 'false',
                      share_channel = 'false', need_count = 15
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

        switch (face_type) {
            case 'date_line':
                let my_echart = echarts.init(document.getElementById(ele_id));
                if (document.getElementById(ele_id)) {
                    my_echart.showLoading();
                }
                fetch(this.main_host + `/v3/operating/date_channel_detail/?cal_type=` + data_type
                    + '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                    + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                    + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
                    .then(res => res.json())
                    .then(json => {
                            const {begin_date, end_date} = this.state;
                            if (document.getElementById(ele_id)) {
                                show_date_line_many(my_echart, json, begin_date, end_date);
                            }
                        }
                    );
                break;
        }
    }

    onDateCourseTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_total_data({type: 'share_channel', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    handleShareChannelChange(value) {
        value = `${value}`;
        this.setState({cur_share_channel: value});
        this.get_total_data({type: 'share_channel', share_channel: value});
    }

    handleInstrumentTotalChange(value) {
        this.setState({cur_instrument: value});
        this.get_total_data({type: 'share_channel', instrument: value});
    }

    handleDataTypeTotalChange(value) {
        this.setState({cur_needs_field: value});
        this.get_channel_total_data({type: 'share_channel', needs_field: value});
    }

    handleDateOk = (e) => {
        this.setState({
            date_total_visible: false,
            funnel_visible: false,
        });
    };

    handleDateCancel = (e) => {
        this.setState({
            date_total_visible: false,
            funnel_visible: false,
        });
    };

    onTypeChange(key) {
        switch (key) {
            case 'tab_channel_table':
                this.setState({table_key: key});
                break;

            case 'tab_channel_charts':
                this.setState({table_key: key});
                this.get_channel_total_data({type: 'share_channel'});
                break;
        }
    }

    render() {
        const {
            fee_channel_data_columns, loading_1, loading_2, choose_share_channels, fee_channel_data_list, export_url, fee_channel_total_data_columns, fee_channel_data_list_1
        } = this.state;
        const paginationProps = {pageSize: 100};
        return (
            <div>
                <Row style={{background: '#ffffff'}}
                     className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>厂商渠道</span>
                            <Select mode="multiple" showSearch style={{width: 400,}} placeholder="请选择厂商渠道"
                                    onChange={(value) => this.handleShareChannelChange(value, 'total', '')}
                                    filterOption={(input, option) =>
                                          option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                            >
                                {
                                    choose_share_channels.map((item, index) => {
                                        return (
                                            <Select.Option key={index} rowkey={index}
                                                           value={item.value}>{item.label}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        {/*<div style={{marginLeft: '20px', float: 'left'}}>*/}
                            {/*<span style={{marginRight: "10px"}}>乐器</span>*/}
                            {/*<Select defaultValue="-1" style={{width: 120,}}*/}
                                    {/*onChange={(value) => this.handleInstrumentTotalChange(value)}>*/}
                                {/*<Select.Option value="-1">全部</Select.Option>*/}
                                {/*<Select.Option value="0">吉他</Select.Option>*/}
                                {/*<Select.Option value="1">尤克里里</Select.Option>*/}
                                {/*<Select.Option value="2">卡林巴</Select.Option>*/}
                                {/*<Select.Option value="3">非洲鼓</Select.Option>*/}
                                {/*<Select.Option value="4">钢琴</Select.Option>*/}
                                {/*<Select.Option value="6">口琴</Select.Option>*/}
                            {/*</Select>*/}
                        {/*</div>*/}

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
                                this.onDateCourseTotalChange(date, dateString);
                            }} locale={locale}
                                         defaultValue={[moment(moment().year() + '-' + (moment().month() + 1) + '-01'), moment().add(0, 'days')]}/>
                        </div>
                    </Card>
                </Row>
                <Tabs defaultActiveKey="tab_channel_table"
                      onChange={(value) => this.onTypeChange(value)}>
                    <TabPane tab="渠道详情" key="tab_channel_table">
                        <Row>
                            <Col span={24}>
                                <Card
                                    style={{width: '100%'}} className={styles.customCard} hoverable={true}
                                    extra={<div><a style={{marginLeft: 20, float: 'right'}} href={export_url}><Icon type="download"/>数据导出</a></div>}
                                >
                                    <Table dataSource={fee_channel_data_list} loading={loading_1} bordered
                                           pagination={false} scroll={{y: 500}}
                                           columns={fee_channel_data_columns} size="small"/>
                                </Card>
                            </Col>
                        </Row>
                        <Modal
                            title="渠道分布"
                            visible={this.state.date_total_visible}
                            onOk={this.handleDateOk}
                            onCancel={this.handleDateCancel}
                            okText="确认"
                            cancelText="取消"
                            width={'900px'}
                        >
                            <div id="date_charts" style={{width: '100%', height: '500px'}}/>
                        </Modal>
                        <Modal
                            title="渠道漏斗"
                            visible={this.state.funnel_visible}
                            onOk={this.handleDateOk}
                            onCancel={this.handleDateCancel}
                            okText="确认"
                            cancelText="取消"
                            width={'900px'}
                        >
                            <div id="funnel_charts" style={{width: '100%', height: '500px'}}/>
                        </Modal>
                    </TabPane>
                    <TabPane tab="渠道整体" key="tab_channel_charts">
                        <div style={{marginLeft: '20px'}}>
                            <span style={{marginRight: "10px"}}>数据类型</span>
                            <Select defaultValue="user_count" style={{width: 120,}}
                                    onChange={(value) => this.handleDataTypeTotalChange(value)}>
                                <Select.Option value="fee">付费金额</Select.Option>
                                <Select.Option value="order_count">付费订单数</Select.Option>
                                <Select.Option value="user_count">付费用户数</Select.Option>
                                <Select.Option value="reg_count">注册用户数</Select.Option>
                                <Select.Option value="install_cnt">APP下载数</Select.Option>
                            </Select>
                        </div>
                        <Row style={{}}>
                            <Col span={24}>
                                <Card style={{width: '100%'}} className={styles.customCard} hoverable={true}>
                                    <div id="total_line" style={{height: '350px'}}/>
                                    <Table dataSource={fee_channel_data_list_1} loading={loading_2} bordered
                                           pagination={false} scroll={{y: 300}}
                                           columns={fee_channel_total_data_columns} size="small"/>
                                </Card>
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </div>
        );
    }
}