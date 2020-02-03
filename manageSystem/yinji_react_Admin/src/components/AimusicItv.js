import React, {Component} from "react";
import * as api from "../api";
import Error2 from "./Error2";
import Waiting from "./Waiting";
import ThePagination from "./Pagination";
import {Table, Thead, Tbody, Form, Button, Modal, ControlLabel, FormControl, FormGroup, InputGroup, Col, Row, Checkbox} from "react-bootstrap";
import DatePicker from "react-bootstrap-date-picker";

class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            loading: false,
            error: false,
            instrument_type:0,
            itv_title: '',
            describe:'',
            video_type:0,
            cover_url: '',
            video_url: '',
            authname: '',
            is_show: 0,
            add_time:''
        }
    }


    onSubmit() {
        const {instrument_type,itv_title,describe,cover_url,video_url,authname,is_show,video_type} = this.state;
        const {onClose} = this.props;
        this.setState({
            loading: true,
            error: null
        })
        api.createItv(instrument_type,itv_title,describe,cover_url,video_url,authname,is_show,video_type)
            .then(json => this.setState({
                loading: false,
            }, onClose()))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    render() {
        const {itvs, index, isVisible, onClose} = this.props;
        const {loading, error, instrument_type,itv_title,describe,cover_url,video_url,authname,is_show,video_type} = this.state;
        const onSubmit = this.onSubmit;
        return (
            <Modal.Dialog style={{display: isVisible ? 'block' : 'none'}}>
                <Modal.Header>
                    <Modal.Title>
                        <label>新建</label>
                        <Button
                            style={{float: "right"}}
                            onClick={onClose}
                            >
                            关闭
                        </Button>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        <Form horizontal>
                        <Waiting isVisible={loading}/>
                        <Error2 error={error} onOk={() => this.setState({error: null})}/>
                            <FormGroup
                                style={{margin: 3}}
                                controlId="formBasicText" >
                              <Row style={{marginTop: 5}}>
                              <Col sm={2}><ControlLabel>视频标题</ControlLabel></Col>
                    <Col sm={10}>
                    <FormControl
                        type="text"
                        placeholder="请输入视频标题"
                            onChange={(e) => this.setState({
                                itv_title: e.target.value
                            })}
                        />
                            </Col>
                            </Row>
                            <Row style={{marginTop: 5}}>
                                                              <Col sm={2}><ControlLabel>描述</ControlLabel></Col>
                    <Col sm={10}>
                    <FormControl
                        type="text"
                        placeholder="请输入视频介绍"
                            onChange={(e) => this.setState({
                                describe: e.target.value
                            })}
                        />
                            </Col>
                            </Row>
                        <Row style={{marginTop: 5}}>
                                                                                          <Col sm={2}><ControlLabel>视频作者</ControlLabel></Col>
                    <Col sm={8}>
                    <FormControl
                        type="text"
                        placeholder="请输入视频作者"
                            onChange={(e) => this.setState({
                                authname: e.target.value
                            })}
                        />
                            </Col>
                        </Row>
                        <Row style={{marginTop: 5}}>
                                                                                          <Col sm={2}><ControlLabel>封面地址</ControlLabel></Col>
                    <Col sm={8}>
                    <FormControl
                        type="text"
                        placeholder="请输入封面地址"
                            onChange={(e) => this.setState({
                                cover_url: e.target.value
                            })}
                        />
                            </Col>
                        </Row>
                    <Row style={{marginTop: 5}}>
                                                                                          <Col sm={2}><ControlLabel>视频地址</ControlLabel></Col>
                    <Col sm={8}>
                    <FormControl
                        type="text"
                        placeholder="请输入视频地址"
                            onChange={(e) => this.setState({
                                video_url: e.target.value
                            })}
                        />
                            </Col>
                        </Row>



                            <Row style={{marginTop: 5}}>
                                <Col sm={2}>视频分类</Col>
                                <Col sm={2}>
                                    <FormControl
                                        componentClass="select"
                                        onChange={(e) => this.setState({video_type: e.target.value})} >
                                        <option value='2'>学琴Tips</option>
                                        <option value='1'>学员show</option>
                                        <option value='0'>教师风采</option>
                                    </FormControl>
                                </Col>
                            </Row>


                            <Row style={{marginTop: 5}}>
                                <Col sm={2}>是否上线</Col>
                                <Col sm={4}>
                                    <FormControl
                                        componentClass="select"
                                        onChange={(e) => this.setState({is_show: e.target.value})} >
                                        <option value='0'>开启</option>
                                        <option value='1'>关闭</option>
                                    </FormControl>
                                </Col>
                            </Row>

                            <Row style={{marginTop: 5}}>
                                <Col sm={2}>乐器类型</Col>
                                <Col sm={6}>
                                    <FormControl
                                        componentClass="select"
                                            onChange={(e) => this.setState({instrument_type: e.target.value})}>
                                        <option value="0">吉他</option>
                                        <option value="1">尤克里里</option>
                                        <option value="2">不区分类型</option>
                                    </FormControl>
                                </Col>
                            </Row>

                        <br/>

                        <Button type="submit" bsStyle="success" style={{marginTop: 20}}
                            style={{left: 15}}
                            onClick={e => {
                                e.preventDefault();
                                onSubmit();
                            }}>提交</Button>
                            </FormGroup>
                        </Form>
                    }
                </Modal.Body>
            </Modal.Dialog>
        )
    }
}


