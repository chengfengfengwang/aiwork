import React, {Component} from 'react';
import Error2 from './Error2';
import Waiting from './Waiting';
import {Table, Button, Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import ThePagination from "./Pagination";
import * as api from "../api";
import {Link} from "react-router-dom";
import DatePicker from "react-bootstrap-date-picker";


export default class DownStatistics extends Component {

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            downinfo: [],
            error: null,
            loading: false,
            day: 1,
            start_time_value: new Date().toISOString(),
            start_time: "",
            start_time_value_2: new Date().toISOString(),
            start_time_2: "",
            download_click_data: [],
            channel: "",
            website: "",
            test: null
        }
    };

    componentWillMount() {
        this.onLoad();
    };

    onLoad() {
        const {day, start_time, channel, website, start_time_2} = this.state;
        this.setState({loading: true, error: null})
        api.downStatistics(day, start_time_2)
            .then(json => this.setState({
                loading: false,
                downinfo: json,
            }))
            .catch(error => this.setState({
                loading: false,
                error: error,
            }, console.log('**************', error)))
        api.getDownloadClick(start_time, channel, website)
            .then(json => this.setState({
                loading: false,
                download_click_data: json.data
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    render() {
        const {loading, error, downinfo, day, start_time_value, start_time, download_click_data, channel, website, start_time_2, start_time_value_2, test} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <DatePicker id="datepicker_ss" value={start_time_value_2} onChange={(e, f_e) => this.setState({
                    start_time_value_2: e,
                    start_time_2: f_e
                }, this.onLoad)}/>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>渠道名称</th>
                        <th>下载数量</th>
                        <th>七日统计</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        <td>通知书下载量</td>
                        <td>{downinfo.Coupon_count}</td>
                        <td>{(function (downinfo) {
                            if (downinfo.length != 0) {

                                return (
                                    downinfo.day_count_Coupon.map((info, index) => {
                                        return (<div>{info ? info : '未统计'}</div>)
                                    }))
                            }
                        })(downinfo)}</td>
                    </tr>
                    <tr>
                        <td>说明书下载量</td>
                        <td>{downinfo.manual_count}</td>
                        <td>{(function (downinfo) {
                            if (downinfo.length != 0) {

                                return (
                                    downinfo.day_count_manual.map((info, index) => {
                                        return (<div>{info ? info : '未统计'}</div>)
                                    }))
                            }
                        })(downinfo)}</td>
                    </tr>
                    <tr>
                        <td>奖学金下载量</td>
                        <td>{downinfo.promotioncard_count}</td>
                        <td>{(function (downinfo) {
                            if (downinfo.length != 0) {

                                return (
                                    downinfo.day_count_promotioncard.map((info, index) => {
                                        return (<div>{info ? info : '未统计'}</div>)
                                    }))
                            }
                        })(downinfo)}</td>
                    </tr>
                    <tr>
                        <td>海报下载量</td>
                        <td>{downinfo.playbill_count}</td>
                        <td>{(function (downinfo) {
                            if (downinfo.length != 0) {
                                return (
                                    downinfo.day_count_playbill.map((info, index) => {
                                        return (<div>{info ? info : '未统计'}</div>)
                                    }))
                            }
                        })(downinfo)}</td>
                    </tr>
                    <tr>
                        <td>N7老师下载量</td>
                        <td>{downinfo.n7teacher_count}</td>
                        <td>{(function (downinfo) {
                            if (downinfo.length != 0) {
                                return (
                                    downinfo.day_count_n7teacher.map((info, index) => {
                                        return (<div>{info ? info : '未统计'}</div>)
                                    }))
                            }
                        })(downinfo)}</td>
                    </tr>
                    </tbody>
                </Table>

                <Form inline style={{padding: 3, marginBottom: 10}}>
                    <DatePicker id="datepicker_ss" value={start_time_value} onChange={(e, f_e) => this.setState({
                        start_time_value: e,
                        start_time: f_e
                    }, this.onLoad)}/>
                    <FormControl
                        style={{marginLeft: 10}}
                        componentClass="select"
                        onChange={(e) => this.setState({
                            channel: e.target.value
                        }, this.onLoad)}>
                        <option value=''>无渠道</option>
                        <option value='baidu'>百度</option>
                        <option value='sougou'>搜狗</option>
                        <option value='360'>360</option>
                        <option value='tanke'>tanke</option>
                        <option value='douyin'>抖音</option>

                    </FormControl>
                    <FormControl
                        style={{marginLeft: 10}}
                        componentClass="select"
                        onChange={(e) => this.setState({
                            website: e.target.value
                        }, this.onLoad)}>
                        <option value=''>所有页面</option>
                        <option value='publicity'>http://s.immusician.com/static/html/publicity.html</option>
                        <option value='publicity_ad'>http://s.immusician.com/static/html/publicity_ad.html</option>
                        <option value='source'>http://s.immusician.com/static/web/source.html</option>
                        <option value='source_guitar'>http://s.immusician.com/static/web/source_guitar.html</option>
                        <option value='bsource_guitar'>http://s.immusician.com/static/web/bsource_guitar.html</option>
                        <option value='bsource'>http://s.immusician.com/static/web/bsource.html</option>
                        <option value='bsource_mob'>http://s.immusician.com/static/web/bsource_mob.html</option>
                        <option value='source_mob'>http://s.immusician.com/static/web/source_mob.html</option>
                        <option value='source_guitar_mob'>http://s.immusician.com/static/web/source_guitar_mob.html
                        </option>
                        <option value='bsource_guitar_mob'>http://s.immusician.com/static/web/bsource_guitar_mob.html
                        </option>
                        <option value='index_mob'>http://s.immusician.com/static/web/index_mob.html</option>
                        <option value='index'>http://s.immusician.com/static/web/index.html</option>
                        <option value="uku_pamphlet">http://s.immusician.com/static/volume/index.html</option>

                    </FormControl>
                </Form>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <th>按钮名称</th>
                    <th>web</th>
                    <th>ios</th>
                    <th>android</th>
                    </thead>
                    <tbody>
                    {
                        download_click_data.map((info, index) => {
                            for (var ih in info) {
                                return (
                                    <tr>
                                        <td>
                                            {ih}({
                                            (function (ih_) {
                                                ih_ = ih.split("_");
                                                var buttons = ih_.slice(0, -1)
                                                if (buttons.join('_') === 'publicity_ad' || buttons.join('_') === 'publicity') {
                                                    return (
                                                        <a href={'http://s.immusician.com/static/html/' + buttons.join('_') + '.html'}>http://s.immusician.com/static/html/{buttons.join('_')}.html</a>)
                                                }
                                                else {
                                                    return (
                                                        <a href={'http://s.immusician.com/static/web/' + buttons.join('_') + '.html'}>http://s.immusician.com/static/web/{buttons.join('_')}.html</a>)

                                                }
                                            })(ih)})
                                            {
                                                (function (ih_) {
                                                    console.log(ih_, '------------------------')
                                                    switch (ih_) {
                                                        case 'source_guitar_download1' :
                                                            return (<p>备注：免费体验</p>);
                                                            break;
                                                        case 'source_guitar_download2' :
                                                            return (<p>备注：马上体验</p>);
                                                            break;
                                                        case 'source_guitar_download3' :
                                                            return (<p>备注：马上体验</p>);
                                                            break;
                                                        case 'source_guitar_suspend' :
                                                            return (<p>备注：立即体验</p>);
                                                            break;
                                                        case 'source_guitar_qr' :
                                                            return (<p>备注：二维码下载</p>);
                                                            break;
                                                        case 'source_guitar_android1' :
                                                            return (<p>备注：顶部Android下载</p>);
                                                            break;
                                                        case 'source_guitar_android2' :
                                                            return (<p>备注：底部Android下载</p>);
                                                            break;
                                                        case 'source_guitar_ios1' :
                                                            return (<p>备注：下载</p>);
                                                            break;
                                                        case 'source_guitar_ios2' :
                                                            return (<p>备注：下载</p>);
                                                            break;
                                                        case 'source_download1' :
                                                            return (<p>备注：免费体验</p>);
                                                            break;
                                                        case 'source_download2' :
                                                            return (<p>备注：马上体验</p>);
                                                            break;
                                                        case 'source_download3' :
                                                            return (<p>备注：马上体验</p>);
                                                            break;
                                                        case 'source_suspend' :
                                                            return (<p>备注：立即体验</p>);
                                                            break;
                                                        case 'source_qr' :
                                                            return (<p>备注：二维码下载</p>);
                                                            break;
                                                        case 'source_android1' :
                                                            return (<p>备注：顶部Android下载</p>);
                                                            break;
                                                        case 'source_android2' :
                                                            return (<p>备注：底部Android下载</p>);
                                                            break;
                                                        case 'source_ios1' :
                                                            return (<p>备注：下载</p>);
                                                            break;
                                                        case 'source_ios2' :
                                                            return (<p>备注：下载</p>);
                                                            break;
                                                        case 'source_guitar_mob_download1' :
                                                            return (<p>备注：免费体验</p>);
                                                            break;
                                                        case 'source_guitar_mob_download2' :
                                                            return (<p>备注：马上体验免费课程</p>);
                                                            break;
                                                        case 'source_guitar_mob_suspend' :
                                                            return (<p>备注：立即体验</p>);
                                                            break;
                                                        case 'source_mob_download1' :
                                                            return (<p>备注：免费体验</p>);
                                                            break;
                                                        case 'source_mob_download2' :
                                                            return (<p>备注：马上体验免费课程</p>);
                                                            break;
                                                        case 'source_mob_suspend' :
                                                            return (<p>备注：立即体验</p>);
                                                            break;
                                                        case 'bsource_guitar_download1' :
                                                            return (<p>备注：立即体验</p>);
                                                            break;
                                                        case 'bsource_guitar_download2' :
                                                            return (<p>备注：马上体验</p>);
                                                            break;
                                                        case 'bsource_guitar_download3' :
                                                            return (<p>备注：马上体验</p>);
                                                            break;
                                                        case 'bsource_guitar_suspend' :
                                                            return (<p>备注：立即体验顶部浮动栏</p>);
                                                            break;
                                                        case 'bsource_guitar_qr' :
                                                            return (<p>备注：二维码下载</p>);
                                                            break;
                                                        case 'bsource_guitar_android1' :
                                                            return (<p>备注：顶部Android下载</p>);
                                                            break;
                                                        case 'bsource_guitar_android2' :
                                                            return (<p>备注：底部Android下载</p>);
                                                            break;
                                                        case 'bsource_guitar_ios1' :
                                                            return (<p>备注：下载</p>);
                                                            break;
                                                        case 'bsource_guitar_ios2' :
                                                            return (<p>备注：下载</p>);
                                                            break;
                                                        case 'bsource_download1' :
                                                            return (<p>备注：立即体验</p>);
                                                            break;
                                                        case 'bsource_download2' :
                                                            return (<p>备注：马上体验</p>);
                                                            break;
                                                        case 'bsource_download3' :
                                                            return (<p>备注：马上体验</p>);
                                                            break;
                                                        case 'bsource_suspend' :
                                                            return (<p>备注：立即体验顶部浮动栏</p>);
                                                            break;
                                                        case 'bsource_qr' :
                                                            return (<p>备注：二维码下载</p>);
                                                            break;
                                                        case 'bsource_android1' :
                                                            return (<p>备注：顶部Android下载</p>);
                                                            break;
                                                        case 'bsource_android2' :
                                                            return (<p>备注：底部Android下载</p>);
                                                            break;
                                                        case 'bsource_ios1' :
                                                            return (<p>备注：下载</p>);
                                                            break;
                                                        case 'bsource_ios2' :
                                                            return (<p>备注：下载</p>);
                                                            break;
                                                        case 'bsource_guitar_mob_download1' :
                                                            return (<p>备注：立即体验</p>);
                                                            break;
                                                        case 'bsource_guitar_mob_download2' :
                                                            return (<p>备注：马上体验免费课程</p>);
                                                            break;
                                                        case 'bsource_guitar_mob_suspend' :
                                                            return (<p>备注：立即体验底部浮动栏</p>);
                                                            break;
                                                        case 'bsource_mob_download1' :
                                                            return (<p>备注：立即体验</p>);
                                                            break;
                                                        case 'bsource_mob_download2' :
                                                            return (<p>备注：马上体验免费课程</p>);
                                                            break;
                                                        case 'bsource_mob_suspend' :
                                                            return (<p>备注：立即体验底部浮动栏</p>);
                                                            break;

                                                    }
                                                })(ih)}

                                        </td>
                                        <td>
                                            {info[ih].web.map((info1, index1) => {
                                                return (<div>{info1}</div>)
                                            })}
                                        </td>
                                        <td>
                                            {info[ih].ios.map((info1, index1) => {
                                                return (<div>{info1}</div>)
                                            })}
                                        </td>
                                        <td>
                                            {info[ih].android.map((info1, index1) => {
                                                return (<div>{info1}</div>)
                                            })}
                                        </td>
                                    </tr>)
                            }
                        })
                    }
                    </tbody>
                </Table>
            </div>)
    }
}