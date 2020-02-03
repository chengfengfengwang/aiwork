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
    Button,
    Modal,
    ControlLabel,
    FormControl,
    FormGroup,
    InputGroup,
    Col,
    Row,
    Checkbox
} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";
import CourseChooseId from "./CourseChooseId";

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.onLabelTwoChanged = this.onLabelTwoChanged.bind(this);
        this.onLabelOneChanged = this.onLabelOneChanged.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            loading: false,
            error: false,
            name: '',
            describe: '',
            coupon_value: 0,
            coupon_type: 0, //0是减免优惠券，1是打折券
            send_condition: 0,
            condition_value: -1,
            limit_money: 1000,
            start_time: "",
            end_time: "",
            start_time_value: new Date().toISOString(),
            end_time_value: new Date().toISOString(),
            state: 0,
            instrument_type: -1,
            label_one: [],
            label_two: [],
            ids: [],
            style: 0,
            receive_tags: 0,
            send_count: -1,
            is_open: '1',
            reminder: '',
            tags_ids: null,
            seconds: 3,
            push_tag: 'not_at_all',
            show_course: false
        }
    }

    onLabelOneChanged(e) {
        const {label_one} = this.state;
        var index = label_one.indexOf(e.value);
        if (e.checked && index < 0) {
            label_one.push(e.value);
        } else if (!e.checked && index >= 0) {
            label_one.splice(index, 1);
        }
        this.setState({label_one: label_one})
    }

    onLabelTwoChanged(e) {
        const {label_two} = this.state;
        var index = label_two.indexOf(e.value);
        if (e.checked && index < 0) {
            label_two.push(e.value);
        } else if (!e.checked && index >= 0) {
            label_two.splice(index, 1);
        }
        this.setState({label_two: label_two})
    }

    onAddChoose(item) {
        const {items, cur_duration_day} = this.state;
        this.setState({show_course: false});
        items.push({
            'course_id': item.id,
            'title': item.name,
            'create_time': item.createdAt,
            'duration_day': cur_duration_day
        });
        this.setState({items: items});
    }

    onSubmit() {
        const {
            name, describe, coupon_value, coupon_type, send_condition, condition_value, limit_money, start_time, end_time, state, instrument_type
            , label_one, label_two, ids, style, is_open, reminder, receive_tags, tags_ids, seconds, push_tag
        } = this.state;
        const {onClose} = this.props;
        this.setState({
            loading: true,
            error: null
        })
        api.createCoupon(name, describe, coupon_value, coupon_type, send_condition, condition_value, limit_money, start_time, end_time, state, instrument_type, label_one, label_two, ids, style, is_open, reminder, receive_tags, tags_ids, seconds, push_tag)
            .then(json => this.setState({
                loading: false,
            }, onClose()))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    onOpenChooseWin() {
        // 打开不同选择框
        const {choose_rec_type} = this.state;
        if (choose_rec_type === 'course') {
            this.setState({show_course: true})
        }
    }

    render() {
        const {coupons, index, isVisible, onClose} = this.props;
        const {loading, error, name, describe, coupon_value, coupon_type, send_condition, show_course, condition_value, limit_money, start_time, end_time, start_time_value, end_time_value, state, instrument_type, label_one, label_two, ids, style, receive_tags, send_count, is_open, tags_ids, seconds, push_tag} = this.state;
        const onLabelTwoChanged = this.onLabelTwoChanged;
        const onLabelOneChanged = this.onLabelOneChanged;
        const onSubmit = this.onSubmit;
        return (
            <Modal.Dialog style={{display: isVisible ? 'block' : 'none'}}>
                <Modal.Header>
                    <Modal.Title>
                        <label>新建</label>
                        <Button
                            style={{float: "right"}}
                            onClick={onClose}
                        >
                            关闭
                        </Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        <Form horizontal>
                            <Waiting isVisible={loading}/>
                            <Error2 error={error} onOk={() => this.setState({error: null})}/>
                            <CourseChooseId show={show_course} onHide={() => this.setState({show_course: false})}
                                            onOk={item => {
                                                this.onAddChoose(item, 'course');
                                            }}/>
                            <FormGroup
                                style={{margin: 3}}
                                controlId="formBasicText">
                                <Row>
                                    <Col sm={2}><ControlLabel>名称</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            value={name}
                                            placeholder="请输入优惠券名称"
                                            onChange={(e) => this.setState({
                                                name: e.target.value
                                            })}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>介绍</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            placeholder="请输入优惠券介绍"
                                            onChange={(e) => this.setState({
                                                describe: e.target.value
                                            })}
                                        />
                                    </Col>
                                </Row>
                                {/*<Row style={{marginTop: 5}}>*/}
                                {/*<Col sm={2}><ControlLabel>推送标签</ControlLabel></Col>*/}
                                {/*<Col sm={8}>*/}
                                {/*<FormControl*/}
                                {/*type="text"*/}
                                {/*placeholder="请输入推送标签"*/}
                                {/*onChange={(e) => this.setState({*/}
                                {/*push_tag: e.target.value*/}
                                {/*})}*/}
                                {/*/>*/}
                                {/*</Col>*/}
                                {/*</Row>*/}
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>提醒</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            placeholder="请输入优惠券提醒"
                                            onChange={(e) => this.setState({
                                                reminder: e.target.value
                                            })}
                                        />
                                    </Col>
                                </Row>

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}>金额</Col>
                                    <Col sm={4}>
                                        <FormControl type="text"
                                                     onChange={(e) => this.setState({coupon_value: e.target.value})}/>
                                    </Col>

                                    <Col sm={2}>限制使用金额</Col>
                                    <Col sm={4}>
                                        <FormControl type="text"
                                                     onChange={(e) => this.setState({limit_money: e.target.value}, console.log('-------', limit_money))}/>
                                    </Col>

                                </Row>

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}>
                                        <ControlLabel>开始时间</ControlLabel>
                                    </Col>
                                    <Col sm={4}>
                                        <DatePicker id="datepicker_s" value={start_time_value}
                                                    onChange={(e, f_e) => this.setState({
                                                        start_time_value: e,
                                                        start_time: f_e
                                                    })}/>
                                    </Col>
                                    <Col sm={2}>
                                        <ControlLabel>结束时间</ControlLabel>
                                    </Col>
                                    <Col sm={4}>
                                        <DatePicker id="datepicker_e" value={end_time_value}
                                                    onChange={(e, f_e) => this.setState({
                                                        end_time_value: e,
                                                        end_time: f_e
                                                    })}/>
                                    </Col>
                                </Row>

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}>发放条件</Col>
                                    <Col sm={4}>
                                        <FormControl
                                            componentClass="select"
                                            onChange={(e) => this.setState({
                                                send_condition: e.target.value
                                            })}>
                                            <option value='0'>手动</option>
                                            <option value='1'>注册即送</option>
                                            <option value='2'>毕业即送</option>
                                            <option value='3'>练习时长</option>
                                            <option value='4'>弹奏结算</option>
                                            <option value='5'>必修课升级</option>
                                            <option value='6'>支付未成功</option>
                                            <option value='7'>手动下发N天有效</option>
                                        </FormControl>
                                    </Col>
                                    {(function (t) {
                                        if (['3', '4', '5'].indexOf(send_condition) >= 0) {
                                            return (
                                                <div>
                                                    <Col sm={2}>发放条件值</Col>
                                                    <Col sm={4}>
                                                        <FormControl type="text"
                                                                     onChange={e => t.setState({condition_value: e.target.value})}/>
                                                    </Col>
                                                </div>
                                            )
                                        }
                                    })(this)}
                                </Row>

                                {/*<Row style={{marginTop: 5}}>*/}
                                {/*<Col sm={2}>是否开启</Col>*/}
                                {/*<Col sm={2}>*/}
                                {/*<FormControl*/}
                                {/*componentClass="select"*/}
                                {/*onChange={(e) => this.setState({is_open: e.target.value}, console.log('+++++++++++', is_open))}>*/}
                                {/*<option value='1'>开启</option>*/}
                                {/*<option value='0'>关闭</option>*/}
                                {/*</FormControl>*/}
                                {/*</Col>*/}
                                {/*</Row>*/}

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}>乐器类型</Col>
                                    <Col sm={4}>
                                        <FormControl
                                            componentClass="select"
                                            onChange={(e) => this.setState({instrument_type: e.target.value})}>
                                            <option value="-1">不区分类型</option>
                                            <option value="0">吉他</option>
                                            <option value="1">尤克里里</option>
                                            <option value="2">卡林巴</option>
                                            <option value="3">非洲鼓</option>
                                            <option value="4">钢琴</option>
                                            <option value="5">音基</option>
                                            <option value="6">口琴</option>

                                        </FormControl>
                                    </Col>
                                    <Col sm={2}>优惠券类型</Col>
                                    <Col sm={4}>
                                        <FormControl
                                            componentClass="select"
                                            onChange={(e) => this.setState({coupon_type: e.target.value})}>
                                            <option value="0">减免优惠券</option>
                                            <option value="1">打折优惠券</option>
                                        </FormControl>
                                    </Col>
                                </Row>

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}>时效天数</Col>
                                    <Col sm={4}>
                                        <FormControl type="text"
                                                     onChange={(e) => this.setState({seconds: e.target.value})}/>
                                    </Col>
                                </Row>

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}>类型一级标题</Col>
                                    <Col sm={10}>
                                        <FormGroup>
                                            <Checkbox value="0" onChange={e => onLabelOneChanged(e.currentTarget)}
                                                      inline>必修课</Checkbox>
                                            <Checkbox value="1" onChange={e => onLabelOneChanged(e.currentTarget)}
                                                      inline>选修课</Checkbox>
                                            <Checkbox value="2" onChange={e => onLabelOneChanged(e.currentTarget)}
                                                      inline>亲子启蒙</Checkbox>
                                            <Checkbox value="3" onChange={e => onLabelOneChanged(e.currentTarget)}
                                                      inline>曲谱库</Checkbox>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5, display: label_one.indexOf("1") >= 0 ? 'block' : 'none'}}>
                                    <Col sm={2}>类型二级标题</Col>
                                    <Col sm={10}>
                                        <FormGroup
                                        >
                                            <Checkbox value="1" onChange={e => onLabelTwoChanged(e.currentTarget)}
                                                      inline>推荐课程</Checkbox>
                                            <Checkbox value="2" onChange={e => onLabelTwoChanged(e.currentTarget)}
                                                      inline>精品课程</Checkbox>
                                            <Checkbox value="3" onChange={e => onLabelTwoChanged(e.currentTarget)}
                                                      inline>新手巩固</Checkbox>
                                            <Checkbox value="4" onChange={e => onLabelTwoChanged(e.currentTarget)}
                                                      inline>弹唱系列</Checkbox>
                                            <Checkbox value="5" onChange={e => onLabelTwoChanged(e.currentTarget)}
                                                      inline>免费课程</Checkbox>
                                        </FormGroup>
                                    </Col>
                                </Row>
                                {/*<Row>*/}
                                {/*<Col sm={2}>发送对象</Col>*/}
                                {/*<Col sm={4}>*/}
                                {/*<FormControl*/}
                                {/*componentClass="select"*/}
                                {/*onChange={(e) => this.setState({*/}
                                {/*receive_tags: e.target.value*/}
                                {/*})}>*/}
                                {/*<option value='0'>自定义</option>*/}
                                {/*<option value='1'>尤克里里付费</option>*/}
                                {/*<option value='2'>吉他付费</option>*/}
                                {/*<option value='3'>所有付费</option>*/}
                                {/*<option value='4'>未付费用户</option>*/}
                                {/*</FormControl>*/}
                                {/*</Col>*/}
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}>课程商品ID</Col>
                                    <Col sm={8}>
                                        <FormControl type="text"
                                                     onChange={(e) => this.setState({ids: e.target.value})}/>
                                    </Col>
                                    <Col sm={2}>
                                        <Button bsSize="sm" bsStyle="info"
                                                onClick={e => {
                                                    e.preventDefault();
                                                    this.setState({show_course: true})
                                                }}>添加</Button>
                                    </Col>
                                </Row>
                                {/*</Row>*/}
                                <br/>

                                <Button type="submit" bsStyle="success" style={{marginTop: 20}}
                                        style={{left: 15}}
                                        onClick={e => {
                                            e.preventDefault();
                                            onSubmit();
                                        }}>提交</Button>
                            </FormGroup>
                        </Form>
                    }
                </Modal.Body>
            </Modal.Dialog>
        )
    }
}

