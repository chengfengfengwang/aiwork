import React, {Component} from "react";
import {Button, FormControl, FormGroup, Form, ControlLabel, Row, Col} from "react-bootstrap";
import Waiting from "./Waiting";
import Error2 from "./Error2";
import * as api from "../api";

export default class MessagePush extends Component {

    constructor(props) {
        super(props);
        this.onPushMessage = this.onPushMessage.bind(this);
        this.state = {
            loading: false,
            error: false,
            tagtype: '0',
            content: '',
            link: '',
            from: '',
            title: '',
            linktype: '-1',
            instrument_type: "-1",
            course_ids: "",
            tels: "",
            s_time: null,
            e_time: null
        }
    }

    getValidationState() {
        const length = this.state.content.length;
        if (length > 50) return 'error';
    }

    onPushMessage() {
        const {tagtype, content, link, from, title, linktype, instrument_type, course_ids, tels, s_time, e_time} = this.state;
        this.setState({
            error: false,
            loading: true
        });
        if (!content) {
            this.setState({
                error: "推送内容不能为空",
                loading: false
            })
            return
        }
        api.onPushMessage({tagType: tagtype, content, link, from, title, linktype, instrument_type, course_ids, tels, s_time, e_time})
            .then(json => this.setState({
                loading: false
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    render() {

        const {loading, error, tagtype, content, link, title, linktype, instrument_type, course_ids, tels, s_time, e_time} = this.state;
        return (

            <div style={{margin: 100}}>
                <div >
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                    <form>
                    <FormGroup
                        controlId="formBasicText"
                        validationState={this.getValidationState()}
                    >
                    <ControlLabel>推送对象</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={(e) => this.setState({
                            tagtype: e.target.value
                        })} >
                        <option value='0'>所有</option>
                        <option value='1'>尤克里里付费</option>
                        <option value='2'>吉他付费</option>
                        <option value='3'>所有付费</option>
                        <option value='4'>未付费用户</option>
                        <option value='5'>选定课程激活用户</option>
                        <option value='6'>选定课程未激活用户</option>
                        {(function () {
                            if (linktype === '6') {
                               return (
                                <option value='7'>指定用户</option>
                                )
                            }}
                            )()}
                        <option value='8'>注册时间</option>
                        <option value='9'>选定商品</option>
                        <option value='20'>大向舒淇中级</option>
                        {/*<option value='23'>2018-01</option>*/}
                        {/*<option value='22'>2018-02</option>*/}
                        {/*<option value='21'>2018-03</option>*/}
                        {/*<option value='24'>桃子鱼仔</option>*/}
                        {/*<option value='25'>2018-01毕业</option>*/}
                        {/*<option value='26'>2018-02毕业</option>*/}
                        {/*<option value='27'>2018-03毕业</option>*/}
                        {/*<option value='28'>2018-01情人节</option>*/}
                        {/*<option value='29'>2018-02情人节</option>*/}
                        {/*<option value='30'>2018-03情人节</option>*/}
                        {/*<option value='31'>2017-08</option>*/}
                        {/*<option value='32'>2017-09</option>*/}
                        {/*<option value='33'>2017-10</option>*/}
                        {/*<option value='34'>2017-11</option>*/}
                        {/*<option value='35'>2017-12</option>*/}
                        {/*<option value='36'>2018-04情人节</option>*/}
                        <option value='40'>古诗词弹唱</option>
                        <option value='41'>520活动</option>
                        <option value='42'>上新课通知</option>
                        <option value='43'>24课优惠券</option>
                        <option value='44'>吉他24课</option>
                        <option value='45'>24课优惠券(4-6)</option>
                        <option value='45'>24课优惠券(4-6)</option>
                        <option value='46'>老王优惠券</option>
                        {/*<option value='47'>19.9体验课测试</option>*/}
                        {/*<option value='48'>19.9体验课</option>*/}
                        {/*<option value='49'>挑战赛不符合规定</option>*/}
                        {/*<option value='50'>挑战赛1、2名</option>*/}
                        {/*<option value='51'>挑战赛其它</option>*/}
                        <option value='52'>大向舒淇中级N7吉他</option>
                        <option value='53'>19-4-12发送钢琴优惠券</option>
                        <option value='54'>19年1月到2月发送钢琴优惠券</option>
                        <option value='55'>非洲鼓亲子用户发送钢琴优惠券</option>
                        <option value='56'>07_16购买尤克里里亲子课程</option>
                        <option value='303'>19_07_18新生注册优惠券</option>

                        <option value='10'>测试</option>
                    </FormControl>
                    {(function (t) {
                        if (tagtype === "5" || tagtype === "6") {
                            return (
                                <div style={{marginTop: 10}}>
                                <Row>
                                    <Col sm={4}>选定课程ids(多个id用英文逗号隔开)</Col>
                                    <Col sm={6}>
                                        <FormControl
                                            type="text"
                                            placeholder="请输入课程ids"
                                            onChange={(e) => t.setState({
                                                course_ids: e.target.value
                                            })}/>
                                    </Col>
                                </Row>
                                </div>
                            )
                        }
                    })(this)}
                    {(function (t) {
                        if (tagtype === "8") {
                            return (
                                <div style={{marginTop: 10}}>
                                <Row>
                                    <Col sm={2}>开始时间戳</Col>
                                    <Col sm={4}>
                                        <FormControl
                                            type="text"
                                            placeholder="请输入开始时间戳"
                                            onChange={(e) => t.setState({
                                                s_time: e.target.value
                                            })}/>
                                    </Col>
                                    <Col sm={2}>结束时间戳</Col>
                                    <Col sm={4}>
                                        <FormControl
                                            type="text"
                                            placeholder="请输入结束时间戳"
                                            onChange={(e) => t.setState({
                                                e_time: e.target.value
                                            })}/>
                                    </Col>
                                </Row>
                                </div>
                            )
                        }
                    })(this)}
                    {(function (t) {
                        if (tagtype === "7") {
                            return (
                                <div style={{marginTop: 10}}>
                                    <Row>
                                    <Col sm={4}>选定用户手机号(多个手机号用英文逗号隔开)</Col>
                                    <Col sm={6}>
                                        <FormControl
                                            type="text"
                                            placeholder="请输入用户手机号"
                                            onChange={(e) => t.setState({
                                                tels: e.target.value
                                            }, console.log('-----', tels))}/>
                                    </Col>
                                    </Row>
                                </div>
                            )
                        }
                    })(this)}
                    <ControlLabel style={{marginTop: 20}}>推送标题</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        placeholder="请输入文字"
                            onChange={(e) => this.setState({
                                title: e.target.value
                            })}
                        />

                        <ControlLabel style={{marginTop: 20}}>推送内容</ControlLabel>
                    <FormControl
                        componentClass="textarea"
                        placeholder="请输入文字"
                            onChange={(e) => this.setState({
                                content: e.target.value
                            })}
                        />

                    <ControlLabel style={{marginTop: 20}}>链接地址</ControlLabel>

                    <FormControl
                        type="text"
                            placeholder="请输入链接地址"
                                onChange={(e) => this.setState({
                                    link: e.target.value
                                })}>

                    </FormControl>
                    <ControlLabel>链接类型</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={(e) => this.setState({
                            linktype: e.target.value
                        })} >
                        <option value='-1'>无跳转</option>
                        <option value='0'>必修</option>
                        <option value='1'>亲子</option>
                        <option value='2'>选修</option>
                        <option value='3'>曲谱</option>
                        <option value='4'>网页</option>
                        <option value='5'>支付</option>
                        <option value='6'>优惠券</option>
                    </FormControl>
                    <ControlLabel>链接类型</ControlLabel>
                    <FormControl
                        componentClass="select"
                        onChange={(e) => this.setState({
                        instrument_type: e.target.value
                    })} >
                        <option value='-1'>无跳转乐器类型</option>
                        <option value='0'>吉他</option>
                        <option value='1'>尤克里里</option>
                        <option value='2'>卡林巴</option>
                        <option value='3'>非洲鼓</option>
                        <option value='4'>钢琴</option>
                        <option value='5'>音基</option>
                        <option value="6">口琴</option>

                    </FormControl>

                    <ControlLabel style={{marginTop: 20}}>发送人</ControlLabel>

                    <FormControl
                        type="text"
                            placeholder="请输入发送者uid, 默认10001"
                                onChange={(e) => this.setState({
                                    from: e.target.value
                                })}>

                    </FormControl>

                    </FormGroup>
                    </form>
                            </div> <div>
                        <Button
                            bsSize="large"
                            type="submit" bsStyle="success"
                            style={{borderRadius: 20}}
                            onClick={(e) => {
                                e.preventDefault();
                                this.onPushMessage();
                            }}>
                            确认推送
                        </Button>
                    </div>
            </div>
        )
    }
}