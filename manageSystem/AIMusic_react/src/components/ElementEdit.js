/**
 * Author: BaiJiFeiLong@gmail.com
 * Datetime: 2017/5/18 下午8:42
 */

import React, {Component} from "react";
import PropTypes from "prop-types";
import {Button, ControlLabel, FormControl, InputGroup} from "react-bootstrap";
import ChordGraph from "./ChordGraph";
import {choiceTypes, materialTypes} from "../helpers/MaterialsHelper";
import * as moment from "moment";
import {connect} from "react-redux";
import * as actions from "../actions/index";
import UsersChooser from "./UsersChooser";
import ElementView from "./ElementView";
import Upload from "./Upload";
import * as selectors from "../reducers/selectors";
import {courseLevels, courseTypes} from "../helpers/CoursesHelper";
import ScoresChooser from "./ScoresChooser";
import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import MyQuill from "./MyQuill";
import VideoGroup from "./VideoGroup";
@connect((state, props) => {
    return {
        tuningMethods: selectors.tuningMethodsSelector(state)
    }
})
export default class ElementEdit extends Component {
    static propTypes = {
        type: PropTypes.string,
        value: PropTypes.any,
        disabled: PropTypes.bool,
        instrumentType: PropTypes.string.isRequired,
        onValueChange: PropTypes.func.isRequired,
        onChooseUser: PropTypes.func,
        tuningMethods: PropTypes.object
    };

    static defaultProps = {
        onChooseUser: () => null,
        disabled: false,
        instrumentType: 'guitar'
    };

    constructor(props) {
        super(props);
        this.state = {
            isDialogVisible: false
        }
    }


    render() {
        const {type, value, instrumentType, disabled, onValueChange, tuningMethods, onChooseUser, dispatch, ...props} = this.props;
        const {isDialogVisible} = this.state;
        const currentTuningMethods = tuningMethods ? tuningMethods[instrumentType] : null;
        if (disabled) {
            return <ControlLabel>
                <ElementView value={value} type={type}/>
            </ControlLabel>
        }
        switch (type) {
            case 'boolean':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={(e) => onValueChange(e.target.value)}
                >
                    <option value={true}>是</option>
                    <option value={false}>否</option>
                </FormControl>;

            case 'user':
                return <InputGroup>
                    <FormControl
                        type="text"
                        value={value ? value.nickname : 'NULL'} onChange={() => null}/>
                    <InputGroup.Button>
                        <Button onClick={(e) => {
                            e.preventDefault();
                            dispatch(actions.showUsersChooser());
                        }}>...</Button>
                    </InputGroup.Button>
                    <UsersChooser onOk={(user) => {
                        dispatch(actions.hideUsersChooser());
                        onValueChange(user);
                    } }/>
                </InputGroup>;

            case 'instrumentType':
                return <FormControl value={value} componentClass="select" onChange={(e) => {
                    onValueChange(e.target.value)
                }}>
                    <option value="guitar">吉他</option>
                    <option value="ukulele">尤克里里</option>
                    <option value="kalimba">卡林巴</option>
                    <option value="djembe">非洲鼓</option>
                    <option value="piano">钢琴</option>
                    <option value="music_basis">音基</option>
                    <option value="harmonica">口琴</option>

                </FormControl>;

            case 'timestamp':
                return <ControlLabel {...props}> {moment.unix(value).locale('zh_CN').format('LLLL')} </ControlLabel>;

            case 'video':
                return <Upload type="video" url={value} onSuccess={onValueChange}/>;
            case 'pieceVideo':
                return <VideoGroup type="pieceVideo" url={value} onSuccess={onValueChange}></VideoGroup>;
            case 'audio':
                return <Upload type="audio" url={value} onSuccess={onValueChange}/>;

            case 'image':
                return <Upload type="image" url={value} onSuccess={onValueChange}/>;

            case 'file':
                return <Upload type="file" url={value} onSuccess={onValueChange}/>;

            case 'materialType':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={(e) => {
                        e.preventDefault();
                        onValueChange(e.target.value);
                    }}>
                    {
                        Object.entries(materialTypes).map(([key, value], index) => {
                            return <option value={key} key={index}>{value}</option>
                        })
                    }
                </FormControl>;
            case 'choiceType':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={(e) => {
                        e.preventDefault();
                        onValueChange(e.target.value);
                    }}>
                    {
                        Object.entries(choiceTypes).map(([key, value], index) =>{
                            return <option value={key} key={index}>{value}</option>
                        })
                    }
                </FormControl>;

            case 'courseLevel':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={e => onValueChange(e.target.value)}
                >
                    {
                        Object.entries(courseLevels).map(([key, value], index) =>
                            <option value={key} key={index}>{value}</option>
                        )
                    }

                </FormControl>;

            case 'courseType':
                return <FormControl
                    componentClass="select"
                    value={value}
                    onChange={e => onValueChange(e.target.value)}
                >
                    {
                        Object.entries(courseTypes).map(([key, value], index) =>
                            <option value={key} key={index}>{value}</option>
                        )
                    }
                </FormControl>;

            case 'score':
                return <InputGroup>
                    <FormControl
                        type="text"
                        value={value ? `${value.id}:${value.name}` : 'NULL'} onChange={() => null}/>
                    <InputGroup.Button>
                        <Button onClick={(e) => {
                            e.preventDefault();
                            this.setState({isDialogVisible: true});
                        }}>...</Button>
                    </InputGroup.Button>
                    <ScoresChooser
                        isVisible={isDialogVisible}
                        onOk={score => {
                            this.setState({isDialogVisible: false});
                            onValueChange(score);
                        }}
                        onCancel={() => this.setState({isDialogVisible: false})}/>
                </InputGroup>;

            case 'tuningMethod':
                return <FormControl
                    componentClass="select"
                    value={value.index}
                    onChange={(e) => onValueChange(currentTuningMethods[e.target.value])}>
                    {
                        currentTuningMethods.map((method, index) => {
                            return <option value={index} key={index}>{method.name}</option>
                        })
                    }
                </FormControl>;

            case 'chordGraph':
                if (!value) {
                    return <ControlLabel>无</ControlLabel>;
                }
                const {baseFret, fingers, frets} = value;
                return <ChordGraph
                    editable={true} {...props} baseFret={baseFret} frets={frets} fingers={fingers}
                    onChange={(baseFret, frets, fingers) => {
                        onValueChange({baseFret, frets, fingers})
                    }}/>;

            case 'text':
                return <FormControl
                    componentClass="textarea" value={value}
                    onChange={e => onValueChange(e.target.value)}/>;

            case 'richText':
                return <MyQuill value={value} onChange={(content) => onValueChange(content)}/>;

            default:
                return <FormControl value={value} onChange={(e) => onValueChange(e.target.value)}/>
        }
    }
}
