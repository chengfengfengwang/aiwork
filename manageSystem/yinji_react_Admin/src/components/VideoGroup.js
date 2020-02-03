/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/3/20 下午9:17
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import ReactDOM from "react-dom";
import {
    Button
} from "react-bootstrap";
import * as iGuitarApi from "../api";
import compressedFileIcon from "./compressed.jpeg";
import ProgressBar from "react-bootstrap/lib/ProgressBar";
import Upload from "./Upload";
import Waiting from "./Waiting";
import addPng from "./imgs/VideoGroup/add.png";
import removePng from "./imgs/VideoGroup/remove.png";
import  './VideoGroup';
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
        console.log('--constructor--')
    }

    togetherVideos = ()=>{
        const {onSuccess} = this.props;
        const param = {
            piece_v_urls:JSON.stringify(this.state.myurls)
        }
        this.setState({loading: true});
        iGuitarApi
            .togetherMp4('http://192.168.1.83:8848/v1/merge_videos', JSON.stringify(this.state.myurls))
            .then(json => {
                const url = json.url;
                this.setState({loading: false});
                console.log('---点击合成上传值到父组件---')
                let value = '';
                value = value + JSON.stringify(this.state.myurls);
                value = value + ';' + url;        
                onSuccess(value);
                console.log('---点击合成上传值到父组件---')
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
    componentWillReceiveProps(nextProps) {
        console.log('--componentWillReceiveProps--')
        this.setState({myurls: nextProps.urls});
    }
    render() {
        console.log('--render--')
        console.log(this.props)
        console.log(this.state)
        const {error, progress, loading, myurls} = this.state;
        return (
            <div>
                <Waiting isVisible={loading}/>
                {
                        myurls.map((item, index) => {
                            return (
                                <div style={{
                                    position:"relative"
                                }} className='video_pice' key={index}>
                                    <Upload type="video" url={item} onSuccess={(e) => {this.uploadChange(e,index)}}/>
                                    <img style={{
                                        position:"absolute",
                                        left:"235px",
                                        width:"30px",
                                        top:"26%"
                                    }}  src={addPng} className='add' onClick={(e) => {this.addVideo(index); }} alt="新增" />
                                    <img style={{
                                        position:"absolute",
                                        left:"233.5px",
                                        width:"34px",
                                        top:"45%"
                                    }}  src={removePng} className='remove' onClick={(e) => {this.removeVideo(index); }} alt="删除" />
                                    {/* <span className='add' onClick={(e) => {this.addVideo(index); }}>新增</span>
                                    <span className='remove' onClick={(e) => {this.removeVideo(index); }}>删除</span> */}
                                </div>
                                
                            )
                        })
                    }
                    <div>
                        {
                            (()=>{
                                console.log('----jsx----')
                                console.log(myurls)
                                if(myurls.length <= 0){
                                    return(
                                        <div style={{ 
                                            backgroundColor: '#3333335e',
                                            color:"#fff",width:'200px',
                                            lineHeight:"30px",
                                            borderRadius:"15px",
                                            textAlign:"center"
                                            }} onClick={(e) => {this.pushVideo()}}>新增分段视频</div>
                                    )
                                    
                                
                                }
                            })()

                        }
                    </div>
                       
                    
                    
                    <Button style={{ marginTop: 20}} bsStyle="primary" onClick={(e) => {this.togetherVideos(); }}>合成视频</Button>
            </div>
        )
    }
}
