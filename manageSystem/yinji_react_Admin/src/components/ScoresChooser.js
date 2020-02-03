/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/7 上午10:06
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, FormControl, FormGroup, Glyphicon, InputGroup, Modal, Row, Table} from "react-bootstrap";
import ElementView from "./ElementView";
import MaterialDetail from "./MaterialDetail";
import * as MaterialsHelper from "../helpers/MaterialsHelper";
import ThePagination from "./Pagination";
import * as api from "../api";

export default class ScoresChooser extends Component {
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        onOk: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            keyword: '',
            page: 0,
            size: 10,
            total: 0,
            scores: [],
            activeIndex: 0,
            instrumentType: 'guitar'
        }
    }

    queryScores() {
        this.setState({loading: true});
        const {page, size, keyword, instrumentType} = this.state;
        api.getMaterials({page, size, keyword, instrumentType, type: 'score'}).then(json => {
            this.setState({
                loading: false,
                scores: json.data,
                activeIndex: 0,
                total: json.paging.total
            })
        })
    }

    componentDidMount() {
        this.queryScores();
    }

    render() {
        const {isVisible, onOk, onCancel} = this.props;
        const {keyword, page, size, total, scores, activeIndex, loading, instrumentType} = this.state;
        const activeScore = scores[activeIndex];
        const scoreFields = MaterialsHelper.getViewableFields({type: 'score'});
        const queryScores = this.queryScores.bind(this);
        return (
            <Modal.Dialog className="large-dialog" style={{display: isVisible ? 'block' : 'none'}}>
                <Modal.Header>
                    <Modal.Title>请选择曲谱</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="form-inline">
                        <FormGroup controlId="keyword" bsSize="small">
                            <InputGroup>
                                <FormControl
                                    type="text" placeholder="请输入关键字"
                                    value={keyword}
                                    onChange={e => this.setState({
                                        page: 0,
                                        keyword: e.target.value.trim()
                                    }, () => queryScores())}/>
                                <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                        &nbsp;
                        <FormGroup controlId="instrumentType" bsSize="small">
                            <InputGroup>
                                <FormControl
                                    componentClass="select" value={instrumentType}
                                    onChange={e => {
                                        this.setState({page: 0, instrumentType: e.target.value}, () => {
                                            queryScores()
                                        })
                                    }}
                                >
                                    <option value="music_basis">音基</option>
                                    <option value="guitar">吉他</option>
                                    <option value="ukulele">尤克里里</option>
                                    <option value="kalimba">卡林巴</option>
                                    <option value="djembe">非洲鼓</option>

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
                                        <th>ID</th>
                                        <th>名称</th>
                                        <th>用户</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {
                                        scores.map((score, index) => {
                                            return (
                                                <tr key={index}
                                                    className={activeIndex === index ? 'active' : ''}
                                                    onClick={() => this.setState({activeIndex: index})}
                                                >
                                                    <td>{score.id}</td>
                                                    <td>{score.name}</td>
                                                    <td><ElementView type='user' value={score.user}/></td>
                                                </tr>
                                            );
                                        })
                                    }
                                    </tbody>
                                </Table>
                            </Col>
                            <Col sm={8}>
                                {
                                    loading ?
                                        'Loading.'
                                        :
                                        activeScore ?
                                            <MaterialDetail material={activeScore} fields={scoreFields}/>
                                            :
                                            '未选中曲谱。'
                                }
                            </Col>
                        </Row>
                        <ThePagination
                            page={page} size={size} total={total}
                            onSelect={page => {
                                console.log('This, ', this);
                                this.setState({page: page}, () => {
                                    queryScores()
                                });
                            }}
                            style={{margin: 0}}
                        />
                    </div>
                </Modal.Body>

                <Modal.Footer>
                    <Button
                        onClick={() => onOk(activeScore)}
                        bsStyle="primary"
                        disabled={!activeScore}
                    >确定</Button>
                    <Button onClick={() => {
                        onCancel()
                    }}>取消</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}
