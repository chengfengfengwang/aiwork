import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Avatar} from 'antd';

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './user_stats.less'


export default class UsersTable extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;

    constructor(props) {
        super(props);
        let data = this.props.location.query;
        this.state = {
            day: data.day, begin_date: data.begindate,
            end_date: data.enddate,
            cur_channel: data.channel, cur_share_channel: data.sharechannel,
            cur_platform: data.platform, cur_instrument: data.instrument,
            cur_device_models: '', date_type: data.date_type, title: data.title, data_type: data.type,
            data_list: [],
            data_columns: [
                {
                    title: '序号',
                    render: (text, record, index) => `${index + 1}`,
                },
                {title: 'uid', dataIndex: '_id', key: '_id'},
                {title: '手机号码', dataIndex: 'tel', key: 'tel'},
                {title: '注册时间', dataIndex: 'reg_date', key: 'reg_date',
                sorter: (a, b) => a.reg_date.length - b.reg_date.length,},
                {title: '购买时间', dataIndex: 'paid_dt', key: 'paid_dt',
                sorter: (a, b) => a.paid_dt.length - b.paid_dt.length,},
                {title: '购买费用', dataIndex: 'amount', key: 'amount',
                sorter: (a, b) => a.amount - b.amount},
                {title: '购买课程', dataIndex: 'course_name', key: 'course_name',
                sorter: (a, b) => a.course_name.length - b.course_name.length},
                {title: '微信购买量/app内购买量', dataIndex: 'wx/app', key: 'wx/app'},
                {title: '手机平台', dataIndex: 'platform', key: 'platform'},
                {title: '奖学金渠道', dataIndex: 'channel', key: 'channel'},
                {title: '来源渠道', dataIndex: 'share_channel', key: 'share_channel'},
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
                 type = '', begin_date_tmp = '', end_date_tmp = '', channel_type = 'false', platform = 'false',
                 instrument = 'false', channel = 'false', share_channel = 'false', need_count = 15, page = 0,
             }) {
        const {
            begin_date, end_date, date_channel_type, cur_platform, day,
            cur_instrument, cur_channel, cur_share_channel, title, data_type, date_type
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
            let url = this.main_host + `/v3/operating/payments/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                + '&channel=' + channel + '&share_channel=' + share_channel + '&page=' + page + '&size=' + need_count
                + '&title=' + title + '&data_type=' + data_type;
            this.setState({export_url: url + '&need_export=' + true});
            fetch(url, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                    this.setState({loading_1: false});
                    this.setState({data_list: json.data, total: json.total});
                });
        } else {
            let url = this.main_host + `/v3/operating/payments/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                + '&channel=' + channel + '&share_channel=' + share_channel + '&page=' + page + '&size=' + need_count
                + '&title=' + title + '&data_type=' + data_type;
            this.setState({export_url: url + '&need_export=' + true});
            fetch(url, {method: 'GET'})
                .then(res => res.json())
                .then(json => {
                    this.setState({loading_1: false});
                    this.setState({data_list: json.data, total: json.total});
                });
        }
    }

    changePage = (page, pageSize) => {
        this.get_data({page: page - 1, need_count: pageSize});
    };

    showTotal = (total) => {
        return `总数 ${total} `;
    };

    render() {
        const {data_columns, loading_1, data_list, total, export_url} = this.state;
        const paginationProps = {pageSize: 15, total: total, showTotal: this.showTotal, onChange: this.changePage};
        return (
            <div>
                <Breadcrumb style={{padding: '15px 0 10px 0'}}>
                    <Breadcrumb.Item><a href="/dashbord">主页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>渠道统计</Breadcrumb.Item>
                    <Breadcrumb.Item><a href="/#/channel/share_install_stats">厂商渠道</a></Breadcrumb.Item>
                    <Breadcrumb.Item>厂商订单</Breadcrumb.Item>
                </Breadcrumb>
                <Row>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="订单列表"
                            extra={<div><a style={{marginLeft: 20, float: 'right'}} href={export_url}><Icon
                                type="download"/>数据导出</a>
                            </div>}
                            hoverable={true}
                        >
                            <Table dataSource={data_list} loading={loading_1} bordered
                                   pagination={paginationProps}
                                   columns={data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}