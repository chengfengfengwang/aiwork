/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/1 下午3:35
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {
    Button, ControlLabel, FormControl, Modal, FormGroup, InputGroup, Glyphicon,
    Col, Row, DropdownButton, MenuItem
} from 'react-bootstrap'
import * as selectors from "../reducers/selectors";
import {connect} from "react-redux";
import * as actions from "../actions/index";
import {MaterialsTable} from "./MaterialsTable";
import * as MaterialsHelper from "../helpers/MaterialsHelper";
import MaterialDetail from "./MaterialDetail";
import ThePagination from "./Pagination";
import MaterialTypeSelect from "./MaterialTypeSelect";
import InstrumentTypeSelect from "./InstrumentTypeSelect";


@connect((state, props) => {
        const {selectedIndex, materials, type} = selectors.materialsChooserSelector(state);
        const briefFields = MaterialsHelper.getViewableFields({type}).filter(([key]) =>
            ['id', 'type', 'instrumentType', 'name'].includes(key));
        const detailFields = materials[selectedIndex] ? MaterialsHelper.getViewableFields({type}) : [];
        return {...selectors.materialsChooserSelector(state), briefFields, detailFields};
    },
    {
        onOk: (material) => actions.materialsChooserOk(material),
        onCancel: () => actions.materialsChooserCancel(),
        onCustom: type => actions.materialsChooserCustom(type),
        onQueryMaterials: (condition) => actions.requestMaterialsChooserMaterials(condition),
        onSelect: (index) => actions.updateMaterialsChooserSelectedIndex(index)
    }
)
export default class MaterialsChooser extends Component {
    //
    static propTypes = {
        isVisible: PropTypes.bool.isRequired,
        page: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        total: PropTypes.number.isRequired,
        keyword: PropTypes.string,
        type: PropTypes.string.isRequired,
        instrumentType: PropTypes.string.isRequired,
        isOfficial: PropTypes.any.isRequired,
        onOk: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onCustom: PropTypes.func.isRequired,
        selectedIndex: PropTypes.number,
        materials: PropTypes.arrayOf(PropTypes.object).isRequired,
        onQueryMaterials: PropTypes.func.isRequired,
        briefFields: PropTypes.arrayOf(PropTypes.array).isRequired,
        detailFields: PropTypes.arrayOf(PropTypes.array).isRequired,
        onSelect: PropTypes.func.isRequired,
    };


    componentDidMount() {
        const {onQueryMaterials, keyword, page, size, isOfficial, type, instrumentType} = this.props;
        onQueryMaterials({page, size, keyword, isOfficial, type, instrumentType});
    }


    render() {
        const {
            page, size, total, keyword, isOfficial, type, instrumentType, materials, briefFields, detailFields,
            onOk, onCancel, onCustom, onSelect, selectedIndex, isVisible, onQueryMaterials,
        } = this.props;
        const material = materials[selectedIndex];
        return (
            <Modal.Dialog className="large-dialog" style={{display: isVisible ? 'block' : 'none'}}>
                <Modal.Header>
                    <Modal.Title>请选择素材</Modal.Title>
                </Modal.Header>


                <Modal.Body>
                    <div className="form-inline">
                        <ControlLabel>类型:</ControlLabel>
                        &nbsp;
                        <FormGroup>
                            <MaterialTypeSelect
                                value={type}
                                onSelect={(type) => onQueryMaterials({page: 0, type})}/>
                        </FormGroup>
                        &nbsp;&nbsp;
                        <ControlLabel>乐器:</ControlLabel>
                        &nbsp;
                        <FormGroup>
                            <InstrumentTypeSelect
                                value={instrumentType}
                                onSelect={(instrumentType) => onQueryMaterials({page: 0, instrumentType})}/>
                        </FormGroup>
                        &nbsp;&nbsp;
                        <FormGroup controlId="keyword" bsSize="small">
                            <InputGroup>
                                <FormControl
                                    type="text" placeholder="请输入关键字"
                                    value={keyword}
                                    onChange={(e) => onQueryMaterials({page: 0, keyword: e.target.value.trim()})}/>
                                <InputGroup.Addon><Glyphicon glyph="search"/></InputGroup.Addon>
                            </InputGroup>
                        </FormGroup>
                        &nbsp;
                        &nbsp;
                        <FormGroup controlId="isOfficial" bsSize="small">
                            <InputGroup>
                                <InputGroup.Addon>官方</InputGroup.Addon>
                                <FormControl
                                    value={isOfficial}
                                    componentClass="select"
                                    onChange={(e) => onQueryMaterials({page: 0, isOfficial: e.target.value})}
                                >
                                    <option value={'all'}>全部</option>
                                    <option value={true}>是</option>
                                    <option value={false}>否</option>
                                </FormControl>
                            </InputGroup>
                        </FormGroup>
                    </div>
                    {
                        materials ?
                            <div>
                                <Row style={{paddingTop: 5}}>
                                    <Col sm={4}>
                                        <MaterialsTable
                                            materials={materials} fields={briefFields} activeIndex={selectedIndex}
                                            onSelect={(index) => onSelect(index)}
                                        />
                                    </Col>
                                    <Col sm={8}>
                                        {
                                            material ?
                                                <MaterialDetail material={material} fields={detailFields}/>
                                                :
                                                '未选中素材。'
                                        }
                                    </Col>
                                </Row>
                                <ThePagination
                                    page={page} size={size} total={total}
                                    onSelect={page => onQueryMaterials({page})}
                                    style={{margin: 0}}
                                />
                            </div>
                            :
                            'loading...'
                    }
                </Modal.Body>

                <Modal.Footer>
                    <DropdownButton
                        id="nani"
                        bsStyle="warning"
                        title="新建素材"
                        onSelect={onCustom}
                        style={{marginRight: 5 + 'px'}}
                        dropup
                    >
                        <MenuItem eventKey="video">视频</MenuItem>
                        <MenuItem eventKey="audio">音频</MenuItem>
                        <MenuItem eventKey="image">图片</MenuItem>
                        <MenuItem eventKey="chordGroup">和弦组</MenuItem>
                        <MenuItem eventKey="newChordGroup">和弦组</MenuItem>
                        <MenuItem eventKey="tuner">调音器</MenuItem>
                        <MenuItem eventKey="choiceGroup">选择题组</MenuItem>
                        <MenuItem eventKey="choice">选择题</MenuItem>
                        <MenuItem eventKey="gameGuide">引导小游戏</MenuItem>

                    </DropdownButton>
                    <Button
                        onClick={() => onOk(material)}
                        bsStyle="primary"
                        disabled={!material}
                    >确定</Button>
                    <Button onClick={() => {
                        onCancel()
                    }}>取消</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}
