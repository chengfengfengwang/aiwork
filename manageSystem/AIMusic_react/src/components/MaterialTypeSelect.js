/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/17 下午6:14
 */

import React, {Component}from 'react'
import PropTypes from 'prop-types'
import {FormControl} from 'react-bootstrap'
import * as MaterialsHelper from "../helpers/MaterialsHelper";

export default class MaterialTypeSelect extends Component {
    static propTypes = {
        onSelect: PropTypes.func.isRequired
    };

    render() {
        const {onSelect, ...props} = this.props;
        return (
            <FormControl bsSize="sm" componentClass="select" {...props} onChange={(e) => onSelect(e.target.value)}>
                {
                    Object.entries(MaterialsHelper.materialTypes).map(([k, v]) => (
                        <option key={k} value={k}>{v}</option>
                    ))
                }
            </FormControl>
        )
    }
}

