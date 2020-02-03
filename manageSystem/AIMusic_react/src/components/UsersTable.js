/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/19 上午10:50
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from "react-bootstrap";
import ElementView from "./ElementView";
import * as UsersHelper from "../helpers/UsersHelper";

export class UsersTable extends Component {
    static propTypes = {
        users: PropTypes.arrayOf(PropTypes.object).isRequired,
        fields: PropTypes.arrayOf(PropTypes.array),
        activeIndex: PropTypes.number.isRequired,
        onSelect: PropTypes.func,
    };

    static defaultProps = {
        fields: UsersHelper.getViewableFields(),
        onSelect: () => null,
        activeIndex: -1,
    };

    render() {
        const {users, fields, onSelect, activeIndex} = this.props;
        return (
            <Table className="selectable" bordered striped hover condensed responsive>
                <thead>
                <tr>
                    {
                        fields.map(([key, field], index) => {
                            const {title} = field;
                            return (
                                <th key={index}>{title}</th>
                            )

                        })
                    }
                </tr>
                </thead>
                <tbody>
                {
                    users.map((user, index) => {
                        return (
                            <tr key={index} onClick={() => onSelect(index)}
                                className={index === activeIndex ? 'active' : ''}>
                                {
                                    fields.map(([key, field], index) => {
                                        const {type} = field;
                                        const value = user[key];
                                        return (
                                            <td key={index}>
                                                <ElementView type={type} value={value}/>
                                            </td>
                                        )
                                    })
                                }
                            </tr>
                        )
                    })
                }
                </tbody>
            </Table>
        );
    }
}
