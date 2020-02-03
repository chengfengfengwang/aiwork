/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/18 下午7:57
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, ControlLabel, Form, FormGroup} from "react-bootstrap";
import ElementEdit from "./ElementEdit";
import * as MaterialsHelper from "../helpers/MaterialsHelper";
import {connect} from "react-redux";
import * as selectors from "../reducers/selectors";
import * as actions from "../actions/index";

@connect((state, props) => {
    const {currentMaterial: material, type, instrumentType} = selectors.materialsManagementSelector(state);
    const {match: {params: {id}}} = props;
    const fields = material ? MaterialsHelper.getEditableFields({type: material.type}) : null;
    return {id: parseInt(id, 10), fields, material};
}, {
    onLoad: (id) => actions.requestMaterial(id),
    onUpdateMaterial: (material) => actions.updateMaterial(material),
    onRequestUpdateMaterial: (material) => actions.requestUpdateMaterial(material),
    onRequestCreateMaterial: (material) => actions.requestCreateMaterial(material),
})
export default class MaterialEdit extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        fields: PropTypes.arrayOf(PropTypes.array),
        onLoad: PropTypes.func.isRequired,
        material: PropTypes.object,
        onUpdateMaterial: PropTypes.func.isRequired,
        onRequestUpdateMaterial: PropTypes.func.isRequired,
        onRequestCreateMaterial: PropTypes.func.isRequired
    };

    componentDidMount() {
        const {onLoad, id, onUpdateMaterial} = this.props;
        if (id) {
            onLoad(id);
        } else {
            onUpdateMaterial(MaterialsHelper.getDefaultMaterial('video'));
        }
    }

    onChange({key, value}) {
        let {material, onUpdateMaterial} = this.props;
        material[key] = value;
        onUpdateMaterial(material);
    }

    render() {
        const {fields, material, onRequestUpdateMaterial, onRequestCreateMaterial} = this.props;
        if (!material) {
            return null;
        }
        return (
            <Form horizontal>
                {
                    fields.map(([key, field], index) => {
                        const {title, type, disabled} = field;
                        var value = material[key];
                        console.log(key, '--------------------------------------')
                        if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr') && material[key] instanceof Object) {
                            value = JSON.stringify(material[key])
                        } else {
                            value = material[key]
                        }
                        return (
                            <FormGroup key={index}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    {title}
                                </Col>
                                <Col sm={10}>
                                    <ElementEdit
                                        type={type} value={value} disabled={disabled}
                                        instrumentType={material['instrumentType']}
                                        onValueChange={(value) => this.onChange({key, value})}/>
                                </Col>
                            </FormGroup>
                        )
                    })
                }
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit" bsStyle="success" onClick={(e) => {
                            e.preventDefault();
                            if (material.id) {
                                onRequestUpdateMaterial(material);
                            } else {
                                onRequestCreateMaterial(material);
                            }
                        }}>
                            提交
                        </Button>
                    </Col>
                </FormGroup>
            </Form>
        )
    }
}
