import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, ControlLabel, Form, FormGroup} from "react-bootstrap";
import ElementEdit from "./ElementEdit";
import * as WeChatHelper from "../helpers/WeChatHelper";
import {connect} from "react-redux";
import * as selectors from "../reducers/selectors";
import * as actions from "../actions/index";
import * as _ from "lodash";
@connect((state, props) => {
    const {currentWechat: wechat, instrumentType} = selectors.wechatsManagementSelector(state);
    const {match: {params: {id}}} = props;
    const fields = wechat? WeChatHelper.getEditableFields(): null;
    return {id: parseInt(id, 10), fields, wechat};
},{
    onLoad: (id) => actions.requestWechat(id),
    onUpdateWechat: (wechat) => actions.updateWechat(wechat),
    onRequestUpdateWechat: (wechat) => actions.requestUpdateWechat(wechat),
    onRequestCreateWechat: (wechat) => actions.requestCreateWechat(wechat),
})
export default class WechatEdit extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        fields: PropTypes.arrayOf(PropTypes.array),
        onLoad: PropTypes.func.isRequired,
        wechat: PropTypes.object,
        onUpdateWechat: PropTypes.func.isRequired,
        onRequestUpdateWechat: PropTypes.func.isRequired,
        onRequestCreateWechat: PropTypes.func.isRequired,
    };
    componentDidMount() {
        const {onLoad, id, onUpdateWechat} = this.props;
       if(id){
            onLoad(id);
        }else {
            onUpdateWechat(WeChatHelper.getEditableFields());
        }
    }
    onChange({key, value}){
        let {wechat, onUpdateWechat} = this.props;
        wechat[key] = value;
        onUpdateWechat(wechat);
    }

    render(){
       const {fields, wechat, onRequestUpdateWechat, onRequestCreateWechat} = this.props;
       if(!wechat){
           return null;
       }
       return (
           <Form horizontal>
               {
                   fields.map(([key, field], index) => {
                       const {title, type, disabled} = field;
                       var value = wechat[key];
                       if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr') && wechat[key] instanceof Object) {
                           value = JSON.stringify(wechat[key])
                       } else {
                           value = wechat[key]
                       }
                       return (
                           <FormGroup key={index}>
                               <Col componentClass={ControlLabel} sm={2}>
                                   {title}
                               </Col>
                               <Col sm={10}>
                                   <ElementEdit
                                       type={type} value={value} disabled={disabled}
                                       instrumentType={wechat['instrumentType']}
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
                           if (wechat.id) {
                               onRequestUpdateWechat(wechat);
                           } else {
                               onRequestCreateWechat(wechat);
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