/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/4/5 下午1:05
 */
import React from "react";
import PropTypes from "prop-types";
import {Button, Modal} from "react-bootstrap";
import _ from "lodash";

export default class Error2 extends React.Component {
    static propTypes = {
        error: PropTypes.any,
        onOk: PropTypes.func.isRequired
    };

    render() {
        const {error, onOk} = this.props;
        return (
            <Modal.Dialog style={{display: error ? 'block' : 'none', zIndex: 2222}}>
                <Modal.Header>
                    <Modal.Title>提示</Modal.Title>
                </Modal.Header>
                <Modal.Body className="text-danger">
                    <h4>出错了！</h4>
                    <p>错误信息：{_.toString(error)}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => onOk()} bsStyle="primary">确定</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}
