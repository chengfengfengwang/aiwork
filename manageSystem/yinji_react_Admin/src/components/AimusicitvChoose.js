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

export default class AimusicitvChoose extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true, page: 0, size: 10, total: 0, itvs: [], activeIndex: 0, instrumentType: 'guitar',
            keyword: '', sort: 'updated_at, -1'
        }
    }

    queryScores() {
        this.setState({loading: true});
        const {page, size, instrumentType, keyword, sort} = this.state;
        api.getItvs({page: page, size: size, instrumentType: instrumentType, sort: sort, keyword: keyword}).then(json => {
            this.setState({
                loading: false, itvs: json.data, activeIndex: 0, total: json.paging.total
            });
        })
    }

    componentDidMount() {
        this.queryScores();
    }

    render() {
        const {} = this.props;
        const {itvs, activeIndex, instrumentType, page, size, total, loading, keyword} = this.state;
        let activeItv = itvs[activeIndex];
        if (activeItv){
            activeItv['id'] = (activeItv.id instanceof Object) ? activeItv.id.$oid: activeItv.id;
        }
        const itvFields = MaterialsHelper.getViewableFields({type: 'itv'});
        return (
            <Modal{...this.props} bsSize="lg" aria-labelledby="contained-modal-title-lg">
                <Modal.Header closeButton>
                  <Modal.Title id="contained-modal-title-lg">请选择itv</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="form-inline">
                      <FormGroup bsSize="small">
                        <ControlLabel>排序方式：</ControlLabel>
                        <FormControl componentClass="select"
                                     onChange={e => this.setState({sort: e.target.value}, this.queryScores)}>
                            <option value='_id, 1'>ID递增</option>
                            <option value='_id, -1'>ID递减</option>
                            <option value='name, 1'>名称递增</option>
                            <option value='name, -1'>名称递减</option>
                            <option value='updated_at, 1'>更新时间递增</option>
                            <option value='updated_at, -1'>更新时间递减</option>
                        </FormControl>
                    </FormGroup>
                    <FormGroup controlId="instrumentType" bsSize="small" style={{marginLeft: '20px'}}>
                        <ControlLabel>乐器类型：</ControlLabel>
                        <InputGroup>
                            <FormControl
                                componentClass="select" value={instrumentType}
                                onChange={e => {
                                    this.setState({page: 0, instrumentType: e.target.value}, () => {
                                        this.queryScores()
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
                      <FormGroup bsSize="small" style={{marginLeft: '20px'}}>
                            <ControlLabel>关键字搜索</ControlLabel>
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
                                        itvs.map((itv, index) => {
                                            let id = itv.id;
                                            if (id instanceof Object){
                                                id = id.$oid;
                                            }
                                            return (
                                                <tr key={index}
                                                    className={activeIndex === index ? 'active' : ''}
                                                    onClick={() => this.setState({activeIndex: index})}
                                                >
                                                    <td>{itv.itvTitle}</td>
                                                    <td>{itv.add_time_}</td>
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
                                        activeItv ?
                                            <MaterialDetail material={activeItv} fields={itvFields}/>
                                            :
                                            '未选中视频。'
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
                    <Button onClick={() => this.props.onOk(activeItv)} bsStyle="primary" disabled={!activeItv}>确定</Button>
                    <Button onClick={this.props.onHide}>Close</Button>
                </Modal.Footer>
              </Modal>
        )
    }
}
