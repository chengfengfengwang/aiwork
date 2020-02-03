/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/19 下午3:15
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from "react-bootstrap";
import ElementView from "./ElementView";
import * as UsersHelper from "../helpers/UsersHelper";

export default class UserDetail extends Component {
    static propTypes = {
        user: PropTypes.object.isRequired,
        fields: PropTypes.arrayOf(PropTypes.array).isRequired
    };

    static defaultProps = {
        fields: UsersHelper.getViewableFields()
    };

    render() {
        const {user, fields} = this.props;
        return (
            <Table bordered hover striped condensed responsive>
                <tbody>
                {
                    fields.map(([key, field], index) => {
                        const {title, type} = field;
                        const value = user[key];
                        return (
                            <tr key={index}>
                                <td>{title}</td>
                                <td>
                                    <ElementView value={value} type={type} style={{maxWidth: 200}}/>
                                </td>
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        )
    }
}
