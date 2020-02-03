import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Descriptions, Button} from 'antd';
import {Link} from "react-router-dom";

const {RangePicker} = DatePicker;
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './fee_stats.less'


export default class TableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        begin_date: moment(moment().year() + '-' + config.formatNumber((moment().month() + 1))).format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
        cur_instrument: '', cur_online: '1', cur_level: '2', cur_type: '', total: 0, cur_goods_type: '0',
        fee_data_list: [], total_data: {}, cur_platform: '', cur_pay_type: '', cur_bundle_id: '', other_data: [],
        fee_data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`, width: 40,
            },
            {
                title: '商品id', dataIndex: 'goods_id', key: 'goods_id',
                sorter: (a, b) => a.goods_id - b.goods_id, width: 300,
            },
            {
                title: '名称', dataIndex: 'course_name', key: 'course_name',
                sorter: (a, b) => a.course_name.length - b.course_name.length, width: 350,
            },
            {
                title: '级别', dataIndex: 'course_level', key: 'course_level',
                sorter: (a, b) => a.course_level - b.course_level, width: 120,
            },
            {
                title: '类型', dataIndex: 'course_type', key: 'course_type',
                sorter: (a, b) => a.course_type - b.course_type, width: 120,
            },
            {
                title: '购买人数', dataIndex: 'number', key: 'number',
                sorter: (a, b) => a.number - b.number, width: 120,
            },
            {
                title: '购买单数', dataIndex: 'count', key: 'count',
                sorter: (a, b) => a.count - b.count, width: 120,
            },
            {
                title: '购买费用', dataIndex: 'fee', key: 'fee',
                sorter: (a, b) => a.fee - b.fee,
            },

        ],
        loading_1: false, export_url: ''
    };

    componentDidMount() {
        document.querySelector('#myBread').style.display = 'none';
        this.get_data({type: 'share_channel'});
    }

    componentWillUnmount() {
        document.querySelector('#myBread').style.display = 'block'
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

    handleGoodsTypeChange(value) {
        this.setState({cur_goods_type: value});
        this.get_data({goods_type: value});
    }

    handleDateChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_data({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    handlePlatformChange(value) {
        this.setState({cur_platform: value});
        this.get_data({platform: value});
    }

    handlePayTypeChange(value) {
        this.setState({cur_pay_type: value});
        this.get_data({pay_type: value});
    }

    handleBundleIdChange(value) {
        this.setState({cur_bundle_id: value});
        this.get_data({bundle_id: value});
    }

    changePage = (page, pageSize) => {
        this.get_data({page: page - 1, need_count: pageSize});
    };

    showTotal = (total) => {
        return `总数 ${total} `;
    };

    get_data({
                 type = '', begin_date_tmp = '', end_date_tmp = '', page = 0, goods_type = 'false', pay_type = 'false', platform = 'false',
                 instrument = 'false', need_count = 20, online = 'false', level = 'false', course_type = 'false', bundle_id = 'false',
             }) {
        const {
            begin_date, end_date, cur_instrument, cur_online, cur_level, cur_type, cur_goods_type, cur_pay_type, cur_platform, cur_bundle_id
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
        if (goods_type === 'false') {
            goods_type = cur_goods_type;
        }
        if (pay_type === 'false') {
            pay_type = cur_pay_type;
        }
        if (platform === 'false') {
            platform = cur_platform;
        }
        if (bundle_id === 'false') {
            bundle_id = cur_bundle_id;
        }

        this.setState({loading_1: true});
        let params = '?begin_date=' + begin_date_tmp
            + '&end_date=' + end_date_tmp
            + '&instrument_type=' + instrument
            + '&online=' + online + '&page=' + page
            + '&level=' + level + '&size=' + need_count
            + '&type=' + course_type
            + '&goods_type=' + goods_type
            + '&pay_type=' + pay_type
            + '&platform=' + platform
            + '&bundle_id=' + bundle_id;
        this.setState({export_url: this.main_host + '/v3/operating/course_pay_month_stats/' + params + '&need_export=1'});
        fetch(this.main_host + '/v3/operating/course_pay_stats/' + params
            , {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    this.setState({loading_1: false});
                    this.setState({fee_data_list: json.data, total: json.total, total_data: json.total_data, other_data: json.other_data})
                }
            );
    }

    render() {
        const {
            fee_data_columns, loading_1, fee_data_list, total_data, other_data, export_url
        } = this.state;
        return (
            <div>
                <Breadcrumb style={{padding: '15px 0 10px 0'}}>
                    <Breadcrumb.Item>主页</Breadcrumb.Item>
                    <Breadcrumb.Item>App购买统计</Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{}}>
                    <div style={{float: 'left'}}>
                        <span style={{marginRight: "10px"}}>商品类型</span>
                        <Select defaultValue="0" style={{width: 80,}}
                                onChange={(value) => this.handleGoodsTypeChange(value)}>
                            <Select.Option value="0">课程</Select.Option>
                            <Select.Option value="1">Vip</Select.Option>
                            <Select.Option value="2">音符币</Select.Option>
                        </Select>
                    </div>

                    <div style={{float: 'left', marginLeft: "10px"}}>
                        <span style={{marginRight: "10px"}}>乐器类型</span>
                        <Select defaultValue="" style={{width: 100,}}
                                onChange={(value) => this.handleInstrumentChange(value)}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="0">吉他</Select.Option>
                            <Select.Option value="1">尤克里里</Select.Option>
                            <Select.Option value="2">卡林巴</Select.Option>
                            <Select.Option value="3">非洲鼓</Select.Option>
                            <Select.Option value="4">钢琴</Select.Option>
                            <Select.Option value="6">口琴</Select.Option>
                        </Select>
                    </div>

                    <div style={{float: 'left', marginLeft: '10px'}}>
                        <span style={{marginRight: "10px"}}>购买时间</span>
                        <RangePicker style={{width: 250,}} onChange={(date, dateString) => {
                            this.handleDateChange(date, dateString);
                        }} locale={locale}
                                     defaultValue={[moment(moment().year() + '-' + (moment().month() + 1) + '-01'), moment().add(0, 'days')]}/>
                    </div>

                    <div style={{float: 'left', marginLeft: '10px'}}>
                        <span style={{marginRight: "10px"}}>使用平台</span>
                        <Select defaultValue="" style={{width: 80,}}
                                onChange={(value) => this.handlePlatformChange(value)}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="1">Android</Select.Option>
                            <Select.Option value="0">IOS</Select.Option>
                        </Select>
                    </div>

                    <div style={{float: 'left', marginLeft: '10px'}}>
                        <span style={{marginRight: "10px"}}>付款方式</span>
                        <Select defaultValue="" style={{width: 80,}}
                                onChange={(value) => this.handlePayTypeChange(value)}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="alipay">支付宝</Select.Option>
                            <Select.Option value="wx">微信</Select.Option>
                            <Select.Option value="wx_pub_qr">微信扫码</Select.Option>
                            <Select.Option value="yfb">音符币</Select.Option>
                        </Select>
                    </div>

                    <div style={{float: 'left', marginLeft: '10px'}}>
                        <span style={{marginRight: "10px"}}>应用</span>
                        <Select defaultValue="" style={{width: 120,}}
                                onChange={(value) => this.handleBundleIdChange(value)}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="com.immusician.music">AI音乐学院</Select.Option>
                            <Select.Option value="com.buluobang.bangtabs">bangtabs</Select.Option>
                            <Select.Option value="com.buluobang.iguitar">com.buluobang.iguitar</Select.Option>
                        </Select>
                    </div>
                </Row>

                <Row style={{marginTop: 5}}>
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
                        <span style={{marginRight: "10px"}}>课程级别</span>
                        <Select defaultValue="2" style={{width: 100,}}
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
                    <div style={{float: 'left', marginLeft: "10px", color: '#FF0000'}}>注：音符币不区分乐器类型</div>
                </Row>
                <Row style={{marginTop: 10}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            hoverable={true}
                        >
                            <Descriptions size={'small'} bordered>
                                <Descriptions.Item label="总计： 购买单数">{total_data.count}</Descriptions.Item>
                                <Descriptions.Item label="购买费用">{total_data.fee}</Descriptions.Item>
                                <Descriptions.Item label=""><a href={export_url}>导出月统计</a></Descriptions.Item>
                                {
                                    other_data.map((item, index) => {
                                        return (
                                            <Descriptions.Item label={item.type} span={3}>购买人数：{item.number}     购买单数：{item.count}    购买费用：{item.fee}</Descriptions.Item>
                                        )
                                    })
                                }
                            </Descriptions>

                            <Table style={{marginTop: "10px"}}
                                   dataSource={fee_data_list} loading={loading_1} bordered rowKey={record => record.id}
                                   scroll={{y: 550}} pagination={false} tableLayout={'auto'}
                                   columns={fee_data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}