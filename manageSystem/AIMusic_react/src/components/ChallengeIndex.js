import React,{Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, ControlLabel, Form, FormControl, FormGroup, Table} from "react-bootstrap";
import * as ChallengeHelper from "../helpers/ChallengeHelper";
import ElementView from "./ElementView";
import {Link} from "react-router-dom";
import InstrumentTypeSelect from "./InstrumentTypeSelect";
import * as _ from "lodash";
import * as actions from "../actions";
import * as selectors from "../reducers/selectors";
import Pagination from "./Pagination";
import Upload from "./Upload";

@connect((state) => {
    const challengeManagement = selectors.challengesManagementSelector(state);
    const fields = ChallengeHelper.getViewableFields();
    return {...challengeManagement, fields}
},{
    onQueryChallenges: (condition) => actions.requestChallenges(_.pickBy(condition, x => x !== undefined)),
    onDeleteChallenge: (id) => actions.requestDeleteChallenge(id),
})
export default class ChallengeIndex extends Component{
    static PropTypes = {
        Challenge: PropTypes.arrayOf(PropTypes.object).isRequired,
        fields: PropTypes.arrayOf(PropTypes.object).isRequired,
        page: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        instrumentType: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
        onQueryChallenges: PropTypes.func.isRequired,
        onDeleteChallenge: PropTypes.func.isRequired,
        onValueChange: PropTypes.func.isRequired,
    }
    componentDidMount(){
        const {page, size, instrumentType, onQueryChallenges,onValueChange } = this.props;
        onQueryChallenges({page,size,instrumentType,});
    }
    render(){
        const {
            challenges, fields, instrumentType, page, size,
            keyword, sort, total, onQueryChallenges, onDeleteChallenge,onValueChange
        } = this.props;
        return ( <div>
                <Form inline style={{padding: 3}}>
                    &nbsp;&nbsp;
                    <ControlLabel>乐器:</ControlLabel>
                    &nbsp;
                    <FormGroup>
                        <InstrumentTypeSelect
                            value={instrumentType}
                            onSelect={(instrumentType) => onQueryChallenges({page: 0, instrumentType})}/>
                    </FormGroup>
                    &nbsp;&nbsp;
                    <ControlLabel>排序</ControlLabel>
                    &nbsp;
                    <FormControl
                        componentClass="select" value={sort} bsSize="sm"
                        onChange={e => onQueryChallenges({page: 0, sort: e.target.value})}
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
                        onChange={e => onQueryChallenges({page: 0, keyword: e.target.value.trim()})}
                    />
                    &nbsp;
                    &nbsp;
                    &nbsp;
                    <Link className="btn btn-sm btn-primary"
                          to={`/tiaozhan/new`}
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
                        challenges.map((challenge, index) => {
                            const {id} = challenge;
                            return (
                                <tr key={index}>
                                    {
                                        fields.map(([key, field], index) => {
                                            var value = challenge[key];
                                            if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr') && challenge[key] instanceof Object) {
                                                value = JSON.stringify(challenge[key])
                                            } else {
                                                value = challenge[key]
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
                                        <Link to={`/challenge/${id}/`}>
                                            <Button bsSize="xs" bsStyle="info">查看</Button>
                                        </Link>
                                        <br/>
                                        <Link to={`/tiaozhan/${id}/edit`}>
                                            <Button bsSize="xs" bsStyle="warning" style={{marginTop: 2}}>编辑</Button>
                                        </Link>
                                        <br/>
                                        <Button bsSize="xs" bsStyle="danger" style={{marginTop: 2}}
                                                onClick={() => onDeleteChallenge(id)}>删除</Button>
                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
                <Pagination
                    page={page} size={size} total={total}
                    onSelect={(page) => onQueryChallenges({instrumentType, page, size})}/>
            </div>
        )
    }


}