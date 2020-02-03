import React, {Component} from "react";
import {Button, Col, FormControl, FormGroup, Glyphicon, InputGroup, Modal, Row, Table} from "react-bootstrap";
import ElementView from "./ElementView";
import MaterialDetail from "./MaterialDetail";
import * as MaterialsHelper from "../helpers/MaterialsHelper";
import ThePagination from "./Pagination";
import * as api from "../api";

export default class ScoresChooserModel extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            page: 0,
            size: 10,
            total: 0,
            scores: [],
            activeIndex: 0,
            search_name: '',
            instrumentType: 'guitar'
        }
    }

    queryScores() {
        this.setState({loading: true});
        const {page, size, instrumentType, search_name} = this.state;
        api.getScores({page, size, instrumentType, search_name}).then(json => {
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
        const {search_name, page, size, total, scores, activeIndex, loading, instrumentType} = this.state;
        const activeScore = scores[activeIndex];
        const scoreFields = MaterialsHelper.getViewableFields({type: 'scores'});
        const queryScores = this.queryScores.bind(this);
        return (
            <Modal{...this.props} bsSize="lg" aria-labelledby="contained-modal-title-lg">
                <Modal.Header>
                    <Modal.Title>请选择曲谱</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="form-inline">
                        <FormGroup controlId="keyword" bsSize="small">
                            <InputGroup>
                                <FormControl
                                    type="text" placeholder="请输入关键字"
                                    value={search_name}
                                    onChange={e => this.setState({
                                        page: 0,
                                        search_name: e.target.value.trim()
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
                                        <th>ID</th>
                                        <th>名称</th>
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
                                            '请进行搜索。'
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
                    <Button onClick={() => this.props.onOk(activeScore)} bsStyle="primary" disabled={!activeScore}>确定</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
            </Modal>
        )
    }
}
