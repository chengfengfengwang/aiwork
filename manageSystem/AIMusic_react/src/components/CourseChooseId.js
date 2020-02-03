/**
 * Author: wcl
 * Datetime: 2019/01/24 17:06
 */

import React, {Component} from "react";
import {
    Button,
    Col,
    ControlLabel,
    FormControl,
    FormGroup,
    Glyphicon,
    InputGroup,
    Modal,
    Row,
    Table
} from "react-bootstrap";
import * as api from "../api";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class CourseChoose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, page: 0, size: 20, total: 0, items: [], instrumentType: '', level: '',
            keyword: '', sort: 'updated_at, -1', price: '', list_res: '',
        }
    }

    queryScores() {
        this.setState({loading: true});
        const {page, size, instrumentType, level, keyword, price, sort} = this.state;
        api.getCoursesIndex({
            page: page,
            size: size,
            instrumentType: instrumentType,
            level: level,
            keyword: keyword,
            price: price,
            sort: sort
        }).then(json => {
            this.setState({
                loading: false,
                items: json.data,
                list_res: json.list_res,
                // total: json.paging.total
            });
        })
    }

    componentDidMount() {
        this.queryScores();
    }

    render() {
        const {} = this.props;
        const {items, instrumentType, list_res, level, page, size, total, keyword, price} = this.state;
        return (
            <Modal{...this.props} bsSize="lg" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-lg">请选择课程</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="form-inline">
                        <FormGroup bsSize="small">
                            <ControlLabel>排序方式：</ControlLabel>
                            <FormControl componentClass="select"
                                         onChange={e => this.setState({sort: e.target.value}, this.queryScores)}>
                                <option value='_id, 1'>ID递增</option>
                                <option value='_id, -1'>ID递减</option>
                                <option value='order, 1'>权重递增</option>
                                <option value='order, -1'>权重递减</option>
                                <option value='name, 1'>名称递增</option>
                                <option value='name, -1'>名称递减</option>
                                <option value='updated_at, 1'>更新时间递增</option>
                                <option value='updated_at, -1'>更新时间递减</option>
                            </FormControl>
                        </FormGroup>
                        <FormGroup controlId="instrumentType" bsSize="small" style={{marginLeft: '20px'}}>
                            <InputGroup>
                                <FormControl
                                    componentClass="select" value={instrumentType}
                                    onChange={e => {
                                        this.setState({page: 0, instrumentType: e.target.value}, () => {
                                            this.queryScores()
                                        })
                                    }}>
                                    <option value="">全部</option>
                                    <option value="0">吉他</option>
                                    <option value="1">尤克里里</option>
                                    <option value="2">卡林巴</option>
                                    <option value="3">非洲鼓</option>
                                    <option value="4">钢琴</option>
                                    <option value="5">音基</option>
                                    <option value="6">口琴</option>

                                </FormControl>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup bsSize="small" style={{marginLeft: '20px'}}>
                            <InputGroup>
                                <FormControl
                                    componentClass="select" value={level}
                                    onChange={e => {
                                        this.setState({page: 0, level: e.target.value}, () => {
                                            this.queryScores()
                                        })
                                    }}>
                                    <option value="">全部</option>
                                    <option value="1">必修</option>
                                    <option value="2">选修</option>
                                </FormControl>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup bsSize="small" style={{marginLeft: '20px'}}>
                            <ControlLabel>关键字</ControlLabel>
                            <InputGroup>
                                <FormControl
                                    type="text" placeholder="请输入关键字"
                                    value={keyword}
                                    onChange={e => this.setState({
                                        page: 0,
                                        keyword: e.target.value.trim()
                                    }, () => this.queryScores())}/>
                                <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                        <FormGroup bsSize="small" style={{marginLeft: '20px'}}>
                            <ControlLabel>价格</ControlLabel>
                            <InputGroup>
                                <FormControl
                                    type="text" placeholder="请输入价格"
                                    value={price}
                                    onChange={e => this.setState({
                                        page: 0,
                                        price: e.target.value.trim()
                                    }, () => this.queryScores())}/>
                            </InputGroup>
                        </FormGroup>
                        <CopyToClipboard text={list_res} style={{marginLeft: '20px'}}
                                         onCopy={() => this.setState({copied: true})}>
                            <Button bsStyle="primary">复制</Button>
                        </CopyToClipboard>
                        <FormControl
                            componentClass="select"
                            style={{minWidth: 860 + 'px', minHeight: 160 + 'px', marginTop: 2 + 'px'}}
                            componentClass="textarea"
                            placeholder="商品ID或Goods_id"
                            value={list_res}
                        />
                    </div>
                    <div>
                        <Row style={{paddingTop: 5}}>
                            <Col sm={12}>
                                <Table bordered hover striped condensed responsive className="selectable">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>商品id</th>
                                        <th>课程名称</th>
                                        <th>类型</th>
                                        <th>价格</th>
                                        {/*<th id="selectAll">选择</th>*/}
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        items.map((course, index) => {
                                            return (
                                                <tr key={index}>
                                                    <td>{course.id}</td>
                                                    <td>{course.goodsId}</td>
                                                    <td>{course.name}</td>
                                                    <td>{
                                                        (function (course) {
                                                            switch (course.level) {
                                                                case 1:
                                                                    return '必修';
                                                                    break;

                                                                case 2:
                                                                    return '选修';
                                                                    break;
                                                                default:
                                                                    return '未知';
                                                            }
                                                        })(course)}
                                                    </td>
                                                    <td>{course.price}</td>
                                                    {/*<td>*/}
                                                    {/*<input style={{marginLeft: 12 + 'px'}} type="checkbox" name="fruit" value="apple" onChange={this.handleChange}/>*/}
                                                    {/*</td>*/}
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </Col>
                            {/*<Col sm={8}>*/}
                            {/*{*/}
                            {/*loading ? 'Loading.' : activeItem ?*/}
                            {/*<MaterialDetail material={activeItem} fields={itvFields}/> : '未选中曲谱。'*/}
                            {/*}*/}
                            {/*</Col>*/}
                        </Row>
                        {/*<ThePagination*/}
                        {/*page={page} size={size} total={total}*/}
                        {/*onSelect={page => {*/}
                        {/*console.log('This, ', this);*/}
                        {/*this.setState({page: page}, () => {*/}
                        {/*this.queryScores()*/}
                        {/*});*/}
                        {/*}}*/}
                        {/*style={{margin: 0}}*/}
                        {/*/>*/}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
