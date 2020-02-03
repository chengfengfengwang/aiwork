/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/15 下午4:36
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, ControlLabel, Form, FormGroup, Row, Tab, Tabs} from "react-bootstrap";
import {connect} from "react-redux";
import QRCode from "qrcode.react";
import * as actions from "../actions";
import config from "../config/index";
import "./Login.css";

const key = Math.random().toString().substring(2, 12);

@connect(state => ({
    rapidLoginKey: key
}), {
    onLogin: (username, password) => actions.login(username, password),
    getVerify: (phone) => actions.getVerify(phone),
    onVerify: (phone, verify) => actions.onVerify(phone, verify),
    // onWaitForRapidLogin: (key) => actions.waitForRapidLogin(key)
})
export default class Login extends Component {
    static propTypes = {
        onLogin: PropTypes.func.isRequired,
        rapidLoginKey: PropTypes.string.isRequired,
        // onWaitForRapidLogin: PropTypes.func.isRequired,
        getVerify: PropTypes.func.isRequired,
        onVerify: PropTypes.func.isRequired,
    };

    componentDidMount() {
        // const {rapidLoginKey, onWaitForRapidLogin} = this.props;
        // onWaitForRapidLogin(rapidLoginKey);
    }

    render() {
        const {onLogin, rapidLoginKey, getVerify, onVerify} = this.props;
        return (
            <div className="container" style={{marginTop: 20, marginBottom: 20}}>
                <Row style={{marginTop: 100}}>
                    <Col sm={6} mdPush={3}>
                        <h4>登录</h4>
                        <hr/>
                        <Tabs defaultActiveKey={1} id="login_tabs">
                            <Tab eventKey={1} title="帐号密码登录">
                                <Form horizontal className="login-tab-content">
                                    <FormGroup controlId="username">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            用户名
                                        </Col>
                                        <Col sm={10}>
                                            <input className="form-control" type="text" ref='username'/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId='password'>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            密码
                                        </Col>
                                        <Col sm={10}>
                                            <input className="form-control" type="password" ref='password'/>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col smOffset={2} sm={10}>
                                            <Button
                                                type="submit"
                                                bsStyle="success"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const username = this.refs.username.value.trim();
                                                    const password = this.refs.password.value.trim();
                                                    onLogin(username, password);
                                                }}
                                            >
                                                登录
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Tab>
                                                <Tab eventKey={2} title="验证码登录">
                                <Form horizontal className="login-tab-content">
                                    <FormGroup controlId="phone">
                                        <Col componentClass={ControlLabel} sm={2}>
                                            手机号
                                        </Col>
                                        <Col sm={10}>
                                            <input className="form-control" type="text" ref='phone'/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup controlId='verify'>
                                        <Col componentClass={ControlLabel} sm={2}>
                                            验证码
                                        </Col>
                                        <Col sm={7}>
                                            <input className="form-control" type="text" ref='verify'/>
                                        </Col>
                                        <Col sm={3}>
                                            <Button
                                                type='button'
                                                bsStyle='success'
                                                ref='verbtn'
                                                style={{display: 'block'}}
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const phone = this.refs.phone.value.trim();
                                                    getVerify(phone);
                                                }}>
                                                获取验证码
                                            </Button>
                                        </Col>
                                    </FormGroup>

                                    <FormGroup>
                                        <Col smOffset={2} sm={10}>
                                            <Button
                                                type="submit"
                                                bsStyle="success"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    const phone = this.refs.phone.value.trim();
                                                    const verify = Number(this.refs.verify.value.trim());
                                                    onVerify(phone, verify);
                                                }}
                                            >
                                                登录
                                            </Button>
                                        </Col>
                                    </FormGroup>
                                </Form>
                            </Tab>

                            <Tab eventKey={3} title="二维码登录">
                                <div className="login-tab-content" style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyItems: 'center'
                                }}>
                                    {/*<h4>作弊二维码</h4>*/}
                                    {/*<QRCode*/}
                                        {/*size={256}*/}
                                        {/*value={`${config.apiBaseUrl}/account/rapid_login/confirm/${rapidLoginKey}?god=teacher`}*/}
                                        {/*className="login-tab-content"*/}
                                    {/*/>*/}
                                    {/*<hr/>*/}
                                    <h4>真二维码</h4>
                                    <QRCode
                                        size={256}
                                        value={`${config.apiBaseUrl}/account/rapid_login/confirm/${rapidLoginKey}`}
                                        className="login-tab-content"
                                    />
                                    <hr/>
                                </div>
                            </Tab>
                        </Tabs>
                    </Col>
                </Row>
            </div>
        );
    }
}
