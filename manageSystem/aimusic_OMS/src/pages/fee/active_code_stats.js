import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Tag, Input} from 'antd';
const Search = Input.Search;
const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './fee_stats.less'


export default class TableStats extends React.Component {
    constructor(props) {
        super(props);
        let data = this.props.location.query;

        this.main_host = config.debug ? config.test_host : config.main_host;
        this.state = {
            begin_date: moment(moment().year() + '-01-01').format('YYYY-MM-DD'),
            end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
            fee_channel_data_list: [], cur_title: '',
            fee_channel_data_columns: [
                {
                    title: '序号',
                    render: (text, record, index) => `${index + 1}`, width: 60,
                },
                {
                    title: '模板名称', dataIndex: 'template_title', key: 'template_title', width: 300,
                },
                {
                    title: '所在分组', dataIndex: 'group', key: 'group', width: 200,
                },
                {
                    title: '批号', dataIndex: 'used', key: 'used', width: 350,
                    render: (text, record, index) => {
                        return (record.batch_numbers.map((item) =>
                            <div><Tag color="blue">{item}</Tag>已使用：<Tag color="#87d068">{record.used[item]}</Tag></div>
                        ));
                    }
                },
                {
                    title: '总数目', dataIndex: 'total_count', key: 'total_count', width: 150,
                    sorter: (a, b) => a.total_count - b.total_count
                },
                {
                    title: '已使用数目', dataIndex: 'used_count', key: 'used_count',
                    sorter: (a, b) => a.used_count - b.used_count
                }
            ],
            loading_1: false, export_url: ''
        };
    }

    componentDidMount() {
        document.querySelector('#myBread').style.display = 'none';
        this.get_total_data({type: 'share_channel'});
    }

    componentWillUnmount() {
        document.querySelector('#myBread').style.display = 'block'
    }

    get_total_data({
                       type = '', need_count = 15, page = 0, begin_date_tmp = '', end_date_tmp = '', title = 'false'
                   }) {
        const {
            begin_date, end_date, cur_title
        } = this.state;
        if (begin_date_tmp.length === 0) {
            begin_date_tmp = begin_date;
        }
        if (end_date_tmp.length === 0) {
            end_date_tmp = end_date;
        }
        if (title === 'false') {
            title = cur_title;
        }

        let url = this.main_host + `/v3/operating/active_code/` + '?begin_date=' + begin_date_tmp + '&end_date='
            + end_date_tmp + '&page=' + page + '&size=' + need_count + '&search_title=' + title;
        this.setState({loading_1: true});
        fetch(url, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({loading_1: false});
                this.setState({fee_channel_data_list: json.data, total: json.total});
            });
    }

    changePage = (page, pageSize) => {
        this.get_total_data({page: page - 1, need_count: pageSize});
    };

    showTotal = (total) => {
        return `总数 ${total} `;
    };

    onDateTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_total_data({type: 'share_channel', begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    onSearch(value) {
        this.setState({cur_title: value});
        this.get_total_data({type: 'share_channel', title: value})
    }

    render() {
        const {
            fee_channel_data_columns, loading_1, fee_channel_data_list, total
        } = this.state;
        return (
            <div>
                <Breadcrumb style={{padding: '15px 0 10px 0'}}>
                    <Breadcrumb.Item><a href="/dashbord">主页</a></Breadcrumb.Item>
                    <Breadcrumb.Item>体验课码统计</Breadcrumb.Item>
                </Breadcrumb>

                <div style={{float: 'left'}}>
                    <RangePicker style={{}} onChange={(date, dateString) => {
                        this.onDateTotalChange(date, dateString);
                    }} locale={locale}
                                 defaultValue={[moment(moment().year() + '-01-01'), moment().add(0, 'days')]}/>
                </div>

                <Search
                            placeholder="名称搜索"
                            onSearch={value => this.onSearch(value)}
                            style={{width: 200, marginLeft: 20}}
                        />

                <Row style={{marginTop: 10}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            hoverable={true}
                        >
                            <Table dataSource={fee_channel_data_list} loading={loading_1} bordered
                                   scroll={{y: 570}} pagination={false}
                                   columns={fee_channel_data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}