import React, {Component} from 'react';
import Error2 from './Error2';
import Waiting from './Waiting';
import {Table, Button, Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import ThePagination from "./Pagination";
import * as api from "../api";
import {Link} from "react-router-dom";

export default class ActiveSummary extends Component {

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            page: 0,
            size: 10,
            total: 0,
            activeinfo: [],
            error: null,
            loading: false,
            day: 1,
            instype: 1
        }
    };

    componentDidMount() {
        this.onLoad();
    };

    onLoad() {
        const {page, size, day, instype} = this.state;
        this.setState({loading: true, error: null})
        api.activeSummary(page, size, day, instype)
            .then(json => this.setState({
                loading: false,
                activeinfo: json.data,
                total: json.count,
            }, console.log(json.data, page, size, '*******')))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    render() {
        const {loading, error, activeinfo, page, size, total, day, instype} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Form inline style={{marginBottom: 5}}>
                    <FormGroup bsSize="small" controlId="days">
                    <ControlLabel>天数：</ControlLabel>
                        <FormControl componentClass="select" value={day}  onChange={e => this.setState({day: e.target.value == "" ? null : e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            <option value="1">昨天</option>
                            <option value="3">3天</option>
                            <option value="5">5天</option>
                            <option value="7">7天</option>
                            <option value="15">15天</option>
                            <option value="30">30天</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup bsSize="small" controlId="days">
                        <ControlLabel>乐器类型：</ControlLabel>
                            <FormControl componentClass="select" value={instype}  onChange={e => this.setState({instype: e.target.value == "" ? null : e.target.value}, this.onLoad)}>
                                <option value="">全部</option>
                                <option value="0">吉他</option>
                                <option value="1">尤克里里</option>
                            </FormControl>
                    </FormGroup>
                </Form>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>课程名称</th>
                        <th>老师名称</th>
                        <th>付款人数</th>
                        <th>后台激活人数</th>
                        <th>激活卡</th>
                        <th>课程价格</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        activeinfo.map((info, index) => {
                            return (
                                <tr key={index}>
                                    <td>{info.instrument_type == 1 ? '尤克里里' : '吉他'}:{info.course_name}</td>
                                    <td>{info.teacher_name}</td>
                                    <td>{
                                        (() => {
                                                let query = [];
                                                query.push(['type', 'paid']);
                                                query.push(['day', day]);
                                                query.push(['goods_id', info.goods_id])
                                                return (
                                                    <Link
                                                        to={`purchasesummary?${query.map(x => x.join('=')).join('&')}`}>{info.paid_count}</Link>
                                                );
                                        })()
                                    }</td>
                                    <td>{
                                        (() => {
                                                let query = [];
                                                query.push(['type', 'active']);
                                                query.push(['day', day]);
                                                query.push(['goods_id', info.goods_id])
                                                return (
                                                    <Link
                                                        to={`purchasesummary?${query.map(x => x.join('=')).join('&')}`}>{info.active_count}</Link>
                                                );
                                        })()
                                    }</td>
                                    <td>{
                                        (()=> {
                                                let query = [];
                                                query.push(['type', 'paid'])
                                                query.push(['code', '1']);
                                                query.push(['day', day]);
                                                query.push(['goods_id', info.goods_id])
                                                return (
                                                    <Link
                                                        to={`purchasesummary?${query.map(x => x.join('=')).join('&')}`}>{info.code_count}</Link>
                                                );
                                        })()
                                    }</td>
                                    <td>{(info.price) / 100}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <ThePagination page={page} size={size} total={total}
                               onSelect={page => this.setState({page}, this.onLoad)}/>
        </div>)
    }
}