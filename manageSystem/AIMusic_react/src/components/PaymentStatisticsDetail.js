import React, {Component} from 'react';
import Error2 from './Error2';
import Waiting from './Waiting';
import {Table, Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import ThePagination from "./Pagination";
import * as api from "../api";
import {Link} from "react-router-dom";


export default class PaymentStatisticsDetail extends Component {

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            page: 0,
            size: 15,
            total: 0,
            day: this.props.location.query.day,
            month: this.props.location.query.month,
            types: 0,
            // types: this.props.location.query.types,
            loading: false,
            error: null,
            paymentinfo: [],
        }
    };

    componentWillMount() {
        this.onLoad();
    };

    onLoad() {
        const {size, page, day, types, month} = this.state;
        this.setState({loading: true, error: null});
        api.paymentStatisticsdetail(page, size, day, this.props.location.query.types, month)
            .then(json => this.setState({
                loading: false,
                paymentinfo: json.data,
                total: json.count,
            }))
            .catch(error => this.setState({
                loading: false,
                error: error,
            }, console.log('**************', error)))
    }

    render() {
        const {page, size, total, loading, paymentinfo, error, day} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Form inline style={{padding: 3, marginTop: 10}}>
                    <FormGroup bsSize="small" controlId="days">
                        <ControlLabel>天数：</ControlLabel>
                        <FormControl componentClass="select" value={day}
                                     onChange={e => this.setState({day: e.target.value == "" ? null : e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            {/*<option value="0">今天</option>*/}
                            <option value="1">昨天</option>
                            <option value="7">7天</option>
                            <option value="15">15天</option>
                            <option value="30">30天</option>
                        </FormControl>
                    </FormGroup>
                </Form>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>用户手机号</th>
                        <th>购买课程名称</th>
                        <th>乐器类型</th>
                        <th>付费时间</th>
                        <th>优惠金额</th>
                        <th>金额</th>
                        <th>设备</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        paymentinfo.map((info, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {info.phone}
                                    </td>
                                    <td>
                                        {info.course[0]}
                                    </td>
                                    <td>
                                        {info.course[1]}
                                    </td>
                                    <td>
                                        {info.payment}
                                    </td>
                                    <td>
                                        {info.less_money}
                                    </td>
                                    <td>
                                        {info.money}
                                    </td>
                                    <td>
                                        {info.device}
                                    </td>
                                </tr>)
                        })
                    }
                    </tbody>
                </Table>
                <ThePagination page={page} size={size} total={total}
                               onSelect={page => this.setState({page}, this.onLoad)}/>
            </div>
        )
    }
}