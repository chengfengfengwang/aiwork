/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/15 下午4:01
 */

import React from "react";
import {Button, Col, ControlLabel, Form, FormControl, FormGroup, Modal, Row, Table} from "react-bootstrap";
import {connect} from "react-redux";
import Waiting from "./Waiting";
import * as api from "../api";
import Error2 from "./Error2";
import moment from "moment";
import * as actions from "../actions";
import ThePagination from "./Pagination";
import ConfirmationOld from "./ConfirmationOld"

class Editing extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            purchase: null
        }
    }

    onChange(key, value) {
        const {purchase} = this.state;
        purchase[key] = value;
        this.forceUpdate();
    }

    componentWillReceiveProps(props) {
        this.setState({purchase: props.purchase})
    }

    increase(key, value) {
        const {purchase} = this.state;
        purchase[key] = value + 86400;
        this.forceUpdate();
    }

    decrease(key, value) {
        const {purchase} = this.state;
        purchase[key] = value - 86400;
        this.forceUpdate();
    }

    increasem(key, value) {
        const {purchase} = this.state;
        purchase[key] = value + 2592000;
        this.forceUpdate();
    }

    decreasem(key, value) {
        const {purchase} = this.state;
        purchase[key] = value - 2592000;
        this.forceUpdate();
    }

    increasey(key, value) {
        const {purchase} = this.state;
        purchase[key] = value + 31536000;
        this.forceUpdate();
    }

    decreasey(key, value) {
        const {purchase} = this.state;
        purchase[key] = value - 31536000;
        this.forceUpdate();
    }

    render() {
        const {isVisible, onOk, onCancel} = this.props;
        const {purchase} = this.state;
        return (
            <Modal.Dialog style={{display: isVisible ? 'block' : 'none'}}>
                <Modal.Header>
                    <Modal.Title>编辑</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        purchase ?
                            <Form horizontal>
                                <FormGroup>
                                    <Col sm={2}>
                                        <ControlLabel>渠道</ControlLabel>
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl
                                            value={purchase.remark}
                                            onChange={e => this.onChange('remark', e.target.value)}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={2}>
                                        <ControlLabel>激活时间</ControlLabel>
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl
                                            value={moment.unix(purchase.paidAt).locale('zh_CN').format('LLLLss秒')}
                                            // value={purchase.paidAt}
                                            onChange={e => this.onChange('paidAt', e.target.value)}/>
                                        <Button onClick={() => this.increase('paidAt', purchase.paidAt)}>加一天</Button>
                                        <Button onClick={() => this.decrease('paidAt', purchase.paidAt)}>减一天</Button>
                                        <Button onClick={() => this.increasem('paidAt', purchase.paidAt)}>加一月</Button>
                                        <Button onClick={() => this.decreasem('paidAt', purchase.paidAt)}>减一月</Button>
                                        <Button onClick={() => this.increasey('paidAt', purchase.paidAt)}>加一年</Button>
                                        <Button onClick={() => this.decreasey('paidAt', purchase.paidAt)}>减一年</Button>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={2}>
                                        <ControlLabel>延长时间</ControlLabel>
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl
                                            value={moment.unix(purchase.expirationTime).locale('zh_CN').format('LLLLss秒')}
                                            onChange={e => this.onChange('expirationTime', e.target.value)}/>
                                        <Button
                                            onClick={() => this.increase('expirationTime', purchase.expirationTime)}>加一天</Button>
                                        <Button
                                            onClick={() => this.decrease('expirationTime', purchase.expirationTime)}>减一天</Button>
                                        <Button
                                            onClick={() => this.increasem('expirationTime', purchase.expirationTime)}>加一月</Button>
                                        <Button
                                            onClick={() => this.decreasem('expirationTime', purchase.expirationTime)}>减一月</Button>
                                        <Button
                                            onClick={() => this.increasey('expirationTime', purchase.expirationTime)}>加一年</Button>
                                        <Button
                                            onClick={() => this.decreasey('expirationTime', purchase.expirationTime)}>减一年</Button>
                                    </Col>
                                </FormGroup>
                            </Form> : null
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => onOk(purchase)} bsStyle="primary">确定</Button>
                    <Button onClick={() => onCancel()}>取消</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}