export default class Itv extends Component {
    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            page: 0,
            size: 10,
            total: 0,
            loading: false,
            error: null,
            itvs: [],
            popup: false,
        }
    }

    componentDidMount() {
        this.onLoad()
    }

    onLoad() {
        const {page, size, total, loading, error} = this.state;

        this.setState({loading: true, error: null})
        api.getItvs(page, size)
            .then(json => this.setState({
                loading: false,
                itvs: json.data,
                total: json.total
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

onSubmit() {
        const {itv_id} = this.state;

        this.setState({loading: true, error: null})
        api.delItv(itv_id)
            .then(json => this.setState({
                loading: false,
                data: json.data
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }


    render() {
        const {page, size, total, loading, error, itvs, popup} = this.state;
        return (
            <div>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Popup isVisible={popup} onClose={() => this.setState({popup: false})}/>


                <Form inline style={{padding: 3}}>
                        <Button bsSize="sm" bsStyle="primary"
                            style={{left: 15, marginRight:10}}
                            onClick={e => {
                                e.preventDefault();
                                this.setState({
                                    popup: true
                                })
                            }}>新建+</Button>
                </Form>

                <Form inline style={{padding: 3}}>
                        <ControlLabel style={{marginTop: 20, marginLeft: 10}}>请输入要删除的id：</ControlLabel>
                    <FormControl
                        placeholder="请输入要删除的id"
                            onChange={(e) => this.setState({
                                itv_id: e.target.value
                            })}
                        />
                         <Button bsStyle="success" onClick={this.onSubmit}>提交</Button>
                </Form>


                <Table bordered hover striped condensed responsive>
                    <thead>
                        <tr>
                            <th>视频id</th>
                            <th>标题</th>
                            <th>乐器类型</th>
                            <th>视频分类</th>
                            <th>视频描述</th>
                            <th>视频作者</th>
                            <th>是否上线</th>
                            <th>添加时间</th>
                        </tr>
                    </thead>
                    <tbody>
                        {itvs.map((info, index) => {
                            return (
                            <tr key={index}>
                                <td>{info.id}</td>
                                <td>{info.itv_title}</td>
                                <td>{
                                (function (info) {
                                switch (info.instrument_type) {
                                    case 0:
                                        return '吉他';
                                        break;

                                        case 1:
                                            return '尤克里里';
                                            break;

                                    default:
                                        return '其他'
                                    }})(info)
                                }</td>
                                  <td>{
                                (function (info) {
                                switch (info.video_type) {
                                    case 0:
                                        return '学员show';
                                        break;

                                        case 1:
                                            return '教师风采';
                                            break;

                                           case 2:
                                              return '学琴Tips';
                                              break;

                                    default:
                                        return '其他'
                                    }})(info)
                                }</td>
                                <td>{info.describe}</td>
                                <td>{info.authname}</td>
                                  <td>{
                                (function (info) {
                                switch (info.is_show) {
                                    case true:
                                        return '上线';
                                        break;

                                        case false:
                                            return '下线';
                                            break;

                                    default:
                                        return '其他'
                                    }})(info)
                                }</td>
                                <td>{info.add_time}</td>
                            </tr>)
                        })}
                    </tbody>
                </Table>
                            <ThePagination page={page} size={size} total={total}
                               onSelect={page => this.setState({page}, this.onLoad)}/>
            </div>
        )
    }
}