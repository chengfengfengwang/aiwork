import React, {Component} from "react";
import * as api from "../api";
import Error2 from "./Error2";
import Waiting from "./Waiting";
import ThePagination from "./Pagination";
import {Table, thead, tbody, Form, Button, Modal, ControlLabel, FormControl, FormGroup, Col, Row, Checkbox, Thumbnail, Glyphicon, Tabs, Tab} from "react-bootstrap";
import Upload from "./Upload";
import './recommend.css';
import ImageShow from "./ImageShow";
import DatePicker from "react-bootstrap-date-picker";
import moment from "moment";
import CourseChoose from "./CourseChoose";


class CreateCodePopup extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            loading: false, error: false, item_id: 0, count: 0
        }
    };

    componentWillReceiveProps(props) {
        this.setState({item_id: props.data});
    }

    onSubmit() {
        const {item_id, count} = this.state;
        const {onHide} = this.props;
        this.setState({loading: true, error: null});
        api.createActiveCode(item_id, count)
            .then(() => this.setState({loading: false, recommend_id: null}, onHide()))
            .catch(error => this.setState({loading: false, error: error}))
    }


    render() {
        const {loading, error, item, count} = this.state;
        return (
            <Modal {...this.props} bsSize="lg" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <label>批量创建激活码</label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {<Form horizontal>
                            <Waiting isVisible={loading}/>
                            <Error2 error={error} onOk={() => this.setState({error: null})}/>

                            <FormGroup style={{margin: 3}} controlId="formBasicText">
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>数目</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            value={count}
                                            placeholder="请输入需要生成的数目"
                                            onChange={(e) => {
                                                this.setState({count: e.target.value});
                                            }}
                                        />
                                    </Col>
                                </Row>

                                <Button type="submit" bsStyle="success" style={{marginTop: 5, float: "right"}}
                                        onClick={e => {e.preventDefault(); this.onSubmit();}}>提交</Button>
                            </FormGroup>
                        </Form>}
                </Modal.Body>
            </Modal>
        )
    }
}