export default class Coupon extends Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.state = {
            page: 0,
            size: 10,
            total: 0,
            loading: false,
            error: null,
            coupons: [],
            popup: false,
            start_time_value: new Date().toISOString(),
            start_time: "",
            tels: "",
            coupon_id: "",
            tel: '',
            coupon_info: [],
            money: "",
            money_num: []
        }
    }

    componentDidMount() {
        this.onLoad()
    }

    onLoad() {
        const {page, size, total, loading, error, start_time, instype, money, keyword, times} = this.state;

        this.setState({loading: true, error: null})
        api.getCoupons(page, size, start_time, instype, money, keyword, times)
            .then(json => this.setState({
                loading: false,
                coupons: json.data,
                money_num: json.money_num,
                total: json.total
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    onSubmit() {
        const {tels, coupon_id} = this.state;

        this.setState({loading: true, error: null})
        api.sendCoupon(tels, coupon_id)
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
        api.getCouponUserInfo(tel)
            .then(json => this.setState({
                loading: false,
                coupon_info: json.data
            }, console.log('*)))))))))))))))', json)))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    render() {
        const {page, size, total, loading, error, coupons, popup, start_time_value, start_time, tels, coupon_id, tel, coupon_info, instype, money, money_num, keyword, times} = this.state;
        console.log('******************', coupon_info)
        return (
            <div>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Popup isVisible={popup} onClose={() => this.setState({popup: false})}/>
                <Form inline style={{padding: 3}}>
                    <Button bsSize="sm" bsStyle="primary"
                            style={{left: 15, marginRight: 10}}
                            onClick={e => {
                                e.preventDefault();
                                this.setState({
                                    popup: true
                                })
                            }}>新建+</Button>
                    <ControlLabel style={{marginTop: 20, marginLeft: 10}}>手机号（多个请用英文逗号隔开）：</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        placeholder="请输入手机号"
                        onChange={(e) => this.setState({
                            tels: e.target.value
                        })}
                    />
                    <ControlLabel style={{marginTop: 20, marginLeft: 10}}>请输入优惠券id：</ControlLabel>
                    <FormControl
                        placeholder="请输入优惠券id"
                        onChange={(e) => this.setState({
                            coupon_id: e.target.value
                        })}
                    />
                    <Button bsStyle="success" onClick={this.onSubmit}>提交</Button>
                </Form>
                <Form inline style={{padding: 3, marginTop: 10}}>
                    <ControlLabel style={{marginTop: 20, marginLeft: 10}}>查询用户优惠券（手机号）：</ControlLabel>
                    <FormControl
                        placeholder="请输入手机号"
                        onChange={(e) => this.setState({
                            tel: e.target.value
                        })}
                    />
                    <Button bsStyle="success" onClick={this.onSelect}>查询</Button>
                    &nbsp;&nbsp;
                    <FormGroup bsSize="small" controlId="days">
                        <ControlLabel>乐器类型：</ControlLabel>
                        <FormControl componentClass="select" value={instype}
                                     onChange={e => this.setState({instype: e.target.value == "" ? null : e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            <option value="0">吉他</option>
                            <option value="1">尤克里里</option>
                            <option value="2">卡林巴</option>
                            <option value="3">非洲鼓</option>
                            <option value="4">钢琴</option>
                            <option value="5">音基</option>
                            <option value="6">口琴</option>

                        </FormControl>
                    </FormGroup>
                    &nbsp;&nbsp;
                    <FormGroup bsSize="small" controlId="days">
                        <ControlLabel>优惠金额：</ControlLabel>
                        <FormControl componentClass="select" value={money}
                                     onChange={e => this.setState({money: e.target.value == "" ? null : e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            {
                                Object.values(money_num).map((info) => {
                                        return (
                                            <option value={info}>{info}</option>
                                        )
                                    }
                                )
                            }

                        </FormControl>
                    </FormGroup>
                    &nbsp;&nbsp;
                    <ControlLabel>关键字:</ControlLabel>
                    &nbsp;
                    <FormControl
                        bsSize="sm" value={keyword} placeholder="请输入关键字"
                        onChange={e => this.setState({page: 0, keyword: e.target.value.trim()}, this.onLoad)}>
                    </FormControl>
                    &nbsp;&nbsp;
                    <FormGroup bsSize="small" controlId="days">
                        <ControlLabel>优惠券时间：</ControlLabel>
                        <FormControl componentClass="select" value={times}
                                     onChange={e => this.setState({times: e.target.value == "" ? null : e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            <option value="0">未过期</option>
                            <option value="1">已过期</option>
                            <option value="2">长期券</option>
                        </FormControl>
                    </FormGroup>
                </Form>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>名称</th>
                        <th>乐器类型</th>
                        <th>介绍</th>
                        <th>适用课程</th>
                        <th>状态</th>
                        <th>金额</th>
                        <th>到期时间</th>
                        <th>优惠券id</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coupon_info.map((info, index) => {
                        console.log('******************', info)
                        return (
                            <tr key={index}>
                                <td>{info.name}</td>
                                <td>{info.ins}</td>
                                <td>{info.describe}</td>
                                {/*<td>{info.courses_name}</td>*/}
                                <td>{
                                    (function (info) {
                                        if (info.courses_name.length > 40) {
                                            return (
                                                <span>{info.courses_name.substring(0, 40)}<Button
                                                    bsSize="xs" style={{marginLeft: 3}}
                                                    onClick={e => {
                                                        alert(info.courses_name)
                                                    }}
                                                >更多...</Button>
                                            </span>)
                                        }
                                        else {
                                            return (<span>{info.courses_name}</span>)
                                        }
                                    })(info)
                                }</td>
                                <td>{info.state}</td>
                                <td>{(function (info) {
                                    switch (info.coupon_type) {
                                        case 0:
                                            return info.coupon_value;
                                            break;

                                        case 1:
                                            return info.coupon_value / 10 + '折';
                                            break;
                                    }
                                })(info)}
                                </td>
                                <td>{info.end_time}</td>
                                <td>{info.coupon_id}</td>
                            </tr>
                        )
                    })}
                    </tbody>
                </Table>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>ID</th>
                        {/*<th>推送标签</th>*/}
                        <th>名称</th>
                        <th>类型</th>
                        {/*<th>类型二</th>*/}
                        <th>描述</th>
                        <th>对应课程</th>
                        <th>优惠券类型</th>
                        <th>金额</th>
                        <th>有效期</th>
                        <th>发放用户</th>
                        <th>发放条件</th>
                        <th>发放量</th>
                        <th>使用量</th>
                        <th>七天使用量</th>
                    </tr>
                    </thead>
                    <tbody>
                    {coupons.map((info, index) => {
                        return (
                            <tr key={index}>
                                <td>{info.id}</td>
                                {/*<td>{info.push_tag}</td>*/}
                                <td>{info.name}</td>
                                <td>{info.label_one}</td>
                                {/*<td>{info.label_two}</td>*/}
                                <td>{info.describe}</td>
                                <td width="280px">{
                                    (function (info) {
                                        if (info.courses_names.length > 60) {
                                            return (
                                                <span>{info.courses_names.substring(0, 60)}<Button
                                                    bsSize="xs" style={{marginLeft: 3}}
                                                    onClick={e => {
                                                        alert(info.courses_names)
                                                    }}
                                                >更多...</Button>
                                            </span>)
                                        }
                                        else {
                                            return (<span>{info.courses_names}</span>)
                                        }
                                    })(info)
                                }</td>
                                <td>{(function (info) {
                                    switch (info.coupon_type) {
                                        case 0:
                                            return '减免券';
                                            break;

                                        case 1:
                                            return '打折券';
                                            break;
                                    }
                                })(info)}
                                </td>
                                <td>{(function (info) {
                                    switch (info.coupon_type) {
                                        case 0:
                                            return info.coupon_value;
                                            break;

                                        case 1:
                                            return info.coupon_value / 10 + '折';
                                            break;
                                    }
                                })(info)}
                                </td>
                                <td>{info.end_time}</td>
                                <td>{info.receive_tags}</td>
                                <td>{
                                    (function (info) {
                                        switch (info.send_condition) {
                                            case 0:
                                                return '手动';
                                                break;

                                            case 1:
                                                return '注册即送';
                                                break;

                                            case 2:
                                                return '毕业即送';
                                                break;

                                            case 3:
                                                return '练习时长';
                                                break;

                                            case 4:
                                                return '弹奏结算';
                                                break;

                                            case 5:
                                                return '必修课升级';
                                                break;

                                            case 6:
                                                return '支付未成功';
                                                break;

                                            case 7:
                                                return '长期券,下发后' + info.seconds / (3600 * 24) + '天失效';
                                                break;

                                            default:
                                                return '未知,下发后' + info.seconds / (3600 * 24) + '天失效';
                                        }
                                    })(info)
                                }</td>
                                <td>{info.total_count}</td>
                                <td>{info.total_used_count}</td>
                                <td>
                                    {info.coupon_user_used.map((info1, index) => {
                                        return (<div>{info1 === null ? 0 : info1}</div>)
                                    })}
                                </td>
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