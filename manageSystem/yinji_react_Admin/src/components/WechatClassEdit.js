import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, ControlLabel, Form, FormGroup} from "react-bootstrap";
import ElementEdit from "./ElementEdit";
import * as WeChatClassHelper from "../helpers/WeChatClassHelper";
import {connect} from "react-redux";
import * as selectors from "../reducers/selectors";
import * as actions from "../actions/index";
import * as _ from "lodash";
@connect((state, props) => {
    const {currentWechatClass: wechatClass, instrumentType} = selectors.wechatClasssManagementSelector(state);
    const {match: {params: {id}}} = props;
    const fields = wechatClass? WeChatClassHelper.getEditableFields(): null;
    return {id: parseInt(id, 10), fields, wechatClass};
},{
    onLoad: (id) => actions.requestWechatClass(id),
    onUpdateWechatClass: (wechatClass) => actions.updateWechatClass(wechatClass),
    onRequestUpdateWechatClass: (wechatClass) => actions.requestUpdateWechatClass(wechatClass),
    onRequestCreateWechatClass: (wechatClass) => actions.requestCreateWechatClass(wechatClass),
})
export default class WechatEdit extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        fields: PropTypes.arrayOf(PropTypes.array),
        onLoad: PropTypes.func.isRequired,
        wechat: PropTypes.object,
        onUpdateWechatClass: PropTypes.func.isRequired,
        onRequestUpdateWechatClass: PropTypes.func.isRequired,
        onRequestCreateWechatClass: PropTypes.func.isRequired,
    };
    componentDidMount() {
        const {onLoad, id, onUpdateWechatClass} = this.props;
        if(id){
            onLoad(id);
        }else {
            onUpdateWechatClass(WeChatClassHelper.getEditableFields());
        }
    }
    onChange({key, value}){
        let {wechatClass, onUpdateWechatClass} = this.props;
        wechatClass[key] = value;
        onUpdateWechatClass(wechatClass);
    }

    render(){
        const {fields, wechatClass, onRequestUpdateWechatClass, onRequestCreateWechatClass} = this.props;
        if(!wechatClass){
            return null;
        }
        return (
            <Form horizontal>
                {
                    fields.map(([key, field], index) => {
                        const {title, type, disabled} = field;
                        var value = wechatClass[key];
                        if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr') && wechatClass[key] instanceof Object) {
                            value = JSON.stringify(wechatClass[key])
                        } else {
                            value = wechatClass[key]
                        }
                        return (
                            <FormGroup key={index}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    {title}
                                </Col>
                                <Col sm={10}>
                                    <ElementEdit
                                        type={type} value={value} disabled={disabled}
                                        instrumentType={wechatClass['instrumentType']}
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
                            if (wechatClass.id) {
                                onRequestUpdateWechatClass(wechatClass);
                            } else {
                                onRequestCreateWechatClass(wechatClass);
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