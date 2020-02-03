import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Descriptions, Button, Radio} from 'antd';
const ButtonGroup = Button.Group;

const {RangePicker} = DatePicker;
import moment from 'moment';
import locale from 'antd/lib/date-picker/locale/zh_CN';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './fee_stats.less'
import {show_dashboard_total} from "../../components/echarts_coms";
import echarts from 'echarts/lib/echarts';


export default class TableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        begin_date: moment(moment().year() + '-' + config.formatNumber(1)).format('YYYY-MM-DD'),
        // begin_date: moment(moment().year() + '-' + config.formatNumber((moment().month() + 1))).format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
        cur_instrument: '', cur_online: '1', cur_level: '2', cur_type: '', total: 0, cur_goods_type: '0',
        data_list: [], total_data: {}, cur_platform: '', cur_pay_type: '', cur_bundle_id: '', other_data: [],
        data_columns: [],
        cur_data_type: 'count', cur_t_c_type: 'month', cur_year_c_type: [],
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

    handleDataTypeChange = e => {
        const item = e.target.value;
        this.setState({ cur_data_type: item });
        this.get_data({data_type: item})
    };

    handleTCTypeChange = e => {
        const item = e.target.value;
        this.setState({ cur_t_c_type: item });
        this.get_data({ t_c_type: item });
    };

    handleYearCTypeChange = value => {
        this.setState({cur_year_c_type: value});
        this.get_data({ year_c_type: value })
    };

    get_data({
                 type = '', begin_date_tmp = '', end_date_tmp = '', pay_type = 'false', platform = 'false',
                 instrument = 'false', data_type = 'false', t_c_type = 'false', year_c_type = 'false'
             }) {
        const {
            begin_date, end_date, cur_instrument, cur_pay_type, cur_platform, cur_data_type, cur_t_c_type, cur_year_c_type
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
        if (pay_type === 'false') {
            pay_type = cur_pay_type;
        }
        if (platform === 'false') {
            platform = cur_platform;
        }
        if (data_type === 'false') {
            data_type = cur_data_type;
        }
        if (t_c_type === 'false') {
            t_c_type = cur_t_c_type;
        }
        if (year_c_type === 'false') {
            year_c_type = cur_year_c_type;
        }

        let params = '?begin_date=' + begin_date_tmp
            + '&end_date=' + end_date_tmp
            + '&instrument_type=' + instrument
            + '&pay_type=' + pay_type
            + '&platform=' + platform
            + '&data_type=' + data_type
            + '&year_c_type=' + year_c_type
            + '&t_c_type=' + t_c_type
        ;

        let my_echart = null;
        if (my_echart == null && document.getElementById('total_line')) {
            my_echart = echarts.init(document.getElementById('total_line'));
            my_echart.showLoading();
        }
        fetch(this.main_host + '/v3/operating/dashboard/' + params
            , {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    if (my_echart) {
                        show_dashboard_total(my_echart, json.data, json.x_name, json.y_name, json.legend);
                    }
                }
            );
    }

    render() {
        const {} = this.state;
        return (
            <div>
                <Breadcrumb style={{padding: '15px 0 10px 0'}}>
                    <Breadcrumb.Item>主页</Breadcrumb.Item>
                    <Breadcrumb.Item>整体概览</Breadcrumb.Item>
                </Breadcrumb>
                <Row style={{}}>
                    <div style={{float: 'left'}}>
                        <span style={{marginRight: "10px"}}>付费时间</span>
                        <RangePicker style={{width: 250,}} onChange={(date, dateString) => {
                            this.handleDateChange(date, dateString);
                        }}locale={locale} defaultValue={[moment(moment().year() + '-01-01'), moment().add(0, 'days')]}
                        ranges={{'今天': [moment(), moment()],
                            '昨天': [moment().add(-1, 'days'), moment().add(-1, 'days')],
                            '本月': [moment().startOf('month'), moment().endOf('month')],
                            '本周': [moment().day(1), moment().day(0).add(7, 'days')]}}
                        />
                    </div>

                    <div style={{float: 'left', marginLeft: "20px"}}>
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

                    <div style={{float: 'left', marginLeft: '20px'}}>
                        <span style={{marginRight: "10px"}}>使用平台</span>
                        <Select defaultValue="" style={{width: 80,}}
                                onChange={(value) => this.handlePlatformChange(value)}>
                            <Select.Option value="">全部</Select.Option>
                            <Select.Option value="1">Android</Select.Option>
                            <Select.Option value="0">IOS</Select.Option>
                        </Select>
                    </div>

                    <div style={{float: 'left', marginLeft: '20px'}}>
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
                </Row>
                <Row style={{marginTop: 10}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            hoverable={true}
                        >
                            <Row>
                                <Radio.Group defaultValue="count" onChange={this.handleDataTypeChange} buttonStyle="solid">
                                    <Radio.Button value="reg_number">注册人数</Radio.Button>
                                  <Radio.Button value="count">付费订单</Radio.Button>
                                  <Radio.Button value="number">付费人数</Radio.Button>
                                  <Radio.Button value="fee">付费金额</Radio.Button>
                                </Radio.Group>

                                <Radio.Group defaultValue="month" onChange={this.handleTCTypeChange} buttonStyle="solid" style={{float: 'right'}}>
                                  <Radio.Button value="week">周</Radio.Button>
                                  <Radio.Button value="month">月</Radio.Button>
                                </Radio.Group>

                                <Select defaultValue="2019" mode="tags" style={{width: 220, marginLeft: "10px", float: 'right', marginRight: "10px"}} placeholder="环比多选" onChange={this.handleYearCTypeChange}>
                                    <Option key='2017'>2017</Option>
                                    <Option key='2018'>2018</Option>
                                    <Option key='2019'>2019</Option>
                                    <Option key='2020'>2020</Option>
                                </Select>
                            </Row>
                            <div id="total_line" style={{width: '98%', height: '550px'}}/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}