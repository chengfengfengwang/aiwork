import React from "react";
import * as api from "../api";
import Error2 from "./Error2";
import Waiting from "./Waiting";
import ThePagination from "./Pagination";
import {Table, Form, Button, Modal, ControlLabel, FormControl, FormGroup, Col, Row, Checkbox, Glyphicon} from "react-bootstrap";

class RedPointPopup extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            loading: false, error: false, user_id: 0, course_type_one: "1", course_type_two: [], state: 1,
            title: '', instrument_type: 'guitar', item_id : 0, items: '', 
        }
    }

    componentWillReceiveProps(props) {
        let cur_id= props.data;
        this.setState({item_id: props.data});
        if (cur_id) {
            api.getRedPoint(cur_id)
                .then(json => this.setState({
                    loading: false, title: json.data.title, state: json.data.state,
                    instrument_type: json.data.instrument_type,
                    course_type_one: json.data.course_type_one, course_type_two: json.data.course_type_two,
                    items: json.data.items.join(',')
                }))
                .catch(error => this.setState({loading: false, error}));
        }
    }

    onLabelTwoChanged(e) {
        const {course_type_two} = this.state;
        let index = course_type_two.indexOf(e.value);
        index === -1 ? course_type_two.push(e.value) : course_type_two.splice(index, 1);
        this.setState({course_type_two: course_type_two})
    }

    onSubmit() {
        const {title, state, instrument_type, course_type_one, item_id, course_type_two, items} = this.state;
        const {onHide, onReload} = this.props;
        this.setState({loading: true, error: null});
        if (item_id === 0 || typeof(item_id) === "undefined" ){
            api.createRedPoint(title, state, instrument_type, course_type_one, course_type_two, items)
                .then(() => {
                    this.setState({loading: false, item_id: null});
                    onHide();
                    this.props.onReload();
                })
                .catch(error => this.setState({loading: false, error: error}))
        }else{
            api.updateRedPoint(item_id, state, title, instrument_type, course_type_one, course_type_two, items)
                .then(() => {
                    this.setState({loading: false});
                    onHide();
                    onReload()
                })
                .catch(error => this.setState({loading: false, error: error}))
        }
    }

    render() {
        const {loading, error, title, state, instrument_type, course_type_one, items} = this.state;
        return (
            <Modal {...this.props} bsSize="lg" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <label>推荐</label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {<Form horizontal>
                            <Waiting isVisible={loading}/>
                            <Error2 error={error} onOk={() => this.setState({error: null})}/>

                            <FormGroup style={{margin: 3}} controlId="formBasicText">
                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>是否开启</ControlLabel></Col>
                                    <Col sm={4}>
                                        <FormControl
                                            componentClass="select"
                                            value={state}
                                            onChange={(e) => this.setState({state: e.target.value})}>
                                            <option value='1'>开启</option>
                                            <option value='0'>关闭</option>
                                        </FormControl>
                                    </Col>
                                    <Col sm={2}><ControlLabel>乐器类型</ControlLabel></Col>
                                    <Col sm={4}>
                                        <FormControl
                                            componentClass="select"
                                            value={instrument_type}
                                            onChange={(e) => this.setState({instrument_type: e.target.value})}>
                                            <option value="music_basis">音基</option>

                                            <option value="guitar">吉他</option>
                                            <option value="ukulele">尤克里里</option>
                                            <option value="kalimba">卡林巴</option>
                                            <option value="djembe">非洲鼓</option>
                                        </FormControl>
                                    </Col>
                                </Row>

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>一级类型</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            componentClass="select"
                                            value={course_type_one}
                                            onChange={(e) => this.setState({course_type_one: e.target.value, course_type_two: []})}>
                                            <option value="1">必修课</option>
                                            <option value="2">选修课</option>
                                            <option value="3">亲子启蒙</option>
                                            <option value="4">曲谱库</option>
                                            <option value="5">工具</option>
                                            <option value="6">iTV</option>
                                            <option value="7">竞赛</option>
                                        </FormControl>
                                    </Col>
                                </Row>

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>二级类型</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormGroup>
                                            <Checkbox value="0" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "2" ? 'inline' : 'none'}}
                                                        >推荐课程</Checkbox>
                                            <Checkbox value="1" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "2" ? 'inline' : 'none'}}>精品课程</Checkbox>
                                            <Checkbox value="2" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "2" ? 'inline' : 'none'}}>新手巩固</Checkbox>
                                            <Checkbox value="3" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "2" ? 'inline' : 'none'}}>弹唱系列</Checkbox>
                                            <Checkbox value="4" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "2" ? 'inline' : 'none'}}>免费课程</Checkbox>

                                            <Checkbox value="1" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" && instrument_type === 'guitar' ? 'inline' : 'none'}}>最新</Checkbox>
                                            <Checkbox value="2" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" && instrument_type === 'guitar' ? 'inline' : 'none'}}>华语</Checkbox>
                                            <Checkbox value="3" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" && instrument_type === 'guitar' ? 'inline' : 'none'}}>欧美</Checkbox>
                                            <Checkbox value="4" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" && instrument_type === 'guitar' ? 'inline' : 'none'}}>日韩</Checkbox>
                                            <Checkbox value="5" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" && instrument_type === 'guitar' ? 'inline' : 'none'}}>民谣</Checkbox>
                                            <Checkbox value="6" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" && instrument_type === 'guitar' ? 'inline' : 'none'}}>摇滚</Checkbox>
                                            <Checkbox value="7" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" && instrument_type === 'guitar' ? 'inline' : 'none'}}>流行</Checkbox>

                                            <Checkbox value="1" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" && instrument_type === 'ukulele' ? 'inline' : 'none'}}>最新</Checkbox>
                                            <Checkbox value="2" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" && instrument_type === 'ukulele' ? 'inline' : 'none'}}>流行</Checkbox>
                                            <Checkbox value="3" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" && instrument_type === 'ukulele' ? 'inline' : 'none'}}>民谣</Checkbox>
                                            <Checkbox value="4" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" && instrument_type === 'ukulele' ? 'inline' : 'none'}}>欧美</Checkbox>
                                            <Checkbox value="5" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" && instrument_type === 'ukulele' ? 'inline' : 'none'}}>其他</Checkbox>

                                            <Checkbox value="1" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "6" ? 'inline' : 'none'}}
                                                        >学院show</Checkbox>
                                            <Checkbox value="2" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "6" ? 'inline' : 'none'}}>教师风采</Checkbox>
                                            <Checkbox value="3" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "6" ? 'inline' : 'none'}}>学琴tips</Checkbox>
                                        </FormGroup>
                                    </Col>
                                </Row>

                                <hr/>

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>标题</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text"
                                            value={title}
                                            placeholder="请输入标题"
                                            onChange={(e) => this.setState({title: e.target.value})}
                                        />
                                    </Col>
                                </Row>


                                <Row style={{marginTop: 5}}>
                                    <Col sm={2} style={{marginTop: '5px',}}><ControlLabel>对应id</ControlLabel></Col>
                                    <Col sm={10} style={{marginTop: '5px',}}>
                                        <FormControl
                                            type="text"
                                            placeholder="请填写item的id，以，隔开"
                                            value={items}
                                            onChange={(e) => this.setState({items: e.target.value})}/>
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


