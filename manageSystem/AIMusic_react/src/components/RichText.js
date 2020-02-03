/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/14 上午11:56
 */

import React, {Component} from "react";
import Quill from "react-quill";
import "react-quill/dist/quill.bubble.css";

export default class RichText extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: ''
        }
    }

    render() {
        const {text} = this.state;
        return (
            <div>
                <Quill value={text} onChange={content => this.setState({text: content})}/>
            </div>
        )
    }
}
