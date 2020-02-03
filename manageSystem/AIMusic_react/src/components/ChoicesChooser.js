/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/4/11 下午6:04
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import Modal from "react-bootstrap/lib/Modal";
import Button from "react-bootstrap/lib/Button";
import {connect} from "react-redux";
import * as selectors from "../reducers/selectors";
import * as actions from "../actions/index";

@connect((state) => {
    const choicesChooserState = selectors.choiceChooserSelector(state);
    return {...choicesChooserState};
}, {
    onOk: (choice) => actions.choicesChooserOk(choice),
    onCancel: () => actions.choicesChooserCancel(),
    onCustom: () => actions.choicesChooserCustom(),
    onQueryChords: (condition) => actions.requestChoicesChooserChoices(condition),
    onSelect: (index) => actions.updateChoicesChooserSelectedIndex(index)
})
export default class ChordsChooser extends Component {
    static propTypes = {
        onOk: PropTypes.func.isRequired,
        onCancel: PropTypes.func.isRequired,
        onCustom: PropTypes.func.isRequired,
        onQueryChords: PropTypes.func.isRequired,
        onSelect: PropTypes.func.isRequired,
        isVisible: PropTypes.bool.isRequired,
        instrumentType: PropTypes.string.isRequired,
        activePrefixIndex: PropTypes.number.isRequired,
        selectedIndex: PropTypes.number.isRequired,
        question: PropTypes.arrayOf(PropTypes.object).isRequired,
    };

    componentDidMount() {
        const {instrumentType, activePrefixIndex, onQueryChords} = this.props;
        // const prefix = MaterialsHelper.chordPrefixes[instrumentType][activePrefixIndex];
        // onQueryChords({instrumentType, prefix});
    }

    render() {
        const {
            isVisible, onOk, onCancel, onCustom, question, activePrefixIndex, selectedIndex, instrumentType,
            onQueryChords, onSelect
        } = this.props;
        // const prefixes = MaterialsHelper.chordPrefixes;
        // const activePrefix = prefixes[instrumentType][activePrefixIndex];
        const activeChord = question[selectedIndex];
        console.log('adfasfas++++++++++++++++++++++++++++++++++++++++++++++')
        return (
            <Modal.Dialog style={{display: isVisible ? 'block' : 'none'}}>
                <Modal.Header>
                    <Modal.Title>选择选择题</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                </Modal.Body>

                <Modal.Footer>
                    <Button onClick={onCustom} bsStyle="warning">自定义</Button>
                    <Button
                        bsStyle="primary"
                        onClick={() => onOk(activeChord)}
                        disabled={!activeChord}>确定</Button>
                    <Button onClick={onCancel}>取消</Button>
                </Modal.Footer>
            </Modal.Dialog>
        )
    }
}

