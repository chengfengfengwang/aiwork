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
    Row,
    Glyphicon,
    InputGroup
} from "react-bootstrap";
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
            loading: false, error: false, item_id: 0, count: 1, times: 1
        }
    };

    componentWillReceiveProps(props) {
        this.setState({item_id: props.data});
    }

    onSubmit() {
        const {item_id, count, times} = this.state;
        const {onHide} = this.props;
        this.setState({loading: true, error: null});
        api.createActiveCode(item_id, count, times)
            .then(() => this.setState({loading: false, recommend_id: null}, onHide()))
            .catch(error => this.setState({loading: false, error: error}))
    }


    render() {
        const {loading, error, item, count, times} = this.state;
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
                            <Row style={{marginTop: 5}}>
                                <Col sm={2}><ControlLabel>批数</ControlLabel></Col>
                                <Col sm={10}>
                                    <FormControl
                                        type="text"
                                        value={times}
                                        placeholder="请输入需要生成的批数"
                                        onChange={(e) => {
                                            this.setState({times: e.target.value});
                                        }}
                                    />
                                </Col>
                            </Row>

                            <Button type="submit" bsStyle="success" style={{marginTop: 5, float: "right"}}
                                    onClick={e => {
                                        e.preventDefault();
                                        this.onSubmit();
                                    }}>提交</Button>
                        </FormGroup>
                    </Form>}
                </Modal.Body>
            </Modal>
        )
    }
}

