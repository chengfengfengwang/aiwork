import React, {Component} from "react";
import * as api from "../api";
import Error2 from "./Error2";
import Waiting from "./Waiting";
import ThePagination from "./Pagination";
import {Table, thead, tbody, Form, Button, Modal, ControlLabel, FormControl, FormGroup, Col, Row, Checkbox, Thumbnail, Glyphicon, Tabs, Tab} from "react-bootstrap";
import Upload from "./Upload";
import './recommend.css';
import ImageShow from "./ImageShow";
import RecommendDetailChoose from "./RecommendDetailChoose";
import CourseChoose from "./CourseChoose";
import ScoresChooserModel from "./ScoresChooserModel";
import AimusicitvChoose from "./AimusicitvChoose";


class RecommendShow extends Component {
    constructor(props) {
        super(props);
        this.state = {loading: true, recommend_id: 0, data: {}}
    }

    componentWillReceiveProps(props) {
        let cur_id= props.data;
        this.setState({recommend_id: props.data});
        if (cur_id !== 0) {
            api.getRecommend(props.data)
                .then(json => this.setState({loading: false, data: json.data}))
                .catch(error => this.setState({loading: false, error}));
        }
    }

    render() {
        const { data } = this.state;
        let recommend_type = '无';
        if (data.recommend_type === '0'){
            recommend_type = '课程'
        }else if (data.recommend_type === '0'){
            recommend_type = '曲谱'
        }else{
            recommend_type = '视频'
        }
        return (
            <Modal {...this.props} aria-labelledby="contained-modal-title-lg">
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-lg">{data.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Thumbnail src={data.cover_url} alt="">
                <h4>{data.title}</h4>
                <p>{recommend_type}</p>
              </Thumbnail>
            </Modal.Body>
          </Modal>
        )
    }
}


