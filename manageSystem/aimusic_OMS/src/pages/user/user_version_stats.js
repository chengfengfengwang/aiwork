import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table} from 'antd';
const {RangePicker} = DatePicker;
import '../../config/app_config'
import config from "../../config/app_config";
import styles from "../course/course_stats.less";
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
import {show_pie} from "../../components/echarts_coms";
import echarts from 'echarts/lib/echarts';

moment.locale('zh-cn');


export default class UserDeviceStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        begin_date: moment(moment().year() + '-01-01').format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
        items: [], loading_1: false,
        data_columns: [
            {
                title: '序号',
                render: (text, record, index) => `${index + 1}`, width: 60,
            },
            {title: '版本号', dataIndex: 'name', key: 'name',},
            {title: '数目', dataIndex: 'value', key: 'value',},
        ]
    };

    componentDidMount() {
        this.get_device_count({});
    }

    get_device_count({begin_date_tmp = '', end_date_tmp = ''}) {
        const {
            begin_date, end_date
        } = this.state;
        if (begin_date_tmp.length === 0) {
            begin_date_tmp = begin_date;
        }
        if (end_date_tmp.length === 0) {
            end_date_tmp = end_date;
        }

        let my_echart = null;
        if (my_echart == null && document.getElementById('total_line')) {
            my_echart = echarts.init(document.getElementById('total_line'));
            my_echart.showLoading();
        }

        this.setState({loading_1: true});
        fetch(this.main_host + '/v3/operating/versions/' + '?begin_date=' + begin_date_tmp + '&end_date='
            + end_date_tmp, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                    this.setState({items: json.data.ret_query, loading_1: false});
                    if (my_echart) {
                        show_pie(my_echart, json.data, '用户使用版本号（前20）');
                    }
                }
            )
    }

    onDateTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_device_count({begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    render() {
        const {items, loading_1, data_columns} = this.state;
        return (
            <div>
                <Card
                            style={{width: '100%'}} className={styles.customCard}
                            hoverable={true}
                        >
                <Row>
                <div style={{float: 'left'}}>
                    <RangePicker style={{}} onChange={(date, dateString) => {
                        this.onDateTotalChange(date, dateString);
                    }} locale={locale}
                                 defaultValue={[moment(moment().year() + '-01-01'), moment().add(0, 'days')]}/>
                </div>
                </Row>

                <Row style={{marginTop: 10}}>
                    <Col span={12}>
                        <Table dataSource={items} loading={loading_1}
                               scroll={{y: 600}} pagination={false}
                               className={styles.customTable} columns={data_columns} size="small"/>
                    </Col>
                    <Col span={12}>
                        <div id="total_line" style={{height: '550px'}}/>
                    </Col>
                </Row>
                </Card>
            </div>
        );
    }
}