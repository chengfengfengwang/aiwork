import React from 'react';
import {Link} from "react-router-dom";
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Input} from 'antd';

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

const Search = Input.Search;
moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './score_stats.less'


export default class TableStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        day: moment().add(-1, 'days').format('YYYY-MM-DD'),
        begin_date: moment(moment().year() + '-' + config.formatNumber((moment().month() + 1))).format('YYYY-MM-DD'),
        end_date: moment().add(0, 'days').format('YYYY-MM-DD'),
        choose_channels: [], cur_instrument: 3,
        choose_share_channels: [], cur_play_type: 2,
        cur_channel: '', cur_title: '',
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
                title: '曲谱名称', dataIndex: '_id', key: '_id',
                width: 150,
            },
            {
                title: '练习数目', dataIndex: 'count', key: 'count',
                sorter: (a, b) => a.count - b.count, width: 150,
            },
            {
                title: '练习人数', dataIndex: 'number', key: 'number',
                sorter: (a, b) => a.number - b.number, width: 150,
            },
            {
                title: '平均练习得分', dataIndex: 'avg_play_score', key: 'avg_play_score',
                sorter: (a, b) => a.avg_play_score - b.avg_play_score, width: 150,
            },
            {
                title: '平均练习时长（秒）', dataIndex: 'avg_total_time', key: 'avg_total_time',
                sorter: (a, b) => a.avg_total_time - b.avg_total_time, width: 150,
            },
            {
                title: '平均练习音符', dataIndex: 'avg_play_beats_count', key: 'avg_play_beats_count',
                sorter: (a, b) => a.avg_play_beats_count - b.avg_play_beats_count, width: 150,
            }
        ],
        loading_1: false, export_url: ''
    };

    componentDidMount() {
        this.get_total_data({type: 'share_channel'});
    }

    get_total_data({
                       type = '', channel_type = 'false', platform = 'false', title = 'false', play_type = 'false',
                       pay_type = 'false', channel = 'false', share_channel = 'false', need_count = 15, instrument = 'false'
                   }) {
        const {
            cur_title, cur_instrument, cur_play_type
        } = this.state;
        if (instrument === 'false') {
            instrument = cur_instrument;
        }
        if (play_type === 'false') {
            play_type = cur_play_type;
        }
        if (title === 'false') {
            title = cur_title;
        }

        if (type === 'share_channel') {
            let url = this.main_host + `/v3/operating/score_stats/` + '?instrument_type=' + instrument + '&title=' + title + '&play_type=' + play_type;
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

    handleInstrumentTotalChange(value) {
        this.setState({cur_instrument: value});
        this.get_total_data({type: 'share_channel', instrument: value})
    }

    handleTypeChange(value) {
        this.setState({cur_play_type: value});
        this.get_total_data({type: 'share_channel', play_type: value})
    }

    onSearch(value) {
        this.setState({cur_title: value});
        this.get_total_data({type: 'share_channel', title: value})
    }

    render() {
        const {
            fee_channel_data_columns, loading_1, fee_channel_data_list
        } = this.state;
        return (
            <div>
                <Row style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 110}}
                     className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>乐器</span>
                            <Select defaultValue="3" style={{width: 120,}}
                                    onChange={(value) => this.handleInstrumentTotalChange(value)}>
                                <Option value="0">吉他</Option>
                                <Option value="1">尤克里里</Option>
                                <Option value="2">卡林巴</Option>
                                <Option value="3">非洲鼓</Option>
                                <Option value="4">钢琴</Option>
                            </Select>
                        </div>

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>练习类型</span>
                            <Select defaultValue="2" style={{width: 120,}}
                                    onChange={(value) => this.handleTypeChange(value)}>
                                <Option value="0">课程</Option>
                                <Option value="1">曲谱</Option>
                                <Option value="2">游戏</Option>
                            </Select>
                        </div>

                        <Search
                            placeholder="名称"
                            onSearch={value => this.onSearch(value)}
                            style={{width: 200, marginLeft: 20}}
                        />
                    </Card>
                </Row>

                <Row style={{marginTop: '50px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="曲谱相关统计"
                            hoverable={true}
                        >
                            <Table dataSource={fee_channel_data_list} loading={loading_1} bordered
                                   pagination={false} scroll={{y: 580}}
                                   columns={fee_channel_data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}