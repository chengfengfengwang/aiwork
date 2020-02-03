/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/16 下午12:43
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from "react-redux";
import {push} from "react-router-redux";

@connect()
export default class Link extends Component {
    static propTypes = {
        to: PropTypes.string.isRequired
    };

    static contextTypes = {
        router: PropTypes.object.isRequired
    };

    render() {
        const {to, dispatch} = this.props;
        const {router} = this.context;
        return (
            <a href={to}
               onClick={(e) => {
                   e.preventDefault();
                   router.history.push(to);
                   dispatch(push(to));
               }}
            >{this.props.children}</a>
        )
    }
}
