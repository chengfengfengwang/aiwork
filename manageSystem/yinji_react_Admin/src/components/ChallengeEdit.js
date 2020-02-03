import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, Col, ControlLabel, Form, FormGroup} from "react-bootstrap";
import ElementEdit from "./ElementEdit";
import * as ChallengeHelper from "../helpers/ChallengeHelper";
import {connect} from "react-redux";
import * as selectors from "../reducers/selectors";
import * as actions from "../actions/index";
import * as _ from "lodash";
@connect((state, props) => {
    const {currentChallenge: challenge, instrumentType} = selectors.challengesManagementSelector(state);
    const {match: {params: {id}}} = props;
    const fields = challenge? ChallengeHelper.getEditableFields(): null;
    return {id: parseInt(id, 10), fields, challenge};
},{
    onLoad: (id) => actions.requestChallenge(id),
    onUpdateChallenge: (challenge) => actions.updateChallenge(challenge),
    onRequestUpdateChallenge: (challenge) => actions.requestUpdateChallenge(challenge),
    onRequestCreateChallenge: (challenge) => actions.requestCreateChallenge(challenge),
})
export default class ChallengeEdit extends Component {
    static propTypes = {
        id: PropTypes.number.isRequired,
        fields: PropTypes.arrayOf(PropTypes.array),
        onLoad: PropTypes.func.isRequired,
        challenge: PropTypes.object,
        onUpdateChallenge: PropTypes.func.isRequired,
        onRequestUpdateChallenge: PropTypes.func.isRequired,
        onRequestCreateChallenge: PropTypes.func.isRequired,
    };
    componentDidMount() {
        const {onLoad, id, onUpdateChallenge} = this.props;
        if(id){
            onLoad(id);
        }else {
            onUpdateChallenge(ChallengeHelper.getEditableFields());
        }
    }
    onChange({key, value}){
        let {challenge, onUpdateChallenge} = this.props;
        challenge[key] = value;
        onUpdateChallenge(challenge);
    }

    render(){
        const {fields, challenge, onRequestUpdateChallenge, onRequestCreateChallenge} = this.props;
        if(!challenge){
            return null;
        }
        return (
            <Form horizontal>
                {
                    fields.map(([key, field], index) => {
                        const {title, type, disabled} = field;
                        var value = challenge[key];
                        if ((key === 'property' || key === 'extendInfoArr' || key === 'videoArr' || key === 'offArr' || key === 'voiceArr' || key === 'durArr') && challenge[key] instanceof Object) {
                            value = JSON.stringify(challenge[key])
                        } else {
                            value = challenge[key]
                        }
                        return (
                            <FormGroup key={index}>
                                <Col componentClass={ControlLabel} sm={2}>
                                    {title}
                                </Col>
                                <Col sm={10}>
                                    <ElementEdit
                                        type={type} value={value} disabled={disabled}
                                        instrumentType={challenge['instrumentType']}
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
                            if (challenge.id) {
                                onRequestUpdateChallenge(challenge);
                            } else {
                                onRequestCreateChallenge(challenge);
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