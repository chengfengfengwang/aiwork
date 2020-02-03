import React, {} from "react";
import * as api from "../api";
import Error2 from "./Error2";
import Waiting from "./Waiting";
import ThePagination from "./Pagination";
import {
    Table,
    thead,
    tbody,
    Form,
    Badge, FormControl
} from "react-bootstrap";
import './recommend.css';
import moment from 'moment';
moment.locale('zh-cn');

export default class ActiveDetail extends React.Component {
    constructor(props) {
        super(props);
        this.onReload = this.onReload.bind(this);
        let data = this.props.location.query;
        this.state = {loading: false, error: null, popup: false, items: [], item_id: 0, batch_number: data.batch_number,
            group: data.group, page: 0, size: 20, total: 0, dlg_set: false, dlg_create_code: false, dlg_img: false,
            state: '', cur_img: '', sort: '', after_pay_count: 0, begin_date: data.begin_date, end_date: data.end_date,
        }
    }

    onLoad(size_tmp='20') {
        const {page, size, state, sort, batch_number, group, begin_date, end_date} = this.state;
        this.setState({loading: true});
        size_tmp = parseInt(size_tmp);
        if (size_tmp === 20){
            size_tmp = size;
        }
        if (group !== ''){
            api.getActiveGroupDetail({page: page, size: size_tmp, state: state, sort: sort, group: group,
                begin_date: begin_date, end_date: end_date})
                .then(json => {
                    this.setState({loading: false, items: json.data.data, total: json.data.total})})
                .catch(error => this.setState({loading: false, error}));
        }else{
            api.getActiveDetail({page: page, size: size_tmp, state: state, sort: sort, batch_number: batch_number,
            begin_date: begin_date, end_date: end_date})
            .then(json => {
                this.setState({loading: false, items: json.data.data, total: json.data.total})})
            .catch(error => this.setState({loading: false, error}));
        }
    }

    onReload(){
        this.onLoad();
    }

    componentDidMount() {
        this.onLoad();
    }

    render() {
        const {loading, error, page, size, total, items, batch_number, group} = this.state;
        let export_url = 'http://iguitar.immusician.com:2525/v3/active_code/export_detail/' + batch_number;
        if (group !== ''){
            export_url = 'http://iguitar.immusician.com:2525/v3/active_code/export_group/' + group;
        }
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>

                <Form inline style={{padding: 3}}>
                    <form action={export_url} method="get">
                        <FormControl type="text" name="batch_number" style={{display:'none'}}/>
                        <FormControl type="submit" value="导出所有条目" />
                        <FormControl
                        style={{float: 'right'}}
                        componentClass="select"
                        value={size}
                        onChange={(e) => {
                            this.setState({size: e.target.value});
                            this.onLoad(e.target.value);
                        }}>
                        <option value='20'>20条</option>
                        <option value='50'>50条</option>
                        <option value='100'>100条</option>
                        <option value='150'>150条</option>
                        <option value='200'>200条</option>
                        <option value='300'>300条</option>
                        <option value='500'>500条</option>
                        <option value='1000'>1000条</option>
                        <option value='999999'>所有</option>
                    </FormControl>
                    </form>
                    {/*<Alert bsStyle="warning" style={{marginTop: '10px', marginBottom: 0}}>*/}
                        {/*总数目：<strong>{total}</strong>*/}
                        {/*激活后付费数目：<strong>{after_pay_count}</strong>*/}
                    {/*</Alert>*/}
                    {/*<FormGroup bsSize="small" controlId="days">*/}
                        {/*<ControlLabel>排序方式：</ControlLabel>*/}
                        {/*<FormControl componentClass="select"*/}
                                     {/*onChange={e => this.setState({sort: e.target.value}, this.onLoad)}>*/}
                            {/*<option value="">默认排序</option>*/}
                            {/*<option value="(('_id', 1), )">ID递增</option>*/}
                            {/*<option value="(('_id', -1), )">ID递减</option>*/}
                            {/*<option value="(('title', 1), )">标题递增</option>*/}
                            {/*<option value="(('title', -1), )">标题递减</option>*/}
                            {/*<option value="(('updated_at', 1), )">更新时间递增</option>*/}
                            {/*<option value="(('updated_at', -1), )">更新时间递减</option>*/}
                        {/*</FormControl>*/}
                    {/*</FormGroup>*/}
                    {/*<FormGroup bsSize="small" controlId="days" style={{marginLeft: '20px'}}>*/}
                        {/*<ControlLabel>批号查询</ControlLabel>*/}
                        {/*<InputGroup>*/}
                            {/*<FormControl*/}
                                {/*type="text" placeholder="请输入批号"*/}
                                {/*value={batch_number}*/}
                                {/*onChange={e => this.setState({*/}
                                    {/*page: 0,*/}
                                    {/*batch_number: e.target.value.trim()*/}
                                {/*}, () => this.onLoad())}/>*/}
                            {/*<InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>*/}
                        {/*</InputGroup>*/}
                    {/*</FormGroup>*/}
                </Form>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>序号</th>
                        <th>手机号</th>
                        <th>激活课程名称</th>
                        <th>激活时间</th>
                        <th>学习进度</th>
                        <th>复购详情</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((item, index) => {
                            return (
                                <tr id={item.id} key={item.id}>
                                    <td>{index + 1}</td>
                                    <td>{item.phone}</td>
                                    <td>{item.course_name}</td>
                                    <td>{item.updated_at}</td>
                                    <td>{
                                        item.study_info.list.map((study_item, study_index) => {
                                        return (
                                            <p>
                                                {study_item.name}<Badge>进度{study_item.progress}</Badge><Badge>{study_item.play_count}次练习</Badge>
                                            </p>
                                        )
                                    })}
                                    </td>
                                    <td>{
                                        item.payment_info.list.map((payment_item, payment_index) => {
                                        return (
                                            <p>
                                                {payment_item.name}<Badge>付费{payment_item.fee}</Badge>{payment_item.time_paid}
                                            </p>
                                        )
                                    })}
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <ThePagination
                    page={page} size={size} total={total}
                    onSelect={page => this.setState({page}, this.onLoad)}/>
            </div>
        );
    }
}
