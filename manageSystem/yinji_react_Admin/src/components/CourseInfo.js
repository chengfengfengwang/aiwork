/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/31 下午4:14
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import CourseDetail from "./CourseDetail";
import * as selectors from "../reducers/selectors";
import {connect} from "react-redux";
import * as actions from "../actions/index";

@connect((state, props) => {
    const {currentCourse: course} = selectors.coursesManagementSelector(state);
    const {match: {params: {id}}} = props;
    return {course, id: parseInt(id, 10)}
}, {
    onLoad: (id) => actions.requestCourse(id)
})
export default class CourseInfo extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        onLoad: PropTypes.func.isRequired,
        course: PropTypes.object
    };

    componentDidMount() {
        const {id, onLoad} = this.props;
        onLoad(id);
    }

    render() {
        const {course} = this.props;
        if (!course) {
            return null;
        }
        return (
            <CourseDetail course={course}/>
        )
    }
}
