/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/18 下午6:04
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap'

export class Operation extends Component {
    static propTypes = {
        operations: PropTypes.arrayOf(PropTypes.string).isRequired
    };

    render() {
        const {operations} = this.props;
        return (
            <div>
                {
                    operations.map((operation, index) => {
                        return (
                            <Button key={index}>{operation}</Button>
                        )
                    })
                }
            </div>
        );
    }
}
