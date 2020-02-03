/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/2 下午4:10
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import * as selectors from "../reducers/selectors";
import {connect} from "react-redux";
import UserDetail from "./UserDetail";

@connect(state => ({user: selectors.userSelector(state)}))
export default class Index extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired
    };

    render() {
        const {user} = this.props;
        return (
            <div>
                <h3>当前登录用户:</h3>
                <UserDetail user={user}/>
            </div>
        )
    }
}
