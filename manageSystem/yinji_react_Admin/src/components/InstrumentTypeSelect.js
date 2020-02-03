/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/18 上午11:51
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {FormControl} from 'react-bootstrap'
import {} from 'react-bootstrap'

export default class InstrumentTypeSelect extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        onSelect: PropTypes.func.isRequired
    };

    render() {
        const {onSelect, ...props} = this.props;
        return (
            <FormControl bsSize="sm" componentClass="select" {...props} onChange={(e) => onSelect(e.target.value)}>
                <option value="music_basis">音基</option>
                <option value='guitar'>吉他</option>
                <option value='ukulele'>尤克里里</option>
                <option value='kalimba'> 卡林巴 </option>
                <option value='djembe'> 非洲鼓</option>
            </FormControl>
        )
    }
}
