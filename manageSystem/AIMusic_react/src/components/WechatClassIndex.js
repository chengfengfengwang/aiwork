import React,{Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, ControlLabel, Form, FormControl, FormGroup, Table} from "react-bootstrap";
import * as WeChatClassHelper from "../helpers/WeChatClassHelper";
import ElementView from "./ElementView";
import {Link} from "react-router-dom";
import InstrumentTypeSelect from "./InstrumentTypeSelect";
import * as _ from "lodash";
import * as actions from "../actions";
import * as selectors from "../reducers/selectors";
import Pagination from "./Pagination";
@connect((state) => {
    const wechatClassManagement = selectors.wechatClasssManagementSelector(state);
    const fields = WeChatClassHelper.getViewableFields();
    return {...wechatClassManagement, fields}
},{
    onQueryWechatClasss: (condition) => actions.requestWechatClasss(_.pickBy(condition, x => x !== undefined)),
    onDeleteWechatClass: (id) => actions.requestDeleteWechatClass(id),
})
export default class WechatClassIndex extends Component{
    static PropTypes = {
        wechatClass: PropTypes.arrayOf(PropTypes.object).isRequired,
        fields: PropTypes.arrayOf(PropTypes.object).isRequired,
        page: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        instrumentType: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        onQueryWechatClasss: PropTypes.func.isRequired,
        onDeleteWechatClass: PropTypes.func.isRequired
    }
    componentDidMount(){
        const {page, size, instrumentType, onQueryWechatClasss, } = this.props;
        onQueryWechatClasss({page,size,instrumentType,});
    }
    render(){
        const {
            wechatClasss, fields, instrumentType, page, size,
            keyword, sort, total, onQueryWechatClasss, onDeleteWechatClass,
        } = this.props;
        return ( <div>
                <Form inline style={{padding: 3}}>
                    &nbsp;&nbsp;
                    <ControlLabel>乐器:</ControlLabel>
                    &nbsp;
                    <FormGroup>
                        <InstrumentTypeSelect
                            value={instrumentType}
                            onSelect={(instrumentType) => onQueryWechatClasss({page: 0, instrumentType})}/>
                    </FormGroup>
                    &nbsp;&nbsp;
                    <ControlLabel>排序</ControlLabel>
                    &nbsp;
                    <FormControl
                        componentClass="select" value={sort} bsSize="sm"
                        onChange={e => onQueryWechatClasss({page: 0, sort: e.target.value})}
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
                        onChange={e => onQueryWechatClasss({page: 0, keyword: e.target.value.trim()})}
                    />
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Link className="btn btn-sm btn-primary"
                          to={`/cccc/new`}
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
                        wechatClasss.map((wechatClass, index) => {
                            const {id} = wechatClass;
                            return (
                                <tr key={index}>
                                    {
                                        fields.map(([key, field], index) => {
                                            var value = wechatClass[key];
                                            if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr') && wechatClass[key] instanceof Object) {
                                                value = JSON.stringify(wechatClass[key])
                                            } else {
                                                value = wechatClass[key]
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
                                        {/*<Link to = {`/cccc/class_payment_data?class_id=${id}`}>*/}
                                            {/*<Button bsSiz="xs" style={{display: "block",height:25, width:40,fontSize:10}}>数据</Button>*/}
                                        {/*</Link>*/}
                                        <Link to={`/cccc/class_info?class_id=${id}`}>
                                            <Button bsSize="xs" bsStyle="info" style={{marginTop: 2}}>查看</Button>
                                        </Link>
                                        <br/>
                                        <Link to={`/cccc/${id}/edit`}>
                                            <Button bsSize="xs" bsStyle="warning" style={{marginTop: 2}}>编辑</Button>
                                        </Link>
                                        <br/>
                                        <Button bsSize="xs" bsStyle="danger" style={{marginTop: 2}}
                                                onClick={() => onDeleteWechatClass(id)}>删除</Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
                <Pagination
                    page={page} size={size} total={total}
                    onSelect={(page) => onQueryWechatClasss({instrumentType, page, size})}/>
            </div>
        )
    }


}