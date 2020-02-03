/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/7/3 下午4:17
 */

import React from "react";
import Waiting from "./Waiting";
import Error2 from "./Error2";
import {Form, Table, FormControl, FormGroup, ControlLabel} from "react-bootstrap";
import ThePagination from "./Pagination";
import * as api from "../api";
import ElementView from "./ElementView";
import {Link} from "react-router-dom";
export default class Studies extends React.Component {

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            loading: false,
            error: null,
            studies: [],
            page: 0,
            size: 10,
            total: 0,
            phone: '',
            study_data: [],
            instrument_type: 'ukulele',
            instype: '',
        }
    }

    onLoad() {
        const {location: {search}} = this.props;
        const params = new URLSearchParams(search.replace('?', ''));
        const {page, size, phone, study_data, instrument_type, instype} = this.state;
        this.setState({loading: true, error: null});
        api.getCourseStudies({page, size, phone, instype, courseId: params.get('courseId'), lessonId: params.get('lessonId'), userId: params.get('userId')})
            .then(json => this.setState({
                loading: false,
                studies: json.data,
                total: json.paging.total,
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
        if (phone) {

        api.getUserStudyInfo({phone, instrument_type: instrument_type})
            .then(json => this.setState({
                loading: false,
                study_data: json[0]
            }, console.log('-----********-------', json)))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
        }
    }

    componentDidMount() {
        this.onLoad();
    }

    render() {
        const {loading, error, studies, page, size, total, phone, study_data, instrument_type, instype} = this.state;
        console.log(study_data, '**************************')
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>

                <Form inline style={{marginBottom: 5, padding: 3, marginTop: 10}}>
                    <input ref="phone" type="text" value={phone} className="form-control input-sm"
                           placeholder="请输入手机号" onChange={e => this.setState({phone: e.target.value.trim()})}/>
                    &nbsp;
                    <button className="btn btn-success btn-sm" onClick={e => {
                        e.preventDefault();
                        this.onLoad();
                    }}>搜索
                    </button>
                    &nbsp;&nbsp;
                    <FormGroup bsSize="small" controlId="days" value={instype}
                               onChange={e => this.setState({instype: e.target.value == "" ? null : e.target.value}, this.onLoad)}>
                        <ControlLabel>乐器类型：</ControlLabel>
                        <FormControl componentClass="select">
                            <option value="">全部</option>
                            <option value="0">吉他</option>
                            <option value="1">尤克里里</option>
                            <option value="2">卡林巴</option>
                        </FormControl>
                    </FormGroup>
                </Form>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>课程</th>
                        <th>用户</th>
                        <th>学习进度</th>
                        <th>弹奏次数</th>
                        <th>渠道</th>
                        <th>首次学习</th>
                        <th>上次学习</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        studies.map((study, index) => {
                            return (
                                <tr key={index}>
                                    <td>{study.course.name}</td>
                                    <td>{`${study.user.phone} [${study.user.deviceModel}]`}</td>
                                    <td>{`${study.progress}课`}</td>
                                    <td>
                                        {
                                            (() => {
                                                let query = [];
                                                if (study.course) {
                                                    query.push(['courseId', study.course.id]);
                                                }
                                                if (study.user) {
                                                    query.push(['userId', study.user.id]);
                                                }
                                                return (
                                                    <Link
                                                        to={`plays?${query.map(x => x.join('=')).join('&')}`}>{study.playedCount}</Link>
                                                );
                                            })()
                                        }
                                    </td>
                                    <td>{study.remark}</td>
                                    <td><ElementView type="timestamp" value={study.firstStudiedAt }/></td>
                                    <td><ElementView type="timestamp" value={study.lastStudiedAt }/></td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
        <ThePagination page={page} size={size} total={total}
        onSelect={page => this.setState({page}, this.onLoad)}/>
                                <FormControl
                        componentClass="select"
                        onChange={(e) => this.setState({
                            instrument_type: e.target.value
                        }, this.onLoad)} >
                        <option value='ukulele'>尤克里里</option>
                        <option value='guitar'>吉他</option>
                </FormControl>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>最后练习的课程id</th>
                        <th>课程名</th>
                        <th>是否是付费用户</th>
                        <th>总课程数</th>
                        <th>通过课程数</th>
                        <th>练习时长</th>
                        <th>弹奏音符</th>
                    </tr>
                    </thead>
                    <tbody>
                    <th>{study_data[0]}</th>
                    <th>{study_data[1]}</th>
                    <th>{study_data[2] === true ? '是' : '否'}</th>
                    <th>{study_data[4]}</th>
                    <th>{study_data[5]}</th>
                    <th>{parseInt(study_data[6] / 60) > 0 ? String(parseInt(study_data[6] / 60)) + '分' : ''}{study_data[6] % 60 ? study_data[6] % 60 : 0}秒</th>
                    <th>{study_data[7]}</th>
                    </tbody>
                </Table>
            </div>
        );
    }
}
