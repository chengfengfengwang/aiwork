/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/31 下午4:15
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from 'react-bootstrap'
import * as CoursesHelper from "../helpers/CoursesHelper";
import ElementView from "./ElementView";

export default class CourseDetail extends Component {
    static propTypes = {
        course: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.fields = CoursesHelper.getViewableFields()
    }

    render() {
        const {course} = this.props;
        const fields = this.fields;
        return (
            <Table striped bordered condensed hover responsive>
                <tbody>
                {
                    fields.map(([key, field], index) => {
                        const value = course[key];
                        const {title, type} = field;
                        return (
                            <tr key={index}>
                                <td>{title}</td>
                                <td><ElementView type={type} value={value} style={{maxWidth: '500px'}}/></td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        );
    }
}
