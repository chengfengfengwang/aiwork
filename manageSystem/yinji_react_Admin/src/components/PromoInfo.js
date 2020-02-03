/**
 * Created by mac on 2017/10/9.
 */
import React from "react";
import Waiting from "./Waiting";
import Error2 from "./Error2";
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import {Form, Table} from "react-bootstrap";
import ThePagination from "./Pagination";
import * as api from "../api";
import {Link} from "react-router-dom";
import moment from "moment";
import DatePicker from "react-bootstrap-date-picker";
export default class PromoInfo extends React.Component {

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            loading: false,
            error: null,
            page: 0,
            size: 10,
            total: 0,
            promos: [],
            beginTime: '',
            endTime: '',
            promos_channel: [],
            start_time: '',
            start_time_value: new Date().toISOString()
        }
    }

    onLoad() {
        const {location: {search}} = this.props;
        const {page, size, beginTime, endTime, promo_channel, start_time} = this.state;
        const params = new URLSearchParams(search.replace('?', ''));
        this.setState({loading: true, error: null});
        api.getPromoChannel({page, size, channel: params.get('channel'), beginTime, endTime, start_time})
            .then(json => this.setState({
                loading: false,
                promos: json.data,
                promos_channel: json.promo_ext,
                total: json.paging.total,
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    componentDidMount() {
        this.onLoad();
    }

    render() {
        const {loading, error, promos, page, size, total, beginTime, endTime, promos_channel, start_time_value, start_time} = this.state;
        console.log('------', promos)
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>

                <Form inline style={{marginBottom: 5}}>
                    开始时间:<input type="text" value={beginTime} className="form-control input-sm"
                           placeholder="2017-10-1" onChange={e => this.setState({beginTime: e.target.value.trim()})}/>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    结束时间:<input type="text" value={endTime} className="form-control input-sm"
                            placeholder="2017-11-1" onChange={e => this.setState({endTime: e.target.value.trim()})}/>
                    &nbsp;
                    <button className="btn btn-success btn-sm" onClick={e => {
                        e.preventDefault();
                        this.onLoad();
                    }}>搜索
                    </button>
                </Form>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>激活渠道</th>
                        <th>激活码</th>
                        <th>激活时间</th>
                        <th>用户电话</th>
                        <th>卡号</th>
                        <th>激活课程类型</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        promos.map((info, index) => {
                            return (
                                <tr key={index}>
                                    <td>{info.channel}</td>
                                    <td>{info.code}</td>
                                    <td>{info.active_at != 0 ? moment.unix(info.active_at).locale('zh_CN').format('LLLL') : 0}</td>
                                    <td>{info.user.phone}</td>
                                    <td>{info.id}</td>
                                    <td>{info.instrument_type === 1 ? '尤克里里' : '  吉他'}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <ThePagination page={page} size={size} total={total}
                               onSelect={page => this.setState({page}, this.onLoad)}/>
                七日激活
                                                            <DatePicker id="datepicker_s" value={start_time_value} onChange={(e, f_e) => this.setState({start_time_value: e, start_time: f_e}, this.onLoad)}/>
                    <br/>
                <Table bordered hover striped condensed responsive>
                    <tbody>
                        <tr>
                            {(function (promos) {
                                return(promos.map((info, index) => {
                                    return (<td>{info ? info : '未统计'}</td>)
                                }))
                            })(promos_channel)}
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}