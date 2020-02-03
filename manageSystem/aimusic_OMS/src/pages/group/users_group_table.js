import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table, Avatar} from 'antd';

const {RangePicker} = DatePicker;
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';

moment.locale('zh-cn');
import config from "../../config/app_config";
import styles from './group_stats.less'


export default class UsersTable extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;

    constructor(props) {
        super(props);
        console.log(props.menuData);
        // this.menus = props.menuData;
        // this.flatMenuKeys = this.getFlatMenuKeys(props.menuData);
        this.state = {
            day: moment().add(-1, 'days').format('YYYY-MM-DD'), begin_date: '2019-01-01',
            end_date: moment().add(-1, 'days').format('YYYY-MM-DD'),
            cur_channel: '', cur_share_channel: '', cur_platform: '-1', cur_instrument: '-1',
            cur_device_models: '',
            data_list: [],
            data_columns: [
                {title: 'id', dataIndex: 'id', key: 'id'},
                {
                    title: '头像',
                    dataIndex: 'avatar_url',
                    key: 'avatar_url',
                    render: avatar_url => (<Avatar src={avatar_url}/>)
                },
                {title: '用户名', dataIndex: 'username', key: 'username'},
                {title: '手机号', dataIndex: 'phone', key: 'phone'},
                {title: '上次登录', dataIndex: 'last_logined_at', key: 'last_logined_at'},
            ],
            loading_1: false
        };
    }

    componentDidMount() {
        this.get_data({});
    }

    get_data({
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

        this.setState({loading_1: true});
        fetch(this.main_host + `/v3/operating/users/`
            + '?need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
            + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
            .then(res => res.json())
            .then(json => {
                this.setState({loading_1: false});
                this.setState({data_list: json.data});
            });
    }

    render() {
        const {data_columns, loading_1, data_list} = this.state;
        const paginationProps = {pageSize: 15};
        return (
            <div>
                <Row>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="用户列表"
                            extra={<div><a style={{marginLeft: 20, float: 'right'}} href=""><Icon type="download"/>数据导出</a>
                            </div>}
                            hoverable={true}
                        >
                            <Table dataSource={data_list} loading={loading_1} bordered
                                   scroll={{x: '100%'}} pagination={paginationProps}
                                   columns={data_columns} size="small"/>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}