class BatchesPopup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false, error: false, item_id: 0, count: 1, items: [], template_id: 0
        }
    };

    componentWillReceiveProps(props) {
        this.setState({item_id: props.data});
        if (props.data === 0 || props.data === '0'){

        }else{
            api.getTemplateBatch(props.data)
            .then(json => {
                console.log(json.data);
                this.setState({items: json.data})
            })
            .catch(error => this.setState({loading: false, error}));
        }
    }

    onSetBatches(batch_num){
        const {onHide} = this.props;
        const {template_id, item_id} = this.state;
        api.setBatchCode(item_id, batch_num, template_id)
            .then(() => this.setState({loading: false}, onHide()))
            .catch(error => this.setState({loading: false, error: error}))
    }

    render() {
        const {loading, error, item_id, count, items, template_id} = this.state;
        return (
            <Modal {...this.props} bsSize="lg" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        <label>批号列表</label>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        <Table bordered hover striped condensed responsive>
                            <thead>
                            <tr>
                                <th>批号</th>
                                <th>导出</th>
                                <th>数目</th>
                                <th>使用人数</th>
                                <th>移交至</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                items.map((item, index) => {
                                    let input_id = 'to_template' + item._id;
                                    let export_url = 'http://iguitar.immusician.com:2525/v3/active_template/export_code/' + template_id;
                                    return (
                                        <tr key={item._id}>
                                            <td>{item._id}</td>
                                            <td>
                                                <form action={export_url} method="get">
                                                    <FormControl type="text" name="batch_number" value={item._id} style={{display:'none'}}/>
                                                    <FormControl type="submit" value="导出" />
                                                </form>
                                            </td>
                                            <td>{item.total_batch}</td>
                                            <td>{item.user_count}</td>
                                            <td>
                                                <FormControl style={{width: 200}}
                                                    type="text"
                                                    id={input_id}
                                                    placeholder="请输入需要移交至模板id"
                                                    onChange={(e) => {
                                                        this.setState({template_id: e.target.value});
                                                    }}
                                                />
                                                <Button bsSize="xs" bsStyle="success"
                                                        style={{marginLeft: 4, marginTop: 2}}
                                                        onClick={() => {
                                                            this.onSetBatches(item._id);
                                                        }}>移交</Button>
                                            </td>
                                        </tr>
                                    )
                                })
                            }
                            </tbody>
                        </Table>
                    }
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
            loading: false,
            error: false,
            item: {state: 1, valid_dt_begin: date, valid_dt_end: date},
            items: [],
            show_course: false,
            cur_item_id: 0,
            cur_duration_day: 30,
            cur_course_item_id: 0,
            select_duration_day: 30,
        }
    };

    componentWillReceiveProps(props) {
        let cur_id = props.data;
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
        if (cur_item_id === 0 || typeof(cur_item_id) === "undefined") {
            api.createActiveTemplate(item, items)
                .then(() => this.setState({loading: false, recommend_id: null}), onHide(), onReload())
                .catch(error => this.setState({loading: false, error: error}))
        } else {
            api.updateActiveTemplate(cur_item_id, item, items)
                .then(() => this.setState({loading: false}), onHide(), onReload())
                .catch(error => this.setState({loading: false, error: error}))
        }
    }

    onAddChoose(item) {
        const {items, cur_duration_day} = this.state;
        this.setState({show_course: false});
        items.push({
            'course_id': item.id,
            'title': item.name,
            'create_time': item.createdAt,
            'duration_day': cur_duration_day
        });
        this.setState({items: items});
    }

    onMuSelect(e) {
        const {items} = this.state;
        for (let i = 0; i < items.length; i++) {
            if (items[i].course_id.toString() === e) {
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
        for (let i = 0; i < items.length; i++) {
            if (items[i].course_id === cur_course_item_id) {
                items[i].duration_day = e;
                break;
            }
        }
        this.setState({items: items, select_duration_day: e});
        console.log(items);
    };

    onDelItem() {
        if (confirm("你确定删除吗？")) {
            const {items, cur_course_item_id} = this.state;
            for (let i = 0; i < items.length; i++) {
                if (items[i].course_id === cur_course_item_id) {
                    items.splice(i, 1);
                    break;
                }
            }
            this.setState({items: items});
        }
    }

    render() {
        const {loading, error, item, items, show_course, cur_duration_day, select_duration_day} = this.state;
        const format = "YYYY-MM-DD";
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
                        <CourseChoose show={show_course} onHide={() => this.setState({show_course: false})}
                                      onOk={item => {
                                          this.onAddChoose(item, 'course');
                                      }}/>

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
                                            this.setState({});
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
                                <Col sm={2}><ControlLabel>分组</ControlLabel></Col>
                                <Col sm={10}>
                                    <FormControl
                                        componentClass="select"
                                        value={item.group}
                                        onChange={(e) => {
                                            this.state.item.group = e.target.value;
                                            this.setState({});
                                        }}>
                                        <option value=''>无</option>
                                        <option value='test'>测试</option>
                                        <option value='30_a'>30天（通用）体验课</option>
                                        <option value='30_guitar'>30天（吉他）体验课</option>
                                        <option value='30_uk'>30天（尤克里里）体验课</option>
                                        <option value='30_ka'>30天（卡林巴）体验课</option>
                                        <option value='30_fei'>30天（非洲鼓）体验课</option>
                                        <option value='30_piano'>30天（钢琴）体验课</option>
                                        <option value='7_n7'>7天N7体验课</option>
                                        <option value='7_fei'>7天非洲鼓课</option>
                                        ></FormControl>
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
                                <Col sm={2}><ControlLabel>非洲鼓二维码</ControlLabel></Col>
                                <Col sm={10}>
                                    <Upload type="image" url={item.feizhougu_qrcode}
                                            onSuccess={(e) => {
                                                this.state.item.feizhougu_qrcode = e;
                                                this.setState({});
                                            }}/>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 5}}>
                                <Col sm={2}><ControlLabel>钢琴二维码</ControlLabel></Col>
                                <Col sm={10}>
                                    <Upload type="image" url={item.piano_qrcode}
                                            onSuccess={(e) => {
                                                this.state.item.piano_qrcode = e;
                                                this.setState({});
                                            }}/>
                                </Col>
                            </Row>
                            <Row style={{marginTop: 5}}>
                                <Col sm={2}><ControlLabel>课程选择</ControlLabel></Col>
                                <Col sm={6}>
                                    <FormGroup controlId="formControlsSelectMultiple">
                                        <FormControl componentClass="select" multiple
                                                     onChange={e => this.onMuSelect(e.target.value)}
                                                     style={{height: '190px'}}>
                                            {
                                                items.map((item, index) => {
                                                    return (<option key={index}
                                                                    value={item.course_id}>{typeof(item.title) !== "undefined" ? item.title : item.course_id}--->持续天数：{item.duration_day}</option>)
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
                                                onClick={e => {
                                                    e.preventDefault();
                                                    this.setState({show_course: true})
                                                }}>添加素材</Button>
                                        <Button bsSize="sm" bsStyle="link" style={{marginTop: 10}}
                                                onClick={() => this.onDelItem()}>选中删除</Button>
                                    </Col>
                                </Col>
                            </Row>

                            <Button type="submit" bsStyle="success" style={{marginTop: 5, float: "right"}}
                                    onClick={e => {
                                        e.preventDefault();
                                        this.onSubmit();
                                    }}>提交</Button>
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
        this.state = {
            loading: false, error: null, popup: false, items: [], item_id: 0,
            page: 0, size: 20, total: 0, dlg_set: false, dlg_create_code: false, dlg_img: false, dlg_batches: false,
            state: '', cur_img: '', sort: '', group: '', search_title: ''
        }
    }

    onLoadGroup({group='', sort='', state='', title=''}) {
        const {page, size} = this.state;
        this.setState({loading: true});

        api.getActiveTemplates({page: page, size: size, state: state, sort: sort, group: group, title: title})
            .then(json => this.setState({loading: false, items: json.data, total: json.paging.total}))
            .catch(error => this.setState({loading: false, error}));
    }

    onLoad() {
        const {page, size, state, sort, group} = this.state;
        this.setState({loading: true});

        api.getActiveTemplates({page: page, size: size, state: state, sort: sort, group: group})
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

    onCopy(id) {
        if (confirm("你确定复制吗？")) {
            api.copyTemplates(id)
                .then(() => this.setState({loading: false}, this.onLoad))
                .catch(error => this.setState({loading: false, error}));
        }
    }

    onGetBatches(id) {
        this.setState({item_id: id});
        this.setState({dlg_batches: true});
    }

    onReload() {
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
        return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
    };

    onSearchCode() {
        const {code} = this.state;
        this.setState({loading: true});
        api.getSearchCode(code)
            .then(json => {
                this.setState({loading: false});
                if (json.error !== 0){
                    if (code.length >= 6){
                        alert(json.message)
                    }
                }else{
                    let data = json.data;
                    let user_info = data.user;
                    let course_info = data.sup_courses;

                    if (user_info !== {}){
                        let user_show = '激活时间' + data.created_at +
                            '使用人信息：【用户名】： ' + user_info.nickname +
                            ' 【电话】：' + user_info.tel + ' 【用户id】：' + user_info.uid;
                        let course_show = '【课程激活id】：' + course_info.course_id + ' 【课程激活名称】：' + course_info.course_name;
                        alert(user_show + course_show);
                    }
                }
            })
            .catch(error => this.setState({loading: false, error}));
    }

    render() {
        const {
            loading, error, page, size, total, items, popup, state, dlg_set, search_title,
            dlg_create_code, item_id, cur_img, dlg_img, dlg_batches, group
        } = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Popup show={popup} onHide={() => this.setState({popup: false})} onReload={() => this.onReload()}/>
                <Popup show={dlg_set} onHide={() => this.setState({dlg_set: false})} data={item_id}/>
                <ImageShow data={cur_img} show={dlg_img} onHide={() => this.setState({dlg_img: false})}/>
                <CreateCodePopup data={item_id} show={dlg_create_code}
                                 onHide={() => this.setState({dlg_create_code: false})}/>
                <BatchesPopup data={item_id} show={dlg_batches} onHide={() => this.setState({dlg_batches: false})}/>

                <Form inline style={{padding: 3}}>
                    <Button bsSize="sm" bsStyle="primary" style={{float: 'right'}}
                            onClick={() => {
                                this.setState({popup: true})
                            }}>新建</Button>
                    <Button bsSize="sm" style={{float: 'right', marginRight: 10}} onClick={this.onReload}>刷新</Button>
                    <FormGroup bsSize="small" controlId="days">
                        <ControlLabel>排序方式：</ControlLabel>
                        <FormControl componentClass="select"
                                     onChange={e => this.setState({sort: e.target.value}, this.onLoadGroup({sort: e.target.value}))}>
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
                                     onChange={e => this.setState({state: e.target.value}, this.onLoadGroup({state: e.target.value}))}>
                            <option value="">全部</option>
                            <option value='1'>开启</option>
                            <option value='0'>关闭</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup bsSize="small" controlId="days" style={{marginLeft: '20px'}}>
                        <ControlLabel>分组：</ControlLabel>
                        <FormControl
                            componentClass="select"
                            value={group}
                            onChange={(e) => {
                                this.setState({group: e.target.value});
                                this.onLoadGroup({group: e.target.value});
                            }}>
                            <option value=''>无</option>
                            <option value='test'>测试</option>
                            <option value='30_a'>30天（通用）体验课</option>
                            <option value='30_guitar'>30天（吉他）体验课</option>
                            <option value='30_uk'>30天（尤克里里）体验课</option>
                            <option value='30_ka'>30天（卡林巴）体验课</option>
                            <option value='30_fei'>30天（非洲鼓）体验课</option>
                            <option value='30_piano'>30天（钢琴）体验课</option>
                            <option value='7_n7'>7天N7体验课</option>
                            ></FormControl>
                    </FormGroup>
                    <FormGroup bsSize="small" style={{width: '400px', float: 'left'}}>
                        <ControlLabel>模板查询</ControlLabel>
                        <InputGroup>
                            <FormControl
                                type="text" placeholder="请输入模板名称"
                                value={search_title}
                                onChange={e => {
                                    this.setState({page: 0, search_title: e.target.value.trim()})
                                    this.onLoadGroup({title: e.target.value.trim()})
                                }}
                            />
                        </InputGroup>
                    </FormGroup>
                </Form>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>编号</th>
                        <th>状态</th>
                        <th>标题</th>
                        <th>有效时间</th>
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
                            if (item.state === 0) {
                                state = '关闭';
                                state_color = 'red';
                            }
                            return (
                                <tr id={item.id} key={item.id}>
                                    <td>{item.id}</td>
                                    <td><Glyphicon glyph="apple" style={{color: state_color}}/>{state}</td>
                                    <td>{item.title}</td>
                                    <td>{valid_dt}</td>
                                    <td>{create_time}</td>
                                    <td>
                                        <Button bsSize="xs" bsStyle="warning" style={{marginLeft: 4}}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    this.setState({
                                                        dlg_set: true,
                                                        item_id: e.target.parentNode.parentNode.id
                                                    })
                                                }}>编辑</Button>
                                        <Button bsSize="xs" bsStyle="danger" style={{marginLeft: 4}}
                                                onClick={() => {
                                                    this.onDelete(id);
                                                }}>删除</Button>
                                        <Button bsSize="xs" bsStyle="success" style={{marginLeft: 4}}
                                                onClick={() => {
                                                    this.onCopy(id);
                                                }}>复制</Button>
                                        <br/>
                                        <Button bsSize="xs" bsStyle="info" style={{marginLeft: 4}}
                                                onClick={e => {
                                                    e.preventDefault();
                                                    this.setState({
                                                        dlg_create_code: true,
                                                        item_id: e.target.parentNode.parentNode.id
                                                    });
                                                }}>创建激活码</Button>
                                        <Button bsSize="xs" bsStyle="success" style={{marginLeft: 4}}
                                                onClick={() => {
                                                    this.setState({item_id: id});
                                                    this.onGetBatches(id);
                                                }}>批号列表</Button>
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
