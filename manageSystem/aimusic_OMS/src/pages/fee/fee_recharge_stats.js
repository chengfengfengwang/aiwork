import React from 'react';
import { Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table } from 'antd';
const { RangePicker } = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import { Link } from "react-router-dom";
moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './fee_stats.less'
import Field from "../../components/Charts/Field";
import { getPosition } from "../../utils/util";


export default class FeeTableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        day: moment().add(-1, 'days').format('YYYY-MM-DD'),
        begin_date: moment(moment().year() + '-' + config.formatNumber((moment().month() + 1))).format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
        choose_channels: [], choose_share_channels: [],
        cur_channel: '', cur_share_channel: '', cur_platform: '-1', cur_instrument: '-1',
        fee_platform_list: [], fee_instrument_list: [], fee_main_list: [], fee_charge_detail_list: [], fee_charge_user_list: [], fee_payment_type_list: [],
        fee_course_type_list: [], fee_course_type_list_1: [],
        total_data: { user_count: 0, amount: 0, count: 0, guitar: 0, ukulele: 0, kalimba: 0, piano: 0, feizhougu: 0 },
        fee_main_data_columns: [
            {
                title: '充值成功次数', dataIndex: 'charge_success', key: 'charge_success',
                sorter: (a, b) => a.charge_success - b.charge_success
            },
            {
                title: '充值成功人数', dataIndex: 'charge_success_user', key: 'charge_success_user',
                sorter: (a, b) => a.charge_success_user - b.charge_success_user
            },
            {
                title: '充值总金额', dataIndex: 'total_amount', key: 'total_amount',
                sorter: (a, b) => a.total_amount - b.total_amount
            },
            {
                title: '音符币充值总金额', dataIndex: 'total_yfb_amount', key: 'total_yfb_amount',
                sorter: (a, b) => a.total_yfb_amount - b.total_yfb_amount
            },
            {
                title: '购买成功笔数', dataIndex: 'pay_charge_success', key: 'pay_charge_success',
                sorter: (a, b) => a.pay_charge_success - b.pay_charge_success
            },
            {
                title: '购买成功人数', dataIndex: 'pay_charge_success_user', key: 'pay_charge_success_user',
                sorter: (a, b) => a.pay_charge_success_user - b.pay_charge_success_user
            },
            {
                title: '购课总金额', dataIndex: 'pay_total_amount', key: 'pay_total_amount',
                sorter: (a, b) => a.pay_total_amount - b.pay_total_amount
            },
        ],
        fee_charge_detail_columns: [
            {
                title: '充值总金额', dataIndex: 'title', key: 'title'
            },
            {
                title: '1', dataIndex: 'yfb1', key: 'yfb1',
                sorter: (a, b) => a.yfb1 - b.yfb1
            },
            {
                title: '6', dataIndex: 'yfb6', key: 'yfb6',
                sorter: (a, b) => a.yfb6 - b.yfb6
            },
            {
                title: '26', dataIndex: 'yfb26', key: 'yfb26',
                sorter: (a, b) => a.yfb26 - b.yfb26
            },
            {
                title: '53', dataIndex: 'yfb53', key: 'yfb53',
                sorter: (a, b) => a.yfb53 - b.yfb53
            },
            {
                title: '140', dataIndex: 'yfb140', key: 'yfb140',
                sorter: (a, b) => a.yfb140 - b.yfb140
            },
            {
                title: '230', dataIndex: 'yfb230', key: 'yfb230',
                sorter: (a, b) => a.yfb230 - b.yfb230
            },
            {
                title: '400', dataIndex: 'yfb400', key: 'yfb400',
                sorter: (a, b) => a.yfb400 - b.yfb400
            },
            {
                title: '800', dataIndex: 'yfb800', key: 'yfb800',
                sorter: (a, b) => a.yfb800 - b.yfb800
            }
        ],
        fee_user_columns: [
            {
                title: '充值排名', key: 'index',
                render: (text, record, index) => `${index + 1}`,
                width: 50,
                align: "center",
            },
            {
                title: '用户ID', dataIndex: '_id', key: '_id',
                sorter: (a, b) => a._id - b._id,
                width: 100
            },
            {
                title: '充值金额', dataIndex: 'amount', key: 'amount',
                sorter: (a, b) => a.amount - b.amount,
                width: 100
            },
            {
                title: '充值时间', dataIndex: 'created', key: 'created',
                sorter: (a, b) => a.created - b.created,
                width: 100
            },
            {
                title: '购买课程列表', dataIndex: 'goods_list', key: 'goods_list',
                render: (text, record, index) => { return text.join() },
                width: 100
            },
        ],
        fee_payment_type_data_columns: [],
        loading_1: false, loading_2: false, loading_3: false
    };

    componentDidMount() {
        this.topFixEvent();

        this.get_main_data();
        this.get_charge_detail_data();
        this.get_charge_user_data()
    }
    get_main_data() {
        this.setState({ loading_1: true });
        const { begin_date, end_date } = this.state;
        fetch(this.main_host + `/v3/operating/note_coins_data/?begin_date=${begin_date}&end_date=${end_date}`, {
            method: 'GET'
        }).then(res => res.json()).then(
            json => {
                this.setState({ loading_1: false });
                var arr = [];
                arr.push(json.data)
                this.setState({ fee_main_list: arr });
            }
        )
    };
    get_charge_detail_data() {
        this.setState({ loading_2: true });
        const { begin_date, end_date } = this.state;
        fetch(this.main_host + `/v3/operating/note_coins/detail/?begin_date=${begin_date}&end_date=${end_date}`, {
            method: 'GET'
        }).then(res => res.json()).then(
            json => {
                this.setState({ loading_2: false });
                this.setState({ fee_charge_detail_list: json.data });
            }
        )
    };
    get_charge_user_data() {
        this.setState({ loading_3: true });
        const { begin_date, end_date } = this.state;
        fetch(this.main_host + `/v3/operating/note_coins/ranking/?begin_date=${begin_date}&end_date=${end_date}`, {
            method: 'GET'
        }).then(res => res.json()).then(
            json => {
                this.setState({ loading_3: false });
                this.setState({ fee_charge_user_list: json.data });
            }
        )
    };
    topFixEvent() {
        const b = document.querySelector('.ant-breadcrumb');
        window.addEventListener('scroll', function () {
            if (document.querySelector('#topFixRow')) {
                if (getPosition(b).y < 50) {
                    document.querySelector('#topFixRow').style.top = "64px"
                } else {
                    document.querySelector('#topFixRow').style.top = "110px"
                }
            }
        })
    };



    handlePlatformTotalChange(value) {
        this.setState({ cur_platform: value });
        this.get_total_data({ type: 'total', platform: value });
        this.get_total_data({ type: 'platform', platform: value });
        this.get_total_data({ type: 'instrument', platform: value });
        this.get_total_data({ type: 'payment_type', platform: value });
        this.get_total_data({ type: 'course_type_1', platform: value });
        this.get_total_data({ type: 'course_type_2', platform: value });
        this.get_total_data({ type: 're', platform: value });
    }

    onDateCourseTotalChange(date, dateString) {
        this.setState({ begin_date: dateString[0], end_date: dateString[1] }, () => {
            this.get_main_data();
            this.get_charge_detail_data();
            this.get_charge_user_data()
        });

        //
        return
        this.setState({ begin_date: dateString[0], end_date: dateString[1] });
        this.get_total_data({ type: 'total', begin_date_tmp: dateString[0], end_date_tmp: dateString[1] });
        this.get_total_data({ type: 'platform', begin_date_tmp: dateString[0], end_date_tmp: dateString[1] });
        this.get_total_data({ type: 'instrument', begin_date_tmp: dateString[0], end_date_tmp: dateString[1] });
        this.get_total_data({ type: 'payment_type', begin_date_tmp: dateString[0], end_date_tmp: dateString[1] });
        this.get_total_data({ type: 'course_type_1', begin_date_tmp: dateString[0], end_date_tmp: dateString[1] });
        this.get_total_data({ type: 'course_type_2', begin_date_tmp: dateString[0], end_date_tmp: dateString[1] });
        this.get_total_data({ type: 're', begin_date_tmp: dateString[0], end_date_tmp: dateString[1] });
    }


    render() {
        const {
            fee_channel_data_columns, choose_channels, fee_course_type_list, total_data,
            fee_instrument_data_columns, fee_main_data_columns, fee_charge_detail_columns, fee_user_columns, fee_payment_type_list, fee_re_list,
            loading_1, loading_2, loading_3, loading_4, loading_5, loading_6, fee_re_data_columns,
            choose_share_channels, fee_platform_list, fee_instrument_list, fee_main_list, fee_charge_detail_list, fee_charge_user_list, fee_course_type_list_1
        } = this.state;

        return (
            <div>
                <Row id="topFixRow" style={{ position: 'fixed', zIndex: 1, background: '#ffffff', top: 110, transition: 'top .5s', width: '100%' }} className={styles.customThin}>
                    <Card bordered={true} style={{ background: '#e6f7ff' }}>
                        <div style={{ marginLeft: '10px', float: 'left' }}>
                            <span style={{ display: 'inline-block', marginRight: "5px", marginTop: "5px" }}>时间</span>
                            <RangePicker style={{ float: 'right', marginLeft: 10, width: 230 }} onChange={(date, dateString) => {
                                this.onDateCourseTotalChange(date, dateString);
                            }} locale={locale} defaultValue={[moment(moment().year() + '-' + (moment().month() + 1)), moment().add(0, 'days')]} />
                        </div>
                    </Card>
                </Row>

                <Row style={{ marginTop: '50px' }}>
                    <Col span={24}>
                        <Card
                            style={{ width: '100%' }} className={styles.customCard}
                            title="充值金额与实际支付"
                            hoverable={true}
                        >
                            <Table dataSource={fee_main_list} loading={loading_1} bordered pagination={false}
                                columns={fee_main_data_columns} size="small" />
                        </Card>
                    </Col>
                </Row>

                <Row style={{ marginTop: '10px' }}>
                    <Col span={24}>
                        <Card
                            style={{ width: '100%' }} className={styles.customCard}
                            title="充值明细"
                            hoverable={true}
                        >
                            <Table dataSource={fee_charge_detail_list} loading={loading_2} bordered pagination={false}
                                columns={fee_charge_detail_columns} size="small" />

                        </Card>
                    </Col>
                </Row>
                <Row style={{ marginTop: '10px' }}>
                    <Col span={24}>
                        <Card
                            style={{ width: '100%' }} className={styles.customCard}
                            title="用户购买统计"
                            hoverable={true}
                        >
                            <Table dataSource={fee_charge_user_list} loading={loading_3} pagination={false}
                                scroll={{ y: 480 }}
                                bordered
                                className={styles.customTable} columns={fee_user_columns} size="small"
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