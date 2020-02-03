/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/13 下午6:19
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import * as actions from '../actions/index'
import Text from "./Text";

@connect(x => x, {
    onInc: () => actions.toInc(1),
    onDec: () => actions.toDec(1)
})
export default class Counter extends Component {
    static propTypes = {
        count: PropTypes.number.isRequired,
        onInc: PropTypes.func.isRequired,
        onDec: PropTypes.func.isRequired
    };

    render() {
        const {count, onInc, onDec} = this.props;
        return (
            <div className="App">
                <button onClick={onDec}>-</button>
                <Text text={count}/>
                <button onClick={onInc}>+</button>
            </div>
        );
    }
}