export default class QuestionActive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            phone: "",
            goodsIds: "",
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
        api.getQuestionPurchases({page, phone})
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
        api.updateQuestionPurchase(id, purchase)
            .then(json => this.onQuery(query_phone))
            .catch(error => this.setState({error}))
    }

    onActive() {
        const {phone, goodsIds} = this.state;
        this.setState({loading: true});
        api.activeQuestion(phone, goodsIds)
            .then(json => this.onQuery())
            .catch(error => this.setState({loading: false, error}))
    }

    onDeactive(userId, goodsId) {
        const {query_phone} = this.state;
        api.deactiveQuestion(userId, goodsId)
            .then(json => this.onQuery(query_phone))
            .catch(error => this.setState({loading: false, error}))
    }

    componentDidMount() {
        this.onQuery();
    }


    render() {
        const {phone, goodsIds, purchases, loading, error, page, total, editing, activeIndex, choiceActive, query_phone} = this.state;
        return (
            <div>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <ConfirmationOld
                    isVisible={choiceActive}
                    onCancel={() => this.setState({choiceActive: false})}
                    onOk={() => this.setState({choiceActive: false}, () => this.onDeactive(purchases[activeIndex].userId, purchases[activeIndex].goodsId))}
                    message='确认取消激活？'
                />
                <Editing
                    isVisible={editing}
                    purchase={purchases[activeIndex]}
                    onCancel={() => this.setState({editing: false})}
                    onOk={purchase => this.setState({editing: false}, () => this.onUpdatePurchase(purchases[activeIndex].id, purchase))}
                />
                <Row>
                    <Col sm={8}>
                        <Form inline style={{padding: 3}}>
                            <FormControl bsSize="sm" placeholder="请输入用户手机号" value={phone} onChange={e => {
                                this.setState({phone: e.target.value.trim()})
                            }}/>
                            &nbsp;
                            <FormControl bsSize="sm" placeholder="激活逗号分隔的课程id"
                                         style={{width: '300px', border: 'solid 1px red'}} value={goodsIds}
                                         onChange={e => {
                                             this.setState({goodsIds: e.target.value.trim()})
                                         }}/>
                            <Button
                                onClick={(e) => {
                                    e.preventDefault();
                                    this.onActive(true, true)
                                }}
                                bsSize="sm" bsStyle="danger">执行红框</Button>

                        </Form>

                        <a href="http://admin.iguitar.immusician.com/member/list?bundle=com.immusician.music"
                           target="_blank">所有用户列表</a>

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
                        <th>用户: [昵称]</th>
                        <th>UID</th>
                        <th>设备</th>
                        <th>课程</th>
                        <th>激活时间</th>
                        <th>渠道</th>
                        <th>操作</th>
                        <th>到期时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        purchases.map((purchase, index) => {
                            return (
                                <tr key={index}>
                                    <td>{purchase.phone ? `${purchase.phone}: [${purchase.nickname}]` : 'NULL'}</td>
                                    <td>{purchase.userId ? purchase.userId : 'NULL'}</td>
                                    <td>{purchase.device ? purchase.device : 'NULL'}</td>
                                    <td>{purchase.goodsName ? purchase.goodsName : 'NULL'}</td>
                                    <td>{moment.unix(purchase.paidAt).locale('zh_CN').format('LLLL')}</td>
                                    <td>{purchase.remark}</td>
                                    <td>
                                        <Button
                                            bsSize="sm"
                                            bsStyle="warning"
                                            onClick={() => this.setState({
                                                activeIndex: index,
                                                choiceActive: true
                                            })}
                                            //         onClick={() => onUnactive({purchase.userId, purchase.course.id})}
                                        >取消激活</Button>
                                        &nbsp;
                                        <Button
                                            bsSize="sm"
                                            bsStyle="primary"
                                            onClick={() => this.setState({
                                                editing: true,
                                                activeIndex: index
                                            })}>编辑</Button>
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
