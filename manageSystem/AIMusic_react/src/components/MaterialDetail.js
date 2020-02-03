/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/18 下午5:45
 */

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from 'react-bootstrap'
import ElementView from "./ElementView";

export default class MaterialDetail extends Component {
    static propTypes = {
        material: PropTypes.object.isRequired,
        fields: PropTypes.arrayOf(PropTypes.array).isRequired,
    };

    render() {
        const {material, fields} = this.props;
        return (
            <Table striped bordered condensed hover responsive>
                <tbody>
                {
                    fields.map(([key, field], index) => {
                        var value = material[key];
                        if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr') && material[key] instanceof Object) {
                            value = JSON.stringify(material[key])
                        } else {
                            value = material[key]
                        }
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