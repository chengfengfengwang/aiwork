/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/3/20 下午9:17
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import * as iGuitarApi from "../api";
import compressedFileIcon from "./compressed.jpeg";
import ProgressBar from "react-bootstrap/lib/ProgressBar";
import Upload from "./Upload";
import Waiting from "./Waiting";

export default class VideoGroup extends Component {
    static propTypes =
        {
            urls: PropTypes.array,
            onSuccess: PropTypes.func.isRequired,
            onUpload: PropTypes.func
        };

    static defaultProps = {
        type: 'video',
        //urls: ['http://iguitar-new.iguitar.immusician.com/lnMy-Qj8YEpHnTyGjUfyTejN-bSB','http://iguitar-new.iguitar.immusician.com/loykazFUytMuwmFa7AUGmLpqKChd'],
        urls: [],
        onUpload: () => null
    };


    constructor(props) {
        super(props);
        this.state = {
            progress: 0,
            error: null,
            myurls:props.urls,
            loading: false
        };

    }

    togetherVideos = (url, param)=>{
        const {onSuccess} = this.props;
        iGuitarApi
            .togetherMp4(url, param, progress => {
                this.setState({progress: progress});
            })
            .then(url => {
                this.setState({error: null});
                onSuccess(url);
            })
            .catch(error => {
                this.setState({error: error});
            })
    }
    uploadChange = (e,i) =>{
        console.log('---uploadChange---')
        console.log(e,i)
        let myurls = this.state.myurls;
        myurls[i] = e;
        this.setState({myurls})
        console.log('---uploadChange---')
    }
    addVideo = index =>{
        console.log('---addVideo---');
        let myurls = this.state.myurls;
        myurls.splice(index+1 ,0 ,'');
        this.setState({myurls})
        console.log('---addVideo---',index)
    } 
    pushVideo = ()=>{
        let myurls = this.state.myurls;
        myurls.push('');
        this.setState({myurls})
    }
    removeVideo = index =>{
        console.log('---removeVideo---')
        let myurls = this.state.myurls;
        myurls.splice(index,1);
        this.setState({myurls})
        console.log('---removeVideo---')
    }
    putTogether = e =>{
        console.log('---点击合成上传值到父组件---')
        const {onSuccess} = this.props;
        let value = '';
        value = value + JSON.stringify(this.state.myurls);
        value = value + ';' + 'result';        
        onSuccess(value);
        console.log('---点击合成上传值到父组件---')
    }

    render() {
        const {error, progress, loading} = this.state;
        const {urls, onSuccess} = this.props;
        return (
            <div>
                <Waiting isVisible={loading}/>
                {
                        urls.map((item, index) => {
                            return (
                                <div key={index}>
                                    <Upload type="video" url={item} onSuccess={(e) => {this.uploadChange(e,index)}}/>
                                    <span onClick={(e) => {this.addVideo(index); }}>新增</span>
                                    <span onClick={(e) => {this.removeVideo(index); }}>删除</span>
                                </div>
                                
                            )
                        })
                    }
                    <div onClick={(e) => {this.pushVideo()}}>新增分段视频</div>
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
                    <div onClick={(e) => {this.putTogether(); }}>合成</div>
            </div>
        )
    }
}
