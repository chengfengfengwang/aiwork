/**
 * Created by mac on 2017/9/28.
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

export default class LessonPass extends React.Component {

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            loading: false,
            error: null,
            page: 0,
            size: 10,
            total: 0,
            passinfo: [],
            days: null,
            instrument_type: '0',
            course_type: null
        }
    }

    onLoad() {
        const {page, size, days, instrument_type, course_type} = this.state;
        this.setState({loading: true, error: null});
        api.getPassInfo({page, size, days, instrument_type, course_type})
            .then(json => this.setState({
                loading: false,
                passinfo: json.data,
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
        const {loading, error, passinfo, page, size, total, days, instrument_type, course_type} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>

                <Form inline style={{marginBottom: 5}}>
                    <FormGroup bsSize="small" controlId="days">
                        <ControlLabel>天数：</ControlLabel>
                        <FormControl componentClass="select" value={days}
                                     onChange={e => this.setState({days: e.target.value == "" ? null : e.target.value})}>
                            <option value="">不限</option>
                            <option value="7">7天</option>
                            <option value="15">15天</option>
                            <option value="30">30天</option>
                        </FormControl>
                    </FormGroup>

                    <FormGroup bsSize="small" controlId="instrumen_type">
                        <ControlLabel>乐器：</ControlLabel>
                        <FormControl componentClass="select" value={instrument_type}
                                     onChange={e => this.setState({instrument_type: e.target.value})}>
                            <option value="0">尤克里里</option>
                            <option value="1">吉他</option>
                            <option value="2">卡林巴</option>
                            <option value="3">非洲鼓</option>
                            <option value="4">钢琴</option>
                            <option value='5'>音基</option>
                            <option value="6">口琴</option>

                        </FormControl>
                    </FormGroup>

                    <FormGroup bsSize="small" controlId="course_type">
                        <ControlLabel>课程类型：</ControlLabel>
                        <FormControl componentClass="select" value={course_type}
                                     onChange={e => this.setState({course_type: e.target.value == "" ? null : e.target.value})}>
                            <option value="">不限</option>
                            {this.state.instrument_type === '0' ?
                                <option value="42, 119, 120, 196, 113, 115">主要课程</option> : null}
                            {this.state.instrument_type === '0' ? <option value="-2">进阶课程</option> : null}
                            {this.state.instrument_type === '0' ? <option value="42">小涛老师新手课程</option> : null}
                            {this.state.instrument_type === '0' ? <option value="119">草帽新手入门</option> : null}
                            {this.state.instrument_type === '0' ? <option value="120">顾老师新手入门</option> : null}
                            {this.state.instrument_type === '0' ? <option value="196">小涛老师智能路径课程</option> : null}
                            {this.state.instrument_type === '0' ? <option value="113">亲子启蒙课</option> : null}
                            {this.state.instrument_type === '0' ? <option value="115">常青藤爸爸古诗词弹唱</option> : null}
                            {this.state.instrument_type === '0' ? <option value="158">尤克里里中级</option> : null}
                            {this.state.instrument_type === '0' ? <option value="166">小涛情人节课程</option> : null}
                            {this.state.instrument_type === '0' ? <option value="163">周杰伦24首订阅课</option> : null}
                            {this.state.instrument_type === '0' ? <option value="169">老王尤克里里</option> : null}
                            {this.state.instrument_type === '0' ? <option value="179">尤克里里24首弹唱课</option> : null}
                            {this.state.instrument_type === '0' ?
                                <option value="-1, 42, 119, 120, 113, 115">其他课程</option> : null}
                            {this.state.instrument_type === '1' ? (<option value="128">大向老师新手入门</option>) : null}
                            {this.state.instrument_type === '1' ? (<option value="136">柳舒淇老师新手入门</option>) : null}
                            {this.state.instrument_type === '1' ? (<option value="137">柳舒淇老师进阶课程</option>) : null}
                            {this.state.instrument_type === '1' ? (<option value="167">吉他中级课</option>) : null}
                            {this.state.instrument_type === '1' ? (<option value="168">柳舒淇情人节课程</option>) : null}
                            {this.state.instrument_type === '1' ? (<option value="145">吉他24首弹唱课</option>) : null}
                            {this.state.instrument_type === '1' ? (<option value="199">都老师吉他初级课程</option>) : null}
                            {this.state.instrument_type === '1' ? (<option value="203">都鹏吉他笔记【30节订阅课】</option>) : null}
                        </FormControl>
                    </FormGroup>

                    {/*<input ref="days" type="text" value={days} className="form-control input-sm"
                           placeholder="请输如天数" onChange={e => this.setState({days: e.target.value.trim() == '' ? null : e.target.value.trim()})}/>*/}
                    &nbsp;
                    <button className="btn btn-success btn-sm" onClick={e => {
                        e.preventDefault();
                        this.onLoad()
                    }}>确定
                    </button>
                </Form>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>关卡id</th>
                        <th>关卡名</th>
                        <th>关卡所属课程</th>
                        <th>通过学员数</th>
                        <th>未通过学员数</th>
                        <th>总练习学员数</th>
                        <th>学员通过率</th>
                        <th>课程id</th>
                        <th>天数</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        passinfo.map((info, index) => {
                            return (
                                <tr key={index}>
                                    <td>{info.lesson_id}</td>
                                    <td>
                                        {
                                            (() => {
                                                let query = [];
                                                if (info.lesson_id) {
                                                    query.push(['lessonId', info.lesson_id]);
                                                }
                                                return (
                                                    <Link
                                                        to={`plays?${query.map(x => x.join('=')).join('&')}`}>{info.name}</Link>
                                                );
                                            })()
                                        }
                                    </td>
                                    <td>{(() => {
                                        let query = [];
                                        if (info.course_id) {
                                            query.push(['courseId', info.course_id]);
                                        }
                                        return (<Link
                                            to={`studies?${query.map(x => x.join('=')).join('&')}`}>{info.course_name}</Link>);
                                    })()}</td>
                                    <td>{info.pass_user_count}</td>
                                    <td>{info.no_pass_user_count}</td>
                                    <td>{info.play_user_count}</td>
                                    <td>{info.pass_rate}</td>
                                    <td>{info.course_id}</td>
                                    <td>{info.days}</td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <ThePagination page={page} size={size} total={total}
                               onSelect={page => this.setState({page}, this.onLoad)}/>
            </div>
        );
    }
}