class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        const date = moment().format('YYYY-MM-DD HH:mm:ss');
        this.state = {
            loading: false, error: false, item: {state: 1, valid_dt_begin: date, valid_dt_end: date},  items: [], show_course: false, cur_item_id: 0,
            cur_duration_day: 30, cur_course_item_id:0, select_duration_day: 30,
        }
    };

    componentWillReceiveProps(props) {
        let cur_id= props.data;
        this.setState({cur_item_id: props.data});
        if (cur_id) {
            api.getActiveTemplate(cur_id)
                .then(json => {
                    this.setState({loading: false, item: json.data, items: json.data.items})
                })
                .catch(error => this.setState({loading: false, error}));
        }
    }

    onSubmit() {
        const {cur_item_id, item, items} = this.state;
        const {onHide, onReload} = this.props;
        this.setState({loading: true, error: null});
        if (cur_item_id === 0 || typeof(cur_item_id) === "undefined" ){
            api.createActiveTemplate(item, items)
                .then(() => this.setState({loading: false, recommend_id: null}), onHide(), onReload())
                .catch(error => this.setState({loading: false, error: error}))
        }else{
            api.updateActiveTemplate(cur_item_id, item, items)
                .then(() => this.setState({loading: false}), onHide(), onReload())
                .catch(error => this.setState({loading: false, error: error}))
        }
    }

    onAddChoose(item){
        const {items, cur_duration_day} = this.state;
        this.setState({show_course: false});
        items.push({'course_id': item.id, 'title': item.name, 'create_time': item.createdAt, 'duration_day': cur_duration_day});
        this.setState({items: items});
    }

    onMuSelect(e){
        const {items} = this.state;
        for (let i=0; i < items.length; i++){
            if (items[i].course_id.toString() === e){
                this.setState({cur_course_item_id: items[i].course_id, select_duration_day: items[i].duration_day});
                break;
            }
        }
    }

    handleBeginChange = (newDate, formattedValue) => {
        const {item} = this.state;
        item.valid_dt_begin = formattedValue;
        this.setState({item: item});
    };

    handleEndChange = (value, formattedValue) => {
        const {item} = this.state;
        item.valid_dt_end = formattedValue;
        this.setState({item: item});
    };

    onDurChange = (e) => {
        const {items, cur_course_item_id} = this.state;
        for (let i=0; i < items.length; i++){
            if (items[i].course_id === cur_course_item_id){
                items[i].duration_day = e;
                break;
            }
        }
        this.setState({items: items, select_duration_day: e});
        console.log(items);
    };

    onDelItem(){
        if (confirm("你确定删除吗？")) {
            const {items, cur_course_item_id} = this.state;
            for (let i=0; i < items.length; i++){
                if (items[i].course_id === cur_course_item_id){
                    items.splice(i,1);
                    break;
                }
            }
            this.setState({items: items});
        }
    }

    render() {
        const {loading, error, item, items, show_course, cur_duration_day, select_duration_day} = this.state;
        const format= "YYYY-MM-DD";
        return (
            <Modal {...this.props} bsSize="lg" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <label>创建激活码模板</label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {<Form horizontal>
                            <Waiting isVisible={loading}/>
                            <Error2 error={error} onOk={() => this.setState({error: null})}/>
                            <CourseChoose  show={show_course} onHide={() => this.setState({show_course: false})}
                                           onOk={item => {this.onAddChoose(item, 'course');}}/>

                            <FormGroup style={{margin: 3}} controlId="formBasicText">
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>是否开启</ControlLabel></Col>
                                    <Col sm={4}>
                                        <FormControl
                                            componentClass="select"
                                            value={item.state}
                                            onChange={(e) => {
                                                this.state.item.state = e.target.value;
                                                this.setState({});
                                            }}>
                                            <option value='1'>开启</option>
                                            <option value='0'>关闭</option>
                                        </FormControl>
                                    </Col>
                                </Row>
                                <hr/>
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>标题</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            value={item.title}
                                            placeholder="请输入标题"
                                            onChange={(e) => {
                                                this.state.item.title = e.target.value;
                                                this.setState({});
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>渠道</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            value={item.channel}
                                            placeholder="请输入渠道"
                                            onChange={(e) => {
                                                this.state.item.channel = e.target.value;
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>体验天数（总体）</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            value={cur_duration_day}
                                            placeholder="请输入天数"
                                            onChange={(e) => {
                                                this.state.cur_duration_day = e.target.value;
                                                this.setState({});
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>价格</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            value={item.price}
                                            placeholder="请输入价格"
                                            onChange={(e) => {
                                                this.state.item.price = e.target.value;
                                                this.setState({});
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>激活前文</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            value={item.experience_buy_tip}
                                            placeholder="请输入文案"
                                            onChange={(e) => {
                                                this.state.item.experience_buy_tip = e.target.value;
                                                this.setState({});
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>激活后文</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            value={item.experience_overdue_tip}
                                            placeholder="请输入文案"
                                            onChange={(e) => {
                                                this.state.item.experience_overdue_tip = e.target.value;
                                                this.setState({});
                                            }}
                                        />
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>激活码有效时间</ControlLabel></Col>
                                    <Col sm={4}>
                                        <DatePicker
                                               value={item.valid_dt_begin}
                                               dateFormat={format}
                                               onChange={this.handleBeginChange}/>
                                    </Col>
                                    <Col sm={2}><ControlLabel> - </ControlLabel></Col>
                                    <Col sm={4}>
                                        <DatePicker
                                               value={item.valid_dt_end}
                                               dateFormat={format}
                                               onChange={this.handleEndChange}/>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>吉他二维码</ControlLabel></Col>
                                    <Col sm={10}>
                                        <Upload type="image" url={item.guitar_qrcode}
                                                onSuccess={(e) => {
                                                    this.state.item.guitar_qrcode = e;
                                                    this.setState({});
                                                }}/>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>尤克里里二维码</ControlLabel></Col>
                                    <Col sm={10}>
                                        <Upload type="image" url={item.uk_qrcode}
                                            onSuccess={(e) => {
                                                this.state.item.uk_qrcode = e;
                                                this.setState({});
                                            }}/>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>卡林巴二维码</ControlLabel></Col>
                                    <Col sm={10}>
                                        <Upload type="image" url={item.ka_qrcode}
                                            onSuccess={(e) => {
                                                this.state.item.ka_qrcode = e;
                                                this.setState({});
                                            }}/>
                                    </Col>
                                </Row>
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>课程选择</ControlLabel></Col>
                                    <Col sm={6}>
                                        <FormGroup controlId="formControlsSelectMultiple">
                                          <FormControl componentClass="select" multiple onChange={e => this.onMuSelect(e.target.value)} style={{height: '190px'}}>
                                              {
                                                  items.map((item, index) => {
                                                      return (<option key={index} value={item.course_id}>{typeof(item.title) !== "undefined" ? item.title : item.course_id}--->持续天数：{item.duration_day}</option>)
                                                  })
                                              }
                                          </FormControl>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={4}>
                                        <Col sm={12}>
                                            <ControlLabel>课程持续天数</ControlLabel>
                                            <FormControl
                                                type="text"
                                                value={select_duration_day}
                                                placeholder="请输入天数"
                                                onChange={(e) => {
                                                    this.onDurChange(e.target.value);
                                                }}
                                            />
                                        </Col>
                                        <br/><br/><br/><br/><br/><br/>
                                        <Col sm={12}>
                                            <Button bsSize="sm" bsStyle="info"
                                                    onClick={e => {e.preventDefault(); this.setState({show_course: true})}}>添加素材</Button>
                                            <Button bsSize="sm" bsStyle="link" style={{marginTop: 10}} onClick={()=>this.onDelItem()}>选中删除</Button>
                                        </Col>
                                    </Col>
                                </Row>

                                <Button type="submit" bsStyle="success" style={{marginTop: 5, float: "right"}}
                                        onClick={e => {e.preventDefault(); this.onSubmit();}}>提交</Button>
                            </FormGroup>
                        </Form>}
                </Modal.Body>
            </Modal>
        )
    }
}


export default class ActiveTemplate extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.onReload = this.onReload.bind(this);
        this.state = {loading: false, error: null, popup: false, items: [], item_id: 0,
            page: 0, size: 20, total: 0, dlg_set: false, dlg_create_code: false, dlg_img: false,
            state: '', cur_img: '', sort: ''}
    }

    onLoad() {
        const {page, size, state, sort} = this.state;
        this.setState({loading: true});

        api.getActiveTemplates({page: page, size: size, state: state, sort: sort})
            .then(json => this.setState({loading: false, items: json.data, total: json.paging.total}))
            .catch(error => this.setState({loading: false, error}));
    }

    onDelete(id) {
        if (confirm("你确定删除吗？")) {
            api.delTemplates(id)
                .then(() => this.setState({loading: false}, this.onLoad))
                .catch(error => this.setState({loading: false, error}));
        }
    }

    onReload(){
        this.onLoad();
    }

    componentDidMount() {
        this.onLoad();
    }

    formatDateTime(timeStamp) {
        let date = new Date();
        date.setTime(timeStamp * 1000);
        let y = date.getFullYear();
        let m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        let d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        let h = date.getHours();
        h = h < 10 ? ('0' + h) : h;
        let minute = date.getMinutes();
        let second = date.getSeconds();
        minute = minute < 10 ? ('0' + minute) : minute;
        second = second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
    };

    render() {
        const {loading, error, page, size, total, items, popup, state, dlg_set, dlg_create_code, item_id, cur_img, dlg_img} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Popup show={popup} onHide={() => this.setState({ popup: false })} onReload={() => this.onReload()}/>
                <Popup show={dlg_set} onHide={() => this.setState({ dlg_set: false })} data={item_id}/>
                <ImageShow data={cur_img} show={dlg_img} onHide={() => this.setState({ dlg_img: false })}/>
                <CreateCodePopup data={item_id} show={dlg_create_code} onHide={() => this.setState({ dlg_create_code: false })}/>

                <Form inline style={{padding: 3}}>
                    <Button bsSize="sm" bsStyle="primary" style={{float: 'right'}}
                            onClick={() => {this.setState({popup: true})}}>新建</Button>
                    <Button bsSize="sm" style={{float: 'right', marginRight: 10}} onClick={this.onReload}>刷新</Button>
                    <FormGroup bsSize="small" controlId="days">
                        <ControlLabel>排序方式：</ControlLabel>
                        <FormControl componentClass="select"
                                     onChange={e => this.setState({sort: e.target.value}, this.onLoad)}>
                            <option value="">默认排序</option>
                            <option value="(('_id', 1), )">ID递增</option>
                            <option value="(('_id', -1), )">ID递减</option>
                            <option value="(('title', 1), )">标题递增</option>
                            <option value="(('title', -1), )">标题递减</option>
                            <option value="(('updated_at', 1), )">更新时间递增</option>
                            <option value="(('updated_at', -1), )">更新时间递减</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup bsSize="small" controlId="days" style={{marginLeft: '20px'}}>
                        <ControlLabel>状态：</ControlLabel>
                        <FormControl componentClass="select"
                                     onChange={e => this.setState({state: e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            <option value='1'>开启</option>
                            <option value='0'>关闭</option>
                        </FormControl>
                    </FormGroup>
                </Form>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>状态</th>
                        <th>标题</th>
                        <th>有效时间</th>
                        <th>渠道</th>
                        <th>群二维码</th>
                        <th>群二维码更新时间</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((item, index) => {
                            let id = item.id, state = '开启',
                                state_color = 'green', create_time = this.formatDateTime(item.createdAt),
                                valid_dt = item.validDtBegin + '-' + item.validDtEnd;
                            if (item.state === 0){
                                state = '关闭';
                                state_color = 'red';
                            }
                            return (
                                <tr id={item.id} key={item.id}>
                                    <td>{item.id}</td>
                                    <td><Glyphicon glyph="apple" style={{color: state_color}}/>{state}</td>
                                    <td>{item.title}</td>
                                    <td>{valid_dt}</td>
                                    <td>{item.channel}</td>
                                    <td>{create_time}</td>
                                    <td>
                                        <Button bsSize="xs" bsStyle="info"
                                            onClick={e => {
                                                e.preventDefault();
                                                this.setState({
                                                    dlg_create_code: true,
                                                    item_id: e.target.parentNode.parentNode.id});
                                            }}>创建激活码</Button>
                                        <Button bsSize="xs" bsStyle="warning" style={{marginLeft: 4}}
                                            onClick={e => {
                                                e.preventDefault();
                                                this.setState({dlg_set: true, item_id: e.target.parentNode.parentNode.id})
                                            }}>编辑</Button>
                                        <br/>
                                        <Button bsSize="xs" bsStyle="danger" style={{marginTop: 2}}
                                                onClick={() => {this.onDelete(id);}}>删除</Button>
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
