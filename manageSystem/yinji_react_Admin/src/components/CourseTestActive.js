/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/15 下午4:01
 */

import React from "react";
import {Button, Col, Form, FormControl, Row, Table} from "react-bootstrap";
import Waiting from "./Waiting";
import * as api from "../api";
import Error2 from "./Error2";
import moment from "moment";
import ThePagination from "./Pagination";
import ConfirmationOld from "./ConfirmationOld"

export default class CourseActive extends React.Component {
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

    onUpdatePurchase(id, purchase) {
        const {query_phone} = this.state;
        this.setState({loading: true});
        api.updateCoursePurchase(id, purchase)
            .then(json => this.onQuery(query_phone))
            .catch(error => this.setState({error}))
    }

    onActive(createUser = false, activeAdvance=false, activePartAdvance=false) {
        const {phone, courseIds} = this.state;
        this.setState({loading: true});
        api.activeTestCourse(phone, createUser, activeAdvance, activePartAdvance, courseIds)
            .then(json => this.onQuery())
            .catch(error => this.setState({loading: false, error}))
    }

    onDeactive(userId, courseId) {
        const {query_phone} = this.state;
        api.deactiveCourse(userId, courseId)
            .then(json => this.onQuery(query_phone))
            .catch(error => this.setState({loading: false, error}))
    }

    onRegister() {
        const {phone} = this.state;
        this.setState({loading: true});
        api.register_ai_user(phone, '123456')
            .then(json => this.setState({loading: false}))
            .catch(error => this.setState({error, loading: false}))
    }

    componentDidMount() {
        this.onQuery();
    }


    render() {
        const {phone, courseIds, purchases, loading, error, page, total, editing, activeIndex, choiceActive, query_phone} = this.state;
        return (
            <div>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <ConfirmationOld
                    isVisible={choiceActive}
                    onCancel={() => this.setState({choiceActive: false})}
                    onOk={() => this.setState({choiceActive: false}, () => this.onDeactive(purchases[activeIndex].userId, purchases[activeIndex].courseId))}
                    message='确认取消激活？'
                />
                <Row>
                    <Col sm={8}>
                        <Form inline style={{padding: 3}}>
                            <FormControl bsSize="sm" placeholder="请输入用户手机号" value={phone} onChange={e => {
                                this.setState({phone: e.target.value.trim()})
                            }}/>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.onActive(true, true)
                                }}
                                bsSize="sm" bsStyle="danger">激活体验</Button>

                        </Form>

                        <a href="http://admin.iguitar.immusician.com/member/list?bundle=com.immusician.music" target="_blank">所有用户列表</a>

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
                        <th>操作</th>
                        <th>到期时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        purchases.map((purchase, index) => {
                            return (
                                <tr key={index}>
                                    <td><a href={`http://aimusic.admin.immusician.com/member/list?t=&do=uid&uid=${purchase.userId}`} target="_blank">{purchase.user ? `${purchase.user.phone}: ${purchase.userId}: [${purchase.user.device_model}]` : 'NULL'}</a></td>
                                    <td>{purchase.course ? purchase.course.name : 'NULL'}</td>
                                    <td>{moment.unix(purchase.paidAt).locale('zh_CN').format('LLLL')}</td>
                                    <td>
                                        {/*<Button*/}
                                            {/*bsSize="sm"*/}
                                            {/*bsStyle="warning"*/}
                                            {/*onClick={() => this.setState({*/}
                                                {/*activeIndex: index,*/}
                                                {/*choiceActive: true*/}
                                            {/*})}*/}
                                            {/*//         onClick={() => onUnactive({purchase.userId, purchase.course.id})}*/}
                                        {/*>取消激活</Button>*/}
                                        {/*&nbsp;*/}
                                    </td>
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