export default class RedPointIndex extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.onReload = this.onReload.bind(this);
        this.state = {loading: false, error: null, popup: false, items: [], item_id: 0, dlg_set: false, 
            page: 0, size: 20, total: 0, instrument_type:'', state: '',  sort: ''}
    }

    onLoad() {
        const {page, size, instrument_type, state, sort} = this.state;
        this.setState({loading: true});

        api.getRedPoints({page: page, size: size, instrument_type: instrument_type, state: state, sort: sort})
            .then(json => this.setState({loading: false, items: json.data, total: json.paging.total}))
            .catch(error => this.setState({loading: false, error}));
    }

    onDelete(id) {
        if (confirm("你确定删除吗？")) {
            api.delRedPoint(id)
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

    onStateToggle(item_id, state){
        if (confirm("确定修改吗？会修改缓存，请确认后修改！")) {
            this.setState({loading: true, error: null});
            api.updateRedPoint(item_id, !state)
                .then(() => {this.setState({loading: false}), this.onReload()})
                .catch(error => {this.setState({loading: false, error: error})})
        }
    }

    formatDateTime(timeStamp) { 
        var date = new Date();
        date.setTime(timeStamp * 1000);
        var y = date.getFullYear();    
        var m = date.getMonth() + 1;    
        m = m < 10 ? ('0' + m) : m;    
        var d = date.getDate();    
        d = d < 10 ? ('0' + d) : d;    
        var h = date.getHours();  
        h = h < 10 ? ('0' + h) : h;  
        var minute = date.getMinutes();  
        var second = date.getSeconds();  
        minute = minute < 10 ? ('0' + minute) : minute;    
        second = second < 10 ? ('0' + second) : second;   
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;    
    };  

    render() {
        const {loading, error, page, size, total, items, popup, item_id, dlg_set} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <RedPointPopup show={popup} onHide={() => this.setState({ popup: false })} onReload={() => this.onReload()}/>
                <RedPointPopup show={dlg_set} onHide={() => this.setState({ dlg_set: false })} data={item_id}/>

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
                    <FormGroup bsSize="small" controlId="days" style={{marginLeft: '20px'}}>
                        <ControlLabel>乐器类型：</ControlLabel>
                        <FormControl componentClass="select"
                                     onChange={e => this.setState({instrument_type: e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            <option value="music_basis">音基</option>

                            <option value="guitar">吉他</option>
                            <option value="ukulele">尤克里里</option>
                            <option value="kalimba">卡林巴</option>
                            <option value="djembe">非洲鼓</option>
                        </FormControl>
                    </FormGroup>
                </Form>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>状态</th>
                        <th>标题</th>
                        <th>一级类别</th>
                        <th>二级类别</th>
                        <th>项目列表</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((item, index) => {
                            let id = item.id, state = '启用', show_state = '停用', state_color = 'green', create_time = this.formatDateTime(item.createdAt);
                            if (item.state === 0){
                                state = '停用';
                                show_state = '启用'
                                state_color = 'red';
                            }
                            return (
                                <tr id={item.id} key={item.id}>
                                    <td>{item.id}</td>
                                    <td><Glyphicon glyph="apple" style={{color: state_color}}/>{state}</td>
                                    <td>{item.title}</td>
                                    <td>{item.courseTypeOne}</td>
                                    <td>{item.courseTypeTwo}</td>
                                    <td>{item.items}</td>
                                    <td>{create_time}</td>
                                    <td>
                                        <Button bsSize="xs"
                                            onClick={() => {
                                                this.onStateToggle(item.id, item.state);
                                            }}>{show_state}</Button>
                                        <Button bsSize="xs" bsStyle="warning" style={{marginLeft: 4}}
                                            onClick={e => {
                                                e.preventDefault();
                                                this.setState({dlg_set: true, item_id: e.target.parentNode.parentNode.id})
                                            }}>编辑</Button>
                                        <br/>
                                        <Button bsSize="xs" bsStyle="danger" style={{marginTop: 2}}
                                                onClick={e => {this.onDelete(id);}}>删除</Button>
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
