/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/15 下午4:01
 */

import React from "react";
import {Button, Col, Form, Row, Table} from "react-bootstrap";
import Waiting from "./Waiting";
import * as api from "../api";
import Error2 from "./Error2";
import moment from "moment";
import ThePagination from "./Pagination";

export default class CourseActiveSingle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            courseIds: "",
            purchases: [],
            loading: false,
            error: null,
            page: 0,
            total: 0,
            editing: false,
            activeIndex: 0,
            choiceActive: false,
            query_phone: null
        }
    }

    onQuery(phone) {
        const {page} = this.state;
        this.setState({loading: true});
        api.getCoursePurchases({page, phone})
            .then(json => this.setState({
                loading: false,
                purchases: json.data,
                error: null,
                page: json.paging.page,
                total: json.paging.total,
                query_phone: phone
            }))
            .catch(error => this.setState({error}))
    }

    componentDidMount() {
        this.onQuery();
    }


    render() {
        const {purchases, loading, error, page, total, query_phone} = this.state;
        return (
            <div>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Row>
                    <Col sm={8}>
                    </Col>
                    <Col sm={4}>
                        <Form className="text-right" inline style={{padding: 3}}>
                            <input type="text" ref="phone" className="form-control input-sm" placeholder="请输入用户手机号"/>
                            &nbsp;
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.onQuery(this.refs.phone.value.trim())
                                }}
                                bsSize="sm" bsStyle="success">搜索</Button>
                            &nbsp;
                        </Form>
                    </Col>
                </Row>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>用户</th>
                        <th>课程</th>
                        <th>激活时间</th>
                        <th>渠道</th>
                        <th>到期时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        purchases.map((purchase, index) => {
                            return (
                                <tr key={index}>
                                    <td>{purchase.user ? `${purchase.user.phone}` : 'NULL'}</td>
                                    <td>{purchase.course ? purchase.course.name : 'NULL'}</td>
                                    <td>{moment.unix(purchase.paidAt).locale('zh_CN').format('LLLL')}</td>
                                    <td>{purchase.remark}</td>
                                    <td>{moment.unix(purchase.expirationTime).locale('zh_CN').format('LLLL')}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>

                <ThePagination
                    page={page} size={10} total={total}
                    onSelect={(page) => this.setState({page}, () => this.onQuery(query_phone))}/>
            </div>
        )
    }
}
