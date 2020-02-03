/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/31 下午2:50
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Button, ControlLabel, Form, FormControl, FormGroup, Table} from "react-bootstrap";
import {Link} from "react-router-dom";
import * as _ from "lodash";

import Pagination from "./Pagination";
import InstrumentTypeSelect from "./InstrumentTypeSelect";
import * as CoursesHelper from "../helpers/CoursesHelper";
import ElementView from "./ElementView";
import * as actions from "../actions";
import * as selectors from "../reducers/selectors";

@connect((state) => {
    const coursesManagement = selectors.coursesManagementSelector(state);
    const fields = CoursesHelper.getViewableFields({simple: true});
    return {...coursesManagement, fields}
}, {
    onQueryCourses: (condition) => actions.requestCourses(_.pickBy(condition, x => x !== undefined)),
    onDeleteCourse: (id) => actions.requestDeleteCourse(id),
    onCreateCourse: (course) => actions.requestCreateCourse(course)
})
export default class CoursesIndex extends Component {
    static propTypes = {
        courses: PropTypes.arrayOf(PropTypes.object).isRequired,
        fields: PropTypes.arrayOf(PropTypes.array).isRequired,
        page: PropTypes.number.isRequired,
        size: PropTypes.number.isRequired,
        level: PropTypes.string.isRequired,
        instrumentType: PropTypes.string.isRequired,
        online: PropTypes.any.isRequired,
        total: PropTypes.number.isRequired,
        onQueryCourses: PropTypes.func.isRequired,
        onDeleteCourse: PropTypes.func.isRequired,
        onCreateCourse: PropTypes.func.isRequired,
    };

    componentDidMount() {
        const {page, size, instrumentType, level, onQueryCourses, online} = this.props;
        onQueryCourses({page, size, level, instrumentType, online});
    }

    render() {
        const {
            courses, level, fields, instrumentType, page, size,
            keyword, sort, online, total, onQueryCourses, onDeleteCourse, onCreateCourse
        } = this.props;
        return (
            <div>
                <Form inline style={{padding: 3}}>
                    <ControlLabel>级别:</ControlLabel>
                    &nbsp;
                    <FormGroup>
                        <FormControl
                            bsSize="sm"
                            componentClass="select" value={level}
                            onChange={(e) => onQueryCourses({page: 0, level: e.target.value})}>
                            <option value="all">全部</option>
                            <option value="template">新手入门模板</option>
                            <option value="tutorial">新手入门</option>
                            <option value="advanced">进阶课程</option>
                        </FormControl>
                    </FormGroup>
                    &nbsp;&nbsp;
                    <ControlLabel>乐器:</ControlLabel>
                    &nbsp;
                    <FormGroup>
                        <InstrumentTypeSelect
                            value={instrumentType}
                            onSelect={(instrumentType) => onQueryCourses({page: 0, instrumentType})}/>
                    </FormGroup>
                    &nbsp;&nbsp;
                    <ControlLabel>排序</ControlLabel>
                    &nbsp;
                    <FormControl
                        componentClass="select" value={sort} bsSize="sm"
                        onChange={e => onQueryCourses({page: 0, sort: e.target.value})}
                    >
                        <option value='_id, 1'>ID递增</option>
                        <option value='_id, -1'>ID递减</option>
                        <option value='order, 1'>权重递增</option>
                        <option value='order, -1'>权重递减</option>
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
                        onChange={e => onQueryCourses({page: 0, keyword: e.target.value.trim()})}
                    />
                    &nbsp;&nbsp;
                    <ControlLabel>上架</ControlLabel>
                    &nbsp;
                    <FormControl
                        bsSize="sm"
                        componentClass="select" value={online}
                        onChange={e => onQueryCourses({page: 0, online: e.target.value})}>
                        <option value="all">全部</option>
                        <option value="true">是</option>
                        <option value="false">否</option>
                    </FormControl>
                    <Button bsSize="sm" bsStyle="primary"
                            style={{position: 'absolute', right: 15}}
                            onClick={e => {
                                e.preventDefault();
                                onCreateCourse({name: '未命名', instrumentType})
                            }}>+</Button>
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
                        courses.map((course, index) => {
                            const {id} = course;
                            return (
                                <tr key={index}>
                                    {
                                        fields.map(([key, field], index) => {
                                            const value = course[key];
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
                                        <Link to={`/courses/${id}`}>
                                            <Button bsSize="xs" bsStyle="info">查看</Button>
                                        </Link>
                                        <br/>
                                        <Link to={`/courses/${id}/edit`}>
                                            <Button bsSize="xs" bsStyle="warning" style={{marginTop: 2}}>编辑</Button>
                                        </Link>
                                        <br/>
                                        <Button bsSize="xs" bsStyle="danger" style={{marginTop: 2}}
                                                onClick={() => onDeleteCourse(id)}>删除</Button>
                                        <br/>
                                        <Link to={`/courses/${id}/share`}>
                                            <Button bsSize="xs" bsStyle="success" style={{marginTop: 2}}>分享</Button>
                                        </Link>

                                    </td>
                                </tr>
                            );
                        })
                    }
                    </tbody>
                </Table>
                <Pagination
                    page={page} size={size} total={total}
                    onSelect={(page) => onQueryCourses({level, instrumentType, page, size})}/>
            </div>
        )
    }
}

