/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/3/20 下午9:17
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import * as iGuitarApi from "../api";
import ProgressBar from "react-bootstrap/lib/ProgressBar";
import Popover from "react-bootstrap/lib/Popover";
import OverlayTrigger from "react-bootstrap/lib/OverlayTrigger";
import compressedFileIcon from "./compressed.jpeg";

const popoverBottom = (text) => (
    <Popover
        id="popover-positioned-bottom"
        title="地址"
    >
        <span style={{wordWrap: 'break-word'}}>{text}</span>
    </Popover>
);

export default class Upload extends Component {
    static propTypes =
        {
            url: PropTypes.string,
            type: PropTypes.string,
            onSuccess: PropTypes.func.isRequired,
            onUpload: PropTypes.func
        };

    static defaultProps = {
        type: 'image',
        url: null,
        onUpload: () => null
    };


    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            error: null
        };

    }

    onDrop = e => {
        const {onUpload, onSuccess} = this.props;
        onUpload();
        e.preventDefault();
        iGuitarApi
            .uploadFile((e.dataTransfer || e.target).files[0], progress => {
                this.setState({progress: progress});
            })
            .then(url => {
                this.setState({error: null});
                onSuccess(url);
            })
            .catch(error => {
                this.setState({error: error});
            })
    };


    getPreviewView() {
        let style = {
            maxWidth: 180,
            maxHeight: 200,
            margin: 'auto'
        };
        let view;
        const {url, type} = this.props;
        switch (type) {
            case 'image':
                view =
                    <img src={url} alt="<图片>" style={style}/>;
                break;
            case 'video':
                view =
                    <video src={url} controls="controls" style={style}>视频不支持</video>;
                break;
            case 'audio':
                view =
                    <audio src={url} controls="controls" style={style}>音频不支持</audio>;
                break;
            default:
                view = <img src={compressedFileIcon} alt="none" style={Object.assign(style, {
                    maxWidth: 100,
                    maxHeight: 100
                })}/>;
                break;
        }
        return view;
    }

    render() {
        const {error, progress} = this.state;
        const {url, onSuccess} = this.props;
        return (
            <div style={{
                width: 200
            }}>
                <div
                    style={{
                        position: 'relative',
                        marginTop: 3,
                        height: 200,
                        borderWidth: 1,
                        borderStyle: 'dashed',
                        display: 'flex',
                    }}
                    onDrop={this.onDrop}
                >

                    <input type="file" style={{display: 'none'}} ref='fileInput' onChange={this.onDrop}/>

                    <span
                        style={{
                            position: 'absolute',
                        }}
                        onClick={() => ReactDOM.findDOMNode(this.refs.fileInput).click()}
                    >
                        { error ? error : '拖动文件或点击此处上传' }
                    </span>
                    <button
                        style={{
                            position: 'absolute',
                            right: 0 + 'px',
                            top: 0 + 'px'
                        }}
                        onClick={(e) => {
                            e.preventDefault();
                            onSuccess('');
                        }}
                    >X
                    </button>
                    <div
                        style={{
                            position: 'absolute',
                            left: 0,
                            bottom: 0,
                            width: 100 + '%'
                        }}
                    >
                        <OverlayTrigger
                            style={{width: 100 + '%'}}
                            trigger="click" placement="bottom" overlay={popoverBottom(url)}>
                            <div style={{
                                width: 100 + '%',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}>{url || '无文件'}</div>
                        </OverlayTrigger>
                    </div>
                    { this.getPreviewView() }
                </div>
                <ProgressBar
                    striped
                    bsStyle={(() => {
                        if (progress >= 100) {
                            return 'success'
                        } else if (progress >= 66) {
                            return 'info'
                        } else if (progress >= 33) {
                            return 'warning'
                        } else {
                            return 'danger'
                        }
                    })()}
                    now={progress}
                    style={{
                        marginTop: 3,
                        height: 10
                    }}/>
            </div>
        )
    }
}
