import React,{Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, ControlLabel, Form, FormControl, FormGroup, Table} from "react-bootstrap";
import * as ItvHelper from "../helpers/ItvHelpe";
import ElementView from "./ElementView";
import {Link} from "react-router-dom";
import InstrumentTypeSelect from "./InstrumentTypeSelect";
import * as _ from "lodash";
import * as actions from "../actions";
import * as selectors from "../reducers/selectors";
import Pagination from "./Pagination";


@connect((state) => {
    const itvManagement = selectors.itvsManagementSelector(state);
    const fields = ItvHelper.getViewableFields();
    return {...itvManagement, fields}
},{
    onQueryItvs: (condition) => actions.requestItvs(_.pickBy(condition, x => x !== undefined)),
    onDeleteItv: (id) => actions.requestDeleteItv(id),
})
export default class ItvIndex extends Component{
    static PropTypes = {
        itv: PropTypes.arrayOf(PropTypes.object).isRequired,
        fields: PropTypes.arrayOf(PropTypes.object).isRequired,
        page: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        instrumentType: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        onQueryItvs: PropTypes.func.isRequired,
        onDeleteItv: PropTypes.func.isRequired,
        onValueChange: PropTypes.func.isRequired,
    }
    componentDidMount(){
        const {page, size, instrumentType, onQueryItvs} = this.props;
        onQueryItvs({page,size,instrumentType,});
    }
    render(){
        const {
            itvs, fields, instrumentType, page, size,
            keyword, sort, total, onQueryItvs, onDeleteItv,
        } = this.props;
        return ( <div>
                <Form inline style={{padding: 3}}>
                    &nbsp;&nbsp;
                    <ControlLabel>乐器:</ControlLabel>
                    &nbsp;
                    <FormGroup>
                        <InstrumentTypeSelect
                            value={instrumentType}
                            onSelect={(instrumentType) => onQueryItvs({page: 0, instrumentType})}/>
                    </FormGroup>
                    &nbsp;&nbsp;
                    <ControlLabel>排序</ControlLabel>
                    &nbsp;
                    <FormControl
                        componentClass="select" value={sort} bsSize="sm"
                        onChange={e => onQueryItvs({page: 0, sort: e.target.value})}
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
                        onChange={e => onQueryItvs({page: 0, keyword: e.target.value.trim()})}
                    />
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Link className="btn btn-sm btn-primary"
                          to={`/itv/new/`}
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
                        itvs.map((itv, index) => {
                            const {id} = itv;
                            return (
                                <tr key={index}>
                                    {
                                        fields.map(([key, field], index) => {
                                            var value = itv[key];
                                            if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr') && itv[key] instanceof Object) {
                                                value = JSON.stringify(itv[key])
                                            } else {
                                                value = itv[key]
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
                                        <Link to={`/itv/${id}/`}>
                                            <Button bsSize="xs" bsStyle="info">查看</Button>
                                        </Link>
                                        <br/>
                                        <Link to={`/itv/${id}/edit`}>
                                            <Button bsSize="xs" bsStyle="warning" style={{marginTop: 2}}>编辑</Button>
                                        </Link>
                                        <br/>
                                        <Button bsSize="xs" bsStyle="danger" style={{marginTop: 2}}
                                                onClick={() => onDeleteItv(id)}>删除</Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
                <Pagination
                    page={page} size={size} total={total}
                    onSelect={(page) => onQueryItvs({instrumentType, page, size})}/>
            </div>
        )
    }


}