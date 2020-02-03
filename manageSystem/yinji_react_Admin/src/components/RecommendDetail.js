import React, {Component} from "react";
import * as api from "../api";
import Error2 from "./Error2";
import Waiting from "./Waiting";
import ThePagination from "./Pagination";
import {
    Table,
    thead,
    tbody,
    Form,
    Button,
    Modal,
    ControlLabel,
    FormControl,
    FormGroup,
    Col,
    Row, Glyphicon,
} from "react-bootstrap";
import Upload from "./Upload";
import AimusicitvChoose from "./AimusicitvChoose";
import CourseChoose from "./CourseChoose";
import ImageShow from "./ImageShow";
import ScoresChooserModel from "./ScoresChooserModel";


class DetailPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false, error: false, state: 1, title: '', cover_url: '', recommend_type: 0,
            instrument_type: 'guitar', choose_rec_type: 'course', items : [], show_score: false,
            show_course: false, show_itv: false, selected_list : [], item_id: 0
        }
    }

    onSubmit() {
        // 创建推荐详情页
        const {onHide, onReload} = this.props;
        const {title, state, recommend_type, instrument_type, cover_url, items, item_id} = this.state;
        if (item_id === 0 || typeof(item_id) === "undefined" ){
            api.createRecommendDetail(title, state, recommend_type, instrument_type, cover_url, items)
                .then(() => this.setState({loading: false, error: null}), onHide(), onReload())
                .catch(error => this.setState({loading: false, error: error}))
        }else{
            api.updateRecommendDetail(item_id, title, state, recommend_type, instrument_type, cover_url, items)
                .then(() => this.setState({loading: false, error: null}), onHide(), onReload())
                .catch(error => this.setState({loading: false, error: error}))
        }
    }

    componentWillReceiveProps(props) {
        const {items} = this.state;
        let cur_id= props.data;
        this.setState({item_id: props.data});
        if (cur_id) {
            api.getRecommendDetail(cur_id)
                .then(json => {
                    this.setState({
                        loading: false, title: json.data.title, state: json.data.state,
                        recommend_type: json.data.recommend_type, instrument_type: json.data.instrument_type,
                        cover_url: json.data.cover_url,
                    });
                    for (let i =0; i<json.data.items.length; i++){
                        items.push({id: json.data.items[i]})
                    }
                    this.setState({items: items,
                        choose_rec_type: {0: 'course', 1: 'score', 2: 'itv'}[json.data.recommend_type]});
                })
                .catch(error => this.setState({loading: false, error}));
        }
    }

    onLabelTypeChanged(e){
        // 推送类型修改对应事件
        this.setState({recommend_type: Number(e), choose_rec_type: {'0': 'course', '1': 'score', '2': 'itv'}[e]});
    }
    
    onAddChoose(item, type='course'){
        // 选中对应条目后，加入到选择框中，区分的与纳音为他们有不同的数据结构
        const {items} = this.state;
        switch(type)
        {
            case 'course':
                this.setState({show_course: false});
                items.push({'id': item.id, 'title': item.name, 'create_time': item.createdAt});
                break;
            case 'score':
                this.setState({show_score: false});
                items.push({'id': item.id, 'title': item.name, 'create_time': ''});
                break;
            case 'itv':
                this.setState({show_itv: false});
                items.push({'id': item.id, 'title': item.itvTitle, 'create_time': item.add_time_});
                break;
            default:
                return;
        }
        this.setState({items: items});
    }

    onDelItem(){
        // 删除对应选择项目
        const {items, selected_list} = this.state;
        for (let i=0; i < items.length; i++){
            for (let j=0; j< selected_list.length; j++){
                if (items[i].id.toString() === selected_list[j].toString()){
                    items.splice(i,1);
                }
            }
        }
        this.setState({items: items});
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

    onMuSelect(e){
        // 多选对应，更新选择，注暂只能多选一个
        const {selected_list} = this.state;
        selected_list.splice(0, selected_list.length);
        selected_list.push(e);
        this.setState({selected_list: selected_list});
    }

    render() {
        const {loading, error, items, show_score, show_itv, show_course,
            cover_url, title, state, recommend_type, instrument_type} = this.state;
        return (
            <Modal{...this.props} bsSize="lg" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title>推荐详情</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        <Form horizontal>
                            <CourseChoose  show={show_course} onHide={() => this.setState({show_course: false})}
                                           onOk={item => {this.onAddChoose(item, 'course');}}/>
                            <ScoresChooserModel show={show_score} onHide={() => this.setState({show_score: false})}
                                           onOk={item => {this.onAddChoose(item, 'score');}}/>
                            <AimusicitvChoose show={show_itv} onHide={() => this.setState({ show_itv: false })}
                                              onOk={item => {this.onAddChoose(item, 'itv');}}/>

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

                                <hr/>

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>标题</ControlLabel></Col>
                                    <Col sm={10}>
                                        <FormControl
                                            type="text" placeholder="请输入标题" value={title}
                                            onChange={(e) => this.setState({title: e.target.value})}/>
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
                                    <Col sm={2}><ControlLabel>封面</ControlLabel></Col>
                                    <Col sm={10}>
                                        <Upload type="image" url={cover_url} onSuccess={(e) => this.setState({cover_url: e})}/>
                                    </Col>
                                </Row>

                                <Row style={{marginTop: 5}}>
                                    <Col sm={2}><ControlLabel>素材选择</ControlLabel></Col>
                                    <Col sm={8}>
                                        <FormGroup controlId="formControlsSelectMultiple">
                                          <FormControl componentClass="select" multiple onChange={e => this.onMuSelect(e.target.value)}>
                                              {
                                                  items.map((item, index) => {
                                                      return (<option key={index} value={item.id}>{item.id}-{item.title}</option>)
                                                  })
                                              }
                                          </FormControl>
                                        </FormGroup>
                                    </Col>
                                    <Col sm={2}>
                                        <Button bsSize="sm" bsStyle="info"
                                                onClick={e => {e.preventDefault(); this.onOpenChooseWin()}}>添加素材</Button>
                                        <Button bsSize="sm" bsStyle="link" style={{marginTop: 10}} onClick={()=>this.onDelItem()}>选中删除</Button>
                                    </Col>
                                </Row>

                                <Button type="submit" bsStyle="success" style={{marginTop: 5, float: "center", width: '100%'}}
                                        onClick={e => {e.preventDefault(); this.onSubmit();}}>提交</Button>
                            </FormGroup>
                        </Form>
                    }
                </Modal.Body>
            </Modal>
        )
    }
}


