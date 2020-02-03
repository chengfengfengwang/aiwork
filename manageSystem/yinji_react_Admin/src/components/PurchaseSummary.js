import React, {Component} from 'react';
import * as api from '../api';
import Error2 from './Error2';
import Waiting from './Waiting';
import {Table, Button, Form, FormGroup, FormControl, ControlLabel} from "react-bootstrap";
import ThePagination from './Pagination';
import moment from 'moment';
import {Link} from "react-router-dom";
export default class PurchaseSummary extends Component {

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            loading: false,
            error: null,
            page: 0,
            size: 10,
            total: 0,
            purchaseinfo: [],
            day: 1,
            type: 'paid',
        }
    }

    onLoad() {
        const {page, size, day, type} = this.state;
        const {location: {search}} = this.props;
        const params = new URLSearchParams(search.replace('?', ''));
        this.setState({
            loading: true,
        })
        api.purchaseSummary({page, size, type: params.get('type'), day: params.get('day') == '' ? null : params.get('day'), goods_id: params.get('goods_id'), code: params.get('code')})
            .then(json => this.setState({
                loading: false,
                purchaseinfo: json.data,
                total: json.count
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
        const {page, size, loading, error, purchaseinfo, day, total} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>uid</th>
                        <th>激活码</th>
                        <th>支付/激活时间</th>
                        <th>支付金额</th>
                        <th>类型</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        purchaseinfo.map((info, index) => {
                            return (
                                <tr key={index}>
                                    <td><a href={`http://admin.iguitar.immusician.com/member/list?t=&do=uid&uid=${info.user_id}`} target="_blank">{info.user_id}</a>/
                                        {(() => {
                                        let query = [];
                                        if (info.user_id) {
                                            query.push(['userId', info.user_id]);
                                        }
                                        return (<Link to={`studies?${query.map(x => x.join('=')).join('&')}`}>学习历史</Link>);
                                        })()}
                                    </td>
                                    <td>{info.code == null || info.code == '' ? '无' : info.code}</td>
                                    <td>{info.time_paid != 0 ? moment.unix(info.time_paid).locale('zh_CN').format('LLLL') : 0}</td>
                                    <td>{info.amount / 100}</td>
                                    <td>{info.type == 'paid' ? '支付' : '激活'}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <ThePagination page={page} size={size} total={total}
                               onSelect={page => this.setState({page}, this.onLoad)}/>
        </div>
        )
    }

}