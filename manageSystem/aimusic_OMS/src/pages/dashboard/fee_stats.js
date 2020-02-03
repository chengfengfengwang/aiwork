import React from 'react';
import {Row, Col, Layout, Menu, Breadcrumb, Icon, Card, Divider, List, DatePicker, Select, Table} from 'antd';
const {RangePicker} = DatePicker;
import Field from "../../components/Charts/Field";
import echarts from 'echarts/lib/echarts';
import './user_stats.less';
import locale from 'antd/lib/date-picker/locale/zh_CN';
import moment from 'moment';
moment.locale('zh-cn');
import {show_Line, show_day_line_many, show_date_line_many, show_payment_bar_many, show_total_bar} from "../../components/echarts_coms";
import config from "../../config/app_config";
import styles from './fee_stats.less'


export default class FeeStats extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    state = {
        key_day: 'tab_1', key_date: 'tab_1', key_payment: 'tab_1', key_total_day: 'tab_1',
        fee_number_stats: {value: 0, today: 0, yesterday: 0, avg: 0, week_value: []},
        fee_cost_states: {value: 0, today: 0, yesterday: 0, avg: 0, week_value: []},
        fee_count_stats: {value: 0, today: 0, yesterday: 0, avg: 0, week_value: []},
        day_channel_count: [], day_channel_fee: [],
        date_channel_count: [], date_channel_fee: [],
        day: moment().add(-1, 'days').format('YYYY-MM-DD'), begin_date: '2019-01-01',
        end_date: moment().add(-1, 'days').format('YYYY-MM-DD'),
        day_channel_type: 'channel', date_channel_type: 'channel', day_total_channel_type: 'channel',
        choose_channels: [], choose_share_channels: [],
        cur_channel: '', cur_share_channel: '', cur_platform: '-1', cur_instrument: '-1',
        course_data_list: [],
        course_data_columns: [
            {title: '课程名', dataIndex: 'course_name', key: 'course_name',},
            {title: '订单数', dataIndex: 'course_count', key: 'course_count',},
            {title: '人数', dataIndex: 'user_list', key: 'user_list',},
            {title: '金额', dataIndex: 'course_money', key: 'course_money',}
            ]
    };

    componentDidMount() {
        // 顶部统计数据
        this.get_date_data({face_type:'total', data_type:'user', ele_id:'cost_number'});
        this.get_date_data({face_type:'total', data_type:'count', ele_id:'cost_count'});
        this.get_date_data({face_type:'total', data_type:'fee', ele_id:'cost_fee'});

        // 筛选条件获取
        this.get_channels({});
        this.get_share_channels({});

        this.get_day_data({face_type:'day_total_line', data_type:'user', ele_id:'day_total_tab_1'});

        this.get_day_data({face_type:'day_line', data_type:'count', ele_id:'day_tab_1'});
        this.get_day_data({face_type:'day_rank', data_type:'count', ele_id:'day_channel_count'});

        this.get_date_data({face_type:'date_line', data_type:'count', ele_id:'date_tab_1'});
        this.get_date_data({face_type:'date_rank', data_type:'count', ele_id:'date_channel_count'});
        this.get_date_data({face_type:'payment', data_type:'count', ele_id:'payment_tab_1'});

        this.get_date_data({face_type:'course_total', data_type:'total', ele_id:''});
        this.get_date_data({face_type:'fugou', data_type:'total', ele_id:'fugou_bar'});
    }

    onDayTabChange = (key, type, data_type='channels') => {
        this.setState({[type]: key});
        if (key === 'tab_1') {
            if (data_type === 'channels'){
                this.get_day_data({face_type:'day_line', data_type:'count', ele_id:'day_tab_1'});
                this.get_day_data({face_type:'day_rank', data_type:'count', ele_id:'day_channel_count'});
            }else{

            }
        } else {
            if (data_type === 'channels'){
                this.get_day_data({face_type:'day_line', data_type:'fee', ele_id:'day_tab_2'});
                this.get_day_data({face_type:'day_rank', data_type:'fee', ele_id:'day_channel_fee'});
            }else{

            }
        }
    };

    onDayTotalTabChange = (key, type, data_type='channels') => {
        this.setState({[type]: key});
        if (key === 'tab_1') {
            if (data_type === 'channels'){
            }else{
                this.get_day_data({face_type:'day_total_line', data_type:'user', ele_id:'day_total_tab_1'});
            }
        }else if (key === 'tab_2'){
            if (data_type === 'channels'){
            }else{
                this.get_day_data({face_type:'day_total_line', data_type:'count', ele_id:'day_total_tab_2'});
            }
        } else {
            if (data_type === 'channels'){
            }else{
                this.get_day_data({face_type:'day_total_line', data_type:'fee', ele_id:'day_total_tab_3'});
            }
        }
    };

    onDateTabChange = (key, type) => {
        this.setState({[type]: key});
        if (key === 'tab_1') {
            this.get_date_data({face_type:'date_line', data_type:'count', ele_id:'date_tab_1'});
            this.get_date_data({face_type:'date_rank', data_type:'count', ele_id:'date_channel_count'});
        } else {
            this.get_date_data({face_type:'date_line', data_type:'fee', ele_id:'date_tab_2'});
            this.get_date_data({face_type:'date_rank', data_type:'fee', ele_id:'date_channel_fee'});
        }
    };

    onPaymentTabChange = (key, type) => {
        this.setState({[type]: key});
        if (key === 'tab_1') {
            this.get_date_data({face_type:'payment', data_type:'count', ele_id:'payment_tab_1'});
        } else {
            this.get_date_data({face_type:'payment', data_type:'fee', ele_id:'payment_tab_2'});
        }
    };

    get_channels({}) {
        fetch(this.main_host + '/v3/operating/channels/', {
            method: 'GET'
        }).then(res => res.json()).then(
            json => {
                this.setState({choose_channels: json.data});
            }
        )
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

    get_date_data({face_type = '', data_type = 'count', ele_id = '', begin_date_tmp = '', end_date_tmp = '',
                      channel_type = 'false', platform = 'false', instrument = 'false', channel = 'false',
                      share_channel = 'false', need_count = 15}) {
        const {begin_date, end_date, date_channel_type, cur_platform, 
            cur_instrument, cur_channel, cur_share_channel} = this.state;
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
            case 'payment':
                fetch(this.main_host + `/v3/operating/payment_channel_detail/?cal_type=` + data_type
                    + '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                    + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                    + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
                    .then(res => res.json())
                    .then(json => {
                        show_payment_bar_many(echarts.init(document.getElementById(ele_id)), json);
                    }
                );
                break;

            case 'date_rank':
                need_count = 10;
                fetch(this.main_host + `/v3/operating/date_channel_ranking/?cal_type=`+ data_type
                    + '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                    + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                    + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
                    .then(res => res.json())
                    .then(json => {
                        if (ele_id === 'date_channel_count'){
                            this.setState({date_channel_count: json.list});
                        }else{
                            this.setState({date_channel_fee: json.list});
                        }
                    }
                );
                break;

            case 'date_line':
                fetch(this.main_host + `/v3/operating/date_channel_detail/?cal_type=` + data_type
                    + '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&channel_type=' + channel_type
                    + '&need_count=' + need_count + '&platform=' + platform + '&instrument=' + instrument
                    + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
                    .then(res => res.json())
                    .then(json => {
                        const {begin_date, end_date} = this.state;
                        show_date_line_many(echarts.init(document.getElementById(ele_id)), json, begin_date, end_date);
                    }
                );
                break;

            case 'total':
                fetch(this.main_host + '/v3/operating/date_count/?cal_type=' + data_type
                    + '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&platform=' + platform
                    + '&instrument=' + instrument + '&channel=' + channel
                    + '&share_channel=' + share_channel, {method: 'GET'})
                    .then(res => res.json())
                    .then(json => {
                        if (ele_id === 'cost_fee'){
                            this.setState({fee_cost_states: json});
                        }else if(ele_id === 'cost_count'){
                            this.setState({fee_count_stats: json});
                        }else{
                            this.setState({fee_number_stats: json});
                        }
                        show_Line(echarts.init(document.getElementById(ele_id)), json.week_value);
                    }
                );
                break;

            case 'course_total':
                fetch(this.main_host + '/v3/operating/course_detail/?cal_type=' + data_type
                    + '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&platform=' + platform
                    + '&instrument=' + instrument + '&channel=' + channel
                    + '&share_channel=' + share_channel, {method: 'GET'})
                    .then(res => res.json())
                    .then(json => {
                        this.setState({course_data_list: json.data})
                    }
                );
                break;

            case 'fugou':
                fetch(this.main_host + '/v3/operating/re_purchase/?cal_type=' + data_type
                    + '&begin_date=' + begin_date_tmp + '&end_date=' + end_date_tmp + '&platform=' + platform
                    + '&instrument=' + instrument + '&channel=' + channel
                    + '&share_channel=' + share_channel, {method: 'GET'})
                    .then(res => res.json())
                    .then(json => {
                        show_total_bar(echarts.init(document.getElementById(ele_id)), json.data);
                    }
                );
                break;
        }
    }

    get_day_data({face_type = '', data_type = 'count', ele_id = '', day_tmp = '',
                      channel_type = 'false', platform = 'false', instrument = 'false', channel = 'false',
                      share_channel = 'false', need_count = 15}) {
        const {day, day_channel_type, cur_platform, cur_instrument, cur_channel, cur_share_channel} = this.state;
        if (day_tmp.length === 0) {
            day_tmp = day;
        }
        if (channel_type=== 'false') {
            channel_type = day_channel_type;
        }
        if (platform=== 'false') {
            platform = cur_platform;
        }
        if (instrument=== 'false') {
            instrument = cur_instrument;
        }
        if (channel === 'false') {
            channel = cur_channel;
        }
        if (share_channel === 'false') {
            share_channel = cur_share_channel;
        }

        switch (face_type) {
            case 'day_rank':
                need_count = 10;
                fetch(this.main_host + `/v3/operating/day_channel_ranking/?cal_type=` + data_type
                    + '&day=' + day_tmp + '&channel_type=' + channel_type + '&need_count=' + need_count
                    + '&platform=' + platform + '&instrument=' + instrument
                    + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
                    .then(res => res.json())
                    .then(json => {
                        if (ele_id === 'day_channel_count'){
                            this.setState({day_channel_count: json.list});
                        }else{
                            this.setState({day_channel_fee: json.list});
                        }
                    }
                );
                break;

            case 'day_line':
                fetch(this.main_host + `/v3/operating/day_channel_detail/?cal_type=` + data_type
                    + '&day=' + day_tmp + '&channel_type=' + channel_type + '&need_count=' + need_count
                    + '&platform=' + platform + '&instrument=' + instrument
                    + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
                    .then(res => res.json())
                    .then(json => {
                        show_day_line_many(echarts.init(document.getElementById(ele_id)), json, false);
                    }
                );
                break;

            case 'day_total_line':
                fetch(this.main_host + `/v3/operating/pay_sta/?cal_type=` + data_type
                    + '&day=' + day_tmp + '&channel_type=' + channel_type + '&need_count=' + need_count
                    + '&platform=' + platform + '&instrument=' + instrument
                    + '&channel=' + channel + '&share_channel=' + share_channel, {method: 'GET'})
                    .then(res => res.json())
                    .then(json => {
                        show_day_line_many(echarts.init(document.getElementById(ele_id)), json, false);
                    }
                );
                break;
        }
    }

    onDayChange(date, dateString, key) {
        this.setState({day: dateString});
        if (key === 'tab_1') {
            this.get_day_data({face_type:'day_line', data_type:'count', ele_id:'day_tab_1', day_tmp: dateString});
            this.get_day_data({face_type:'day_rank', data_type:'count', ele_id:'day_channel_count', day_tmp: dateString});
        } else {
            this.get_day_data({face_type:'day_line', data_type:'fee', ele_id:'day_tab_2', day_tmp: dateString});
            this.get_day_data({face_type:'day_rank', data_type:'fee', ele_id:'day_channel_fee', day_tmp: dateString});
        }
    }

    onDayTotalChange(date, dateString, key) {
        this.setState({day: dateString});
        if (key === 'tab_1') {
            this.get_day_data({face_type:'day_total_line', data_type:'user', ele_id:'day_total_tab_1', day_tmp: dateString});
        } else if(key === 'tab_2') {
            this.get_day_data({face_type:'day_total_line', data_type:'count', ele_id:'day_total_tab_2', day_tmp: dateString});
        }else {
            this.get_day_data({face_type:'day_total_line', data_type:'fee', ele_id:'day_total_tab_3', day_tmp: dateString});
        }
    }

    onDateChange(date, dateString, key) {
        let begin_date = dateString[0];
        let end_date = dateString[1];
        this.setState({begin_date: begin_date, end_date: end_date});
        if (begin_date.substr(0, 4) !== end_date.substr(0, 4) ){
            alert('不能跨年！');
            return;
        }

        if (key === 'tab_1') {
            this.get_date_data({face_type:'date_line', data_type:'count', ele_id:'date_tab_1',
                begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
            this.get_date_data({face_type:'date_rank', data_type:'count', ele_id:'date_channel_count',
                begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        } else {
            this.get_date_data({face_type:'date_line', data_type:'fee', ele_id:'date_tab_2',
                begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
            this.get_date_data({face_type:'date_rank', data_type:'fee', ele_id:'date_channel_fee',
                begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        }
    }

    onDateCourseTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_date_data({face_type:'course_total', data_type:'total', ele_id:'',
                begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    onDateFugouTotalChange(date, dateString) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        this.get_date_data({face_type:'fugou', data_type:'total', ele_id:'fugou_bar',
                begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    onPaymentChange(date, dateString, key) {
        this.setState({begin_date: dateString[0], end_date: dateString[1]});
        if (key === 'tab_1') {
            this.get_date_data({face_type:'payment', data_type:'count', ele_id:'payment_tab_1',
                begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        } else {
            this.get_date_data({face_type:'payment', data_type:'fee', ele_id:'payment_tab_2',
                begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        }
    }

    onTotalChange(date, dateString) {
        this.get_date_data({face_type:'total', data_type:'count', ele_id:'cost_number',
            begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_date_data({face_type:'total', data_type:'fee', ele_id:'cost_fee',
            begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
        this.get_date_data({face_type:'total', data_type:'count_fee', ele_id:'cost_count',
            begin_date_tmp: dateString[0], end_date_tmp: dateString[1]});
    }

    handleDayChange(value, key) {
        this.setState({day_channel_type: value});
        if (key === 'tab_1') {
            this.get_day_data({face_type:'day_line', data_type:'count', ele_id:'day_tab_1', channel_type: value});
            this.get_day_data({face_type:'day_rank', data_type:'count', ele_id:'day_channel_count', channel_type: value});
        } else {
            this.get_day_data({face_type:'day_line', data_type:'fee', ele_id:'day_tab_2', channel_type: value});
            this.get_day_data({face_type:'day_rank', data_type:'fee', ele_id:'day_channel_fee', channel_type: value});
        }
    }

    handleDayTotalChange(value, key) {
        this.setState({day_total_channel_type: value});
        if (key === 'tab_1') {
            this.get_day_data({face_type:'day_total_line', data_type:'user', ele_id:'day_total_tab_1', channel_type: value});
        } else if(key === 'tab_2') {
            this.get_day_data({face_type:'day_total_line', data_type:'count', ele_id:'day_total_tab_2', channel_type: value});
        }else {
            this.get_day_data({face_type:'day_total_line', data_type:'fee', ele_id:'day_total_tab_3', channel_type: value});
        }
    }

    handleDateChange(value, key) {
        this.setState({date_channel_type: value});
        if (key === 'tab_1') {
            this.get_date_data({face_type:'date_line', data_type:'count', ele_id:'date_tab_1', channel_type: value});
            this.get_date_data({face_type:'date_rank', data_type:'count', ele_id:'date_channel_count', channel_type: value});
        } else {
            this.get_date_data({face_type:'date_line', data_type:'fee', ele_id:'date_tab_2', channel_type: value});
            this.get_date_data({face_type:'date_rank', data_type:'fee', ele_id:'date_channel_fee', channel_type: value});
        }
    }

    handlePaymentChange(value, key) {
        this.setState({payment_channel_type: value});
        if (key === 'tab_1') {
            this.get_date_data({face_type:'payment', data_type:'count', ele_id:'payment_tab_1', channel_type: value});
        } else {
            this.get_date_data({face_type:'payment', data_type:'fee', ele_id:'payment_tab_2', channel_type: value});
        }
    }

    handlePlatformTotalChange(value) {
        const {key_payment, key_date, key_day, key_total_day} = this.state;
        this.setState({cur_platform: value});
        this.get_date_data({face_type:'total', data_type:'count', ele_id:'cost_number', platform: value});
        this.get_date_data({face_type:'total', data_type:'fee', ele_id:'cost_fee', platform: value});
        this.get_date_data({face_type:'total', data_type:'count_fee', ele_id:'cost_count', platform: value});
        if (key_day === 'tab_1') {
            this.get_day_data({face_type:'day_line', data_type:'count', ele_id:'day_tab_1', platform: value});
            this.get_day_data({face_type:'day_rank', data_type:'count', ele_id:'day_channel_count', platform: value});
        } else {
            this.get_day_data({face_type:'day_line', data_type:'fee', ele_id:'day_tab_2', platform: value});
            this.get_day_data({face_type:'day_rank', data_type:'fee', ele_id:'day_channel_fee', platform: value});
        }
        if (key_date === 'tab_1') {
            this.get_date_data({face_type:'date_line', data_type:'count', ele_id:'date_tab_1', platform: value});
            this.get_date_data({face_type:'date_rank', data_type:'count', ele_id:'date_channel_count', platform: value});
        } else {
            this.get_date_data({face_type:'date_line', data_type:'fee', ele_id:'date_tab_2', platform: value});
            this.get_date_data({face_type:'date_rank', data_type:'fee', ele_id:'date_channel_fee', platform: value});
        }
        if (key_payment === 'tab_1') {
            this.get_date_data({face_type:'payment', data_type:'count', ele_id:'payment_tab_1', platform: value});
        } else {
            this.get_date_data({face_type:'payment', data_type:'fee', ele_id:'payment_tab_2', platform: value});
        }
        if (key_total_day === 'tab_1'){
            this.get_date_data({face_type:'day_total_line', data_type:'user', ele_id:'day_total_tab_1', platform: value});
        }else if (key_total_day === 'tab_2'){
            this.get_date_data({face_type:'day_total_line', data_type:'count', ele_id:'day_total_tab_2', platform: value});
        }else {
            this.get_date_data({face_type:'day_total_line', data_type:'fee', ele_id:'day_total_tab_3', platform: value});
        }
        this.get_date_data({face_type:'course_total', data_type:'total', ele_id:'', platform: value});
        this.get_date_data({face_type:'fugou', data_type:'total', ele_id:'fugou_bar', platform: value});
    }

    handleInstrumentTotalChange(value) {
        const {key_payment, key_date, key_day, key_total_day} = this.state;
        this.setState({cur_instrument: value});
        this.get_date_data({face_type:'total', data_type:'count', ele_id:'cost_number', instrument: value});
        this.get_date_data({face_type:'total', data_type:'fee', ele_id:'cost_fee', instrument: value});
        this.get_date_data({face_type:'total', data_type:'count_fee', ele_id:'cost_count', instrument: value});
        if (key_day === 'tab_1') {
            this.get_day_data({face_type:'day_line', data_type:'count', ele_id:'day_tab_1', instrument: value});
            this.get_day_data({face_type:'day_rank', data_type:'count', ele_id:'day_channel_count', instrument: value});
        } else {
            this.get_day_data({face_type:'day_line', data_type:'fee', ele_id:'day_tab_2', instrument: value});
            this.get_day_data({face_type:'day_rank', data_type:'fee', ele_id:'day_channel_fee', instrument: value});
        }
        if (key_date === 'tab_1') {
            this.get_date_data({face_type:'date_line', data_type:'count', ele_id:'date_tab_1', instrument: value});
            this.get_date_data({face_type:'date_rank', data_type:'count', ele_id:'date_channel_count', instrument: value});
        } else {
            this.get_date_data({face_type:'date_line', data_type:'fee', ele_id:'date_tab_2', instrument: value});
            this.get_date_data({face_type:'date_rank', data_type:'fee', ele_id:'date_channel_fee', instrument: value});
        }
        if (key_payment === 'tab_1') {
            this.get_date_data({face_type:'payment', data_type:'count', ele_id:'payment_tab_1', instrument: value});
        } else {
            this.get_date_data({face_type:'payment', data_type:'fee', ele_id:'payment_tab_2', instrument: value});
        }
        if (key_total_day === 'tab_1'){
            this.get_date_data({face_type:'day_total_line', data_type:'user', ele_id:'day_total_tab_1', instrument: value});
        }else if (key_total_day === 'tab_2'){
            this.get_date_data({face_type:'day_total_line', data_type:'count', ele_id:'day_total_tab_2', instrument: value});
        }else {
            this.get_date_data({face_type:'day_total_line', data_type:'fee', ele_id:'day_total_tab_3', instrument: value});
        }
        this.get_date_data({face_type:'course_total', data_type:'total', ele_id:'', instrument: value});
        this.get_date_data({face_type:'fugou', data_type:'total', ele_id:'fugou_bar', instrument: value});
    }

    handleChannelChange(value) {
        value = `${value}`;
        const {key_payment, key_date, key_day, key_total_day} = this.state;
        this.setState({cur_channel: value});
        this.get_date_data({face_type:'total', data_type:'count', ele_id:'cost_number', channel: value});
        this.get_date_data({face_type:'total', data_type:'fee', ele_id:'cost_fee', channel: value});
        this.get_date_data({face_type:'total', data_type:'count_fee', ele_id:'cost_count', channel: value});
        if (key_day === 'tab_1') {
            this.get_day_data({face_type:'day_line', data_type:'count', ele_id:'day_tab_1', channel: value});
            this.get_day_data({face_type:'day_rank', data_type:'count', ele_id:'day_channel_count', channel: value});
        } else {
            this.get_day_data({face_type:'day_line', data_type:'fee', ele_id:'day_tab_2', channel: value});
            this.get_day_data({face_type:'day_rank', data_type:'fee', ele_id:'day_channel_fee', channel: value});
        }
        if (key_date === 'tab_1') {
            this.get_date_data({face_type:'date_line', data_type:'count', ele_id:'date_tab_1', channel: value});
            this.get_date_data({face_type:'date_rank', data_type:'count', ele_id:'date_channel_count', channel: value});
        } else {
            this.get_date_data({face_type:'date_line', data_type:'fee', ele_id:'date_tab_2', channel: value});
            this.get_date_data({face_type:'date_rank', data_type:'fee', ele_id:'date_channel_fee', channel: value});
        }
        if (key_payment === 'tab_1') {
            this.get_date_data({face_type:'payment', data_type:'count', ele_id:'payment_tab_1', channel: value});
        } else {
            this.get_date_data({face_type:'payment', data_type:'fee', ele_id:'payment_tab_2', channel: value});
        }
        if (key_total_day === 'tab_1'){
            this.get_date_data({face_type:'day_total_line', data_type:'user', ele_id:'day_total_tab_1', channel: value});
        }else if (key_total_day === 'tab_2'){
            this.get_date_data({face_type:'day_total_line', data_type:'count', ele_id:'day_total_tab_2', channel: value});
        }else {
            this.get_date_data({face_type:'day_total_line', data_type:'fee', ele_id:'day_total_tab_3', channel: value});
        }
        this.get_date_data({face_type:'course_total', data_type:'total', ele_id:'', channel: value});
        this.get_date_data({face_type:'fugou', data_type:'total', ele_id:'fugou_bar', channel: value});
    }

    handleShareChannelChange(value) {
        value = `${value}`;
        const {key_payment, key_date, key_day, key_total_day} = this.state;
        this.setState({cur_share_channel: value});
        this.get_date_data({face_type:'total', data_type:'count', ele_id:'cost_number', share_channel: value});
        this.get_date_data({face_type:'total', data_type:'fee', ele_id:'cost_fee', share_channel: value});
        this.get_date_data({face_type:'total', data_type:'count_fee', ele_id:'cost_count', share_channel: value});
        if (key_day === 'tab_1') {
            this.get_day_data({face_type:'day_line', data_type:'count', ele_id:'day_tab_1', share_channel: value});
            this.get_day_data({face_type:'day_rank', data_type:'count', ele_id:'day_channel_count', share_channel: value});
        } else {
            this.get_day_data({face_type:'day_line', data_type:'fee', ele_id:'day_tab_2', share_channel: value});
            this.get_day_data({face_type:'day_rank', data_type:'fee', ele_id:'day_channel_fee', share_channel: value});
        }
        if (key_date === 'tab_1') {
            this.get_date_data({face_type:'date_line', data_type:'count', ele_id:'date_tab_1', share_channel: value});
            this.get_date_data({face_type:'date_rank', data_type:'count', ele_id:'date_channel_count', share_channel: value});
        } else {
            this.get_date_data({face_type:'date_line', data_type:'fee', ele_id:'date_tab_2', share_channel: value});
            this.get_date_data({face_type:'date_rank', data_type:'fee', ele_id:'date_channel_fee', share_channel: value});
        }
        if (key_payment === 'tab_1') {
            this.get_date_data({face_type:'payment', data_type:'count', ele_id:'payment_tab_1', share_channel: value});
        } else {
            this.get_date_data({face_type:'payment', data_type:'fee', ele_id:'payment_tab_2', share_channel: value});
        }
        if (key_total_day === 'tab_1'){
            this.get_date_data({face_type:'day_total_line', data_type:'user', ele_id:'day_total_tab_1', share_channel: value});
        }else if (key_total_day === 'tab_2'){
            this.get_date_data({face_type:'day_total_line', data_type:'count', ele_id:'day_total_tab_2', share_channel: value});
        }else {
            this.get_date_data({face_type:'day_total_line', data_type:'fee', ele_id:'day_total_tab_3', share_channel: value});
        }
        this.get_date_data({face_type:'course_total', data_type:'total', ele_id:'', share_channel: value});
        this.get_date_data({face_type:'fugou', data_type:'total', ele_id:'fugou_bar', share_channel: value});
    }

    render() {
        const {
            fee_number_stats, fee_cost_states, fee_count_stats, day_channel_count, choose_channels, choose_share_channels,
            date_channel_count, day_channel_fee, date_channel_fee, key_day, key_date, key_payment, course_data_list, course_data_columns
        } = this.state;
        const tab_list = [{
            key: 'tab_1',
            tab: '人数',
        }, {
            key: 'tab_2',
            tab: '金额',
        }];
        const tab_list_2 = [{
            key: 'tab_1',
            tab: '人数',
        }, {
            key: 'tab_2',
            tab: '订单',
        }, {
            key: 'tab_3',
            tab: '金额',
        }];

        const content_day_list = {
            tab_1: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={17}>
                        <div id="day_tab_1" style={{width: '95%', height: '400px'}}/>
                    </Col>
                    <Col span={7}>
                        <List
                            size="small"
                            header={<div>今日渠道【付费】排行前{day_channel_count !== undefined ? day_channel_count.length : 0}</div>}
                            bordered
                            dataSource={day_channel_count}
                            renderItem={item => (<List.Item>{item.index} . {item.label} : {item.value}</List.Item>)}
                        />
                    </Col>
                </Row>
            </div>,
            tab_2: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={17}>
                        <div id="day_tab_2" style={{width: '95%', height: '400px'}}/>
                    </Col>
                    <Col span={7}>
                        <List
                            size="small"
                            header={<div>本月渠道【付费】排行前{day_channel_fee.length}</div>}
                            bordered
                            dataSource={day_channel_fee}
                            renderItem={item => (<List.Item>{item.index} . {item.label} : {item.value}</List.Item>)}
                        />
                    </Col>
                </Row>
            </div>,
        };

        const content_day_total_list = {
            tab_1: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <div id="day_total_tab_1" style={{width: '95%', height: '400px'}}/>
                    </Col>
                </Row>
            </div>,
            tab_2: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <div id="day_total_tab_2" style={{width: '95%', height: '400px'}}/>
                    </Col>
                </Row>
            </div>,
            tab_3: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <div id="day_total_tab_3" style={{width: '95%', height: '400px'}}/>
                    </Col>
                </Row>
            </div>,
        };

        const content_date_list = {
            tab_1: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={17}>
                        <div id="date_tab_1" style={{width: '95%', height: '400px'}}/>
                    </Col>
                    <Col span={7}>
                        <List
                            size="small"
                            header={<div>今日渠道【付费】排行前{date_channel_count.length}</div>}
                            bordered
                            dataSource={date_channel_count}
                            renderItem={item => (<List.Item>{item.index} . {item.label} : {item.value}</List.Item>)}
                        />
                    </Col>
                </Row>
            </div>,
            tab_2: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={17}>
                        <div id="date_tab_2" style={{width: '95%', height: '400px'}}/>
                    </Col>
                    <Col span={7}>
                        <List
                            size="small"
                            header={<div>本月渠道【付费】排行前{date_channel_fee.length}</div>}
                            bordered
                            dataSource={date_channel_fee}
                            renderItem={item => (<List.Item>{item.index} . {item.label} : {item.value}</List.Item>)}
                        />
                    </Col>
                </Row>
            </div>,
        };
        const content_payment_list = {
            tab_1: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={17}>
                        <div id="payment_tab_1" style={{width: '95%', height: '400px'}}/>
                    </Col>
                    <Col span={7}>
                        <div id="payment_tab_pie_1" style={{width: '95%', height: '400px'}}/>
                    </Col>
                </Row>
            </div>,
            tab_2: <div>
                <Row style={{marginTop: '20px'}}>
                    <Col span={17}>
                        <div id="payment_tab_2" style={{width: '95%', height: '400px'}}/>
                    </Col>
                    <Col span={7}>
                        <div id="payment_tab_pie_2" style={{width: '95%', height: '400px'}}/>
                    </Col>
                </Row>
            </div>,
        };

        return (
            <div>
                <Row style={{position: 'fixed', zIndex: 1, background: '#ffffff', top: 125}} className={styles.customThin}>
                    <Card bordered={true} style={{background: '#e6f7ff'}}>
                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>渠道1</span>
                            <Select mode="multiple" showSearch style={{width: 250,}} placeholder="请选择渠道1"
                                    onChange={(value) => this.handleChannelChange(value, 'total', '')}>
                                {
                                    choose_channels.map((item, index) => {
                                        return (
                                            <Select.Option key={index} rowkey={index} value={item.value}>{item.label}</Select.Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>渠道2</span>
                            <Select mode="multiple" showSearch style={{width: 250,}} placeholder="请选择渠道2"
                                    onChange={(value) => this.handleShareChannelChange(value, 'total', '')}>
                                {
                                    choose_share_channels.map((item, index) => {
                                        return (
                                            <Option key={index} value={item.value}>{item.label}</Option>
                                        )
                                    })
                                }
                            </Select>
                        </div>

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>平台</span>
                            <Select defaultValue="-1" style={{width: 120,}}
                                    onChange={(value) => this.handlePlatformTotalChange(value, 'total', '')}>
                                <Option value="-1">全部</Option>
                                <Option value="1">Android</Option>
                                <Option value="0">IOS</Option>
                            </Select>
                        </div>

                        <div style={{marginLeft: '20px', float: 'left'}}>
                            <span style={{marginRight: "10px"}}>乐器</span>
                            <Select defaultValue="-1" style={{width: 120,}}
                                    onChange={(value) => this.handleInstrumentTotalChange(value)}>
                                <Option value="-1">全部</Option>
                                <Option value="0">吉他</Option>
                                <Option value="1">尤克里里</Option>
                                <Option value="2">卡林巴</Option>
                                <Option value="3">非洲鼓</Option>
                                <Option value="4">钢琴</Option>
                            </Select>
                        </div>
                    </Card>
                </Row>

                <Row style={{marginTop: 30}}>
                    <Col span={24} style={{marginBottom: 10, marginTop: 10}}>
                        <RangePicker onChange={(date, dateString) => {
                            this.onTotalChange(date, dateString);
                        }}
                                     locale={locale} style={{float: 'right', marginLeft: "10px"}}
                                     defaultValue={[moment('2019-04-01'), moment().add(0, 'days')]}/>
                    </Col>
                    <Col span={5}>
                        <Card title="付费人数" bordered={true} hoverable={true} bodyStyle={{padding: '12px'}} className={styles.customCard}>
                            <h1>{fee_number_stats.value}</h1>
                            <div id="cost_number" style={{width: '95%', height: '50px'}}/>
                            <Divider style={{margin: '14px 0'}}/>
                            <Field style={{float: 'left'}} label={'今日：'}
                                   value={fee_number_stats.today + '(' + (fee_number_stats.today - fee_number_stats.yesterday) + ')'}/>
                            <Field style={{float: 'right'}} label={'平均：'} value={fee_number_stats.avg}/>
                        </Card>
                    </Col>
                    <Col span={5} style={{marginLeft: '30px'}}>
                        <Card title="订单数目" bordered={true} hoverable={true} bodyStyle={{padding: '12px'}} className={styles.customCard}>
                            <h1>{fee_count_stats.value}</h1>
                            <div id="cost_count" style={{width: '95%', height: '50px'}}/>
                            <Divider style={{margin: '14px 0'}}/>
                            <Field style={{float: 'left'}} label={'今日：'}
                                   value={fee_count_stats.today + '(' + (fee_count_stats.today - fee_count_stats.yesterday) + ')'}/>
                            <Field style={{float: 'right'}} label={'平均：'} value={fee_count_stats.avg}/>
                        </Card>
                    </Col>
                    <Col span={5} style={{marginLeft: '30px'}}>
                        <Card title="付费金额" bordered={true} hoverable={true}  className={styles.customCard}
                              bodyStyle={{padding: '12px'}}>
                            <h1>{fee_cost_states.value}</h1>
                            <div id="cost_fee" style={{width: '85%', height: '50px'}}/>
                            <Divider style={{margin: '14px 0'}}/>
                            <Field style={{float: 'left'}} label={'今日：'}
                                   value={fee_cost_states.today + '(' + (fee_cost_states.today - fee_cost_states.yesterday) + ')'}/>
                            <Field style={{float: 'right'}} label={'平均：'} value={fee_cost_states.avg}/>
                        </Card>
                    </Col>
                </Row>

                <Row style={{marginTop: '20px'}}>
                    <Col span={16}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="时/日统计"
                            extra={<div>
                                <a style={{marginLeft: 20, float: 'right'}} href="/fee/fee_day_stats">查看更多</a>
                                <Select defaultValue="channel" style={{width: 120, float: 'right', marginLeft: '10px'}}
                                        onChange={(value) => this.handleDayTotalChange(value, this.state.key_total_day)}>
                                    <Option value="channel">渠道1</Option>
                                    <Option value="share_channel">渠道2</Option>
                                </Select>
                                <DatePicker style={{marginLeft: 10, float: 'right'}}
                                            onChange={(date, dateString) => {
                                                this.onDayTotalChange(date, dateString, this.state.key_total_day);
                                            }} locale={locale} defaultValue={moment().add(-1, 'days')}/>
                            </div>}
                            tabList={tab_list_2}
                            bodyStyle={{padding: '12px'}}
                            hoverable={true}
                            activeTabKey={this.state.key_total_day}
                            onTabChange={(key) => {
                                this.onDayTotalTabChange(key, 'key_total_day', 'total');
                            }}
                        >
                            {content_day_total_list[this.state.key_total_day]}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card
                            style={{width: '100%', marginLeft: 10}}
                            title="复购统计"
                            hoverable={true}
                            extra={<div>
                                <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
                                    this.onDateFugouTotalChange(date, dateString);
                                }} locale={locale} defaultValue={[moment('2019-04-01'), moment().add(-1, 'days')]}/>
                            </div>}
                        >
                            <div id="fugou_bar" style={{width: '95%', height: '420px'}}/>
                        </Card>
                    </Col>
                </Row>

                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="多渠道时/日统计"
                            extra={<div>
                                <a style={{marginLeft: 20, float: 'right'}} href="/fee/fee_day_stats">查看更多</a>
                                <Select defaultValue="channel" style={{width: 120, float: 'right', marginLeft: '10px'}}
                                        onChange={(value) => this.handleDayChange(value, key_day)}>
                                    <Option value="channel">渠道1</Option>
                                    <Option value="share_channel">渠道2</Option>
                                </Select>
                                <DatePicker style={{marginLeft: 10, float: 'right'}}
                                            onChange={(date, dateString) => {
                                                this.onDayChange(date, dateString, key_day);
                                            }} locale={locale} defaultValue={moment().add(-1, 'days')}/>
                            </div>}
                            tabList={tab_list}
                            bodyStyle={{padding: '12px'}}
                            hoverable={true}
                            activeTabKey={this.state.key_day}
                            onTabChange={(key) => {
                                this.onDayTabChange(key, 'key_day');
                            }}
                        >
                            {content_day_list[this.state.key_day]}
                        </Card>
                    </Col>
                </Row>

                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="按照付费类型统计"
                            extra={<div>
                                <a style={{marginLeft: 20, float: 'right'}} href="/fee/fee_payment_stats">查看更多</a>
                                <Select defaultValue="channel" style={{width: 120, float: 'right', marginLeft: '10px'}}
                                        onChange={(value) => this.handlePaymentChange(value, key_payment)}>
                                    <Option value="channel">渠道1</Option>
                                    <Option value="share_channel">渠道2</Option>
                                </Select>
                                <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
                                    this.onPaymentChange(date, dateString, key_payment);
                                }} locale={locale} defaultValue={[moment('2019-04-01'), moment().add(-1, 'days')]}/>
                            </div>}
                            tabList={tab_list}
                            bodyStyle={{padding: '12px'}}
                            hoverable={true}
                            activeTabKey={this.state.key_payment}
                            onTabChange={(key) => {
                                this.onPaymentTabChange(key, 'key_payment');
                            }}
                        >
                            {content_payment_list[this.state.key_payment]}
                        </Card>
                    </Col>
                </Row>

                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="多渠道日/周期统计"
                            hoverable={true}
                            extra={<div>
                                <a style={{marginLeft: 20, float: 'right'}} href="/fee/fee_date_stats">查看更多</a>
                                <Select defaultValue="channel" style={{width: 120, float: 'right', marginLeft: '10px'}}
                                        onChange={(value) => this.handleDateChange(value, key_day)}>
                                    <Option value="channel">渠道1</Option>
                                    <Option value="share_channel">渠道2</Option>
                                </Select>
                                <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
                                    this.onDateChange(date, dateString, key_date);
                                }} locale={locale} defaultValue={[moment('2019-01-01'), moment().add(-1, 'days')]}/>
                            </div>}
                            tabList={tab_list}
                            activeTabKey={this.state.key_date}
                            onTabChange={(key) => {
                                this.onDateTabChange(key, 'key_date');
                            }}
                        >
                            {content_date_list[this.state.key_date]}
                        </Card>
                    </Col>
                </Row>

                <Row style={{marginTop: '20px'}}>
                    <Col span={24}>
                        <Card
                            style={{width: '100%'}} className={styles.customCard}
                            title="课程统计"
                            hoverable={true}
                            extra={<div>
                                <RangePicker style={{float: 'right', marginLeft: 10}} onChange={(date, dateString) => {
                                    this.onDateCourseTotalChange(date, dateString);
                                }} locale={locale} defaultValue={[moment('2019-01-01'), moment().add(-1, 'days')]}/>
                            </div>}
                        >
                            <Table dataSource={course_data_list} columns={course_data_columns} />
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}