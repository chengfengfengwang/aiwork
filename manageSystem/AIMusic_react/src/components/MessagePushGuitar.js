import React, {Component} from "react";
import {Button, FormControl, FormGroup, Form, ControlLabel, Row, Col} from "react-bootstrap";
import Waiting from "./Waiting";
import Error2 from "./Error2";
import * as api from "../api";

export default class MessagePushGuitar extends Component {

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
        api.onPushMessageGuitar({tagType: tagtype, content, link, from, title, linktype, instrument_type, course_ids, tels, s_time, e_time})
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
                <h1>爱玩吉他</h1>
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
                        <option value='0'>曲谱</option>
                        <option value='1'>挑战赛</option>
                        <option value='2'>动态</option>
                        <option value='3'>个人页</option>
                        <option value='4'>老师</option>
                        <option value='5'>album</option>
                        <option value='6'>网页</option>
                        <option value='7'>QA</option>
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