class Popup extends React.Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.state = {
            loading: false, error: false, user_id: 0, course_type_one: "1", course_type_two: [], state: 1,
            title: '', cover_url: '', detail_url: '', recommend_type: 0, instrument_type: 'guitar', recommend_id : 0,
            show_detail: false, item: '', show_score: false, show_course: false, show_itv: false,
            choose_rec_type: 'course'
        }
    }

    componentWillReceiveProps(props) {
        let cur_id= props.data;
        this.setState({recommend_id: props.data});
        if (cur_id) {
            api.getRecommend(cur_id)
                .then(json => {this.setState({
                    loading: false, title: json.data.title, state: json.data.state,
                    recommend_type: json.data.recommend_type, instrument_type: json.data.instrument_type,
                    course_type_one: json.data.course_type_one, course_type_two: json.data.course_type_two,
                    detail_url: json.data.detail_url, cover_url: json.data.cover_url, item: json.data.item
                });
                this.setState({choose_rec_type: {0: 'course', 1: 'score', 2: 'itv'}[json.data.recommend_type]})
                })
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
        const {title, state, recommend_type, instrument_type, course_type_one, recommend_id,
            course_type_two, detail_url, cover_url, item} = this.state;
        const {onHide, onReload} = this.props;
        this.setState({loading: true, error: null});
        if (recommend_id === 0 || typeof(recommend_id) === "undefined" ){
            api.createRecommend(title, state, recommend_type, instrument_type, course_type_one, course_type_two, detail_url, cover_url, item)
                .then(() => this.setState({loading: false, recommend_id: null}), onHide(), onReload())
                .catch(error => this.setState({loading: false, error: error}))
        }else{
            api.updateRecommend(recommend_id, title, state, recommend_type, instrument_type, course_type_one, course_type_two, detail_url, cover_url, item)
                .then(() => this.setState({loading: false}), onHide(), onReload())
                .catch(error => this.setState({loading: false, error: error}))
        }
    }

    onLabelTypeChanged(e){
        // 推送类型修改对应事件
        this.setState({recommend_type: Number(e), choose_rec_type: {'0': 'course', '1': 'score', '2': 'itv'}[e]});
    }

    onOpenChooseWin(){
        // 打开不同选择框
        const {choose_rec_type} = this.state;
        if (choose_rec_type === 'course'){
            this.setState({show_course: true})
        }else if (choose_rec_type === 'score'){
            this.setState({show_score: true})
        }else if (choose_rec_type === 'itv'){
            this.setState({show_itv: true})
        }
    }

    render() {
        const {loading, error, title, state, recommend_type, instrument_type, show_detail,
            course_type_one, detail_url, cover_url, item, show_course, show_score, show_itv} = this.state;
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
                            <RecommendDetailChoose show={show_detail} onHide={() => this.setState({ show_detail: false })}
                                              onOk={item => {this.setState({detail_url: item.id, show_detail: false})}}/>
                            <CourseChoose show={show_course} onHide={() => this.setState({show_course: false})}
                                          onOk={item => this.setState({item: item.id, show_course: false})}/>
                            <ScoresChooserModel show={show_score} onHide={() => this.setState({show_score: false})}
                                                onOk={item => this.setState({item: item.id, show_score: false})}/>
                            <AimusicitvChoose show={show_itv} onHide={() => this.setState({ show_itv: false })}
                                              onOk={item => this.setState({item: item.id, show_itv: false})}/>

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
                                            <Checkbox value="1" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "2" ? 'inline' : 'none'}}
                                                        >推荐课程</Checkbox>
                                            <Checkbox value="2" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "2" ? 'inline' : 'none'}}>精品课程</Checkbox>
                                            <Checkbox value="3" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "2" ? 'inline' : 'none'}}>新手巩固</Checkbox>
                                            <Checkbox value="4" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "2" ? 'inline' : 'none'}}>弹唱系列</Checkbox>
                                            <Checkbox value="5" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "2" ? 'inline' : 'none'}}>免费课程</Checkbox>

                                            <Checkbox value="1" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" ? 'inline' : 'none'}}>最新</Checkbox>
                                            <Checkbox value="2" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" ? 'inline' : 'none'}}>华语</Checkbox>
                                            <Checkbox value="3" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" ? 'inline' : 'none'}}>欧美</Checkbox>
                                            <Checkbox value="4" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" ? 'inline' : 'none'}}>日韩</Checkbox>
                                            <Checkbox value="5" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" ? 'inline' : 'none'}}>民谣</Checkbox>
                                            <Checkbox value="6" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" ? 'inline' : 'none'}}>摇滚</Checkbox>
                                            <Checkbox value="7" onChange={e => this.onLabelTwoChanged(e.currentTarget)}
                                                      inline style={{display: course_type_one === "4" ? 'inline' : 'none'}}>流行</Checkbox>
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
                                    <Col sm={2}><ControlLabel>封面</ControlLabel></Col>
                                    <Col sm={10}>
                                        <Upload type="image" url={cover_url}
                                                onSuccess={(e) => this.setState({cover_url: e})}/>
                                    </Col>
                                </Row>

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>推送类型</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl componentClass="select"
                                                     value={recommend_type}
                                                     onChange={e => this.onLabelTypeChanged(e.target.value)}>
                                            <option value="0">课程</option>
                                            <option value="1">曲谱</option>
                                            <option value="2">视频</option>
                                        </FormControl>
                                    </Col>
                                </Row>

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>内容对应</ControlLabel></Col>
                                    <Col sm={8}>
                                        <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                                          <Tab eventKey={1} title="单条数据">
                                              <Col sm={3} style={{marginTop: '5px',}}><ControlLabel>对应id</ControlLabel></Col>
                                                <Col sm={7} style={{marginTop: '5px',}}>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="请输入或者选择出项目编码"
                                                        value={item}
                                                        onChange={(e) => this.setState({item: e.target.value})}/>
                                                </Col>
                                                <Col sm={2} style={{marginTop: '5px',}}><Button bsStyle="info"
                                                            onClick={() => {this.onOpenChooseWin()}}>选择</Button></Col>
                                          </Tab>
                                          <Tab eventKey={2} title="多条数据">
                                              <Col sm={3} style={{marginTop: '5px',}}><ControlLabel>对应id</ControlLabel></Col>
                                                <Col sm={7} style={{marginTop: '5px',}}>
                                                    <FormControl
                                                        type="text"
                                                        placeholder="请输入或者选择详情页编码"
                                                        value={detail_url}
                                                        onChange={(e) => this.setState({detail_url: e.target.value})}/>
                                                </Col>
                                                <Col sm={2} style={{marginTop: '5px',}}><Button bsStyle="info"
                                                            onClick={() => {this.setState({show_detail: true})}}>选择</Button></Col>
                                          </Tab>
                                        </Tabs>
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


