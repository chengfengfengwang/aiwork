/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/3/14 下午2:55
 */

import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Modal} from "react-bootstrap";

import * as selectors from "../reducers/selectors";

@connect((state, props) => ({
    isVisible: selectors.waitingSelector(state),
    ...props
}))
export default class Waiting extends React.Component {

    static propTypes = {
        isVisible: PropTypes.bool.isRequired
    };

    render() {
        const {isVisible} = this.props;
        return (
            <Modal.Dialog style={{display: isVisible ? 'block' : 'none', zIndex: 2000}}>
                <Modal.Header>
                    <Modal.Title>提示</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    加载中。。。
                </Modal.Body>
            </Modal.Dialog>
        )
    }
}