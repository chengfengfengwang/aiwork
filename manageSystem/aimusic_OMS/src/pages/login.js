import React from 'react';
import {
    Form, Icon, Input, Button, Checkbox, Spin,
} from 'antd';
import '../config/app_config'
import config from "../config/app_config";
import styles from './login.less'
import {withRouter} from "react-router-dom";


export default class LoginForm extends React.Component {
    main_host = config.debug ? config.test_host : config.main_host;
    handleSubmit = (e) => {
        e.preventDefault();
        var username = this.refs.name.value;
        var password = this.refs.pass.value;
        this.login({username: username, password: password});
    };

    login({username, password}) {
        fetch(this.main_host + '/v3/account/token/',
            {
                method: 'post', body: 'username='+ username + '&password=' + password,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            .then(res => res.json())
            .then(json => {
                if (json.error === 0) {
                    localStorage.setItem("auth_uid", json.data.id);
                    localStorage.setItem("auth_token", json.data.token);
                    localStorage.setItem("auth_nickname", json.data.nickname);
                    this.props.history.push("/dashboard");
                } else {
                    alert(json.message);
                }
            })
    }

    render() {
        localStorage.setItem("auth_token", '');
        let loading = false;
        if (this.props.loginState === "no") {
            loading = false;
        } else if (this.props.loginState === "start") {
            loading = true;
        } else if (this.props.loginState === "success") {
            loading = false;
        } else if (this.props.loginState === "fail") {
            loading = false;
        }

        return <div className={styles.LoginContainer}>
            <section className={styles.container}>
                <Spin spinning={loading}>
                    <h2>运营数据系统</h2>
                    <form onSubmit={this.handleSubmit}>
                        <input className={styles.input} type="text" ref="name" placeholder="请输入用户名"/>
                        <input className={styles.input} type="password" ref="pass" placeholder="请输入密码"/>
                        <button onClick={this.handleSubmit}>登录</button>
                    </form>
                </Spin>
            </section>
        </div>
    }
}