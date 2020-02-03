import React from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table} from 'antd';

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './vip_stats.less'


export default class TableStats extends React.Component {
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
        cur_pay_type: '',
        fee_channel_data_list: [],
        fee_channel_data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`, width: 40,
            },
            {
                title: '分类', dataIndex: 'name', key: 'name',
                width: 200,
            },
            // {
            //     title: '点击banner数目', dataIndex: 'click_banner_count', key: 'click_banner_count', width: 150,
            // },
            // {
            //     title: '点击banner人数', dataIndex: 'click_banner_number', key: 'click_banner_number', width: 150,
            // },
            // {
            //     title: '点击vip按钮数目', dataIndex: 'click_count', key: 'click_count', width: 150,
            // },
            // {
            //     title: '点击vip按钮人数', dataIndex: 'click_number', key: 'click_number', width: 150,
            // },
            // {
            //     title: '查看vip详情页人数', dataIndex: 'detail_total_number', key: 'detail_total_number', width: 150,
            // },
            {
                title: '会员数目', dataIndex: 'total_count', key: 'total_count',
                sorter: (a, b) => a.total_count - b.total_count, width: 150,
            },
            {
                title: 'App开通数量', dataIndex: 'app_total_count', key: 'app_total_count',
                sorter: (a, b) => a.app_total_count - b.app_total_count, width: 150,
            },
            {
                title: 'App买会员金额', dataIndex: 'app_total_amount', key: 'app_total_amount',
                sorter: (a, b) => a.app_total_amount - b.app_total_amount, width: 150,
            },
            // {
            //     title: '折扣券发送数量', dataIndex: 'amount', key: 'amount',
            //     sorter: (a, b) => a.amount - b.amount, width: 150,
            // },
            {
                title: '折扣券发送数量', dataIndex: 'coupon_send_count', key: 'coupon_send_count',
                sorter: (a, b) => a.coupon_send_count - b.coupon_send_count, width: 150,
            },
            {
                title: '折扣券使用数量', dataIndex: 'coupon_use_count', key: 'coupon_use_count',
                sorter: (a, b) => a.coupon_use_count - b.coupon_use_count, width: 150,
            },
            {
                title: '折扣券消费金额', dataIndex: 'coupon_consump_total', key: 'coupon_consump_total',
                sorter: (a, b) => a.coupon_consump_total - b.coupon_consump_total
            }
        ],
        loading_1: false, export_url: ''
    };

    componentDidMount() {
        this.get_total_data({type: 'share_channel'});
    }

    get_total_data({
                       type = '', begin_date_tmp = '', end_date_tmp = '', channel_type = 'false', platform = 'false',
                       pay_type = 'false', channel = 'false', share_channel = 'false', need_count = 15
                   }) {
        const {
            begin_date, end_date, date_channel_type, cur_platform,
            cur_pay_type, cur_channel, cur_share_channel
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
        if (pay_type === 'false') {
            pay_type = cur_pay_type;
        }
        if (channel === 'false') {
            channel = cur_channel;
        }
        if (share_channel === 'false') {
            share_channel = cur_share_channel;
        }

        if (type === 'share_channel') {
            let url = this.main_host + `/v3/users/vip/vip_statistical/`
                + '?begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                + '&need_count=' + need_count + '&platform=' + platform + '&payment_channel=' + pay_type
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

    onDateCourseTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_total_data({type: 'share_channel', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    render() {
        const {
            fee_channel_data_columns, loading_1, choose_share_channels, fee_channel_data_list, export_url
        } = this.state;
        const paginationProps = {pageSize: 100};
        return (
            <div>
                <Row style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110}}
                     className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
                                this.onDateCourseTotalChange(date, dateString);
                            }} locale={locale}
                                         defaultValue={[moment(moment().year() + '-' + (moment().month() + 1) + '-01'), moment().add(0, 'days')]}/>
                        </div>
                    </Card>
                </Row>

                <Row style={{marginTop: '50px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="Vip相关统计"
                            hoverable={true}
                        >
                            <Table dataSource={fee_channel_data_list} loading={loading_1} bordered
                                   pagination={false} scroll={{x: 2000, y: 580}}
                                   columns={fee_channel_data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}