export default class RecommendDetail extends React.Component {
    constructor(props) {
        super(props);
        this.onDelete = this.onDelete.bind(this);
        this.onReload = this.onReload.bind(this);
        this.state = {loading: false, error: null, popup: false, items: [], dlg_set: false, detail_id: 0,
            page: 0, size: 10, total: 0, instrument_type:'', dlg_img: false, cur_img: '', sort: '', state: ''}
    }

    onLoad() {
        const {page, size, instrument_type, state, recommend_type, sort} = this.state;
        this.setState({loading: true});

        api.getRecommendDetails({page: page, size: size, instrument_type: instrument_type,
            state: state, recommend_type: recommend_type, sort: sort})
            .then(json => this.setState({loading: false, items: json.data, total: json.paging.total}))
            .catch(error => this.setState({loading: false, error}));
    }

    onDelete(id) {
        // 删除行
        if (confirm("你确定删除吗？")) {
            api.delRecommendDetails(id)
                .then(() => this.setState({loading: false}, this.onLoad))
                .catch(error => this.setState({loading: false, error}));
        }
    }

    onReload(){
        // 重新加载
        this.onLoad();
    }

    componentDidMount() {
        // 组件挂载之后调用
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
        const {loading, error, page, size, total, items, popup, detail_id, dlg_set, dlg_img, cur_img} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <DetailPopup show={dlg_set} onHide={() => this.setState({ dlg_set: false })} data={detail_id}/>
                <DetailPopup show={popup} onHide={() => this.setState({ popup: false })} onReload={() => this.onReload()}/>
                <ImageShow data={cur_img} show={dlg_img} onHide={() => this.setState({ dlg_img: false })}/>

                <Form inline style={{padding: 3}}>
                    <Button bsSize="sm" bsStyle="primary" style={{float: 'right', marginRight: 10}}
                            onClick={e => {e.preventDefault(); this.setState({popup: true})}}>新建</Button>
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
                        <th>类型</th>
                        <th>封面</th>
                        <th>创建时间</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        items.map((item, index) => {
                            let id = item.id, state = '开启', recommendType = '课程',
                                state_color = 'green', show_url = 'http://s.immusician.com/recommend/html/detail/2018-10/detail.html?id=' + item.id,
                                create_time = this.formatDateTime(item.createdAt);
                            if (item.state === 0){
                                state = '关闭';
                                state_color = 'red';
                            }
                            if (item.recommendType === 1){
                                recommendType = '曲谱';
                            }else if (item.recommendType === 2){
                                recommendType = '视频';
                            }else{
                                recommendType = '课程';
                            }
                            return (
                                <tr key={index} id={item.id}>
                                    <td>{item.id}</td>
                                    <td><Glyphicon glyph="apple" style={{color: state_color}}/>{state}</td>
                                    <td>{item.title}</td>
                                    <td>{recommendType}</td>
                                    <td><img src={item.coverUrl}
                                             onClick={e => {
                                                this.setState({dlg_img: true, cur_img: e.target.src});
                                            }}
                                             style={{height: '40px'}}/></td>
                                    <td>{create_time}</td>
                                    <td>
                                        <span><a href={show_url} target="_blank" rel="noopener noreferrer">预览</a></span>
                                        <Button bsSize="xs" bsStyle="info" style={{marginLeft: 4}}
                                            onClick={e => {this.setState({
                                                dlg_set: true,
                                                detail_id: e.target.parentNode.parentNode.id
                                            })}}>编辑</Button>
                                        <br/>
                                        <Button bsSize="xs" bsStyle="danger" style={{marginLeft: 4}}
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