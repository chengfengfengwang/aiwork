/**
 * Created by mac on 2017/10/3.
 */
/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/3/15 下午12:34
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import {connect} from "react-redux";
import * as selectors from "../reducers/selectors";
import * as actions from "../actions/index";

@connect((state, props) => ({
    ...props
}))
export default class ConfirmationOld extends Component {
    static propTypes = {
        onOk: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        isVisible: PropTypes.bool.isRequired,
        message: PropTypes.string
    };

    static defaultProps = {
        isVisible: false,
        message: '确认删除？'
    };

    render() {
        const {onOk, onCancel, isVisible, message} = this.props;
        return (
            <Modal.Dialog style={{display: isVisible ? 'block' : 'none'}}>
                <Modal.Header>
                    <Modal.Title>提醒</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    {message}
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={onOk} bsStyle="primary">确定</Button>
                    <Button onClick={onCancel}>取消</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}