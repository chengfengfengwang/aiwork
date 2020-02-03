/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/16 下午4:50
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, ControlLabel, Form, FormControl, FormGroup, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as _ from "lodash";

import Pagination from "./Pagination";
import MaterialTypeSelect from "./MaterialTypeSelect";
import InstrumentTypeSelect from "./InstrumentTypeSelect";
import * as MaterialsHelper from "../helpers/MaterialsHelper";
import ElementView from "./ElementView";
import * as actions from "../actions";
import * as selectors from "../reducers/selectors";

@connect((state) => {
    const materialsManagement = selectors.materialsManagementSelector(state);
    const fields = MaterialsHelper.getViewableFields({type: materialsManagement.type, simple: true});
    return {...materialsManagement, fields}
}, {
    onQueryMaterials: (condition) => actions.requestMaterials(_.pickBy(condition, x => x !== undefined)),
    onDeleteMaterial: (id) => actions.requestDeleteMaterial(id),
})
export default class MaterialsIndex extends Component {
    static propTypes = {
        materials: PropTypes.arrayOf(PropTypes.object).isRequired,
        fields: PropTypes.arrayOf(PropTypes.array).isRequired,
        page: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        type: PropTypes.string.isRequired,
        instrumentType: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        onQueryMaterials: PropTypes.func.isRequired,
        onDeleteMaterial: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {page, size, instrumentType, type, onQueryMaterials, userId} = this.props;
        onQueryMaterials({page, size, type, instrumentType, userId});
    }

    render() {
        const {
            materials, type, fields, instrumentType, page, size,
            keyword, isOfficial, sort, total, onQueryMaterials, onDeleteMaterial, userId
        } = this.props;
        return (
            <div>
                <Form inline style={{padding: 3}}>
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
                    <ControlLabel>官方</ControlLabel>
                    &nbsp;
                    <FormControl
                        bsSize="sm" componentClass="select" value={isOfficial}
                        onChange={e => onQueryMaterials({page: 0, isOfficial: e.target.value})}
                    >
                        <option value={'all'}>全部</option>
                        <option value={true}>是</option>
                        <option value={false}>否</option>
                    </FormControl>
                    &nbsp;&nbsp;
                    <ControlLabel>排序</ControlLabel>
                    &nbsp;
                    <FormControl
                        componentClass="select" value={sort} bsSize="sm"
                        onChange={e => onQueryMaterials({page: 0, sort: e.target.value})}
                    >
                        <option value='_id, 1'>ID递增</option>
                        <option value='_id, -1'>ID递减</option>
                        <option value='name, 1'>名称递增</option>
                        <option value='name, -1'>名称递减</option>
                        <option value='updated_at, 1'>更新时间递增</option>
                        <option value='updated_at, -1'>更新时间递减</option>
                    </FormControl>
                    &nbsp;&nbsp;
                    <ControlLabel>关键字</ControlLabel>
                    &nbsp;
                    <FormControl
                        bsSize="sm" value={keyword} placeholder="请输入关键字"
                        onChange={e => onQueryMaterials({page: 0, keyword: e.target.value.trim()})}
                    />
                    &nbsp;
                    &nbsp;
                    <FormControl
                        bsSize="sm" value={userId === -1 ? "": userId} placeholder="请输入作者id"
                        onChange={e => onQueryMaterials({page: 0, userId: e.target.value.trim()})}
                    />
                    &nbsp;
                    <Link className="btn btn-sm btn-primary"
                          to={`/materials/new`}
                          style={{position: 'absolute', right: 15}}>+</Link>
                </Form>
                <Table bordered hover striped condensed responsive>
                    <thead>
                    <tr>
                        {
                            fields.map(([key, field], index) => {
                                const title = field.title;
                                return (
                                    <th key={index}>{title}</th>
                                )
                            })
                        }
                        <th>操作</th>
                    </tr>
                    </thead>

                    <tbody>
                    {
                        materials.map((material, index) => {
                            const {id} = material;
                            return (
                                <tr key={index}>
                                    {
                                        fields.map(([key, field], index) => {
                                            var value = material[key];
                                            if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr') && material[key] instanceof Object) {
                                                value = JSON.stringify(material[key])
                                            } else {
                                                value = material[key]
                                            }
                                            const type = field.type;
                                            return (
                                                <td key={index}>
                                                    <ElementView
                                                        type={type} value={value}
                                                        style={{maxWidth: '200px'}}/>
                                                </td>
                                            )
                                        })
                                    }
                                    <td>
                                        <Link to={`/materials/${id}`}>
                                            <Button bsSize="xs" bsStyle="info">查看</Button>
                                        </Link>
                                        <br/>
                                        <Link to={`/materials/${id}/edit`}>
                                            <Button bsSize="xs" bsStyle="warning" style={{marginTop: 2}}>编辑</Button>
                                        </Link>
                                        <br/>
                                        <Button bsSize="xs" bsStyle="danger" style={{marginTop: 2}}
                                                onClick={() => onDeleteMaterial(id)}>删除</Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
                <Pagination
                    page={page} size={size} total={total}
                    onSelect={(page) => onQueryMaterials({type, instrumentType, page, size})}/>
            </div>
        )
    }
}
