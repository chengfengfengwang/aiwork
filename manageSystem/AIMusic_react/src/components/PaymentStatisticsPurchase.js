import React, {Component} from 'react';
import Error2 from './Error2';
import Waiting from './Waiting';
import {Table, Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import ThePagination from "./Pagination";
import * as api from "../api";
import {Link} from "react-router-dom";


export default class PaymentStatisticsPurchase extends Component {

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            page: 0,
            size: 15,
            total: 0,
            day: '',
            loading: false,
            error: null,
            paymentinfo: [],
        }
    };

    componentWillMount() {
        this.onLoad();
    };

    onLoad() {
        const {page, size, day, instype} = this.state;
        this.setState({loading: true, error: null})
        api.paymentStatisticspurchase(page, size, day, instype)
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
        const {
            page, size, total, loading, paymentinfo, error, day, instype
        } = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Form inline style={{padding: 3, marginTop: 10}}>
                    <FormGroup bsSize="small" controlId="days">
                        <ControlLabel>乐器类型：</ControlLabel>
                        <FormControl componentClass="select" value={instype}
                                     onChange={e => this.setState({instype: e.target.value == "" ? null : e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            <option value="0">吉他</option>
                            <option value="1">尤克里里</option>
                            <option value="2">卡林巴</option>
                        </FormControl>
                    </FormGroup>
                    &nbsp;&nbsp;
                    <FormGroup bsSize="small" controlId="days">
                        <ControlLabel>天数：</ControlLabel>
                        <FormControl componentClass="select" value={day}
                                     onChange={e => this.setState({day: e.target.value == "" ? null : e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            {/*<option value="0">今天</option>*/}
                            <option value="1">昨天</option>
                            <option value="3">3天</option>
                            <option value="7">7天</option>
                            <option value="30">30天</option>
                        </FormControl>
                    </FormGroup>
                </Form>
                {/*<Form inline style={{padding: 3, marginRight: true}}>*/}
                {/*<Link to={`paymentstatisticsdown`}><Button>导出</Button></Link>*/}
                {/*</Form>*/}

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>用户uid</th>
                        <th>激活课程名称</th>
                        <th>课程价格</th>
                        <th>乐器类型</th>
                        <th>激活时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        paymentinfo.map((info, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        {info.uid}
                                    </td>
                                    <td>
                                        {info.course_name}
                                    </td>
                                    <td>
                                        {info.course_price}
                                    </td>
                                    <td>
                                        {info.instrument_type}
                                    </td>
                                    <td>
                                        {info.paid_at}
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