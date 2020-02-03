/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/16 下午1:10
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Route} from "react-router";
import {connect} from "react-redux";
import * as selectors from "../reducers/selectors";
import {push} from "react-router-redux";


@connect((state, props) => ({
        isLoggedIn: selectors.onlineSelector(state),
        needAuth: props.path !== '/login'
    })
)
export  default class MyRoute extends Component {
    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    componentWillReceiveProps() {
        const {isLoggedIn, needAuth, path, dispatch} = this.props;
        const {router} = this.context;
        if (needAuth && !isLoggedIn) {
            console.log('redirect...');
            router.history.push(path);
            dispatch(push(path));
        } else {
            console.log('no redirect...');
        }
    }

    render() {
        const {isLoggedIn, component: Component, needAuth, ...rest} = this.props;
        if (needAuth && !isLoggedIn) {
            console.log('redirect...');
            return <div>nologin</div>
        } else {
            console.log('no redirect...');
            return <Route render={(props) => <Component {...props}/>}/>
        }
    }
}
