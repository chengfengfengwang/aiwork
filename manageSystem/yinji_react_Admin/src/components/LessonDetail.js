/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/8 下午2:51
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Table} from "react-bootstrap";
import * as LessonsHelper from "../helpers/LessonsHelper";
import ElementView from "./ElementView";

export default class LessonDetail extends Component {
    static propTypes = {
        lesson: PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.fields = LessonsHelper.getViewableFields()
    }

    render() {
        const {lesson} = this.props;
        const fields = this.fields;
        return (
            <Table striped bordered condensed hover responsive>
                <tbody>
                {
                    fields.map(([key, field], index) => {
                        const value = lesson[key];
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
