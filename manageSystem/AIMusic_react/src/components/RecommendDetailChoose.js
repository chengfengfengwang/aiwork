/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/7 上午10:06
 */

import React, {Component} from "react";
import {Button, Col, FormControl, FormGroup, InputGroup, Modal, Row, Table} from "react-bootstrap";
import * as api from "../api";
import MaterialDetail from "./MaterialDetail";
import ThePagination from "./Pagination";
import * as MaterialsHelper from "../helpers/MaterialsHelper";

export default class RecommendDetailChoose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, page: 0, size: 10, total: 0, items: [], activeIndex: 0, instrumentType: 'guitar'
        }
    }

    queryScores() {
        this.setState({loading: true});
        const {page, size, instrumentType} = this.state;
        api.getRecommendDetails({page:page, size:size, instrument_type:instrumentType}).then(json => {
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
        const {items, activeIndex, instrumentType, page, size, total, loading} = this.state;
        const activeItem = items[activeIndex];
        const itvFields = MaterialsHelper.getViewableFields({type: 'recommend_detail'});
        return (
            <Modal{...this.props} bsSize="lg" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-lg">请选择推荐详细</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="form-inline">
                        <FormGroup controlId="instrumentType" bsSize="small">
                            <InputGroup>
                                <FormControl
                                    componentClass="select" value={instrumentType}
                                    onChange={e => {
                                        this.setState({page: 0, instrumentType: e.target.value}, () => {
                                            this.queryScores()
                                        })
                                    }}
                                >
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
                    </div>
                    <div>
                        <Row style={{paddingTop: 5}}>
                            <Col sm={4}>
                                <Table bordered hover striped condensed responsive className="selectable">
                                    <thead>
                                    <tr>
                                        <th>标题</th>
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
                                                    <td>{course.title}</td>
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
