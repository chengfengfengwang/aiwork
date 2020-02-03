/**
 * Created by mac on 2017/10/16.
 */
import React from "react";
import Waiting from "./Waiting";
import Error2 from "./Error2";
import ControlLabel from 'react-bootstrap/lib/ControlLabel';
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import {Form, Table, Button, Modal, Col} from "react-bootstrap";
import ThePagination from "./Pagination";
import * as api from "../api";
import {Link} from "react-router-dom";
import moment from "moment";
import ElementEdit from "./ElementEdit";
class Editing extends React.Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.state = {
            promo: props.promo,
            index: props.index
        }
    }

    onChange(key, value) {
        const {promo, index} = this.state;
        promo[index][key] = value;
        this.forceUpdate();
    }

    componentWillReceiveProps(props) {
        this.setState({promo: props.promo, index: props.index})
    }

    render() {
        const {isVisible, onOk, onCancel, promo, index} = this.props;
        return (
            <Modal.Dialog style={{display: isVisible ? 'block' : 'none'}}>
                <Modal.Header>
                    <Modal.Title>编辑</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                            <Form horizontal>
                                <FormGroup>
                                    <Col sm={2}>
                                        <ControlLabel>说明</ControlLabel>
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl
                                        // value={promo ? '' : promo[index].extra_info}
                                        onChange={e => this.onChange('extra_info', e.target.value)}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={2}>
                                        <ControlLabel>渠道名</ControlLabel>
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl
                                        // value={promo ? '' : promo[index].extra_info}
                                        onChange={e => this.onChange('channel', e.target.value)}/>
                                    </Col>
                                </FormGroup>
                                <FormGroup>
                                    <Col sm={2}>
                                        <ControlLabel>电话</ControlLabel>
                                    </Col>
                                    <Col sm={10}>
                                        <FormControl
                                        // value={promo ? '' : promo[index].extra_info}
                                        onChange={e => this.onChange('phone', e.target.value)}/>
                                    </Col>
                                </FormGroup>
                            </Form>
                    }
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => onOk(promo[index].extra_info, promo[index].channel, promo[index].phone)} bsStyle="primary">确定</Button>
                    <Button onClick={() => onCancel()}>取消</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}

export default class PromoInfoSum extends React.Component {

    constructor(props) {
        super(props);
        this.onLoad = this.onLoad.bind(this);
        this.state = {
            loading: false,
            error: null,
            page: 0,
            size: 10,
            total: 0,
            promos: [],
            editing: false,
            activeIndex: 1,
            extraInfo: '',
            start: '',
            end: '',
            channel: '',
            phone: '',
            goods: null,
            keyword: '',
            channel_list: []
        }
    }

    onLoad() {
        const {page, size, keyword, mark} = this.state;
        this.setState({loading: true, error: null});
        api.getPromoInfo({page, size, keyword, mark})
            .then(json => this.setState({
                loading: false,
                promos: json.data,
                total: json.total,
                channel_list: json.channel_list
            }))
            .catch(error => this.setState({
                loading: false,
                error: error
            }))
    }

    onUpdatePromoDescription(id, text, channel, end_id, channel_phone, phone) {
        this.setState({loading: true});
        api.updatePromoDescription(id, text, channel, end_id, channel_phone, phone)
            .then(json => this.setState({loading: false}))
            .catch(error => this.setState({error}))
    }

    onGenPromoCode(start, end, count, channel, phone, goods = null) {
        this.setState({loading: true});
        api.onGenPromoCode(start, end, count, channel, phone, goods)
            .then(json => this.setState({loading: false}))
            .catch(error => this.setState({error: error, loading: false}))
    }

    componentDidMount() {
        this.onLoad();
    }

