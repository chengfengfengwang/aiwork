import React, {Component} from "react";
import * as api from "../api";
import Error2 from "./Error2";
import Waiting from "./Waiting";
import ThePagination from "./Pagination";
import {
    Table,
    Thead,
    Tbody,
    Form,
    ControlLabel,
    FormGroup,
    Col,
    Row,
} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";


export default class CouponStas extends Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        // this.onSubmit = this.onSubmit.bind(this);
        // this.onSelect = this.onSelect.bind(this);
        this.state = {
            page: 0,
            size: 10,
            total: 0,
            loading: false,
            error: null,
            daytimes: new Date().toISOString(),
            coupon_stas: []
        }
    }

    componentDidMount() {
        this.onLoad()
    }

    onLoad() {
        const {page, size, total, loading, error, daytimes} = this.state;

        this.setState({loading: true, error: null})
        api.getCouponstas(page, size, daytimes)
            .then(json => this.setState({
                loading: false,
                coupon_stas: json.data,
                total: json.total,
                send_count: json.send_count,
                send_success_count: json.send_success_count,
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    render() {
        const {page, size, total, loading, error, daytimes, coupon_stas, send_count, send_success_count} = this.state;
        console.log('******************', coupon_stas)
        return (
            <div>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                {/*<Popup isVisible={popup} onClose={() => this.setState({popup: false})}/>*/}
                <Form inline style={{padding: 3, marginTop: 10}}>
                    <FormGroup bsSize="small" controlId="days">
                        <Row style={{marginTop: 5}}>
                            <Col sm={3}>
                                <ControlLabel>时间</ControlLabel>
                            </Col>
                            <Col sm={7}>
                                <DatePicker id="datepicker_s" value={daytimes}
                                            onChange={(e, f_e) => this.setState({
                                                daytimes: e,
                                                start_time: f_e
                                            }, this.onLoad)}/>
                            </Col>
                        </Row>
                    </FormGroup>
                </Form>
                <h4><span>应发送优惠券数量:{send_count} 实际发送优惠券数量:{send_success_count}</span></h4>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>uid</th>
                        <th>电话</th>
                        <th>购买课程</th>
                        <th>购买金额</th>
                        <th>购买时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coupon_stas.map((info, index) => {
                        console.log('******************', info)
                        return (
                            <tr key={index}>
                                <td>{info.uid}</td>
                                <td>{info.phone}</td>
                                <td>{info.course_name}</td>
                                <td>{info.amount}</td>
                                <td>{info.time_paid}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                <ThePagination page={page} size={size} total={total}
                               onSelect={page => this.setState({page}, this.onLoad)}/>
            </div>
        )
    }
}