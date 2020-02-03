import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, ControlLabel, Form, FormGroup} from "react-bootstrap";
import ElementEdit from "./ElementEdit";
import * as ItvHelper from "../helpers/ItvHelpe";
import {connect} from "react-redux";
import * as selectors from "../reducers/selectors";
import * as actions from "../actions/index";

@connect((state, props) => {
    const {currentItv: itv, instrumentType} = selectors.itvsManagementSelector(state);
    const {match: {params: {id}}} = props;
    const fields = itv? ItvHelper.getEditableFields(): null;
    return {id: parseInt(id, 10), fields, itv};
},{
    onLoad: (id) => actions.requestItv(id),
    onUpdateItv: (itv) => actions.updateItv(itv),
    onRequestUpdateItv: (itv) => actions.requestUpdateItv(itv),
    onRequestCreateItv: (itv) => actions.requestCreateItv(itv),
})

export default class ItvEdit extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        fields: PropTypes.arrayOf(PropTypes.array),
        onLoad: PropTypes.func.isRequired,
        wechat: PropTypes.object,
        onUpdateItv: PropTypes.func.isRequired,
        onRequestUpdateItv: PropTypes.func.isRequired,
        onRequestCreateItv: PropTypes.func.isRequired,
    };
    componentDidMount() {
        const {onLoad, id, onUpdateItv} = this.props;
        if(id){
            onLoad(id);
        }else {
            onUpdateItv(ItvHelper.getEditableFields());
        }
    }
    onChange({key, value}){
        let {itv, onUpdateItv} = this.props;
        itv[key] = value;
        onUpdateItv(itv);
    }

    render(){
        const {fields, itv, onRequestUpdateItv, onRequestCreateItv} = this.props;
        if(!itv){
            return null;
        }
        return (
            <Form horizontal>
                {
                    fields.map(([key, field], index) => {
                        const {title, type, disabled} = field;
                        var value = itv[key];
                        if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr') && itv[key] instanceof Object) {
                            value = JSON.stringify(itv[key])
                        } else {
                            value = itv[key]
                        }
                        return (
                            <FormGroup key={index}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    {title}
                                </Col>
                                <Col sm={10}>
                                    <ElementEdit
                                        type={type} value={value} disabled={disabled}
                                        instrumentType={itv['instrumentType']}
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
                            if (itv.id) {
                                onRequestUpdateItv(itv);
                            } else {
                                onRequestCreateItv(itv);
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