    render() {
        const {loading, error, promos, page, size, total, editing, activeIndex, extraInfo, start, end, count, channel, phone, goods, keyword, channel_list, mark} = this.state;
        return (
            <div style={{marginTop: 5}}>
                <Waiting isVisible={loading}/>
                <Error2 error={error} onOk={() => this.setState({error: null})}/>
                <Editing
                    isVisible={editing}
                    onCancel={() => this.setState({editing: false})}
                    onOk={(extraInfo, channel, phone) => this.setState({editing: false}, () => this.onUpdatePromoDescription(promos[activeIndex].start, extraInfo, channel, promos[activeIndex].end, promos[activeIndex].channel_phone, phone))}
                    promo={promos}
                    index={activeIndex}
                />
                <Form inline style={{padding: 3, marginTop: 10}}>
                    <ControlLabel>关键字:</ControlLabel>
                    &nbsp;
                    <FormControl
                        bsSize="sm" value={keyword} placeholder="请输入关键字"
                        onChange={e => this.setState({page: 0, keyword: e.target.value.trim()}, this.onLoad)}>
                    </FormControl>
                    &nbsp;
                    <ControlLabel>号段:</ControlLabel>
                    &nbsp;
                    <FormControl
                        bsSize="sm" value={mark} placeholder="请输入准确号段"
                        onChange={e => this.setState({page: 0, mark: e.target.value.trim()}, this.onLoad)}>
                    </FormControl>
                </Form>

                <br/>
                <p><b>渠道激活前十：</b></p>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        {
                            channel_list.map((info, index) => {
                                return (
                                    <th>{
                                        (() => {
                                            let query = [];
                                            if (info.name) {
                                                query.push(['channel', info.name]);
                                            }
                                            return (
                                                <Link
                                                    to={`channel_promo?${query.map(x => x.join('=')).join('&')}`}>{info.name}</Link>
                                            );
                                        })()
                                    }</th>
                                )
                            })
                        }
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                        {
                            channel_list.map((info, index) => {
                                return (
                                    <th>{info.count}</th>
                                )
                            })
                        }
                    </tr>
                    </tbody>
                </Table>

                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        <th>渠道</th>
                        <th>编号</th>
                        <th>激活个数</th>
                        <th>总个数</th>
                        <th>说明</th>
                        <th>渠道商电话</th>
                        <th>编辑信息</th>
                        <th>导出</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        promos.map((info, index) => {
                            return (
                                <tr key={index}>
                                    <td>{
                                        (() => {
                                                let query = [];
                                                if (info.channel) {
                                                    query.push(['channel', info.channel]);
                                                }
                                                return (
                                                    <Link
                                                        to={`channel_promo?${query.map(x => x.join('=')).join('&')}`}>{info.channel}</Link>
                                                );
                                        })()
                                    }
                                    </td>
                                    <td>{`${info.start} ~ ${info.end}`}</td>
                                    <td>{info.active_count}</td>
                                    <td>{info.count}</td>
                                    <td>{info.extra_info}</td>
                                    <td>{info.channel_phone}</td>
                                    <td><Button
                                    onClick = {() => this.setState({'editing': true, 'activeIndex': index})}
                                    >+</Button></td>
                                    <td>
                                         <form action="http://iguitar.immusician.com:2525/v3/promo/export/xlsx/" method="get">
                                            <FormControl type="text" name="start_id" value={info.start} style={{display:'none'}}/>
                                            <FormControl type="text" name="end_id" value={info.end} style={{display:'none'}}/>
                                            <FormControl type="submit" value="导出批号下激活码" />
                                        </form>
                                    </td>
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </Table>
                <ThePagination page={page} size={size} total={total}
                               onSelect={page => this.setState({page}, this.onLoad)}/>
                支持直接覆盖，分配号码请慎重，仔细检查
                <br/>
                生成激活码请在链接：http://iguitar.immusician.com:2525/v3/help/promo_code 查找
                <br/>
                数量:<ElementEdit
                value={count}
                onValueChange={(value) => this.setState({count: value})}/>
                渠道:<ElementEdit
                value={channel}
                onValueChange={(value) => this.setState({channel: value})}/>
                电话号码:<ElementEdit
                value={phone}
                onValueChange={(value) => this.setState({phone: value})}/>
                <br/>

                提交按钮，提交前请再三确认
                <Button bsStyle="success" onClick={() => this.onGenPromoCode(start, end, count, channel, phone, goods)}>
                    提交(请务必确认)
                </Button>
            </div>
        );
    }
}
