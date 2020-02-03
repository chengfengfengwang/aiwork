import React, {} from "react";
import * as api from "../api";
import {
    Table,
    thead,
    tbody,
    Alert, Button, ControlLabel, InputGroup, FormControl, Glyphicon, FormGroup
} from "react-bootstrap";
import './recommend.css';
import {Link} from "react-router-dom";
import DatePicker from "react-bootstrap-date-picker";
import moment from "moment";
import Waiting from "./Waiting";

export default class ActiveCodeStats extends React.Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onReload = this.onReload.bind(this);
        this.state = {loading: false, error: null, popup: false, batch_list: [], code:'', group_list: [],
        begin_date: '2018-01-01', end_date: moment().add(1, 'days').format('YYYY-MM-DD'),
        }
    }

    onLoad() {
        // this.get_batch_list();
        // this.get_group_list();
        this.get_batch_group_list();
    }

    get_batch_group_list(){
        const {begin_date, end_date} = this.state;
        this.setState({loading: true});
        api.getActiveGroupBatchStats({begin_date:begin_date, end_date: end_date})
            .then(json => {
                this.setState({loading: false, batch_list: json.data.templates, group_list: json.data.group})})
            .catch(error => this.setState({loading: false, error}));
    }
    //
    // get_batch_list(){
    //     const {begin_date, end_date} = this.state;
    //     this.setState({loading: true});
    //     api.getActiveCodesStats({begin_date:begin_date, end_date: end_date})
    //         .then(json => this.setState({loading: false, batch_list: json.data}))
    //         .catch(error => this.setState({loading: false, error}));
    // }
    //
    // get_group_list(){
    //     const {begin_date, end_date} = this.state;
    //     this.setState({loading: true});
    //     api.getActiveCodesGroupStats({begin_date:begin_date, end_date: end_date})
    //         .then(json => this.setState({loading: false, group_list: json.data}))
    //         .catch(error => this.setState({loading: false, error}));
    // }

    onReload(){
        this.onLoad();
    }

    onSearchCode() {
        const {code} = this.state;
        this.setState({loading: true});
        api.getSearchCode(code)
            .then(json => {
                this.setState({loading: false});
                if (json.error !== 0){
                    if (code.length >= 6){
                        alert(json.message)
                    }
                }else{
                    let data = json.data;
                    let user_info = data.user;
                    let course_info = data.sup_courses;

                    if (user_info !== {}){
                        let user_show = '激活时间' + data.created_at +
                            '使用人信息：【用户名】： ' + user_info.nickname +
                            ' 【电话】：' + user_info.tel + ' 【用户id】：' + user_info.uid;
                        let course_show = '【课程激活id】：' + course_info.course_id + ' 【课程激活名称】：' + course_info.course_name;
                        alert(user_show + course_show);
                    }
                }
            })
            .catch(error => this.setState({loading: false, error}));
    }

    handleBeginChange = (newDate, formattedValue) => {
        this.setState({begin_date: formattedValue});
    };

    handleEndChange = (value, formattedValue) => {
        this.setState({end_date: formattedValue});
    };

    componentDidMount() {
        this.onLoad();
    }

    handleGroupData(e, value){
        const {group_list, begin_date, end_date} = this.state;
        this.setState({loading: true});
        api.getActiveSigGroupStats({group: value, begin_date:begin_date, end_date: end_date})
            .then(json => {
                for (var i = 0; i< group_list.length; i++){
                    if (group_list[i].key === value){
                        group_list[i].allCount = json.data.all_count;
                        group_list[i].usedCount = json.data.used_count;
                        group_list[i].fugouCount = json.data.fugou_count;
                        group_list[i].fugouAmount = json.data.fugou_amount;
                        break;
                    }
                }
                this.setState({loading: false, group_list: group_list})
            })
            .catch(error => this.setState({loading: false, error}));
    }

    handleTemplateData(e, value){
        const {batch_list, begin_date, end_date} = this.state;
        this.setState({loading: true});
        api.getActiveSigBatchStats({template_id: value, begin_date:begin_date, end_date: end_date})
            .then(json => {
                for (var i = 0; i< batch_list.length; i++){
                    if (batch_list[i].key === value){
                        batch_list[i].stats = json.data[0].stats;
                        break;
                    }
                }
                this.setState({loading: false, batch_list: batch_list})
            })
            .catch(error => this.setState({loading: false, error}));
    }

    render() {
        const {loading, batch_list, code, begin_date, end_date, group_list} = this.state;
        const format= "YYYY-MM-DD";
        return (
            <div>
                <Waiting isVisible={loading}/>
                <FormGroup bsSize="small" style={{width: '400px', float: 'left'}}>
                    <ControlLabel>激活码查询</ControlLabel>
                    <InputGroup>
                        <FormControl
                            type="text" placeholder="请输入激活码"
                            value={code}
                            onChange={e => this.setState({
                                page: 0,
                                code: e.target.value.trim()
                            }, () => this.onSearchCode())}
                        />
                        <InputGroup.Addon><Glyphicon glyph="search" onClick={this.onSearchCode}/></InputGroup.Addon>
                    </InputGroup>
                </FormGroup>
                <FormGroup bsSize="small" style={{width: '200px', float: 'left', marginLeft: 200}}>
                    <ControlLabel>开始时间</ControlLabel>
                    <DatePicker
                       value={begin_date}
                       dateFormat={format}
                       onChange={this.handleBeginChange}/>
                </FormGroup>
                <FormGroup bsSize="small" style={{width: '200px', float: 'left', marginLeft: 30}}>
                    <ControlLabel>结束时间</ControlLabel>
                    <DatePicker
                       value={end_date}
                       dateFormat={format}
                       onChange={this.handleEndChange}/>
                </FormGroup>
                <FormGroup bsSize="small" style={{float: 'left', marginLeft: 10}}>
                    <Button style={{float: "right", marginTop: '10px'}} onClick={this.onLoad}>设置</Button>
                </FormGroup>

                <Button style={{float: "right", marginTop: '10px'}} onClick={this.onLoad}>刷新</Button>
                <Table striped bordered condensed hover style={{float: "right", marginTop: '10px'}}>
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>分组</th>
                      <th>统计</th>
                    </tr>
                  </thead>
                  <tbody>
                        {
                            group_list.map((item, index) => {
                                let path = {
                                  pathname:'/active_code',
                                  query: {group: item.key, begin_date: begin_date, batch_number: '',
                                          end_date: end_date},
                                };
                                if (item.allCount !== undefined){
                                    return(
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <div style={{float: 'left', marginLeft: '20px'}}>
                                                <Link to={path}>
                                                    <Alert bsStyle="warning" style={{marginBottom: 0, fontSize: 14, padding: 5}}>
                                                        总数目：<strong>{item.allCount}</strong>&nbsp;&nbsp;&nbsp;
                                                        已使用数目：<strong>{item.usedCount}</strong><br/>
                                                        激活后复购数：<strong>{item.fugouCount}</strong>&nbsp;&nbsp;&nbsp;
                                                        激活后复购费用：<strong>{item.fugouAmount}</strong>
                                                    </Alert>
                                                </Link>
                                            </div>
                                        </td>
                                    </tr>
                                )
                                }else{
                                    return(
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Button variant="primary" onClick={e =>this.handleGroupData(e, item.key)}>查看统计数据</Button>
                                        </td>
                                    </tr>
                                    )
                                }

                            })
                        }
                  </tbody>
                </Table>
                <Table striped bordered condensed hover style={{float: "right", marginTop: '10px'}}>
                  <thead>
                    <tr>
                      <th>序号</th>
                      <th>渠道</th>
                      <th>统计</th>
                    </tr>
                  </thead>
                  <tbody>
                        {
                            batch_list.map((item, index) => {
                                if (item.stats){
                                    return(
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            {
                                                item.stats.map((stat, index) => {
                                                    let path = {
                                                      pathname:'/active_code',
                                                      query: {batch_number: stat._id, begin_date: begin_date,
                                                              end_date: end_date, group: ''},
                                                    };
                                                    return(
                                                        <div style={{float: 'left', marginLeft: '20px'}}>
                                                            <strong>{stat._id}</strong>
                                                            <Link to={path}>
                                                                <Alert bsStyle="warning" style={{marginBottom: 0, fontSize: 14, padding: 5}}>
                                                                    总数目：<strong>{stat.total_batch}</strong>&nbsp;&nbsp;&nbsp;
                                                                    已使用数目：<strong>{stat.use_batch}</strong><br/>
                                                                    使用的用户数目：<strong>{stat.user_list}</strong>&nbsp;&nbsp;&nbsp;
                                                                    激活后复购数：<strong>{stat.fugou_count}</strong><br/>
                                                                    激活后复购费用：<strong>{stat.fugou_amount}</strong>
                                                                </Alert>
                                                            </Link>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </td>
                                    </tr>
                                )
                                }else{
                                    return(
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{item.name}</td>
                                        <td>
                                            <Button variant="primary" onClick={e =>this.handleTemplateData(e, item.key)}>查看统计数据</Button>
                                        </td>
                                    </tr>
                                )
                                }
                            })
                        }
                  </tbody>
                </Table>
            </div>
        );
    }
}