export default class RecommendMain extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.onReload = this.onReload.bind(this);
        this.state = {loading: false, error: null, popup: false, recommends: [], recommend_id: 0, recommend_type: '',
            page: 0, size: 20, total: 0, instrument_type:'', dlg_set: false, dlg_show: false, dlg_img: false,
            state: '', cur_img: '', sort: ''}
    }

    onLoad() {
        const {page, size, instrument_type, state, recommend_type, sort} = this.state;
        this.setState({loading: true});

        api.getRecommends({page: page, size: size, instrument_type: instrument_type, state: state, recommend_type: recommend_type, sort: sort})
            .then(json => this.setState({loading: false, recommends: json.data, total: json.paging.total}))
            .catch(error => this.setState({loading: false, error}));
    }

    onDelete(id) {
        if (confirm("你确定删除吗？")) {
            api.delRecommends(id)
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
        const {loading, error, page, size, total, recommends, popup, state, recommend_type,
            dlg_set, dlg_show, recommend_id, cur_img, dlg_img} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Popup show={popup} onHide={() => this.setState({ popup: false })} onReload={() => this.onReload()}/>
                <Popup show={dlg_set} onHide={() => this.setState({ dlg_set: false })} data={recommend_id}/>
                <RecommendShow data={recommend_id} show={dlg_show} onHide={() => this.setState({ dlg_show: false })}/>
                <ImageShow data={cur_img} show={dlg_img} onHide={() => this.setState({ dlg_img: false })}/>

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
                    <FormGroup bsSize="small" controlId="days" style={{marginLeft: '20px'}}>
                        <ControlLabel>推送类型：</ControlLabel>
                        <FormControl componentClass="select"
                                     onChange={e => this.setState({recommend_type: e.target.value}, this.onLoad)}>
                            <option value="">全部</option>
                            <option value="0">课程</option>
                            <option value="1">曲谱</option>
                            <option value="2">视频</option>
                        </FormControl>
                    </FormGroup>
                </Form>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>状态</th>
                        <th>标题</th>
                        <th>推荐类型</th>
                        <th>封面(点大)</th>
                        <th>详情页</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        recommends.map((recommend, index) => {
                            let id = recommend.id, state = '开启', recommendType = '课程',
                                state_color = 'green', create_time = this.formatDateTime(recommend.createdAt);
                            if (recommend.state === 0){
                                state = '关闭';
                                state_color = 'red';
                            }
                            if (recommend.recommendType === 0){
                                recommendType = '课程';
                            }else if (recommend.recommendType === 1){
                                recommendType = '曲谱';
                            }else if (recommend.recommendType === 2){
                                recommendType = '视频';
                            }
                            return (
                                <tr id={recommend.id} key={recommend.id}>
                                    <td>{recommend.id}</td>
                                    <td><Glyphicon glyph="apple" style={{color: state_color}}/>{state}</td>
                                    <td>{recommend.title}</td>
                                    <td>{recommendType}</td>
                                    <td><img src={recommend.coverUrl}
                                             onClick={e => {
                                                this.setState({dlg_img: true, cur_img: e.target.src});
                                            }}
                                             style={{height: '40px'}}/></td>
                                    <td><a href={recommend.detailUrl} target="_blank">{recommend.detailUrl}</a></td>
                                    <td>{create_time}</td>
                                    <td>
                                        <Button bsSize="xs" bsStyle="info"
                                            onClick={e => {
                                                e.preventDefault();
                                                this.setState({
                                                    dlg_show: true,
                                                    recommend_id: e.target.parentNode.parentNode.id});
                                            }}>预览</Button>
                                        <Button bsSize="xs" bsStyle="warning" style={{marginLeft: 4}}
                                            onClick={e => {
                                                e.preventDefault();
                                                this.setState({dlg_set: true, recommend_id: e.target.parentNode.parentNode.id})
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
