/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/6/1 下午3:38
 */
import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Table} from "react-bootstrap";
import ElementView from "./ElementView";
import * as MaterialsHelper from "../helpers/MaterialsHelper";

export class MaterialsTable extends Component {
    static propTypes = {
        materials: PropTypes.arrayOf(PropTypes.object).isRequired,
        fields: PropTypes.arrayOf(PropTypes.array),
        activeIndex: PropTypes.number.isRequired,
        onSelect: PropTypes.func,
    };

    static defaultProps = {
        fields: MaterialsHelper.getViewableFields({type: 'video'}),
        onSelect: () => null,
        activeIndex: -1,
    };

    render() {
        const {materials, fields, onSelect, activeIndex} = this.props;
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
                    materials.map((material, index) => {
                        return (
                            <tr key={index} onClick={() => onSelect(index)}
                                className={index === activeIndex ? 'active' : ''}>
                                {
                                    fields.map(([key, field], index) => {
                                        const {type} = field;
                                        var value = material[key];
                                        if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr') && material[key] instanceof Object) {
                                            value = JSON.stringify(material[key])
                                        } else {
                                            value = material[key]
                                        }

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
