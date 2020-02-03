/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/15 下午1:10
 */

import React from "react";
import PropTypes from "prop-types";
import QuillWithUpload from "./QuillWithUpload";
import * as api from "../api";
import Waiting from "./Waiting";

export default class MyQuill extends React.Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: false
        };
        this.onUpload = this.onUpload.bind(this);
    }

    onUpload(file, callback) {
        this.setState({loading: true});
        api.uploadFile(file, () => null)
            .then(url => {
                this.setState({loading: false});
                callback(url);
            })
            .catch(error => this.setState({loading: false, error}))
    }


    render() {
        const {value, onChange} = this.props;
        const {loading} = this.state;
        return (
            <div>
                <Waiting isVisible={loading}/>
                <QuillWithUpload
                    value={value}
                    onUpload={this.onUpload}
                    onChange={onChange}/>
            </div>
        )
    }
}
