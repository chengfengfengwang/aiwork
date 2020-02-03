import React, {Component} from "react";
import * as api from "../api";
import Error2 from "./Error2";
import Waiting from "./Waiting";
import ThePagination from "./Pagination";
import {Table, Thead, Tbody, Form, Button, Modal, ControlLabel, FormControl, FormGroup, InputGroup, Col, Row, Checkbox, Alert} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";
import * as moment from "moment";


export default class Coupon extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onClear = this.onClear.bind(this);
        this.state = {
            page: 0,
            size: 10,
            total: 0,
            loading: false,
            error: null,
            coupons: [],
            popup: false,
            tels: "",
            tel:"",
            datas: '',
            account_info: [],
            abnor_total: 0,
        }
    }

    componentDidMount() {
        this.getAbnormalCount();
        this.onLoad()
    }

    getAbnormalCount(){
        api.getAbnormalCount().then(json => {this.setState({abnor_total: json.count})})
        .catch(error => this.setState({loading: false, error}));
    }

    onSubmit() {
        const {tels, datas} = this.state;

        this.setState({loading: true, error: null})
        api.changeShare(tels, datas)
            .then(json => this.setState({
                loading: false,
                data: json.data
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    onSelect() {
        const {tel} = this.state;

        this.setState({loading: true, error: null})
        api.getShareAccount(tel)
            .then(json => this.setState({
                loading: false,
                account_info: json.data
            }, console.log('*)))))))))))))))', json)))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }
    onClear() {
         const {telphone, phoneid} = this.state;

        this.setState({loading: true, error: null})
        api.clearShare(telphone, phoneid)
            .then(json => this.setState({
                loading: false,
                data: json.data
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    render() {
        const {page, size, total, loading, error, popup,account_info,tel, abnor_total} = this.state;
        console.log('******************', account_info)
        return (
            <div>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Alert bsStyle="warning" style={{marginTop: '10px', width: '25%', marginBottom: 0}}>
                    总异常数目：<strong>{abnor_total}</strong>
                </Alert>
                <ControlLabel style={{marginTop: 20, marginLeft: 10}}>【情况异常情况，设置主设备】--</ControlLabel>
                <Form inline style={{padding: 3}}>

                            <ControlLabel style={{marginTop: 20, marginLeft: 10}}>手机号：</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        placeholder="请输入手机号"
                            onChange={(e) => this.setState({
                                tels: e.target.value
                            })}
                        />
                        <ControlLabel style={{marginTop: 20, marginLeft: 10}}>请输入主设备：</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        placeholder="请输入主设备"
                            onChange={(e) => this.setState({
                                datas: e.target.value
                            })}
                        />
                         <Button bsStyle="success" onClick={this.onSubmit}>提交</Button>
                </Form>
                <ControlLabel style={{marginTop: 20, marginLeft: 10}}>【会员专用：清除异常状态】--</ControlLabel>
                  <Form inline style={{padding: 3}}>

                            <ControlLabel style={{marginTop: 20, marginLeft: 10}}>手机号：</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        placeholder="请输入手机号"
                            onChange={(e) => this.setState({
                                telphone: e.target.value
                            })}
                        />
                        <ControlLabel style={{marginTop: 20, marginLeft: 10}}>请输入主设备：</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        placeholder="请输入要清除的设备id"
                            onChange={(e) => this.setState({
                                phoneid: e.target.value
                            })}
                        />
                         <Button bsStyle="success" onClick={this.onClear}>提交</Button>
                </Form>
                <ControlLabel style={{marginTop: 20, marginLeft: 10}}>【查询用户健康状态】--</ControlLabel>
                <Form inline style={{padding: 3, marginTop: 10}}>
                                    <ControlLabel style={{marginTop: 20, marginLeft: 10}}>（手机号）：</ControlLabel>
                    <FormControl
                        placeholder="请输入手机号"
                            onChange={(e) => this.setState({
                                tel: e.target.value
                            })}
                        />
                        <Button bsStyle="success" onClick={this.onSelect}>查询</Button>
                        </Form>
                          <ControlLabel style={{marginTop: 20, marginLeft: 10}}>注：用户违规情况：0是异地 1是从头学</ControlLabel>
                <Table bordered hover striped condensed responsive>
                    <thead>
                        <tr>
                            <th>uid</th>
                            <th>设备名称</th>
                            <th>设备健康状态</th>
                            <th>设备最后踢出时间</th>
                            <th>设备最近登录时间</th>
                            <th>常用登陆地点</th>
                            <th>用户违规情况</th>
                            <th>设备ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {account_info.map((info, index) => {
                            let last_out_time = '';
                            console.log(11111, info.last_out_time, typeof(info.last_out_time));
                            if (info.last_out_time !== "无"){
                                last_out_time = moment.unix(info.last_out_time).locale('zh_CN').format('LLLL');
                            }
                            let last_login_time = '';
                            if (info.last_login_time !== "无"){
                                last_login_time = moment.unix(info.last_login_time).locale('zh_CN').format('LLLL');
                            }
                            return (
                            <tr key={index}>
                                <td>{info.uid}</td>
                                <td>{info.name}</td>
                                <td>{info.status}</td>
                                <td>{last_out_time}</td>
                                <td>{last_login_time}</td>
                                <td>{info.locations}</td>
                                <td>{info.health}</td>
                                <td>{info.phone_id}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                            <ThePagination page={page} size={size} total={total}
                               onSelect={page => this.setState({page}, this.onLoad)}/>
            </div>
        )
    }
}