/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/7 上午10:06
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
import MaterialDetail from "./MaterialDetail";
import ThePagination from "./Pagination";
import * as MaterialsHelper from "../helpers/MaterialsHelper";

export default class CourseChoose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, page: 0, size: 10, total: 0, items: [], activeIndex: 0, instrumentType: 'guitar',
            keyword: '', sort: 'updated_at, -1'
        }
    }

    queryScores() {
        this.setState({loading: true});
        const {page, size, instrumentType, keyword, sort} = this.state;
        api.getCourses({page:page, size:size, instrumentType:instrumentType, keyword: keyword, sort: sort}).then(json => {
            this.setState({
                loading: false,
                items: json.data,
                activeIndex: 0,
                total: json.paging.total
            });
        })
    }

    componentDidMount() {
        this.queryScores();
    }

    render() {
        const {} = this.props;
        const {items, activeIndex, instrumentType, page, size, total, loading, keyword} = this.state;
        const activeItem = items[activeIndex];
        const itvFields = MaterialsHelper.getViewableFields({type: 'course'});
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
                                    <option value="guitar">吉他</option>
                                    <option value="ukulele">尤克里里</option>
                                    <option value="kalimba">卡林巴</option>
                                    <option value="djembe">非洲鼓</option>
                                    <option value="piano">钢琴</option>
                                    <option value="music_basis">音基</option>
                                    <option value="harmonica">口琴</option>

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
                    </div>
                    <div>
                        <Row style={{paddingTop: 5}}>
                            <Col sm={4}>
                                <Table bordered hover striped condensed responsive className="selectable">
                                    <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>添加时间</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        items.map((course, index) => {
                                            return (
                                                <tr key={index}
                                                    className={activeIndex === index ? 'active' : ''}
                                                    onClick={() => this.setState({activeIndex: index})}
                                                >
                                                    <td>{course.name}</td>
                                                    <td>{course.createdAt}</td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </Col>
                            <Col sm={8}>
                                {
                                    loading ? 'Loading.' : activeItem ? <MaterialDetail material={activeItem} fields={itvFields}/> : '未选中曲谱。'
                                }
                            </Col>
                        </Row>
                        <ThePagination
                            page={page} size={size} total={total}
                            onSelect={page => {
                                console.log('This, ', this);
                                this.setState({page: page}, () => {
                                    this.queryScores()
                                });
                            }}
                            style={{margin: 0}}
                        />
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => this.props.onOk(activeItem)} bsStyle="primary" disabled={!activeItem}>确定</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
              </Modal>
        )
    }
}
